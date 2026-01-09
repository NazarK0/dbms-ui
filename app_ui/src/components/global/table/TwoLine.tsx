interface TwoLineProps {
    title: string;
    subtitle?: string;
}

export default function TwoLine({ title, subtitle }: TwoLineProps) {
    return (
        <div>
            <div className="font-medium">{title}</div>
            {subtitle && <div className="text-sm text-muted-foreground">{subtitle}</div>}
        </div>
    );
}