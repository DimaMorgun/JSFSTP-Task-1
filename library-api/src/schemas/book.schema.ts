import * as mongoose from 'mongoose';

export const BookSchema = new mongoose.Schema({
    id: String,
    name: String,
    authorName: String,
    created: Date,
    updated: Date,
});
