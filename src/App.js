import { useState, useEffect } from 'react'
import './App.css'
import Sidebar from './components/Sidebar'

const listItems = [
  { title: 'Dashboard', src: 'Chart_fill' },
  { title: 'Inbox', src: 'Chat' },
  { title: 'Accounts', src: 'User', gap: true },
  { title: 'Schedule ', src: 'Calendar' },
  { title: 'Search', src: 'Search' },
  { title: 'Analytics', src: 'Chart' },
  { title: 'Files ', src: 'Folder', gap: true },
  { title: 'Setting', src: 'Setting' },
]

function App() {
  const [width, setWidth] = useState(window.innerWidth)

  const [isOpen, setIsOpen] = useState(width > 640 ? true : false)

  const updateDimensions = () => {
    setWidth(window.innerWidth)
  }

  useEffect(() => {
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  useEffect(() => {
    if (width < 640) setIsOpen(false)
    else setIsOpen(true)
  }, [width])

  return (
    <div className="flex">
      <Sidebar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        listItems={listItems}
      ></Sidebar>
      <div className="p-7 text-2xl font-semibold flex-1 h-screen">
        <h1>Home Page</h1>
      </div>
    </div>
  )
}

export default App
