import { useState } from "react"
import { ModalConfirm } from "../ModalConfirm"

export const UserItem = () => {
  const [openAndloseModalErro, setOpenAndloseModalErro] = useState(false)
  const [openAndCloseModalConfirm, setOpenAndCloseModalConfirm] = useState(false);


  return (
    <div className='border border-gray-700 rounded p-3 mb-3 flex flex-col items-center md:flex-row'>

      {openAndloseModalErro &&
        <ModalConfirm
          title="Error"
          description="Não é possivel excluir um evento que esteja Ativo!"
          // onConfirm={() => setOpenAndloseModalErro(false)}
          onCancel={() => setOpenAndloseModalErro(false)}
          // eventTitle={item.title}
          // IconElement={IoCloseCircle}
          type="error"
        />
      }



      {/* Modal de Confirmaçãode Exclusão de Evento */}
      {openAndCloseModalConfirm &&
        <ModalConfirm
          title="Excluir Evento"
          description="Tem certeza que deseja excluir este evento?"
          // onConfirm={handleDeleteButton}
          onCancel={() => setOpenAndCloseModalConfirm(false)}
          // eventTitle={item.title}
          // IconElement={IoIosWarning}
          type="warning"
        />
      }


      <div className='flex items-center gap-1 mt-2 md:mt-0'>

        {/* <ItemButton
    IconElement={FaRegEdit}
    label="Editar"
    onClick={handleEditButton}
  />
  <ItemButton
    IconElement={FaRegTrashAlt}
    label="Excluir"
    onClick={() => setOpenAndCloseModalConfirm(true)}
  />
  {item.status &&
    <div className='text-sm text-green-500 p-3 flex flex-col justify-center items-center gap-2 md:flex-row'>
      <FaLockOpen /> Ativo
    </div>
  }
  {!item.status &&
    <div className='text-sm text-red-500 p-3 flex flex-col justify-center items-center gap-2 md:flex-row'>
      <HiMiniLockClosed /> Bloqueado
    </div>
  } */}

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