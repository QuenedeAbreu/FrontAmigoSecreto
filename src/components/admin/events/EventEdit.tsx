"use client"
import { Event } from '@/types/events'
import { useState } from 'react';
import { EventTabInfo } from '@/components/admin/events/EventTabInfo';
import { EventTabGroups } from '@/components/admin/groups/EventTabGroups';
type Props = {
  event: Event | undefined;
  refreshAction: () => void;
  setPageLoading: (item: boolean) => void;
  PageLoading: boolean;
}
type TabsNames = 'info' | 'groups' | 'people'

export const EventEdit = ({ event, refreshAction, setPageLoading, PageLoading }: Props) => {
  if (!event) return;
  const [tab, setTab] = useState<TabsNames>('info');

  return (
    <div>
      <div className='flex text-center border-b border-gray-500 cursor-pointer'>
        <div onClick={() => setTab('info')} className={`flex-1 p-3 hover:bg-slate-700 rounded-t-md ${tab === 'info' ? 'bg-gray-600' : ''}`}>Informações</div>
        <div onClick={() => setTab('groups')} className={`flex-1 p-3 hover:bg-slate-700 rounded-t-md ${tab === 'groups' ? 'bg-gray-600' : ''}`}>Grupos</div>
        <div onClick={() => setTab('people')} className={`flex-1 p-3 hover:bg-slate-700 rounded-t-md ${tab === 'people' ? 'bg-gray-600' : ''}`}>Pessoas</div>
      </div>
      <div>
        {tab === 'info' && <EventTabInfo
          event={event}
          refreshAction={refreshAction}
          setPageLoading={setPageLoading}
          PageLoading={PageLoading}
        />}
        {tab === 'groups' && <EventTabGroups
          eventId={event.id}
          setPageLoading={setPageLoading}
          PageLoading={PageLoading}
        />}
        {tab === 'people' && 'Pessoas'}
      </div>
    </div>
  )

}