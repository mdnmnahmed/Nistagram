import React from 'react';
import NavBar from './components/NavBar';

import './App.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//Screen Components
import Home from './components/screens/Home';
import Signin from './components/screens/Signin';
import Signup from './components/screens/Signup';
import Profile from './components/screens/Profile';
import CreatePost from './components/screens/CreatePost';

function App() {
    return (
        <>
            <Router>
                <NavBar />
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="/signin">
                        <Signin />
                    </Route>
                    <Route path="/signup">
                        <Signup />
                    </Route>
                    <Route path="/profile">
                        <Profile />
                    </Route>
                    <Route path="/createpost">
                        <CreatePost />
                    </Route>
                </Switch>
            </Router>
        </>
    );
}

export default App;
