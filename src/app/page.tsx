"use client";
import { useState, useEffect } from "react";
import EditModal from "./components/EditModal";
import Checkbox from "./components/Checkbox";

export default function Home() {
  const [tasks, setTasks] = useState<string[]>(
    []
  );
  const [filter, setFilter] = useState<string[]>(
    []
  );
  const [filterType, setFilterType] =
    useState<string>("all");
  const [completed, setCompleted] = useState<
    string[]
  >([]);

  useEffect(() => {
    if (filterType === "completed") {
        setFilter(completed);
    } else { 
        setFilter(tasks);
    }
}, [tasks, filterType]); 

  const switchFilterCompleted = () => {
    setFilterType("completed");
    console.log("complter")
  };
  const switchFilterAll = () => {
    setFilterType("all");
    console.log("all")

    
  };

  const [editingIndex, setEditingIndex] =
    useState<number>(-1);
  const [editTask, setEditTask] =
    useState<boolean>(false);

  let newTask: string[] = [];
  const handleAddTask = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    const form = e.target as HTMLFormElement;
    const input = form
      .children[0] as HTMLInputElement;
    e.preventDefault();
    newTask = [...tasks, input.value];
    setTasks(newTask);
    form.reset();
  };

  const handleEditTask = (task: string) => {
    setEditTask(true);
    setEditingIndex(tasks.indexOf(task));
  };

  const handleSaveTask = (task: string) => {
    const updatedTasks = [...tasks];
    updatedTasks[editingIndex] = task;
    setTasks(updatedTasks);
    setEditTask(false);
  };

  const handleChecked = (task: string) => {
    const compTask = tasks.filter(
      (t) => t === task
    );
    const totalCompTasks = [
      ...completed,
      ...compTask,
    ];
    setCompleted(totalCompTasks);
    newTask = tasks.filter((t) => t !== task);
    setTasks(newTask);
  };

  return (
    <div className="App flex flex-col gap-5 items-center p-10 bg-[#0ea4e9a1] h-screen text-white">
      <h1 className="text-3xl font-bold font-serif">
        To-do-app
      </h1>
      <div className="flex flex-col items-center relative p-10 pt-5 shadow-lg shadow-black bg-sky-500 rounded-lg">
        <div
          className="flex flex-row text-xl
        justify-start gap-1 w-full"
        >
          <button
            className=" hover:underline no-underline p-1 duration-150 "
            onClick={switchFilterAll}
          >
            {" "}
            All
          </button>
          <button
            className=" hover:underline no-underline p-1 duration-150"
            onClick={switchFilterCompleted}
          >
            Completed
          </button>
        </div>
        <form
          className="flex gap-2 w-full"
          onSubmit={handleAddTask}
        >
          <input
            type="text"
            className="p-2 px-4 capitalize w-[80%] rounded-lg focus:outline-none  text-sky-500 "
          />
          <button
            className="px-4 p-2 rounded-lg bg-slate-600 focus:outline-none "
            type="submit"
          >
            Add
          </button>
        </form>
        <div className="tasks flex flex-col justify-between  w-full items-center gap-2 mt-5">
          {filter.map((task, index: number) => (
            <div
              key={task + index}
              className="flex items-center gap-2 "
            >
              <Checkbox
                handleChecked={handleChecked}
                index={index}
                tasks={tasks}
                task={task}
              />
              <h1 className="w-fit min-w-[180px] uppercase font-semibold">
                {task}
              </h1>
              <button
                className="px-4 p-2 rounded-lg bg-slate-600 focus:outline-none"
                onClick={() => {
                  console.log(tasks);
                  newTask = tasks.filter(
                    (t: string) => t !== task
                  );
                  setTasks(newTask);
                }}
              >
                Delete
              </button>
              <button
                className="px-4 p-2 rounded-lg bg-slate-600 focus:outline-none"
                onClick={() => {
                  handleEditTask(task);
                }}
              >
                Edit
              </button>
              <div>
                {editTask && (
                  <EditModal
                    task={task}
                    handleSaveTask={
                      handleSaveTask
                    }
                    setEditTask={setEditTask}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
