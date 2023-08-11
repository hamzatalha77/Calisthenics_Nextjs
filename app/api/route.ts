import { NextResponse } from "next/server";
import {exercises, db} from "./db";


type Data = {
  name: string;
};

export async function GET(req: Request) {
  const data = await exercises.find({}).toArray();
  return NextResponse.json(data);
}
