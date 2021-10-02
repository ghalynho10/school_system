import React from 'react'
import { Route, Switch } from 'react-router-dom'
// import Hoc from './hoc/hoc'
import Login from './containers/Login'
import Signup from './containers/Signup'
import Profile from './containers/Profile'
import AssignmentList from './containers/AssignmentList'
import AssignmentDetail from './containers/AssignmentDetail'
import AssignmentCreate from './containers/AssignmentCreate'
import { connect } from 'react-redux'

import PrivateRoute, { RouteTeacher } from './PrivateRoutes'



class Baserouter extends React.Component {

    render() {

        // let routes = (
        //     <Switch>
        //         <Route path="/signup/" component={Signup} />
        //         <Route path="/login/" exact component={Login} />
        //         <Redirect to="/login/" />
        //     </Switch>
        // )

        // if (this.props.token !== null) {
        //     routes = (
        //         <Switch>
        //             <Route path="/assignments/:id/" component={AssignmentDetail} />
        //             <Route path="/create/" component={AssignmentCreate} />
        //             <Route path="/profile/:id/" component={Profile} />
        //             <Route path="/" exact component={AssignmentList} />
        //             <Redirect to="/" />
        //         </Switch>
        //     )
        // }

        return (
            // <Hoc>
            //     {routes}
            // </Hoc>
            <Switch>
                <PrivateRoute exact path="/assignments/:id/" component={AssignmentDetail} />
                <RouteTeacher exact path="/create/" component={AssignmentCreate} />
                <PrivateRoute exact path="/profile/:id/" component={Profile} />
                <Route exact path="/" component={AssignmentList} />
                <Route exact path="/signup/" component={Signup} />
                <Route exact path="/login/" component={Login} />
            </Switch>
        )
    }
}

const mapStateToProps = (state) => ({
    token: state.auth.token
})


export default connect(mapStateToProps)(Baserouter)
