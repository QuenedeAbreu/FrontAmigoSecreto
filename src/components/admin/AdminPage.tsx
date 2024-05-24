"use client"
import * as api from '@/api/admin'
import { useEffect, useState } from 'react'
import { Event } from '@/types/events'
import { EventItemPlaceholder, EventItemNotFount, EventItem } from '@/components/admin/events/EventItem'
import { ItemButton } from '@/components/admin/ItemButton'
import { FaPlus } from 'react-icons/fa'
import { FullPageLoading } from '@/components/admin/FullPageLoading';
import { ModalScreens } from '@/types/ModalScreens'
import { Modal } from '@/components/admin/Modal'
import { EventAdd } from '@/components/admin/events/EventAdd'

export const AdminPage = () => {
  const [events, setEvents] = useState<Event[]>([])
  const [loadingSkeleton, setLoadingSkeleton] = useState(true);
  const [PageLoading, setPageLoading] = useState(false);
  const [modalScreen, setModalScreen] = useState<ModalScreens>(null);

  const loadEvents = async () => {
    setModalScreen(null)
    setLoadingSkeleton(true)
    const eventsList = await api.getEvents();
    setLoadingSkeleton(false);
    setEvents(eventsList as Event[]);
  }
  useEffect(() => {
    loadEvents();
  }, [])

  // const openFullPageLoading = (estado: boolean) => {
  //   setPageLoading(estado)
  // }


  return (
    <div>
      {PageLoading && <FullPageLoading />}
      <div className='p-3 flex items-center' >
        <h1 className='text-2xl flex-1'>Eventos</h1>
        <div>
          <ItemButton
            IconElement={FaPlus}
            onClick={() => setModalScreen('add')}
          />
        </div>
      </div>
      <div className='my-3 '>
        {!loadingSkeleton && events.length > 0 && events.map(item => (
          <EventItem
            key={item.id}
            item={item}
            refreshAction={loadEvents}
            openModal={() => { }}
            setPageLoading={setPageLoading}
          />
        ))}
        {!loadingSkeleton && events.length === 0 && <EventItemNotFount />}
        {loadingSkeleton && <>
          <EventItemPlaceholder />
          <EventItemPlaceholder />
        </>}
      </div>
      {modalScreen &&
        <Modal
          onClose={() => setModalScreen(null)}
        >
          {modalScreen === 'add' &&
            <EventAdd
              refreshAction={loadEvents}
              setPageLoading={setPageLoading}
            />
          }
        </Modal>
      }
    </div>
  )

}