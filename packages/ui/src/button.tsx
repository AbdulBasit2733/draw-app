"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  variant:"primary" | "secondary",
  size: "lg" | "sm",
  onClick?:() => void
}

export const Button = ({ children, className,variant,size,onClick }: ButtonProps) => {
  return (
    <button
      className={`${className}`}
      onClick={() => alert(`Hello from your app!`)}
    >
      {children}
    </button>
  );
};
