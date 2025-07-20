import { useState } from 'react'
import { Plus } from 'lucide-react'
import GoalsList from './components/GoalsList'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='w-full h-full bg-gray-50'>
      <header className='w-full md:h-24 bg-white shadow p-6 flex justify-between items-center fixed'>
        <div>
          <h1 className='font-semibold text-3xl'>Financial Goals</h1>
          <p className='text-gray-500'>Track your progress towards financial independence</p>
        </div>
        <div>
          <button className='bg-orange-600 rounded-full flex p-3.5 items-center gap-2.5 cursor-pointer'>
            <Plus color='white'/>
            <span className='text-white font-semibold text-lg'>New Goal</span>
          </button>
        </div>
      </header>
      <div className='p-11 pt-36'>
        <GoalsList />
      </div>
    </div>
  )
}

export default App
