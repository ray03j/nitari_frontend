import React, { useState } from "react";
import { Card, CardProps } from "../molecules/Card";
import { ModalContainer } from "../molecules/ModalContainer";
import {  TaskDetailInfo } from "./TaskDetailInfo";
import { GetTaskProps} from "../../types/type";

type TaskListProps = {
  Tasks: CardProps[];
};



export const TaskList: React.FC<TaskListProps> = ({Tasks}) => {
  const [isContentModalOpen, setIsContentModalOpen] = useState(false);
  const [idTask, setIdTask] = useState<GetTaskProps>()

  const openContentModal = () => {
    setIsContentModalOpen(true)
  }
  const closeContentModal = () => {
    setIsContentModalOpen(false)
  }

  return (
    <>
    <h2>タスク詳細</h2>
    {Tasks.map((task, index) => (
      <div key={index}>
        <Card
          onOpen={openContentModal}
          title={task.title}
          startDate={task.startDate}
          limitDate={task.limitDate}
          />
        <ModalContainer isOpen={isContentModalOpen} onClose={closeContentModal}>
          <TaskDetailInfo {...idTask} />
        </ModalContainer>
      </div>
    ))}
    </>
  );
};