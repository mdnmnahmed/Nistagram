import React from 'react';

const Profile = () => {
    return (
        <div style={{}}>
            <br/>
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
                <div style={{marginLeft: '15px'}}>
                    <h4>Numan</h4>
                    <div style={{ display: 'flex', justifyContent: "space-between", width: '100%' }}>
                        <h6>20 <span>Posts</span></h6> &nbsp;&nbsp;
                        <h6>100 Followers</h6> &nbsp;&nbsp;
                        <h6>10 Followings</h6> &nbsp;&nbsp;
                    </div>
                </div>
            </div>

            <br/>
            <div className="gallery">
                <img className="item" src="https://mdnmnahmed.github.io/portfolio/images/nlogo.jpg" />
                <img className="item" src="https://mdnmnahmed.github.io/portfolio/images/nlogo.jpg" />
                <img className="item" src="https://mdnmnahmed.github.io/portfolio/images/nlogo.jpg" />
                <img className="item" src="https://mdnmnahmed.github.io/portfolio/images/nlogo.jpg" />
                <img className="item" src="https://mdnmnahmed.github.io/portfolio/images/nlogo.jpg" />
            </div>
        </div>
    )
}

export default Profile;