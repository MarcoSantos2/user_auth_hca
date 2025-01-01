import SiteLayout from "./layout/SiteLayout";
import SignIn from "./pages/SignIn";

export function AppBase() {
  return (
    <SiteLayout>
      {/* TODO: Implement Routing Navigation */}
      <SignIn />
    </SiteLayout>
  );
}

export default AppBase;
