"use client";

import Link from "next/link";
import { useUserAuth } from "./_utils/auth-context";

export default function Week10Page() {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

  async function handleLogin() {
    await gitHubSignIn();
  }

  async function handleLogout() {
    await firebaseSignOut();
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-2xl rounded-3xl border border-white/10 bg-white/10 p-8 shadow-2xl backdrop-blur">
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-blue-200">
          CPRG 306
        </p>

        <h1 className="mb-4 text-4xl font-bold">Week 10 Shopping List</h1>

        <p className="mb-8 text-slate-200">
          This version stores shopping list items in Firebase Cloud Firestore.
        </p>

        {!user ? (
          <div className="space-y-4">
            <p className="text-slate-300">Sign in to access your shopping list.</p>
            <button
              onClick={handleLogin}
              className="rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-500"
            >
              Login with GitHub
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <p className="text-sm text-slate-300">Signed in as</p>
              <p className="text-lg font-semibold">
                {user.displayName || user.email}
              </p>
              {user.email && <p className="text-sm text-slate-400">{user.email}</p>}
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/week-10/shopping-list"
                className="rounded-xl bg-emerald-600 px-5 py-3 font-medium text-white transition hover:bg-emerald-500"
              >
                Open Shopping List
              </Link>

              <button
                onClick={handleLogout}
                className="rounded-xl bg-rose-600 px-5 py-3 font-medium text-white transition hover:bg-rose-500"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}