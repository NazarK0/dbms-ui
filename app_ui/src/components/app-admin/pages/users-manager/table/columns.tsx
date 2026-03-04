import { ColumnConfig } from "../../../../global/table";
import {StatusCell} from "./cells";


import { UserEntry } from "./types";
import UserAvatar from "./UserAvatar";

const columns: ColumnConfig<UserEntry> = [
    {
        key: "userName",
        header: "Ім'я",
        width: "60px",
        render: (row) => (<UserAvatar 
                  avatar={row.avatar}
                  name={row.userName}
                />),
    },
    {
        key: "nickName",
        header: "Псевдонім",
        render: (row) => <span className="text-slate-600 text-sm font-mono">{row.nickName}</span>,
    },
    {
        key: "organizationUnit",
        header: "Організаційна одиниця",
        render: (row) => <span className="text-slate-600 text-sm font-mono">{row.organizationUnit}</span>,
    },
    {
        key: "timezone",
        header: "Часова зона",
        render: (row) => <span className="text-slate-600 text-sm font-mono">{row.timezone}</span>,
    },
    {
        key: "registrationDate",
        header: "Дата реєстрації",
        render: (row) => <span className="text-slate-600 text-sm font-mono">{row.registrationDate}</span>,
    },
    {
        key: "lastActiveDate",
        header: "Остання активність",
        render: (row) => <span className="text-slate-600 text-sm font-mono">{row.lastActiveDate}</span>,
    },
    {
        key: "status",
        header: "Статус",
        render: (row) => <StatusCell status={row.status} />,
    },
];

export default columns;