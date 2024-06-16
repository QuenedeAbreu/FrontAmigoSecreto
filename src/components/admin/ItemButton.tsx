import Link from "next/link";
import { IconType } from "react-icons";

type Props = {
  IconElement: IconType;
  label?: string;
  onClick?: () => void;
  href?: string;
  target?: string;
  raplace?: boolean;
  type?: "link";
}

export const ItemButton = ({ IconElement, label, onClick, href, target, raplace, type }: Props) => {
  const content = (
    <div className="p-3 flex justify-center items-center gap-2">
      <div><IconElement /></div>
      {label && <div>{label}</div>}
    </div>
  )
  return (
    <div className={`rounded ${type !== 'link' ? 'hover:bg-gray-800' : 'hover:underline'} transition ease-in-out `}>
      {href && !onClick &&
        <Link
          href={href}
          target={target}
          replace={raplace}
        >
          {content}
        </Link>
      }
      {onClick && !href &&
        <div className="cursor-pointer" onClick={onClick}>
          {content}
        </div>
      }
    </div>
  )
}