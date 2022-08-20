import { useEffect, useState } from 'react'
import './assets/styles/App.scss'
import Button from './components/Button'
import UserCard from './components/UserCard';
import { UserRecord } from './types';

function App() {

  const [users, setUsers] = useState<UserRecord>();
  const [formatedUsers, setFormatedUsers] = useState<any>();

  useEffect(() => {
    setFormatedUsers([{
      Name: 'John K. Martinez',
      avatar: 'https://assets.interviewhelp.io/INTERVIEW_HELP/reactjs/Code-Challenge-Mockup.png',
      occupation: 'Web Developer',
      id: '1',
      totalImpresions: 100,
      totalConversions: 10,
      totalRevenue: 1000,
      charSummary: "Conversions 4/12 - 4/30"
    },
    {
      Name: 'John K. Martinez',
      avatar: 'https://assets.interviewhelp.io/INTERVIEW_HELP/reactjs/Code-Challenge-Mockup.png',
      occupation: 'Web Developer',
      id: '11',
      totalImpresions: 100,
      totalConversions: 10,
      totalRevenue: 1000,
      charSummary: "Conversions 4/12 - 4/30"
    },
    {
      Name: 'John K. Martinez',
      avatar: 'https://assets.interviewhelp.io/INTERVIEW_HELP/reactjs/Code-Challenge-Mockup.png',
      occupation: 'Web Developer',
      id: '15',
      totalImpresions: 100,
      totalConversions: 10,
      totalRevenue: 1000,
      charSummary: "Conversions 4/12 - 4/30"
    },
    {
      Name: 'John K. Martinez',
      avatar: 'https://assets.interviewhelp.io/INTERVIEW_HELP/reactjs/Code-Challenge-Mockup.png',
      occupation: 'Web Developer',
      id: '19',
      totalImpresions: 100,
      totalConversions: 10,
      totalRevenue: 1000,
      charSummary: "Conversions 4/12 - 4/30"
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
                Name={user.Name}
                avatar={user.avatar}
                occupation={user.occupation}
                totalConversions={user.totalConversions}
                totalImpresions={user.totalImpresions}
                totalRevenue={user.totalRevenue}
                id={user.id}
                chartSummary={user.charSummary}
              />)
          }
        </div>
      </div>
    </div>
  )
}

export default App
