import { ComponentPropsWithoutRef } from "react";

type ButtonProps = ComponentPropsWithoutRef<"button">;

export const Button = (props: ButtonProps) => {
  return (
    <button className="btn" {...props}>
      {props.children}
    </button>
  );
};
