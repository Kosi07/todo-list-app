import { ArrowRight, Camera, Check, Clock, Flame, Heart, Lock, Users } from "lucide-react";
import { IMAGES } from "@/lib/images";
import Link from "next/link";

const STEPS = [
  { icon: Users, title: "Make a small promise", body: "Pick one thing you’ll do today and tell your partner. Nothing grand. Just something real." },
  { icon: Camera, title: "Show your proof", body: "Finish it, snap a photo and send it over. No honor system, no guessing." },
  { icon: Check, title: "Get the approval", body: "Your partner looks at the photo and approves it or asks for a redo. Then it counts." },
];

function Logo() {
  return (
    <div className="flex items-center gap-2.5">
      <svg width="34" height="28" viewBox="0 0 34 28" fill="none" aria-hidden>
        <ellipse cx="11" cy="14" rx="9" ry="11.5" stroke="#262521" strokeWidth="2.4" />
        <ellipse cx="22" cy="14" rx="9" ry="11.5" stroke="#C4562F" strokeWidth="2.4" />
      </svg>
      <span className="font-display text-xl font-bold tracking-tight">Tandem</span>
    </div>
  );
}

function Cta({ children = "Start with your partner", className = "" }) {
  return (
    <a href="#" className={`inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-ink px-7 font-display font-semibold text-white transition hover:bg-black active:scale-[.98] ${className}`}>
      {children} <ArrowRight className="h-4 w-4" />
    </a>
  );
}

/* Static miniature of the app, used in the hero */
function AppPreview() {
  return (
    <div className="relative mx-auto w-full max-w-sm">
      <div className="rounded-[2rem] border border-line bg-card/90 p-4 shadow-[0_30px_60px_-30px_rgba(38,37,33,.35)] sm:p-5">
        <div className="flex items-center justify-center gap-3 rounded-3xl border border-line bg-card px-3 py-5">
          {[["Alex", IMAGES.alex, "#C4562F"], ["Maya", IMAGES.maya, "#6A50B0"]].map(([n, src, c], i) => (
            <div key={n} className="flex items-center gap-3">
              {i === 1 && (
                <span className="grid h-8 w-8 place-items-center rounded-full border border-clay/20 bg-clay-soft">
                  <Heart className="h-3.5 w-3.5 fill-clay text-clay" />
                </span>
              )}
              <div className="flex flex-col items-center gap-1.5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt={`${n}'s photo`} className="h-14 w-14 rounded-full object-cover ring-[3px] ring-offset-2 ring-offset-card" style={{ "--tw-ring-color": c }} />
                <span className="font-display text-sm font-bold">{n}</span>
              </div>
            </div>
          ))}
        </div>

        <ul className="mt-4 space-y-3">
          <li className="flex items-center gap-3.5 rounded-[1.2rem] border border-line bg-card p-3.5">
            <span className="h-6 w-6 shrink-0 rounded-full border-2 border-[#B9B4AA]" />
            <div className="min-w-0 flex-1">
              <p className="font-display text-[15px] font-semibold leading-snug">Finish the landing page outline</p>
              <p className="mt-0.5 flex items-center gap-1.5 text-xs text-muted"><Clock className="h-3.5 w-3.5" /> Today, 6:00 PM</p>
            </div>
          </li>
          <li className="flex items-center gap-3.5 rounded-[1.2rem] border border-plum-line bg-plum-soft p-3.5">
            <svg viewBox="0 0 24 24" className="h-6 w-6 shrink-0 motion-safe:animate-spin text-plum" fill="none" aria-hidden>
              <circle cx="12" cy="12" r="9.5" stroke="#DDD5F2" strokeWidth="2.5" />
              <path d="M12 2.5a9.5 9.5 0 0 1 9.5 9.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
            <div className="min-w-0 flex-1">
              <p className="font-display text-[15px] font-semibold leading-snug">Reset the home office</p>
              <p className="mt-0.5 text-xs font-semibold text-plum">Waiting for Maya’s approval</p>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={IMAGES.office} alt="" className="h-11 w-11 rounded-xl object-cover" />
          </li>
          <li className="flex items-center gap-3.5 rounded-[1.2rem] border border-moss-line bg-moss-soft/60 p-3.5">
            <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-moss text-white"><Check className="h-3.5 w-3.5" strokeWidth={3} /></span>
            <div className="min-w-0 flex-1">
              <p className="font-display text-[15px] font-semibold leading-snug text-muted line-through decoration-[#B9B4AA]">Morning run — 5 kilometers</p>
              <p className="mt-0.5 flex items-center gap-1 text-xs font-semibold text-moss"><Check className="h-3.5 w-3.5" strokeWidth={2.5} /> Approved</p>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={IMAGES.run} alt="" className="h-11 w-11 rounded-xl object-cover" />
          </li>
        </ul>
      </div>
      <div className="absolute -right-2 -top-4 flex items-center gap-2 rounded-full border border-line bg-card px-3.5 py-2 text-sm font-semibold text-muted shadow-sm sm:-right-6">
        <Flame className="h-4 w-4 text-clay" /> 7 day streak
      </div>
    </div>
  );
}

