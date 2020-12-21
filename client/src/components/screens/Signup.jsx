import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import M from 'materialize-css';


const Signup = () => {
    const history = useHistory();
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const signUpData = () => {
        if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            return M.toast({ html: "Invalid Email", classes: '#b71c1c red darken-4' })
        }
        fetch('/signup', {
                method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                password,
                email
            })
        }).then(res => res.json())
        .then(data => {
            if(data.error){
                M.toast({ html: data.error, classes: '#b71c1c red darken-4' })
            }else{
                M.toast({ html: data.message, classes: '#33691e light-green darken-4' });
                history.push('/signin');
            }
        }).catch(err => {
            console.log("Error Occued : "+err);
        })
    }

    return (
            <div className="myCard">
                <div className="card auth-card">
                    <h2 className="brand-logo">Nistagram</h2>
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
                    <button onClick={signUpData} className="btn waves-effect waves-light">
                        Signup
                </button>
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