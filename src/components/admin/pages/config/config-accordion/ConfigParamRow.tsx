import { TableRow } from '../../../../ui/table';
import {
  ParamNameCell,
  ParamValueCell,
  ParamDefaultCell,
  ParamDescriptionCell,
  ParamRestartCell,
} from './cells';
import type { ConfigParamRowProps } from './types';

export default function ConfigParamRow({ param, onParamChange }: ConfigParamRowProps) {
  const isModified = param.value !== param.defaultValue;

  return (
    <TableRow className={isModified ? 'bg-lime-50/50' : ''}>
      <ParamNameCell param={param} />
      <ParamValueCell param={param} onParamChange={onParamChange} />
      <ParamDefaultCell param={param} />
      <ParamDescriptionCell param={param} />
      <ParamRestartCell param={param} />
    </TableRow>
  );
}
