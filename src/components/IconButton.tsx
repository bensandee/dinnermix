"use client";
import { Icon } from "@/components";
import { MouseEventHandler } from "react";

export const IconButton = ({
  icon,
  onClick,
}: {
  icon: string;
  onClick: MouseEventHandler | undefined;
}) => {
  return (
    <button className="btn btn-ghost" onClick={onClick}>
      <Icon name={icon} />
    </button>
  );
};
