import AuthScreen from "@/src/components/screens/AuthScreen";
import ReportScreen from "@/src/components/screens/ReportScreen";
import { getToken } from "@/src/lib/storage/token"


export default function Home() {

    if (!getToken()) {
    return <AuthScreen />;
  }

  return <ReportScreen />;
}