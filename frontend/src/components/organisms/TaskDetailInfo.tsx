import { GetTaskProps } from "../../types/type";
import { format } from "date-fns";
import "./TaskDetailInfo.css";


export const TaskDetailInfo: React.FC<GetTaskProps>= ({
  id,
  title,
  description,
  startDate,
  limitDate, 
  createdAt,
  isDone,
  doneDate,
  score,
  userId,
}) => {
  const taskinfo ={
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    title: "string",
    description: "string",
    startDate: "2023-08-26T06:54:17.863Z",
    limitDate: "2023-08-26T06:54:17.863Z",
    createdAt: "2023-08-26T06:54:17.863Z",
    isDone: true,
    doneDate: "2023-08-26T06:54:17.863Z",
    score: 0,
    userId: "string"
  }

  const formattedStartDate = format(new Date(taskinfo.startDate), 'yyyy-MM-dd HH:mm');
  const formattedLimitDate = format(new Date(taskinfo.limitDate), 'yyyy-MM-dd HH:mm');
  const formattedCreatedAt = format(new Date(taskinfo.createdAt), 'yyyy-MM-dd HH:mm');
  const formattedDoneDate = taskinfo.isDone ? format(new Date(taskinfo.doneDate), 'yyyy-MM-dd HH:mm') : '';

  return (
    <div className="taskinfo">
      
      <div className="taskcontents">タスク名 {taskinfo.title}</div>

      <div>タスクの詳細 {taskinfo.description}</div>
      
      <div className="nowrap-contents">煮込みはじめ日 {formattedStartDate}</div>
      <div className="nowrap-contents">煮込み終わり日 {formattedLimitDate}</div> 
      
      <div className="nowrap-contents">タスクを作成した日時 {formattedCreatedAt}</div>

      {taskinfo.isDone
        ?(
          <>
          <div className="nowrap-contents">タスクを終了した日時 {formattedDoneDate}</div>
          <div>スコア {taskinfo.score}</div>
          <div className="finished-task">タスクが終了しています!</div>
          </>)

        :null
      }  
        
      
    </div>
  );
};
