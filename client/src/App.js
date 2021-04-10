import React, { useEffect, createContext, useReducer, useContext } from 'react';
import NavBar from './components/NavBar';

import './App.css';

import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom';

//Screen Components
import Home from './components/screens/Home';
import Signin from './components/screens/Signin';
import Signup from './components/screens/Signup';
import Profile from './components/screens/Profile';
import CreatePost from './components/screens/CreatePost';

//Reducer & context
import { reducer, initialState } from './reducers/userReducer';


//Utils Functions
import { getCookie } from './utils/CookiesHelper';

//Context
export const UserContext = createContext();

const RoutingStuff = () => {
    const history = useHistory();
    const { state, dispatch } = useContext(UserContext);

    useEffect(() => { 
        let userCookieData = getCookie('user_data');
        if (userCookieData) {
            userCookieData = JSON.parse(userCookieData);

            dispatch({ type: 'USER', payload: userCookieData })

            history.push('/');

        } else {
            history.push('/signin');
        }
    }, []);

    return (
        <>
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
        </>
    )
}

const App = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <>
            <UserContext.Provider value={{ state, dispatch }}>
                <BrowserRouter>
                    <NavBar />
                    <RoutingStuff />
                </BrowserRouter>
            </UserContext.Provider>
        </>
    );
}

export default App;