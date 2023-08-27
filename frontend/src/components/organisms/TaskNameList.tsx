import React from "react";
import { CardProps } from "../molecules/Card";
import { TaskNameCard } from "../molecules/TaskNameCard";

type TaskNameListProps = {
    taskNames: CardProps[];
};

export const TaskNameList: React.FC<TaskNameListProps> = ({ taskNames }) => {
    return (
      <>
        <h2>タスク名一覧</h2>
        
          {taskNames.map((task, index) => (
            <div key={index}>
              <TaskNameCard
                taskName ={task.title}
              />
              </div>
          ))}
          </>
    );
  };