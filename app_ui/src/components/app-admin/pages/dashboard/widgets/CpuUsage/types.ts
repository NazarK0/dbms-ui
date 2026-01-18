import { IntClosedRange } from "type-fest";

export interface CpuUsageWidgetData {
  value: IntClosedRange<0, 100>;
}
