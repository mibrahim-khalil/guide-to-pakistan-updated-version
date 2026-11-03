import { Outlet } from "react-router-dom";
import SiteHeader from "../shared/components/SiteHeader";
import SiteFooter from "../shared/components/SiteFooter";

export default function PublicLayout() {
  return (
    <div
      className="appShell"
      style={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        overflow: "visible",
      }}
    >
      <SiteHeader />

      <main
        className="appMain"
        style={{
          flex: "1 0 auto",
          overflow: "visible",
          minHeight: 0,
        }}
      >
        <Outlet />
      </main>

      <SiteFooter />
    </div>
  );
}