"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { IMAGES } from "@/lib/images";
import {
  Check, CheckCheck, Clock, Heart, ImagePlus, ImageIcon, Camera, RotateCcw, X, Flame, TriangleAlert, Info,
  SmilePlus,
} from "lucide-react";

/* ───────────── data ───────────── */

const PEOPLE = {
  you: { id: "you", name: "Alex", tag: "You", avatar: IMAGES.alex, accent: "#C4562F", text: "text-clay", soft: "bg-clay-soft" },
  maya: { id: "maya", name: "Maya", tag: "Partner", avatar: IMAGES.maya, accent: "#6A50B0", text: "text-plum", soft: "bg-plum-soft" },
};
const other = (id) => (id === "you" ? "maya" : "you");

const SEED = [
  { id: 1, owner: "you", title: "Finish the landing page outline", due: "Today, 6:00 PM", status: "todo" },
  { id: 2, owner: "you", title: "Reset and organize the home office", status: "pending", proof: IMAGES.office, minsAgo: 24 },
  { id: 3, owner: "you", title: "Morning run — 5 kilometers", status: "approved", proof: IMAGES.run, reactions: [{ by: "maya", emoji: "🔥" }] },  { id: 4, owner: "maya", title: "Call the dentist to reschedule", due: "Today, 5:00 PM", status: "todo" },
  { id: 5, owner: "maya", title: "Meal prep for the week", status: "pending", proof: IMAGES.meal, minsAgo: 8 },
  { id: 6, owner: "maya", title: "Read 30 pages before bed", status: "approved", proof: IMAGES.books },
];

/* ───────────── small pieces ───────────── */

function Ring({ pct, color, size = 76, stroke = 3.5, children }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="absolute inset-0 -rotate-90" aria-hidden>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#E6E2DA" strokeWidth={stroke} />
        <circle
          cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round"
          strokeDasharray={c} strokeDashoffset={c * (1 - pct / 100)}
          style={{ transition: "stroke-dashoffset .7s cubic-bezier(.2,.8,.2,1)" }}
        />
      </svg>
      <div className="absolute inset-[7px] overflow-hidden rounded-full bg-line">{children}</div>
    </div>
  );
}

function Profile({ person, pct, align }) {
  return (
    <div className={`flex min-w-0 flex-1 flex-col items-center gap-3 sm:flex-row sm:gap-4 ${align === "right" ? "sm:flex-row-reverse sm:text-right" : ""}`}>
      <div className="relative">
        <Ring pct={pct} color={person.accent}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={person.avatar} alt={`${person.name}'s photo`} className="h-full w-full object-cover" />
        </Ring>
        <span className="absolute bottom-0.5 right-0.5 h-3.5 w-3.5 rounded-full border-2 border-card bg-moss" aria-label="Online" />
      </div>
      <div className="min-w-0 text-center sm:text-inherit">
        <p className="text-xs text-muted">{person.tag}</p>
        <p className="font-display text-xl font-bold leading-tight">{person.name}</p>
        <p className="mt-0.5 text-sm tabular-nums text-muted">{pct}% complete</p>
      </div>
    </div>
  );
}

