import { createSlice } from '@reduxjs/toolkit';
import * as ActionUtil from '../action/ActionUtil';
import * as AreaUtil from '../area/AreaUtil';
import * as EventUtil from '../event/EventUtil';
import * as Institutions from '../institution/InstitutionConstants';
import * as InstitutionUtil from '../institution/InstitutionUtil';
import * as TrackUtil from '../track/TrackUtil';
import * as Constants from '../../constants';
import * as Util from '../../util';

export const gameSlice = createSlice({
    name: 'game',
    initialState: initialState(),
    reducers: {
        adjustHealth: (state) => {
            if (state.tracks[1].value < state.tracks[3].value) {
                state.tracks[3].value = Math.max(state.tracks[3].value - 1, 0);
            }
            if (state.tracks[1].value > state.tracks[3].value) {
                state.tracks[3].value = Math.min(state.tracks[3].value + 1, 10);
            }

            if (state.tracks[3] === 0) {
                state.gameLost = true;
            } else {
                state.currentEvent = 'adjust-popularity';
            }
        },
        adjustPopularity: (state) => {
            if (state.tracks[2].value < state.tracks[4].value) {
                state.tracks[4].value = Math.max(state.tracks[4].value - 1, 0);
            }
            if (state.tracks[2].value > state.tracks[4].value) {
                state.tracks[4].value = Math.min(state.tracks[4].value + 1, 10);
            }
            if (state.tracks[3].value < state.tracks[4].value) {
                state.tracks[4].value = Math.max(state.tracks[4].value - 1, 0);
            }
            if (state.tracks[3].value > state.tracks[4].value) {
                state.tracks[4].value = Math.min(state.tracks[4].value + 1, 10);
            }

            if (state.tracks[4] === 0) {
                state.gameLost = true;
            } else {
                state.currentEvent = 'start-next-year';
            }
        },
        adjustWealth: (state) => {
            if (state.tracks[0].value < state.tracks[2].value) {
                state.tracks[2].value = Math.max(state.tracks[2].value - 1, 0);
            }
            if (state.tracks[0].value > state.tracks[2].value) {
                state.tracks[2].value = Math.min(state.tracks[2].value + 1, 10);
            }

            if (state.tracks[2] === 0) {
                state.gameLost = true;
            } else {
                state.currentEvent = 'adjust-health';
            }
        },
        antiAusterityProtestsIncreasePopularity: (state) => {
            state.tracks[4].value = Math.min((state.tracks[4].value + 1), 10);
            state.areas[2].contents.push({cube: Constants.DEBT_CUBE, clickable: false});
            state.currentEvent = undefined;
            state.actionsPossible = true;
        },
        antiAusterityProtestsRemoveCubes: (state) => {
            state.areas[1].contents = [];
            state.currentEvent = undefined;
            state.actionsPossible = true;
        },
        backToWorkProgramme: (state) => {
            state.tracks[0].value = Math.min((state.tracks[0].value + 2), 10);
            state.currentEvent = undefined;
            state.actionsPossible = true;
        },
        borrowMoney: (state) => {
            state.areas[2].contents.push({cube: Constants.INCOME_CUBE, clickable: false});
            state.areas[2].contents.push({cube: Constants.INCOME_CUBE, clickable: false});
            state.areas[0].contents.push({cube: Constants.DEBT_CUBE, clickable: false});
        },
        budgetSurplus: (state) => {
            state.fundedInstitutions = [];
            state.tracks[2].value = Math.min((state.tracks[2].value + 1), 10);

            for (let i = 0; i < state.institutions.length; i++) {
                if (state.institutions[i].funded) {
                    state.fundedInstitutions.push(state.institutions[i].id);
                }
            }

            state.currentEvent = 'refund-institutions';
        },
        checkVictory: (state) => {
            var hasDebt = Util.findObjectWithAttribute(state.areas[2].contents, "cube", Constants.DEBT_CUBE);
            
            if (hasDebt === -1) {
                state.gameWon = true;
            } else {
                state.currentEvent = 'collect-taxes';
            }
        },
        collectTaxRevenue: (state) => {
            if (state.tracks[0].value > 8) {
                state.areas[3].contents.push({cube: Constants.INCOME_CUBE, clickable: false});
            }
            if (state.tracks[0].value > 4) {
                state.areas[3].contents.push({cube: Constants.INCOME_CUBE, clickable: false});
            }
            state.currentEvent = 'adjust-wealth';
        },
        cutNationalSecurity: (state) => {
            state.institutions[1].value = Math.min(state.institutions[1].value +=1, 3);
            
            if (state.institutions[1].value === 3) {
                state.institutionsToCut.push(state.institutions[1].id);
                state.currentEvent = "cut-institutions";
            } else {
                state.currentEvent = undefined;
                state.actionsPossible = true;
            }
            state.cuts = undefined;
            
        },
        cutNationalSecurityFinal: (state) => {
            state.areas[2].contents.push({cube: Constants.UNREST_CUBE, clickable: false})
            state.institutions[1].value = 0;
            var nationalSecurityIndex = state.institutionsToCut.indexOf(Institutions.NATIONAL_SECURITY_ID);
            state.institutionsToCut.splice(nationalSecurityIndex, 1);

            if (state.institutionsToCut.length === 0) {
                state.currentEvent = undefined;
                state.actionsPossible = true;
            }
        },
        cutPrivateEnterprise: (state) => {
            state.institutions[0].value = Math.min(state.institutions[0].value +=1, 3);
            
            if (state.institutions[0].value === 3) {
                state.institutionsToCut.push(state.institutions[0].id);
                state.currentEvent = "cut-institutions";
            } else {
                state.currentEvent = undefined;
                state.actionsPossible = true;
            }
            state.cuts = undefined;
        },
        cutPrivateEnterpriseFinal: (state) => {
            state.tracks[0].value = Math.max(state.tracks[0].value - 2, 0);

            if (state.tracks[0].value === 0) {
                state.gameLost = true;
            } else {
                state.institutions[0].value = 0;
                var privateEnterpriseIndex = state.institutionsToCut.indexOf(Institutions.PRIVATE_ENTERPRISE_ID);
                state.institutionsToCut.splice(privateEnterpriseIndex, 1);

                if (state.institutionsToCut.length === 0) {
                    state.currentEvent = undefined;
                    state.actionsPossible = true;
                }
            }
        },
        cutSocialWelfare: (state) => {
            state.institutions[2].value = Math.min(state.institutions[2].value +=1, 3);
            
            if (state.institutions[2].value === 3) {
                state.institutionsToCut.push(state.institutions[2].id);
                state.currentEvent = "cut-institutions";
            } else {
                state.currentEvent = undefined;
                state.actionsPossible = true;
            }
            state.cuts = undefined;
        },
        cutSocialWelfareFinal: (state) => {
            state.tracks[3].value = Math.max(state.tracks[3].value - 2, 0);

            if (state.tracks[3].value === 0) {
                state.gameLost = true;
            } else {
                state.institutions[2].value = 0;
                var socialWelfareIndex = state.institutionsToCut.indexOf(Institutions.SOCIAL_WELFARE_ID);
                state.institutionsToCut.splice(socialWelfareIndex, 1);

                if (state.institutionsToCut.length === 0) {
                    state.currentEvent = undefined;
                    state.actionsPossible = true;
                }
            }
        },
        drawCubes: (state) => {
            var bagContents = state.areas[0].contents;

            if (1 === bagContents.length) {
                var usedContents = state.areas[2].contents;
                usedContents.push(bagContents[0]);
                bagContents = [];
                state.areas[2].contents = usedContents;
            } else {
                var drawnCubes = [];
                var drawnCubeOne = Math.floor(Math.random() * bagContents.length);
                drawnCubes.push(bagContents[drawnCubeOne]);
                bagContents.splice(drawnCubeOne, 1);
                var drawnCubeTwo = Math.floor(Math.random() * bagContents.length);
                drawnCubes.push(bagContents[drawnCubeTwo]);
                bagContents.splice(drawnCubeTwo, 1);
                state.currentEvent = EventUtil.findCurrentEvent([drawnCubes[0].cube, drawnCubes[1].cube]);
                state.areas[1].contents = drawnCubes;
            }
            state.areas[0].contents = bagContents;
            state.actionsPossible = false;
            state.inTurn = true;
        },
        earlyRepaymentsFromCurrent: (state) => {
            state.areas[1].contents = [];
            state.currentEvent = undefined;
            state.actionsPossible = true;
        },
        earlyRepaymentsFromTreasury: (state) => {
            state.areas[3].contents.splice(0, 1);
            var debtCube = Util.findObjectWithAttribute(state.areas[1].contents, "cube", Constants.DEBT_CUBE);
            state.areas[1].contents.splice(debtCube, 1);
            state.currentEvent = undefined;
            state.actionsPossible = true;
        },
        earlyRepaymentsOptOut: (state) => {
            state.currentEvent = "implement-cuts";
            state.cuts = Constants.DEBT_INCOME_CUT;
        },
        endTurn: (state) => {
            for (let i = 0; i < state.areas[1].contents.length; i++) {
                state.areas[2].contents.push(state.areas[1].contents[i]);
            }
            state.areas[1].contents = [];
            state.inTurn = false;
        },
        endYear: (state) => {
            state.inYearEnd = true;
            state.currentEvent = "check-victory";
        },
        economicDownturn: (state) => {
            state.tracks[2].value -= 1;
            
            if (state.tracks[2].value === 0) {
                state.gameLost = true;
            } else {
                for (let i = 0; i < state.institutions.length; i++) {
                    state.institutions[i].value = state.institutions[i].value + 1;
                    if (state.institutions[i].value === 3) {
                        state.institutionsToCut.push(state.institutions[i].id);
                    }
                }

                if (state.institutionsToCut.length > 0) {
                    state.currentEvent = "cut-institutions";
                } else {
                    state.currentEvent = undefined;
                    state.actionsPossible = true;
                }
            }
        },
        fallingCrimeRates: (state) => {
            state.tracks[1].value = Math.min((state.tracks[1].value + 2), 10);
            state.currentEvent = undefined;
            state.actionsPossible = true;
        },
        fundInstitution: (state) => {
            state.currentEvent = 'fund-institution';
            state.actionsPossible = false;
        },
        fundNationalSecurity: (state) => {
            state.areas[2].contents.push({cube: Constants.SECURITY_CUBE, clickable: false});
            state.institutions[1].funded = true;
            var incomeIndex = Util.findObjectWithAttribute(state.areas[1].contents, "cube", Constants.INCOME_CUBE);
            state.areas[1].contents.splice(incomeIndex, 1);
            state.currentEvent = undefined;
            state.actionsPossible = true;
        },
        fundPrivateEnterprise: (state) => {
            state.tracks[0].value = Math.min(state.tracks[0].value + 1, 10);
            state.institutions[0].funded = true;
            var incomeIndex = Util.findObjectWithAttribute(state.areas[1].contents, "cube", Constants.INCOME_CUBE);
            state.areas[1].contents.splice(incomeIndex, 1);
            state.currentEvent = undefined;
            state.actionsPossible = true;
        },
        fundSocialWelfare: (state) => {
            state.areas[2].contents.push({cube: Constants.WELFARE_CUBE, clickable: false});
            state.institutions[2].funded = true;
            var incomeIndex = Util.findObjectWithAttribute(state.areas[1].contents, "cube", Constants.INCOME_CUBE);
            state.areas[1].contents.splice(incomeIndex, 1);
            state.currentEvent = undefined;
            state.actionsPossible = true;
        },
        industrialViolations: (state) => {
            state.tracks[1].value = Math.max((state.tracks[1].value - 2), 0);
            
            if (state.tracks[1].value === 0) {
                state.gameLost = true;
            } else {
                state.currentEvent = undefined;
                state.actionsPossible = true;
            }
        },
        nationalisedHealthcareSpending: (state) => {
            state.tracks[3].value = Math.min((state.tracks[3].value + 2), 10);
            state.currentEvent = "";
            state.actionsPossible = true;
        },
        payLoan: (state) => {
            var cubesToMakeClickable = [Constants.INCOME_CUBE, Constants.DEBT_CUBE];

            for (let i = 1; i < state.areas.length; i++) {
                for (let j = 0; j < state.areas[i].contents.length; j++) {
                    if (cubesToMakeClickable.includes(state.areas[i].contents[j].cube)) {
                        state.areas[i].contents[j].clickable = true;
                    }
                }
            }

            state.cubesToRemove = [Constants.DEBT_CUBE, Constants.INCOME_CUBE, Constants.INCOME_CUBE];
            state.payingLoan = true;
            state.actionsPossible = false;
            state.inTurn = true;
            state.currentEvent = "paying-loan";
        },
        politicalCorruption: (state) => {
            state.tracks[4].value -= 1;
            
            if (state.tracks[4].value === 0) {
                state.gameLost = true;
            } else {
                state.currentEvent = "implement-cuts";
                state.cuts = Constants.DEBT_UNREST_CUT;
            }
        },
        putIncomeInTreasury: (state) => {
            var incomeIndex = Util.findObjectWithAttribute(state.areas[1].contents, "cube", Constants.INCOME_CUBE);
            state.areas[1].contents.splice(incomeIndex, 1);
            state.areas[3].contents.push({cube: Constants.INCOME_CUBE, clickable: false})
        },
        raiseTaxes: (state) => {
            state.areas[0].contents.push({cube: Constants.INCOME_CUBE, clickable: false});
            state.areas[0].contents.push({cube: Constants.UNREST_CUBE, clickable: false});
        },
        refundDoNothing: (state) => {
            state.currentEvent = undefined;
        },
        refundNationalSecurity: (state) => {
            state.areas[2].contents.push({cube: Constants.SECURITY_CUBE, clickable: false});
            state.areas[1].contents = [];
            state.currentEvent = undefined;
        },
        refundPrivateEnterprise: (state) => {
            state.tracks[0].value = Math.min(state.tracks[0].value + 1, 10);
            state.areas[1].contents = [];
            state.currentEvent = undefined;
        },
        refundSocialWelfare: (state) => {
            state.areas[2].contents.push({cube: Constants.WELFARE_CUBE, clickable: false});
            state.areas[1].contents = [];
            state.currentEvent = undefined;
        },
        removeLoanCube: (state, action) => {
            var cube = action.payload.cube;
            var area = action.payload.area;
            var cubeIndex = Util.findObjectWithAttribute(state.areas[area].contents, "cube", cube);
            state.areas[area].contents.splice(cubeIndex, 1);

            for (let i = 0; i < state.cubesToRemove.length; i++) {
                if (cube === state.cubesToRemove[i]) {
                    state.cubesToRemove.splice(i, 1);
                    break;
                }
            }

            var cubesToMakeUnclickable = [Constants.INCOME_CUBE, Constants.DEBT_CUBE];

            for (let i = 1; i < state.areas.length; i++) {
                for (let j = 0; j < state.areas[i].contents.length; j++) {
                    if (cubesToMakeUnclickable.includes(state.areas[i].contents[j].cube)) {
                        state.areas[i].contents[j].clickable = false;
                    }
                }
            }

            for (let i = 1; i < state.areas.length; i++) {
                for (let j = 0; j < state.areas[i].contents.length; j++) {
                    if (state.cubesToRemove.includes(state.areas[i].contents[j].cube)) {
                        state.areas[i].contents[j].clickable = true;
                    }
                }
            }

            if (state.cubesToRemove.length === 0) {
                state.payingLoan = false;
                state.actionsPossible = true;
                state.currentEvent = undefined;
            }
        },
        securitySpendingIncreasePopularity: (state) => {
            state.tracks[4].value = Math.min((state.tracks[4].value + 1), 10);
            state.currentEvent = undefined;
            state.actionsPossible = true;
        },
        securitySpendingIncreasePublicSafety: (state) => {
            state.tracks[1].value = Math.min((state.tracks[1].value + 1), 10);
            state.currentEvent = undefined;
            state.actionsPossible = true;
        },
        specialOperationsRemoveCubes: (state) => {
            state.areas[1].contents = [];
            state.currentEvent = undefined;
            state.actionsPossible = true;
        },
        specialOperationsReducePublicSafety: (state) => {
            state.tracks[1].value -= 1;

            if (state.tracks[1] === 0) {
                state.gameLost = true;
            } else {
                state.currentEvent = undefined;
                state.actionsPossible = true;
            }
        },
        startGame: (state) => {
            state.gameStarted = true;
        },
        startNextYear: (state) => {
            state.areas[0].contents = state.areas[2].contents;
            state.areas[2].contents = [];
            for (let i = 0; i < state.institutions.length; i++) {
                if (state.institutions[i].funded) {
                    state.areas[0].contents.push({cube: Constants.INCOME_CUBE, clickable: false});
                    state.institutions[i].funded = false;
                }
            }

            state.currentEvent = undefined;
            state.inYearEnd = false;
        },
        underfundedPoliceForceAddUnrest: (state) => {
            state.areas[2].contents.push({cube: Constants.UNREST_CUBE, clickable: false});
            state.currentEvent = "implement-cuts";
            state.cuts = Constants.DEBT_SECURITY_CUT;
        },
        underfundedPoliceForceTreasuryIncome: (state) => {
            state.areas[3].contents.splice(0, 1);
            state.currentEvent = "implement-cuts";
            state.cuts = Constants.DEBT_SECURITY_CUT;
        },
        welfareBudgetProblemsReduceHealth: (state) => {
            state.tracks[3].value -= 1;

            if (state.tracks[3].value === 0) {
                state.gameLost = true;
            }

            state.currentEvent = "implement-cuts";
            state.cuts = Constants.DEBT_WELFARE_CUT;
        },
        welfareBudgetProblemsSpendIncome: (state) => {
            state.areas[3].contents.splice(0, 1);
            state.currentEvent = "implement-cuts";
            state.cuts = Constants.DEBT_WELFARE_CUT;
        },
        welfareCheatCrakdownRemoveCube: (state) => {
            var welfareCube = Util.findObjectWithAttribute(state.areas[1].contents, "cube", Constants.WELFARE_CUBE);
            state.areas[1].contents.splice(welfareCube, 1);
            state.currentEvent = undefined;
            state.actionsPossible = true;
        },
        welfareCheatCrakdownChangeTracks: (state) => {
            state.tracks[0].value = Math.min((state.tracks[0].value + 1), 10);
            state.tracks[4].value -= 1;

            if (state.tracks[4].value === 0) {
                state.gameLost = true;
            } else {
                state.currentEvent = undefined;
                state.actionsPossible = true;
            }
        },
        welfareCheats: (state) => {
            state.tracks[0].value -= 1;
            
            if (state.tracks[4].value === 0) {
                state.gameLost = true;
            } else {
                state.actionsPossible = true;
                state.currentEvent = undefined;
            }
        },
    }
});

