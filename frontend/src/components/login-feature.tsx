import {type JSX} from "react";

export function Feature({ icon, title, description }: { icon: JSX.Element; title: string; description: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className="text-indigo-500">{icon}</div>
      <div>
        <h4 className="text-sm font-semibold">{title}</h4>
        <p className="text-sm text-slate-400">{description}</p>
      </div>
    </div>
  );
}
