export type Post = {
    id: string,
    path: string,
    location: string,
    date_posted: number,
    caption?: string
}

export type Image = {
    id: number;
    fileName: string;
    imageData: ArrayBuffer;
    mediaType?: string; 
    uploadedAt: string;
    location?: string;
}