"use client"
import * as api from '@/api/admin'
import { useEffect, useState } from 'react'
import { Event } from '@/types/events'
import { EventItemPlaceholder, EventItemNotFount, EventItem } from '@/components/admin/events/EventItem'
import { ItemButton } from '@/components/admin/ItemButton'
import { FaPlus } from 'react-icons/fa'

export const AdminPage = () => {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true);

  const loadEvents = async () => {
    setLoading(true)
    const eventsList = await api.getEvents();
    setLoading(false);
    setEvents(eventsList as Event[]);
  }
  useEffect(() => {
    loadEvents();
  }, [])

  return (
    <div>
      <div className='p-3 flex items-center'>
        <h1 className='text-2xl flex-1'>Eventos</h1>
        <div>
          <ItemButton
            IconElement={FaPlus}
            onClick={() => { }}
          />
        </div>
      </div>
      <div className='my-3 '>
        {!loading && events.length > 0 && events.map(item => (
          <EventItem
            key={item.id}
            item={item}
            refreshAction={loadEvents}
            openModal={() => { }}
          />
        ))}
        {!loading && events.length === 0 && <EventItemNotFount />}
        {loading && <>
          <EventItemPlaceholder />
          <EventItemPlaceholder />
        </>}
      </div>

    </div>
  )

}