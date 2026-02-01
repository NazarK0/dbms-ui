import { useState } from 'react';
import {
    ChevronRight,
    ChevronDown,
    LucideIcon,
    StarIcon,
    Table,
    View,
    DatabaseIcon,
    LanguagesIcon,
    ZapIcon,
    PuzzleIcon,
    BlocksIcon,
    CogIcon,
    GitForkIcon
} from 'lucide-react';

export interface TreeNode {
    id: string;
    parentId?: string;
    name: string;
    group?: {
        icon: LucideIcon;
        children: TreeNode[];
    }
    leaf?: {
        type: 'text' | 'image' | 'code' | 'json' | 'default';
    }
}


interface Database {
    id: string;
    name: string;
    schemas: DatabaseSchema[];
    extensions: [];
    languages: [];
    eventTriggers: [];

}

interface DatabaseSchema {
    name: string;
    tables: DatabaseTable[];
    views: DatabaseView[];
}

interface DatabaseTable {
    name: string;
}

interface DatabaseView {
    name: string;
}





const databaseTreeTemplate = (db: Database): TreeNode => {
    return {
        id: db.id,
        name: db.name,
        group: {
            icon: DatabaseIcon,
            children: [
                {
                    id: `${db.id}-schemas`,
                    name: 'Schemas',
                    group: {
                        icon: BlocksIcon,
                        children: db.schemas.map((schema) => ({
                            id: `${db.id}-schema-${schema.name}`,
                            name: schema.name,
                            group: {
                                icon: StarIcon,
                                children: [
                                    {
                                        id: `${db.id}-schema-${schema.name}-tables`,
                                        name: 'tables',
                                        group: {
                                            icon: Table,
                                            children: schema.tables.map((table) => ({
                                                id: `${db.id}-schema-${schema.name}-table-${table.name}`,
                                                name: table.name,
                                                leaf: {
                                                    type: 'default'
                                                }
                                            }))
                                        }
                                    },
                                    {
                                        id: `${db.id}-schema-${schema.name}-views`,
                                        name: 'views',
                                        group: {
                                            icon: View,
                                            children: schema.views.map((view) => ({
                                                id: `${db.id}-schema-${schema.name}-view-${view.name}`,
                                                name: view.name,
                                                leaf: {
                                                    type: 'default'
                                                }
                                            }))
                                        }
                                    }
                                ]
                            }
                        }))
                    }
                },
                {
                    id: `${db.id}-extensions`,
                    name: 'Extensions',
                    group: {
                        icon: PuzzleIcon,
                        children: db.extensions
                    }
                },
                {
                    id: `${db.id}-languages`,
                    name: 'Languages',
                    group: {
                        icon: LanguagesIcon,
                        children: db.languages
                    }
                },
                {
                    id: `${db.id}-event_triggers`,
                    name: 'Event Triggers',
                    group: {
                        icon: ZapIcon,
                        children: db.eventTriggers
                    }
                },

            ]
        }
    }
}



interface TreeNodeProps {
    node: TreeNode;
    level?: number;
}

function TreeNodeComponent({ node, level = 0 }: TreeNodeProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const hasChildren = node.group?.children && node.group.children.length > 0;


    const handleToggle = () => {
        if (hasChildren) {
            setIsExpanded(!isExpanded);
        }
    };

    return (
        <div>
            <div
                className="flex items-center gap-1 px-2 py-1.5 hover:bg-gray-100 cursor-pointer rounded-md transition-colors"
                style={{ paddingLeft: `${level * 20 + 8}px` }}
                onClick={handleToggle}
            >
                <div className="w-4 h-4 flex items-center justify-center">
                    {hasChildren && (
                        isExpanded ? (
                            <ChevronDown className="w-4 h-4 text-gray-600" />
                        ) : (
                            <ChevronRight className="w-4 h-4 text-gray-600" />
                        )
                    )}
                </div>
                {node.group?.icon && <node.group.icon className="w-4 h-4 text-gray-500" />}
                <span className="text-sm ml-1 select-none">{node.name}</span>
            </div>
            {isExpanded && hasChildren && (
                <div>
                    {node.group?.children.map((child) => (
                        <TreeNodeComponent key={child.id} node={child} level={level + 1} />
                    ))}
                </div>
            )}
        </div>
    );
}

export function TreeView() {

    const db1: Database = {
        id: '1-1',
        name: 'udb_01',
        schemas: [
            {
                name: 'public',
                tables: [
                    { name: 't1' }
                ],
                views: []
            }
        ],
        extensions: [],
        languages: [],
        eventTriggers: []
    };

    const user_databases: Database[] = [db1];
    const template_databases: Database[] = [];
    const system_databases: Database[] = [];

    const data: TreeNode[] = [
        {
            id: '1',
            name: 'User Databases',
            group: {
                icon: StarIcon,
                children: [
                    ...user_databases.map((db) => databaseTreeTemplate(db)),
                ]
            }
        },
        {
            id: '2',
            name: 'Template Databases',
            group: {
                icon: GitForkIcon,
                children: [
                    ...template_databases.map((db) => databaseTreeTemplate(db)),
                ]
            }
        },
        {
            id: '3',
            name: 'System Databases',
            group: {
                icon: CogIcon,
                children: [
                    ...system_databases.map((db) => databaseTreeTemplate(db)),
                ]
            }
        },
    ];

    return (
        <div className="border border-gray-200 rounded-lg bg-white shadow-sm h-full">
            <div className="p-2">
                {data.map((node) => (
                    <TreeNodeComponent key={node.id} node={node} />
                ))}
            </div>
        </div>
    );
}
