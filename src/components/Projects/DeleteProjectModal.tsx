import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from "react-hook-form";
import ErrorMessage from './ErrorMessage';
import { CheckPasswordForm } from '../../types';
import { toast } from 'react-toastify';
import { formatErrorMessages } from '../../utils/apiErrorFormat';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteProjectId } from '../../services/ProjectAPI';
import { checkPassword } from '../../services/AuthAPI';

export default function DeleteProjectModal() {
    const initialValues = {
        password: ''
    }
    const location = useLocation()
    const navigate = useNavigate()

    const queryParams = new URLSearchParams(location.search);
    const projectId = queryParams.get('deleteProject')!;
    const show = projectId ? true : false

    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })
    
    const handleClose = ()=> {
        navigate(location.pathname, { replace: true })
    }

    const queryClient = useQueryClient()
    const checkMutation = useMutation({
        mutationFn: checkPassword,
        onError: error => toast.error(error.message)
    })
    const deleteMutation = useMutation({
        mutationFn: deleteProjectId,
        onError: (error) => {
            toast.error(formatErrorMessages(error));
        },
        onSuccess: (result) => {
            queryClient.invalidateQueries({ queryKey: ["projects"] })
            toast.warn(result);
            handleClose()
        }
    })

    const handleForm = async (formData: CheckPasswordForm) => {
        await checkMutation.mutateAsync(formData);
        await deleteMutation.mutateAsync(projectId);
    }

    return (
        <Transition appear show={show} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={handleClose}>
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
                                >Eliminar Proyecto </Dialog.Title>

                                <p className="text-xl font-bold">Confirma la eliminación del proyecto {''}
                                    <span className="text-fuchsia-600">colocando tu password</span>
                                </p>

                                <form
                                    className="mt-10 space-y-5"
                                    onSubmit={handleSubmit(handleForm)}
                                    noValidate
                                >

                                    <div className="flex flex-col gap-1">
                                        <label
                                            className="font-bold text-lg"
                                            htmlFor="password"
                                        >Password</label>
                                        <input
                                            id="password"
                                            type="password"
                                            placeholder="Password Inicio de Sesión"
                                            className="w-full p-3  border-gray-300 border rounded-sm"
                                            {...register("password", {
                                                required: "El password es obligatorio",
                                            })}
                                        />
                                        {errors.password && (
                                            <ErrorMessage>{errors.password.message}</ErrorMessage>
                                        )}
                                    </div>

                                    <input
                                        type="submit"
                                        className="rounded-md px-10 py-3 bg-purple-600 hover:bg-purple-700 text-white text-xl font-semibold transition-colors cursor-pointer w-full"
                                        value='Eliminar Proyecto'
                                    />
                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}