'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CreateNewTask from '@/components/CreateNewTask';
import Done from '@/components/Done';
import NotDone from '@/components/NotDone';
import { useState } from 'react';

export default function Home() { 

  const [undoneTasks, setUndoneTasks] = useState([]);

  const [doneTasks, setDoneTasks] = useState([]); //state for done tasks

  return (
    <>
      <Header />

      <main className='w-full text-2xl
                        flex flex-col gap-4 items-center'>
        <CreateNewTask undoneTasks={undoneTasks} setUndoneTasks={setUndoneTasks} />

        <NotDone doneTasks={doneTasks} setDoneTasks={setDoneTasks} undoneTasks={undoneTasks} setUndoneTasks={setUndoneTasks} />

        <Done doneTasks={doneTasks} setDoneTasks={setDoneTasks} undoneTasks={undoneTasks} setUndoneTasks={setUndoneTasks} />
      </main>

      <Footer />
    </>
  );
}
