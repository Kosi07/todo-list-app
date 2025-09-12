'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';
import uncheckedImg from '@/public/unchecked.svg';
import checkedImg from '@/public/checked2.svg';
import deleteImg from '@/public/delete.svg';

const Task = ({taskText, doneTasks, setDoneTasks, undoneTasks, setUndoneTasks}) => {

  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {console.log(`Effect ;isChecked${isChecked}`)} , [isChecked]);

  const moveTasksBetweenArrays = () => {
    if(isChecked===true)
      {
        setDoneTasks([...doneTasks, taskText])
        setUndoneTasks(undoneTasks.filter(task => task !== taskText))
      }
      else if (isChecked===false){
        setUndoneTasks([...undoneTasks, taskText])
        setDoneTasks(doneTasks.filter(task => task !== taskText))
      }
  };

  return (
    <div 
      className={`h-25 w-2/3 min-w-[340px] max-w-[1000px] font-[415] rounded-2xl bg-white border border-gray-200  
                  flex items-center flex-row gap-3 p-2
                  shadow-lg shadow-orange-200/50`}
      >
        <Image 
            className='w-1/4 h-2/3
                        hover:cursor-pointer hover:scale-160 duration-400 ease-in-out'
            src={isChecked? checkedImg : uncheckedImg}
            alt='checkbox'
            onClick={ ()=>{
                            setIsChecked(!isChecked);
                            //console.log(`from onClick isChecked: ${isChecked}`);

                            moveTasksBetweenArrays();
                          }
                     }
        />

        <div className='overflow-auto wrap-break-word max-h-4/5 w-3/4 max-w-3/4'>
            {taskText}
        </div>

        <Image 
            className='w-1/5 h-1/2
                        hover:cursor-pointer hover:scale-160 duration-400 ease-in-out'
            src={deleteImg}
            alt='delete icon'
        />
    </div>
  )
}

export default Task;