import { SuratNoteModel } from "@/app/lib/models";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { TableCell } from "@/components/ui/table";

export default function NotesViewDialog({
  notes,
}: {
  notes: SuratNoteModel[] | null;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <DropdownMenuItem
          onSelect={(e) => e.preventDefault()}
          className="cursor-pointer"
        >
          Catatan
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Catatan</DialogTitle>
        </DialogHeader>
        {notes && notes?.length !== 0 ? (
          <ScrollArea className="h-72 w-full rounded-md">
            <div className="p-4">
              {notes.map((note, index) => (
                <div key={note.id} className="mb-6">
                  <div key={note.id} className="flex flex-col">
                    <div className="flex flex-col">
                      <div className="">
                        <Badge>{note.author.name}</Badge>
                      </div>
                      <div className="p-4 rounded-md mt-2 bg-slate-200 dark:bg-slate-800">
                        {note.message}
                      </div>
                    </div>
                  </div>
                  {index !== notes.length - 1 && <Separator className="my-2" />}
                </div>
              ))}
            </div>
          </ScrollArea>
        ) : (
          <div className="text-center h-52">
            <TableCell className="text-center h-52">
              Tidak ada catatan.
            </TableCell>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
