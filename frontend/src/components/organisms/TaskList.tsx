import React from "react";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardProps } from "../molecules/Card";

type TaskListProps = {
  Tasks: CardProps[];
};

export const TaskList: React.FC<TaskListProps> = ({Tasks}) => {


  return (
    <>
    {Tasks.map((task, index) => (
      <div key={index}>
        <Card
          taskName={task.taskName}
          taskDescription={task.taskDescription}
          startDate={task.startDate}
          dueDate={task.dueDate}
          />
      </div>
    ))}
    </>
  );
};