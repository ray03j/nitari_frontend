import React from "react";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Label } from "../atoms/Label";
import { TaskText } from "../atoms/TaskText";
import "./Card.css";

export type CardProps = {
  taskName: string;
  taskDescription: string;
  startDate: string;
  dueDate: string; // 08/24/2023 21:19:49 yyyy-mm-dd
};

export const Card: React.FC<CardProps> = ({ taskName, taskDescription, dueDate, startDate = 'text' }) => {

  return (
    <div className = "card">
      
      <div className="Task">
        <Label>たすく</Label>
        <div>{taskName}</div>
      </div>

      <div className="Task_date"> <Label>煮込みはじめ日</Label>
        <TaskText>{startDate}</TaskText>

        <Label>煮込みすぎ日</Label>
        <TaskText>{dueDate}</TaskText>
      </div> 
    </div>
  );
};