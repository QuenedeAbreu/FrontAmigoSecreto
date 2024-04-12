type Props = {
  value: any;
  onClick: () => void;
  disabled?: boolean;
}

import { IconLoad } from "@/components/admin/IconLoad";
export const Button = ({ value, onClick, disabled }: Props) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-full my-3 p-3 rounded
      bg-gray-700 text-white uppercase font-bold
      hover:bg-gray-600 transition-colors border-b-4 border-white/10 text-center
      disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-700 disabled:hover:text-white
      "
    >{value}</button>
  );
}