'use client'

import React from "react";
import { ButtonProps } from "@/app/interfaces/Button";
import styled from "styled-components";

const StyledButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 16px 32px;
  gap: 8px;

  width: 169px;
  height: 55px;

  background: #e8a690;
  box-shadow: inset 7px 10px 8.4px rgba(0, 0, 0, 0.25);
  border-radius: 48px;
  font-weight: bold;
  flex: none;
  order: 0;
  flex-grow: 0;
  z-index: 0;
`;

const Button: React.FC<ButtonProps> = ({ title, onClick, className }) => {
  return (
    <StyledButton
      onClick={onClick}
      className={`border-0 outline-none text-center ${className}`}
    >
      {title || ""}
    </StyledButton>
  );
};

export default Button;
