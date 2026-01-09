/**
 * TitleOverlay Component
 * Role name overlay at bottom of card
 */

interface TitleOverlayProps {
  name: string;
}

export default function TitleOverlay({ name }: TitleOverlayProps) {
  return (
    <div className="absolute bottom-2 left-2 right-2 z-10">
      <div className="bg-white/90 backdrop-blur-sm rounded px-2 py-1 shadow-sm">
        <h4 className="text-[11px] text-slate-900 line-clamp-2 leading-tight font-medium text-center">
          {name}
        </h4>
      </div>
    </div>
  );
}
