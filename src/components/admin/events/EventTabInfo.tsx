import { Event } from '@/types/events'
import { useEffect, useState } from 'react';
import { ErrorItem, getErrorFromZod } from "@/utils/getErrorFromZod";
import { InputField } from '@/components/admin/inputField';
import { Button } from '@/components/admin/Button';
import { IoIosSave } from "react-icons/io";
import { z } from 'zod';
import * as api from '@/api/admin'
import { ModalConfirm } from '@/components/admin/ModalConfirm'
import { IoCloseCircle } from "react-icons/io5";

type Props = {
  event: Event;
  refreshAction: () => void;
  setPageLoading: (item: boolean) => void;
  PageLoading: boolean
}


export const EventTabInfo = ({ event, refreshAction, setPageLoading, PageLoading }: Props) => {
  const [titleField, setTitleField] = useState(event.title);
  const [descriptionField, setDescriptionField] = useState(event.description);
  const [groupField, setGroupField] = useState(event.grouped);
  const [statusField, setStatusField] = useState(event.status);
  const [errors, setErrors] = useState<ErrorItem[]>([]);
  const [openAndloseModalErro, setOpenAndloseModalErro] = useState(false)


  const eventSchema = z.object({
    titleField: z.string().min(1, 'O título é obrigatório'),
    descriptionField: z.string().min(1, 'A descrição é obrigatória'),
    groupField: z.boolean(),
    statusField: z.boolean(),
  })

  useEffect(() => {
    setErrors([])
    const data = eventSchema.safeParse({ titleField, descriptionField, groupField, statusField })
    if (!data.success) setErrors(getErrorFromZod(data.error))
    // setErrors(errors)
  }, [titleField, descriptionField, groupField, statusField])


  const handleSaveButton = async () => {
    if (errors.length > 0) return;
    setPageLoading(true);
    const updatedEvent = await api.updateEvent(event.id,
      {
        title: titleField,
        description: descriptionField,
        grouped: groupField,
        status: statusField
      })
    //console.log(updatedEvent);
    if (updatedEvent) {
      refreshAction();
      setPageLoading(false);
      // console.log('Aqui');
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
          description="Não foi possível sortear com esses grupos/pessoas!"
          // onConfirm={() => setOpenAndloseModalErro(false)}
          onCancel={() => setOpenAndloseModalErro(false)}
          eventTitle={event.title}
          IconElement={IoCloseCircle}
          type="error"
        />
      }
      <div className='my-3'>
        <div className='mb-5'>
          <label>Título</label>
          <InputField
            value={titleField}
            onChange={(e) => setTitleField(e.target.value)}
            placeholder='Digite o título do evento'
            disabled={PageLoading}
            errorMessage={errors.find(error => error.field === 'titleField')?.message}
          />
        </div>
        <div className='mb-5'>
          <label>Descrição</label>
          <InputField
            value={descriptionField}
            onChange={(e) => setDescriptionField(e.target.value)}
            placeholder='Digite a descrição do evento'
            disabled={PageLoading}
            errorMessage={errors.find(error => error.field === 'descriptionField')?.message}
          />
        </div>
        <div className='flex mb-5'>
          <div className='flex-1 '>
            <label>Agrupar sorteio?</label>
            <input
              type='checkbox'
              checked={groupField}
              onChange={e => setGroupField(!groupField)}
              className='block w-5 h-5 mt-3'
              disabled={PageLoading}
            />
          </div>
          <div className='flex-1 '>
            <label>Evento liberado?</label>
            <input
              type='checkbox'
              checked={statusField}
              onChange={e => setStatusField(!statusField)}
              className='block w-5 h-5 mt-3'
              disabled={PageLoading}
            />
          </div>

        </div>
        <div>
          <Button
            value={PageLoading ? <div><i className="pi pi-spin pi-spinner" style={{ fontSize: '1rem' }}></i> Salvando...</div> : 'Salvar'}
            onClick={handleSaveButton}
            IconElement={IoIosSave}
            disabled={PageLoading}
          />
        </div>
      </div>
    </div>
  )
}