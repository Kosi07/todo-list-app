'use client';

import Image from 'next/image';
import uncheckedImg from '@/public/unchecked.svg';
import checkedImg from '@/public/checked2.svg';
import deleteImg from '@/public/delete.svg';

const Task = ({index, taskText, doneTasks, setDoneTasks, undoneTasks, setUndoneTasks, isDone }) => {

  let newCheckedState = isDone===null? false : isDone;

  const moveTasksBetweenArrays = (newCheckedState) => {
    if(newCheckedState===true)
      {
        setDoneTasks([...doneTasks, taskText])
        setUndoneTasks(undoneTasks.filter(task => task !== taskText))
      }
      else if (newCheckedState===false){
        setUndoneTasks([...undoneTasks, taskText])
        setDoneTasks(doneTasks.filter(task => task !== taskText))
      }
  };

  const deleteTask = () => {
    console.log(`from deleteTask isDone: ${isDone}`); 
    console.log(`from deleteTask taskText: ${taskText}`);
    console.log(' '); 

    if(isDone===true){
        setDoneTasks(doneTasks.filter((task) => task !== taskText))
      }
      else if (isDone===undefined){
        setUndoneTasks(undoneTasks.filter((task) => task !== taskText))
      }
  };

  const editTask = () => {
    if (isDone===true) return; // Prevent editing if the task is marked as done
    const editedText = prompt('Edit your task:', taskText);

    if (editedText !== null && editedText.trim() !== ''){
      undoneTasks.map((task) => 
        {
          if (task===taskText){
            setUndoneTasks(undoneTasks.map((t)=> t===taskText? editedText : t))
          }
        })
    }
  };

  return (
    <div 
      className={`h-20 w-2/3 min-w-[340px] max-w-[1000px] font-[415] rounded-2xl bg-white border border-gray-200  
                  flex items-center flex-row gap-3 p-2
                  shadow-lg shadow-orange-200/50
                  hover:bg-gray-100 duration-400 ease-in`}
      >
        <Image 
            id='checkbox-icon'
            className='w-1/4 h-2/3
                        hover:cursor-pointer hover:scale-130 duration-400 ease-in-out'
            src={isDone?checkedImg:uncheckedImg}
            alt='checkbox-icon'
            title={isDone? 'Mark as not done?' : 'Mark as done?'}
            onClick={ ()=>{
                            newCheckedState = !newCheckedState;
                            console.log(`from onClick newCheckedState: ${newCheckedState}`);
                            console.log(' ');

                            moveTasksBetweenArrays(newCheckedState);
                          }
                     }
        />

        <div 
            className={`overflow-auto wrap-break-word max-h-4/5 w-3/4 max-w-3/4 ${isDone? 'text-gray-400' : ''} ${isDone? 'line-through' : ''} decoration-2 decoration-black`}
            onClick={editTask}
        >
            {taskText}
        </div>

        <Image 
            className='w-1/5 h-9/20 bg-red-500 rounded-xl
                        hover:cursor-pointer hover:bg-red-400 active:scale-120 hover:shadow-lg hover:scale-120 duration-400 ease-in-out'
            onClick={()=>deleteTask(index)}
            src={deleteImg}
            alt='delete icon'
            title='Delete task'
        />
    </div>
  )
}

export default Task;