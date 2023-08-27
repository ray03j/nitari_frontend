import React, { useEffect, useState } from "react";
import { Card, CardProps } from "../molecules/Card";
import { ModalContainer } from "../molecules/ModalContainer";
import {  TaskDetailInfo } from "./TaskDetailInfo";
import axios from "axios";
import { GetTaskProps, TaskDetailInfoProps } from "../../types/type";

type TaskListProps = {
  Tasks: CardProps[];
};



export const TaskList: React.FC<TaskListProps> = ({Tasks}) => {
  const [isContentModalOpen, setIsContentModalOpen] = useState(false);
  const [idTask, setIdTask] = useState<GetTaskProps>()

  useEffect(() => {
    const getIdTasks = async () => {
      try {
        const res = await axios.get('https://nitaricupbackendserver.azurewebsites.net/api/TaskScheme/Id={id}')
        setIdTask(res.data)
      } catch (error) {
        alert('An GetIdTask error occurred'+ error)
      }
    }

    getIdTasks()


  },[])

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