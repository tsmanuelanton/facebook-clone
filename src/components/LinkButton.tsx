import Link from "next/link";

type Props = {
  href: string;
  centerContent?: boolean
  children: string | JSX.Element | JSX.Element[];
};

const LinkButton = ({ href, centerContent, children }: Props) => {
  return (
    <Link href={href} className={`${centerContent && "place-content-center"} flex relative w-full place-items-center font-medium p-2 rounded-md hover:bg-gray-200 gap-2`}>
      {children}
    </Link>
  );
};

export default LinkButton;