import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const cfg = {
  apiKey: process.env.NEXT_PUBLIC_FB_API_KEY || "missing-key",
  authDomain: process.env.NEXT_PUBLIC_FB_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FB_PROJECT_ID,
  appId: process.env.NEXT_PUBLIC_FB_APP_ID,
};
const app = getApps().length ? getApps()[0] : initializeApp(cfg);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const envMissing = !process.env.NEXT_PUBLIC_FB_API_KEY;
