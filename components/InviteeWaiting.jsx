"use client";

// Save as app/join/[code]/page.js
// Shown to a signed-in person who opened an invite link. A pair request has been sent to the inviter.
// Uses the Tailwind v4 theme in app/globals.css and the image URLs in lib/images.js.
// Replace inviter / ME with real data and wire the TODOs (poll status, cancel request).

import { useEffect, useState } from "react";
import { ArrowRight, Check, Heart, Send, X } from "lucide-react";
import { IMAGES } from "@/lib/images";

const ME = { name: "Maya", avatar: IMAGES.maya };
const inviter = { name: "Alex", avatar: IMAGES.alex };

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

function Spinner({ className = "h-7 w-7" }) {
  return (
    <svg viewBox="0 0 24 24" className={`${className} shrink-0 text-plum motion-safe:animate-spin`} fill="none" role="img" aria-label="Waiting">
      <circle cx="12" cy="12" r="9.5" stroke="#DDD5F2" strokeWidth="2.5" />
      <path d="M12 2.5a9.5 9.5 0 0 1 9.5 9.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function Person({ person, label, ring, align }) {
  return (
    <div className={`flex min-w-0 flex-1 flex-col items-center gap-3 sm:flex-row sm:gap-4 ${align === "right" ? "sm:flex-row-reverse" : ""}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={person.avatar} alt={`${person.name}'s photo`} className={`h-19 w-19 rounded-full object-cover ring-[3.5px] ring-offset-[3px] ring-offset-card ${ring}`} />
      <div className={`text-center ${align === "right" ? "sm:text-right" : "sm:text-left"}`}>
        <p className="text-xs text-muted">{label}</p>
        <p className="font-display text-xl font-bold leading-tight">{person.name}</p>
      </div>
    </div>
  );
}

export default function InviteeWaiting({user, inviter}) {
  const [status, setStatus] = useState("pending"); // "pending" | "accepted" | "cancelled"
  const accepted = status === "accepted";

  // TODO: replace with real-time updates (websocket / SSE) or poll your API.
  useEffect(() => {
    if (status !== "pending") return;
    const id = setInterval(async () => {
      // const res = await fetch("/api/pair/status"); const { state } = await res.json();
      // if (state === "accepted") setStatus("accepted");
    }, 5000);
    return () => clearInterval(id);
  }, [status]);

  const cancel = () => {
    // TODO: await fetch("/api/pair/cancel", { method: "POST" });
    setStatus("cancelled");
  };

  return (
    <main className="relative mx-auto min-h-dvh max-w-2xl overflow-x-clip px-5 pb-20 pt-6 sm:px-8 sm:pt-10">
      <div aria-hidden className="pointer-events-none absolute -left-40 top-56 -z-10 h-80 w-80 rounded-full bg-[#F0E6D8]/70 blur-2xl" />
      <div aria-hidden className="pointer-events-none absolute -right-44 top-136 -z-10 h-96 w-96 rounded-full bg-[#E9E4F2]/70 blur-2xl" />

      <header className="flex items-center justify-between">
        <Logo />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={user.img} alt={`${user.name}'s photo`} className="h-10 w-10 rounded-full object-cover ring-2 ring-line" />
      </header>

      {status === "cancelled" ? (
        <section className="mt-16 text-center">
          <h1 className="font-display text-4xl font-extrabold tracking-tight">Request cancelled</h1>
          <p className="mx-auto mt-3 max-w-sm text-lg text-muted">{inviter.name} won’t be notified. You can use their invite link again any time.</p>
        </section>
      ) : (
        <>
          <section className="mt-10 sm:mt-14">
            <p className="text-sm text-muted">{accepted ? "You’re in" : `Invited by ${inviter.name}`}</p>
            <h1 className="mt-1.5 font-display text-[2.6rem] font-extrabold leading-[1.02] tracking-tight sm:text-6xl">
              {accepted ? "You’re paired." : "Request sent."}
            </h1>
            <p className="mt-3 max-w-md text-lg text-muted">
              {accepted
                ? `${inviter.name} accepted. Your shared dashboard is ready.`
                : `We’ve asked ${inviter.name} to pair with you. As soon as they accept, you can start.`}
            </p>
          </section>

          <section aria-label="Your partnership" className="mt-8 rounded-4xl border border-line bg-card/90 px-4 py-7 shadow-[0_10px_30px_-18px_rgba(38,37,33,.25)] sm:px-8 sm:py-9">
            <div className="flex items-start justify-center gap-1 sm:items-center">
              <Person person={ME} label="You" ring="ring-plum" />
              <div className="flex shrink-0 items-center self-center sm:w-28" aria-hidden>
                <span className={`hidden flex-1 border-t sm:block ${accepted ? "border-moss" : "border-dashed border-[#CFCABF]"}`} />
                <span className={`mx-1 grid h-9 w-9 place-items-center rounded-full border ${accepted ? "border-clay/20 bg-clay-soft" : "border-line bg-paper"}`}>
                  <Heart className={`h-4 w-4 ${accepted ? "fill-clay text-clay" : "text-[#B9B4AA]"}`} />
                </span>
                <span className={`hidden flex-1 border-t sm:block ${accepted ? "border-moss" : "border-dashed border-[#CFCABF]"}`} />
              </div>
              <Person person={inviter} label="Partner" ring="ring-clay" align="right" />
            </div>
          </section>

          {/* status */}
          {accepted ? (
            <section className="mt-6 rounded-4xl border border-moss-line bg-moss-soft/60 p-5 sm:p-7">
              <div className="flex items-center gap-4">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-moss text-white motion-safe:animate-pop"><Check className="h-5 w-5" strokeWidth={3} /></span>
                <div>
                  <p className="font-display text-lg font-bold">{inviter.name} accepted your request</p>
                  <p className="text-sm text-muted">Make your first small promise together.</p>
                </div>
              </div>
              <a href="/" className="mt-5 flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-ink font-display font-semibold text-white transition hover:bg-black active:scale-[.98]">
                Start your first promise <ArrowRight className="h-4 w-4" />
              </a>
            </section>
          ) : (
            <section className="mt-6 rounded-4xl border border-plum-line bg-plum-soft p-5 sm:p-7">
              <div className="flex items-center gap-4">
                <Spinner />
                <div>
                  <p className="font-display text-lg font-bold text-plum">Waiting for {inviter.name}’s approval</p>
                  <p className="flex items-center gap-1.5 text-sm text-muted"><Send className="h-3.5 w-3.5" /> Request sent just now</p>
                </div>
              </div>
              <ol className="mt-5 space-y-3 border-t border-plum-line pt-5 text-[15px] text-muted">
                <li className="flex gap-3"><span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-moss text-white"><Check className="h-3.5 w-3.5" strokeWidth={3} /></span> You opened {inviter.name}’s invite</li>
                <li className="flex gap-3"><span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border-2 border-plum bg-card text-xs font-bold text-plum">2</span> {inviter.name} accepts your request</li>
                <li className="flex gap-3"><span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border-2 border-[#CFCABF] bg-card text-xs font-bold text-[#B9B4AA]">3</span> You both land on your shared dashboard</li>
              </ol>
              <p className="mt-5 rounded-2xl bg-card/70 px-4 py-3 text-sm text-muted">You can close this page. We’ll let you know when {inviter.name} accepts.</p>
            </section>
          )}

          {!accepted && (
            <div className="mt-6 text-center">
              <button onClick={cancel} className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted underline-offset-4 hover:text-ink hover:underline">
                <X className="h-4 w-4" /> Cancel request
              </button>
            </div>
          )}

          {/* Prototype helper. Remove in production. */}
          {!accepted && (
            <div className="mt-8 rounded-2xl border border-dashed border-line p-3 text-center">
              <p className="mb-2 text-xs text-muted">Demo only</p>
              <button onClick={() => setStatus("accepted")} className="h-10 rounded-xl bg-moss/10 px-4 text-sm font-semibold text-moss">Simulate {inviter.name} accepting</button>
            </div>
          )}
        </>
      )}
    </main>
  );
}