import { Group } from "@/types/Group"
import { ItemButton } from '@/components/admin/ItemButton'
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa"
import { useState } from "react"
import { ModalConfirm } from "@/components/admin/ModalConfirm"
import { IoIosWarning } from 'react-icons/io';
import { IoCloseCircle } from "react-icons/io5";
import * as api from '@/api/admin'

export type Props = {
  item: Group,
  refreshAction: () => void,
  onEdit: (group: Group) => void
  setPageLoading: (item: boolean) => void
  PageLoading: boolean
}

export const GroupItem = ({ item, onEdit, refreshAction, setPageLoading, PageLoading }: Props) => {
  const [openAndCloseModalConfirm, setOpenAndCloseModalConfirm] = useState(false);
  const [openAndloseModalErro, setOpenAndloseModalErro] = useState(false)

  const handleDeleteButton = async () => {
    setOpenAndCloseModalConfirm(false)
    setPageLoading(true)
    const resultDeleteGroup = await api.deleteGroup(item.id, item.id_event);
    if (resultDeleteGroup === false) {
      setPageLoading(false)
      setOpenAndloseModalErro(true)
    } else {
      refreshAction();
      setPageLoading(false)
    }
  }

  return (
    <div className="border border-gray-700 bg-gray-900 rounded p-3 mb-3 flex items-center">

      {openAndloseModalErro &&
        <ModalConfirm
          title="Error"
          description="Não é possivel excluir o grupo!"
          // onConfirm={() => setOpenAndloseModalErro(false)}
          onCancel={() => setOpenAndloseModalErro(false)}
          eventTitle={item.name}
          IconElement={IoCloseCircle}
          type="error"
        />
      }

      {/* Modal de Confirmaçãode Exclusão de Evento */}
      {openAndCloseModalConfirm &&
        <ModalConfirm
          title="Excluir Grupo"
          description="Tem certeza que deseja excluir este grupo?"
          onConfirm={handleDeleteButton}
          onCancel={() => setOpenAndCloseModalConfirm(false)}
          eventTitle={item.name}
          IconElement={IoIosWarning}
          type="warning"
        />
      }


      <div className="flex-1 ">{item.name}</div>
      <ItemButton
        IconElement={FaRegEdit}
        onClick={() => onEdit(item)}
      />
      <ItemButton
        IconElement={FaRegTrashAlt}
        onClick={() => setOpenAndCloseModalConfirm(true)}
      />

    </div>
  )

}

export const GroupItemPlaceholder = () => {
  return (
    <div className="w-full h-16 border border-gray-700 rounded mb-3
        bg-gradient-to-r from-gray-900 to-gray-950 animate-pulse">

    </div>
  )
}

export const GroupItemNotFount = () => {
  return (
    <div className="text-center py-4 text-gray-500">
      Não há grupos neste evento!
    </div>
  )
}