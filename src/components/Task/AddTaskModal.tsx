import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import TaskForm from "./TaskForm";
import { useForm } from "react-hook-form";
import { TaskInitialType } from "../../types";
import { createTaks } from "../../services/TaskAPI";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { formatErrorMessages } from "../../utils/apiErrorFormat";
import { toast } from "react-toastify";

export default function AddTaskModal() {
  const navigate = useNavigate();
  const params = useParams();
  const projectID = params.projectID!;

  const [addTask, setAddTask] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.search.includes("?newTask=true")) {
      setAddTask(true);
      return;
    }
    setAddTask(false);
  }, [location.search]);

  const initialValues: TaskInitialType = {
    name: "",
    description: "",
  };
  const {register, handleSubmit, formState: { errors }, reset} = useForm({ defaultValues: initialValues });
  
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createTaks,
    onError: (error) => {
      toast.error(formatErrorMessages(error));
    },
    onSuccess: (result) => {
      queryClient.invalidateQueries({queryKey: ["editProject", projectID]})
      toast.success(result);
      reset();
      navigate("", { replace: true });
    },
  });
    
  const handleCreateTask = (formData: TaskInitialType) => {
    const info = {
      formData,
      id: projectID
    };
    
    mutation.mutate(info);
  };

  return (
    <>
      <Transition appear show={addTask} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => {
            navigate("", { replace: true });
          }}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/60" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                  <Dialog.Title as="h3" className="font-black text-4xl my-2">
                    Nueva Tarea
                  </Dialog.Title>

                  <p className="text-xl font-bold">
                    Llena el formulario y crea {""}
                    <span className="text-fuchsia-600">una tarea</span>
                  </p>

                  <form
                    className="space-y-3 mt-4"
                    noValidate
                    onSubmit={handleSubmit(handleCreateTask)}
                  >
                    <TaskForm register={register} errors={errors} />

                    <input
                      type="submit"
                      value="Crear Tarea"
                      className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors rounded-sm"
                    />
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
