import { LucideIcon } from "lucide-react";

interface StatCardProps {
    title: string;
    icon: LucideIcon;
    value: number;
}

export default function StatCard({ title, icon: Icon, value }: StatCardProps) {
    return (
        <div className="border border-slate-200 rounded-lg p-4 bg-slate-50/50">
            <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-lime-600 rounded-lg flex items-center justify-center">
                    <Icon className="w-5 h-5 text-white" />
                </div>
                <div>
                    <p className="text-slate-600 text-sm">{title}</p>
                    <p className="text-2xl text-slate-900">{value}</p>
                </div>
            </div>
        </div>
    );
}