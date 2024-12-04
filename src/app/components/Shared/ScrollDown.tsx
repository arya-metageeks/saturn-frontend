import React from 'react'
import { HiOutlineChevronDoubleDown } from "react-icons/hi";

const ScrollDown = () => {
  return (
    <div className='w-full justify-center items-center'>
       <div className='flex flex-col gap-4 justify-center items-center'>
            <HiOutlineChevronDoubleDown color='#fff' size={24} />
            <span className='text-white text-sm'>Scroll Down</span>
       </div>
    </div>
  )
}

export default ScrollDown