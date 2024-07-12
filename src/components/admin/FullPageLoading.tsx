import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { ImSpinner9 } from "react-icons/im";
import { CgSpinnerTwoAlt } from "react-icons/cg";


export const FullPageLoading = () => {
  return (
    <div>
      <div className="fixed z-[1000] w-full h-full  top-0 left-0 bg-black opacity-75 animate-fade-in-down text-violet-600">
        <div className="flex flex-col justify-center items-center mt-[50vh]">
          <div className="text-7xl animate-spin font-bold  ">
            <CgSpinnerTwoAlt />
          </div>
          <h1>Carregando...</h1>
        </div>
      </div>
    </div>
  )
}