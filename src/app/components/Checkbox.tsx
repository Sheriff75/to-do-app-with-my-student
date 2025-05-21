import React from 'react';

type Task = {
  id: number;
  title: string;
  completed: boolean;
};

export default function Checkbox({ task, handleChecked }: { task: Task, handleChecked: (task: Task) => void }) {
  return (
    <input
      type="checkbox"
      checked={task.completed}
      onChange={() => handleChecked(task)}
    />
  );
}