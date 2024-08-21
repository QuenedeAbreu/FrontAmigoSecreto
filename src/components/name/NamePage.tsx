"use client"
import * as api from '@/api/admin'
import { FullPageLoading } from '@/components/admin/FullPageLoading';
import { useEffect, useState } from 'react';
import { UserItem, UserItemPlaceholder, UserItemNotFount } from '@/components/admin/user/UserItem'
import { User } from '@/types/User'
import { ModalScreens } from '@/types/ModalScreens';
import { Modal } from '@/components/admin/Modal';
import { UserAdd } from '@/components/admin/user/UserAdd';
import { UserEdit } from '@/components/admin/user/UserEdit';
import { ItemButton } from '@/components/admin/ItemButton';
import { FaPlus } from 'react-icons/fa';



export const NamePage = () => {

  const [users, setUsers] = useState<User[]>([])
  const [PageLoading, setPageLoading] = useState(false);
  const [loadingSkeleton, setLoadingSkeleton] = useState(true);
  const [selectedUser, setSelectedUser] = useState<User>();
  const [modalScreen, setModalScreen] = useState<ModalScreens>(null);



  const loadUsers = async () => {
    setLoadingSkeleton(true);
    const usersList = await api.getUsers();
    setUsers(usersList);
    setLoadingSkeleton(false);
  }

  useEffect(() => {
    loadUsers();
  }, [])

  const editUser = async (User: User) => {
    setSelectedUser(User)
    setModalScreen('edit')
  }

  return (
    <div>
      {PageLoading && <FullPageLoading />}
      <div className='p-3 flex items-center' >
        <h1 className='text-2xl flex-1'>Usuários</h1>
        <div>
          <ItemButton
            IconElement={FaPlus}
            onClick={() => setModalScreen('add')}
          />
        </div>
      </div>
      <div className='my-3 '>
        {!loadingSkeleton && users.length > 0 && users.map(item => (
          // <div key={item.id}>{item.name}</div>
          <UserItem
            key={item.id}
            item={item}
            refreshAction={() => loadUsers()}
            openModal={user => editUser(user)}
            setPageLoading={setPageLoading}
          />
        ))}

        {!loadingSkeleton && users.length === 0 && < UserItemNotFount />}
        {loadingSkeleton && <>
          <UserItemPlaceholder />
          <UserItemPlaceholder />
        </>}
      </div>
      {modalScreen &&
        <Modal
          onClose={() => setModalScreen(null)}
        >
          {modalScreen === 'add' &&
            <UserAdd
              refreshAction={() => loadUsers()}
              setPageLoading={setPageLoading}
              PageLoading={PageLoading}
              closeModal={async () => setModalScreen(null)}
            />
          }
          {modalScreen === 'edit' && selectedUser &&
            <UserEdit
              refreshAction={() => loadUsers()}
              user={selectedUser}
              setPageLoading={setPageLoading}
              PageLoading={PageLoading}
            />
          }
        </Modal>
      }
    </div>
  )
}