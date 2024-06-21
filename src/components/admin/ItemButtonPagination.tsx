import Link from "next/link";
import { IconType } from "react-icons";

type Props = {
  label?: string;
  onClick?: () => void;
  select?: boolean;
}

export const ItemButtonPagination = ({ label, onClick, select }: Props) => {
  const content = (
    <div className="px-3 py-2 flex justify-center items-center">
      {label && <div>{label}</div>}
    </div>
  )
  return (
    <div className={`rounded ${select ? 'bg-gray-800' : ''} hover:bg-gray-800 transition ease-in-out `}>

      {onClick && !select &&
        <div className="cursor-pointer" onClick={onClick} >
          {content}
        </div>
      }

      {select &&
        <div className="bg-gray-800 rounded" >
          {content}
        </div>
      }
    </div>
  )
}