'use client';

import Task from './Task';
import { cookie } from '@/fonts';


const Done = ({ doneTasks, undoneTasks, setUndoneTasks, setDoneTasks }:{doneTasks: Array<string>, undoneTasks: Array<string>, setUndoneTasks: React.Dispatch<React.SetStateAction<string[]>>, setDoneTasks: React.Dispatch<React.SetStateAction<string[]>>}) => {
  return (
     <div className='my-8 w-full flex flex-col items-center gap-3'>
        <div className='completed-tasks flex flex-col items-center gap-4 w-6/10 min-w-[340px]'>
            {
              doneTasks!==null && doneTasks.length>0?
                 doneTasks.map((text, index) => <Task key={`doneTask ${text}`} index={index} taskText={text} undoneTasks={undoneTasks} setUndoneTasks={setUndoneTasks} doneTasks={doneTasks} setDoneTasks={setDoneTasks} isDone={true} />)
              : 
                 <div className='text-start w-full text-xl md:text-[22px] text-gray-500
                                 bg-gray-200 p-8 rounded-xl'><span className={`text-orange-500 text-3xl md:text-4xl p-2 ${cookie.className}`}>Complete</span>tasks and they&apos;ll appear here...</div>}
        </div>
    </div>
  )
}
export default Done;