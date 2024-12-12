"use client";
import { HiMiniPaperAirplane } from "react-icons/hi2";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

import Link from "next/link";
import { z } from "zod";
// import { registerSchema } from "@/app/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createUser } from "@/app/lib/actions/userActions";

const registerSchema = z
  .object({
    name: z.string().min(4).max(50),
    password: z.string().min(4),
    confirmPassword: z.string().min(4),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["confirmPassword"],
      });
    }
  });

export default function RegisterForm() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    try {
      const resJSON = await createUser(values);
      const res = JSON.parse(resJSON);
      if (res.status) {
        toast({
          title: "Berhasil mendaftarkan akun!",
          description: "Silahkan login.",
        });
      } else {
        toast({
          title: "Nama sudah digunakan di akun lain!",
          description: "Silahkan gunakan nama yang berbeda.",
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Gagal mendaftarkan akun!",
        description: "Ada masalah pada server, coba lagi",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card className="mx-auto max-w-sm w-[350px]">
          <CardHeader>
            <div className="flex">
              <HiMiniPaperAirplane
                size={30}
                className="-rotate-45 text-blue-400 dark:text-blue-600"
              />
            </div>
            <span className="py-1"></span>
            <CardTitle className="text-2xl">Daftar</CardTitle>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription className="text-red-500">
                    {form.formState.errors.name?.message}
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormDescription className="text-red-500">
                    {form.formState.errors.password?.message}
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Konfirmasi Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormDescription className="text-red-500">
                    {form.formState.errors.confirmPassword?.message}
                  </FormDescription>
                </FormItem>
              )}
            />
            <Button
              disabled={form.formState.isSubmitting}
              type="submit"
              className="bg-blue-600 text-white hover:bg-blue-700 mt-2 w-full"
            >
              Daftar
            </Button>
          </CardContent>
          <CardFooter>
            Sudah memiliki akun?
            <Link href={"/sign"} className="text-blue-500 mx-2">
              Login
            </Link>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