function Spinner({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" className={`h-7 w-7 motion-safe:animate-spin text-plum ${className}`} fill="none" role="img" aria-label="Awaiting review">
      <circle cx="12" cy="12" r="9.5" stroke="#DDD5F2" strokeWidth="2.5" />
      <path d="M12 2.5a9.5 9.5 0 0 1 9.5 9.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function ago(t, now) {
  const m = Math.max(0, Math.round(((now ?? t) - t) / 60000));
  return m < 1 ? "just now" : `${m} min ago`;
}

const EMOJIS = ["🔥", "👏", "💪", "🎉", "❤️"];

function Reactions({ task, viewerIsOwner, onReact }) {
  const [open, setOpen] = useState(false);
  const rs = task.reactions || [];
  const mine = rs.find((r) => r.by === "you");
  if (viewerIsOwner && rs.length === 0) return null;

  return (
    <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
      {rs.map((r) => (
        <span key={r.by} title={`${PEOPLE[r.by].name} reacted`}
          className={`flex h-7 items-center gap-1 rounded-full border px-2 text-sm ${r.by === "you" ? "border-clay/30 bg-clay-soft" : "border-plum-line bg-plum-soft"}`}>
          <span aria-hidden>{r.emoji}</span>
          <span className="text-xs font-medium text-muted">{PEOPLE[r.by].name}</span>
        </span>
      ))}
      {!viewerIsOwner && (
        <div className="relative">
          <button onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-label="Add reaction"
            className="grid h-7 w-7 place-items-center rounded-full border border-line bg-card text-muted hover:border-clay">
            <SmilePlus className="h-4 w-4" />
          </button>
          {open && (
            <div role="menu" className="absolute left-0 top-9 z-20 flex gap-1 rounded-full border border-line bg-card p-1.5 shadow-lg animate-sheet">
              {EMOJIS.map((e) => (
                <button key={e} role="menuitem" onClick={() => { onReact(task, e); setOpen(false); }}
                  className={`grid h-9 w-9 place-items-center rounded-full text-lg hover:bg-paper active:scale-90 ${mine?.emoji === e ? "bg-clay-soft" : ""}`}>
                  {e}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ───────────── task card ───────────── */

function TaskCard({ task, viewerIsOwner, onToggle, onOpen, onReact, now }) {
  const owner = PEOPLE[task.owner];
  const reviewer = PEOPLE[other(task.owner)];
  const needsMyReview = task.status === "pending" && !viewerIsOwner;

  const base = "group flex items-center gap-4 rounded-[1.4rem] border p-4 pr-3.5 sm:p-5 sm:pr-4 transition-colors";
  const tone =
    task.status === "pending" ? "border-plum-line bg-plum-soft"
    : task.status === "approved" ? "border-moss-line bg-moss-soft/60"
    : "border-line bg-card";

  const leading =
    task.status === "approved" ? (
      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-moss text-white shadow-[0_4px_10px_-3px_rgba(75,138,96,.6)] animate-pop">
        <Check className="h-4 w-4" strokeWidth={3} />
      </span>
    ) : task.status === "pending" ? (
      <Spinner className="shrink-0" />
    ) : viewerIsOwner ? (
      <button
        role="checkbox" aria-checked="false" aria-label={`Mark “${task.title}” done and add proof`}
        onClick={() => onToggle(task)}
        className="h-7 w-7 shrink-0 rounded-full border-2 border-[#B9B4AA] bg-card transition hover:border-clay hover:bg-clay-soft active:scale-90"
      />
    ) : (
      <span className="h-7 w-7 shrink-0 rounded-full border-2 border-dashed border-[#CFCABF]" aria-hidden />
    );

  const label =
    task.status === "pending" ? (
      <>
        <p className="mt-1 text-sm font-semibold text-plum">
          {needsMyReview ? "Needs your review" : `Waiting for ${reviewer.name}’s approval`}
        </p>
        <p className="text-xs text-muted">
          Submitted {task.submittedAt ? ago(task.submittedAt, now) : `${task.minsAgo} min ago`}
        </p>
      </>
    ) : task.status === "approved" ? (
      <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-moss">
        <Check className="h-4 w-4" strokeWidth={2.5} /> Approved
      </p>
    ) : (
      <>
        {task.due && (
          <p className="mt-1 flex items-center gap-1.5 text-sm text-muted"><Clock className="h-4 w-4" /> {task.due}</p>
        )}
        {task.redo && (
          <p className="mt-1.5 flex items-start gap-1.5 text-sm font-medium text-clay">
            <RotateCcw className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            <span>{reviewer.name} asked for a redo{task.redo !== true ? `: “${task.redo}”` : ""}</span>
          </p>
        )}
        {!viewerIsOwner && <p className="mt-1 text-xs text-muted">Still to do</p>}
      </>
    );

  return (
    <li className={`${base} ${tone}`}>
      {leading}
      <div className="min-w-0 flex-1">
        <p className={`font-display text-[1.05rem] font-semibold leading-snug sm:text-lg ${task.status === "approved" ? "text-muted line-through decoration-[#B9B4AA]" : ""}`}>
          {task.title}
        </p>
        {label}
        <Reactions task={task} viewerIsOwner={viewerIsOwner} onReact={onReact} />
      </div>

      {task.proof ? (
        <button
          onClick={() => onOpen(task)}
          aria-label={`View proof for ${task.title}`}
          className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl border border-black/5 shadow-sm transition active:scale-95 sm:h-16 sm:w-16"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={task.proof} alt="" className="h-full w-full object-cover" />
          <span className="absolute bottom-1 right-1 grid h-5 w-5 place-items-center rounded-md bg-black/55 text-white backdrop-blur">
            <ImageIcon className="h-3 w-3" />
          </span>
        </button>
      ) : viewerIsOwner ? (
        <button onClick={() => onToggle(task)} className="shrink-0 rounded-full px-3 py-2 text-sm font-semibold text-clay hover:bg-clay-soft">
          Add proof
        </button>
      ) : null}
    </li>
  );
}

/* ───────────── modals ───────────── */

function Sheet({ onClose, label, children }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-label={label}>
      <div className="absolute inset-0 bg-ink/45 backdrop-blur-[3px]" onClick={onClose} />
      <div className="relative max-h-[92dvh] w-full max-w-md animate-sheet overflow-y-auto rounded-t-[2rem] bg-card shadow-2xl sm:rounded-[2rem]">
        <button onClick={onClose} aria-label="Close" className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full bg-black/45 text-white backdrop-blur hover:bg-black/60">
          <X className="h-5 w-5" />
        </button>
        {children}
      </div>
    </div>
  );
}

function ProofHero({ src }) {
  return (
    <div className="relative aspect-[8/5] w-full bg-line">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="Proof of completion" className="h-full w-full object-cover" />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/45 to-transparent px-5 pb-3 pt-10">
        <span className="text-[11px] font-bold uppercase tracking-[.12em] text-white">Proof of completion</span>
      </div>
    </div>
  );
}

function SubmitSheet({ task, onClose, onSubmit }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState(false);
  const input = useRef(null);

  const pick = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (!f.type.startsWith("image/")) return setError("That file isn’t a photo. Choose a JPG or PNG.");
    setFile(f); setPreview(URL.createObjectURL(f)); setError(false);
  };
  const submit = () => {
    if (!file) return setError("Add a photo so Maya can see it’s done.");
    onSubmit(task, preview);
  };

  return (
    <Sheet onClose={onClose} label="Submit proof">
      <div className="p-6 pt-7">
        <p className="pr-10 text-sm text-muted">Show Maya it’s done</p>
        <h2 className="mt-1 pr-10 font-display text-2xl font-bold leading-tight">{task.title}</h2>

        <input ref={input} type="file" accept="image/*" capture="environment" className="sr-only" onChange={pick} aria-label="Choose proof photo" />
        {preview ? (
          <div className="relative mt-5 overflow-hidden rounded-3xl border border-line">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={preview} alt="Your proof photo" className="aspect-[8/5] w-full object-cover" />
            <button onClick={() => input.current?.click()} className="absolute bottom-3 right-3 rounded-full bg-white/90 px-3.5 py-2 text-sm font-semibold shadow backdrop-blur">
              Retake
            </button>
          </div>
        ) : (
          <button
            onClick={() => input.current?.click()}
            className={`mt-5 flex aspect-[8/5] w-full flex-col items-center justify-center gap-2 rounded-3xl border-2 border-dashed text-center transition ${error ? "border-clay bg-clay-soft" : "border-[#CFCABF] bg-paper hover:border-clay"}`}
          >
            <span className="grid h-12 w-12 place-items-center rounded-full bg-card shadow-sm">
              <ImagePlus className="h-6 w-6 text-clay" />
            </span>
            <span className="font-display font-semibold">Take or choose a photo</span>
            <span className="text-sm text-muted">A quick snap is enough</span>
          </button>
        )}

        {error && (
          <p role="alert" className="mt-3 flex items-start gap-2 text-sm font-medium text-clay">
            <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0" /> {error}
          </p>
        )}

        <div className="mt-6 flex gap-3">
          <button onClick={onClose} className="h-12 flex-1 rounded-2xl border border-line bg-card font-semibold text-muted hover:bg-paper">Not yet</button>
          <button onClick={submit} className="flex h-12 flex-[1.4] items-center justify-center gap-2 rounded-2xl bg-ink font-semibold text-white transition active:scale-[.98]">
            <Camera className="h-4 w-4" /> Send for approval
          </button>
        </div>
      </div>
    </Sheet>
  );
}

function ProofSheet({ task, viewerIsOwner, onClose, onApprove, onRedo, onSimulate }) {
  const owner = PEOPLE[task.owner];
  const reviewer = PEOPLE[other(task.owner)];
  const [asking, setAsking] = useState(false);
  const [reason, setReason] = useState("");
  const reviewing = task.status === "pending" && !viewerIsOwner;

  const redoUI = (
    <div className="mt-5 space-y-3">
      <label className="block text-sm font-medium" htmlFor="why">What should change? <span className="font-normal text-muted">(optional)</span></label>
      <textarea id="why" value={reason} onChange={(e) => setReason(e.target.value)} rows={2} maxLength={120}
        placeholder="e.g. Can I see the desk drawers too?"
        className="w-full resize-none rounded-2xl border border-line bg-paper p-3 text-[15px] outline-none focus:border-plum" />
      <div className="flex gap-3">
        <button onClick={() => setAsking(false)} className="h-12 flex-1 rounded-2xl border border-line font-semibold text-muted">Back</button>
        <button onClick={() => onRedo(task, reason.trim() || true)} className="h-12 flex-[1.4] rounded-2xl bg-clay font-semibold text-white">Send back</button>
      </div>
    </div>
  );

  return (
    <Sheet onClose={onClose} label="Proof of completion">
      <ProofHero src={task.proof} />
      <div className="p-6">
        <div className="flex items-center gap-2 text-xs font-medium text-muted">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={owner.avatar} alt="" className="h-6 w-6 rounded-full object-cover" />
          {viewerIsOwner ? "You" : owner.name} submitted this
        </div>
        <h2 className="mt-2.5 font-display text-2xl font-bold leading-tight">{task.title}</h2>

        {reviewing && !asking && (
          <>
            <p className="mt-2 text-sm text-muted">Does this look complete? Your approval closes the loop.</p>
            <div className="mt-5 flex gap-3">
              <button onClick={() => setAsking(true)} className="h-12 flex-1 rounded-2xl border border-line bg-card font-semibold text-muted hover:bg-paper">Ask to redo</button>
              <button onClick={() => onApprove(task)} className="flex h-12 flex-[1.4] items-center justify-center gap-2 rounded-2xl bg-moss font-semibold text-white transition active:scale-[.98]">
                <Check className="h-4 w-4" strokeWidth={3} /> Approve task
              </button>
            </div>
          </>
        )}
        {reviewing && asking && redoUI}

        {task.status === "pending" && viewerIsOwner && (
          <>
            <div className="mt-5 flex items-center justify-center gap-2.5 rounded-2xl bg-plum-soft px-4 py-3.5 text-sm font-semibold text-plum">
              <Spinner className="h-5 w-5" /> {reviewer.name} needs to review this submission.
            </div>
            {/* Prototype helper: lets you see both sides of the flow without a second device. Remove in production. */}
            <div className="mt-4 rounded-2xl border border-dashed border-line p-3 text-center">
              <p className="mb-2 text-xs text-muted">Demo only: respond as {reviewer.name}</p>
              <div className="flex gap-2">
                <button onClick={() => onSimulate(task, false)} className="h-10 flex-1 rounded-xl border border-line text-sm font-semibold text-muted">Ask to redo</button>
                <button onClick={() => onSimulate(task, true)} className="h-10 flex-1 rounded-xl bg-moss/10 text-sm font-semibold text-moss">Approve</button>
              </div>
            </div>
          </>
        )}

        {task.status === "approved" && (
          <div className="mt-5 flex items-center justify-center gap-2 rounded-2xl bg-moss-soft px-4 py-3.5 text-sm font-semibold text-moss">
            <Check className="h-4 w-4" strokeWidth={3} /> This task was approved.
          </div>
        )}
      </div>
    </Sheet>
  );
}

function Toast({ toast }) {
  const icon = toast?.kind === "error" ? <TriangleAlert className="h-4 w-4" /> : toast?.kind === "info" ? <Info className="h-4 w-4" /> : <CheckCheck className="h-4 w-4" />;
  return (
    <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-5 z-50 flex justify-center px-4">
      {toast && (
        <div key={toast.id} className="flex animate-sheet items-center gap-2.5 rounded-full bg-ink px-5 py-3 text-sm font-medium text-white shadow-xl">
          {icon} {toast.text}
        </div>
      )}
    </div>
  );
}

/* ───────────── app ───────────── */

export default function Tandem() {
  const [tasks, setTasks] = useState(SEED);
  const [tab, setTab] = useState("you");
  const [sheet, setSheet] = useState(null); // { type: 'submit' | 'proof', id }
  const [toast, setToast] = useState(null);
  const [streak] = useState(7);
  const [together, setTogether] = useState(12);
  const [now, setNow] = useState(null);

  useEffect(() => {
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), 30000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3200);
    return () => clearTimeout(t);
  }, [toast]);

  const say = (text, kind = "success") => setToast({ id: Date.now(), text, kind });
  const patch = (id, p) => setTasks((ts) => ts.map((t) => (t.id === id ? { ...t, ...p } : t)));

  const pct = (id) => {
    const mine = tasks.filter((t) => t.owner === id);
    return Math.round((mine.filter((t) => t.status === "approved").length / mine.length) * 100);
  };
  const open = (id) => tasks.filter((t) => t.owner === id && t.status !== "approved").length;
  const reviewCount = tasks.filter((t) => t.owner === "maya" && t.status === "pending").length;

  const list = useMemo(() => {
    const order = { todo: 0, pending: 1, approved: 2 };
    return tasks.filter((t) => t.owner === tab).sort((a, b) => order[a.status] - order[b.status] || a.id - b.id);
  }, [tasks, tab]);

  const current = sheet && tasks.find((t) => t.id === sheet.id);

  const approve = (t) => {
    patch(t.id, { status: "approved", redo: undefined });
    setTogether((n) => n + 1);
    setSheet(null);
    say(t.owner === "you" ? `${PEOPLE[other("you")].name} approved “${t.title}”` : `Approved. ${PEOPLE[t.owner].name} will see it right away.`);
  };
  const redo = (t, reason) => {
    patch(t.id, { status: "todo", proof: undefined, redo: reason, submittedAt: undefined });
    setSheet(null);
    say(t.owner === "you" ? `${PEOPLE.maya.name} asked for a redo` : `Sent back to ${PEOPLE[t.owner].name} for a redo`, "info");
  };
  const submit = (t, url) => {
    patch(t.id, { status: "pending", proof: url, submittedAt: Date.now(), redo: undefined });
    setSheet(null);
    say(`Sent to ${PEOPLE[other(t.owner)].name} for approval`);
  };

  const react = (t, emoji) => {
    const others = (t.reactions || []).filter((r) => r.by !== "you");
    const same = t.reactions?.find((r) => r.by === "you")?.emoji === emoji;
    patch(t.id, { reactions: same ? others : [...others, { by: "you", emoji }] });
  };

  return (
    <main className="relative mx-auto min-h-dvh max-w-2xl overflow-x-clip px-5 pb-24 pt-6 sm:px-8 sm:pt-10">
      {/* soft background shapes */}
      <div aria-hidden className="pointer-events-none absolute -left-40 top-56 -z-10 h-80 w-80 rounded-full bg-[#F0E6D8]/70 blur-2xl" />
      <div aria-hidden className="pointer-events-none absolute -right-44 top-[34rem] -z-10 h-96 w-96 rounded-full bg-[#E9E4F2]/70 blur-2xl" />

      <header className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <svg width="34" height="28" viewBox="0 0 34 28" fill="none" aria-hidden>
            <ellipse cx="11" cy="14" rx="9" ry="11.5" stroke="#262521" strokeWidth="2.4" />
            <ellipse cx="22" cy="14" rx="9" ry="11.5" stroke="#C4562F" strokeWidth="2.4" />
          </svg>
          <span className="font-display text-xl font-bold tracking-tight">Tandem</span>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-line bg-card px-3.5 py-2 text-sm font-semibold text-muted" title="Days in a row you both kept your promises">
          <Flame className="h-4 w-4 text-clay" /> {streak} day streak
        </div>
      </header>

      <section className="mt-10 sm:mt-14">
        <p className="text-sm text-muted">Thursday, October 22</p>
        <h1 className="mt-1.5 font-display text-[2.6rem] font-extrabold leading-[1.02] tracking-tight sm:text-6xl">Keep each other moving.</h1>
        <p className="mt-3 text-lg text-muted">Small promises. Shared progress.</p>
      </section>

      {/* partnership */}
      <section aria-label="Partners" className="mt-8 rounded-[2rem] border border-line bg-card/90 px-4 py-7 shadow-[0_10px_30px_-18px_rgba(38,37,33,.25)] sm:px-8 sm:py-9">
        <div className="flex items-start justify-center gap-1 sm:items-center">
          <Profile person={PEOPLE.you} pct={pct("you")} />
          <div className="flex shrink-0 items-center self-center pt-0 sm:w-28" aria-hidden>
            <span className="hidden flex-1 border-t border-dashed border-[#CFCABF] sm:block" />
            <span className="mx-1 grid h-9 w-9 place-items-center rounded-full border border-clay/20 bg-clay-soft">
              <Heart className="h-4 w-4 fill-clay text-clay" />
            </span>
            <span className="hidden flex-1 border-t border-dashed border-[#CFCABF] sm:block" />
          </div>
          <Profile person={PEOPLE.maya} pct={pct("maya")} align="right" />
        </div>
      </section>

      {/* tabs */}
      <div role="tablist" aria-label="Task lists" className="mt-6 grid grid-cols-2 gap-1 rounded-[1.4rem] border border-line bg-[#E9E5DE] p-1.5">
        {["you", "maya"].map((id) => {
          const active = tab === id;
          const badge = id === "maya" && reviewCount > 0;
          return (
            <button
              key={id} role="tab" aria-selected={active} aria-controls="task-panel" id={`tab-${id}`}
              onClick={() => setTab(id)}
              className={`flex h-12 items-center justify-center gap-2.5 rounded-2xl font-display font-semibold transition ${active ? "bg-card text-ink shadow-sm" : "text-muted hover:text-ink"}`}
            >
              {id === "you" ? "Your tasks" : "Maya’s tasks"}
              <span className={`grid h-6 min-w-6 place-items-center rounded-full px-1.5 text-xs font-bold tabular-nums ${
                active ? (id === "you" ? "bg-clay text-white" : "bg-plum text-white") : badge ? "bg-plum text-white" : "bg-black/[.07] text-muted"}`}
                aria-label={`${open(id)} open${badge ? `, ${reviewCount} to review` : ""}`}
              >
                {open(id)}
              </span>
            </button>
          );
        })}
      </div>

      {/* list */}
      <section id="task-panel" role="tabpanel" aria-labelledby={`tab-${tab}`} className="mt-9">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-sm text-muted">{tab === "you" ? "Your commitments" : "Maya’s commitments"}</p>
            <h2 className="font-display text-3xl font-bold tracking-tight">{tab === "you" ? "Your Tasks" : "Maya’s Tasks"}</h2>
          </div>
          <p className="pb-1 text-sm text-muted">{list.length} total</p>
        </div>

        {tab === "maya" && reviewCount > 0 && (
          <p className="mt-3 rounded-2xl bg-plum-soft px-4 py-3 text-sm font-medium text-plum">
            Maya is waiting on you. Open her photo to approve it or ask for a redo.
          </p>
        )}

        <ul className="mt-5 space-y-3.5">
          {list.map((t) => (
            <TaskCard
              key={t.id} task={t} now={now}
              viewerIsOwner={t.owner === "you"}
              onToggle={(task) => setSheet({ type: "submit", id: task.id })}
              onOpen={(task) => setSheet({ type: "proof", id: task.id })}
              onReact={react}
            />
          ))}
        </ul>
      </section>

      <p className="mt-10 flex items-center justify-center gap-2.5 text-sm text-muted">
        <span className="grid h-8 w-8 place-items-center rounded-full bg-moss-soft"><Check className="h-4 w-4 text-moss" strokeWidth={2.5} /></span>
        <span>You and Maya have completed <b className="font-semibold text-ink tabular-nums">{together} promises</b> together</span>
      </p>

      {current && sheet.type === "submit" && (
        <SubmitSheet task={current} onClose={() => setSheet(null)} onSubmit={submit} />
      )}
      {current && sheet.type === "proof" && (
        <ProofSheet
          task={current} viewerIsOwner={current.owner === "you"}
          onClose={() => setSheet(null)} onApprove={approve} onRedo={redo}
          onSimulate={(t, ok) => (ok ? approve(t) : redo(t, "Can you retake that one?"))}
        />
      )}
      <Toast toast={toast} />
    </main>
  );
}