import * as api from '@/api/admin'
import { Group } from '@/types/Group';
import { useEffect, useState } from 'react';
import { GroupItemPlaceholder, GroupItemNotFount } from '@/components/admin/groups/GroupItem';
import { PersonComplete } from '@/types/PersonComplete';
import { PersonItemPlaceholder, PersonItemNotFount, PersonItem } from '@/components/admin/people/PersonItem';
import { PersonAdd } from '@/components/admin/people/PersonAdd'
import { PersonEdit } from '@/components/admin/people/PersonEdit';

type Props = {
  eventId: number;
  setPageLoading: (loading: boolean) => void;
  PageLoading: boolean;
}

export const EventTabPeople = ({ eventId, PageLoading, setPageLoading }: Props) => {
  //States Group
  const [groups, setGroups] = useState<Group[]>([]);
  const [selectedGroupId, setSelectedGroupId] = useState(0);
  const [groupLoading, setGroupLoading] = useState(true);
  //States People
  const [people, setPeople] = useState<PersonComplete[]>([])
  const [peopleLoading, setPeopleLoading] = useState(false);
  const [selectPerson, setSelectedPerson] = useState<PersonComplete>();

  //Listando Grupos
  const loadGroups = async () => {
    setSelectedGroupId(0)
    setGroupLoading(true)
    const groupList = await api.getGroups(eventId);
    setGroups(groupList as Group[]);
    setGroupLoading(false)
  }
  useEffect(() => {
    loadGroups()
  }, [])

  //Listando Pessoas
  const loadPeople = async () => {
    setSelectedPerson(undefined)
    if (selectedGroupId <= 0) return;
    setPeople([])
    setPeopleLoading(true)
    const peopleList = await api.getPeople(eventId, selectedGroupId);
    setPeople(peopleList as PersonComplete[]);
    // console.log(peopleList);
    setPeopleLoading(false)
  }
  useEffect(() => {
    loadPeople()
  }, [selectedGroupId])

  const handleEditButton = (person: PersonComplete) => {
    setSelectedPerson(person)

  }



  return (
    <div>
      <div className='my-3'>
        {!groupLoading && groups.length > 0 &&
          <select
            onChange={e => setSelectedGroupId(parseInt(e.target.value))}
            className='w-full bg-transparent text-white text-xl p-3 outline-none'
          >
            <option value={0} className='bg-gray-800'>Selecione um grupo</option>
            {groups.map(item =>
              <option key={item.id} className='bg-gray-800' value={item.id}>{item.name}</option>
            )}
          </select>
        }
        {groupLoading && <GroupItemPlaceholder />}
        {!groupLoading && groups.length === 0 && <GroupItemNotFount />}
        {selectedGroupId > 0 &&
          <>
            <div className='border border-dashed p-3 my-3'>
              {!selectPerson &&
                <PersonAdd
                  eventId={eventId}
                  groupId={selectedGroupId}
                  refreshAction={loadPeople}
                  setPageLoading={setPageLoading}
                  PageLoading={PageLoading}
                />
              }
              {selectPerson &&
                <PersonEdit
                  person={selectPerson}
                  refreshAction={loadPeople}
                  setPageLoading={setPageLoading}
                  PageLoading={PageLoading}
                />
              }
            </div>
            <div className='w-full max-h-60 overflow-y-auto p-3 my-3'>
              {!peopleLoading && people.length > 0 && people.map(item => {
                return <PersonItem
                  key={item.id}
                  item={item}
                  refreshAction={loadPeople}
                  onEdit={handleEditButton}
                  setPageLoading={setPageLoading}
                  PageLoading={PageLoading}
                />
              })}

              {peopleLoading &&
                <>
                  <PersonItemPlaceholder />
                  <PersonItemPlaceholder />
                </>
              }
              {!peopleLoading && people.length === 0 && <PersonItemNotFount />}
            </div>
          </>
        }
      </div>
    </div>
  )
}