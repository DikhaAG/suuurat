import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
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
import { Input } from "@/components/ui/input";

const FormSchema = z.object({
  validationStageId: z.string(),
  validatorId: z.string(),
});

export function DataValidationStageInsertValidatorDialog({
  validationStageData,
}: {
  validationStageData: ValidationStageModel;
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost">Pilih Validator</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6"
          >
            <FormField
              control={form.control}
              name="validationStageId"
              render={({ field }) => (
                <FormItem hidden>
                  <Input {...field} value={validationStageData.id} />
                </FormItem>
              )}
            />
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
                    <SelectItemValidator />
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="">
              Simpann
            </Button>
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
