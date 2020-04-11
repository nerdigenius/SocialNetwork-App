import React,{Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import './App.css';
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Landing from './components/layout/Landing'
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import {Provider} from 'react-redux';
import jwt_decode from 'jwt-decode'
import setAuthToken from './utils/setAuthToken'
import {setCurrentUser, logoutUser}from './actions/authActions'

import store from './store'

//check for token
if(localStorage.jwtToken){
  setAuthToken(localStorage.jwtToken)
  // decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  //check for expired token
  const currentTime = Date.now()/1000;
  if(decoded.exp<currentTime){
    //logout user
    store.dispatch(logoutUser())
    //TODO: clear current profile
    //Redirect to login
    window.location.href='/login'
  }
}
class App extends Component {
  render(){
    return (
      <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar/>
          <Route exact path="/" component={Landing}/>
            <div className='container'>
              <Route exact path="/register" component={Register}/>
              <Route exact path="/login" component={Login}/>
            </div>
          <Footer/>
        </div>
      </Router>
      </Provider>
      
    );
  }
  
}

export default App;
