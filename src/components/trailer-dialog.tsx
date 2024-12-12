"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ReactPlayer from "react-player";

interface ITrailerDialogProps {
  children: React.ReactNode;
  url: string;
}

export default function TrailerDialog({
  children,
  url,
}: ITrailerDialogProps): JSX.Element {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="aspect-video overflow-hidden rounded-lg border p-0 shadow-md">
        <DialogHeader className="hidden">
          <DialogTitle></DialogTitle>
        </DialogHeader>
        <div className="aspect-video">
          <ReactPlayer
            url={url}
            controls
            playing={true}
            height="100%"
            width="100%"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