function initialState() {
    return {
        actions: ActionUtil.getInitialActions(),
        actionsPossible: true,
        areas: AreaUtil.getInitialAreas(),
        cubesToRemove: [],
        events: EventUtil.getInitialEvents(),
        fundedInstitutions: [],
        inTurn: false,
        inYearEnd: false,
        gameLost: false,
        gameStarted: false,
        gameWon: false,
        institutions: InstitutionUtil.getInitialInstitutions(),
        institutionsToCut: [],
        payingLoan: false,
        tracks: TrackUtil.getInitialTracks(),
    };
};

export const {
    adjustHealth,
    adjustPopularity,
    adjustWealth,
    antiAusterityProtestsIncreasePopularity,
    antiAusterityProtestsRemoveCubes,
    backToWorkProgramme,
    borrowMoney,
    budgetSurplus,
    checkVictory,
    collectTaxRevenue,
    cutNationalSecurity,
    cutNationalSecurityFinal,
    cutPrivateEnterprise,
    cutPrivateEnterpriseFinal,
    cutSocialWelfare,
    cutSocialWelfareFinal,
    drawCubes,
    earlyRepaymentsFromCurrent,
    earlyRepaymentsFromTreasury,
    earlyRepaymentsOptOut,
    economicDownturn,
    endTurn,
    endYear,
    fallingCrimeRates,
    fundInstitution,
    fundNationalSecurity,
    fundPrivateEnterprise,
    fundSocialWelfare,
    industrialViolations,
    nationalisedHealthcareSpending,
    payLoan,
    politicalCorruption,
    putIncomeInTreasury,
    raiseTaxes,
    refundDoNothing,
    refundNationalSecurity,
    refundPrivateEnterprise,
    refundSocialWelfare,
    removeLoanCube,
    securitySpendingIncreasePopularity,
    securitySpendingIncreasePublicSafety,
    specialOperationsReducePublicSafety,
    specialOperationsRemoveCubes,
    startGame,
    startNextYear,
    underfundedPoliceForceAddUnrest,
    underfundedPoliceForceTreasuryIncome,
    welfareBudgetProblemsReduceHealth,
    welfareBudgetProblemsSpendIncome,
    welfareCheatCrakdownChangeTracks,
    welfareCheatCrakdownRemoveCube,
    welfareCheats,
} = gameSlice.actions;

