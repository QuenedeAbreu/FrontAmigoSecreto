import { PersonComplete } from "@/types/PersonComplete";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { ItemButton } from "@/components/admin/ItemButton";
import * as api from '@/api/admin'
import { useState } from "react";
import { ModalConfirm } from "@/components/admin/ModalConfirm";
import { IoCloseCircle } from "react-icons/io5";
import { IoIosWarning } from "react-icons/io";


type Props = {
  item: PersonComplete;
  refreshAction: () => void;
  onEdit: (person: PersonComplete) => void;
  setPageLoading: (item: boolean) => void;
  PageLoading: boolean;
}

export const PersonItem = ({ item, refreshAction, onEdit, PageLoading, setPageLoading }: Props) => {
  const [openAndloseModalErro, setOpenAndloseModalErro] = useState(false)
  const [openAndCloseModalConfirm, setOpenAndCloseModalConfirm] = useState(false);

  const handleDeleteButton = async () => {
    setPageLoading(true)
    const resultPersonDelete = await api.deletePerson(item.id, item.id_group, item.id_event)
    if (resultPersonDelete) {
      refreshAction()
      setPageLoading(false)
    } else {
      setPageLoading(false)
      setOpenAndloseModalErro(true)
    }
  }

  return (
    <div className="border border-gray-700 bg-gray-900 rounded p-3 mb-3 flex items-center">

      {openAndloseModalErro &&
        <ModalConfirm
          title="Error"
          description="Não é possivel excluir está pessoa!"
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
          title="Excluir Pessoa"
          description="Tem certeza que deseja excluir esta pessoa?"
          onConfirm={handleDeleteButton}
          onCancel={() => setOpenAndCloseModalConfirm(false)}
          eventTitle={item.name}
          IconElement={IoIosWarning}
          type="warning"
        />
      }

      <div className="flex-1">{item.name} (CPF: {item.cpf})</div>
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





export const PersonItemPlaceholder = () => {
  return (
    <div className="w-full h-16 border border-gray-700 rounded mb-3
        bg-gradient-to-r from-gray-900 to-gray-950 animate-pulse">

    </div>
  )
}

export const PersonItemNotFount = () => {
  return (
    <div className="text-center py-4 text-gray-500">
      Não há pessoas neste grupo!
    </div>
  )
}