export type DescriptionProps = {
  accessToken: string | null;
  title: string;
  description: string;
  startDate: string;
  limitDate: string; 
  createdAt: string;
};


export type InputValueProps = {
  title: string;
  description: string;
  startDate: string;
  limitDate: string; // 08/24/2023 21:19:49 yyyy-mm-dd
};

export type GetTaskProps = {
  id?: string;
  title?: string;
  description?: string;
  startDate?: string;
  limitDate?: string; 
  createdAt?: string;
  isDone?: boolean;
  doneDate?: string;
  score?: number;
  userId?: string;
};

export type TaskDetailInfoProps = {
  idTask: GetTaskProps | null;
}

export type Finished10TasksProps = {
  FinishedTasks: GetTaskProps[]
}

export type NotFinished10TasksProps = {
  NotFinishedTasks: GetTaskProps[]
}
