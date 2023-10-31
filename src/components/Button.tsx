type Props = {
  centerContent?: boolean
  children: string | React.ReactNode | React.ReactNode[]
  type?: "button" | "submit" | "reset"
  bgColor?: string
  onClick?: () => void;
};

const LinkButton = ({ onClick, centerContent, children, type, bgColor}: Props) => {
  return (
    <button type={type} onClick={onClick} className={`${centerContent && "place-content-center"} ${bgColor} flex w-full p-2 rounded-md hover:bg-gray-200 gap-2`}>
      {children}
    </button>
  );
};

export default LinkButton;