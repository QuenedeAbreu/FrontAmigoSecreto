"use client"
import * as api from '@/api/admin'
import { FullPageLoading } from '@/components/admin/FullPageLoading';
import { useEffect, useState } from 'react';
import { NameItem, NameItemPlaceholder, NameItemNotFount } from '@/components/name/NameItem'
import { Name } from '@/types/Name'
import { ModalScreens } from '@/types/ModalScreens';
import { Modal } from '@/components/admin/Modal';
import { NameAdd } from '@/components/name/NameAdd';
import { NameEdit } from '@/components/name/NameEdit';
// import { UserEdit } from '@/components/admin/user/UserEdit';
import { ItemButton } from '@/components/admin/ItemButton';
import { FaPlus } from 'react-icons/fa';
import { useGlobalContext } from "@/provider/globlalProvider";
import { getCookie } from 'cookies-next';
import { jwtDecode } from 'jwt-decode';
import jwt, { JwtPayload } from 'jsonwebtoken'
import { ModalConfirm } from '@/components/admin/ModalConfirm'
import { IoIosWarning } from 'react-icons/io';
export const runtime = 'edge';

type IJwtPayload = JwtPayload & {
  id: string;
}


export const NamePage = () => {

  const [names, setNames] = useState<Name[]>([])
  const [PageLoading, setPageLoading] = useState(false);
  const [loadingSkeleton, setLoadingSkeleton] = useState(true);
  const [selectedName, setSelectedName] = useState<Name>();
  const [modalScreen, setModalScreen] = useState<ModalScreens>(null);
  const { userOne, setUserOne } = useGlobalContext()
  const [openAndCloseModalWarning, setOpenAndCloseModalWarning] = useState(true);
  const [openAndCloseModalConfirm, setOpenAndCloseModalConfirm] = useState(false);
  const [suggestedNameField, setSuggestedNameField] = useState('')
  const cookiesUser = getCookie('user');
  const token = getCookie('token');
  const userJwt = jwt.decode(getCookie('token') as string) as IJwtPayload;


  useEffect(() => {
    if (cookiesUser) {
      setUserOne(cookiesUser ? JSON.parse(cookiesUser as string) : null)
    }
  }, [cookiesUser])

  const loadNomes = async () => {
    setLoadingSkeleton(true);
    if (token) {
      const usersList = await api.getNamesAllId(parseInt(userJwt.id));
      setNames(usersList);
    }
    setLoadingSkeleton(false);
  }

  useEffect(() => {
    loadNomes();
  }, [])

  const editUser = async (Name: Name) => {
    setSelectedName(Name)
    setModalScreen('edit')
  }

  return (
    <div className='mx-auto w-full max-w-3xl p-3'>
      {/* Modal de Aviso de menino*/}
      {openAndCloseModalWarning &&
        <ModalConfirm
          title="Aew!!! É Menino!"
          description="Apenas nomes de Meninos!"
          // onConfirm={() => setOpenAndloseModalErro(false)}
          onCancel={() => setOpenAndCloseModalWarning(false)}
          eventTitle={suggestedNameField}
          IconElement={IoIosWarning}
          type="warning2"
        />
      }
      {PageLoading && <FullPageLoading />}
      <div className='p-3 flex items-center' >
        <div className='flex-1'>
          <h1 className='text-2xl flex-1'>Nomes Sugeridos</h1>
          <h6 className='flex-1 text-sm font-semibold'>Bem vindo: {userOne?.name}</h6>
        </div>
        <div>
          <ItemButton
            IconElement={FaPlus}
            onClick={() => setModalScreen('add')}
          />
        </div>
      </div>
      <div className='my-3 '>
        {!loadingSkeleton && names.length > 0 && names.map(item => (
          <NameItem
            key={item.id}
            item={item}
            refreshAction={() => loadNomes()}
            openModal={name => editUser(name)}
            setPageLoading={setPageLoading}
          />
        ))}

        {!loadingSkeleton && names.length === 0 && < NameItemNotFount />}
        {loadingSkeleton && <>
          <NameItemPlaceholder />
          <NameItemPlaceholder />
        </>}
      </div>
      {modalScreen &&
        <Modal
          onClose={() => setModalScreen(null)}
        >
          {modalScreen === 'add' &&

            <NameAdd
              refreshAction={() => loadNomes()}
              setPageLoading={setPageLoading}
              PageLoading={PageLoading}
              closeModal={async () => setModalScreen(null)}
            />
          }
          {modalScreen === 'edit' && selectedName &&
            <NameEdit
              refreshAction={() => loadNomes()}
              name={selectedName}
              setPageLoading={setPageLoading}
              PageLoading={PageLoading}
              closeModal={async () => setModalScreen(null)}
            />
          }
        </Modal>
      }
    </div>
  )
}