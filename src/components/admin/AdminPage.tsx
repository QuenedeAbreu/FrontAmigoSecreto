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
import { EventEdit } from '@/components/admin/events/EventEdit'
import { jwtDecode } from 'jwt-decode'
import { getCookie } from 'cookies-next'
import { Pagination } from '@/components/admin/Pagination'
import { SearchDropdown } from './Search'
import { Select, Field, Label } from '@headlessui/react'


export const AdminPage = () => {

  const [events, setEvents] = useState<Event[]>([])
  const [loadingSkeleton, setLoadingSkeleton] = useState(true);
  const [PageLoading, setPageLoading] = useState(false);
  const [modalScreen, setModalScreen] = useState<ModalScreens>(null);
  const [selectedEvent, setSelectedEvent] = useState<Event>();

  const [qtdItensPage, setQtdItemPage] = useState(4);
  const [qtdPage, setQtdPage] = useState(1);
  const [activePagination, setActivePagination] = useState(false);

  const [search, setSearch] = useState('')

  const loadEvents = async (activePage: number) => {
    const token = getCookie('token');
    const userTokenDecod = jwtDecode(token as string)
    if (!userTokenDecod) return
    const userTokenDecodString = JSON.stringify(userTokenDecod)
    const userTokenJson = JSON.parse(userTokenDecodString)
    setModalScreen(null)
    setLoadingSkeleton(true)
    // let teste = activePage === 0 ? 0 : activePage * qtdItensPage
    const eventsList = await api.getEvents(userTokenJson.id, qtdItensPage, activePage * qtdItensPage)
    // console.log(eventsList);
    setLoadingSkeleton(false);
    if (eventsList !== false) {
      const qtdPage = Math.ceil(eventsList.countEvents / qtdItensPage)
      if (qtdPage) setActivePagination(true)
      setQtdPage(qtdPage)
      setEvents(eventsList.events as Event[]);
    } else {
      setEvents([]);
    }
  }
  useEffect(() => {
    console.log(search);
  }, [search])
  const editEvent = async (event: Event) => {
    setSelectedEvent(event)
    setModalScreen('edit')

  }
  useEffect(() => {
    loadEvents(0);
  }, [])

  return (
    <div>
      {PageLoading && <FullPageLoading />}
      <div className='p-3 flex items-center' >
        <h1 className='text-2xl flex-1'>Eventos</h1>
        <div className='mr-3'>
          <SearchDropdown
            search={search}
            setSearch={setSearch}
          />
        </div>
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
            refreshAction={() => loadEvents(1)}
            openModal={event => editEvent(event)}
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
              refreshAction={() => loadEvents(1)}
              setPageLoading={setPageLoading}
              PageLoading={PageLoading}
            />
          }
          {modalScreen === 'edit' &&
            <EventEdit
              refreshAction={() => loadEvents(1)}
              event={selectedEvent}
              setPageLoading={setPageLoading}
              PageLoading={PageLoading}
            />
          }
        </Modal>
      }
      {activePagination &&
        <>
          <Field>
            <Label>Linhas por página:</Label>
            <Select
              onChange={(e) => { alert(e.target.value) }}
              name="qtdlinhas"
              className="text-center w-11 ml-3 bg-gray-950 rounded border-gray-700 border" aria-label="Quantidade de Registros">
              <option value={2}>2</option>
              <option value={4}>4</option>
              <option value={6}>6</option>
              <option value={8}>8</option>
              <option value={10}>10</option>
            </Select>
          </Field>
          <Pagination
            loadEvents={loadEvents}
            qtdPages={qtdPage}
          />
        </>
      }
    </div>
  )

}