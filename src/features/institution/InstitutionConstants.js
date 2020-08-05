import * as Constants from '../../constants';

// National Security
export const NATIONAL_SECURITY_ID = 'national-security';
export const NATIONAL_SECURITY_NAME = 'National Security';
export const INITIAL_NATIONAL_SECURITY = {
    id: NATIONAL_SECURITY_ID,
    name: NATIONAL_SECURITY_NAME,
    cuts: [Constants.DEBT_UNREST_CUT, Constants.DEBT_SECURITY_CUT],
    value: 0,
    funded: false,
};


// Private Enterprise
export const PRIVATE_ENTERPRISE_ID = 'private-enterprise';
export const PRIVATE_ENTERPRISE_NAME = 'Private Enterprise';
export const INITIAL_PRIVATE_ENTERPRISE = {
    id: PRIVATE_ENTERPRISE_ID,
    name: PRIVATE_ENTERPRISE_NAME,
    cuts: [Constants.DEBT_INCOME_CUT, Constants.DEBT_UNREST_CUT, Constants.DEBT_WELFARE_CUT],
    value: 0,
    funded: false,
};


// Social Welfare
export const SOCIAL_WELFARE_ID = 'social-welfare';
export const SOCIAL_WELFARE_NAME = 'Social Welfare'
export const INITIAL_SOCIAL_WELFARE = {
    id: SOCIAL_WELFARE_ID,
    name: SOCIAL_WELFARE_NAME,
    cuts: [Constants.DEBT_SECURITY_CUT, Constants.DEBT_INCOME_CUT, Constants.DEBT_WELFARE_CUT],
    value: 0,
    funded: false,
};
