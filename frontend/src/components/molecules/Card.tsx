import React from "react";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Label } from "../atoms/Label";
import { TaskText } from "../atoms/TaskText";

type CardProps = {
  taskName: string;
  taskDescription: string;
  startDate: string;
  dueDate: string; // 08/24/2023 21:19:49 yyyy-mm-dd
};

export const Card: React.FC<CardProps> = ({ taskName, taskDescription, dueDate, startDate = 'text' }) => {

  return (
    <>
    <Label>たすく</Label>
    <TaskText>{taskName}</TaskText>
    
    <Label>たすくのせつめい</Label>
    <TaskText>{taskDescription}</TaskText>

    <Label>煮込みはじめ日</Label>
    <TaskText>{startDate}</TaskText>

    <Label>煮込みすぎ日</Label>
    <TaskText>{dueDate}</TaskText>
    </>
  );
};