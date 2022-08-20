import { useEffect, useState } from 'react'
import './assets/styles/App.scss'
import Button from './components/Button'
import UserCard from './components/UserCard';
import { FormatedUserRecord, UserLog, UserRecord } from './types';

function App() {

  const [users, setUsers] = useState<UserRecord>();
  const [formatedUsers, setFormatedUsers] = useState<FormatedUserRecord[]>([]);
  const [userLogs, setUserLogs] = useState<UserLog>();

  useEffect(() => {
    setFormatedUsers([{
      Name: 'John K. Martinez',
      avatar: 'https://assets.interviewhelp.io/INTERVIEW_HELP/reactjs/Code-Challenge-Mockup.png',
      occupation: 'Web Developer',
      id: '1',
      totalImpresions: 100,
      totalConversions: 10,
      totalRevenue: 1000,
      chartSummary: "Conversions 4/12 - 4/30",
      categories: ["2013-04-24 19:20:09", "2013-04-25 19:20:09", "2013-04-26 19:20:09", "2013-04-27 19:20:09", "2013-04-28 19:20:09", "2013-04-29 19:20:09", "2013-04-30 19:20:09", "2013-05-01 19:20:09"],
      series: [12, 2, 6, 89, 3, 5, 9, 43]
    },
    {
      Name: 'John K. Martinez',
      avatar: 'https://assets.interviewhelp.io/INTERVIEW_HELP/reactjs/Code-Challenge-Mockup.png',
      occupation: 'Web Developer',
      id: '11',
      totalImpresions: 100,
      totalConversions: 10,
      totalRevenue: 1000,
      chartSummary: "Conversions 4/12 - 4/30",
      categories: ["2013-04-24 19:20:09", "2013-04-25 19:20:09", "2013-04-26 19:20:09", "2013-04-27 19:20:09", "2013-04-28 19:20:09", "2013-04-29 19:20:09", "2013-04-30 19:20:09", "2013-05-01 19:20:09"],
      series: [12, 2, 6, 89, 3, 5, 9, 43]
    },
    {
      Name: 'John K. Martinez',
      avatar: 'https://assets.interviewhelp.io/INTERVIEW_HELP/reactjs/Code-Challenge-Mockup.png',
      occupation: 'Web Developer',
      id: '15',
      totalImpresions: 100,
      totalConversions: 10,
      totalRevenue: 1000,
      chartSummary: "Conversions 4/12 - 4/30",
      categories: ["2013-04-24 19:20:09", "2013-04-25 19:20:09", "2013-04-26 19:20:09", "2013-04-27 19:20:09", "2013-04-28 19:20:09", "2013-04-29 19:20:09", "2013-04-30 19:20:09", "2013-05-01 19:20:09"],
      series: [12, 2, 6, 89, 3, 5, 9, 43]
    },
    {
      Name: 'John K. Martinez',
      avatar: 'https://assets.interviewhelp.io/INTERVIEW_HELP/reactjs/Code-Challenge-Mockup.png',
      occupation: 'Web Developer',
      id: '19',
      totalImpresions: 100,
      totalConversions: 10,
      totalRevenue: 1000,
      chartSummary: "Conversions 4/12 - 4/30",
      categories: ["2013-04-24 19:20:09", "2013-04-25 19:20:09", "2013-04-26 19:20:09", "2013-04-27 19:20:09", "2013-04-28 19:20:09", "2013-04-29 19:20:09", "2013-04-30 19:20:09", "2013-05-01 19:20:09"],
      series: [12, 2, 6, 89, 3, 5, 9, 43]
    }
    ])
  }, [])

  const sortData = (order: string) => {
    console.log(order);
  }

  return (
    <div className="App h-screen">
      <div className="header">
        <div className="md:flex flex-wrap mx-auto md:mx-0 w-fit">
          <Button description='Sort by name' handleOrderChange={sortData} />
          <Button description='Sort by name' handleOrderChange={sortData} />
          <Button description='Sort by name' handleOrderChange={sortData} />
          <Button description='Sort by name' handleOrderChange={sortData} />
        </div>
      </div>
      <div className="users-container flex">
        <div className="pagination-indicator-container">

        </div>
        <div className="card-container flex flex-wrap ml-auto mt-28">
          {
            formatedUsers.map((user: any) =>
              <UserCard
                key={user.id}
                data={user}
              />)
          }
        </div>
      </div>
    </div>
  )
}

export default App
