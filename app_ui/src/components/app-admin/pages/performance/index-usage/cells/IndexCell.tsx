interface IndexCellProps {
  index: string;
}

export default function IndexCell({ index }: IndexCellProps) {

  return (
    <code className="text-sm text-slate-600 bg-slate-50 px-2 py-1 rounded">
      {index}
    </code>
  );
}
