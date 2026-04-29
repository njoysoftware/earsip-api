import {NextRequest} from "next/server";
import {db} from "@/lib/db";
import {categories} from "@/lib/db/schema";
import {eq} from "drizzle-orm";

export async function PUT(
req:NextRequest,
context:{
 params:Promise<{id:string}>
}
){

const {id}=await context.params;
const body=await req.json();

const result=
await db.update(categories)
.set({
 name:body.name
})
.where(
eq(categories.id,id)
)
.returning();

return Response.json(result);
}


export async function DELETE(
req:NextRequest,
context:{
 params:Promise<{id:string}>
}
){

const {id}=await context.params;

await db.delete(categories)
.where(
eq(categories.id,id)
);

return Response.json({
success:true
});

}
