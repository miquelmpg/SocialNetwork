import { useState, useEffect } from 'react';
import { PostList } from '../components/posts';
import * as ApiService from '../services/api-service';

function HomePage() {
    const [posts, setPosts] = useState([]);
    console.log(posts)

    async function profileFetch() {
        const post = await ApiService.postsList();
        setPosts(post);
    }

    useEffect(() => {
        profileFetch();
    }, []);

    return (
        <>
            <PostList setPosts={setPosts} post={posts}/>
        </>
    );
}

export default HomePage;