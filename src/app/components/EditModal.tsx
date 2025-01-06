import React,{useState} from "react";

interface EditModalProps {
  task: string;
  setEditTask: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  handleSaveTask: (task: string) => void;
}


const EditModal: React.FC<EditModalProps> = ({
  task,
  handleSaveTask,
  setEditTask
}) => {

  const [editedTask, setEditedTask] = useState<string>(
    task
  );

  const handleSave = () => {
    handleSaveTask(editedTask);
    setEditTask(false);

  };
  return (
    <div
      className="text-sky-500 absolute top-0 h-full  items-center justify-center left-0 flex
      backdrop-blur-sm p-5 w-full gap-2 "
    >
      <input
        type="text"
        placeholder={task}
        onFocus={(e)=> e.target.value = task}
        onChange={(e) => {
          setEditedTask(e.target.value);
        }}
        className="p-2 px-4 capitalize placeholder:text-sky-500 w-[80%]
         rounded-lg border-2 bg-slate-50  text-sky-500"
      />
      <button
        className="px-4 p-2 rounded-lg bg-slate-600
       focus:outline-none"
        onClick={() => {
          handleSave()
        }}
      >
        Save
      </button>
    </div>
  );
};

export default EditModal;
