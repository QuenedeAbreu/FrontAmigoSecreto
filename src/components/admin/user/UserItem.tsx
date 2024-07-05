import { useState } from "react"
import { ModalConfirm } from "../ModalConfirm"
import { User } from "@/types/User";
import { ItemButton } from "../ItemButton";
import { FaLockOpen, FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { FaUserSlash } from "react-icons/fa6";
import { IoIosWarning } from "react-icons/io";
import { IoCloseCircle } from "react-icons/io5";

import { LuUserX2, LuUserCheck2 } from "react-icons/lu";

type Props = {
  item: User;
  refreshAction: () => void;
  openModal: (user: User) => void;
  setPageLoading: (item: boolean) => void;
}

export const UserItem = ({ item, openModal, refreshAction, setPageLoading }: Props) => {
  const [openAndloseModalErro, setOpenAndloseModalErro] = useState(false)
  const [openAndCloseModalConfirm, setOpenAndCloseModalConfirm] = useState(false);

  const handleEditButton = async () => { }
  const handleIantiveButton = async () => { }

  return (
    <div className='border border-gray-700 rounded p-3 mb-3 flex flex-col items-center md:flex-row'>

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
          title="Inativar Usuário"
          description="Tem certeza que deseja inativar este usuário?"
          onConfirm={handleIantiveButton}
          onCancel={() => setOpenAndCloseModalConfirm(false)}
          // eventTitle={item.title}
          IconElement={IoIosWarning}
          type="warning"
        />
      }

      <div className='flex-1 text-xl md:text-base'> {item.name}</div>
      <div className='flex items-center gap-1 mt-2 md:mt-0'>

        <ItemButton
          IconElement={FaRegEdit}
          label="Editar"
          onClick={handleEditButton}
        />
        <ItemButton
          IconElement={FaUserSlash}
          label="Inativar"
          onClick={() => setOpenAndCloseModalConfirm(true)}
        />
        {item.is_active &&
          <div className='text-sm text-green-500 p-3 flex flex-col justify-center items-center gap-2 md:flex-row'>
            <LuUserCheck2 /> Ativo
          </div>
        }
        {!item.is_active &&
          <div className='text-sm text-red-500 p-3 flex flex-col justify-center items-center gap-2 md:flex-row'>
            < LuUserX2 /> Inativo
          </div>
        }

      </div>
    </div>
  )
}





export const UserItemPlaceholder = () => {
  return (
    <div className="w-full h-16 border border-gray-700 rounded mb-3
        bg-gradient-to-r from-gray-900 to-gray-950 animate-pulse">

    </div>
  )
}

export const UserItemNotFount = () => {
  return (
    <div className="text-center py-4 text-gray-500">
      Não há usuários Cadastrados!
    </div>
  )
}