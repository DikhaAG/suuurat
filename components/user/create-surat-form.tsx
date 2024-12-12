"use client";

import { useState } from "react";
import { useFormState } from "react-dom";
import { kirim } from "@/app/lib/actions/surat/suratCreateActions";
import { UserModel } from "@/app/lib/models";

import {
  Form,
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";

export default function CreateSuratForm({ userData }: { userData: UserModel }) {
  const [authorId, setAuthorId] = useState<string>(userData.id);
  const [subject, setSubject] = useState<string>("");
  const [receiver, setReceiver] = useState<string>("");
  const [file, setFile] = useState<
    string | number | readonly string[] | undefined
  >();
  const [state, formAction] = useFormState(kirim, null);

  const form = useForm();

  return (
    <Form {...form}>
      <form
        action={formAction}
        className="space-y-6 w-full sm:w-4/5 md:w-1/2 lg:1/3 xl:w-1/4"
      >
        <FormItem hidden>
          <FormControl>
            <Input
              name="authorId"
              value={authorId}
              onChange={(e) => setAuthorId(e.target.value)}
            />
          </FormControl>
          <FormDescription>
            <span className="text-sm text-red-500 mt-2">
              {state?.error?.subject}
            </span>
          </FormDescription>
        </FormItem>
        <FormItem>
          <FormLabel>Subjek</FormLabel>
          <FormControl>
            <Input
              id="subject"
              name="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </FormControl>
          <FormDescription>
            <span className="text-sm text-red-500 mt-2">
              {state?.error?.subject}
            </span>
          </FormDescription>
        </FormItem>
        <FormItem>
          <FormLabel>Penerima</FormLabel>
          <FormControl>
            <Input
              id="receiver"
              name="receiver"
              value={receiver}
              onChange={(e) => setReceiver(e.target.value)}
            />
          </FormControl>
          <FormDescription>
            <span className="text-sm text-red-500 mt-2">
              {state?.error?.receiver}
            </span>
          </FormDescription>
        </FormItem>
        <FormItem>
          <FormLabel>Upload berkas</FormLabel>
          <FormControl>
            <Input
              id="file"
              name="file"
              type="file"
              value={file}
              onChange={(e) => setFile(e.target.value)}
            />
          </FormControl>
          <FormDescription className="flex flex-col">
            <span
              className="mt-1 text-sm text-gray-600 dark:text-gray-400"
              id="file_input_help"
            >
              PDF (MAX. 10MB).
            </span>
            {state?.error?.file !== undefined &&
              state.error.file.map((err) => (
                <span key={err} className="text-sm text-red-500 mt-2">
                  {err}
                </span>
              ))}
          </FormDescription>
        </FormItem>
        <div className="fixed sm:relative bottom-0 sm:bottom-auto right-0 sm:right-auto p-4 sm:p-0">
          <Button disabled={form.formState.isSubmitting} type="submit">
            Kirim
          </Button>
        </div>
      </form>
    </Form>
  );
}
