import { NextRequest } from "next/server";
import { createLead } from "@/app/lib/data";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const payload = data.body;

  const response = await createLead(payload);

  return Response.json(response);
}
