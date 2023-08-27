import { GetTaskProps } from "../../types/type";



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
  return (
    <div>
      <div>{title}</div>

      <div>{description}</div>
      
      <div>{startDate}</div>
      <div>{limitDate}</div> 
      
      <div>{createdAt}</div>
      
      <div>{isDone}</div>
      <div>{doneDate}</div>
      
      <div>{score}</div>

      <div>{userId}</div>
    </div>
  );
};
