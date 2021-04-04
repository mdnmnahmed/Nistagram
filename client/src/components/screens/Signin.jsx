import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import M from 'materialize-css';
import axios from 'axios';

const Signin = () => {
    const history = useHistory();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signInData = async (event) => {
        event.preventDefault();

        if (!email || !password) {
            return M.toast({ html: "Please fill all fields", classes: 'red darken-4' })
        }

        if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
            return M.toast({ html: "Invalid Email", classes: '#b71c1c red darken-4' })
        }

        try {
            const userData = {
                email,
                password
            }
            const signedInData = await axios.post(process.env.REACT_APP_API_URL + '/signin', userData);
            M.toast({ html: signedInData.data.message, classes: 'green darken-4' })
            console.log('signedInData res: ', signedInData);
            history.push('/');
        } catch (err) {
            console.log('error occured: ', err.response.data.error);
            return M.toast({ html: err.response.data.error, classes: 'red darken-4' })
        }

        // fetch('/signin', {
        //     method: "post",
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify({
        //         email,
        //         password
        //     })
        // }).then(res => res.json())
        //     .then(data => {
        //         if (data.error) {
        //             M.toast({ html: data.error, classes: '#b71c1c red darken-4' })
        //         } else {
        //             M.toast({ html: "SignedIn Success", classes: '#33691e light-green darken-4' });
        //             history.push('/');
        //         }
        //     }).catch(err => {
        //         console.log("Error Occued : " + err);
        //     })
    }


    return (
        <div className="myCard">
            <div className="card auth-card">
                <h2 className="brand-logo">Nistagram</h2>
                <form onSubmit={signInData}>
                    <input type="text" placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input type="password" placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit" className="btn waves-effect waves-light darken-1">
                        Login
                    </button>
                </form>
                <br />
                <br />
                <div>
                    <Link to="/signup">Don't have an <span style={{ color: '#26a69a' }}>Account</span></Link>
                </div>
            </div>
        </div>
    )
}

export default Signin;
