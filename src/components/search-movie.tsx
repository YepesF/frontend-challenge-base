"use client";

import useParams from "@/hooks/useParams";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { FormEvent, useState } from "react";
import { SheetClose } from "./ui/sheet";

export default function SearchMovie(): JSX.Element {
  const { updateParam } = useParams();
  const [query, setQuery] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    updateParam("query", query);
    updateParam("page", "1");
  };

  return (
    <form className="flex gap-2" onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <SheetClose asChild>
        <Button variant="outline" size="icon" type="submit">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </Button>
      </SheetClose>
    </form>
  );
}
