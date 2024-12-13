"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { ChevronLeftIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface IBackButtonProps {
  variant: "rounded" | "primary";
}

export default function BackButton({ variant }: IBackButtonProps): JSX.Element {
  const router = useRouter();

  return (
    <Button
      className={cn(
        "rounded-full border-transparent bg-secondary text-white transition hover:scale-[1.03] hover:bg-accent hover:text-white",
        variant === "primary" && "w-40 bg-accent font-bold hover:bg-accent/95",
      )}
      variant="outline"
      size="icon"
      onClick={() => router.back()}
    >
      {variant === "primary" ? "Back" : <ChevronLeftIcon type="outline" />}
    </Button>
  );
}
