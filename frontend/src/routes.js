import { BrowserRouter, Route, Switch } from 'react-router-dom'
import React from 'react'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Jobs from './pages/Jobs'
import Job from './pages/Job'
import Profile from './pages/Profile'
import EditJob from './pages/EditJob'
import Page404 from './pages/Page404'


function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={ Login } />
                <Route path="/signup" exact component={ Signup } />
                <Route path="/jobs" exact component={ Jobs } />
                <Route path="/job" exact component={ Job } />
                <Route path="/edit-job/:job_id" exact component={ EditJob } />
                <Route path="/profile" exact component={ Profile } />
                <Route component={ Page404 } />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes
