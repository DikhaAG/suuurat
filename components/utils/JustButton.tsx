"use client"
import clsx from "clsx";
import { MouseEventHandler } from "react";
import { useFormStatus } from "react-dom";

interface JustButtonProps {
  label: string;
  labelPending: string;
  padding: string;
  fontStyle: string;
  width: string;
  rounded: string;
  onClickAction?: MouseEventHandler<HTMLButtonElement> | undefined
}

const JustButton = ({
  onClickAction,
  label,
  labelPending,
  padding,
  fontStyle,
  width,
  rounded,
}: JustButtonProps) => {
  const { pending } = useFormStatus();
  return (
    <div className="">
      <button
      onClick={onClickAction}
        type="submit"
        disabled={pending}
        className={clsx(
          `${padding} ${fontStyle} ${width} ${rounded} bg-blue-400 hover:bg-blue-500 transition-all ease-in-out hover:scale-105 hover:shadow-lg`,
          {
            "opacity-50 cursor-progress": pending,
          }
        )}
      >
        {pending ? labelPending : label}
      </button>
    </div>
  );
};

export default JustButton;
