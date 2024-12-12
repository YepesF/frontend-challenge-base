import DesktopNavBar from "@/components/desktop-nav-bar copy";
import MobileNavBar from "@/components/mobile-nav-bar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className="h-full w-full">
      <DesktopNavBar />
      <div className="h-full min-h-screen w-full">{children}</div>
      <MobileNavBar />
    </div>
  );
}
