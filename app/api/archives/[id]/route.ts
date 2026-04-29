import { db } from "@/lib/db";
import { archives } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest } from "next/server";

export async function PUT(
req: NextRequest,
context: {
 params: Promise<{ id:string }>
}
){

const { id } = await context.params;

const body = await req.json();

const result =
await db
.update(archives)
.set({
 title: body.title,
 description: body.description,
 status: body.status,
 updatedAt:new Date()
})
.where(
 eq(archives.id,id)
)
.returning();

return Response.json(result);

}


export async function DELETE(
req: NextRequest,
context:{
 params: Promise<{id:string}>
}
){

const { id } = await context.params;

await db
.delete(archives)
.where(
 eq(archives.id,id)
);

return Response.json({
 success:true
});

}
