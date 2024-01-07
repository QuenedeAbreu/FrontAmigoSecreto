import { SearchResult } from "@/types/SearchResult";

type Props = {
  results: SearchResult;
}

export default function SearchReveal({ results }: Props) {
  return (
    <div className="">
      <p className="text-3xl">{results.people.name}</p>
      <p className="text-2xl my-3">Parabéns, você tirou:</p>
      <p className="text-4xl text-white bg-blue-800 
      my-5 px-5 py-20 rounded-lg border-2 
      border-dashed border-blue-300">
        {results.peopleMatch.name}</p>
    </div>
  )

}