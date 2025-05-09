import { useParams } from "react-router-dom";
import { ProjectFullType, statusLeng, Task } from "../../types";
import DropTask from "./DropTask";
import TaskCard from "./TaskCard";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postStatus } from "../../services/TaskAPI";
import { toast } from "react-toastify";

type PropType = {
  data: ProjectFullType["tasks"];
  canEdit: boolean
};

type GroupedTask = {
  [key: string]: Task[];
};

const initialValuesGroup: GroupedTask = {
  pending: [],
  onHold: [],
  inProgress: [],
  underReview: [],
  completed: [],
};

const statusStyles: { [key: string]: string } = {
  pending: "border-t-slate-500",
  onHold: "border-t-red-500",
  inProgress: "border-t-blue-500",
  underReview: "border-t-amber-500",
  completed: "border-t-emerald-500",
};

export default function TaskDetails({ data, canEdit }: PropType) {
  const groupedTasks = data.reduce((acc, task) => {
    let currentGroup = acc[task.status] ? [...acc[task.status]] : [];
    currentGroup = [...currentGroup, task];
    return { ...acc, [task.status]: currentGroup };
  }, initialValuesGroup);

  const params = useParams();
  const projectId = params.projectID!;

  const queryClient = useQueryClient();
  const mutacion = useMutation({
    mutationFn: postStatus,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (result) => {
      toast.success(result)
      queryClient.invalidateQueries({ queryKey: ["editProject", projectId] })
    }
  });

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e
    if (over && over.id) {
      const taskID = active.id.toString();
      const status = over.id as Task["status"];
      mutacion.mutate({ projectId, taskID, status });

      queryClient.setQueryData(["editProject", projectId], (prevData: ProjectFullType) => {
        const updatedTask = prevData.tasks.map( task => {
          if (task._id === taskID) {
            return {
              ...task,
              status
            }
          }
          return task
        })
        return {
          ...prevData,
          task: updatedTask
        }
      })
    }
  }
  return (
    <>
      <h2 className="text-5xl font-black my-10">Tareas</h2>

      <div className="flex gap-5 overflow-x-scroll 2xl:overflow-auto pb-32">
        <DndContext onDragEnd={handleDragEnd}>
          {Object.entries(groupedTasks).map(([status, tasks]) => (
            <div key={status} className="min-w-[300px] 2xl:min-w-0 2xl:w-1/5">
              <h3
                className={`capitalize text-xl font-light border border-slate-300 bg-white p-3 border-t-8 ${statusStyles[status]}`}
              >{statusLeng[status]}
              </h3>

              <DropTask status={status} />

              <ul className="mt-5 space-y-5">
                {tasks.length === 0 ? (
                  <li className="text-gray-500 text-center pt-3">
                    No Hay tareas
                  </li>
                ) : (
                  tasks.map((task) => <TaskCard key={task._id} task={task} canEdit={canEdit} />)
                )}
              </ul>
            </div>
          ))}
        </DndContext>
      </div>
    </>
  );
}