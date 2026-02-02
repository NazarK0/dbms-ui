interface QueryCellProps {
  query: string;
}

export default function QueryCell({ query }: QueryCellProps) {

  return (
    <code className="text-sm text-slate-600 bg-slate-50 px-2 py-1 rounded">
      {query}
    </code>
  );
}
