import { ChangeEvent } from "react";

type TInputProps = {
  type?: string;
  name?: string;
  placeholder?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  style?: string;
};

export default function Input({ type, name, placeholder, onChange, style }: TInputProps) {
  return (
    <>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        className={`border-grayscale-500 rounded-lg border border-solid ${style}`}
      />
    </>
  );
}

/*
box-sizing: border-box;


display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
padding: 16px;
gap: 16px;

width: 386px;
height: 56px;


background: #FFFFFF;

border: 1px solid #C5C5C5;
border-radius: 8px;  t


flex: none;
order: 1;
flex-grow: 0;
*/
