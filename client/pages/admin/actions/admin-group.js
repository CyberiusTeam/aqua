/* global window */
'use strict';
const Dispatcher = require('flux-dispatcher');
const Constants = require('../constants/admin-group');
const Fetch = require('../../../helpers/json-fetch');


const dispatch = Dispatcher.handleAction;


const Actions = {
    getResults: function (data) {

        dispatch(Constants.GET_RESULTS, data);

        const request = {
            method: 'GET',
            url: '/api/admin-groups',
            query: data,
            useAuth: true
        };

        Fetch(request, (err, response) => {

            if (!err) {
                response.success = true;
            }

            dispatch(Constants.GET_RESULTS_RESPONSE, response);
        });
    },
    getDetails: function (data) {

        dispatch(Constants.GET_DETAILS, data);

        const request = {
            method: 'GET',
            url: '/api/admin-groups/' + data.id,
            useAuth: true
        };

        Fetch(request, (err, response) => {

            if (err) {
                response.fetchFailure = true;
                response.error = err.message;
            }

            dispatch(Constants.GET_DETAILS_RESPONSE, response);
        });
    },
    showCreateNew: function (data) {

        dispatch(Constants.SHOW_CREATE_NEW, data);
    },
    hideCreateNew: function (data) {

        dispatch(Constants.HIDE_CREATE_NEW, data);
    },
    createNew: function (data, routerLocation) {

        dispatch(Constants.CREATE_NEW, data);

        const request = {
            method: 'POST',
            url: '/api/admin-groups',
            data,
            useAuth: true
        };

        Fetch(request, (err, response) => {

            if (!err) {
                response.success = true;

                if (routerLocation) {
                    Actions.getResults(routerLocation.query);
                }
            }

            dispatch(Constants.CREATE_NEW_RESPONSE, response);
        });
    },
    saveDetails: function (data) {

        dispatch(Constants.SAVE_DETAILS, data);

        const id = data.id;
        delete data.id;

        const request = {
            method: 'PUT',
            url: '/api/admin-groups/' + id,
            data,
            useAuth: true
        };

        Fetch(request, (err, response) => {

            if (!err) {
                response.success = true;
            }

            dispatch(Constants.SAVE_DETAILS_RESPONSE, response);
        });
    },
    savePermissions: function (data) {

        dispatch(Constants.SAVE_PERMISSIONS, data);

        const id = data.id;
        delete data.id;

        const request = {
            method: 'PUT',
            url: '/api/admin-groups/' + id + '/permissions',
            data,
            useAuth: true
        };

        Fetch(request, (err, response) => {

            if (!err) {
                response.success = true;
            }

            dispatch(Constants.SAVE_PERMISSIONS_RESPONSE, response);
        });
    },
    delete: function (data, routerHistory) {

        dispatch(Constants.DELETE, data);

        const id = data.id;
        delete data.id;

        const request = {
            method: 'DELETE',
            url: '/api/admin-groups/' + id,
            data,
            useAuth: true
        };

        Fetch(request, (err, response) => {

            if (!err) {
                response.success = true;

                if (routerHistory) {
                    routerHistory.pushState(null, '/admin/admin-groups');
                    window.scrollTo(0, 0);
                }
            }

            dispatch(Constants.DELETE_RESPONSE, response);
        });
    }
};


module.exports = Actions;
