"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc, collection, onSnapshot } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { ymd } from "@/lib/score";

const C = createContext({});
export const useAuth = () => useContext(C);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    return onAuthStateChanged(auth, async (u) => {
      setUser(u);
      try {
        // ONLY create or update user profile in Firestore if email is verified!
        if (u && u.emailVerified) {
          const ref = doc(db, "users", u.uid);
          const snap = await getDoc(ref);
          if (!snap.exists()) {
            await setDoc(ref, {
              name: u.displayName || u.email.split("@")[0],
              joined: ymd(),
              days: {},
              topics: {},
              verified: true,
            });
          } else if (snap.data().verified !== true) {
            await setDoc(ref, { verified: true }, { merge: true });
          }
        }
      } catch (e) {
        console.error("Firestore user sync error:", e);
      }
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!user) {
      setUsers([]);
      return;
    }
    // Listen to users collection, but strictly filter out unverified accounts
    return onSnapshot(
      collection(db, "users"),
      (s) => {
        const list = s.docs
          .map((d) => ({ id: d.id, ...d.data() }))
          .filter((d) => {
            // Must have a valid name and must NOT be marked unverified
            if (!d.name || d.verified === false) return false;
            // Either explicitly verified or has verified activity
            return d.verified === true || (d.days && Object.keys(d.days).length > 0);
          });
        setUsers(list);
      },
      (e) => console.error("Firestore read error (check rules):", e)
    );
  }, [user]);

  return <C.Provider value={{ user, loading, users }}>{children}</C.Provider>;
}
