import SiteLayout from "./layout/SiteLayout";
import SignUp from "./pages/SignUp";

export function AppBase() {
  return (
    <SiteLayout>
      <SignUp />
    </SiteLayout>
  );
}

export default AppBase;
