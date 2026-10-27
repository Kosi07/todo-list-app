import { auth } from "@/lib/auth"
import { MongoClient, ObjectId } from "mongodb"
import { headers } from "next/headers"

export const client = new MongoClient(process.env.MONGODB_URI as string)
export const db = client.db('app')

export async function POST(req: Request){
    const session = await auth.api.getSession({
        headers: await headers()
    })

    try{
        if(!session){
            return Response.json(
                { error: 'Must be signed in to add tasks' }, 
                { status: 401 }
            )
        }

        const userId = session.user.id

        const {taskText, taskStatus} = await req.json()

        //Save task
        const result = await db.collection('tasks').insertOne({
            taskText,
            taskStatus,
            userId,
            createdAt: new Date(),
        })

        return Response.json(
            {
                success: true,
                id: result.insertedId,
            }
        )
    }
    catch(err){
        console.error('Error saving task', err)
        return Response.json(
            { error: 'Failed to add task' }, 
            { status: 500 }
        );
    }
}

export async function GET() {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    try{
        if(!session){
            return Response.json(
                { error: 'Must be signed in to view tasks' }, 
                { status: 401 }
            )
        }

        const email = session.user.email

        //Get Tasks
        const tasks = await db.collection('tasks')
                                .find({email: email}, 

                                    { 
                                        projection: { 
                                                        _id: 1,
                                                        taskText: 1,
                                                        taskStatus: 1
                                                    } 
                                    }
                                )
                                .toArray();
        
        return Response.json(tasks);
    }
    catch(err){
        console.error('Error fetching tasks from MongoDB', err)

        return Response.json(
            { error: 'Failed to fetch tasks' },
            { status: 500 }
        )
    }
}

export async function PATCH(req: Request){
    const session = await auth.api.getSession({
        headers: await headers()
    })

    try{
        if(!session){
            return Response.json(
                { error: 'Not signed in' }, 
                { status: 401 }
            )
        }

        const {_id, taskStatus} = await req.json()

        //Update taskStatus
        if(taskStatus==='in-progress'){
            await db.collection('tasks')
                        .updateOne({_id: new ObjectId(_id)}, 
                            { $set:{taskStatus: 'done'} }
                        )
        }
        else if(taskStatus==='done'){
            await db.collection('tasks')
                        .updateOne({_id: new ObjectId(_id)}, 
                            { $set:{taskStatus: 'in-progress'} }
                        )
        }
        else{
            return Response.json(
                {error: 'Task was not updated in MongoDB'}
            )
        }

        return Response.json(
            {
                success: true,
            }
        )
    }
    catch(err){
        console.error('Error updating taskStatus', err)
        return Response.json(
            { error: 'Failed to update taskStatus of task' }, 
            { status: 500 }
        );
    }
}

export async function DELETE(req: Request){
    const session = await auth.api.getSession({
        headers: await headers()
    })

    try{
        if(!session){
            return Response.json(
                { error: 'Not signed in' }, 
                { status: 401 }
            )
        }

        const {_id } = await req.json()

        //Delete task
        await db.collection('tasks')
                    .deleteOne({_id: new ObjectId(_id)})

        return Response.json(
            {
                success: true,
            }
        )
    }
    catch(err){
        console.error('Error deleting task', err)
        return Response.json(
            { error: 'Failed to delete task' }, 
            { status: 500 }
        );
    }
}