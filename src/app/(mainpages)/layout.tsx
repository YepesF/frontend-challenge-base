import MobileNavBar from "@/components/mobile-nav-bar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className="h-full w-full">
      <MobileNavBar />
      <div className="h-full min-h-screen w-full">{children}</div>
    </div>
  );
}
