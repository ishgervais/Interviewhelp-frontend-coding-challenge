import { useEffect, useState } from 'react'
import './assets/styles/App.scss'
import Button from './components/Button'
import Loader from './components/Loader';
import UserCard from './components/UserCard';
import { FormatedUserRecord, Slide, UserLog, UserRecord, UserRecords } from './types';
import { config } from "react-spring";
import VerticalCarousel from "./components/VerticalCarousel";
import { loadUserLogs, selectUserLogs } from './store/modules/userLogsSlice';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { formatUsers, loadUsers, selectCurrentOffset, selectCurrentStatus, selectFormatedUsers, selectSlides, selectUsers, sortUsers } from './store/modules/userSlice';

function App() {

  const userLogs = useAppSelector<UserLog[]>(selectUserLogs);
  const users = useAppSelector<UserRecord[]>(selectUsers);
  const status = useAppSelector<string>(selectCurrentStatus);
  const formatedUsers = useAppSelector<FormatedUserRecord[]>(selectFormatedUsers);
  const dispatch = useAppDispatch();
  const [slides, setSlides] = useState<Slide[]>([]);
  const [currentOffset, setCurrentOffset] = useState<string>();

  const [sliderOptions, setSliderOptions] = useState({
    goToSlide: 0,
    offsetRadius: 2,
    showNavigation: true,
    config: config.gentle
  });

  const loadUser = async (offset?: string) => {

    if (offset === currentOffset && slides.length) return;

    const data: any = await dispatch(loadUsers({ offset: currentOffset }))
    let index = slides.length + 1;

    if (slides.length) {
      if (data.payload.offset && !slides.find(slide => slide.offset === data.payload.offset))
        setSlides([...slides, { key: index, content: index.toString(), offset: data.payload.offset }]);
    } else {
      if (data.payload.offset)
        setSlides([{ key: index, content: index.toString() }, { key: (index + 1), content: (index + 1).toString(), offset: data.payload.offset }]);
      else
        setSlides([{ key: index, content: index.toString() }]);
    }
    setTimeout(() => {
      if (slides[slides.length - 1])
        setCurrentOffset(slides[slides.length - 1].offset);
    }, 500);
  }

  useEffect(() => {
    dispatch(loadUserLogs());
  }, [])
  useEffect(() => {
    if (userLogs.length) {
      loadUser()
    }
  }, [userLogs])
  useEffect(() => {
    if (users?.length) {
      dispatch(formatUsers({ userLogs }))
    }
  }, [users])

  return (
    <div className="App h-screen">
      <div className="header">
        <div className="md:flex flex-wrap mx-auto md:mx-0 w-fit">
          <Button description='Sort by name' handleOrderChange={(order: string) => {
            dispatch(sortUsers({ order, target: "Name" }));
          }} />
          <Button description='Sort by impressions' handleOrderChange={(order: string) => {
            dispatch(sortUsers({ order, target: "totalImpresions" }));
          }} />
          <Button description='Sort by conversions' handleOrderChange={(order: string) => {
            dispatch(sortUsers({ order, target: "totalConversions" }));
          }} />
          <Button description='Sort by revenue' handleOrderChange={(order: string) => {
            dispatch(sortUsers({ order, target: "totalRevenue" }));
          }} />
        </div>
      </div>
      <div className="users-container flex">
        <div className="pagination-indicator-container">
          {
            slides.length ?
              <VerticalCarousel
                slides={slides}
                offsetRadius={sliderOptions.offsetRadius}
                showNavigation={sliderOptions.showNavigation}
                animationConfig={sliderOptions.config}
                handleClick={loadUser}
              /> : ''}
        </div>
        {
          status !== "formatted" ?
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
