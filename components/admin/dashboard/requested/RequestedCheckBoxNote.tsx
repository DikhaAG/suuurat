"use client";

import { useState } from "react";

const RequestedCheckBoxNote = () => {
  const [checkBoxNote, setCheckBoxNote] = useState<boolean>(false);
  return (
    <div className="flex flex-col gap-3">
      <div className="text-start">
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={checkBoxNote}
            onChange={() => setCheckBoxNote(!checkBoxNote)}
            className="sr-only peer"
          />
          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          <span className="ms-3 text-sm font-medium">
            Tambah catatan {checkBoxNote}
          </span>
        </label>
      </div>
      <div className={`${checkBoxNote ? "visible" : "hidden"}`}>
        <input
          type={"text"}
          name={"note"}
          id={"note"}
          className="block w-full rounded-md border-0 py-1.5 pl-5 pr-5 text-gray-900 ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
        />
      </div>
    </div>
  );
};

export default RequestedCheckBoxNote;
