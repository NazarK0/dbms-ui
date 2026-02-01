import { TreeView } from './tree-view';
import ContentWindow from './content-window';

export default function DatabaseManager() {
  return (
    <div className="h-full flex flex-col">

      <div className="flex-1 flex overflow-hidden">
        <aside className="w-80 p-4 overflow-auto">
          <TreeView />
        </aside>

        <main className="flex-1 p-4 overflow-auto">
          <ContentWindow />
        </main>
      </div>
    </div>
  );
}