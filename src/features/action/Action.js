import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    borrowMoney,
    payLoan,
    raiseTaxes,
    selectActionsPossible,
    selectCanPayLoan 
} from '../game/gameSlice';
import * as Constants from '../../constants';
import * as Util from '../../util';
import * as Actions from './ActionConstants';
import styles from'./Action.module.css';

export function Action(props) {
    const id = props.id;
    const name = props.name;
    const actionsPossible = useSelector(selectActionsPossible);
    const canPayLoan = useSelector(selectCanPayLoan)
    const dispatch = useDispatch();

    return getButton(id, name, actionsPossible, canPayLoan, dispatch);
}

function getButton(id, name, actionsPossible, canPayLoan, dispatch) {
    var actionClass = styles.action;
    var loanActionClass;

    if (actionsPossible) {
        actionClass = Util.makeClickable(actionClass);
        if (canPayLoan) {
            loanActionClass = Util.makeClickable(styles.action);
        } else {
            loanActionClass = Util.makeUnclickable(styles.action);
        }
    } else {
        actionClass = Util.makeUnclickable(actionClass);
        loanActionClass = Util.makeUnclickable(actionClass);
    }

    switch (id) {
        case Actions.BORROW_MONEY_ID:
            return (
                <div id={`action-${id}`} className={actionClass} onClick={() => dispatch(borrowMoney())}>
                    <div id={`action-${id}-title`} className={styles.actionTitle}>
                        {name}
                    </div>
                    <div id={`action-${id}-effect`} className={styles.actionEffect}>
                    <span className={styles.actionText}>Add</span>
                    <img
                        id={`action-${id}-action-cube`}
                        className={styles.actionActionCube}
                        src={Constants.INCOME_CUBE}
                        alt={`action-${id}-income-cube`} />
                    <img
                        id={`action-${id}-action-cube`}
                        className={styles.actionActionCube}
                        src={Constants.INCOME_CUBE}
                        alt={`action-${id}-income-cube`} />
                    </div>
                    <div id={`action-${id}-effect`} className={styles.actionEffect}>
                    <span className={styles.actionText}>Add to Bag</span>
                    <img
                        id={`action-${id}-action-cube`}
                        className={styles.actionActionCube}
                        src={Constants.DEBT_CUBE}
                        alt={`action-${id}-debt-cube`} />
                    </div>
                </div>
            );
        case Actions.PAY_LOAN_ID:
            return (
                <div
                    id={`action-${id}`}
                    className={loanActionClass}
                    onClick={() => dispatch(payLoan())}>
                    <div id={`action-${id}-title`} className={styles.actionTitle}>
                        {name}
                    </div>
                    <div id={`action-${id}-effect`} className={styles.actionEffect}>
                    <span className={styles.actionText}>Remove</span>
                    <img
                        id={`action-${id}-action-cube`}
                        className={styles.actionActionCube}
                        src={Constants.INCOME_CUBE}
                        alt={`action-${id}-income-cube`} />
                    <img
                        id={`action-${id}-action-cube`}
                        className={styles.actionActionCube}
                        src={Constants.INCOME_CUBE}
                        alt={`action-${id}-income-cube`} />
                    <img
                        id={`action-${id}-action-cube`}
                        className={styles.actionActionCube}
                        src={Constants.DEBT_CUBE}
                        alt={`action-${id}-debt-cube`} />
                    </div>
                </div>
            );
        case Actions.RAISE_TAXES_ID:
            return (
                <div id={`action-${id}`} className={actionClass} onClick={() => dispatch(raiseTaxes())}>
                    <div id={`action-${id}-title`} className={styles.actionTitle}>
                        {name}
                    </div>
                    <div id={`action-${id}-effect`} className={styles.actionEffect}>
                    <span className={styles.actionText}>Add to Bag</span>
                    <img
                        id={`action-${id}-action-cube`}
                        className={styles.actionActionCube}
                        src={Constants.INCOME_CUBE}
                        alt={`action-${id}-income-cube`} />
                    <img
                        id={`action-${id}-action-cube`}
                        className={styles.actionActionCube}
                        src={Constants.UNREST_CUBE}
                        alt={`action-${id}-unrest-cube`} />
                    </div>
                </div>
            );
        default:
            return;
    }
}

export default Action;