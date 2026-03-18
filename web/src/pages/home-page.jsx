import { useState, useEffect } from 'react';
import * as ApiService from '../services/api-service';

function HomePage() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        async function profileFetch() {
            const post = await ApiService.postsList();
            setPosts(post);
        }
        
        profileFetch();
    }, []);

    return (
        <>Hoalalaal{posts.map((post) => <div>{kkdkddk}</div>)}</>
    );
}

export default HomePage;