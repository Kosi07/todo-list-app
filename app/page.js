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

  const [moveIn, setMoveIn] = useState(true);

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

        <NotDone doneTasks={doneTasks} setDoneTasks={setDoneTasks} undoneTasks={undoneTasks} setUndoneTasks={setUndoneTasks} />

        <Done doneTasks={doneTasks} setDoneTasks={setDoneTasks} undoneTasks={undoneTasks} setUndoneTasks={setUndoneTasks} />
      </main>

      <Footer />
    </>
  );
}
