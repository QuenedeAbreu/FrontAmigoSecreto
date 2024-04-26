import { AiOutlineLoading3Quarters } from "react-icons/ai";


export const FullPageLoading = () => {
  return (
    <div>
      <div className="w-full h-full fixed top-0 left-0 bg-black opacity-75 z-50 animate-fade-in-down ">
        <div className="flex justify-center items-center mt-[50vh]">
          <div className="text-7xl animate-spin font-bold text-violet-600"><AiOutlineLoading3Quarters /></div>
        </div>
      </div>
    </div>
  )
}