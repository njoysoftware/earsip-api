import {db} from "@/lib/db";
import {archives} from "@/lib/db/schema";
import {ilike} from "drizzle-orm";

export async function POST(
req:Request
){
const body=await req.json()

const data=
await db.select()
.from(archives)
.where(
 ilike(
 archives.title,
 `%${body.keyword}%`
 )
)

return Response.json(data)
}
