"use client";

// Save as components/AppShell.jsx
// Desktop (lg+): sticky left sidebar. Mobile: fixed bottom tab bar.
// Also exports the Notifications, History and Settings views.

import { Bell, Check, Flame, History, Home, SlidersHorizontal } from "lucide-react";
import { IMAGES } from "@/lib/images";

const NAV = [
  { id: "home", label: "Dashboard", short: "Home", icon: Home },
  { id: "notifications", label: "Notifications", short: "Alerts", icon: Bell },
  { id: "history", label: "History", short: "History", icon: History },
  { id: "settings", label: "Settings", short: "Settings", icon: SlidersHorizontal },
];

function Badge({ n, className = "" }) {
  if (!n) return null;
  return <span className={`grid h-5 min-w-5 place-items-center rounded-full bg-clay px-1.5 text-[11px] font-bold text-white ${className}`}>{n}</span>;
}

export default function Navigation({ view, setView, unread = 0, streak = 7, together = 12, children }) {
  return (
    <div className="lg:flex">
      {/* Desktop sidebar */}
      <aside aria-label="Sidebar" className="sticky top-0 hidden h-dvh w-72 shrink-0 flex-col border-r border-line bg-card/50 p-5 lg:flex">
        <div className="flex items-center gap-2.5 px-2">
          <svg width="34" height="28" viewBox="0 0 34 28" fill="none" aria-hidden>
            <ellipse cx="11" cy="14" rx="9" ry="11.5" stroke="#262521" strokeWidth="2.4" />
            <ellipse cx="22" cy="14" rx="9" ry="11.5" stroke="#C4562F" strokeWidth="2.4" />
          </svg>
          <span className="font-display text-xl font-bold tracking-tight">Tandem</span>
        </div>

        <nav aria-label="Main" className="mt-8 flex flex-col gap-1.5">
          {NAV.map(({ id, label, icon: Icon }) => {
            const active = view === id;
            return (
              <button key={id} onClick={() => setView(id)} aria-current={active ? "page" : undefined}
                className={`flex h-12 items-center gap-3 rounded-2xl px-4 font-display font-semibold transition ${active ? "bg-card text-ink shadow-sm" : "text-muted hover:bg-black/4 hover:text-ink"}`}>
                <Icon className="h-5 w-5" /> {label}
                {id === "notifications" && <Badge n={unread} className="ml-auto" />}
              </button>
            );
          })}
        </nav>

        <div className="mt-auto space-y-3">
          <div className="flex items-center gap-2 rounded-2xl border border-line bg-card px-4 py-3 text-sm font-semibold text-muted">
            <Flame className="h-4 w-4 text-clay" /> {streak} day streak
            <span className="ml-auto text-xs font-medium">{together} promises</span>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-line bg-card p-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={IMAGES.maya} alt="" className="h-10 w-10 rounded-full object-cover ring-2 ring-plum" />
            <div className="min-w-0">
              <p className="font-display text-sm font-bold leading-tight">Maya</p>
              <p className="flex items-center gap-1.5 text-xs text-muted"><span className="h-2 w-2 rounded-full bg-moss" /> Your partner · online</p>
            </div>
          </div>
          <div className="flex items-center gap-3 px-1 pt-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={IMAGES.alex} alt="" className="h-9 w-9 rounded-full object-cover ring-2 ring-clay" />
            <p className="text-sm font-semibold">Alex <span className="font-normal text-muted">· You</span></p>
          </div>
        </div>
      </aside>

      <div className="min-w-0 flex-1">{children}</div>

      {/* Mobile bottom tab bar */}
      <nav aria-label="Main" className="fixed inset-x-0 bottom-0 z-30 flex border-t border-line bg-card/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden">
        {NAV.map(({ id, short, icon: Icon }) => {
          const active = view === id;
          return (
            <button key={id} onClick={() => setView(id)} aria-current={active ? "page" : undefined}
              className={`relative flex flex-1 flex-col items-center gap-1 py-2.5 text-[11px] font-semibold ${active ? "text-ink" : "text-muted"}`}>
              {active && <span className="absolute top-0 h-0.5 w-8 rounded-full bg-clay" />}
              <Icon className="h-6 w-6" strokeWidth={active ? 2.4 : 1.8} />
              {short}
              {id === "notifications" && <Badge n={unread} className="absolute left-1/2 top-1.5 ml-1.5" />}
            </button>
          );
        })}
      </nav>
    </div>
  );
}

/* ───────── Views ───────── */

