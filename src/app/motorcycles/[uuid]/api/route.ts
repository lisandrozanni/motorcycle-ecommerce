import { NextRequest } from "next/server";
import { createLead } from "@/app/lib/data";

export async function POST(req: NextRequest) {
  const payload = await req.json();

  const response = await createLead(payload);

  return Response.json(response);
}
