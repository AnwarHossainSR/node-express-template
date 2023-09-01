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
        file: {
            type: String,
        },
    },
    { timestamps: true }
);

export default model<Post>('Post', PostSchema);
