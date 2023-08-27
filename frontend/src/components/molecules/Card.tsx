import React from "react";
import { Label } from "../atoms/Label";
import { TaskText } from "../atoms/TaskText";
import "./Card.css";

export type CardProps = {
  onClick?: () => void;
  title: string;
  startDate: string;
  limitDate: string;  
};

export const Card: React.FC<CardProps> = ({ title, startDate, limitDate = 'text' }) => {

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
    </div>
  );
};