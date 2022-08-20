import { useState } from 'react'
import './assets/styles/App.scss'
import Button from './components/Button'

function App() {

  const sortData = (order: string) => {
    console.log(order);
  }

  return (
    <div className="App">
      <div className="header">
        <div className="md:flex flex-wrap mx-auto md:mx-0 w-fit">
          <Button description='Sort by name' handleOrderChange={sortData} />
          <Button description='Sort by name' handleOrderChange={sortData} />
          <Button description='Sort by name' handleOrderChange={sortData} />
          <Button description='Sort by name' handleOrderChange={sortData} />
        </div>
      </div>
    </div>
  )
}

export default App
