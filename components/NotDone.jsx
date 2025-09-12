'use client';

import Task from './Task';
import { useState } from 'react';

const NotDone = ({ undoneTasks, doneTasks, setDoneTasks, setUndoneTasks }) => {
  return (
     <div className='my-8 flex flex-col items-center gap-3'>
        <span className='text-start w-full text-2xl lg:text-3xl text-gray-500 ml-4'>Not Done ❌</span>

        <div className='tasks flex flex-col items-center gap-4 w-6/10 min-w-[340px]'>
            {
              undoneTasks!=null && undoneTasks.length>0?
                undoneTasks.map((text, index) => <Task key={index} taskText={text} doneTasks={doneTasks} setDoneTasks={setDoneTasks} undoneTasks={undoneTasks} setUndoneTasks={setUndoneTasks}/>)
              : 
                <div className='text-start w-full text-xl md:text-2xl text-gray-700 ml-4'>Create tasks and they'll appear here...</div>
            }
        </div>
    </div>
  )
}

export default NotDone