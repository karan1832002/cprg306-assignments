"use client";

import Link from "next/link";
import { useUserAuth } from "./_utils/auth-context";

export default function Page() {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

  async function handleLogin() {
    await gitHubSignIn();
  }

  async function handleLogout() {
    await firebaseSignOut();
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
      <div className="bg-slate-800 p-8 rounded-lg shadow-lg w-[350px] text-center">
        <h1 className="text-2xl font-bold mb-4">Shopping List App</h1>

        {!user ? (
          <>
            <p className="mb-4 text-gray-300">Please log in to continue.</p>

            <button
              onClick={handleLogin}
              className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-white"
            >
              Login with GitHub
            </button>
          </>
        ) : (
          <>
            <p className="mb-2 font-semibold">
              Welcome {user.displayName || "User"}
            </p>

            <p className="text-sm text-gray-400 mb-4">{user.email}</p>

            <div className="flex flex-col gap-3">
              <Link
                href="/week-8/shopping-list"
                className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded"
              >
                Go to Shopping List
              </Link>

              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
              >
                Logout
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}