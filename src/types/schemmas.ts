import z from "zod"

export const userSchemma = z.object({
    email: z.string(),
    name: z.string(),
    _id: z.string()
})

export const initialProject = z.object({
    _id: z.string(),
    projectName: z.string(),
    clientName: z.string(),
    descrption: z.string(),
    manager: z.string(userSchemma.pick({_id: true})),
})    

export const projectsSchemma = z.array(initialProject)

// NOTES
export const noteSchemma = z.object({
    _id: z.string(),
    content: z.string(),
    createdBy: userSchemma,
    task: z.string(),
    createdAt: z.string()
}) 

// TASK
const taskStatusSchemma = z.enum(["pending", "onHold", "inProgress", "underReview", "completed"])

export const taskSchemma = z.object({
    _id: z.string(),
    name: z.string(),
    project: z.string(),
    description: z.string(),
    status: taskStatusSchemma
})

export const taskSchemmaFull = z.object({
    _id: z.string(),
    name: z.string(),
    project: z.string(),
    description: z.string(),
    status: taskStatusSchemma,
    createdAt: z.string(),
    updatedAt: z.string(),
    completedBy: z.array(z.object({
        _id: z.string(),
        user: userSchemma,
        status: taskStatusSchemma
    })),
    notes: z.array(noteSchemma)
})

export const projectFullSchemma = initialProject.extend({
    tasks: z.array(taskSchemma)
})


/* Auth && Users */

export const authSchemma = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    password_confirmation: z.string(),
    token: z.string(),
});


export const usersSchemma = z.array(userSchemma);

