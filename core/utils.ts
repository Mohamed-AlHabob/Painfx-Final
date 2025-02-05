import { Platform } from "react-native";
import ProfileImage from "../assets/images/avatar.png";
import { API_URL } from "./config";


export function log(...args: any[]) {
  args.forEach((arg) => {
    if (typeof arg === "object") {
      arg = JSON.stringify(arg, null, 2);
    }
    console.log(`[${Platform.OS}]`, arg);
  });
}

export function thumbnail(url: string | null) {
  if (!url) {
    return ProfileImage;
  }
  return { uri: `http://${API_URL}${url}` };
}

export function formatTime(date: string | null): string {
  if (date === null) {
    return "-";
  }

  const now = new Date();
  const secondsElapsed = Math.abs(now.getTime() - new Date(date).getTime()) / 1000;

  if (secondsElapsed < 60) {
    return "now";
  }
  if (secondsElapsed < 3600) {
    return `${Math.floor(secondsElapsed / 60)}m ago`;
  }
  if (secondsElapsed < 86400) {
    return `${Math.floor(secondsElapsed / 3600)}h ago`;
  }
  if (secondsElapsed < 604800) {
    return `${Math.floor(secondsElapsed / 86400)}d ago`;
  }
  if (secondsElapsed < 2419200) {
    return `${Math.floor(secondsElapsed / 604800)}w ago`;
  }

  return `${Math.floor(secondsElapsed / 31536000)}y ago`;
}
