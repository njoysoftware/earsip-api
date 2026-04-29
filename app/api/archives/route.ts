import {db} from "@/lib/db";
import {
archives,
auditLogs
} from "@/lib/db/schema";

export async function POST(
req:Request
){

const body=await req.json()

const result=
await db.insert(archives)
.values({
 title:body.title,
 description:body.description,
 categoryId:body.categoryId,
 driveFileId:body.driveFileId,
 driveViewLink:body.driveViewLink,
 mimeType:body.mimeType,
 size:body.size,
 userId:body.userId
})
.returning()


await db.insert(auditLogs)
.values({
 userId:body.userId,
 action:"UPLOAD",
 details:"Upload arsip",
 entityId:result[0].id
})

return Response.json(result)
}


export async function GET(){

const rows=
await db.select()
.from(archives)

return Response.json(rows)
}
