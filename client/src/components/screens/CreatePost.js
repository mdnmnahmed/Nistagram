import React, { useState, useEffect } from 'react';
import M from 'materialize-css';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [url, setUrl] = useState('');

    const [image, setImage] = useState('');

    const history = useHistory();

    const createPost = async (event) => {
        event.preventDefault();

        const fileData = await new FormData()
        fileData.append("file", image)
        fileData.append("upload_preset", "nistagram")
        fileData.append("cloud_name", "nahnnn")

        try {
            const fileUploadData = await axios.post(process.env.REACT_APP_CLOUDINARY_API_BASE_URL + '/image/upload', fileData)
                .catch(err => {
                    throw new Error('Filed to Upload Picture, try again')
                })
            console.log('fileUploadData: ', fileUploadData);
            setUrl(fileUploadData.data.url);

            const newPostData = {
                title,
                body,
                pic: fileUploadData.data.url
            }

            const token = {
                
            }

            const uploadedPost = await axios.post(`${process.env.REACT_APP_API_URL}/post/create_post`, newPostData)
            console.log(uploadedPost);
            M.toast({ html: "Post uploaded", classes: 'light-green darken-4' });
            history.push('/');

        } catch (err) {
            console.log('Error Occured : ', err);
            M.toast({ html: err, classes: 'red darken-4' })
        }

        return;
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
                if (data.error) {
                    M.toast({ html: data.error, classes: '#b71c1c red darken-4' })
                } else {
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
            <form onSubmit={createPost}>
                <input type="text" placeholder="Title" autoFill="on"
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

                <button type="submit" className="btn waves-effect waves-dark #4dd0e1 cyan lighten-1">
                    Save Post
                </button>
            </form>
        </div>
    )
}

export default CreatePost;
