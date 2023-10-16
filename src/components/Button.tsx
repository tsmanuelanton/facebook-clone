const Button = (props : any) => {
    const { children, className, ...rest } = props;

  return (
    <button
     {...rest}
      className={`${className} inline-flex w-1/3 p-2 place-content-center rounded-md hover:bg-gray-200 gap-2`}
    >
      {children}
    </button>
  );
};

export default Button;
