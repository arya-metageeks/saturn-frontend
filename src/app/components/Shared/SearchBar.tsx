'use client'

import React from 'react'
import styled from "styled-components"
import { InputProps } from '@/app/interfaces/Input'
import Button from './Button'

const InputContainer = styled.div`
    min-width:552px;
    maz-width: 100%;
    position: relative;
    border-radius: 100px;
    padding: 7px 13px 7px 32px;
    border: 2px solid #fff;
    display: flex;
    align-items: center;
`

const Input = styled.input`
    width: 100%;
    border: none;
    outline: none;
    background: transparent;
    &::placeholder{
        color: #8c8c8c;
        font-weight: bold;
        font-size: 14px;
    }
`

const SearchBar: React.FC<InputProps> = ({placeholder, value, onChange, required=false, className}) => {
  return (
    <InputContainer className={className || ""}>
        <Input placeholder={placeholder || ""} value={value} onChange={(e) => onChange(e.target.value)} required={required} />
        <Button title='Start Trading'  onClick={()  => {}}/>
    </InputContainer>
  )
}

export default SearchBar