import * as Constants from '../../constants';
import * as Events from './EventConstants';

export function getInitialEvents() {
    return [
        Events.INITIAL_ECONOMIC_DOWNTURN,
        Events.INITIAL_UNDERFUNDED_POLICE_FORCE,
        Events.INITIAL_POLITICAL_CORRUPTION,
        Events.INITIAL_ANTI_AUSTERITY_PROTESTS,
        Events.INITIAL_INDUSTRIAL_VIOLATIONS,
        Events.INITIAL_WELFARE_CHEATS,
        Events.INITIAL_BACK_TO_WORK_PROGRAMME,
        Events.INITIAL_BUDGET_SURPLUS,
        Events.INITIAL_EARLY_REPAYMENTS,
        Events.INITIAL_SECURITY_SPENDING,
        Events.INITIAL_FALLING_CRIME_RATES,
        Events.INITIAL_SPECIAL_OPERATIONS,
        Events.INITIAL_WELFARE_CHEAT_CRACKDOWN,
        Events.INITIAL_NATIONALISED_HEALTHCARE_SPENDING,
        Events.INITIAL_WELFARE_BUDGET_PROBLEMS
    ];
};

export function findCurrentEvent(cubes) {
    if (cubes.includes(Constants.INCOME_CUBE) && cubes.includes(Constants.UNREST_CUBE)) {
        return Events.ANTI_AUSTERITY_PROTESTS_ID;
    }

    if (Constants.WELFARE_CUBE === cubes[0] && Constants.WELFARE_CUBE === cubes[1]) {
        return Events.BACK_TO_WORK_PROGRAMME_ID;
    }

    if (Constants.INCOME_CUBE === cubes[0] && Constants.INCOME_CUBE === cubes[1]) {
        return Events.BUDGET_SURPLUS_ID;
    }

    if (cubes.includes(Constants.DEBT_CUBE) && cubes.includes(Constants.INCOME_CUBE)) {
        return Events.EARLY_REPAYMENTS_ID;
    }

    if (Constants.DEBT_CUBE === cubes[0] && Constants.DEBT_CUBE === cubes[1]) {
        return Events.ECONOMIC_DOWNTURN_ID;
    }

    if (Constants.SECURITY_CUBE === cubes[0] && Constants.SECURITY_CUBE === cubes[1]) {
        return Events.FALLING_CRIME_RATES_ID;
    }

    if (Constants.UNREST_CUBE === cubes[0] && Constants.UNREST_CUBE === cubes[1]) {
        return Events.INDUSTRIAL_VIOLATIONS_ID;
    }

    if (cubes.includes(Constants.INCOME_CUBE) && cubes.includes(Constants.WELFARE_CUBE)) {
        return Events.NATIONALISED_HEALTHCARE_SPENDING_ID;
    }

    if (cubes.includes(Constants.DEBT_CUBE) && cubes.includes(Constants.UNREST_CUBE)) {
        return Events.POLITICAL_CORRUPTION_ID;
    }

    if (cubes.includes(Constants.INCOME_CUBE) && cubes.includes(Constants.SECURITY_CUBE)) {
        return Events.SECURITY_SPENDING_ID;
    }

    if (cubes.includes(Constants.SECURITY_CUBE) && cubes.includes(Constants.UNREST_CUBE)) {
        return Events.SPECIAL_OPERATIONS_ID;
    }

    if (cubes.includes(Constants.DEBT_CUBE) && cubes.includes(Constants.SECURITY_CUBE)) {
        return Events.UNDERFUNDED_POLICE_FORCE_ID;
    }

    if (cubes.includes(Constants.DEBT_CUBE) && cubes.includes(Constants.WELFARE_CUBE)) {
        return Events.WELFARE_BUDGET_PROBLEMS_ID;
    }

    if (cubes.includes(Constants.SECURITY_CUBE) && cubes.includes(Constants.WELFARE_CUBE)) {
        return Events.WELFARE_CHEAT_CRACKDOWN_ID;
    }

    if (cubes.includes(Constants.UNREST_CUBE) && cubes.includes(Constants.WELFARE_CUBE)) {
        return Events.WELFARE_CHEATS_ID;
    }
}