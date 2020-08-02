import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    antiAusterityProtestsIncreasePopularity,
    antiAusterityProtestsRemoveCubes,
    backToWorkProgramme,
    budgetSurplus,
    earlyRepaymentsFromCurrent,
    earlyRepaymentsFromTreasury,
    earlyRepaymentsOptOut,
    economicDownturn,
    fallingCrimeRates,
    industrialViolations,
    nationalisedHealthcareSpending,
    politicalCorruption,
    securitySpendingIncreasePopularity,
    securitySpendingIncreasePublicSafety,
    selectCurrentEvent,
    selectIncomeInTreasury,
    specialOperationsReducePublicSafety,
    specialOperationsRemoveCubes,
    underfundedPoliceForceAddUnrest,
    underfundedPoliceForceTreasuryIncome,
    welfareBudgetProblemsReduceHealth,
    welfareBudgetProblemsSpendIncome,
    welfareCheatCrakdownChangeTracks,
    welfareCheatCrakdownRemoveCube,
    welfareCheats,
} from '../game/gameSlice';
import * as Util from '../../util';
import * as Events from '../event/EventConstants';
import styles from './EventHandler.module.css';

export function EventHandler() {
    const currentEvent = useSelector(selectCurrentEvent);
    const incomeInTreasury = useSelector(selectIncomeInTreasury);
    const dispatch = useDispatch();

    return (
        <div id="current-event-handler" className={styles.currentEventHandler}>
            <div id="event-buttons" className={showEventButtons(currentEvent)}>
            {handleEvent(currentEvent, incomeInTreasury, dispatch)}
            </div>
        </div>
    );
}

function showEventButtons(currentEvent) {
    if (currentEvent) {
        return styles.eventButtons;
    }
    return Util.makeInvisible(styles.eventButtons);
}

function handleEvent(currentEvent, incomeInTreasury, dispatch) {
    switch (currentEvent) {
        case Events.ANTI_AUSTERITY_PROTESTS_ID:
            return handleAntiAusterityProtests(dispatch);
        case Events.BACK_TO_WORK_PROGRAMME_ID:
            return handleBackToWorkProgramme(dispatch);
        case Events.BUDGET_SURPLUS_ID:
            return handleBudgetSurplus(dispatch);
        case Events.EARLY_REPAYMENTS_ID:
            return handleEarlyRepaymemts(incomeInTreasury, dispatch);
        case Events.ECONOMIC_DOWNTURN_ID:
            return handleEconomicDownturn(dispatch);
        case Events.FALLING_CRIME_RATES_ID:
            return handleFallingCrimeRates(dispatch);
        case Events.INDUSTRIAL_VIOLATIONS_ID:
            return handleIndustrialViolations(dispatch);
        case Events.NATIONALISED_HEALTHCARE_SPENDING_ID:
            return handleNationalisedHealthcareSpending(dispatch);
        case Events.POLITICAL_CORRUPTION_ID:
            return handlePoliticalCorruption(dispatch);
        case Events.SECURITY_SPENDING_ID:
            return handleSecuritySpending(dispatch);
        case Events.SPECIAL_OPERATIONS_ID:
            return handleSpecialOperations(dispatch);
        case Events.UNDERFUNDED_POLICE_FORCE_ID:
            return handleUnderfundedPoliceForce(incomeInTreasury, dispatch);
        case Events.WELFARE_BUDGET_PROBLEMS_ID:
            return handleWelfareBudgetProblems(incomeInTreasury, dispatch);
        case Events.WELFARE_CHEAT_CRACKDOWN_ID:
            return handleWelfareCheatCrackdown(dispatch);
        case Events.WELFARE_CHEATS_ID:
            return handleWelfareCheats(dispatch);
        default:
            return;
    }
}

function handleAntiAusterityProtests(dispatch) {
    return (
        <div className={styles.eventButtons}>
            <div
                id="anti-austerity-protests-remove-cubes-button"
                className={styles.eventButton}
                onClick={() => dispatch(antiAusterityProtestsRemoveCubes())}>
                    Remove Income and Unrest
            </div>
            <div
                id="anti-austerity-protests-increase-popularity-button"
                className={styles.eventButton}
                onClick={() => dispatch(antiAusterityProtestsIncreasePopularity())}>
                    Increase POPULARITY by one and add Debt
            </div>
        </div>
    );
}

function handleBackToWorkProgramme(dispatch) {
    return (
        <div id="back-to-work-programme-button" className={styles.eventButton} onClick={() => dispatch(backToWorkProgramme())}>
            Increase EMPLOYMENT by two
        </div>
    );
}

function handleBudgetSurplus(dispatch) {
    return (
        <div id="budget-surplus-button" className={styles.eventButton} onClick={() => dispatch(budgetSurplus())}>
            Increase WEALTH by one
        </div>
    );
}

