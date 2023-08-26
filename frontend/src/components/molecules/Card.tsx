import React from "react";
import { Label } from "../atoms/Label";
import { TaskText } from "../atoms/TaskText";
import "./Card.css";
import Button from "../atoms/Button";

export type CardProps = {
  onOpen?: () => void;
  title: string;
  startDate: string;
  limitDate: string;  
};

export const Card: React.FC<CardProps> = ({onOpen, title, startDate, limitDate }: CardProps) => {

  return (
    <div className = "card">
      
      <div className="Task">
        <div>{title}</div>
      </div>

      <div className="Task_date">
        <div className="start">
          <Label>煮込みはじめ日</Label>
          <TaskText>{startDate}</TaskText>
        </div>
        <div className="childa">～</div>
        <div className="limit">
          <Label>煮込みすぎ日</Label>
          <TaskText>{limitDate}</TaskText>
        </div>
      </div> 
        <Button onClick={onOpen}>開く</Button>
    </div>
  );
};