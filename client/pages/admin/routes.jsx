'use strict';
const React = require('react');
const ReactRouter = require('react-router');
const App = require('./app.jsx');
const Home = require('./home.jsx');
const NotFound = require('./not-found.jsx');
const AccountSearch = require('./accounts/search/index.jsx');
const AccountDetails = require('./accounts/details/index.jsx');
// const AdminSearch = require('./components/admins/search');
// const AdminDetails = require('./components/admins/details');
// const AdminGroupSearch = require('./components/admin-groups/search');
// const AdminGroupDetails = require('./components/admin-groups/details');
// const StatusSearch = require('./components/statuses/search');
// const StatusDetails = require('./components/statuses/details');
// const UserSearch = require('./components/users/search');
// const UserDetails = require('./components/users/details');


const Router = ReactRouter.Router;
const Route = ReactRouter.Route;
const IndexRoute = ReactRouter.IndexRoute;


const Routes = (
    <Router history={ReactRouter.browserHistory}>
        <Route path="/admin" component={App}>
            <IndexRoute component={Home} />
            <Route path="accounts" component={AccountSearch} />
            <Route path="accounts/:id" component={AccountDetails} />
            {/* <Route path="admins" component={AdminSearch} /> */}
            {/* <Route path="admins/:id" component={AdminDetails} /> */}
            {/* <Route path="admin-groups" component={AdminGroupSearch} /> */}
            {/* <Route path="admin-groups/:id" component={AdminGroupDetails} /> */}
            {/* <Route path="statuses" component={StatusSearch} /> */}
            {/* <Route path="statuses/:id" component={StatusDetails} /> */}
            {/* <Route path="users" component={UserSearch} /> */}
            {/* <Route path="users/:id" component={UserDetails} /> */}
            <Route path="*" component={NotFound} />
        </Route>
        <Route path="*" component={NotFound} />
    </Router>
);


module.exports = Routes;
