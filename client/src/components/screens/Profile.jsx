import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { getCookie } from '../../utils/CookiesHelper';
import M from 'materialize-css';

const Profile = () => {
    const [profilePostsData, setProfilePostsData] = useState([]);

    const fetchProfilePosts = async () => {
        try {
            const headers = { "Authorization": "bearer " + getCookie('user_token') }
            const allPosts = await axios.get(process.env.REACT_APP_API_URL + '/post/profile_posts', { headers })
            console.log(allPosts.data.data);
            setProfilePostsData(allPosts.data.data)
        } catch (error) {
            console.log('Failed to fetch profile posts: ', error);
        }
    }

    useEffect(() => {
        fetchProfilePosts();





    }, []);


    const zoomImage = (event) => {
        // var elems = document.querySelectorAll('.materialboxed');
        var instance = M.Materialbox.getInstance(event.target);
        instance.open();
    }


    return (
        <div style={{}}>
            <br />
            <div style={{
                display: 'flex',
                justifyContent: 'space-around',
                margin: '18px 0px',
                borderBottom: '1px solid grey',

                maxWidth: '800px',
                margin: '0px auto',
            }}>
                <div>
                    <img style={{ width: '120px', height: '120', borderRadius: '80px' }} src="https://mdnmnahmed.github.io/portfolio/images/nlogo.jpg" />
                </div>
                <div style={{ marginLeft: '15px' }}>
                    <h4>Numan</h4>
                    <div style={{ display: 'flex', justifyContent: "space-between", width: '100%' }}>
                        <h6>20 <span>Posts</span></h6> &nbsp;&nbsp;
                        <h6>100 Followers</h6> &nbsp;&nbsp;
                        <h6>10 Followings</h6> &nbsp;&nbsp;
                    </div>
                </div>
            </div>

            <br />
            <div align="center" className="">
                {
                    profilePostsData.length <= 0 && (
                        <>
                            Loading..
                        </>
                    )
                }

                <div style={{ margin: '30px' }} class="row">
                    {
                        profilePostsData.map(post => (
                            <>


                                <div style={{ border: '0.5px solid black' }} class="col s12 m6 l4">
                                    <p>{post.title}</p>
                                    <img onClick={zoomImage} class="materialboxed" src={post.photo} />
                                </div>



                            </>
                        ))
                    }



                    {/* <div class="col s12 m6 l3"><p>s12 m6 l3</p></div>
                    <div class="col s12 m6 l3"><p>s12 m6 l3</p></div>
                    <div class="col s12 m6 l3"><p>s12 m6 l3</p></div> */}
                </div>

            </div>
        </div>
    )
}

export default Profile;