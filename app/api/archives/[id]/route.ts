import {db} from "@/lib/db";
import {archives} from "@/lib/db/schema";
import {eq} from "drizzle-orm";

export async function PUT(
req:Request,
{params}:{params:{id:string}}
){

const body=await req.json()

const data=
await db.update(archives)
.set({
title:body.title,
description:body.description,
status:body.status,
updatedAt:new Date()
})
.where(
eq(archives.id,params.id)
)
.returning()

return Response.json(data)
}

export async function DELETE(
req:Request,
{params}:{params:{id:string}}
){

await db.delete(archives)
.where(
eq(archives.id,params.id)
)

return Response.json({
success:true
})
}
