export interface Url {
    id: number;
    originalUrl: string;
    shortCode: string;
    createdAt: string;
    clickCount: number;
}

export interface ClickEvent {
    id: number;
    urlId: number;
    clickedAt: string;
}
