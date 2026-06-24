"use client"
import { useAuth } from "@/src/components/auth/AuthProvider";
import AuthScreen from "@/src/components/screens/AuthScreen";
import ReportScreen from "@/src/components/screens/ReportScreen";

export default function Home() {
    const { token } = useAuth();

    if (!token) {
    return <AuthScreen />;
  }

  return <ReportScreen />;
}