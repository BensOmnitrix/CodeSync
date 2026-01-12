import { type JSX } from "react";

export const Input = ({
  type,
  placeholder,
  onchange,
  value
}: {
  type: string;
  placeholder: string;
  onchange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?:string;
}): JSX.Element => {
  return (
    <input
      onChange={onchange}
      type={type}
      value={value}
      placeholder={placeholder}
      className="w-full rounded-xl border text-gray-200 border-slate-700 bg-slate-800 py-3 pl-11 pr-10 text-sm focus:border-indigo-500 focus:outline-none"
    />
  );
};