function handleEarlyRepaymemts(incomeInTreasury, dispatch) {
    var incomeActionClass = styles.eventButton;
    if (!incomeInTreasury) {
        incomeActionClass = Util.makeUnclickable(styles.eventButton);
    }

    return (
        <div className={styles.eventButtons}>
            <div
                id="early-repayments-spend-current-button"
                className={styles.eventButton}
                onClick={() => dispatch(earlyRepaymentsFromCurrent())}>
                    Spend Income from Current to Remove Debt
            </div>
            <div
                id="early-repayments-spend-treasury-button"
                className={incomeActionClass}
                onClick={() => dispatch(earlyRepaymentsFromTreasury())}>
                    Spend Income from Treasury to Remove Debt
            </div>
            <div
                id="early-repayments-opt-out-button"
                className={styles.eventButton}
                onClick={() => dispatch(earlyRepaymentsOptOut())}>
                    Do nothing
            </div>
        </div>
    );
}

function handleEconomicDownturn(dispatch) {
    return (
        <div id="economic-downturn-button" className={styles.eventButton} onClick={() => dispatch(economicDownturn())}>
            Reduce WEALTH by one and increase cuts on every institution by one
        </div>
    );
}

function handleFallingCrimeRates(dispatch) {
    return (
        <div id="falling-crime-rates-button" className={styles.eventButton} onClick={() => dispatch(fallingCrimeRates())}>
            Increase PUBLIC SAFETY by two
        </div>
    );
}


function handleIndustrialViolations(dispatch) {
    return (
        <div id="industrial-violations-button" className={styles.eventButton} onClick={() => dispatch(industrialViolations())}>
            Decrease PUBLIC SAFETY by two
        </div>
    );
}

function handleNationalisedHealthcareSpending(dispatch) {
    return (
        <div id="nationalised-healthcare-spending-button" className={styles.eventButton} onClick={() => dispatch(nationalisedHealthcareSpending())}>
            Increase HEALTH by two
        </div>
    );
}

function handlePoliticalCorruption(dispatch) {
    return (
        <div id="political-corruption-button" className={styles.eventButton} onClick={() => dispatch(politicalCorruption())}>
            Decrease POPULARITY by one
        </div>
    );
}

function handleSecuritySpending(dispatch) {
    return (
        <div className={styles.eventButtons}>
            <div
                id="security-spending-increase-popularity-button"
                className={styles.eventButton}
                onClick={() => dispatch(securitySpendingIncreasePopularity())}>
                    Increase POPULARITY by 1
            </div>
            <div
                id="security-spending-increase-public-safety-button"
                className={styles.eventButton}
                onClick={() => dispatch(securitySpendingIncreasePublicSafety())}>
                    Increase PUBLIC SAFETY by 1
            </div>
        </div>
    );
}

function handleSpecialOperations(dispatch) {
    return (
        <div className={styles.eventButtons}>
            <div
                id="special-operations-remove-cubes-button"
                className={styles.eventButton}
                onClick={() => dispatch(specialOperationsRemoveCubes())}>
                    Remove Security and Unrest
            </div>
            <div
                id="special-operations-reduce-public-safety-button"
                className={styles.eventButton}
                onClick={() => dispatch(specialOperationsReducePublicSafety())}>
                    Reduce PUBLIC SAFETY by one
            </div>
        </div>
    );
}

function handleUnderfundedPoliceForce(incomeInTreasury, dispatch) {
    var incomeActionClass = styles.eventButton;
    if (!incomeInTreasury) {
        incomeActionClass = Util.makeUnclickable(styles.eventButton);
    }

    return (
        <div className={styles.eventButtons}>
            <div
                id="underfunded-police-force-spend-income-button"
                className={incomeActionClass}
                onClick={() => dispatch(underfundedPoliceForceTreasuryIncome())}>
                    Spend Income from Treasury
            </div>
            <div
                id="underfunded-police-force-add-unrest-button"
                className={styles.eventButton}
                onClick={() => dispatch(underfundedPoliceForceAddUnrest())}>
                    Add Unrest
            </div>
        </div>
    );
}

function handleWelfareBudgetProblems(incomeInTreasury, dispatch) {
    var incomeActionClass = styles.eventButton;
    if (!incomeInTreasury) {
        incomeActionClass = Util.makeUnclickable(styles.eventButton);
    }

    return (
        <div className={styles.eventButtons}>
            <div
                id="welfare-budget-problems-spend-income-button"
                className={incomeActionClass}
                onClick={() => dispatch(welfareBudgetProblemsSpendIncome())}>
                    Spend Income from Treasury
            </div>
            <div
                id="welfare-budget-problems-reduce-health-button"
                className={styles.eventButton}
                onClick={() => dispatch(welfareBudgetProblemsReduceHealth())}>
                    Reduce HEALTH by one
            </div>
        </div>
    );
}

function handleWelfareCheatCrackdown(dispatch) {
    return (
        <div className={styles.eventButtons}>
            <div
                id="welfare-cheat-crackdown-remove-cube-button"
                className={styles.eventButton}
                onClick={() => dispatch(welfareCheatCrakdownRemoveCube())}>
                    Remove Welfare
            </div>
            <div
                id="welfare-cheat-crackdown-adjust-tracks-button"
                className={styles.eventButton}
                onClick={() => dispatch(welfareCheatCrakdownChangeTracks())}>
                    Increase EMPLOYMENT by 1 and decrease POPULARITY by 1
            </div>
        </div>
    );
}

function handleWelfareCheats(dispatch) {
    return (
        <div id="welfare-cheats-button" className={styles.eventButton} onClick={() => dispatch(welfareCheats())}>
            Decrease EMPLOYMENT by one
        </div>
    );
}

