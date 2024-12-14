"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ValidationStageModel } from "@/app/lib/models";
import SelectItemValidator from "./select-item-validator";
import { insertValidator } from "@/app/lib/actions/userValidatorActions";
import { useEffect, useState } from "react";
import { getSystemSettingByName } from "@/app/lib/actions/systemActions";

const FormSchema = z.object({
  validatorId: z.string(),
});

export function DataValidationStageInsertValidatorDialog({
  validationStageData,
}: {
  validationStageData: ValidationStageModel;
}) {
  const [isFixed, setIsFixed] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      validatorId: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const res = await insertValidator(validationStageData.id, data.validatorId);
    if (res) {
      toast({
        title: "Berhasil menyimpan data sebagai berikut:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md p-4">
            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
      });
      window.location.reload();
    } else {
      toast({
        title: "Gagal menyimpan data",
      });
    }
  }
  useEffect(() => {
    getSystemSettingByName("validationStageFixed").then((res) =>
      setIsFixed(res!.status),
    );
  }, []);
  return (
    <Dialog>
      <DialogTrigger asChild disabled={isFixed}>
        <Button variant="ghost">Pilih Validator</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader hidden>
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6"
          >
            <FormField
              control={form.control}
              name="validatorId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Validator</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectItemValidator
                      validationStageId={validationStageData.id}
                    />
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" className="">
                Simpan
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
