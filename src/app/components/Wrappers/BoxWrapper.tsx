"use client";

import React, { ReactNode } from "react";
import styled from "styled-components";

interface BoxWrapperProps {
  title?: string;
  children: ReactNode;
}

const Wrapper = styled.div`
  width: 622px;
  height: 729px;
  background: rgba(40, 40, 40, 0.7);
  backdrop-filter: blur(15px);
  border-radius: 8px;
  padding: 40px
`;

const BoxWrapper: React.FC<BoxWrapperProps> = ({ title, children }) => {
  return (
    <Wrapper className="flex flex-col justify-center items-center overflow-auto scrollbar-hidden">
        {title && (
          <h2 className="w-full text-white font-bold text-[32px] text-center pb-8">
            {title}
          </h2>
        )}
        {children}
    </Wrapper>
  );
};

export default BoxWrapper;
