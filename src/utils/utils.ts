import { message } from 'antd';
import { Language } from '../constants';

let language: string = Language.ENGLISH;

const getLanguage = (): string => {
    return language;
};

const setLanguage = (lang: string): void => {
    language = lang;
};

const showSuccess = (msg: string): void => {
    message.success(msg);
}

const showInfo = (msg: string): void => {
    message.info(msg);
}

const showError = (msg: string): void => {
    message.error(msg);
}

const regexEmail: RegExp = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

const toPascalCase = (text: string): string => {
    if(!text) {
        return text;
    }
    return text.replace(/(\w)(\w*)/g,
        function(g0,g1,g2) {
            return g1.toUpperCase() + g2.toLowerCase();
        });
 };

const checkForParameter = (parameterName: string, location: Location): string | null => {
    let result = null,
        tmp = [];
    location.search
        .substr(1)
        .split("&")
        .forEach(function (item: string) {
        tmp = item.split("=");
        if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
    });
    return result;
};

export default {
    showSuccess, 
    showInfo, 
    showError, 
    regexEmail,
    getLanguage, 
    setLanguage, 
    toPascalCase, 
    checkForParameter
};