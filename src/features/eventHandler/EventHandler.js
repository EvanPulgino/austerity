import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    adjustHealth,
    adjustPopularity,
    adjustWealth,
    antiAusterityProtestsIncreasePopularity,
    antiAusterityProtestsRemoveCubes,
    backToWorkProgramme,
    budgetSurplus,
    checkVictory,
    collectTaxRevenue,
    cutNationalSecurity,
    cutPrivateEnterprise,
    cutSocialWelfare,
    earlyRepaymentsFromCurrent,
    earlyRepaymentsFromTreasury,
    earlyRepaymentsOptOut,
    economicDownturn,
    fallingCrimeRates,
    industrialViolations,
    nationalisedHealthcareSpending,
    politicalCorruption,
    refundDoNothing,
    refundNationalSecurity,
    refundPrivateEnterprise,
    refundSocialWelfare,
    securitySpendingIncreasePopularity,
    securitySpendingIncreasePublicSafety,
    selectCubesToRemove,
    selectCurrentEvent,
    selectCuts,
    selectGameLost,
    selectGameWon,
    selectFundedInstitutions,
    selectInYearEnd,
    selectIncomeInTreasury,
    selectInstitutionsToCut,
    specialOperationsReducePublicSafety,
    specialOperationsRemoveCubes,
    startNextYear,
    underfundedPoliceForceAddUnrest,
    underfundedPoliceForceTreasuryIncome,
    welfareBudgetProblemsReduceHealth,
    welfareBudgetProblemsSpendIncome,
    welfareCheatCrakdownChangeTracks,
    welfareCheatCrakdownRemoveCube,
    welfareCheats,
} from '../game/gameSlice';
import * as Constants from '../../constants';
import * as Util from '../../util';
import * as Events from '../event/EventConstants';
import * as Institutions from '../institution/InstitutionConstants';
import styles from './EventHandler.module.css';

export function EventHandler() {
    const cubesToRemove = useSelector(selectCubesToRemove);
    const currentEvent = useSelector(selectCurrentEvent);
    const cuts = useSelector(selectCuts);
    const gameLost = useSelector(selectGameLost);
    const gameWon = useSelector(selectGameWon);
    const fundedInstitutions = useSelector(selectFundedInstitutions);
    const inYearEnd = useSelector(selectInYearEnd);
    const incomeInTreasury = useSelector(selectIncomeInTreasury);
    const institutionsToCut = useSelector(selectInstitutionsToCut);
    const dispatch = useDispatch();

    return (
        <div id="current-event-handler" className={getEventHandlerClass(gameLost, gameWon)}>
            <div id="event-buttons" className={showEventButtons(currentEvent)}>
                {handleEvent(currentEvent, incomeInTreasury, cubesToRemove, cuts, institutionsToCut, inYearEnd, fundedInstitutions, dispatch)}
            </div>
        </div>
    );
}

function getEventHandlerClass(gameLost, gameWon) {
    if (gameLost || gameWon) {
        return Util.makeInvisible(styles.currentEventHandler);
    }
    return styles.currentEventHandler;
}

function showEventButtons(currentEvent) {
    if (currentEvent) {
        return styles.eventButtons;
    }
    return Util.makeInvisible(styles.eventButtons);
}

