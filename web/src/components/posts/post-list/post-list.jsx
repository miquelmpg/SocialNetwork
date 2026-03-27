import { PostItem, PostTextArea } from '../../posts'
import { CommentItem, CommentTextArea } from '../../comments';

function PostList({ post, setPosts, usersFollow, setToggle, profile }) {

    return (
        <>
            <div className="container d-flex flex-column gap-5 w-50 rounded-5 p-5" style={{backgroundColor: '#e44949'}}>
                {profile && <PostTextArea setPosts={setPosts} />}
                {post && post?.map((post) => (
                            <div key={post.id}>
                                <PostItem {...post} setPosts={setPosts} setToggle={setToggle} usersFollow={usersFollow}/>

                                {post?.comments?.map((comment) => (
                                    <div key={comment.id}>
                                        <CommentItem postId={post.id} {...comment} setPosts={setPosts} setToggle={setToggle} usersFollow={usersFollow}/>
                                        
                                    </div>))}
                                    <div>
                                        <CommentTextArea setPosts={setPosts} {...post} />
                                    </div>
                            </div>
                ))}

                {post.length === 0 && <div className="text-white rounded-5 d-flex align-items-center justify-content-center fs-5" style={{backgroundColor: '#202020', width: '38vw', height: '15vh'}}>You have reached the end.</div>}
            </div>
        </>
    );
}

export default PostList;