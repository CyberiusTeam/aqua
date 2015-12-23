'use strict';
const LinkState = require('../../../../helpers/link-state.js');
const ObjectAssign = require('object-assign');
const React = require('react');
const SelectControl = require('../../../../components/form/select-control.jsx');
const TextControl = require('../../../../components/form/text-control.jsx');


const propTypes = {
    loading: React.PropTypes.bool,
    onChange: React.PropTypes.func,
    query: React.PropTypes.object
};
const defaultState = {
    username: '',
    sort: '_id',
    limit: '20',
    page: '1'
};


class FilterForm extends React.Component {
    constructor(props) {

        super(props);

        this.state = ObjectAssign({}, defaultState, props.query);
    }

    componentWillReceiveProps(nextProps) {

        const nextState = ObjectAssign({}, defaultState, nextProps.query);

        this.setState(nextState);
    }

    onMenuChange(event) {

        this.setState({ page: 1 }, this.props.onChange.bind(this));
    }

    onEnterSubmit(event) {

        if (event.which === 13) {
            event.preventDefault();
            event.stopPropagation();

            this.setState({ page: 1 }, this.props.onChange.bind(this));
        }
    }

    changePage(page) {

        this.setState({ page }, this.props.onChange.bind(this));
    }

    render() {

        return (
            <form
                onKeyDown={this.onEnterSubmit.bind(this)}
                onSubmit={this.props.onChange.bind(this)}>

                <div className="row">
                    <div className="col-sm-4">
                        <TextControl
                            name="username"
                            label="Username search"
                            value={this.state.username}
                            onChange={LinkState.bind(this)}
                            disabled={this.props.loading}
                        />
                    </div>
                    <div className="col-sm-4">
                        <SelectControl
                            name="sort"
                            label="Sort by"
                            value={this.state.sort}
                            onChange={LinkState.bind(this, this.onMenuChange.bind(this))}
                            disabled={this.props.loading}>

                            <option value="_id">id &#9650;</option>
                            <option value="-_id">id &#9660;</option>
                            <option value="username">username &#9650;</option>
                            <option value="-username">username &#9660;</option>
                        </SelectControl>
                    </div>
                    <div className="col-sm-4">
                        <SelectControl
                            name="limit"
                            label="Limit"
                            value={this.state.limit}
                            onChange={LinkState.bind(this, this.onMenuChange.bind(this))}
                            disabled={this.props.loading}>

                            <option value={10}>10 items</option>
                            <option value={20}>20 items</option>
                            <option value={50}>50 items</option>
                            <option value={100}>100 items</option>
                        </SelectControl>
                    </div>
                </div>
            </form>
        );
    }
}

FilterForm.propTypes = propTypes;


module.exports = FilterForm;
