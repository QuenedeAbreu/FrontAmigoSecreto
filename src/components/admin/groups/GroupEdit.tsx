import { Group } from "@/types/Group"
import { ErrorItem, getErrorFromZod } from "@/utils/getErrorFromZod";
import { useEffect, useState } from "react";
import { z } from "zod";
import { InputField } from "@/components/admin/inputField";
import { Button } from "@/components/admin/Button";
import { Event } from '@/types/events'
import { MdGroupAdd } from "react-icons/md";
import { IoCloseCircle } from "react-icons/io5";
import { ImCancelCircle } from "react-icons/im";
import * as api from '@/api/admin'
import { ModalConfirm } from '@/components/admin/ModalConfirm';

type Props = {
  group: Group,
  refreshAction: () => void,
  PageLoading: boolean,
  setPageLoading: (item: boolean) => void;
}

export const GroupEdit = ({ group, refreshAction, PageLoading, setPageLoading }: Props) => {
  const [nameField, setNamefield] = useState(group.name);
  const [errors, setErrors] = useState<ErrorItem[]>([])
  const [openAndloseModalErro, setOpenAndloseModalErro] = useState(false)
  const [event, setEvent] = useState<Event>()

  const getEvent = async () => {
    const resultEvent = await api.getOneEvent(group.id_event)
    setEvent(resultEvent as Event)
  }

  const grupoSchema = z.object({
    nameField: z.string().min(1, 'O nome do grupo é obrigatório')
  })

  useEffect(() => {
    setErrors([])
    const data = grupoSchema.safeParse({ nameField })
    if (!data.success) return setErrors(getErrorFromZod(data.error))
  }, [nameField])

  useEffect(() => {
    getEvent()
    setErrors([])
  }, [])

  const handleEditButton = async () => {
    if (errors.length > 0) return;
    setPageLoading(true)
    const result = await api.updateGroup(group.id, group.id_event, {
      name: nameField
    })
    if (result) {
      refreshAction()
      setPageLoading(false)
    } else {
      setPageLoading(false);
      setOpenAndloseModalErro(true)
    }
  }


  return (
    <div>
      {openAndloseModalErro &&
        <ModalConfirm
          title="Error !"
          description="Não foi possível editar o grupo."
          // onConfirm={() => setOpenAndloseModalErro(false)}
          onCancel={() => setOpenAndloseModalErro(false)}
          eventTitle={event?.title}
          IconElement={IoCloseCircle}
          type="error"
        />
      }
      <h4 className="text-xl">Editar Grupo</h4>
      <h5>Evento: {event?.title}</h5>
      <InputField
        value={nameField}
        onChange={e => setNamefield(e.target.value)}
        placeholder="Digite o nome do grupo"
        errorMessage={errors.find(item => item.field === 'nameField')?.message}
      />
      <div className="flex gap-3">

        <Button
          value='Cancelar'
          onClick={() => refreshAction()}
          disabled={PageLoading}
          IconElement={ImCancelCircle}
        />

        <Button
          value={PageLoading ? <div><i className="pi pi-spin pi-spinner" style={{ fontSize: '1rem' }}></i> Salvando...</div> : 'Salvar'}
          onClick={handleEditButton}
          disabled={PageLoading}
          IconElement={MdGroupAdd}
        />
      </div>
    </div>
  )
}