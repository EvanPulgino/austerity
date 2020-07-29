import { createSlice } from '@reduxjs/toolkit';
import * as ActionUtil from '../action/ActionUtil';
import * as AreaUtil from '../area/AreaUtil';
import * as EventUtil from '../event/EventUtil';
import * as InstitutionUtil from '../institution/InstitutionUtil';
import * as TrackUtil from '../track/TrackUtil';

export const gameSlice = createSlice({
    name: 'game',
    initialState: initialState(),
});

function initialState() {
    return {
        actions: ActionUtil.getInitialActions(),
        areas: AreaUtil.getInitialAreas(),
        events: EventUtil.getInitialEvents(),
        institutions: InstitutionUtil.getInitialInstitutions(),
        tracks: TrackUtil.getInitialTracks(),
    };
};

export const selectActions = state => state.game.actions;
export const selectAreas = state => state.game.areas;
export const selectEvents = state => state.game.events;
export const selectInstitutions = state => state.game.institutions;
export const selectTracks = state => state.game.tracks;

export default gameSlice.reducer;