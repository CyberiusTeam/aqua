'use strict';
const Actions = require('./actions');
const DeleteForm = require('../../../../../client/components/delete-form.jsx');
const DetailsForm = require('./details-form.jsx');
const NoteForm = require('./note-form.jsx');
const React = require('react');
const ReactRouter = require('react-router');
const StatusForm = require('./status-form.jsx');
const Store = require('./store');
const UserForm = require('./user-form.jsx');


const Link = ReactRouter.Link;
const propTypes = {
    params: React.PropTypes.object
};


class DetailsPage extends React.Component {
    constructor(props) {

        super(props);

        Actions.getDetails(this.props.params.id);
        Actions.getStatusOptions();

        this.state = Store.getState();
    }

    componentDidMount() {

        this.unsubscribeStore = Store.subscribe(this.onStoreChange.bind(this));
    }

    componentWillUnmount() {

        this.unsubscribeStore();
    }

    onStoreChange() {

        this.setState(Store.getState());
    }

    render() {

        if (!this.state.details.hydrated) {
            return (
                <section className="section-account-details container">
                    <h1 className="page-header">
                        <Link to="/admin/accounts">Accounts</Link> / loading...
                    </h1>
                </section>
            );
        }

        if (this.state.details.showFetchFailure) {
            return (
                <section className="section-account-details container">
                    <h1 className="page-header">
                        <Link to="/admin/accounts">Accounts</Link> / Error
                    </h1>
                    <div className="alert alert-danger">
                        {this.state.details.error}
                    </div>
                </section>
            );
        }

        const id = this.state.details._id;
        const name = this.state.details.name;
        const fullName = `${name.first} ${name.last}`;

        return (
            <section className="section-account-details container">
                <h1 className="page-header">
                    <Link to="/admin/accounts">Accounts</Link> / {fullName}
                </h1>
                <div className="row">
                    <div className="col-sm-8">
                        <DetailsForm {...this.state.details} />
                        <UserForm {...this.state.user} />
                    </div>
                    <div className="col-sm-4">
                        <StatusForm {...this.state.status} />
                        <NoteForm {...this.state.note} />
                    </div>
                    <div className="col-sm-12">
                        <DeleteForm
                            {...this.state.delete}
                            action={Actions.delete.bind(id)}
                        />
                    </div>
                </div>
            </section>
        );
    }
}

DetailsPage.propTypes = propTypes;


module.exports = DetailsPage;