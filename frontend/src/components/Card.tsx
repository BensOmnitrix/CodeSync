import { type JSX } from "react";

export const Card = ({children, id}: {
    children: React.ReactNode;
    id?: string;
}): JSX.Element => {
  return (
    <section
      id={id}
      className="mx-auto max-w-6xl px-12 py-32 text-center"
    >{children}</section>
  );
};
