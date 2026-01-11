import { type JSX } from "react";

export const Input = ({
  type,
  placeholder,
}: {
  type: string;
  placeholder: string;
}): JSX.Element => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="w-full rounded-xl border text-gray-200 border-slate-700 bg-slate-800 py-3 pl-11 pr-4 text-sm focus:border-indigo-500 focus:outline-none"
    />
  );
};
