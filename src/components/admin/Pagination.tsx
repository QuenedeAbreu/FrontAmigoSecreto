'use client'
import React, { useEffect, useState } from "react";
import { Button } from "@material-tailwind/react";
import { ItemButtonPagination } from '@/components/admin/ItemButtonPagination'
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
// import { Bs1CircleFill } from "react-icons/bs";
import { ItensPagination } from '@/utils/ItensPagination'
type Props = {
  qtdPages: number,
  loadEvents: (activePage: number) => void,
}

export const Pagination = ({ qtdPages = 1, loadEvents }: Props) => {
  const [active, setActive] = useState(1);
  // const [qtdPages, setQtdPages] = useState(50)
  const [itemPagination, setItemPagination] = useState<String[]>([])

  const getItemProps = (index: number) => {
    setActive(index)
  };

  const next = () => {
    if (active === qtdPages) return;

    setActive(active + 1);
  };

  const prev = () => {
    if (active === 1) return;

    setActive(active - 1);
  };

  useEffect(() => {
    setItemPagination(ItensPagination(active, qtdPages).filter(item => (item !== '')))
    loadEvents(active - 1)
    //console.log(ItensPagination(active, qtdPages));
  }, [active])


  return (
    <div className="flex items-center justify-between">
      <Button
        variant="text"
        className={`flex items-center gap-2 px-3 py-2 ${active !== 1 ? 'hover:bg-gray-800' : ''}`}
        onClick={prev}
        disabled={active === 1}
        placeholder=""
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Anterior
      </Button>
      <div className="flex items-center gap-2 justify-center flex-wrap ">

        {itemPagination.map((item, index) => {
          if (item === '...') {
            return <span key={index} className="">{item}</span>
          }
          return (
            <ItemButtonPagination
              key={index}
              label={item as string}
              select={active === parseInt(item as string)}
              onClick={() => getItemProps(index)}
            />
          )
        })}
      </div>

      <Button
        variant="text"
        className={`flex items-center gap-2 px-3 py-2 ${active !== qtdPages ? 'hover:bg-gray-800' : ''}`}
        onClick={next}
        disabled={active === qtdPages}
        placeholder=""
      >
        Próximo
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </Button>
    </div>
  );
}