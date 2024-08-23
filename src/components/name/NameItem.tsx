import { useState } from "react"
import { ModalConfirm } from "../admin/ModalConfirm"
import { Name } from "@/types/Name";
import { ItemButton } from "../admin/ItemButton";
import { FaRegEdit } from "react-icons/fa";
import { FaUserSlash, FaUserCheck, FaChild, FaChildDress } from "react-icons/fa6";
import { IoIosWarning } from "react-icons/io";
import { IoCloseCircle } from "react-icons/io5";

import { useGlobalContext } from "@/provider/globlalProvider";
import jwt, { JwtPayload } from 'jsonwebtoken'
import * as api from "@/api/admin"
import { getCookie } from "cookies-next";

type Props = {
  item: Name;
  refreshAction: () => void;
  openModal: (name: Name) => void;
  setPageLoading: (item: boolean) => void;
}
type IJwtPayload = JwtPayload & {
  id: string;
}


export const NameItem = ({ item, openModal, refreshAction, setPageLoading }: Props) => {
  const [openAndloseModalErro, setOpenAndloseModalErro] = useState(false)
  const [openAndCloseModalConfirm, setOpenAndCloseModalConfirm] = useState(false);
  const { userOne, setUserOne } = useGlobalContext()
  const handleEditButton = async () => { openModal(item) }


  const userJwt = jwt.decode(getCookie('token') as string) as IJwtPayload;

  return (
    <div className='border border-gray-700 rounded min-h-[74px] p-3 mb-3 flex flex-col items-center md:flex-row'>

      {openAndloseModalErro &&
        <ModalConfirm
          title="Error"
          description="Não é possivel excluir um evento que esteja Ativo!"
          // onConfirm={() => setOpenAndloseModalErro(false)}
          onCancel={() => setOpenAndloseModalErro(false)}
          // eventTitle={item.title}
          IconElement={IoCloseCircle}
          type="error"
        />
      }

      {/* Modal de Confirmaçãode Exclusão de Evento */}
      {openAndCloseModalConfirm &&
        <ModalConfirm
          title="Excluir Nome"
          description="Tem certeza que deseja excluir este nome?"
          onConfirm={() => { }}
          onCancel={() => setOpenAndCloseModalConfirm(false)}
          // eventTitle={item.title}
          IconElement={IoIosWarning}
          type="warning"
        />
      }

      <div className='flex-1 text-xl md:text-base flex items-center'>
        {item.sex === 1 &&
          <div className="text-blue-500"> <FaChild /> </div> ||
          <div className="text-pink-500"><FaChildDress /></div>}
        <div className="ml-2">{item.suggested_name}</div>
      </div>
      <div className='flex items-center gap-1 mt-2 md:mt-0'>
        {item.id_user === parseInt(userJwt.id) &&
          <>
            <ItemButton
              IconElement={FaRegEdit}
              label="Editar"
              onClick={handleEditButton}
            />

            <ItemButton
              IconElement={FaUserSlash}
              label="Deletar"
              onClick={() => setOpenAndCloseModalConfirm(true)}
            />
          </>
        }
        {item.id_user !== parseInt(userJwt.id) &&
          <>
            <div>
              <p className="text-sm"> Sugerido por:</p> <p className="font"> {item?.User?.name}</p>
            </div>
          </>
        }


      </div>
    </div>
  )
}





export const NameItemPlaceholder = () => {
  return (
    <div className="w-full h-16 border border-gray-700 rounded mb-3
        bg-gradient-to-r from-gray-900 to-gray-950 animate-pulse">

    </div>
  )
}

export const NameItemNotFount = () => {
  return (
    <div className="text-center py-4 text-gray-500">
      Não há nomes Cadastrados!
    </div>
  )
}