import React from 'react'

function Sidebar2() {
  return (
    <div className="h-screen flex items-end justify-end px-4 pb-6">
      <button className="relative z-30 lg:hidden peer h-14 w-14 rounded-full bg-cyan-500 hover:bg-cyan-600 focus:bg-cyan-600 active:bg-cyan-700 transition">
        <span className="text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="w-6 m-auto"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M3.646 9.146a.5.5 0 0 1 .708 0L8 12.793l3.646-3.647a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 0-.708zm0-2.292a.5.5 0 0 0 .708 0L8 3.207l3.646 3.647a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 0 0 0 .708z"
            />
          </svg>
        </span>
      </button>

      <div className="z-20 fixed top-0 -left-96 lg:left-0 h-screen w-6/10 md:w-60 lg:w-72 bg-white shadow-2xl peer-focus:left-0 peer:transition ease-out delay-150 duration-200">
        <nav role="navigation" className="p-6">
          <div className="flex items-center gap-4 pb-4">
            <img
              className="w-32"
              src="https://raw.githubusercontent.com/Meschacirung/Tailus-website/f59a4b3ecc1ad9f6a2b0ad9e3fca6f957140cc4d/public/images/logo.svg"
              alt="tailus-logo"
            />
          </div>

          {/* <div className="relative">
            <form
              action=""
              className="text-gray-500 focus-within:text-cyan-400 focus-within:bg-white focus-within:shadow rounded search transition duration-300"
            >
              <div className="relative w-full">
                <div className="absolute top-0 bottom-0 h-full flex items-center mb-auto left-4">
                  <svg
                    xmlns="http://ww50w3.org/2000/svg"
                    className="w-4 fill-current"
                    viewBox="0 0 35.997 36.004"
                  >
                    <path
                      id="Icon_awesome-search"
                      data-name="search"
                      d="M35.508,31.127l-7.01-7.01a1.686,1.686,0,0,0-1.2-.492H26.156a14.618,14.618,0,1,0-2.531,2.531V27.3a1.686,1.686,0,0,0,.492,1.2l7.01,7.01a1.681,1.681,0,0,0,2.384,0l1.99-1.99a1.7,1.7,0,0,0,.007-2.391Zm-20.883-7.5a9,9,0,1,1,9-9A8.995,8.995,0,0,1,14.625,23.625Z"
                    ></path>
                  </svg>
                </div>
                <input
                  type="search"
                  placeholder="Rechercher"
                  name="search"
                  id="search"
                  className="text-sm text-gray-500 placeholder-gray-500 w-full rounded py-3 pr-4 pl-12 bg-gray-200 bg-opacity-75 outline-none focus:bg-transparent focus:rounded-3xl transition-all"
                />
              </div>
            </form>
          </div> */}

          <div className="mt-4 -mx-4 relative overflow-y-auto overflow-x-hidden h-[85vh]">
            <span className="uppercase px-4 text-gray-500">Docs</span>
            <ul className="space-y-4 mb-12 px-4 mt-8">
              <li>
                <a
                  href="#"
                  className="flex gap-4 text-gray-600 hover:text-gray-800 transition"
                >
                  <img
                    src="https://raw.githubusercontent.com/Meschacirung/Tailus-website/f59a4b3ecc1ad9f6a2b0ad9e3fca6f957140cc4d/public/images/icons/favorites.svg"
                    className="w-6"
                    alt=""
                  />
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex gap-4 text-gray-600 hover:text-gray-800 transition"
                >
                  <img
                    src="https://raw.githubusercontent.com/Meschacirung/Tailus-website/f59a4b3ecc1ad9f6a2b0ad9e3fca6f957140cc4d/public/images/icons/atom.svg"
                    className="w-6"
                    alt=""
                  />
                  Atomic css
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex gap-4 text-gray-600 hover:text-gray-800 transition"
                >
                  <img
                    src="https://raw.githubusercontent.com/Meschacirung/Tailus-website/f59a4b3ecc1ad9f6a2b0ad9e3fca6f957140cc4d/public/images/icons/molecule.svg"
                    className="w-6"
                    alt=""
                  />
                  Atomic Design
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex gap-4 text-gray-600 hover:text-gray-800 transition"
                >
                  <img
                    src="https://raw.githubusercontent.com/Meschacirung/Tailus-website/f59a4b3ecc1ad9f6a2b0ad9e3fca6f957140cc4d/public/images/icons/template.svg"
                    className="w-6"
                    alt=""
                  />
                  Default look
                </a>
              </li>
            </ul>
            <ul className="space-y-4">
              <li className="pr-2">
                <div className="py-2 px-4 text-gray-700 uppercase">
                  <a href="#" className="block">
                    Atoms
                  </a>
                </div>
                <ul className="text-sm pb-24">
                  <li>
                    <a
                      href="#"
                      className="block py-2 px-5 rounded bg-cyan-500 bg-opacity-10 hover:bg-opacity-20 text-cyan-500"
                    >
                      Alert
                    </a>
                  </li>
                  <li>
                    <a
                      className="block py-2 px-5 hover:text-gray-800 transition"
                      href="#"
                    >
                      Avatars
                    </a>
                  </li>
                  <li>
                    <a
                      className="block py-2 px-5 hover:text-gray-800 transition"
                      href="#"
                    >
                      Badges
                    </a>
                  </li>
                  <li>
                    <a
                      className="block py-2 px-5 hover:text-gray-800 transition"
                      href="#"
                    >
                      Banners
                    </a>
                  </li>
                  <li>
                    <a
                      className="block py-2 px-5 hover:text-gray-800 transition"
                      href="#"
                    >
                      Buttons
                    </a>
                  </li>
                  <li>
                    <a
                      className="block py-2 px-5 hover:text-gray-800 transition"
                      href="#"
                    >
                      Button-groups
                    </a>
                  </li>
                  <li>
                    <a
                      className="block py-2 px-5 hover:text-gray-800 transition"
                      href="#"
                    >
                      Avatar
                    </a>
                  </li>
                  <li>
                    <a
                      className="block py-2 px-5 hover:text-gray-800 transition"
                      href="#"
                    >
                      Badges
                    </a>
                  </li>
                  <li>
                    <a
                      className="block py-2 px-5 hover:text-gray-800 transition"
                      href="#"
                    >
                      Checkboxes
                    </a>
                  </li>
                  <li>
                    <a
                      className="block py-2 px-5 hover:text-gray-800 transition"
                      href="#"
                    >
                      Chips
                    </a>
                  </li>
                  <li>
                    <a
                      className="block py-2 px-5 hover:text-gray-800 transition"
                      href="#"
                    >
                      File inputs
                    </a>
                  </li>
                  <li>
                    <a
                      className="block py-2 px-5 hover:text-gray-800 transition"
                      href="#"
                    >
                      Flags
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      <div className="z-10 lg:hidden fixed top-0 left-0 w-screen h-screen bg-gray-900 bg-opacity-30 opacity-0 peer-focus:opacity-100 peer:transition duration-200"></div>
    </div>
  )
}

export default Sidebar2
