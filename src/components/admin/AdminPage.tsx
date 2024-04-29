"use client"
import * as api from '@/api/admin'
import { useEffect, useState } from 'react'
import { Event } from '@/types/events'
import { EventItemPlaceholder, EventItemNotFount, EventItem } from '@/components/admin/events/EventItem'
import { ItemButton } from '@/components/admin/ItemButton'
import { FaPlus } from 'react-icons/fa'
import { FullPageLoading } from '@/components/admin/FullPageLoading';
export const AdminPage = () => {
  const [events, setEvents] = useState<Event[]>([])
  const [loadingSkeleton, setLoadingSkeleton] = useState(true);
  const [PageLoading, setPageLoading] = useState(false)

  const loadEvents = async () => {
    setLoadingSkeleton(true)
    const eventsList = await api.getEvents();
    setLoadingSkeleton(false);
    setEvents(eventsList as Event[]);
  }
  useEffect(() => {
    loadEvents();
  }, [])

  const openFullPageLoading = (estado: boolean) => {
    setPageLoading(estado)
  }


  return (
    <div>
      {PageLoading && <FullPageLoading />}
      <div className='p-3 flex items-center' >
        <h1 className='text-2xl flex-1'>Eventos</h1>
        <div>
          <ItemButton
            IconElement={FaPlus}
            onClick={() => { }}
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
            openFullPageLoading={openFullPageLoading}
          />
        ))}
        {!loadingSkeleton && events.length === 0 && <EventItemNotFount />}
        {loadingSkeleton && <>
          <EventItemPlaceholder />
          <EventItemPlaceholder />
        </>}
      </div>

    </div>
  )

}