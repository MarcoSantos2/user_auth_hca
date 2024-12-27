import SiteLayout from "./layout/SiteLayout";
import SignIn from "./pages/SignIn";

export function AppBase() {
  return (
    <SiteLayout>
      {/* TODO: Implement Routing Navegation */}
      <SignIn />
    </SiteLayout>
  );
}

export default AppBase;
