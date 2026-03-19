import { Link } from 'react-router-dom';
import * as ApiService from '../../../services/api-service';

function CommentItem({ id, user, content, createdAt, post, setPosts }) {

    async function deleteComment(postId, commentId) {
        await ApiService.deleteComment(postId, commentId);
        setPosts(prev => prev.map(post => post.id === postId ? { ...post,  comments: post.comments.filter(comment => comment.id !== commentId)} : post));
    }
    
    return (
        <div className="container rounded-5 p-3" style={{backgroundColor: '#f5f5f5', position: 'relative'}}>
            <div className="">
                <Link to={`/users/${user.id}`}>
                    <div className='d-flex'>
                        <img className='rounded-circle' style={{width: '100px'}} src={user.profilePicture} alt="" />
                        <div>
                            <div>{user.userName}</div>
                            <div>{createdAt}</div>
                        </div>
                    </div>
                </Link>
                <div style={{textAlign: "justify"}}>{content}</div>
                <div style={{position: 'absolute', top: 15, right: 20}} onClick={() => deleteComment(post, id)}>O</div>
            </div>
        </div>
    );
}

export default CommentItem;