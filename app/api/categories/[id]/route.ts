import {db} from "@/lib/db";
import {categories} from "@/lib/db/schema";
import {eq} from "drizzle-orm";

export async function PUT(
 req:Request,
 {params}:{params:{id:string}}
){

const body=await req.json()

const result=
await db.update(categories)
.set({
 name:body.name
})
.where(
 eq(categories.id,params.id)
)
.returning()

return Response.json(result)
}

export async function DELETE(
req:Request,
{params}:{params:{id:string}}
){

await db.delete(categories)
.where(
eq(categories.id,params.id)
)

return Response.json({
success:true
})
}
