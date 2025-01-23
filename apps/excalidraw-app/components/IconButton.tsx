"use client";
import React, { ReactNode } from "react";

const IconButton = ({
  icon,
  onClick,
  isActivated
}: {
  icon: ReactNode;
  onClick?: () => void;
  isActivated:boolean
}) => {
  return (
    <div onClick={onClick} className={`cursor-pointer rounded-full p-2  bg-transparent hover:bg-gray-800 ${isActivated ? "text-red-500" : "text-white"}`}>
      {icon}
    </div>
  );
};

export default IconButton;
