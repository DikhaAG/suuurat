"use client";
import { kirim } from "@/app/lib/actions";
import { useFormState } from "react-dom";
import JustButton from "../utils/JustButton";

interface CreateFormInterface {
  authorId: string;
}
const CreateForm = ({ authorId }: CreateFormInterface) => {
  const [state, formAction] = useFormState(kirim, null);
  return (
    <form action={formAction} className="h-full">
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col gap-3 w-full sm:w-1/3">
          <div className="">
            <input
              className="hidden"
              type="text"
              name="authorId"
              id="authorId"
              value={authorId}
            />
          </div>
          <div className="py-1 flex flex-col">
            <div id="subject" className="">
              Subjek
            </div>
            <div className="relative mt-2 rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"></div>
              <input
                type={"text"}
                name={"subject"}
                id={"subject"}
                className="block w-full rounded-md border-0 py-1.5 pl-5 pr-5 text-gray-900 ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                placeholder={"subjek"}
              />
            </div>
            <div aria-live="polite" aria-atomic="true">
              <p className="text-sm text-red-500 mt-2">
                {state?.error?.subject}
              </p>
            </div>
          </div>
          <div className="py-1 flex flex-col">
            <div id="subject" className="">
              Tujuan
            </div>
            <div className="relative mt-2 rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"></div>
              <input
                type={"text"}
                name={"receiver"}
                id={"receiver"}
                className="block w-full rounded-md border-0 py-1.5 pl-5 pr-5 text-gray-900 ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                placeholder={"Tujuan"}
              />
            </div>
            <div aria-live="polite" aria-atomic="true">
              <p className="text-sm text-red-500 mt-2">
                {state?.error?.receiver}
              </p>
            </div>
          </div>
          <div className="flex flex-col">
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="file_input"
            >
              Upload file
            </label>
            <input
              className="block w-full text-sm px-1 py-0.5 text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-blue-400 dark:text-white focus:outline-none dark:bg-blue-400 dark:border-blue-300 dark:placeholder-white"
              aria-describedby="file_input_help"
              id="file"
              name="file"
              type="file"
            />
            <p
              className="mt-1 text-sm text-gray-600 dark:text-gray-400"
              id="file_input_help"
            >
              PDF (MAX. 10MB).
            </p>
            <div aria-live="polite" aria-atomic="true">
              <div className="flex flex-col place-content-between text-sm text-red-500 mt-2">
                {state?.error?.file?.map((f) => (
                  <>
                    <p className="">{f}</p>
                  </>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex place-self-end">
          <JustButton
            label="Kirim"
            labelPending="...mengirim"
            fontStyle="text-xl text-white"
            padding="py-2 px-4 sm:px-6"
            width="w-full"
            rounded="rounded-md"
          />
        </div>
      </div>
    </form>
  );
};

export default CreateForm;
