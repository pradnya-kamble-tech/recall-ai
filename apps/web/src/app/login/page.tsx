"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, ArrowRight, Loader2 } from "lucide-react";
import {
    GlassPanel,
    Input,
    Button,
    RecallOrb,
    ErrorState,
} from "@recallai/ui";
import { useAuthStore } from "@/stores/useAuthStore";

export default function LoginPage() {
    const router = useRouter();
    const login = useAuthStore((state) => state.login);

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            // NOTE: In Phase 2, this calls FastAPI /auth/login.
            // Using a simulated local network delay to match scope requests.
            const response = await fetch("http://127.0.0.1:8000/api/v1/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams({ username: email, password }),
            });

            if (!response.ok) {
                const data = await response.json().catch(() => ({}));
                throw new Error(data.detail || "Invalid email or password");
            }

            const data = await response.json();

            // Set cookie for Next.js Middleware route protection
            document.cookie = `auth-token=${data.access_token}; path=/; max-age=86400; SameSite=Lax`;

            // Fetch real user object
            const meResponse = await fetch("http://127.0.0.1:8000/api/v1/auth/me", {
                headers: {
                    Authorization: `Bearer ${data.access_token}`
                }
            });

            if (!meResponse.ok) {
                throw new Error("Failed to fetch user profile after login");
            }

            const user = await meResponse.json();

            // Update client session
            login(user, data.access_token);

            router.push("/dashboard");
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-12 sm:px-6 lg:px-8">
            {/* Background elements */}
            <div className="pointer-events-none absolute inset-0 z-0 flex justify-center">
                <div className="absolute top-1/4 h-[400px] w-[600px] -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,_oklch(0.65_0.2_265_/_15%)_0%,_transparent_70%)] blur-[80px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="relative z-10 w-full max-w-md"
            >
                <div className="flex flex-col items-center mb-8">
                    <RecallOrb size="lg" status={isLoading ? "thinking" : "idle"} />
                    <h2 className="mt-6 text-2xl font-bold tracking-tight text-foreground">
                        Welcome back
                    </h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Enter your credentials to access your memory space
                    </p>
                </div>

                <GlassPanel className="p-6 sm:p-8 rounded-2xl border-white/[0.06] shadow-xl">
                    <AnimatePresence>
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                                animate={{ opacity: 1, height: "auto", marginBottom: 16 }}
                                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                                className="overflow-hidden"
                            >
                                <ErrorState
                                    title="Authentication Failed"
                                    description={error}
                                    onRetry={() => setError(null)}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <form onSubmit={handleLogin} className="space-y-5">
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                Email
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="name@company.com"
                                    className="pl-10 bg-black/40 border-white/[0.06] focus:border-primary/50"
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <div className="flex items-center justify-between">
                                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                    Password
                                </label>
                                <Link
                                    href="/forgot-password"
                                    className="text-xs font-medium text-primary hover:text-primary/80 transition-colors"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="pl-10 bg-black/40 border-white/[0.06] focus:border-primary/50"
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full flex items-center justify-center gap-2 group mt-2"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                <>
                                    Sign In <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                                </>
                            )}
                        </Button>
                    </form>
                </GlassPanel>

                <p className="mt-8 text-center text-sm text-muted-foreground">
                    Don&apos;t have an account?{" "}
                    <Link
                        href="/register"
                        className="font-medium text-foreground hover:text-primary transition-colors"
                    >
                        Create an account
                    </Link>
                </p>
            </motion.div>
        </div>
    );
}
