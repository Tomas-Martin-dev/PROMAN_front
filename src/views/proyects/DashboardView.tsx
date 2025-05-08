import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { deleteProjectId, getProjects } from "../../services/ProjectAPI";
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import { formatErrorMessages } from "../../utils/apiErrorFormat";
import { toast } from "react-toastify";
import { useAuth } from "../../hooks/useAuth";
import { isManager } from "../../utils/policeies";


export default function DashboardView() {

  const { data: userLogin, isLoading: authLoading } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects
  })

  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: deleteProjectId,
    onError: (error) => {
      toast.error(formatErrorMessages(error));
    },
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ["projects"] })
      toast.warn(result);
    }
  })

  if (isLoading && authLoading) return "Cargando...."
  
  if (data && userLogin)return (
    <>
      <h1 className="text-5xl font-black">Mis Proyecto</h1>

      <p className="text-2xl font-light text-gray-600 mt-3">Maneja y Administra tus proyectos</p>

      <nav className="my-8">
        <Link
          className="rounded-md px-10 py-3 bg-purple-600 hover:bg-purple-700 text-white text-lg font-semibold transition-colors cursor-pointer"
          to={"projects/create"}
        >Nuevo Proyecto
        </Link>
      </nav>

      <div>
        {data.length ? (
          <>
            <ul role="list" className="divide-y divide-gray-100 border border-gray-100 bg-white shadow-lg">
              {data.map((project) => (
                <li key={project._id} className="flex justify-between gap-x-6 px-5 py-10">
                  <div className="flex min-w-0 gap-x-4">
                    <div className="min-w-0 flex-auto space-y-2">
                      <div>
                        { isManager(project.manager, userLogin._id) ? 
                          <p className="font-medium text-sm uppercase bg-indigo-50 text-indigo-500 border-2 border-indigo-500 rounded-lg inline-block py-1 px-5">Manager</p> : 
                          <p className="font-medium text-sm uppercase bg-emerald-50 text-emerald-500 border-2 border-emerald-500 rounded-lg inline-block py-1 px-5">Colaborador</p>
                        }
                      </div>
                      <Link to={`/projects/${project._id}`}
                        className="text-gray-600 cursor-pointer hover:underline text-3xl font-bold"
                      >{project.projectName}
                      </Link>
                      <p className="text-sm text-gray-400">
                        Cliente: {project.clientName}
                      </p>
                      <p className="text-sm text-gray-400">
                        {project.descrption}
                      </p>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-x-6">
                    <Menu as="div" className="relative flex-none">
                      <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                        <span className="sr-only">opciones</span>
                        <EllipsisVerticalIcon className="h-9 w-9" aria-hidden="true" />
                      </Menu.Button>
                      <Transition as={Fragment} enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95">
                        <Menu.Items
                          className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg py-2 px-1.5 ring-1 ring-gray-900/5 focus:outline-none"
                        >
                          <Menu.Item>
                            <Link to={`/projects/${project._id}`}
                              className='block px-3 py-1 text-sm leading-6 text-gray-900 rounded-sm hover:bg-gray-50 transition-colors'>
                              Ver Proyecto
                            </Link>
                          </Menu.Item>
                          {isManager(project.manager, userLogin._id) && (
                            <>
                              <Menu.Item>
                                <Link to={`/projects/${project._id}/edit`}
                                  className='block px-3 py-1 text-sm leading-6 text-gray-900 rounded-sm hover:bg-gray-50 transition-colors'>
                                  Editar Proyecto
                                </Link>
                              </Menu.Item>
                              <Menu.Item>
                                <button
                                  type='button'
                                  className='block px-3 py-1 text-sm leading-6 text-red-500 cursor-pointer rounded-sm hover:bg-gray-50 transition-colors w-full text-left'
                                  onClick={() => { mutation.mutate(project._id) }}
                                >
                                  Eliminar Proyecto
                                </button>
                              </Menu.Item>
                            </>
                          )}
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <>
            <p>No Tienes Proyectos - {""}
              <Link
                to={"projects/create"}
                className="text-blue-600 font-semibold"
              >Crear Proyecto</Link>
            </p>
          </>
        )}
      </div>
    </>
  )
}
