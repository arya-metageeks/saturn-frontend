import React from 'react'

interface ProgressBarProps {
    completed: string
}

const ProgressBar: React.FC<ProgressBarProps> = ({completed}) => {
  return (
    <div className="relative w-full h-2.5 bg-[#A1A1A1] rounded-full">
    <div className="absolute top-0 left-0 h-full bg-[#556FF5] rounded-full" style={{width: `${completed}%`}}></div>
    <div className={`absolute top-[50%] left-[${completed}%] transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#556FF5] rounded-full`}></div>
</div>
  )
}

export default ProgressBar