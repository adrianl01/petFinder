import { useAuth } from "@/src/components/auth/AuthProvider";
import AuthScreen from "@/src/components/screens/AuthScreen";
import ProfileScreen from "@/src/components/screens/ProfileScreen";

export default function Profile() {
  const { token } = useAuth();

  if (!token) {
    return <AuthScreen />;
  }

  return <ProfileScreen />;
}