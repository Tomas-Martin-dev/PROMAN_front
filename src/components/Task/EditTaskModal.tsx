import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import TaskForm from './TaskForm';
import { useForm } from 'react-hook-form';
import { Task, TaskInitialType } from '../../types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { putTask } from '../../services/TaskAPI';
import { toast } from 'react-toastify';
import { formatErrorMessages } from '../../utils/apiErrorFormat';


type EditTaskModalProps = {
    data: Task
}
export default function EditTaskModal({data}: EditTaskModalProps) {
    const navigate = useNavigate();
    const [view, setView] = useState(false);
    const location = useLocation();
    useEffect(() => {
        if (location.search.includes("?editTask=")) {
            setView(true);
            return;
        }
        setView(false);
    }, [location.search]);


    const initialValues: TaskInitialType = {
        name: data.name,
        description: data.description,
    };
    const { register, handleSubmit, formState: { errors }, reset } = useForm<TaskInitialType>({ defaultValues: initialValues });
    
    const params = useParams();
    const projectId = params.projectID!;
    
    const queryParams = new URLSearchParams(location.search);
    const taskID =  queryParams.get("editTask")!;


    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: putTask,
        onError: (error) => {
            toast.error(formatErrorMessages(error));
        },
        onSuccess: (result) => {
            queryClient.invalidateQueries({queryKey:["editProject", projectId]})
            queryClient.invalidateQueries({queryKey:["projects"]})
            toast.success(result);
            reset();
            navigate("", { replace: true });
        },
    });

    const handleUpdateTask = (formData: TaskInitialType) => {
        const info = {formData, projectId, taskID};
        mutation.mutate(info);
    };

    return (
        <Transition appear show={view} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => { navigate("") }}>
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
                                <Dialog.Title
                                    as="h3"
                                    className="font-black text-4xl  my-5"
                                >
                                    Editar Tarea
                                </Dialog.Title>

                                <p className="text-xl font-bold">Realiza cambios a una tarea en {''}
                                    <span className="text-fuchsia-600">este formulario</span>
                                </p>

                                <form
                                    className="mt-10 space-y-3"
                                    noValidate
                                    onSubmit={handleSubmit(handleUpdateTask)}
                                >

                                    <TaskForm
                                        errors={errors}
                                        register={register}
                                    />

                                    <input
                                        type="submit"
                                        className=" rounded-md px-10 py-3 bg-purple-600 hover:bg-purple-700 text-white text-xl font-semibold transition-colors cursor-pointer w-full"
                                        value='Guardar Cambios'
                                    />
                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}