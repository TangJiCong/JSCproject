

import React  from 'react';
//import { BrowserRouter as Router, Route ,Redirect ,Switch} from "react-router-dom";
import { HashRouter as Router, Route ,Redirect , Switch} from "react-router-dom";
import Login from './Login'
import AdminIndex from './AdminIndex'
import Error from './404'
function Main(){
    
    return (
        <Router>  
            <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/index/"  component={AdminIndex} />
                <Route path="/404"  component={Error} />
                <Redirect to='/404'></Redirect>
            </Switch>
        </Router>
    )
}
export default Main