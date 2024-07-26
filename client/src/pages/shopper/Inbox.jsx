import React from "react";
import search from "../../assets/icons/search.svg";

const Inbox = () => {
  return (
    <div class="flex flex-row h-screen">
      <div class="flex flex-row flex-auto rounded-tl-xl">
        <div class="flex flex-col w-1/5">
          <div className="flex flex-col gap-6 px-2 md:px-5">
            <div class="flex-none font-semibold ">Conversations</div>
            <div className="relative">
              <input
                type="text"
                class="w-full px-7 py-2 text-sm border border-gray-200 focus:outline-none focus:border-arfagreen focus:ring-0 focus:ring-arfagreen focus:bg-white "
                placeholder="Search..."
                id="catalogSearchbar convoSearchBar"
              ></input>
              <img
                src={search}
                alt="Search"
                className="absolute top-0 w-3 h-full cursor-pointer left-2"
                width=""
                height="auto"
              />
            </div>
          </div>

          <div class="flex-auto overflow-y-auto">
            <a class="block border-b">
              <div class="border-l-2 border-transparent hover:bg-gray-100 p-3 space-y-4">
                <div class="flex flex-row items-center space-x-2">
                  <div className="flex items-center flex-1 gap-2">
                    <svg
                      class="w-7 h-7 text-black"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    <div class="flex text-arfablack font-semibold text-sm">
                      Nikola Tesla
                    </div>
                  </div>
                  <div class="text-sm text-gray-500">5hr</div>
                </div>

                <div class="flex flex-row items-center space-x-1">
                  <div class="flex-grow text-gray-500 truncate text-xs">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Inventore, nihil.
                  </div>
                </div>
              </div>
            </a>

            <a class="block border-b">
              <div class="border-l-2 border-arfagreen bg-gray-100 p-3 space-y-4">
                <div class="flex flex-row items-center space-x-2">
                  <div className="flex items-center flex-1 gap-2">
                    <svg
                      class="w-7 h-7 text-black"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    <div class="flex text-arfablack font-semibold text-sm">
                      Nikola Tesla
                    </div>
                  </div>
                  <div class="text-sm text-gray-500">5hr</div>
                </div>

                <div class="flex flex-row items-center space-x-1">
                  <div class="flex-grow truncate text-arfablack text-xs">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Inventore, nihil.
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>

        <div class="w-3/5 border-l flex flex-1 flex-col">
          <div class="flex-none h-12 flex flex-row justify-between items-center p-5 border-b">
            <div class="flex flex-col space-y-1">
              <div className="font-semibold">Nikola Tesla</div>
            </div>
          </div>

          <div
            class="flex-auto overflow-y-auto p-5 space-y-4"
            // style="background-image: url(https://static.intercomassets.com/ember/assets/images/messenger-backgrounds/background-1-99a36524645be823aabcd0e673cb47f8.png)"
          >
            <div class="flex flex-row space-x-2">
              <svg
                class="flex-none w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>

              <div class="flex flex-col">
                <div class="bg-gray-200 rounded p-5 text-sm">
                  Some message text
                </div>
                <div class="text-sm text-gray-600">4hr ago</div>
              </div>
            </div>
            <div class="flex flex-row space-x-2  space-x-reverse">
              <svg
                class="flex-none w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>

              <div class="flex flex-col">
                <div class="bg-blue-100 rounded p-5 text-sm">
                  Some message text
                </div>
                <div class="text-sm text-gray-600">5hr ago</div>
              </div>
            </div>
          </div>

          <div class="flex-none h-fit px-5 pt-0">
            <textarea class="w-full min-h-16 max-h-32 px-2 py-2 text-sm border border-gray-200 focus:outline-none focus:border-arfagreen focus:ring-0 focus:ring-arfagreen focus:bg-white ">
              Hi
            </textarea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inbox;
