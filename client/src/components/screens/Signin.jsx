import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import M from 'materialize-css';


const Signin = () => {
    const history = useHistory();
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const signInData = () => {
        if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
            return M.toast({ html: "Invalid Email", classes: '#b71c1c red darken-4' })
        }
        fetch('/signin', {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        }).then(res => res.json())
            .then(data => {
                if (data.error) {
                    M.toast({ html: data.error, classes: '#b71c1c red darken-4' })
                } else {
                    M.toast({ html: "SignedIn Success", classes: '#33691e light-green darken-4' });
                    history.push('/');
                }
            }).catch(err => {
                console.log("Error Occued : " + err);
            })
    }


    return (
        <div className="myCard">
            <div className="card auth-card">
                <h2 className="brand-logo">Nistagram</h2>
                <input type="text" placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input type="password" placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={signInData} className="btn waves-effect waves-light darken-1">
                    Login
                </button>
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