export function NotificationsView({ notifs, onOpen, onReadAll }) {
  const unread = notifs.filter((n) => n.unread).length;
  return (
    <section className="mt-8 sm:mt-12">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-sm text-muted">{unread ? `${unread} unread` : "All caught up"}</p>
          <h1 className="font-display text-4xl font-extrabold tracking-tight">Notifications</h1>
        </div>
        {unread > 0 && <button onClick={onReadAll} className="pb-1.5 text-sm font-semibold text-plum hover:underline">Mark all read</button>}
      </div>
      <ul className="mt-6 space-y-3">
        {notifs.map((n) => (
          <li key={n.id}>
            <button onClick={() => onOpen(n)}
              className={`flex w-full items-start gap-3.5 rounded-[1.4rem] border p-4 text-left transition hover:border-[#CFCABF] ${n.unread ? "border-plum-line bg-plum-soft" : "border-line bg-card"}`}>
              {n.from === "maya" ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={IMAGES.maya} alt="" className="h-10 w-10 shrink-0 rounded-full object-cover" />
              ) : (
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-clay-soft text-clay"><Flame className="h-5 w-5" /></span>
              )}
              <div className="min-w-0 flex-1">
                <p className={`text-[15px] leading-snug ${n.unread ? "font-semibold" : ""}`}>{n.text}</p>
                <p className="mt-1 text-xs text-muted">{n.time}</p>
              </div>
              {n.unread && <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-plum" />}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function HistoryView({ tasks, together, onOpen, people }) {
  const done = tasks.filter((t) => t.status === "approved");
  return (
    <section className="mt-8 sm:mt-12">
      <p className="text-sm text-muted">{together} promises together</p>
      <h1 className="font-display text-4xl font-extrabold tracking-tight">History</h1>
      <ul className="mt-6 space-y-3.5">
        {done.map((t) => (
          <li key={t.id} className="flex items-center gap-4 rounded-[1.4rem] border border-moss-line bg-moss-soft/60 p-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={people[t.owner].avatar} alt="" className="h-9 w-9 shrink-0 rounded-full object-cover" />
            <div className="min-w-0 flex-1">
              <p className="font-display font-semibold leading-snug">{t.title}</p>
              <p className="mt-0.5 flex items-center gap-1.5 text-sm font-semibold text-moss"><Check className="h-4 w-4" strokeWidth={2.5} /> Approved · {people[t.owner].name}</p>
            </div>
            <button onClick={() => onOpen(t)} aria-label={`View proof for ${t.title}`} className="h-14 w-14 shrink-0 overflow-hidden rounded-2xl border border-black/5 shadow-sm active:scale-95">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={t.proof} alt="" className="h-full w-full object-cover" />
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Switch({ label, hint, on, onChange }) {
  return (
    <div className="flex items-center justify-between gap-4 py-4">
      <div><p className="font-semibold">{label}</p><p className="text-sm text-muted">{hint}</p></div>
      <button role="switch" aria-checked={on} aria-label={label} onClick={onChange}
        className={`relative h-7 w-12 shrink-0 rounded-full transition ${on ? "bg-moss" : "bg-[#CFCABF]"}`}>
        <span className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition-all ${on ? "left-5.5" : "left-0.5"}`} />
      </button>
    </div>
  );
}

export function SettingsView({ prefs, setPrefs, onUnpair }) {
  const flip = (k) => setPrefs((p) => ({ ...p, [k]: !p[k] }));
  return (
    <section className="mt-8 sm:mt-12">
      <p className="text-sm text-muted">Your account</p>
      <h1 className="font-display text-4xl font-extrabold tracking-tight">Settings</h1>
      <div className="mt-6 flex items-center gap-4 rounded-[1.6rem] border border-line bg-card p-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={IMAGES.alex} alt="" className="h-14 w-14 rounded-full object-cover ring-2 ring-clay" />
        <div><p className="font-display text-lg font-bold">Alex</p><p className="text-sm text-muted">Paired with Maya</p></div>
      </div>
      <div className="mt-4 divide-y divide-line rounded-[1.6rem] border border-line bg-card px-5">
        <Switch label="Push notifications" hint="Approvals, redo requests and reactions" on={prefs.push} onChange={() => flip("push")} />
        <Switch label="Daily reminder" hint="A nudge at 9:00 AM about today’s promises" on={prefs.daily} onChange={() => flip("daily")} />
        <Switch label="Reaction alerts" hint="When Maya reacts to your tasks" on={prefs.reactions} onChange={() => flip("reactions")} />
      </div>
      <button onClick={onUnpair} className="mt-4 h-12 w-full rounded-2xl border border-clay/25 bg-clay-soft font-semibold text-clay">Unpair from Maya</button>
    </section>
  );
}