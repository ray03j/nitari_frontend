import React from "react";
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
          title={task.title}
          startDate={task.startDate}
          limitDate={task.limitDate}
          />
      </div>
    ))}
    </>
  );
};