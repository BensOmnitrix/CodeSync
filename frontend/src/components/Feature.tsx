import { type JSX } from "react";
import { motion } from "framer-motion";

export function Feature({ icon, title, description }: { icon: JSX.Element; title: string; description: string }) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="rounded-3xl border border-slate-800 bg-slate-900/70 p-10 shadow-xl"
    >
      <div className="mb-5 text-indigo-500">{icon}</div>
      <h4 className="mb-3 text-2xl font-semibold">{title}</h4>
      <p className="text-slate-300 leading-relaxed">{description}</p>
    </motion.div>
  );
}