'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CreateNewTask from '@/components/CreateNewTask';
import Done from '@/components/Done';
import NotDone from '@/components/NotDone';
import { useState } from 'react';
import SidebarMenu from '@/components/SidebarMenu';

export default function Home() { 

  const [undoneTasks, setUndoneTasks] = useState([]);

  const [doneTasks, setDoneTasks] = useState([]); //state for done tasks

  const [moveIn, setMoveIn] = useState(false);

  const [showUndone, setShowUndone] = useState(true);

  return (
    <>
      <Header setMoveIn={setMoveIn}/>

      <main className='w-full text-2xl
                        flex flex-col gap-4 items-center'>
        <SidebarMenu moveIn={moveIn} setMoveIn={setMoveIn} />

        <div id='overlay'
             className={`bg-gray-800 opacity-50 fixed inset-0 z-9
                        ${moveIn? '' : 'hidden'} duration-450 ease-in `}
              onClick={()=>setMoveIn(false)}
        ></div>
        
        <CreateNewTask undoneTasks={undoneTasks} setUndoneTasks={setUndoneTasks} />

        <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-500 via-yellow-300 via-50% to-red-500 bg-clip-text text-transparent">
          Tasks
        </h2>

        <div className='w-17/18 px-1 py-4 flex flex-row gap-1 border-b-[0.4px] border-gray-400'>
          <span
          className={`text-center w-1/2 text-xl lg:text-2xl
                  ${showUndone?'text-black font-bold': 'text-gray-500'} duration-100 ease-out`}
          onClick={()=>setShowUndone(true)}
          >
            In Progress 🚧🔨
          </span>

          <span 
            className={`text-center w-1/2 text-xl lg:text-2xl
                    ${showUndone? 'text-gray-500' : 'text-black font-bold'} duration-100 ease-out`}
            onClick={()=>setShowUndone(false)}
          >
            Done  ✅
          </span>
        </div>

        {showUndone?
          <NotDone doneTasks={doneTasks} setDoneTasks={setDoneTasks} undoneTasks={undoneTasks} setUndoneTasks={setUndoneTasks} />
        :
          <Done doneTasks={doneTasks} setDoneTasks={setDoneTasks} undoneTasks={undoneTasks} setUndoneTasks={setUndoneTasks} />
        }

      </main>

      <Footer />
    </>
  );
}
