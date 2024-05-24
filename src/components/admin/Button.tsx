import { IconType } from "react-icons";

type Props = {
  value: any;
  onClick: () => void;
  disabled?: boolean;
  IconElement?: IconType
}


export const Button = ({ value, onClick, IconElement, disabled }: Props) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-full my-3 p-3 rounded flex justify-center items-center
      bg-gray-700 text-white uppercase font-bold
      hover:bg-gray-600 transition-colors border-b-4 border-white/10 text-center
      disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-700 disabled:hover:text-white
      "
    >{IconElement && <IconElement className="mr-3" />}{value}</button>
  );
}