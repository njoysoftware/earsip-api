import {db} from "@/lib/db";
import {categories} from "@/lib/db/schema";
import {eq} from "drizzle-orm";

function auth(req:Request){
 return req.headers.get("x-api-key")
 === process.env.API_KEY
}

export async function POST(req:Request){

 if(!auth(req))
 return Response.json(
 {error:"Unauthorized"},
 {status:401}
 )

 const body=await req.json()

 const result=await db
 .insert(categories)
 .values({
   name:body.name,
   folderId:body.folderId,
   userId:body.userId
 })
 .returning()

 return Response.json(result)
}

export async function GET(){

 const data=await db.select()
 .from(categories)

 return Response.json(data)
}
