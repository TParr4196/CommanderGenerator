import { type NextRequest } from 'next/server'

import {fetchColor} from "@/services/commanderServices"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  let color = searchParams.get('color')??"colorless";
  color = color?.split(" ").join("-")
  if(color=="sans-white"){
    color = "glint-eye"
  } else if(color=="sans-blue"){
    color = "dune-brood"
  } else if(color=="sans-black"){
    color = "ink-treader"
  } else if(color=="sans-red"){
    color = "witch-maw"
  } else if(color=="sans-green"){
    color = "yore-tiller"
  }

  console.log(color)
  let data = await fetchColor(color);
  return Response.json(data);
}
