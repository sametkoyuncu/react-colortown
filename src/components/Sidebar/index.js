import React from 'react'

function Sidebar({ isOpen, setIsOpen, listItems }) {
  return (
    <div
      className={`${
        isOpen ? 'w-72' : 'w-20'
      } h-screen p-5 pt-8 duration-300 bg-sky-500 relative`}
    >
      {/* toggle button */}
      <img
        src="./assets/control.png"
        className={`absolute cursor-pointer -right-3 top-9 w-7 rounded-full border-2 border-sky-500 ${
          !isOpen && 'rotate-180'
        }`}
        alt="sidebar toggle button"
        onClick={() => setIsOpen(!isOpen)}
      />

      {/* logo */}
      <div className="flex gap-x-4 items-center">
        <img
          src="./assets/logo.png"
          className={`cursor-pointer duration-500 shadow-lg rounded-lg ${
            !isOpen && 'rotate-[360deg]'
          }`}
          alt="color town logo"
        />
        <h1
          className={`text-white origin-left font-medium text-xl duration-300 ${
            !isOpen && 'scale-0'
          }`}
        >
          ColorTown
        </h1>
      </div>
      <ul className="pt-6">
        {listItems.map((item, index) => (
          <li
            key={index}
            className={`text-gray-100 text-md font-medium flex items-center gap-x-4 cursor-pointer p-2 duration-300 rounded-lg hover:bg-sky-400 hover:shadow-sm ${
              item.gap ? 'mt-9' : 'mt-2'
            } ${index === 0 && 'bg-sky-400'}`}
          >
            <img src={`./assets/${item.src}.png`} alt="{item.title}"></img>
            <span
              className={`${!isOpen && 'scale-0'}  origin-left duration-300`}
            >
              {item.title}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Sidebar
