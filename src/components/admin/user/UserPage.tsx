"use client"
import * as api from '@/api/admin'
import { FullPageLoading } from '@/components/admin/FullPageLoading';
import { useState } from 'react';
import { UserItem, UserItemPlaceholder, UserItemNotFount } from '@/components/admin/user/UserItem'
import { User } from '@/types/User'

export const UserPage = () => {
  const [users, setUsers] = useState<User[]>([])
  const [PageLoading, setPageLoading] = useState(false);
  const [loadingSkeleton, setLoadingSkeleton] = useState(false);
  return (
    <div>
      {PageLoading && <FullPageLoading />}
      <div className='p-3 flex items-center' >
        <h1 className='text-2xl flex-1'>Usuários</h1>
      </div>
      <div className='my-3 '>
        {!loadingSkeleton && users.length > 0 && users.map(item => (

          <UserItem
          //   key={item.id}
          //   item={item}
          //   refreshAction={() => loadEvents(0)}
          //   openModal={event => editEvent(event)}
          //   setPageLoading={setPageLoading}
          />
        ))}






        {!loadingSkeleton && users.length === 0 && < UserItemNotFount />}
        {loadingSkeleton && <>
          <UserItemPlaceholder />
          <UserItemPlaceholder />
        </>}
      </div>





    </div>
  )
}