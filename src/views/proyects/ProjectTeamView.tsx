import { Link, useLocation, useNavigate } from "react-router-dom";
import AddMemberModal from "../../components/Members/AddMemberModal";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Fragment } from "react/jsx-runtime";
import { deleteMemberTeam, getMembersTeam } from "../../services/MembersAPI";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function ProjectTeamView() {
    const navigate = useNavigate();
    const location = useLocation();

    const params = useParams()
    const projectId = params.projectID!

    const { data, isLoading, isError } = useQuery({
        queryKey: ["members", projectId],
        queryFn: () => getMembersTeam(projectId),
        retry: false
    })

    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: deleteMemberTeam,
        onError: (error)=>{
            toast.error(error.message)
        },
        onSuccess: (result)=>{
            toast.success(result),
            queryClient.invalidateQueries({queryKey: ["members", projectId]})
        }
    })

    const handleClick = (memberId: string)=>{
        const info = {
            projectId,
            memberId
        }
        mutation.mutate(info)
    }
    
    if(isLoading) return "Cargando..."
    if(isError) return "EROR!!!!"
    if (data) return (
        <>
            <h1 className="text-5xl font-bold">Administrar Equipo</h1>
            <p className="text-2xl font-light mt-3 text-gray-600">Administre el equipo de trabajo para este proyecto</p>

            <nav className="my-5 flex gap-3">
                <button
                    className="rounded-md px-10 py-3 bg-purple-600 hover:bg-purple-700 text-white text-lg font-semibold transition-colors cursor-pointer"
                    type="button"
                    onClick={() => navigate("?addMember=true")}
                >Agregar Colaborador
                </button>
                <Link
                    to={location.pathname.replace(/\/team$/, "")}
                    className="rounded-md px-10 py-3 bg-sky-700 hover:bg-sky-800 text-white text-lg font-semibold transition-colors cursor-pointer"
                >Volver al Proyecto
                </Link>
            </nav>

            <h2 className="text-5xl font-bold my-10">Miembros actuales</h2>
            
            {data?.length ? (
                <ul role="list" className="divide-y divide-gray-100 border border-gray-100 mt-10 bg-white shadow-lg">
                    {data.map((member) => (
                        <li className="flex justify-between gap-x-6 px-5 py-10" key={member._id}>
                            <div className="flex min-w-0 gap-x-4">
                                <div className="min-w-0 flex-auto space-y-2">
                                    <p className="text-2xl font-black text-gray-600">{member.name}</p>
                                    <p className="text-sm text-gray-400">{member.email}</p>
                                </div>
                            </div>
                            <div className="flex shrink-0 items-center gap-x-6">
                                <Menu as="div" className="relative flex-none">
                                    <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                                        <span className="sr-only">opciones</span>
                                        <EllipsisVerticalIcon className="h-9 w-9" aria-hidden="true" />
                                    </Menu.Button>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-2 px-1.5 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                                            <Menu.Item>
                                                <button
                                                    onClick={()=> handleClick(member._id)}
                                                    type='button'
                                                    className='block text-sm leading-6 px-2 py-1 text-red-500 w-full text-left hover:bg-gray-50 rounded-sm transition-colors cursor-pointer'
                                                >Eliminar del Proyecto
                                                </button>
                                            </Menu.Item>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className='text-center py-20'>No hay miembros en este equipo</p>
            )}

            <AddMemberModal />
        </>
    )
}
