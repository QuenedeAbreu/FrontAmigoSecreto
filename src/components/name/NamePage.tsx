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

export const runtime = 'edge';
export const NamePage = () => {

  const [names, setNames] = useState<Name[]>([])
  const [PageLoading, setPageLoading] = useState(false);
  const [loadingSkeleton, setLoadingSkeleton] = useState(true);
  const [selectedName, setSelectedName] = useState<Name>();
  const [modalScreen, setModalScreen] = useState<ModalScreens>(null);
  const { userOne, setUserOne } = useGlobalContext()

  const cookiesUser = getCookie('user');

  useEffect(() => {
    if (cookiesUser) {
      setUserOne(cookiesUser ? JSON.parse(cookiesUser as string) : null)
    }
  }, [cookiesUser])

  const loadNomes = async () => {
    setLoadingSkeleton(true);
    const usersList = await api.getNames();
    // console.log(usersList);
    setNames(usersList);
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