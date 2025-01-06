import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";

interface checkboxProps {
  handleChecked: (task: string) => void;
  task: string;
  index: number;
  tasks: string[];
}

const Checkbox: React.FC<checkboxProps> = ({
  index,
  handleChecked,
  task,
  tasks,
}) => {
  const [checked, setChecked] =
    useState<boolean>(false);

  return (
    <div
      className="flex items-center gap-2 text-sky-500 bg-white h-6 w-6 p-1 rounded-full"
      onClick={() => {
        handleChecked(task);
        setChecked(!checked);
      }}
    >
      {checked &&
      tasks.indexOf(task) === index ? (
        <FaCheck />
      ) : (
        " "
      )}
    </div>
  );
};

export default Checkbox;
