
import { ChangeEvent } from "react";

type Props = {
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'date' | 'datetime-local' | 'month' | 'time' | 'week' | 'search' | 'color' | 'range' | 'file' | 'image' | 'hidden' | 'submit' | 'reset' | 'button' | 'radio' | 'checkbox' | 'select' | 'datalist' | 'output' | 'progress' | 'meter' | 'hidden' | 'reset' | 'button' | 'radio' | 'checkbox' | 'select' | 'datalist' | 'output' | 'progress' | 'meter' | 'hidden' | 'reset' | 'button' | 'radio' | 'checkbox' | 'select' | 'datalist' | 'output' | 'progress' | 'meter' | 'hidden' | 'reset' | 'button' | 'radio' | 'checkbox' | 'select' | 'datalist' | 'output' | 'progress' | 'meter' | 'hidden' | 'reset' | 'button' | 'radio' | 'checkbox' | 'select' | 'datalist' | 'output' | 'progress' | 'meter';
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  errorMessage?: string
}
export const InputField = ({ type, value, onChange, placeholder, disabled, error, errorMessage }: Props) => {
  return (
    <div className="w-full my-3">
      <input
        type={type || 'text'}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        autoComplete={type === 'password' ? 'on' : ''}
        className={`w-full block text-lg p-3 outline-none rounded bg-gray-900 text-white
          border-b-2 ${error || errorMessage ? 'border-red-600' : 'border-gray-900'}
        focus:border-white`}
      />
      {errorMessage && <p className="text-red-600 text-sm mt-1">{errorMessage}</p>}
    </div>
  )
}
