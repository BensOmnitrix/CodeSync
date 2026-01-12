import { motion } from "framer-motion";
import { Github, Mail, Lock, Code2, Users, Bot } from "lucide-react";
import { Feature } from "../components/login-feature";
import { Input } from "../components/input";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { login } from "../services/auth-service";

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-black flex items-center justify-center">
      <div className="mx-6 grid w-full max-w-6xl grid-cols-1 overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/70 shadow-2xl backdrop-blur md:mx-10 lg:mx-16 lg:grid-cols-2">
        <div className="relative hidden flex-col justify-between p-12 text-slate-100 lg:flex">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(129,140,248,0.35),transparent_65%)]" />

          <div>
            <h1 className="text-5xl font-extrabold leading-tight text-white">
              Real-Time Collaborative
              <br />
              Code Reviews
            </h1>
          </div>

          <div className="space-y-15">
            <Feature
              icon={<Code2 />}
              title="Advanced Diff Viewer"
              description="Syntax-highlighted diffs with inline comments, threaded discussions, and contextual file insights."
            />
            <Feature
              icon={<Users />}
              title="Real-Time Collaboration"
              description="Live cursors, presence indicators, and collaborative commenting powered by WebSockets."
            />
            <Feature
              icon={<Bot />}
              title="AI-Powered Code Intelligence"
              description="LLM-driven suggestions, refactors, and explanations using GPT-4 or Claude."
            />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col justify-center p-10 md:p-14"
        >
          <div className="mb-10">
            <h2 className="text-3xl font-extrabold text-gray-200">
              Welcome back
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              Sign in to continue reviewing code in real time
            </p>
          </div>

          <button className="mb-6 flex items-center text-gray-200 justify-center gap-3 rounded-xl border border-slate-700 bg-slate-800 py-3 text-sm font-medium hover:bg-slate-700">
            <Github className="h-5 w-5" />
            Continue with GitHub
          </button>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-700" />
            <span className="text-xs text-slate-400">OR</span>
            <div className="h-px flex-1 bg-slate-700" />
          </div>

          <form className="space-y-5">
            <div className="relative">
              <Mail className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
              <Input
                type="email"
                placeholder="Email address"
                onchange={(e) => {
                  setEmail(e.target.value);
                  setEmailError("");
                }}
              />
              {emailError && (
                <p className="mt-1 text-xs text-red-500">{emailError}</p>
              )}
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
              <Input
                type="password"
                placeholder="Password"
                onchange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError("");
                }}
              />
              {passwordError && (
                <p className="mt-1 text-xs text-red-500">{passwordError}</p>
              )}
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-slate-400">
                <input
                  type="checkbox"
                  className="accent-indigo-500"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                Remember me
              </label>
              <a href="#" className="text-indigo-400 hover:underline">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              onClick={async (e) => {
                e.preventDefault();
                setFormError("");

                let valid = true;
                if (!email) {
                  setEmailError("Email is required");
                  valid = false;
                }

                if (!password) {
                  setPasswordError("Password is required");
                  valid = false;
                }

                if (!valid) return;

                setIsSubmitting(true);

                try {
                  await login({ email, password }, rememberMe);

                  navigate("/dashboard");
                } catch (err: any) {
                  setFormError("Invalid email or password");
                } finally {
                  setIsSubmitting(false);
                }
              }}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-gray-200 hover:bg-indigo-500 disabled:opacity-70"
            >
              {isSubmitting ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Logging in...
                </>
              ) : (
                "Login"
              )}
              {formError && (
                <p className="mt-3 text-center text-sm text-red-500">
                  {formError}
                </p>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-400">
            Don’t have an account?{" "}
            <a href="/register" className="text-indigo-400 hover:underline">
              Create one
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
