import React from "react";
import "./TaskNameCard.css"

type TaskNameCardProps= {
    taskName: string
};

export const TaskNameCard: React.FC<TaskNameCardProps> = ({ taskName = 'text' }) => {

  return (
    <div className = "taskNameCard">
        <div>{taskName}</div> 
    </div>
  );
};