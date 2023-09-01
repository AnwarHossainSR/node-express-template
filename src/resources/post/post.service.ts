/* eslint-disable @typescript-eslint/no-explicit-any */
import Post from '@/resources/post/post.interface';
import PostModel from '@/resources/post/post.model';

class PostService {
    private post = PostModel;

    /**
     * Create a new post
     */
    public async create(
        title: string,
        body: string,
        files: string[]
    ): Promise<Post> {
        try {
            const post = await this.post.create({ title, body, files });

            return post;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}

export default PostService;
