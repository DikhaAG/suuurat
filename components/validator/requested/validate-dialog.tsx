"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SuratModel } from "@/app/lib/models";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { validateSurat } from "@/app/lib/actions";

const formSchema = z.object({
  suratId: z.string(),
  validatorId: z.string(),
  validationStageTitle: z.number(),
  note: z.string().optional(),
});

export default function ValidateDialog({ surat }: { surat: SuratModel }) {
  const [toggle, setToggle] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { note: "" },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res = await validateSurat(
      values.suratId,
      values.note!,
      values.validationStageTitle,
      values.validatorId,
    );
    console.log(res);
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full bg-blue-400 hover:bg-blue-500">
          Validasi
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Validasi Surat</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when youre done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormItem>
              <FormLabel>Subjek</FormLabel>
              <FormControl>
                <Input disabled value={surat.subject} />
              </FormControl>
            </FormItem>
            <FormItem>
              <FormLabel>Penulis</FormLabel>
              <FormControl>
                <Input disabled value={surat.author.name} />
              </FormControl>
            </FormItem>
            <FormItem>
              <FormLabel>Penerima</FormLabel>
              <FormControl>
                <Input disabled value={surat.receiver} />
              </FormControl>
            </FormItem>
            <FormField
              control={form.control}
              name="suratId"
              defaultValue={surat.id}
              render={({ field }) => (
                <FormItem hidden>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="validationStageTitle"
              defaultValue={surat.validationStage?.title}
              render={({ field }) => (
                <FormItem hidden>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="validatorId"
              defaultValue={surat.validationStage?.validator?.id}
              render={({ field }) => (
                <FormItem hidden>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormItem>
              <FormLabel>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="airplane-mode"
                    checked={toggle}
                    onCheckedChange={() => setToggle(!toggle)}
                  />
                  <Label htmlFor="airplane-mode">Catatan</Label>
                </div>
              </FormLabel>
            </FormItem>
            {toggle && (
              <FormField
                control={form.control}
                name="note"
                defaultValue=""
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Catatan</FormLabel>
                    <FormControl>
                      <Textarea {...field} id="message" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <DialogFooter>
              <Button disabled={form.formState.isSubmitting} type="submit">
                Validasi
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
