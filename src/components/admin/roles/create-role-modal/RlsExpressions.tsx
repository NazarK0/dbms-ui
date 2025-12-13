import { Textarea } from '../../../ui/textarea';
import { Label } from '../../../ui/label';
import { labels, placeholders, hints } from './data';
import type { RlsExpressionsProps } from './types';

export default function RlsExpressions({
  tableName,
  policy,
  onPolicyChange,
}: RlsExpressionsProps) {
  return (
    <>
      <div>
        <Label
          htmlFor={`${tableName}-using`}
          className="text-sm text-slate-700 mb-2 block"
        >
          {labels.usingExpression}
        </Label>
        <Textarea
          id={`${tableName}-using`}
          value={policy.using}
          onChange={(e) => onPolicyChange({ using: e.target.value })}
          placeholder={placeholders.usingExpression}
          className="font-mono text-sm"
          rows={2}
        />
        <p className="text-xs text-slate-500 mt-1">{hints.usingExpression}</p>
      </div>

      <div>
        <Label
          htmlFor={`${tableName}-check`}
          className="text-sm text-slate-700 mb-2 block"
        >
          {labels.withCheckExpression}
        </Label>
        <Textarea
          id={`${tableName}-check`}
          value={policy.withCheck}
          onChange={(e) => onPolicyChange({ withCheck: e.target.value })}
          placeholder={placeholders.withCheckExpression}
          className="font-mono text-sm"
          rows={2}
        />
        <p className="text-xs text-slate-500 mt-1">
          {hints.withCheckExpression}
        </p>
      </div>
    </>
  );
}
