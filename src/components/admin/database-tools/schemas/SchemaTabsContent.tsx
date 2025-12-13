import { TabsContent } from '../../../ui/tabs';
import TableBrowser from '../TableBrowser';
import FunctionsManager from '../FunctionsManager';
import TriggersRules from '../TriggersRules';
import ForeignTablesManager from '../ForeignTablesManager';
import DataTypesManager from '../DataTypesManager';

interface SchemaTabsContentProps {
  selectedDatabase: string;
}

export default function SchemaTabsContent({ selectedDatabase }: SchemaTabsContentProps) {
  return (
    <>
      <TabsContent value="tables">
        <TableBrowser selectedDatabase={selectedDatabase} />
      </TabsContent>
      
      <TabsContent value="views">
        <TableBrowser selectedDatabase={selectedDatabase} />
      </TabsContent>
      
      <TabsContent value="functions">
        <FunctionsManager selectedDatabase={selectedDatabase} />
      </TabsContent>
      
      <TabsContent value="triggers">
        <TriggersRules selectedDatabase={selectedDatabase} />
      </TabsContent>
      
      <TabsContent value="foreign-tables">
        <ForeignTablesManager selectedDatabase={selectedDatabase} />
      </TabsContent>
      
      <TabsContent value="data-types">
        <DataTypesManager selectedDatabase={selectedDatabase} />
      </TabsContent>
    </>
  );
}
