import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Navigate, useLocation, useNavigate, useParams, } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getTaskId, postStatus } from "../../services/TaskAPI";
import { toast } from "react-toastify";
import { formatDate } from "../../utils/formatFecha";
import { statusLeng, Task } from "../../types";
import NotesPanel from "../Notes/NotesPanel";

export default function TaskModalDetails() {
  const [view, setView] = useState(false);
  const location = useLocation();
  useEffect(() => {
    if (location.search.includes("?viewTask=")) {
      setView(true);
      return;
    }
    setView(false);
  }, [location.search]);

  const navigate = useNavigate();

  const params = useParams();
  const projectId = params.projectID!;

  const queryParams = new URLSearchParams(location.search);
  const taskID = queryParams.get("viewTask")!;

  const { data, isError } = useQuery({
    queryKey: ["task", taskID],
    queryFn: () => getTaskId(projectId, taskID),
    enabled: !!taskID,
    retry: false
  })

  const queryClient = useQueryClient();
  const mutacion = useMutation({
    mutationFn: postStatus,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (result) => {
      toast.success(result)
      queryClient.invalidateQueries({ queryKey: ["task", taskID] })
      queryClient.invalidateQueries({ queryKey: ["editProject", projectId] })
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const status = e.target.value as Task["status"];
    const data = { status, projectId, taskID };
    mutacion.mutate(data)
  }
  if (isError) {
    toast.error("Tarea no encontrada", { toastId: "error" });
    return <Navigate to={`/projects/${projectId}`} />
  }
  if (data) return (
    <>
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
                  <p className="text-sm text-slate-400">Agregada el: {formatDate(data.createdAt)}</p>
                  
                  <p className="text-sm text-slate-400">
                    Última actualización:{formatDate(data.updatedAt)}
                  </p>
                  
                  <Dialog.Title
                    as="h3"
                    className="font-black text-4xl text-slate-600 my-2"
                  >{data.name}
                  </Dialog.Title>
                  
                  <p className="text-lg mb-2">
                    <span className="font-medium text-slate-600">Descripción: {" "}</span> 
                    {data.description}
                  </p>

                  {data.completedBy.length ? (
                    <>
                      <p className="text-xl text-slate-500">Historias de Cambios:</p>

                      <ul className="list-decimal">
                        {data.completedBy.map( act => (
                          <li key={act._id}>
                            <span className="font-bold text-slate-600">
                              {statusLeng[act.status]}
                            </span>{" "} por: {act.user.name}
                          </li>
                        ) )}
                      </ul>
                    </>
                  ) : <p className="text-slate-600">No hay cambios recientes...</p> }

                  <div className="my-3">
                    <label className="font-bold">Estado Actual: {statusLeng[data.status]}</label>
                    <select
                      className="w-full p-3 bg-white border border-gray-300 mt-1"
                      defaultValue={data.status}
                      onChange={handleChange}
                    >
                      {Object.entries(statusLeng).map(([key, value]) => (
                        <option value={key} key={key}>{value}</option>
                      ))}
                    </select>
                  </div>
                  <NotesPanel notes={data.notes}/>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