export default function Landing() {
  return (
    <div className="relative overflow-x-clip bg-paper text-ink">
      <div aria-hidden className="pointer-events-none absolute -left-40 top-64 -z-0 h-96 w-96 rounded-full bg-[#F0E6D8]/70 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -right-48 top-[44rem] -z-0 h-[28rem] w-[28rem] rounded-full bg-[#E9E4F2]/70 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-5xl px-5 sm:px-8">
        <header className="flex items-center justify-between py-6 sm:py-8">
          <Logo />
          <Link href="/sign-in" className="rounded-full border border-line bg-card px-4 py-2 text-sm font-semibold text-muted hover:text-ink">Sign in</Link>
        </header>

        {/* hero */}
        <section className="grid items-center gap-14 pb-20 pt-8 sm:pt-14 lg:grid-cols-[1.1fr_.9fr] lg:gap-10 lg:pb-28">
          <div>
            <p className="text-sm text-muted">For two people who want to follow through</p>
            <h1 className="mt-3 font-display text-[2.9rem] font-extrabold leading-[1.02] tracking-tight sm:text-7xl">Keep each other moving.</h1>
            <p className="mt-5 max-w-md text-lg text-muted">Small promises. Shared progress. A private space where you and one other person show up for each other, with proof.</p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Cta />
              <span className="text-sm text-muted">No feeds, no strangers.</span>
            </div>
          </div>
          <AppPreview />
        </section>

        {/* how it works */}
        <section aria-labelledby="how" className="pb-20 lg:pb-28">
          <p className="text-sm text-muted">How it works</p>
          <h2 id="how" className="mt-1 font-display text-3xl font-bold tracking-tight sm:text-4xl">Three small steps. One finished loop.</h2>
          <ol className="mt-8 grid gap-4 sm:grid-cols-3">
            {STEPS.map(({ icon: Icon, title, body }, i) => (
              <li key={title} className="rounded-[1.6rem] border border-line bg-card p-6">
                <div className="flex items-center justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-clay-soft text-clay"><Icon className="h-5 w-5" /></span>
                  <span className="font-display text-sm font-bold text-[#B9B4AA]">0{i + 1}</span>
                </div>
                <h3 className="mt-5 font-display text-xl font-bold leading-snug">{title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{body}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* why */}
        <section className="grid gap-4 pb-20 sm:grid-cols-2 lg:pb-28">
          <div className="rounded-[1.8rem] border border-plum-line bg-plum-soft p-7 sm:p-9">
            <p className="text-sm font-semibold text-plum">Mutual by design</p>
            <h3 className="mt-2 font-display text-2xl font-bold leading-snug sm:text-3xl">Nothing counts until the other person says so.</h3>
            <p className="mt-3 text-muted">A submitted task stays pending, with a quiet spinner, until your partner approves it or asks for a redo. Approval is the reward.</p>
          </div>
          <div className="rounded-[1.8rem] border border-moss-line bg-moss-soft/60 p-7 sm:p-9">
            <p className="flex items-center gap-1.5 text-sm font-semibold text-moss"><Lock className="h-4 w-4" /> Private, just the two of you</p>
            <h3 className="mt-2 font-display text-2xl font-bold leading-snug sm:text-3xl">Not a project-management tool. A partnership.</h3>
            <p className="mt-3 text-muted">No boards, no charts, no audience. Just your promises, your proof, and the streak you build together.</p>
          </div>
        </section>

        {/* final cta */}
        <section className="pb-16">
          <div className="rounded-[2rem] border border-line bg-card/90 px-6 py-12 text-center shadow-[0_10px_30px_-18px_rgba(38,37,33,.25)] sm:py-16">
            <h2 className="mx-auto max-w-xl font-display text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl">Who’s your person?</h2>
            <p className="mx-auto mt-3 max-w-md text-muted">Invite them, make your first promise today and see how it feels to be approved.</p>
            <Cta className="mt-8" />
          </div>
        </section>

        <footer className="flex flex-col items-center justify-between gap-3 border-t border-line py-8 text-sm text-muted sm:flex-row">
          <Logo />
          <p>© {new Date().getFullYear()} Tandem. Small promises, kept.</p>
        </footer>
      </div>
    </div>
  );
}
