export type WidgetCategory = 'statistic' | 'performance' | 'activity';

export interface WidgetData {
  id: number;
  category: WidgetCategory;
  categoryTitle: string;
  title: string;
  description: string;
}

export interface WidgetCardData extends WidgetData {
  visible: boolean;
}

export interface CustomizeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
