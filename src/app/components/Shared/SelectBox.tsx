import React, { useState, useEffect } from 'react';
import { FaChevronDown } from "react-icons/fa";
import Image from 'next/image';  

interface Option {
  label: string;
  value: string;
  image: string;
}

interface SelectBoxProps {
  options: Option[];
  onChange: (value: string) => void;
}

const SelectBox: React.FC<SelectBoxProps> = ({ options, onChange }) => {
  // Set default to ETH when component first loads
  const [selectedValue, setSelectedValue] = useState<string>(() => {
    const defaultOption = options.find(option => option.value.toLowerCase() === 'eth') || options[0];
    return defaultOption ? defaultOption.value : '';
  });
  
  const [isOpen, setIsOpen] = useState<boolean>(false);
  useEffect(() => {
    if (selectedValue) {
      onChange(selectedValue);
    }
  }, []);

  const handleChange = (value: string) => {
    setSelectedValue(value);
    onChange(value);
    setIsOpen(false);
  };
  const selectedOption = options.find(option => option.value === selectedValue);

  return (
    <div className="relative inline-block w-64">
      <div
        className="flex justify-between items-center bg-[#EAEAEA] text-black rounded-[48px] py-5 ps-[30px] pr-10 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2">
          {selectedOption && (
            <Image
              src={selectedOption.image}
              alt={selectedOption.label}
              width={20}
              height={20}
              className="inline-block mr-2"
            />
          )}
          <span>
            {selectedOption?.label || 'Select an option'}
          </span>
        </div>
        <FaChevronDown color="#000" size={24} />
      </div>

      {isOpen && (
        <div className="absolute left-0 right-0 bg-white shadow-lg rounded-[12px] mt-2 py-2 z-10">
          {options.map((option) => (
            <div
              key={option.value}
              className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-[#f0f0f0] text-black"
              onClick={() => handleChange(option.value)}
            >
              <Image
                src={option.image}
                alt={option.label}
                width={20}
                height={20}
                className="inline-block mr-2"
              />
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectBox;