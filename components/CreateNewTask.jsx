'use client';

import { useState } from "react";

const CreateNewTask = ({ undoneTasks, setUndoneTasks }) => {
    
    const [inputValue, setInputValue] = useState('');

    function addNewTask(){
        if (inputValue.trim().length>0){
            setUndoneTasks([...undoneTasks, inputValue]);
            //undoneTasks.push(inputValue) // It works but React may not detect the change and re-render the component.

            setInputValue(''); //clear input field
        }
    };

    function handleKeyDown(e){
        if (e.key==='Enter'){
            addNewTask();
        }
    };

  return (
        <div className='h-20 w-2/3 min-w-[340px] max-w-[1000px] rounded-2xl bg-orange-300 flex items-center mb-13 sticky top-3
                    shadow-lg sm:text-2xl md:text-3xl lg:text-4xl'>
            <div 
                className='flex justify-between items-center p-4 w-full'>
                <input 
                    id='taskInputValue'
                    autoComplete='on'
                    className='w-18/25 p-1 pl-1 rounded-xl font-bold
                            hover:bg-orange-200 hover:p-2 duration-300 ease-in-out'
                    type='text'
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder='Create a new task...'
                />

                <button
                    className='text-2xl border-1 rounded-xl p-1
                            hover:text-white hover:cursor-pointer hover:bg-orange-200 hover:text-3xl hover:p-3 hover:border-4 hover:rounded-xl duration-400'
                    onClick={addNewTask}
                >
                    +
                </button> 
            </div>
        </div>
  )
}

export default CreateNewTask;