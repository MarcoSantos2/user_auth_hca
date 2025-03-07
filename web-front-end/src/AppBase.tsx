import SiteLayout from "./layout/SiteLayout";
import { BrowserRouter, Routes, Route  } from "react-router";
import { 
  SignIn, 
  Home, 
  CareGivers, 
  HealthProviders, 
  SignUp,
  Profile,
  Account,
  Dashboard,
  AcceptInvite,
  ResetPassword,
  ConfirmEmail, 
  Help
} from "./pages";
import { AuthProvider } from "./context";

export function AppBase() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <SiteLayout>
          <Routes>
            <Route index element={<Home />} />
            <Route path="/care_givers" element={<CareGivers />} />
            <Route path="/health_providers" element={<HealthProviders />} />
            <Route path="/sign_in" element={<SignIn />} />
            <Route path="/sign_up" element={<SignUp />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/account" element={<Account />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/accept-invite" element={<AcceptInvite />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/confirm-email" element={<ConfirmEmail />} />
            <Route path="/help" element={<Help />} />
          </Routes>
        </SiteLayout>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default AppBase;