export const selectActions = state => state.game.actions;
export const selectActionsPossible = state => state.game.actionsPossible;
export const selectAreas = state => state.game.areas;
export const selectCubesToRemove = state => state.game.cubesToRemove;
export const selectCurrentEvent = state => state.game.currentEvent;
export const selectCuts = state => state.game.cuts;
export const selectEvents = state => state.game.events;
export const selectFundedInstitutions = state => state.game.fundedInstitutions;
export const selectGameLost = state => state.game.gameLost;
export const selectGameStarted = state => state.game.gameStarted;
export const selectGameWon = state => state.game.gameWon;
export const selectInYearEnd = state => state.game.inYearEnd;
export const selectInstitutions = state => state.game.institutions;
export const selectInstitutionsToCut = state => state.game.institutionsToCut;
export const selectTracks = state => state.game.tracks;

export const selectCanEndTurn = state => {
    if (state.game.inTurn && !state.game.currentEvent && !state.game.cuts && !state.game.payingLoan) {
        return true;
    }
    return false;
}

export const selectCanEndYear = state => {
    if (!state.game.inYearEnd 
            && !state.game.inTurn 
            && !state.game.currentEvent 
            && !state.game.cuts 
            && !state.game.payingLoan 
            && state.game.areas[0].contents.length === 0) {
        return true;
    }
    return false;
}

