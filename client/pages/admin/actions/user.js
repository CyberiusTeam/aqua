/* global window */
'use strict';
const Dispatcher = require('flux-dispatcher');
const Constants = require('../constants/user');
const Fetch = require('../../../helpers/json-fetch');


const dispatch = Dispatcher.handleAction;


const Actions = {
    getResults: function (data) {

        dispatch(Constants.GET_RESULTS, data);

        const request = {
            method: 'GET',
            url: '/api/users',
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
    getIdentity: function (data) {

        dispatch(Constants.GET_IDENTITY, data);

        const request = {
            method: 'GET',
            url: '/api/users/' + data.id,
            useAuth: true
        };

        Fetch(request, (err, response) => {

            if (err) {
                response.fetchFailure = true;
                response.error = err.message;
            }

            dispatch(Constants.GET_IDENTITY_RESPONSE, response);
        });
    },
    showCreateNew: function (data) {

        dispatch(Constants.SHOW_CREATE_NEW, data);
    },
    hideCreateNew: function (data) {

        dispatch(Constants.HIDE_CREATE_NEW, data);
    },
    createNew: function (data, routerHistory) {

        dispatch(Constants.CREATE_NEW, data);

        const request = {
            method: 'POST',
            url: '/api/users',
            data,
            useAuth: true
        };

        Fetch(request, (err, response) => {

            if (!err) {
                response.success = true;

                if (routerHistory) {
                    routerHistory.pushState(null, `/admin/users/${response._id}`);
                    window.scrollTo(0, 0);
                }
            }

            dispatch(Constants.CREATE_NEW_RESPONSE, response);
        });
    },
    saveIdentity: function (data) {

        dispatch(Constants.SAVE_IDENTITY, data);

        const id = data.id;
        delete data.id;

        const request = {
            method: 'PUT',
            url: '/api/users/' + id,
            data,
            useAuth: true
        };

        Fetch(request, (err, response) => {

            if (!err) {
                response.success = true;
            }

            dispatch(Constants.SAVE_IDENTITY_RESPONSE, response);
        });
    },
    savePassword: function (data) {

        dispatch(Constants.SAVE_PASSWORD, data);

        if (data.password !== data.passwordConfirm) {
            dispatch(Constants.SAVE_PASSWORD_RESPONSE, {
                message: 'Passwords do not match.'
            });

            return;
        }

        const id = data.id;
        delete data.id;
        delete data.passwordConfirm;

        const request = {
            method: 'PUT',
            url: '/api/users/' + id + '/password',
            data,
            useAuth: true
        };

        Fetch(request, (err, response) => {

            if (!err) {
                response.success = true;
            }

            dispatch(Constants.SAVE_PASSWORD_RESPONSE, response);
        });
    },
    delete: function (data, routerHistory) {

        dispatch(Constants.DELETE, data);

        const id = data.id;
        delete data.id;

        const request = {
            method: 'DELETE',
            url: '/api/users/' + id,
            data,
            useAuth: true
        };

        Fetch(request, (err, response) => {

            if (!err) {
                response.success = true;

                if (routerHistory) {
                    routerHistory.pushState(null, '/admin/users');
                    window.scrollTo(0, 0);
                }
            }

            dispatch(Constants.DELETE_RESPONSE, response);
        });
    }
};


module.exports = Actions;
