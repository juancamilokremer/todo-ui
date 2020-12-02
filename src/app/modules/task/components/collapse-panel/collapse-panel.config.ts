export interface CollapsePanelConfig {
    id: number;
    title: string;
    items?: ItemList[];
}

export interface ItemList {
    id: number;
    description: string;
}

export interface ActionPanel {
    action: 'edit' | 'delete';
    data: CollapsePanelConfig;
}