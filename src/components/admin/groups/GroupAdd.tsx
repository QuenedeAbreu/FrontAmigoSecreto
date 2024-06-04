import { InputField } from "@/components/admin/inputField"
import { ErrorItem, getErrorFromZod } from "@/utils/getErrorFromZod"
import { useEffect, useState } from "react"
import { z } from "zod"
import { Button } from "@/components/admin/Button"
import * as api from "@/api/admin"
import { ModalConfirm } from "@/components/admin/ModalConfirm"
import { Event } from '@/types/events'
import { IoCloseCircle } from "react-icons/io5";
import { MdGroupAdd } from "react-icons/md";

type Props = {
  eventId: number,
  refreshAction: () => void,
  PageLoading: boolean,
  setPageLoading: (item: boolean) => void;
}



export const GroupAdd = ({ eventId, refreshAction, PageLoading, setPageLoading }: Props) => {
  const [nameField, setNamefield] = useState('')
  const [errors, setErrors] = useState<ErrorItem[]>([])
  const [openAndloseModalErro, setOpenAndloseModalErro] = useState(false)
  const [event, setEvent] = useState<Event>()

  const grupoSchema = z.object({
    nameField: z.string().min(1, 'O nome do grupo é obrigatório')
  })

  const getEvent = async () => {
    const resultEvent = await api.getOneEvent(eventId)
    setEvent(resultEvent as Event)
  }

  const handleAddButton = async () => {
    // setErrors([])
    setPageLoading(true)
    const newGroup = await api.addGroup(eventId, {
      name: nameField
    })
    if (newGroup) {
      setNamefield('')
      refreshAction()
      setPageLoading(false)
    } else {
      setPageLoading(false);
      setOpenAndloseModalErro(true)
    }
  }

  useEffect(() => {
    setErrors([])
    const data = grupoSchema.safeParse({ nameField })
    if (!data.success) return setErrors(getErrorFromZod(data.error))
  }, [nameField])

  useEffect(() => {
    getEvent()
    setErrors([])
  }, [])

  return (
    <div>
      {openAndloseModalErro &&
        <ModalConfirm
          title="Error !"
          description="Não foi possível criar novo grupo."
          // onConfirm={() => setOpenAndloseModalErro(false)}
          onCancel={() => setOpenAndloseModalErro(false)}
          eventTitle={event?.title}
          IconElement={IoCloseCircle}
          type="error"
        />
      }
      <h4 className="text-xl">Novo Grupo</h4>
      <h5>Evento: {event?.title}</h5>
      <InputField
        value={nameField}
        onChange={e => setNamefield(e.target.value)}
        placeholder="Digite o nome do grupo"
        errorMessage={errors.find(item => item.field === 'nameField')?.message}
      />
      <div className="">
        <Button
          value={PageLoading ? <div><i className="pi pi-spin pi-spinner" style={{ fontSize: '1rem' }}></i> Salvando...</div> : 'Adicionar'}
          onClick={handleAddButton}
          disabled={PageLoading}
          IconElement={MdGroupAdd}
        />
      </div>
    </div>

  )
}