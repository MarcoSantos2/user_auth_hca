import SiteLayout from "./layout/SiteLayout";
import { BrowserRouter, Routes, Route  } from "react-router";
import { SignIn, Home, CareGivers, HealthProviders, SignUp } from "./pages";
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
          </Routes>
        </SiteLayout>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default AppBase;
