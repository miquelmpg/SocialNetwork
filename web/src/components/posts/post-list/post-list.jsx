import { PostItem, PostTextArea } from '../../posts'
import { CommentItem, CommentTextArea } from '../../comments';

function PostList({ post, setPosts }) {

    return (
        <>
            <div className="container w-50 rounded-5 p-5" style={{backgroundColor: '#e44949'}}>
                <PostTextArea setPosts={setPosts} />
                {post && post.map((post) => (
                            <div key={post.id}>
                                <PostItem {...post} setPosts={setPosts}/>

                                {post.comments.map((comment) => (
                                    <div key={comment.id}>
                                        <CommentItem postId={post.id} {...comment} setPosts={setPosts} />
                                        
                                    </div>))}
                                    <div>
                                        <CommentTextArea setPosts={setPosts} {...post}/>
                                    </div>
                            </div>
                ))}
            </div>
        </>
    );
}

export default PostList;