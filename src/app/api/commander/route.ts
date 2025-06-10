import { type NextRequest } from 'next/server'

import { fetchCommander } from "@/services/commanderServices"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
    const commander = searchParams.get('commander')??"colorless";
    const data = await fetchCommander(commander);
    return Response.json(data);
}
