"use client";

// Shown to a signed-in user who hasn't paired yet.
import { useState } from "react";
import { Check, CircleUserRound, Copy, Heart, Link2, Mail, MessageCircle, Plus, Send, Share2, TriangleAlert } from "lucide-react";
import Toast from "./Toast"
import { signOut } from '@/lib/client-side-auth-client'
import { useRouter } from "next/navigation";

function Logo() {
  return (
    <div className="flex items-center gap-2.5">
      <svg width="34" height="28" viewBox="0 0 34 28" fill="none" aria-hidden>
        <ellipse cx="11" cy="14" rx="9" ry="11.5" stroke="#262521" strokeWidth="2.4" />
        <ellipse cx="22" cy="14" rx="9" ry="11.5" stroke="#C4562F" strokeWidth="2.4" />
      </svg>
      <span className="font-display text-xl font-bold tracking-tight">Tackl</span>
    </div>
  );
}

export default function UnpairedInvite({name, handle , profilePic}) {
  const INVITE_URL = `https://tackl.vercel.app/invite/${handle}`
  const MESSAGE = `${name} invited you to Tackl: small promises, shared progress. Join me here: ${INVITE_URL}`

  const [copied, setCopied] = useState(null); // "link" | "code" | null
  const [toast, setToast] = useState(null);
  const [joining, setJoining] = useState(false);
  const [link, setLink] = useState("");
  const [error, setError] = useState("");

  const copy = async (text, what) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta); ta.select();
      try { document.execCommand("copy"); } catch {}
      ta.remove();
    }
    setCopied(what);
    setToast(what === "link" ? "Invite link copied" : what === "code" ? "Invite code copied" : "Invite message copied");
    setTimeout(() => setCopied(null), 2000);
  };

  const share = async () => {
    if (navigator.share) {
      try { await navigator.share({ title: "Join me on Tackl", text: MESSAGE, url: INVITE_URL }); } catch {}
    } else {
      copy(MESSAGE, "message");
    }
  };

  const joinWithLink = (e) => {
    e.preventDefault();
    const v = link.trim()
    if (v === INVITE_URL) return setError("That’s your own code. Send it to your partner instead.");
    setError("");
    // TODO: Make checks on url then push to /invite/handle(url)
    //router.push(`${INVITE_URL}`)
    setToast("Pairing…");
  };

  const channels = [
    { label: "Messages", icon: MessageCircle, href: `sms:?&body=${encodeURIComponent(MESSAGE)}` },
    { label: "Email", icon: Mail, href: `mailto:?subject=${encodeURIComponent("Join me on Tackl")}&body=${encodeURIComponent(MESSAGE)}` },
    { label: "WhatsApp", icon: Send, href: `https://api.whatsapp.com/send?text=${encodeURIComponent(MESSAGE)}` },
  ]

  const [show, setShow] = useState(false)
  const router = useRouter()

  return (
    <main className="relative mx-auto min-h-screen max-w-2xl overflow-x-clip px-5 pb-20 pt-6 sm:px-8 sm:pt-10">
      <div aria-hidden className="pointer-events-none absolute -left-40 top-56 -z-10 h-80 w-80 rounded-full bg-[#F0E6D8]/70 blur-2xl" />
      <div aria-hidden className="pointer-events-none absolute -right-44 top-136 -z-10 h-96 w-96 rounded-full bg-[#E9E4F2]/70 blur-2xl" />

      <header className="flex items-center justify-between">
        <Logo />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <div className='relative'>
          <img src={profilePic} alt={`${name}'s photo`} onClick={()=>setShow(prev=>!prev)} className="h-10 w-10 rounded-full object-cover ring-2 ring-line" />
          <button
            onClick={() => {
              signOut();
              router.push('/sign-in');
            }}
            className={`absolute top-8 right-8 z-10 mt-3 h-14 w-30
              flex items-center justify-center gap-2
              rounded-2xl rounded-tr-none border border-black
              bg-ink font-display font-semibold text-clay
              transition-all duration-200 ease-in-out
              hover:bg-[#F8E4DA] active:scale-[.99]
              ${
                show
                  ? 'translate-x-0 translate-y-0 opacity-95 pointer-events-auto'
                  : 'translate-x-2 -translate-y-2 opacity-0 pointer-events-none'
              }`}
          >
            Sign Out
          </button>
        </div>
      </header>

      <section className="mt-10 sm:mt-14">
        <p className="text-sm text-muted">Welcome, {name?.split(' ')[0]}</p>
        <h1 className="mt-1.5 font-display text-[2.6rem] font-extrabold leading-[1.02] tracking-tight sm:text-6xl">Bring your person.</h1>
        <p className="mt-3 max-w-md text-lg text-muted">Tackl works with exactly one other person. Send them an invite and you’ll start your first promise together.</p>
      </section>

      {/* pairing preview: you + empty slot */}
      <section aria-label="Your partnership" className="mt-8 rounded-4xl border border-line bg-card/90 px-4 py-7 shadow-[0_10px_30px_-18px_rgba(38,37,33,.25)] sm:px-8 sm:py-9">
        <div className="flex items-start justify-center gap-1 sm:items-center">
          <div className="flex min-w-0 flex-1 flex-col items-center gap-3 sm:flex-row sm:gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {profilePic?
              <img src={profilePic} alt="" className="h-19 w-19 rounded-full object-cover ring-[3.5px] ring-black/5 ring-offset-[3px] ring-offset-card" />
            :
             <CircleUserRound className='text-black/80 h-19 w-19 rounded-full object-cover ring-[3.5px] ring-black/5 ring-offset-[3px] ring-offset-card'/>
            }
            <div className="text-center sm:text-left">
              <p className="text-xs text-muted">You</p>
              <p className="font-display text-xl font-bold leading-tight">{name?.split(' ')[0]}</p>
              <p className="mt-0.5 text-sm text-muted">Ready</p>
            </div>
          </div>

          <div className="flex shrink-0 items-center self-center sm:w-28" aria-hidden>
            <span className="hidden flex-1 border-t border-dashed border-[#CFCABF] sm:block" />
            <span className="mx-1 grid h-9 w-9 place-items-center rounded-full border border-line bg-paper"></span>
            <span className="hidden flex-1 border-t border-dashed border-[#CFCABF] sm:block" />
          </div>

          <div className="flex min-w-0 flex-1 flex-col items-center gap-3 sm:flex-row-reverse sm:gap-4">
            <span className="grid h-19 w-19 place-items-center rounded-full border-2 border-dashed border-[#CFCABF] bg-paper text-[#B9B4AA]">
              <Plus className="h-7 w-7" />
            </span>
            <div className="text-center sm:text-right">
              <p className="text-xs text-muted">Partner</p>
              <p className="font-display text-xl font-bold leading-tight text-muted">Not yet</p>
              <p className="mt-0.5 flex items-center justify-center gap-1.5 text-sm text-muted sm:justify-end">
                <span className="relative flex h-2 w-2"><span className="absolute inset-0 rounded-full bg-plum/50 motion-safe:animate-ping" /><span className="relative h-2 w-2 rounded-full bg-plum" /></span>
                Waiting
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* invite */}
      <section className="mt-6 rounded-4xl border border-line bg-card p-5 sm:p-7">
        <p className="text-sm text-muted">Your invite</p>
        <h2 className="font-display text-2xl font-bold tracking-tight">Share your link</h2>

        <div className="mt-4 flex items-center gap-2 rounded-2xl border border-line bg-paper p-1.5 pl-4">
          <Link2 className="h-4 w-4 shrink-0 text-muted" />
          <input readOnly value={INVITE_URL} aria-label="Invite link" onFocus={(e) => e.target.select()}
            className="min-w-0 flex-1 truncate bg-transparent text-[15px] outline-none" />
          <button onClick={() => copy(INVITE_URL, "link")}
            className={`flex h-11 shrink-0 items-center gap-2 rounded-xl px-4 font-semibold text-white transition active:scale-[.97] ${copied === "link" ? "bg-moss" : "bg-ink"}`}>
            {copied === "link" ? <><Check className="h-4 w-4" strokeWidth={3} /> Copied</> : <><Copy className="h-4 w-4" /> Copy</>}
          </button>
        </div>

        <button onClick={share} className="mt-3 flex h-14 w-full items-center justify-center gap-2 rounded-2xl border border-clay/25 bg-clay-soft font-display font-semibold text-clay transition hover:bg-[#F8E4DA] active:scale-[.99]">
          <Share2 className="h-4 w-4" /> Share invite
        </button>

        <div className="mt-3 grid grid-cols-3 gap-2.5">
          {channels.map(({ label, icon: Icon, href }) => (
            <a key={label} href={href} target={href.startsWith("https") ? "_blank" : undefined} rel="noreferrer"
              className="flex h-12 items-center justify-center gap-2 rounded-2xl border border-line bg-card text-sm font-semibold text-muted transition hover:border-clay hover:text-ink">
              <Icon className="h-4 w-4" /> {label}
            </a>
          ))}
        </div>
      </section>

      {/* have a link */}
      <section className="mt-6 text-center">
        {!joining ? (
          <button onClick={() => setJoining(true)} className="text-sm font-semibold text-plum underline-offset-4 hover:underline">
            Got an invite link from someone? Join them instead
          </button>
        ) : (
          <form onSubmit={joinWithLink} className="rounded-[1.6rem] border border-plum-line bg-plum-soft p-4 text-left sm:p-5">
            <label htmlFor="code" className="text-sm font-semibold text-plum">Paste their link</label>
            <div className="mt-2 flex gap-2">
              <input id="code" value={link} onChange={(e) => { setLink(e.target.value); setError(""); }} placeholder={INVITE_URL} autoComplete="off"
                className="h-12 min-w-0 flex-1 rounded-xl border border-plum-line bg-card px-4 text-[15px] tracking-widest outline-none focus:border-plum" />
              <button className="h-12 rounded-xl bg-plum px-5 font-semibold text-white active:scale-[.97]">Join</button>
            </div>
            {error && <p role="alert" className="mt-2.5 flex items-start gap-2 text-sm font-medium text-clay"><TriangleAlert className="mt-0.5 h-4 w-4 shrink-0" /> {error}</p>}
          </form>
        )}
      </section>

      <p className="mt-10 text-center text-sm text-muted">Your invite works once. When your partner joins, you’ll both land on your shared dashboard.</p>

      {toast && <Toast toast={toast} icon={Check} setToast={setToast} /> }
    </main>
  );
}