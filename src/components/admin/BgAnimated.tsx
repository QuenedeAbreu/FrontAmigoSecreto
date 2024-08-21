export const BgAnimated = () => {
  return (
    <div className="absolute inset-0 z-[-1] bg-gradient-bg h-screen">
      <ul className="absolute top-0 left-0 w-full h-[96%] overflow-hidden">
        <li className="absolute bg-white opacity-95 animate-animate bottom-[-150px] left-[25%] w-[80px] h-[80px]"></li>
        <li className="absolute bg-white opacity-95 animate-animate bottom-[-150px] left-[10%] w-[20px] h-[20px] animate-delay-2 animate-duration-12"></li>
        <li className="absolute bg-white opacity-95 animate-animate bottom-[-150px] left-[70%] w-[20px] h-[20px] animate-delay-4"></li>
        <li className="absolute bg-white opacity-95 animate-animate bottom-[-150px] left-[40%] w-[60px] h-[60px] animate-delay-0 animate-duration-18"></li>
        <li className="absolute bg-white opacity-95 animate-animate bottom-[-150px] left-[65%] w-[20px] h-[20px]"></li>
        <li className="absolute bg-white opacity-95 animate-animate bottom-[-150px] left-[75%] w-[110px] h-[110px] animate-delay-3"></li>
        <li className="absolute bg-white opacity-95 animate-animate bottom-[-150px] left-[35%] w-[150px] h-[150px] animate-delay-7"></li>
        <li className="absolute bg-white opacity-95 animate-animate bottom-[-150px] left-[opacity-95%] w-[25px] h-[25px] animate-delay-15 animate-duration-45"></li>
        <li className="absolute bg-white opacity-95 animate-animate bottom-[-150px] left-[opacity-95%] w-[15px] h-[15px] animate-delay-2 animate-duration-35"></li>
        <li className="absolute bg-white opacity-95 animate-animate bottom-[-150px] left-[85%] w-[150px] h-[150px] animate-delay-0 animate-duration-11"></li>
      </ul>
    </div>
  )
}