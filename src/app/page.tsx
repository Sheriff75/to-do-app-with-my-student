"use client";
import { useState, useEffect } from "react";
import EditModal from "./components/EditModal";
import Checkbox from "./components/Checkbox";
import { Box, Stack } from "@mui/system";
import { TextField, Typography} from "@mui/material";


export default function Home() {
  type Task = {
  id: number;
  title: string;
  completed: boolean;
};

  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<Task[]>([]);
  const [filterType, setFilterType] = useState<string>("all");
  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
  if (filterType === "completed") {
    setFilter(tasks.filter(task => task.completed));
  } else if (filterType === "all") {
    setFilter(tasks.filter(task => !task.completed)); // Only incomplete tasks
  }
}, [tasks, filterType]);

  const switchFilterCompleted = () => {
    setFilterType("completed");
  };

  const switchFilterAll = () => {
    setFilterType("all");
    
  };

  const [editingIndex, setEditingIndex] =
    useState<number>(-1);
  const [editTask, setEditTask] =
    useState<boolean>(false);


  const handleAddTask = async (
  e: React.FormEvent<HTMLFormElement>
) => {
  e.preventDefault();
  if (!inputValue.trim()) return;
  await fetch('/api/tasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: inputValue }),
  });
  setInputValue('');
  // Refetch tasks from backend
  fetch('/api/tasks')
    .then(res => res.json())
    .then(data => setTasks(data));
};

  const handleEditTask = (task: Task) => {
    setEditTask(true);
    setEditingIndex(tasks.indexOf(task));
  };

  const handleSaveTask = async (task: Task) => {
  await fetch('/api/tasks', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: task.id, title: task.title }),
  });
  // Refetch tasks from backend
  fetch('/api/tasks')
    .then(res => res.json())
    .then(data => setTasks(data));
  setEditTask(false);
};

  const handleChecked = async (task: Task) => {
  await fetch('/api/tasks', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: task.id, completed: !task.completed }),
  });
  // Refetch tasks from backend
  fetch('/api/tasks')
    .then(res => res.json())
    .then(data => setTasks(data));
};

  return (
    <Box 
    sx = {{
      display: 'flex', flexDirection: 'column', gap: '5px', alignItems: 'center', padding: '10px', backgroundColor: 'rgb(128, 125, 125)', minWidth: {xs: '100%', md: '100%'}, minHeight: '100vh', color: 'white'
    }}
    className="App flex flex-col gap-5 items-center p-10 bg-[#0ea4e9a1] h-screen text-white">
      <h1 className="text-3xl font-bold font-serif">
        To-do-app
      </h1>
      <Box
       sx = {{display: 'flex', flexDirection: 'column', position: 'relative', padding: '10px', paddingTop: '5px', boxShadow: '0 0 10px black', backgroundColor: 'rgb(0,0,0)', borderRadius: '10px', mt: '1rem', width: {md: '100%'}}}>
        <Stack direction={"row"}
        sx={{ display: 'flex', fontSize: {xs: '16px', md: '24px'}, gap: {xs: '10px', md: '20px'}, justifyContent: {xs: 'center', md: 'start'}, marginBottom: {xs: '15px', md: '30px'}, marginLeft: {xs: '0', md: '40px'}}}
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
        </Stack>
        <form
          className="flex flex-col gap-2 items-center"
          onSubmit={handleAddTask}
        >
          <TextField size = {"small"}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            type="text"
            sx ={{backgroundColor: 'white', margin: '0', width: {md: '90%', xs: '100%'}, padding: '4px', px: '6px', textTransform: 'capitalize', borderRadius: '10px', fontSize: {xs: '14px', md: '20px'}, color: 'black'}}
            className=" focus:outline-none text-sky-500 "
          />
          <button
            className="px-4 p-2 rounded-lg bg-slate-600 focus:outline-none text-[13px] md:text-[16px] w-[100px]"
            type="submit"
          >
            Add
          </button>
        </form>
        <Box
        sx = {{display: 'flex', flexDirection: 'column', gap: '20px', justifyContent: 'space-between', maxWidth: {xs: '100%', md: '100%'}, marginTop: '30px'}}>
          
      {filter.length === 0 ? (
          <Typography sx={{ fontSize: {xs: '12px', md: '16px'}}}>No tasks found.</Typography >
          ) : (
          filter.map((task: Task) => (
            <Box
            sx = {{display: 'flex', alignItems: 'center', gap: '12px'}}
              key={task.id}
              className = "flex item-left"
            >
              <Checkbox
                handleChecked={handleChecked}
                task={task}
              />
              <Typography flexWrap = {"wrap"} align={"left"}
              sx={{wordWrap: 'break-word', fontSize: {xs: '14px', md: '18px'}}}
              className="w-fit max-w-[120px] md:max-w-[80%] capitalize font-semibold">
                {task.title}
              </Typography>
              <button
                className="px-1 md:px-4 p-2 rounded-lg bg-slate-600 focus:outline-none text-[13px] md:text-[16px]"
                onClick={async () => {
                await fetch('/api/tasks', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: task.id }),
                });
                fetch('/api/tasks')
                .then(res => res.json())
                .then(data => setTasks(data));
                  }}
                >
                Delete
              </button>
              <button
                className="px-1 md:px-4 p-2 rounded-lg bg-slate-600 focus:outline-none text-[13px] md:text-[16px]"
                onClick={() => {
                  handleEditTask(task);
                }}
              >
                Edit
              </button>
              <div>
                {editTask && editingIndex === tasks.indexOf(task) && (
                <EditModal
                task={task}
                handleSaveTask={handleSaveTask}
                setEditTask={setEditTask}
                />
              )}
              </div>
            </Box>
          ))
          )}
        </Box>
      </Box>
    </Box>
  );
}
