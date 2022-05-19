import axios, { AxiosResponse, AxiosError } from 'axios';
import utils from '../utils/utils';
import { i18Get } from '../i18';
import { UserDetails } from '../model/user.model';
import { StoredKeys } from '../constants';

export default {
    setupInterceptors: () => {
        axios.interceptors.response.use(
            (response: AxiosResponse) => {
                return handleResponse(response);
            },
            (error: AxiosError) => {
                return handleResponse(error.response);
            }
        );
        axios.interceptors.request.use(
            function (config: any) {
                config.headers.get['Content-Type'] = 'application/json';
                let key: string = StoredKeys.USER_DETAILS;
                const userDetailString: string | null = localStorage.getItem(key);
                if(userDetailString) {
                    const userDetails: UserDetails = JSON.parse(userDetailString);
                    config.headers.common.Authorization = 'bearer ' + userDetails.jwtToken;
                }
                return config;
            },
            function (error) {
                return Promise.reject(error);
            }
        );
    },
};

const handleResponse = (response: AxiosResponse | undefined) => {
    if (response && response.status && (response.status === 403 || response.status === 401)) {
        const userDetails: string | null = localStorage.getItem(StoredKeys.USER_DETAILS);
        if (userDetails) {
            utils.showError(response.status === 401 ? i18Get('Session expired', utils.getLanguage()) : i18Get('Unauthorized access', utils.getLanguage()));
            localStorage.setItem(StoredKeys.USER_DETAILS, '');
            window.location.href = '/';
        } else {
            window.location.href = '/';
        }
        return response;
    }

    if (!response || !response.data) {
        utils.showError(i18Get('Oops, Something went wrong.', utils.getLanguage()));
        return Promise.reject(response);
    }

    if (response.data.type === 'application/pdf' || response.data.type === 'text/csv' || response.data.type === 'application/vnd.ms-excel') {
        return response;
    }

    if (!response.data.status && response.config.responseType === 'blob' && response.status === 400 && response.data.type === 'application/json') {
        utils.showError(i18Get('No Data Found', utils.getLanguage()));
        return Promise.reject(response.data);
    }

    if (!response.data.status) {
        if (response.data.data && response.data.data.message) {
            utils.showError(i18Get(response.data.data.message, utils.getLanguage()));
        } else {
            utils.showError(i18Get(response.data.message, utils.getLanguage()));
        }
        return Promise.reject(response.data);
    } else if (response.data.status && (response.data.messageCode === 1 || response.data.messageCode === 6)) {
        if (response.config.method !== 'get' && response.data && response.data.message) {
            utils.showSuccess(i18Get(response.data.message, utils.getLanguage()));
        }
        return response;
    } else if (response.data.messageCode && response.data.messageCode !== 1) {
        let message = response.data ? response.data.message : 'Oops, Something went wrong.';
        utils.showError(i18Get(message, utils.getLanguage()));
        return Promise.reject(response.data);
    } else {
        return response;
    }
};