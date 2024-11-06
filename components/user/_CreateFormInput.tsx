"use client"

import { useState } from "react";

interface CreateFormInputProps {
    children: React.ReactNode,
    name: string,
    type: string,
    placeholder: string
}
const CreateFormInput = ({
    children,
    type,
    name,
    placeholder
}: CreateFormInputProps) => {
    const [value, setValue] = useState<string>()
  return (
    <div className="py-1 flex flex-col">
      <div id="subject" className="">
        {children}{value}
      </div>
      <div className="relative mt-2 rounded-md shadow-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"></div>
        <input
          required
          type={type}
          name={name}
          id={name}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="block w-full rounded-md border-0 py-1.5 pl-5 pr-5 text-gray-900 ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};

export default CreateFormInput