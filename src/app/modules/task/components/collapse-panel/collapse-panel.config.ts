export interface CollapsePanelConfig {
    id: string;
    title: string;
    items?: ItemList[];
}

export interface ItemList {
    id: string;
    description: string;
}