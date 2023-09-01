import { ComponentPropsWithoutRef } from "react";

type ButtonProps = ComponentPropsWithoutRef<"button">;

export const Button = (props: ButtonProps) => {
  return (
    <button
      className="bg-white text-black hover:bg-blue-500 rounded py-4 px-16"
      {...props}
    >
      {props.children}
    </button>
  );
};
