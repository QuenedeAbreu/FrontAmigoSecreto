import { User } from '@/types/User'
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useState, useEffect } from 'react'
import { IoMdExit } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
// import { setCookie, getCookie } from "cookies-next";
type Props = {
  userOne?: User,
  handleLogout: () => void
}
export const Navbar = ({ userOne, handleLogout }: Props) => {
  const [itemNavSelected, setItemNavSelected] = useState<String>('')

  const navigation = [
    { label: 'Início', href: '/admin', name: 'inicio', restrict: false },
    { label: 'Usuários', href: '/admin/user', name: 'usuarios', restrict: true },
    { label: 'Nomes', href: '/name', name: 'nomes', restrict: true },

  ]

  const classNames = (...classes: any) => {
    return classes.filter(Boolean).join(' ')
  }

  const setItemNavSelectedFunction = async (item: string) => {

    setItemNavSelected(item)
    localStorage.setItem("itemNavSelected", item);
  }

  useEffect(() => {
    const itemNavSelectedCookie = localStorage.getItem("itemNavSelected") || ""
    if (itemNavSelectedCookie) {
      setItemNavSelected(itemNavSelectedCookie.toString())
    } else {
      setItemNavSelected('inicio')
    }
  }, [])
  return (
    // <div className="w-full bg-slate-600 flex h-9 items-center">
    //   <div className="ml-3 hover:bg-white h-full ">
    //     <a href="#" className="flex h-full items-center">Home</a>
    //   </div>
    //   <div className="ml-3">
    //     <a href="#">About</a>
    //   </div>
    //   <div className="ml-3">
    //     <a href="#">Contact</a>
    //   </div>
    // </div>
    <>
      <Disclosure as="nav" className="bg-gray-800 ">
        <div className="mx-auto w-full max-w-3xl px-2 sm:px-6 lg:px-8 ">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              {/* Mobile menu button*/}
              <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Menu</span>
                <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
                <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
              </DisclosureButton>
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0 items-center">
                <img
                  alt="Logo Ninja"
                  src="/img/logo-ninja.svg"
                  className="h-8 w-auto"
                />
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  {navigation.filter(item => item.restrict === false || (item.restrict && userOne?.is_admin)).map((item) => (

                    <a
                      key={item.name}
                      href={item.href}
                      onClick={() => setItemNavSelectedFunction(item.name)}
                      aria-current={item.name === itemNavSelected ? 'page' : undefined}
                      className={classNames(
                        item.name === itemNavSelected ? 'bg-gray-900 text-white transition-all' : 'text-gray-300 hover:bg-gray-700 hover:text-white transition-all',
                        'rounded-md px-3 py-2 text-sm font-medium',
                      )}
                    >
                      {item.label}
                    </a>

                  ))}
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {/* <button
                type="button"
                className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                <span className="absolute -inset-1.5" />
                <span className="sr-only">Notificações</span>
                <BellIcon aria-hidden="true" className="h-6 w-6" />
              </button> */}

              {/* Profile dropdown */}
              <Menu as="div" className="relative ml-3">
                <div>
                  <MenuButton className=" relative flex flex-col justify-center items-center rounded-full bg-gray-800 text-sm focus:outline-none ">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Menu de Usuário</span>
                    <img
                      alt=""
                      src="/img/img-perfil.png"
                      className="h-8 w-8 rounded-full"
                    />
                    <span className="text-white text-xs font-bold mt-1">
                      {userOne?.name}
                    </span>

                  </MenuButton>
                </div>
                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <MenuItem>
                    <a className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:cursor-pointer data-[focus]:bg-gray-100 ">
                      <CgProfile /> Perfil
                    </a>
                  </MenuItem>

                  <MenuItem >
                    <a onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:cursor-pointer data-[focus]:bg-gray-100">
                      <IoMdExit /> Sair
                    </a>
                  </MenuItem>
                </MenuItems>
              </Menu>
            </div>
          </div>
        </div>

        <DisclosurePanel className="sm:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {navigation.map((item) => (
              <DisclosureButton
                key={item.name}
                as="a"
                href={item.href}
                aria-current={item.name === itemNavSelected ? 'page' : undefined}
                className={classNames(
                  item.name === itemNavSelected ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                  'block rounded-md px-3 py-2 text-base font-medium',
                )}
              >

                {item.name}
              </DisclosureButton>
            ))}
          </div>
        </DisclosurePanel>
      </Disclosure>
    </>

  )
}