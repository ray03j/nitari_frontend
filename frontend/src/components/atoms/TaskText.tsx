type TaskTextProps = {
  children: React.ReactNode;
}

export const TaskText: React.FC<TaskTextProps> = ({ children }) => {
  return <div>{children}</div>;
};