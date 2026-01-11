export interface ActiveConnectionsWidgetData {
  id: number;
  name: string;
  user?: string;
  status: 'АКТИВНИЙ' | 'ОЧІКУЄ';
  duration: string;
  requests: number;
}
