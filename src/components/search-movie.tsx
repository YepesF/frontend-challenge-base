"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "./ui/button";
import { useState } from "react";
import { MagnifyingGlassIcon } from "./icons";
import { Input } from "./ui/input";
import useParams from "@/hooks/useParams";

interface ISearchMovieProps {
  children: React.ReactNode;
}

export default function SearchMovie({
  children,
}: ISearchMovieProps): JSX.Element {
  const { updateParam } = useParams();
  const [query, setQuery] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    updateParam("query", query);
    setQuery("");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="rounded-lg border p-0 shadow-md md:min-w-[450px]">
        <DialogHeader className="hidden">
          <DialogTitle></DialogTitle>
        </DialogHeader>
        <form className="mb-0" onSubmit={handleSubmit}>
          <div className="relative flex items-center">
            <MagnifyingGlassIcon
              type="outline"
              className="absolute left-2 size-5"
            />
            <Input
              type="text"
              placeholder="Type your movie and press Enter"
              className="pl-8"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <DialogClose asChild>
            <Button
              className="hidden"
              type="submit"
              variant="ghost"
              size="icon"
            >
              Close
            </Button>
          </DialogClose>
        </form>
        <Command className="">
          <CommandList>
            <CommandGroup heading="Recent searches">
              <CommandItem>
                <span>Calendar</span>
              </CommandItem>
              <CommandItem>
                <span>Search Emoji</span>
              </CommandItem>
              <CommandItem disabled>
                <span>Calculator</span>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
