'use client';

import Task from './Task';
import localFont from 'next/font/local';

const cookie = localFont({
  src: '../public/font/Cookie-Regular.ttf',
  weight: '400',
  style: 'normal',
  display: 'swap',
})

import { useState } from 'react';

const Done = ({ doneTasks, undoneTasks, setUndoneTasks, setDoneTasks }) => {
  return (
     <div className='my-8 flex flex-col items-center gap-3'>
        <span className='text-start w-full text-2xl lg:text-3xl text-gray-500 ml-13'>Done  ✅</span>
        <div className='completed-tasks flex flex-col items-center gap-4 w-6/10 min-w-[340px]'>
            {
              doneTasks!==null && doneTasks.length>0?
                 doneTasks.map((text, index) => <Task key={index} id={`Task${index+1}`} taskText={text} undoneTasks={undoneTasks} setUndoneTasks={setUndoneTasks} doneTasks={doneTasks} setDoneTasks={setDoneTasks} isDone={true} />)
              : 
                 <div className='text-start w-full text-xl md:text-[22px] text-gray-500
                                 bg-gray-100 p-8 rounded-xl'><span className={`text-orange-500 text-3xl md:text-4xl p-2 ${cookie.className}`}>Complete</span>tasks and they'll appear here...</div>}
        </div>
    </div>
  )
}
export default Done;