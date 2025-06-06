import { type NextRequest } from 'next/server'

import { fetchCommander } from "@/services/commanderServices"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const limit = parseInt(searchParams.get('limit') ?? "10");
  let data = await fetchCommander(limit);
  return Response.json(data);
}
