import Image from "next/image";
import Menu from "./menu";

export default function NavBar(): JSX.Element {
  return (
    <div className="sticky top-0 z-10 flex h-10 w-full items-center justify-between bg-black px-3 py-1">
      <div className="relative h-7 w-40">
        <Image src="/Logo.png" alt="logo" fill />
      </div>
      <Menu />
    </div>
  );
}
