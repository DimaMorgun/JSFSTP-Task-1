import * as mongoose from 'mongoose';

export const BookSchema = new mongoose.Schema({
    name: String,
    imageSrc: String,
    authorName: String,
    created: Date,
    updated: Date,
    isDeleted: Boolean,
});
