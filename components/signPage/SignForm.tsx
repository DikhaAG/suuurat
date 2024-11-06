"use client";
import { useState } from "react";
import InputForm from "../utils/InputForm";
import JustButton from "../utils/JustButton";
import { useFormState } from "react-dom";
import { signInCredentials } from "@/app/lib/actions";

const SignForm = () => {
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [state, formAction] = useFormState(signInCredentials, null);
  return (
    <div className="">
      <form action={formAction}>
        {state?.message ? (
          <div className="flex flex-row w-full bg-red-200 rounded-lg">
            <span className="px-4 py-4 text-gray-600">{state?.message}</span>
          </div>
        ) : null}
        <InputForm
          name="name"
          value={name}
          setStateValue={setName}
          placeholder="Nama"
          type="text"
        />
        <InputForm
          name="password"
          value={password}
          setStateValue={setPassword}
          placeholder="Password"
          type="password"
        />
        <div className="mt-8 mb-2">
          <JustButton
            label="Masuk"
            labelPending="..."
            fontStyle="text-xl text-white"
            padding="py-2"
            width="w-full"
            rounded="rounded-md"
          />
        </div>
      </form>
    </div>
  );
};

export default SignForm;
