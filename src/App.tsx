import { useEffect, useState } from 'react'
import './assets/styles/App.scss'
import Button from './components/Button'
import Loader from './components/Loader';
import UserCard from './components/UserCard';
import { FormatedUserRecord, Slide, UserLog, UserRecord, UserRecords } from './types';
import { config } from "react-spring";
import VerticalCarousel from "./components/VerticalCarousel";

function App() {

  const [users, setUsers] = useState<UserRecord[]>();
  const [formatedUsers, setFormatedUsers] = useState<FormatedUserRecord[]>([]);
  const [userLogs, setUserLogs] = useState<UserLog[]>([]);
  const [slides, setSlides] = useState<Slide[]>([]);
  const [currentOffset, setCurrentOffset] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const [sliderOptions, setSliderOptions] = useState({
    goToSlide: 0,
    offsetRadius: 2,
    showNavigation: true,
    config: config.gentle
  });

  const TABLE_BASE_API_URL = 'https://api.airtable.com/v0/appBTaX8XIvvr6zEC/Users';
  const API_KEY = 'key4v56MUqVr9sNJv';

  const loadUserLogs = async () => {
    // I could use the data directly from the api but it's returning a cors error
    // const data = await fetch("https://assets.interviewhelp.io/INTERVIEW_HELP/reactjs/logs.json");
    fetch('/logs.json')
      .then((res) => res.json())
      .then((data) => {
        setUserLogs(data);
      })
  }

  const loadUsers = async (offset?: string) => {
    if (offset === currentOffset && slides.length) return;

    setIsLoading(true);
    const data = await fetch(`${TABLE_BASE_API_URL}?pageSize=6&view=Grid%20view${offset ? '&offset=' + offset : ''}`, {
      headers: {
        Authorization: `Bearer ${API_KEY}`
      }
    });
    const res: UserRecords = await data.json();
    setUsers(res.records);
    let index = slides.length + 1;

    if (slides.length) {
      if (res.offset && !slides.find(slide => slide.offset === res.offset))
        setSlides([...slides, { key: index, content: index.toString(), offset: res.offset }]);
    } else {
      if (res.offset)
        setSlides([{ key: index, content: index.toString() }, { key: (index + 1), content: (index + 1).toString(), offset: res.offset }]);
      else
        setSlides([{ key: index, content: index.toString() }]);
    }
    setTimeout(() => {
      if (slides[slides.length - 1])
        setCurrentOffset(slides[slides.length - 1].offset);
    }, 500);
  }

  const formatUsers = async () => {
    if (!users) return;

    const formattedUsersMap: { [key: number]: FormatedUserRecord } = {};
    for (const user of users) {
      formattedUsersMap[user.fields.Id] = { ...user.fields, totalConversions: 0, totalImpresions: 0, totalRevenue: 0, chartSummary: "", categories: [], series: [], conversionsMap: {} };
    }

    for (const userLog of userLogs) {
      if (!formattedUsersMap[userLog.user_id]) continue;
      switch (userLog.type) {
        case "impression":
          formattedUsersMap[userLog.user_id].totalImpresions++;
          break;

        case "conversion": {

          const date = userLog.time.split(" ")[0];

          formattedUsersMap[userLog.user_id].conversionsMap[date] = (formattedUsersMap[userLog.user_id].conversionsMap[date] || 0) + 1;
          formattedUsersMap[userLog.user_id].totalConversions++;
          break;
        }

        default:
          break;
      }
      formattedUsersMap[userLog.user_id].totalRevenue += userLog.revenue;
    }

    const formattedUsers: FormatedUserRecord[] = Object.values(formattedUsersMap);

    for (const user of formattedUsers) {
      user.categories = Object.keys(user.conversionsMap);
      user.categories.sort();
      user.series = user.categories.map((date) => user.conversionsMap[date]);

      const startDate = new Date(user.categories[0]);
      const endDate = new Date(user.categories[user.categories.length - 1]);
      user.chartSummary = `${startDate.getMonth() + 1}/${startDate.getDate()} - ${endDate.getMonth() + 1}/${endDate.getDate()}`;
    }
    setFormatedUsers(formattedUsers);
    setIsLoading(false);
  }

  useEffect(() => {
    loadUserLogs();
  }, [])
  useEffect(() => {
    if (userLogs.length) {
      loadUsers();
    }
  }, [userLogs])
  useEffect(() => {
    if (users?.length) {
      formatUsers();
    }
  }, [users])

  const sortData = (order: string, target: string) => {
    setFormatedUsers([...formatedUsers]?.sort((a, b) => {

      if (order === "ASC") {

        switch (target) {
          case "Name":
            return a.Name.localeCompare(b.Name);
          case "totalConversions":
            return a.totalConversions - b.totalConversions;
          case "totalImpresions":
            return a.totalImpresions - b.totalImpresions;
          case "totalRevenue":
            return a.totalRevenue - b.totalRevenue;
          default:
            return 0;
            break;
        }

      } else {

        switch (target) {
          case "Name":
            return b.Name.localeCompare(a.Name);
          case "totalConversions":
            return b.totalConversions - a.totalConversions;
          case "totalImpresions":
            return b.totalImpresions - a.totalImpresions;
          case "totalRevenue":
            return b.totalRevenue - a.totalRevenue;
          default:
            return 0;
            break;
        }

      }
    }
    ));
  }

  return (
    <div className="App h-screen">
      <div className="header">
        <div className="md:flex flex-wrap mx-auto md:mx-0 w-fit">
          <Button description='Sort by name' handleOrderChange={(order: string) => {
            sortData(order, "Name");
          }} />
          <Button description='Sort by impressions' handleOrderChange={(order: string) => {
            sortData(order, "totalImpresions");
          }} />
          <Button description='Sort by conversions' handleOrderChange={(order: string) => {
            sortData(order, "totalConversions");
          }} />
          <Button description='Sort by revenue' handleOrderChange={(order: string) => {
            sortData(order, "totalRevenue");
          }} />
        </div>
      </div>
      <div className="users-container flex">
        <div className="pagination-indicator-container">
          <VerticalCarousel
            slides={slides}
            offsetRadius={sliderOptions.offsetRadius}
            showNavigation={sliderOptions.showNavigation}
            animationConfig={sliderOptions.config}
            handleClick={loadUsers}
          />
        </div>
        {
          isLoading ?
            <Loader /> :
            <div className="card-container flex flex-wrap mx-auto mt-28">
              {
                formatedUsers.map((user: any) =>
                  <UserCard
                    key={user.Id}
                    data={user}
                  />)
              }
            </div>
        }
      </div>
    </div>
  )
}

export default App
