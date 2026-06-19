import AuthScreen from "@/src/components/AuthScreen";
import ProfileScreen from "@/src/components/screens/ProfileScreen";
import { getToken } from "@/src/lib/storage/token"
export default function Profile() {

  // if (!getToken()) {
  //   return <AuthScreen />;
  // }

  return <ProfileScreen />;
}