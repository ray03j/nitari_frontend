import React from "react";
import { CardProps } from "../molecules/Card";
import { TaskNameCard } from "../molecules/TaskNameCard";

type TaskNameListProps = {
    TaskNames: CardProps[];
};

export const TaskNameList: React.FC<TaskNameListProps> = ({ TaskNames }) => {
    return (
      <>
        <h2>タスク名一覧</h2>
        
          {TaskNames.map((task, index) => (
            <div key={index}>
              <TaskNameCard
                taskName ={task.taskName}
              />
              </div>
          ))}
          </>
    );
  };