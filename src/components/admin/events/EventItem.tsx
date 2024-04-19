import { Event } from '@/types/events'
import { FaLink, FaRegEdit, FaRegTrashAlt, FaLockOpen } from 'react-icons/fa';
import { HiMiniLockClosed } from "react-icons/hi2";
import { ItemButton } from '@/components/admin/ItemButton';

type Props = {
  item: Event;
  refreshAction: () => void;
  openModal?: (event: Event) => void;
}


export const EventItem = ({ item, refreshAction, openModal }: Props) => {
  const handleEditButton = () => {
    if (!openModal) return;
    openModal(item)
  };

  const handleDeleteButton = () => {

  }

  return (
    <div className='border border-gray-700 rounded p-3 mb-3 flex flex-col items-center md:flex-row'>
      <div className='flex-1 text-xl md:text-base'>{item.title}</div>
      <div className='flex items-center gap-1 mt-2 md:mt-0'>
        {item.status &&
          <div className='border border-dashed border-white rounded'>
            <ItemButton
              IconElement={FaLink}
              label="Link do evento"
              href={`/event/${item.id}`}
              target="_blank"
            />
          </div>
        }


        <ItemButton
          IconElement={FaRegEdit}
          label="Editar"
          onClick={handleEditButton}
        />
        <ItemButton
          IconElement={FaRegTrashAlt}
          label="Excluir"
          onClick={handleDeleteButton}
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
        }

      </div>
    </div>
  )
}


export const EventItemPlaceholder = () => {
  return (
    <div className="w-full h-16 border border-gray-700 rounded mb-3
        bg-gradient-to-r from-gray-900 to-gray-950 animate-pulse">

    </div>
  )
}

export const EventItemNotFount = () => {
  return (
    <div className="text-center py-4 text-gray-500">
      Não há eventos Cadastrados!
    </div>
  )
}