function handleEvent(currentEvent, incomeInTreasury, cubesToRemove, cuts, institutionsToCut, inYearEnd, fundedInstitutions, dispatch) {

    if (inYearEnd) {
        return handleYearEnd(currentEvent, dispatch);
    }

    switch (currentEvent) {
        case "cut-institutions":
            return handleInstitutionCuts(institutionsToCut);
        case "implement-cuts":
            return handleCuts(dispatch, cuts);
        case "paying-loan":
            return handlePayingLoan(cubesToRemove);
        case "refund-institutions":
            return handleRefundInstitutions(fundedInstitutions, dispatch);
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

function handleYearEnd(currentEvent, dispatch) {
    var checkWinClass = styles.eventButton;
    var collectTaxRevenueClass = styles.eventButton;
    var adjustWealthClass = styles.eventButton;
    var adjustHealthClass = styles.eventButton;
    var adjustPopularityClass = styles.eventButton;
    var startNextYearClass = styles.eventButton;

    switch (currentEvent) {
        case 'check-victory':
            collectTaxRevenueClass = Util.makeUnclickable(collectTaxRevenueClass);
            adjustWealthClass = Util.makeUnclickable(adjustWealthClass);
            adjustHealthClass = Util.makeUnclickable(adjustHealthClass);
            adjustPopularityClass = Util.makeUnclickable(adjustPopularityClass);
            startNextYearClass = Util.makeUnclickable(startNextYearClass);
            break;
        case 'collect-taxes':
            checkWinClass = Util.makeInvisible(checkWinClass);
            adjustWealthClass = Util.makeUnclickable(adjustWealthClass);
            adjustHealthClass = Util.makeUnclickable(adjustHealthClass);
            adjustPopularityClass = Util.makeUnclickable(adjustPopularityClass);
            startNextYearClass = Util.makeUnclickable(startNextYearClass);
            break;
        case 'adjust-wealth':
            checkWinClass = Util.makeInvisible(checkWinClass);
            collectTaxRevenueClass = Util.makeInvisible(collectTaxRevenueClass);
            adjustHealthClass = Util.makeUnclickable(adjustHealthClass);
            adjustPopularityClass = Util.makeUnclickable(adjustPopularityClass);
            startNextYearClass = Util.makeUnclickable(startNextYearClass);
            break;
        case 'adjust-health':
            checkWinClass = Util.makeInvisible(checkWinClass);
            collectTaxRevenueClass = Util.makeInvisible(collectTaxRevenueClass);
            adjustWealthClass = Util.makeInvisible(adjustWealthClass);
            adjustPopularityClass = Util.makeUnclickable(adjustPopularityClass);
            startNextYearClass = Util.makeUnclickable(startNextYearClass);
            break;
        case 'adjust-popularity':
            checkWinClass = Util.makeInvisible(checkWinClass);
            collectTaxRevenueClass = Util.makeInvisible(collectTaxRevenueClass);
            adjustWealthClass = Util.makeInvisible(adjustWealthClass);
            adjustHealthClass = Util.makeInvisible(adjustHealthClass);
            startNextYearClass = Util.makeUnclickable(startNextYearClass);
            break;
        case 'start-next-year':
            checkWinClass = Util.makeInvisible(checkWinClass);
            collectTaxRevenueClass = Util.makeInvisible(collectTaxRevenueClass);
            adjustWealthClass = Util.makeInvisible(adjustWealthClass);
            adjustHealthClass = Util.makeInvisible(adjustHealthClass);
            adjustPopularityClass = Util.makeInvisible(adjustPopularityClass);
            break;
        default:
            break;
    }

    return (
        <div className={styles.eventButtons}>
            <div
                id="check-victory-button"
                className={checkWinClass}
                onClick={() => dispatch(checkVictory())}>
                    Check Victory
            </div>
            <div
                id="collect-taxes-button"
                className={collectTaxRevenueClass}
                onClick={() => dispatch(collectTaxRevenue())}>
                    Collect Tax Revenue
            </div>
            <div
                id="adjust-wealth-button"
                className={adjustWealthClass}
                onClick={() => dispatch(adjustWealth())}>
                    Adjust Wealth
            </div>
            <div
                id="adjust-health-button"
                className={adjustHealthClass}
                onClick={() => dispatch(adjustHealth())}>
                    Adjust Health
            </div>
            <div
                id="adjust-popularity-button"
                className={adjustPopularityClass}
                onClick={() => dispatch(adjustPopularity())}>
                    Adjust Popularity
            </div>
            <div
                id="start-next-year-button"
                className={startNextYearClass}
                onClick={() => dispatch(startNextYear())}>
                    Start Next Year
            </div>
        </div>
    );
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

function handleInstitutionCuts() {
    return (
        <div id="institution-cuts-message">
            Resolve Cuts
        </div>
    );
}

function handleCuts(dispatch, cuts) {
    switch(cuts) {
        case Constants.DEBT_INCOME_CUT:
            return (
                <div id="cuts-choice">
                    <div id="cut-private-enterprise" className={styles.eventButton} onClick={() => dispatch(cutPrivateEnterprise())}>
                        Cut Private Enterprise
                    </div>
                    <div id="cut-social-welfare" className={styles.eventButton} onClick={() => dispatch(cutSocialWelfare())}>
                        Cut Social Welfare
                    </div>
                </div>
            );
        case Constants.DEBT_SECURITY_CUT:
            return (
                <div id="cuts-choice">
                    <div id="cut-national-security" className={styles.eventButton} onClick={() => dispatch(cutNationalSecurity())}>
                        Cut National Security
                    </div>
                    <div id="cut-social-welfare" className={styles.eventButton} onClick={() => dispatch(cutSocialWelfare())}>
                        Cut Social Welfare
                    </div>
                </div>
            );
        case Constants.DEBT_UNREST_CUT:
            return (
                <div id="cuts-choice">
                    <div id="cut-private-enterprise" className={styles.eventButton} onClick={() => dispatch(cutPrivateEnterprise())}>
                        Cut Private Enterprise
                    </div>
                    <div id="cut-national-security" className={styles.eventButton} onClick={() => dispatch(cutNationalSecurity())}>
                        Cut National Security
                    </div>
                </div>
            );
        case Constants.DEBT_WELFARE_CUT:
            return (
                <div id="cuts-choice">
                    <div id="cut-private-enterprise" className={styles.eventButton} onClick={() => dispatch(cutPrivateEnterprise())}>
                        Cut Private Enterprise
                    </div>
                    <div id="cut-social-welfare" className={styles.eventButton} onClick={() => dispatch(cutSocialWelfare())}>
                        Cut Social Welfare
                    </div>
                </div>
            );
        default: 
            return;
    }
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

function handlePayingLoan(cubesToRemove) {
    var debtClass = styles.loanText;
    var incomeClass = styles.loanText;
    var debtCount = 0;
    var incomeCount = 0;

    for (let i = 0; i < cubesToRemove.length; i++) {
        if (cubesToRemove[i] === Constants.DEBT_CUBE) {
            debtCount++;
        }
        if (cubesToRemove[i] === Constants.INCOME_CUBE) {
            incomeCount++;
        }
    }

    if (debtCount === 0) {
        debtClass = Util.makeInvisible(debtClass)
    }

    if (incomeCount === 0) {
        incomeClass = Util.makeInvisible(debtClass);
    }

    return (
        <div id="paying-loan" className={styles.payingLoanMessage}>
            <div>Remove</div>
            <div className={incomeClass}>{incomeCount} Income</div>
            <div className={debtClass}>{debtCount} Debt</div>
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

function handleRefundInstitutions(fundedInstitutions, dispatch) {
    var privateEnterpriseClass = styles.eventButton;
    var nationalSecurityClass = styles.eventButton;
    var socialWelfareClass = styles.eventButton;

    if (!fundedInstitutions.includes(Institutions.PRIVATE_ENTERPRISE_ID)) {
        privateEnterpriseClass = Util.makeUnclickable(privateEnterpriseClass);
    }
    if (!fundedInstitutions.includes(Institutions.NATIONAL_SECURITY_ID)) {
        nationalSecurityClass = Util.makeUnclickable(nationalSecurityClass);
    }
    if (!fundedInstitutions.includes(Institutions.SOCIAL_WELFARE_ID)) {
        socialWelfareClass = Util.makeUnclickable(socialWelfareClass);
    }

    return (
        <div className={styles.eventButtons}>
            <div
                id="refund-private-enterprise"
                className={privateEnterpriseClass}
                onClick={() => dispatch(refundPrivateEnterprise())}>
                    Fund Private Enterprise
            </div>
            <div
                id="refund-national-security"
                className={nationalSecurityClass}
                onClick={() => dispatch(refundNationalSecurity())}>
                    Fund National Security
            </div>
            <div
                id="refund-social-welfare"
                className={socialWelfareClass}
                onClick={() => dispatch(refundSocialWelfare())}>
                    Fund Social Welfare
            </div>
            <div
                id="refund-no-action"
                className={styles.eventButton}
                onClick={() => dispatch(refundDoNothing())}>
                    Do Nothing
            </div>
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

