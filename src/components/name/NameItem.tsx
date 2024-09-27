import { useState } from "react"
import { ModalConfirm } from "../admin/ModalConfirm"
import { Name } from "@/types/Name";
import { ItemButton } from "../admin/ItemButton";
import { FaRegEdit } from "react-icons/fa";
import { FaUserSlash, FaUserCheck, FaChild, FaChildDress } from "react-icons/fa6";
import { IoIosWarning } from "react-icons/io";
import { IoCloseCircle } from "react-icons/io5";
import jwt, { JwtPayload } from 'jsonwebtoken'
import * as api from "@/api/admin"
import { getCookie } from "cookies-next";
import { BsFillHandThumbsDownFill, BsFillHandThumbsUpFill } from "react-icons/bs";
import { MdBlock } from "react-icons/md";

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
  const handleEditButton = async () => { openModal(item) }

  const userJwt = jwt.decode(getCookie('token') as string) as IJwtPayload;

  const handleVoteButton = async (vote: boolean) => {
    setPageLoading(true)
    const resultVoteName = await api.voteName(item.id, parseInt(userJwt.id), vote)
    if (resultVoteName) {
      refreshAction()
      setPageLoading(false)
    } else {
      setPageLoading(false)
      setOpenAndloseModalErro(true)
    }
  }

  const handleDeleteButton = async () => {
    setPageLoading(true)
    const resultPersonDelete = await api.deleteName(item.id, parseInt(userJwt.id))
    if (resultPersonDelete) {
      refreshAction()
      setPageLoading(false)
    } else {
      setPageLoading(false)
      setOpenAndloseModalErro(true)
    }
  }

  return (
    <div className='relative border border-gray-700 rounded min-h-[74px] p-3 mb-3 flex flex-col items-center md:flex-row'>

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
          description={`Tem certeza que deseja excluir este nome? ${item.suggested_name}`}
          onConfirm={handleDeleteButton}
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
      <div className="flex items-center justify-evenly bg-slate-950 border border-gray-700 rounded  w-20 h-6 md:absolute md:-mb-16 md:mt-0 mt-4">
        {item.is_voted !== true &&
          <div className="flex items-center text-green-500 ">
            <button onClick={() => handleVoteButton(true)}>
              <BsFillHandThumbsUpFill className="mr-1 hover:cursor-pointer hover:text-green-300 transition-all" />
            </button>
            <p>{item.positiveVoteCount}</p>
          </div>
        }
        {item.is_voted === true &&
          <div className="flex items-center text-green-500 ">
            {/* <BsFillHandThumbsUpFill className="mr-1 hover:cursor-pointer hover:text-green-300 transition-all" /> */}
            <MdBlock className="mr-1 hover:cursor-not-allowed text-green-500 transition-all" />
            <p>{item.positiveVoteCount}</p>
          </div>
        }

        {item.is_voted !== false &&
          <div className="flex items-center text-red-500">
            <button onClick={() => handleVoteButton(false)}>
              <BsFillHandThumbsDownFill className="mr-1 hover:cursor-pointer hover:text-red-300 transition-all" />
            </button>
            <p>{item.negativeVoteCount}</p>
          </div>
        }

        {item.is_voted === false &&
          <div className="flex items-center text-red-500">
            {/* <BsFillHandThumbsDownFill className="mr-1 hover:cursor-pointer hover:text-red-300 transition-all" /> */}
            <MdBlock className="mr-1 hover:cursor-not-allowed  transition-all" />
            <p>{item.negativeVoteCount}</p>
          </div>
        }
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