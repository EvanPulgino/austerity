import * as Institutions from './InstitutionConstants';
import styles from './Institution.module.css';

export function getInitialInstitutions() {
    return [
        Institutions.INITIAL_PRIVATE_ENTERPRISE,
        Institutions.INITIAL_NATIONAL_SECURITY,
        Institutions.INITIAL_SOCIAL_WELFARE
    ];
}

export function addNationalSecurityDark(cssClass) {
    return cssClass + ' ' + styles.nationalSecurityDark;
}

export function addNationalSecurityLight(cssClass) {
    return cssClass + ' ' + styles.nationalSecurityLight;
}

export function addNationalSecurityMedium(cssClass) {
    return cssClass + ' ' + styles.nationalSecurityMedium;
}

export function addPrivateEnterpriseDark(cssClass) {
    return cssClass + ' ' + styles.privateEnterpriseDark;
}

export function addPrivateEnterpriseLight(cssClass) {
    return cssClass + ' ' + styles.privateEnterpriseLight;
}

export function addPrivateEnterpriseMedium(cssClass) {
    return cssClass + ' ' + styles.privateEnterpriseMedium;
}

export function addSocialWelfareDark(cssClass) {
    return cssClass + ' ' + styles.socialWelfareDark;
}

export function addSocialWelfareLight(cssClass) {
    return cssClass + ' ' + styles.socialWelfareLight;
}

export function addSocialWelfareMedium(cssClass) {
    return cssClass + ' ' + styles.socialWelfareMedium;
}