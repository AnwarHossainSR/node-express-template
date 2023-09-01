import Post from '@/resources/post/post.interface';
import { Schema, model } from 'mongoose';

const PostSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        body: {
            type: String,
            required: true,
        },
        // file: {
        //     type: String,// Use a string to store a single file reference
        // },
        files: {
            type: [String], // Use an array of strings to store multiple file references
        },
    },
    { timestamps: true }
);

export default model<Post>('Post', PostSchema);
