'use strict';
const Constants = require('../constants');
const ObjectAssign = require('object-assign');
const ParseValidation = require('../../../../../helpers/parse-validation');


const initialState = {
    loading: false,
    error: undefined,
    accountId: undefined
};
const reducer = function (state = initialState, action) {

    if (action.type === Constants.GET_DETAILS_RESPONSE) {
        return ObjectAssign({}, initialState, {
            accountId: action.response._id
        });
    }

    if (action.type === Constants.DELETE) {
        return ObjectAssign({}, state, {
            loading: true
        });
    }

    if (action.type === Constants.DELETE_RESPONSE) {
        const validation = ParseValidation(action.response);

        return ObjectAssign({}, state, {
            loading: false,
            error: validation.error
        });
    }

    return state;
};


module.exports = reducer;
