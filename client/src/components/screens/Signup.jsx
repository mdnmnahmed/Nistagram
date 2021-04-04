import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import M from 'materialize-css';
import axios from 'axios';


const Signup = () => {
    const history = useHistory();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signUpData = async (event) => {
        event.preventDefault();

        if (!name || !email || !password) {
            return M.toast({ html: "Please fill all fields", classes: 'red darken-4' })
        }
        if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
            return M.toast({ html: "Invalid Email", classes: 'red darken-4' })
        }

        try {
            const newUserData = {
                name,
                email,
                password
            }
            const signedUpData = await axios.post(process.env.REACT_APP_API_URL + '/signup', newUserData);
            M.toast({ html: signedUpData.data.message, classes: 'green darken-4' })
            console.log('signedUpData res: ', signedUpData);
            history.push('/signin');
        } catch (err) {
            console.log('error occured: ', err.response.data.error);
            return M.toast({ html: err.response.data.error, classes: 'red darken-4' })
        }
    }

    return (
        <div className="myCard">
            <div className="card auth-card">
                <h2 className="brand-logo">Nistagram</h2>
                <form onSubmit={signUpData}>
                    <input type="text" placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input type="text" placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input type="password" placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit" className="btn waves-effect waves-light">
                        Signup
                    </button>
                </form>
                <br />
                <br />
                <div>
                    <Link to="/signin">Already have an <span style={{ color: '#26a69a' }}>Account</span></Link>
                </div>
            </div>
        </div>
    )
}

export default Signup;