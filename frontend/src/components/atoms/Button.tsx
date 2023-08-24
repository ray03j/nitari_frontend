/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import React from 'react';

type ButtonProps = {
  onClick?: (e: React.MouseEvent) => void;
  action: '追加' | '完了';
  children: React.ReactNode;
}

const StyledButton = styled.button<ButtonProps>`
  background-color: ${({ action }) =>
  action === '追加' ? 'blue' : 
  action === '完了' ? 'orange' : 
  'black'};
  color: white;
`;

const CustomButton = ({ action, children }: ButtonProps) => {
  return <StyledButton action={action}>{children}</StyledButton>;
};

export default CustomButton;