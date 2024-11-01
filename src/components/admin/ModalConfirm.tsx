import { IconType } from 'react-icons'
import { FaCheck } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";
import { GiConfirmed } from "react-icons/gi";

type Props = {
  title: string
  description: string
  onConfirm?: () => void
  onCancel: () => void
  eventTitle?: string
  IconElement?: IconType
  type?: 'success' | 'error' | 'warning' | 'info' | 'warning2'
}

export const ModalConfirm = ({ title, description, onConfirm, onCancel, eventTitle, IconElement, type }: Props) => {
  return (
    <div className="animate-fade-in-down fixed inset-0 z-40 min-h-full overflow-y-auto overflow-x-hidden transition-all flex items-center">
      {/* <!-- overlay --> */}
      <div onClick={onCancel} aria-hidden="true" className="fixed inset-0 w-full h-full bg-black/50 cursor-pointer">
      </div>

      {/* <!-- Modal --> */}

      <div className="relative w-full cursor-pointer pointer-events-none my-auto p-4">
        <div
          className="w-full py-2 bg-white cursor-default pointer-events-auto dark:bg-gray-800 relative rounded-xl mx-auto max-w-sm">
          <button onClick={onCancel} type="button" className="absolute top-2 right-2 rtl:right-auto rtl:left-2">
            <svg className="h-4 w-4 cursor-pointer text-gray-400"
              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"></path>
            </svg>
            <span className="sr-only">
              Fechar
            </span>
          </button>


          <div className="space-y-2 p-2">
            <div className="p-4 space-y-2 text-center dark:text-white">

              <h2 className="text-xl font-bold tracking-tight flex flex-col justify-center items-center" id="page-action.heading">
                {type == "warning" && <span className='mb-1'>{IconElement ? <IconElement className='animate-pulse-icon text-orange-400' /> : ""}</span>}
                {type == "warning2" && <span className='mb-1'>{IconElement ? <IconElement className='animate-pulse-icon text-orange-400' /> : ""}</span>}
                {type == "error" && <span className='mb-1'>{IconElement ? <IconElement className='animate-pulse-icon text-red-600' /> : ""}</span>}
                {type == "success" && <span className='mb-1'>{IconElement ? <IconElement className='animate-pulse-icon text-green-500' /> : ""}</span>}
                {title}
              </h2>

              <p className="text-gray-500">
                {eventTitle}
              </p>
              <p className="text-gray-500">
                {description}
              </p>
              <img src="/img/img_modal.jpg" alt="Logo Ninja" className=" mx-auto" />
            </div>
          </div>

          <div className="space-y-2">
            <div aria-hidden="true" className="border-t dark:border-gray-700 px-2"></div>

            <div className="px-6 py-2">
              <div className="grid gap-2 grid-cols-[repeat(auto-fit,minmax(0,1fr))]">

                <button
                  onClick={onCancel}
                  type="button"
                  className="inline-flex items-center justify-center py-1 gap-1 font-medium rounded-lg border transition-colors outline-none focus:ring-offset-2 focus:ring-2 focus:ring-inset dark:focus:ring-offset-0 min-h-[2.25rem] px-4 text-sm text-gray-800 bg-white border-gray-300 hover:bg-gray-50 focus:ring-primary-600 focus:text-primary-600 focus:bg-primary-50 focus:border-primary-600 dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-600 dark:hover:border-gray-500 dark:text-gray-200 dark:focus:text-primary-400 dark:focus:border-primary-400 dark:focus:bg-gray-800">
                  <span className="flex flex-col justify-center items-center gap-1">
                    <span className="flex justify-center items-center gap-1" >
                      {type == 'warning2' && <><FaCheck className='' /> Confirmar</>}
                      {type == 'warning' && <><MdOutlineCancel /> Cancelar</>}
                      {type == 'error' && <><FaCheck className='' /> OK</>}
                      {type == 'info' && <>Cancelar</>}
                      {type == 'success' && <><FaCheck className='' /> Confirmar</>}
                    </span>
                  </span>
                </button>

                {type != 'error' && type != 'success' && type != 'warning2' && <>
                  <button onClick={onConfirm}
                    type="button"
                    className="inline-flex items-center justify-center py-1 gap-1 font-medium rounded-lg border transition-colors outline-none focus:ring-offset-2 focus:ring-2 focus:ring-inset dark:focus:ring-offset-0 min-h-[2.25rem] px-4 text-sm text-white shadow focus:ring-white border-transparent bg-red-600 hover:bg-red-500 focus:bg-red-700 focus:ring-offset-red-700">

                    <span className="flex items-center gap-1">
                      <span className="flex items-center gap-1">
                        <GiConfirmed />
                        Confirmar
                      </span>
                    </span>

                  </button>
                </>}
              </div>
            </div>
          </div>


        </div>
      </div>
    </div>
  )
}