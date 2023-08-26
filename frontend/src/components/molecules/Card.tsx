import React from "react";
import { Label } from "../atoms/Label";
import { TaskText } from "../atoms/TaskText";
import "./Card.css";

export type CardProps = {
  title: string;
  startDate: string;
  limitDate: string; // 08/24/2023 21:19:49 yyyy-mm-dd
};

export const Card: React.FC<CardProps> = ({ title, startDate, limitDate = 'text' }) => {

  return (
    <div className = "card">
      
      <div className="Task">
        <Label>たすく</Label>
        <div>{title}</div>
      </div>

      <div className="Task_date"> <Label>煮込みはじめ日</Label>
        <TaskText>{startDate}</TaskText>

        <Label>煮込みすぎ日</Label>
        <TaskText>{limitDate}</TaskText>
      </div> 
    </div>
  );
};