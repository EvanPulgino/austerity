import * as Constants from '../../constants';

// Bag
export const BAG_NAME = "Bag";
export const INITIAL_BAG = {
    name: BAG_NAME,
    contents: [
        { cube: Constants.DEBT_CUBE, clickable: false },
        { cube: Constants.DEBT_CUBE, clickable: false },
        { cube: Constants.DEBT_CUBE, clickable: false },
        { cube: Constants.DEBT_CUBE, clickable: false },
        { cube: Constants.UNREST_CUBE, clickable: false },
        { cube: Constants.UNREST_CUBE, clickable: false },
        { cube: Constants.SECURITY_CUBE, clickable: false },
        { cube: Constants.SECURITY_CUBE, clickable: false },
        { cube: Constants.WELFARE_CUBE, clickable: false },
        { cube: Constants.INCOME_CUBE, clickable: false },
    ],
};

// Current
export const CURRENT_NAME = "Current";
export const INITIAL_CURRENT = {
    name: CURRENT_NAME,
    contents: []
};

// Treasury
export const TREASURY_NAME = "Treasury";
export const INITIAL_TREASURY = {
    name: TREASURY_NAME,
    contents: []
};

// Used
export const USED_NAME = "Used";
export const INITIAL_USED = {
    name: USED_NAME,
    contents: []
};