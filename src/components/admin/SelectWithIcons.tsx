import React from 'react';
import Select, { SingleValue, MultiValue, OptionProps, ActionMeta } from 'react-select';
import { FaApple, FaAndroid, FaWindows } from 'react-icons/fa';

// Tipo para as opções
type OptionType = {
  value: string;
  label: string;
  icon: JSX.Element;
};

// Props para o componente SelectWithIcons
type SelectWithIconsProps = {
  options: OptionType[];
  onChange: (newValue: SingleValue<OptionType> | MultiValue<OptionType>, actionMeta: ActionMeta<OptionType>) => void;
};

// Customização da exibição do valor selecionado
const customSingleValue = ({ data }: { data: OptionType }) => (
  <div className="flex items-center">
    {data.icon}
    <span className="ml-2">{data.label}</span>
  </div>
);

// Customização da exibição das opções
const customOption = (props: OptionProps<OptionType>) => {
  return (
    <div
      {...props.innerProps}
      className={`${props.isFocused ? 'bg-gray-800 text-white' : 'bg-gray-900 text-white'} flex items-center p-2 cursor-pointer`}
    >
      {props.data.icon}
      <span className="ml-2">{props.data.label}</span>
    </div>
  );
};

// Configuração mínima necessária para `react-select` usar Tailwind
const customStyles = {
  control: (provided: any) => ({
    ...provided,
    backgroundColor: 'rgb(17 24 39 / var(--tw-bg-opacity))', // bg-gray-900
    boxShadow: 'none',
    color: 'white', // Define a cor do texto no input
    '&:hover': {
      borderColor: 'transparent',
    },
    '& input': {
      color: 'white !important', // Cor do texto do input
    },
    '&:focus-within': {
      borderColor: 'transparent',
    },


  }),
  menu: (provided: any) => ({
    ...provided,
    backgroundColor: 'rgb(17 24 39 / var(--tw-bg-opacity))', // bg-gray-900
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: 'white', // Define a cor do texto do valor selecionado
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isFocused ? '#4b4b4b' : 'rgb(17 24 39 / var(--tw-bg-opacity))', // bg-gray-700 for focused, bg-gray-900 for default
    color: state.isFocused ? 'white' : '#e5e7eb', // Tailwind's gray-200
  }),
};
export const SelectWithIcons: React.FC<SelectWithIconsProps> = ({ options, onChange }) => {
  return (
    <Select
      options={options}
      components={{ Option: customOption, SingleValue: customSingleValue }}
      onChange={onChange}
      styles={customStyles}
      noOptionsMessage={() => 'Nenhuma opção disponível'} // Mensagem quando não há opções
      classNamePrefix="react-select" // Isso permite usar Tailwind para estilizar partes internas do `react-select`
    />
  );
};

