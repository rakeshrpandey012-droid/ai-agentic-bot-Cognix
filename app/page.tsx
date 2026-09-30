'use client';
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Sparkles, ArrowRight, Bot, CalendarClock, Blocks, CircleCheck, Zap, Play } from "lucide-react";
import Image from "next/image";

export default function Home() {
  const { isSignedIn } = useUser();

  return (
    <main className="min-h-screen overflow-hidden bg-[#fbfaf7] text-slate-950">
      <section className="relative min-h-screen border-b border-slate-200 bg-[linear-gradient(180deg,#fffdf8_0%,#eef8f4_44%,#f7f3ff_100%)]">
        <div className="absolute inset-0 opacity-[0.24] [background-image:linear-gradient(#0f172a_1px,transparent_1px),linear-gradient(90deg,#0f172a_1px,transparent_1px)] [background-size:42px_42px]"></div>
        <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col px-5 md:px-8">
          <header className="flex h-20 items-center justify-between gap-4">
            <Link className="flex min-w-0 items-center gap-3" href="/">
              <Image src="/logo.svg" alt="CognixAi logo" width={42} height={42} />
              <span className="truncate text-lg font-semibold tracking-normal">CognixAi</span>
            </Link>
            <nav className="hidden items-center gap-7 text-sm font-medium text-slate-600 md:flex">
              <Link href="#agents" className="transition-colors hover:text-slate-950">Agents</Link>
              <Link href="#workflow" className="transition-colors hover:text-slate-950">Workflow</Link>
              <Link href="#integrations" className="transition-colors hover:text-slate-950">Integrations</Link>
            </nav>
            <div className="flex items-center gap-2">
              {!isSignedIn ? (
                <>
                  <Link className="hidden h-9 items-center justify-center rounded-lg px-3 text-sm font-medium text-slate-700 transition-colors hover:bg-white/70 sm:inline-flex" href="/sign-in">Sign in</Link>
                  <Link className="inline-flex h-9 items-center justify-center gap-2 rounded-lg bg-slate-950 px-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-slate-800" href="/sign-up">
                    Start free <ArrowRight className="size-4" />
                  </Link>
                </>
              ) : (
                <Link className="inline-flex h-9 items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 text-sm font-medium text-white shadow-sm transition-colors hover:bg-emerald-700" href="/dashboard">
                  Dashboard <ArrowRight className="size-4" />
                </Link>
              )}
              <UserButton />
            </div>
          </header>

          <div className="grid flex-1 items-center gap-10 py-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(460px,1.08fr)] lg:py-12">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/75 px-3 py-1 text-sm font-medium text-emerald-800 shadow-sm">
                <Sparkles className="size-4" />
                Agentic automation for everyday operations
              </div>
              <h1 className="mt-6 max-w-4xl text-5xl font-bold leading-[1.02] tracking-normal text-slate-950 md:text-7xl">
                CognixAi keeps your agents moving while you work.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-slate-700 md:text-lg">
                Create AI agents that use tools, follow schedules, run repeatable tasks, and report back with the signal your team needs.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                {!isSignedIn ? (
                  <>
                    <Link className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-slate-950 px-5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-slate-800" href="/sign-up">
                      Create your first agent <ArrowRight className="size-4" />
                    </Link>
                    <Link className="inline-flex h-11 items-center justify-center rounded-lg border border-slate-300 bg-white/75 px-5 text-sm font-semibold text-slate-800 shadow-sm transition-colors hover:bg-white" href="/sign-in">
                      Sign in
                    </Link>
                  </>
                ) : (
                  <Link className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-slate-950 px-5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-slate-800" href="/dashboard/agents">
                    Create an agent <ArrowRight className="size-4" />
                  </Link>
                )}
              </div>
              <div className="mt-9 grid max-w-xl grid-cols-3 gap-3 text-sm">
                <div className="rounded-xl border border-white/80 bg-white/65 p-3 shadow-sm">
                  <p className="text-2xl font-bold leading-none tracking-normal text-slate-950">3x</p>
                  <p className="mt-2 text-xs font-medium leading-4 text-slate-600">faster handoffs</p>
                </div>
                <div className="rounded-xl border border-white/80 bg-white/65 p-3 shadow-sm">
                  <p className="text-2xl font-bold leading-none tracking-normal text-slate-950">24/7</p>
                  <p className="mt-2 text-xs font-medium leading-4 text-slate-600">scheduled runs</p>
                </div>
                <div className="rounded-xl border border-white/80 bg-white/65 p-3 shadow-sm">
                  <p className="text-2xl font-bold leading-none tracking-normal text-slate-950">100</p>
                  <p className="mt-2 text-xs font-medium leading-4 text-slate-600">starter credits</p>
                </div>
              </div>
            </div>

            <div className="relative" id="agents">
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-300/50">
                <div className="flex items-center justify-between border-b border-slate-200 bg-slate-950 px-4 py-3 text-white">
                  <div className="flex items-center gap-2">
                    <Image src="/logo.svg" alt="" width={28} height={28} />
                    <span className="text-sm font-semibold">Agent command</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <span className="size-2 rounded-full bg-emerald-400"></span>Live
                  </div>
                </div>
                <div className="grid gap-0 md:grid-cols-[190px_minmax(0,1fr)]">
                  <aside className="hidden border-r border-slate-200 bg-slate-50 p-4 md:block">
                    <div className="mb-2 flex h-10 items-center gap-3 rounded-lg px-3 text-sm font-medium text-slate-600">
                      <span className="size-2 rounded-full bg-sky-500"></span>Dashboard
                    </div>
                    <div className="mb-2 flex h-10 items-center gap-3 rounded-lg px-3 text-sm font-medium bg-white text-slate-950 shadow-sm">
                      <span className="size-2 rounded-full bg-emerald-500"></span>Agents
                    </div>
                  </aside>
                  <div className="min-w-0 p-4 md:p-5">
                    <div className="flex flex-col gap-3 border-b border-slate-200 pb-5 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm font-medium text-slate-500">Today&apos;s briefing</p>
                        <h2 className="mt-1 text-2xl font-bold tracking-normal">3 agents ready to run</h2>
                      </div>
                      <button className="inline-flex h-9 w-fit items-center justify-center gap-2 rounded-lg bg-slate-950 px-3 text-sm font-medium text-white">
                        <Play className="size-4" /> Run now
                      </button>
                    </div>
                    
                    <div className="mt-5 space-y-3">
                      <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                        <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-slate-100">
                          <Bot className="size-5 text-slate-800" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="truncate text-sm font-semibold">Inbox Scout</h3>
                          <p className="truncate text-sm text-slate-500">Summarize investor replies</p>
                        </div>
                        <span className="rounded-full px-2.5 py-1 text-xs font-semibold bg-sky-100 text-sky-800">Running</span>
                      </div>
                      <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                        <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-slate-100">
                          <Bot className="size-5 text-slate-800" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="truncate text-sm font-semibold">Pipeline Minder</h3>
                          <p className="truncate text-sm text-slate-500">Sync warm leads to CRM</p>
                        </div>
                        <span className="rounded-full px-2.5 py-1 text-xs font-semibold bg-violet-100 text-violet-800">Scheduled</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="workflow" className="mx-auto grid w-full max-w-7xl gap-5 px-5 py-16 md:grid-cols-3 md:px-8">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-5 flex size-11 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
            <Bot className="size-5" />
          </div>
          <h2 className="text-lg font-semibold tracking-normal">Build focused agents</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">Give every agent a goal, tools, instructions, and the exact output format your workflow expects.</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-5 flex size-11 items-center justify-center rounded-lg bg-sky-50 text-sky-700">
            <CalendarClock className="size-5" />
          </div>
          <h2 className="text-lg font-semibold tracking-normal">Schedule real work</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">Run agents once, daily, weekly, or on the cadence that keeps your team moving without manual check-ins.</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-5 flex size-11 items-center justify-center rounded-lg bg-amber-50 text-amber-700">
            <Blocks className="size-5" />
          </div>
          <h2 className="text-lg font-semibold tracking-normal">Connect your stack</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">Wire agents into integrations so they can read, write, and execute tasks across the tools you already use.</p>
        </div>
      </section>
    </main>
  );
}