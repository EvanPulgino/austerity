import { createSlice } from '@reduxjs/toolkit';
import * as ActionUtil from '../action/ActionUtil';
import * as AreaUtil from '../area/AreaUtil';
import * as EventUtil from '../event/EventUtil';
import * as InstitutionUtil from '../institution/InstitutionUtil';
import * as TrackUtil from '../track/TrackUtil';
import * as Constants from '../../constants';
import * as Util from '../../util';

export const gameSlice = createSlice({
    name: 'game',
    initialState: initialState(),
    reducers: {
        antiAusterityProtestsIncreasePopularity: (state) => {
            state.tracks[4].value = Math.min((state.tracks[4].value + 1), 10);
            state.areas[2].contents.push({cube: Constants.DEBT_CUBE, clickable: false});
            state.currentEvent = undefined;
        },
        antiAusterityProtestsRemoveCubes: (state) => {
            state.areas[1].contents = [];
            state.currentEvent = undefined;
        },
        backToWorkProgramme: (state) => {
            state.tracks[0].value = Math.min((state.tracks[0].value + 2), 10);
            state.currentEvent = undefined;
        },
        budgetSurplus: (state) => {
            state.tracks[2].value = Math.min((state.tracks[2].value + 1), 10);
            // Add effect two after adding institution usage
            state.currentEvent = undefined;
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
        },
        earlyRepaymentsFromCurrent: (state) => {
            state.areas[1].contents = [];
            state.currentEvent = undefined;
        },
        earlyRepaymentsFromTreasury: (state) => {
            state.areas[3].contents.splice(0, 1);
            var debtCube = Util.findObjectWithAttribute(state.areas[1].contents, "cube", Constants.DEBT_CUBE);
            state.areas[1].splice(debtCube, 1);
            state.currentEvent = undefined;
        },
        earlyRepaymentsOptOut: (state) => {
            state.currentEvent = undefined;
            state.cuts = Constants.DEBT_INCOME_CUT;
        },
        economicDownturn: (state) => {
            state.tracks[2].value -= 1;
            
            if (state.tracks[2].value === 0) {
                state.gameLost = true;
            }

            for (let i = 0; i < state.institutions.length; i++) {
                state.institutions[i].value = state.institutions[i].value + 1;
                if (state.institutions[i].value === 2) {
                    state.institutionsToCut.push(state.institutions[i].id);
                }
            }

            state.currentEvent = undefined;
        },
        fallingCrimeRates: (state) => {
            state.tracks[1].value = Math.min((state.tracks[1].value + 2), 10);
            state.currentEvent = undefined;
        },
        industrialViolations: (state) => {
            state.tracks[1].value = Math.max((state.tracks[1].value - 2), 0);
            
            if (state.tracks[1].value === 0) {
                state.gameLost = true;
            }

            state.currentEvent = undefined;
        },
        nationalisedHealthcareSpending: (state) => {
            state.tracks[3].value = Math.min((state.tracks[3].value + 2), 10);
            state.currentEvent = "";
        },
        politicalCorruption: (state) => {
            state.tracks[4].value -= 1;
            
            if (state.tracks[4].value === 0) {
                state.gameLost = true;
            }

            state.currentEvent = undefined;
            state.cuts = Constants.DEBT_UNREST_CUT;
        },
        securitySpendingIncreasePopularity: (state) => {
            state.tracks[4].value = Math.min((state.tracks[4].value + 1), 10);
            state.currentEvent = undefined;
        },
        securitySpendingIncreasePublicSafety: (state) => {
            state.tracks[1].value = Math.min((state.tracks[1].value + 1), 10);
            state.currentEvent = undefined;
        },
        specialOperationsRemoveCubes: (state) => {
            state.areas[1].contents = [];
            state.currentEvent = undefined;
        },
        specialOperationsReducePublicSafety: (state) => {
            state.tracks[1].value -= 1;

            if (state.tracks[1] === 0) {
                state.gameLost = true;
            }

            state.currentEvent = undefined;
        },
        underfundedPoliceForceAddUnrest: (state) => {
            state.areas[2].contents.push({cube: Constants.UNREST_CUBE, clickable: false});
            state.currentEvent = undefined;
            state.cuts = Constants.DEBT_SECURITY_CUT;
        },
        underfundedPoliceForceTreasuryIncome: (state) => {
            state.areas[3].contents.splice(0, 1);
            state.currentEvent = undefined;
            state.cuts = Constants.DEBT_SECURITY_CUT;
        },
        welfareBudgetProblemsReduceHealth: (state) => {
            state.tracks[3].value -= 1;

            if (state.tracks[3].value === 0) {
                state.gameLost = true;
            }

            state.currentEvent = undefined;
            state.cuts = Constants.DEBT_WELFARE_CUT;
        },
        welfareBudgetProblemsSpendIncome: (state) => {
            state.areas[3].contents.splice(0, 1);
            state.currentEvent = undefined;
            state.cuts = Constants.DEBT_WELFARE_CUT;
        },
        welfareCheatCrakdownRemoveCube: (state) => {
            var welfareCube = Util.findObjectWithAttribute(state.areas[1].contents, "cube", Constants.WELFARE_CUBE);
            state.areas[1].contents.splice(welfareCube, 1);
            state.currentEvent = undefined;
        },
        welfareCheatCrakdownChangeTracks: (state) => {
            state.tracks[0].value = Math.min((state.tracks[0].value + 1), 10);
            state.tracks[4].value -= 1;

            if (state.tracks[4].value === 0) {
                state.gameLost = true;
            }

            state.currentEvent = undefined;
        },
        welfareCheats: (state) => {
            state.tracks[0].value -= 1;
            
            if (state.tracks[4].value === 0) {
                state.gameLost = true;
            }

            state.currentEvent = undefined;
        },
    }
});

function initialState() {
    return {
        actions: ActionUtil.getInitialActions(),
        areas: AreaUtil.getInitialAreas(),
        events: EventUtil.getInitialEvents(),
        gameLost: false,
        gameWon: false,
        institutions: InstitutionUtil.getInitialInstitutions(),
        institutionsToCut: [],
        tracks: TrackUtil.getInitialTracks(),
    };
};

export const {
    antiAusterityProtestsIncreasePopularity,
    antiAusterityProtestsRemoveCubes,
    backToWorkProgramme,
    budgetSurplus,
    drawCubes,
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
    specialOperationsReducePublicSafety,
    specialOperationsRemoveCubes,
    underfundedPoliceForceAddUnrest,
    underfundedPoliceForceTreasuryIncome,
    welfareBudgetProblemsReduceHealth,
    welfareBudgetProblemsSpendIncome,
    welfareCheatCrakdownChangeTracks,
    welfareCheatCrakdownRemoveCube,
    welfareCheats,
} = gameSlice.actions;

export const selectActions = state => state.game.actions;
export const selectAreas = state => state.game.areas;
export const selectCurrentEvent = state => state.game.currentEvent;
export const selectEvents = state => state.game.events;
export const selectInstitutions = state => state.game.institutions;
export const selectTracks = state => state.game.tracks;

export const selectDrawDisabled = state => {
    if (state.game.areas[0].contents.length > 0 && state.game.areas[1].contents.length === 0) {
        return false;
    }
    return true;
}

export const selectIncomeInTreasury = state => {
    if (state.game.areas[3].contents.length > 0) {
        return true;
    }
    return false;
}

// export const selectIncomeInUsed = state => {
//     if (state.game.areas[2].contents.length > 0 && state.game.areas[2].contents.some(e => e.cube = Constants.INCOME_ICON)) {
//         return true;
//     }
//     return false;
// }

export default gameSlice.reducer;