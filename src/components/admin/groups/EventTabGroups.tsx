import { Group } from "@/types/Group";
import { useEffect, useState } from "react"
import * as api from '@/api/admin'
import { GroupItemPlaceholder, GroupItemNotFount, GroupItem } from "@/components/admin/groups/GroupItem";
import { GroupAdd } from '@/components/admin/groups/GroupAdd';
import { GroupEdit } from "@/components/admin/groups/GroupEdit";

type Props = {
  eventId: number,
  PageLoading: boolean,
  setPageLoading: (item: boolean) => void;
}

export const EventTabGroups = ({ eventId, PageLoading, setPageLoading }: Props) => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true)
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);

  const loadGroups = async () => {
    setSelectedGroup(null)
    setLoading(true);
    const groupsList = await api.getGroups(eventId);
    setLoading(false);
    setGroups(groupsList as Group[]);
  }
  useEffect(() => {
    loadGroups();
  }, [])

  const handleEditButton = (group: Group) => {
    setSelectedGroup(group)
  }

  return (
    <div>
      <div className="border border-dashed p-3 my-3">
        {!selectedGroup &&
          <GroupAdd
            eventId={eventId}
            refreshAction={loadGroups}
            PageLoading={PageLoading}
            setPageLoading={setPageLoading}
          />
        }
        {selectedGroup &&
          <GroupEdit
            group={selectedGroup}
            refreshAction={loadGroups}
            PageLoading={PageLoading}
            setPageLoading={setPageLoading}
          />
        }
      </div>
      {!loading && groups.length > 0 && groups.map(item => (
        // <div key={item.id}>{item.name}</div>
        <GroupItem
          key={item.id}
          item={item}
          onEdit={handleEditButton}
          refreshAction={loadGroups}
          PageLoading={PageLoading}
          setPageLoading={setPageLoading}
        />
      ))}
      {loading &&
        <>
          <GroupItemPlaceholder />
          <GroupItemPlaceholder />
        </>
      }
      {!loading && groups.length === 0 &&
        <GroupItemNotFount />
      }
    </div>
  )
}