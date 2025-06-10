import { type NextRequest } from 'next/server'

import { fetchCommander } from "@/services/commanderServices"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
    let commander = searchParams.get('commander')??"colorless";
    let data = await fetchCommander(commander);
    return Response.json(data);
}
