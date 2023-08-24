type LabelProps = {
  children: React.ReactNode;
}

export const Label: React.FC<LabelProps> = ({ children }) => {
  return <label>{children}</label>;
};