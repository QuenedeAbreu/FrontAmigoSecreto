import { useEffect, useRef, useState } from 'react';
import { FaSearch } from "react-icons/fa";
import { Transition } from '@headlessui/react';
import { useClickOutside } from '@/hooks/useClickOutside';

type Props = {
  search: string,
  setSearch: (search: string) => void
}

export const SearchDropdown = ({ search, setSearch }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const closeDropdown = () => {
    setIsOpen(false);
  };
  useClickOutside(dropdownRef, closeDropdown);
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 50); // Ajuste o tempo conforme necessário
    }
  }, [isOpen]);

  return (
    <div className="z-50 relative inline-block" ref={dropdownRef}>
      <div>
        <button
          type="button"
          className={`inline-flex justify-center rounded  p-3 hover:bg-gray-800 ${isOpen ? 'bg-gray-800' : ''}`}
          id="options-menu"
          aria-expanded="true"
          aria-haspopup="true"
          onClick={toggleDropdown}
        >
          <FaSearch />
        </button>
      </div>
      <Transition
        show={isOpen}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div
          className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg ring-1 ring-black ring-opacity-5"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <div className="py-1" role="none">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              className="w-full px-4 py-2 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
              placeholder="Pesquisar Evento"
              ref={inputRef}
            />

          </div>
        </div>
      </Transition>
    </div>
  );
};

