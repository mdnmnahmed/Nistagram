import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getCookie } from '../../utils/CookiesHelper';

const Home = () => {
    const [postsData, setPostsData] = useState([]);

    useEffect(() => {
        const fetchAllPosts = async () => {
            try {
                const headers = { "Authorization": "bearer " + getCookie('user_token') }
                const allPosts = await axios.get(process.env.REACT_APP_API_URL + '/post/all_posts', { headers })
                console.log(allPosts.data.data);
                setPostsData(allPosts.data.data)
            } catch (error) {

            }
        }
        fetchAllPosts();
    }, []);


    return (
        <div className="home">
            {
                postsData.length <= 0 && (
                    <>
                        Loading..
                    </>
                )
            }

            {
                postsData.map(post => (
                    <div className="card home-card">
                        <h5>{post.postedBy.name}</h5>
                        <div className="card-image">
                            <img src={post.photo} />
                        </div>
                        <div className="card-content">
                            <i className="material-icons" style={{ color: 'red' }}>favorite</i>
                            <h4>{post.title}</h4>
                            {/* <p>This is Post</p> */}
                            <input type="text" placeholder="Add Comment" />
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default Home;