export const selectCanFundInstitution = state => {
    for (let i = 0; i < state.game.institutions.length; i ++) {
        if (!state.game.institutions[i].funded) {
            return true;
        }
    }
    return false;
}

export const selectCanPayLoan = state => {
    var eligibleContents = [];

    for (let i = 0; i < state.game.areas[1].contents.length; i++) {
        eligibleContents.push(state.game.areas[1].contents[i]);
    }
    for (let i = 0; i < state.game.areas[2].contents.length; i++) {
        eligibleContents.push(state.game.areas[2].contents[i]);
    }
    for (let i = 0; i < state.game.areas[3].contents.length; i++) {
        eligibleContents.push(state.game.areas[3].contents[i]);
    }

    if (eligibleContents.some(e => e.cube === Constants.DEBT_CUBE) &&
        eligibleContents.filter(e => e.cube === Constants.INCOME_CUBE).length > 1) {
            return true;
    }

    return false;
}

export const selectDrawDisabled = state => {
    if (state.game.inTurn || state.game.areas[0].contents.length === 0) {
        return true;
    }
    return false;
}

export const selectHasIncomeToSpend = state => {
    for (let i = 0; i < state.game.areas[1].contents.length; i++) {
        if (state.game.areas[1].contents[i].cube === Constants.INCOME_CUBE) {
            return true;
        }
    }
    return false;
}

export const selectIncomeInTreasury = state => {
    if (state.game.areas[3].contents.length > 0) {
        return true;
    }
    return false;
}

export default gameSlice.reducer;