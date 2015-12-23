/* global window */
'use strict';
const ApiActions = require('../../../../actions/api');
const Constants = require('./constants');
const ReactRouter = require('react-router');
const Store = require('./store');


class Actions {
    static getDetails(id) {

        ApiActions.get(
            `/api/accounts/${id}`,
            undefined,
            Store,
            Constants.GET_DETAILS,
            Constants.GET_DETAILS_RESPONSE
        );
    }

    static getStatusOptions() {

        const query = {
            pivot: 'Account',
            limit: 99
        };

        ApiActions.get(
            '/api/statuses',
            query,
            Store,
            Constants.GET_STATUS_OPTIONS,
            Constants.GET_STATUS_OPTIONS_RESPONSE
        );
    }

    static saveDetails(data) {

        const id = data.id;

        delete data.id;

        ApiActions.put(
            `/api/accounts/${id}`,
            data,
            Store,
            Constants.SAVE_DETAILS,
            Constants.SAVE_DETAILS_RESPONSE
        );
    }

    static hideDetailsSaveSuccess() {

        Store.dispatch({
            type: Constants.HIDE_DETAILS_SAVE_SUCCESS
        });
    }

    static linkUser(data) {

        const id = data.id;

        delete data.id;

        ApiActions.put(
            `/api/accounts/${id}/user`,
            data,
            Store,
            Constants.LINK_USER,
            Constants.LINK_USER_RESPONSE
        );
    }

    static unlinkUser(id) {

        ApiActions.delete(
            `/api/accounts/${id}/user`,
            undefined,
            Store,
            Constants.UNLINK_USER,
            Constants.UNLINK_USER_RESPONSE
        );
    }

    static hideUserSaveSuccess() {

        Store.dispatch({
            type: Constants.HIDE_USER_SAVE_SUCCESS
        });
    }

    static newStatus(data) {

        if (data.status === data.current.id) {
            return Store.dispatch({
                type: Constants.NEW_STATUS_RESPONSE,
                err: new Error('same status'),
                response: {
                    message: 'That is the current status.'
                }
            });
        }

        const id = data.id;

        delete data.id;
        delete data.current;

        ApiActions.post(
            `/api/accounts/${id}/status`,
            data,
            Store,
            Constants.NEW_STATUS,
            Constants.NEW_STATUS_RESPONSE
        );
    }

    static hideStatusSaveSuccess() {

        Store.dispatch({
            type: Constants.HIDE_STATUS_SAVE_SUCCESS
        });
    }

    static newNote(data) {

        const id = data.id;

        delete data.id;

        ApiActions.post(
            `/api/accounts/${id}/notes`,
            data,
            Store,
            Constants.NEW_NOTE,
            Constants.NEW_NOTE_RESPONSE
        );
    }

    static hideNoteSaveSuccess() {

        Store.dispatch({
            type: Constants.HIDE_NOTE_SAVE_SUCCESS
        });
    }

    static delete(id) {

        ApiActions.delete(
            `/api/accounts/${id}`,
            undefined,
            Store,
            Constants.DELETE,
            Constants.DELETE_RESPONSE,
            (err, response) => {

                if (!err) {
                    ReactRouter.browserHistory.push('/admin/accounts');

                    window.scrollTo(0, 0);
                }
            }
        );
    }
}


module.exports = Actions;
