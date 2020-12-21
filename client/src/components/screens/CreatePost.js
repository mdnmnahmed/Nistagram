import React,{useState,useEffect} from 'react';
import M from 'materialize-css';
import {useHistory} from 'react-router-dom';

const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [image, setImage] = useState('');
    const [url, setUrl] = useState('');
    const history = useHistory();

    const postDetails = () => {
        const data = new FormData()
            data.append("file", image)
            data.append("upload_preset", "nistagram")
            data.append("cloud_name", "nnn-nah")

        fetch("https://api.cloudinary.com/v1_1/nahnnn/image/upload", {
            method: "post",
            body: data
        })
            .then(res => res.json())
            .then(data => {
                setUrl(data.url)
            })
            .catch(err => {
                console.log("Error occured while uploading pic : "+err);
            });
        
        fetch('/createpost', {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title,
                body,
                pic: url
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if(data.error){
                    M.toast({html: data.error, classes: '#b71c1c red darken-4'})
                }else{
                    M.toast({ html: "Post uploaded", classes: '#33691e light-green darken-4' });
                    history.push('/');
                }
            })
            .catch(err => {
                console.log("Error Occued while uploading post: " + err);
            })
    }

    return (
        <div className="card input-field" style={{
            margin: '30px auto',
            maxWidth: '500px',
            padding: '20px',
            textAlign: "center"
        }}>
            <input type="text" placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input type="text" placeholder="Description"
                value={body}
                onChange={(e) => setBody(e.target.value)}
            />
            <div className="file-field input-field">
                <div className="btn">
                    <span>Upload Pic</span>
                    <input type="file"
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" placeholder="Upload jpg, jpeg, gif, png only" />
                </div>
            </div>
            <button onClick={postDetails} type="file" className="btn waves-effect waves-dark #4dd0e1 cyan lighten-1">
                Save Post
            </button>
        </div>
    )
}

export default CreatePost;
