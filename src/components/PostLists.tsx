import type { Post } from '@/interfaces';
import { useGetPostsQuery, useNewPostMutation } from '@/state/posts/postsApiSlice';

export const PostLists = () => {
  const { data: posts, isLoading, isError } = useGetPostsQuery({ limit: 5, offset: 0 });
  const [newPostMutation, { data: post, isLoading: isLoadingNewPost }] = useNewPostMutation();

  console.log(post);

  const handleNewPost = () => {
    const newPost: Omit<Post, 'id' | 'userId'> = { title: 'GSN post', body: 'Hello World, dude' };
    newPostMutation(newPost);
  };

  if (isLoading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <h1>API call error out please refresh...</h1>
      </div>
    );
  }

  return (
    <div>
      <div>
        <button type="button" onClick={handleNewPost}>
          {isLoadingNewPost ? 'Creating new post...' : 'Create New Post'}
        </button>
      </div>
      <h1>Here comes my post list</h1>
      {posts?.length ? posts.map((post) => <li key={post.id}>{post.title}</li>) : null}
    </div>
  );
};
