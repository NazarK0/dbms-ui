import { useState, lazy, Suspense } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../ui/card';
import { Button } from '../../../ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../../../ui/collapsible';
import { getDatabaseToolsSections, defaultOpenSections } from './databaseToolsSections';
import { SkeletonTable } from '../../../ui/skeletons';

interface DatabaseToolsViewProps {
  selectedDatabase: string;
  activeSubTab?: string;
  onSubTabChange?: (tab: string) => void;
}

// Loading fallback for sections
function SectionLoading() {
  return <SkeletonTable rows={5} columns={4} />;
}

export default function DatabaseToolsView({
  selectedDatabase,
}: DatabaseToolsViewProps) {
  // Track which sections are open
  const [openSections, setOpenSections] = useState<Record<string, boolean>>(defaultOpenSections);

  const toggleSection = (sectionId: string) => {
    setOpenSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const sections = getDatabaseToolsSections(selectedDatabase);

  return (
    <div className="space-y-4">
      {sections.map((section) => {
        const Icon = section.icon;
        const isOpen = openSections[section.id];

        return (
          <Collapsible
            key={section.id}
            open={isOpen}
            onOpenChange={() => toggleSection(section.id)}
          >
            <Card className="border-slate-200 shadow-sm">
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-slate-50/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-lime-500 to-green-600 rounded-lg flex items-center justify-center">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-slate-900">{section.title}</CardTitle>
                        <CardDescription>{section.description}</CardDescription>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="shrink-0">
                      {isOpen ? (
                        <ChevronUp className="w-5 h-5 text-slate-600" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-slate-600" />
                      )}
                    </Button>
                  </div>
                </CardHeader>
              </CollapsibleTrigger>

              <CollapsibleContent>
                <CardContent className="pt-0">
                  <Suspense fallback={<SectionLoading />}>
                    {section.component}
                  </Suspense>
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>
        );
      })}
    </div>
  );
}