import { motion } from "framer-motion";
import {
  Code2,
  GitPullRequest,
  Users,
  Bot,
  BarChart3,
  Bell,
  ShieldCheck,
  Workflow,
  Zap,
} from "lucide-react";
import { Feature } from "../components/Feature";
import { Card } from "../components/Card";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-black text-slate-100">
      <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-slate-800 bg-black/60 px-12 py-6 backdrop-blur">
        <h1 className="text-2xl font-extrabold tracking-tight">CodeSync</h1>
        <div className="flex items-center gap-8 text-sm text-slate-300">
          <a href="#features" className="hover:text-white">
            Features
          </a>
          <a href="#realtime" className="hover:text-white">
            Realtime
          </a>
          <a href="#ai" className="hover:text-white">
            AI
          </a>
          <a href="#analytics" className="hover:text-white">
            Analytics
          </a>
          <button onClick={() => {
            navigate("/login");
          }} className="rounded-xl bg-indigo-600 px-5 py-2 font-semibold hover:bg-indigo-500">
            Get Started
          </button>
        </div>
      </nav>

      <section className="relative mx-auto max-w-7xl px-12 py-36 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-6xl font-extrabold leading-tight"
        >
          Code Reviews,
          <br />
          Reimagined for Real‑Time Teams
        </motion.h2>
        <p className="mx-auto mt-8 max-w-3xl text-xl text-slate-300">
          A collaborative, real‑time code review platform combining GitHub pull
          requests, Figma‑style multiplayer presence, and AI‑powered code
          intelligence.
        </p>
        <div className="mt-14 flex justify-center gap-6">
          <button onClick={() => {navigate("/login")}} className="rounded-2xl bg-indigo-600 px-8 py-4 text-lg font-semibold hover:bg-indigo-500">
            Start Reviewing
          </button>
          <button onClick={() => {navigate("/login")}} className="rounded-2xl border border-slate-600 px-8 py-4 text-lg hover:bg-slate-800">
            Watch Demo
          </button>
        </div>

        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.15),transparent_60%)]" />
      </section>

      <section id="features" className="mx-auto max-w-7xl px-12 py-32">
        <h3 className="mb-20 text-center text-5xl font-bold">
          Everything You Need for World‑Class Reviews
        </h3>
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          <Feature
            icon={<Code2 />}
            title="Advanced Diff Viewer"
            description="Syntax‑highlighted diffs, inline comments, threaded discussions, and file‑level insights."
          />
          <Feature
            icon={<Users />}
            title="Multiplayer Collaboration"
            description="Live cursors, presence indicators, and real‑time collaborative commenting."
          />
          <Feature
            icon={<GitPullRequest />}
            title="GitHub & GitLab Sync"
            description="Webhook‑driven reviews triggered automatically on pull request events."
          />
          <Feature
            icon={<Bot />}
            title="AI‑Powered Suggestions"
            description="LLM‑generated refactors, bug detection, and best‑practice recommendations."
          />
          <Feature
            icon={<Workflow />}
            title="Approval Workflows"
            description="Configurable approval rules, automated merges, and policy enforcement."
          />
          <Feature
            icon={<Bell />}
            title="Smart Notifications"
            description="Noise‑free Slack & Email digests tailored to your team’s activity."
          />
        </div>
      </section>

      <Card id="features">
        <div className="mx-auto max-w-6xl px-12 text-center">
          <Zap className="mx-auto mb-6 h-10 w-10 text-indigo-500" />
          <h3 className="text-5xl font-bold">True Real‑Time Code Reviews</h3>
          <p className="mx-auto mt-8 max-w-3xl text-xl text-slate-300">
            See comments appear instantly, track reviewers’ cursors live, and
            collaborate asynchronously without losing context.
          </p>
        </div>
      </Card>

      <Card id="realtime">
        <Bot className="mx-auto mb-6 h-10 w-10 text-indigo-500" />
        <h3 className="text-5xl font-bold">AI That Reviews With You</h3>
        <p className="mx-auto mt-8 max-w-3xl text-xl text-slate-300">
          Integrate GPT‑4 or Claude to automatically suggest improvements,
          explain diffs, and catch issues before humans do.
        </p>
      </Card>

      <Card id="ai">
        <div className="mx-auto max-w-6xl px-12 text-center">
          <BarChart3 className="mx-auto mb-6 h-10 w-10 text-indigo-500" />
          <h3 className="text-5xl font-bold">Review Analytics That Matter</h3>
          <p className="mx-auto mt-8 max-w-3xl text-xl text-slate-300">
            Measure review latency, engagement, approval rates, and continuously
            improve your engineering velocity.
          </p>
        </div>
      </Card>

      <Card id="analytics">
        <ShieldCheck className="mx-auto mb-6 h-10 w-10 text-indigo-500" />
        <h3 className="text-5xl font-bold">Built for Security & Scale</h3>
        <p className="mx-auto mt-8 max-w-3xl text-xl text-slate-300">
          Enterprise‑grade authentication, audit logs, role‑based access
          control, and scalable real‑time infrastructure.
        </p>
      </Card>

      <Card>
        <h3 className="text-5xl font-extrabold">
          Upgrade Your Code Review Culture
        </h3>
        <p className="mx-auto mt-8 max-w-2xl text-xl text-indigo-100">
          Move beyond static pull requests. Collaborate, analyze, and ship
          better code—faster.
        </p>
        <button
          onClick={() => {
            navigate("/login");
          }}
          className="mt-12 rounded-2xl bg-black px-10 py-4 text-lg font-semibold hover:bg-slate-900"
        >
          Get Started Now
        </button>
      </Card>

      <footer className="border-t border-slate-800 px-12 py-10 text-center text-sm text-slate-400">
        © {new Date().getFullYear()} CodeSync · Real‑Time Collaborative Code
        Reviews
      </footer>
    </div>
  );
}
