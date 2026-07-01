"use client"
import { useAuth } from "@/src/components/auth/AuthProvider";
import AuthScreen from "@/src/components/screens/AuthScreen";
import ProfileScreen from "@/src/components/screens/ProfileScreen";
import { Metadata } from "next";

export const metadata: Metadata = { title: 'Profile' };

export default function Profile() {
  const { token } = useAuth();

  if (!token) {
    return <AuthScreen />;
  }

  return <ProfileScreen />;
}