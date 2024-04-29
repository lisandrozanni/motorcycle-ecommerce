import { createLead } from '@/app/lib/data';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const data = await req.json();
  const payload = data.body;

  const response = await createLead(payload);

  return Response.json(response);
}
