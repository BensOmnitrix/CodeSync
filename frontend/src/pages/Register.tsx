import { motion } from "framer-motion";
import { Github, Mail, Lock, User, Code2, Users, Bot } from "lucide-react";
import { Feature } from "../components/login-feature";
import { Input } from "../components/input";
import { useEffect, useState } from "react";
import { usernameCheck } from "../services/username-check-service";
import { register } from "../services/auth-service";
import { replace, useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isUsernameAvailable, setIsUsernameAvailable] = useState<
    boolean | null
  >(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [formError, setFormError] = useState("");

  const validatePassword = (password: string): string => {
    if (!password) return "Password cannot be empty";
    if (password.length < 8)
      return "Password must be at least 8 characters long";
    if (!/[A-Z]/.test(password))
      return "Password must contain at least one uppercase letter";
    if (!/[0-9]/.test(password))
      return "Password must contain at least one number";
    if (!/[!@#$%^&*(),.?\":{}|<>]/.test(password))
      return "Password must contain at least one special character";
    return "";
  };

  useEffect(() => {
    if (!username || username.length < 2) {
      setIsUsernameAvailable(null);
      setIsCheckingUsername(false);
      return;
    }

    setIsCheckingUsername(true);
    const timer = setTimeout(async () => {
      try {
        const available = await usernameCheck(username);
        setIsUsernameAvailable(available);
      } catch {
        setIsUsernameAvailable(null);
      } finally {
        setIsCheckingUsername(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [username]);

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

              <Input
                type="text"
                placeholder="Username"
                value={username}
                onchange={(e) => {
                  setUsername(e.target.value);
                  setUsernameError("");
                }}
              />

              {usernameError && (
                <p className="mt-1 text-xs text-red-500">{usernameError}</p>
              )}

              {isCheckingUsername && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-400 border-t-indigo-500" />
                </div>
              )}

              {!isCheckingUsername && isUsernameAvailable ? (
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              ) : null}

              {!isCheckingUsername && isUsernameAvailable === false ? (
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-red-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
              ) : null}
            </div>

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
                  const value = e.target.value;
                  setPassword(value);
                  setPasswordError(validatePassword(value));
                }}
              />
              {passwordError && (
                <p className="mt-1 text-xs text-red-500">{passwordError}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              onClick={async (e) => {
                e.preventDefault();

                setFormError("");
                let valid = true;

                if (!username) {
                  setUsernameError("Username cannot be empty");
                  valid = false;
                }

                if (!email) {
                  setEmailError("Email cannot be empty");
                  valid = false;
                }

                const pwdError = validatePassword(password);
                if (pwdError) {
                  setPasswordError(pwdError);
                  valid = false;
                }

                if (!valid) return;

                setIsSubmitting(true);

                try {
                  const res = await register({ username, email, password });
                  if (res?.token) {
                    navigate("/dashboard", { replace: true });
                  }
                } catch (err: any) {
                  setFormError(
                    err?.response?.data?.error ||
                      "Registration failed. Please try again."
                  );
                } finally {
                  setIsSubmitting(false);
                }
              }}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-gray-200 hover:bg-indigo-500 disabled:opacity-70"
            >
              {isSubmitting ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Creating account...
                </>
              ) : (
                "Create account"
              )}
            </button>
            {formError && (
              <p className="mt-3 text-center text-sm text-red-500">
                {formError}
              </p>
            )}
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
