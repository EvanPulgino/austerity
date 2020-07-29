import * as Actions from './ActionConstants';

export function getInitialActions() {
    return [
        Actions.INITIAL_BORROW_MONEY,
        Actions.INITIAL_RAISE_TAXES,
        Actions.INITIAL_PAY_LOAN,
    ];
}