import NavBar from "@/components/nav-bar";
import RootLayout from "./layout";
import Image from "next/image";

export default function Home(): JSX.Element {
  return (
    <RootLayout>
      <NavBar />
      <div className="relative flex aspect-video items-center justify-center lg:aspect-[4/1]">
        <Image
          src="/bannerr.jpeg"
          alt="banner"
          fill
          style={{
            filter: "drop-shadow(0 0 5px rgba(0, 0, 0, 5))",
            maskImage: "linear-gradient(black 60%, transparent)",
          }}
        />
        <div className="absolute bottom-0 p-2 text-white">
          <h2 className="text-xl font-bold lg:text-4xl">Kung Fu Panda 4</h2>
          <p className="text-sm font-bold lg:w-1/3 lg:text-xl">
            Join Po and the Furious Five on a new epic adventure! Discover the
            power of friendship and the strength within! Get ready to unleash
            your inner warrior! 🥋✨
          </p>
        </div>
      </div>
    </RootLayout>
  );
}
