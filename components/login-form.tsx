"use client";
import { HiMiniPaperAirplane } from "react-icons/hi2";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useFormState } from "react-dom";
import { signInCredentials } from "@/app/lib/actions/authActions";

export function LoginForm() {
  const [state, formAction] = useFormState(signInCredentials, null);

  return (
    <form action={formAction}>
      <Card className="mx-auto max-w-sm w-[350px]">
        <CardHeader>
          <div className="flex">
            <HiMiniPaperAirplane
              size={30}
              className="-rotate-45 text-blue-400 dark:text-blue-600"
            />
          </div>
          <span className="py-1"></span>
          <CardTitle className="text-2xl">Masuk</CardTitle>
          <CardDescription>
            {state?.message ? (
              <div className="flex flex-row w-full bg-red-400 dark:bg-red-300 opacity-70 dark:opacity-100 rounded-lg">
                <span className="px-4 py-2 text-black">{state?.message}</span>
              </div>
            ) : null}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Username</Label>
              <Input name="name" id="name" type="text" required />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input name="password" id="password" type="password" required />
            </div>
            <Button
              type="submit"
              className="w-full bg-blue-400 dark:bg-blue-600 hover:bg-blue-500 dark:hover:bg-blue-700 dark:text-white"
            >
              Login
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
