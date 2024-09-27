"use client"
import { useEffect, useState, useContext, createContext } from "react"
import { useRouter } from "next/navigation";
import { getCookie, deleteCookie } from "cookies-next";
import { useGlobalContext } from "@/provider/globlalProvider";
import { ItemButton } from "./ItemButton";
import { IoMdExit } from "react-icons/io";
import { Navbar } from "./Navbar";


export const HeaderAdmin = () => {
  const { userOne, setUserOne } = useGlobalContext()
  const router = useRouter()
  const cookiesUser = getCookie('user');

  useEffect(() => {
    if (cookiesUser) {
      setUserOne(cookiesUser ? JSON.parse(cookiesUser as string) : null)
    }
  }, [cookiesUser])

  const handleLogout = () => {
    deleteCookie('token')
    deleteCookie('user')
    setUserOne(null)
    router.push('/admin/login')
    localStorage.clear();
  }


  return (
    <>
      {userOne?.is_acessall === true &&
        <Navbar userOne={userOne || undefined} handleLogout={handleLogout} />
      }
      <header className="bg-gray-800 text-center py-5 flex justify-center items-center flex-col">
        <div>
          <h3 className="text-3xl">Amigo Secreto</h3>
          <h4 className="text-base">Painel de Controle</h4>
        </div>
        {/* {userOne?.is_acessall === true &&
          <div className="md:flex justify-center items-center gap-5">
            {userOne && <p className="text-sm">Bem-vindo, {userOne?.name}</p>}
            {userOne && <a onClick={handleLogout} className="">
              <ItemButton
                IconElement={IoMdExit}
                label="Sair"
                onClick={() => { }}
                type="link"
              /></a>}
          </div>
        } */}
      </header>

    </>
  )
}
