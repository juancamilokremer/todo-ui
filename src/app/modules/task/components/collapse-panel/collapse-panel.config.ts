export interface CollapsePanelConfig {
    id: number;
    title: string;
    items?: Item[];
}

export interface Item {
    id: number;
    description: string;
    isChecked: boolean;
}

export interface ActionPanel {
    action: 'edit' | 'delete';
    data: CollapsePanelConfig;
}