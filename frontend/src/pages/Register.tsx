import { motion } from "framer-motion";
import { Github, Mail, Lock, User, Code2, Users, Bot } from "lucide-react";
import { Feature } from "../components/LoginFeature";
import { Input } from "../components/Input";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-black flex items-center justify-center">
      <div className="mx-6 grid w-full max-w-6xl grid-cols-1 overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/70 shadow-2xl backdrop-blur md:mx-10 lg:mx-16 lg:grid-cols-2">
        <div className="relative hidden flex-col justify-between p-12 text-slate-100 lg:flex">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(129,140,248,0.35),transparent_65%)]" />

          <div>
            <h1 className="text-5xl font-extrabold leading-tight text-white">
              Build Better Code,
              <br /> Together
            </h1>
          </div>

          <div className="mt-14 space-y-14">
            <Feature
              icon={<Code2 />}
              title="Smart Diff Reviews"
              description="Review code with rich diffs, inline comments, and full context."
            />
            <Feature
              icon={<Users />}
              title="Real-Time Collaboration"
              description="See teammates’ cursors, comments, and activity instantly."
            />
            <Feature
              icon={<Bot />}
              title="AI Review Assistant"
              description="Get instant suggestions, explanations, and improvements."
            />
          </div>

          <p className="mt-14 text-sm text-slate-300">
            Designed for modern engineering teams shipping at scale.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col justify-center p-10 md:p-14"
        >
          <div className="mb-10">
            <h2 className="text-3xl font-extrabold text-gray-200">
              Create your account
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              Start collaborating on code reviews in minutes
            </p>
          </div>

          <button className="mb-6 flex items-center justify-center gap-3 rounded-xl text-gray-200 border border-slate-700 bg-slate-800 py-3 text-sm font-medium hover:bg-slate-700">
            <Github className="h-5 w-5" />
            Sign up with GitHub
          </button>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-700" />
            <span className="text-xs text-slate-400">OR</span>
            <div className="h-px flex-1 bg-slate-700" />
          </div>

          <form className="space-y-5">
            <div className="relative">
              <User className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
              <Input type="text" placeholder="Username" />
            </div>

            <div className="relative">
              <Mail className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
              <Input type="email" placeholder="Email address" />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
              <Input type="password" placeholder="Password" />
            </div>

            <button
              onClick={() => {}}
              type="submit"
              className="mt-2 w-full rounded-xl text-gray-200 bg-indigo-600 py-3 text-sm font-semibold hover:bg-indigo-500"
            >
              Create account
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-400">
            Already have an account?{" "}
            <a href="/login" className="text-indigo-400 hover:underline">
              Login
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
