import { Document } from 'mongoose';

export interface Book extends Document {
    readonly name: string;
    readonly imageSrc: string;
    readonly authorName: string;
    readonly created: Date;
    readonly updated: Date;
    readonly isDeleted: boolean;
}
