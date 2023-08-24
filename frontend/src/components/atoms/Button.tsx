import { css } from '@emotion/react';
import React from 'react';

type ButtonProps = {
  onClick?: (e: React.MouseEvent) => void;
  action: '追加' | '完了';
  children: React.ReactNode;
};

const buttonStyle = (action: '追加' | '完了') => css`
  background-color: ${action === '追加' ? 'blue' : action === '完了' ? 'orange' : 'black'};
  color: white;
`;

const CustomButton = ({ action, children }: ButtonProps) => {
  return (
    <button css={buttonStyle(action)}>{children}</button>
  );
};

export default CustomButton;
