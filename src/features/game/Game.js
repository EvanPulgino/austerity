import React from 'react';
import { useSelector } from 'react-redux';
import {
    selectActions,
    selectAreas,
    selectEvents,
    selectInstitutions,
    selectTracks,
} from './gameSlice';
import { Action } from '../action/Action';
import { Area } from '../area/Area';
import { Event } from '../event/Event';
import { Institution } from '../institution/Insitution';
import { Track } from '../track/Track';
import styles from './Game.module.css'

export function Game() {
    const actions = useSelector(selectActions);
    const areas = useSelector(selectAreas);
    const events = useSelector(selectEvents);
    const institutions = useSelector(selectInstitutions);
    const tracks = useSelector(selectTracks);

    return (
        <div id="game-container" className={styles.gameLayout}>
            <div id="game-column-container" className={styles.gameColumnLayout}>
                <div id="game-col-1" className={styles.gameColumn}>
                    <div id="institutions" className={styles.institutions}>
                    <h2 id="institutions-title" className={styles.sectionTitle}>Institutions</h2>
                        {buildInstitutionComponents(institutions)}
                    </div>
                </div>
                <div id="game-col-2" className={styles.gameColumn}>
                    <div id="actions" className={styles.actions}>
                        <h2 id='actions-title' className={styles.sectionTitle}>Actions</h2>
                        {buildActionComponents(actions)}
                    </div>
                </div>
                <div id="game-col-3" className={styles.gameColumn}>
                    <div id="tracks" className={styles.tracks}>
                        <h2 id='tracks-title' className={styles.sectionTitle}>Tracks</h2>
                        {buildTrackComponents(tracks)}
                    </div>
                    <div id="areas" className={styles.areas}>
                        {buildAreaComponents(areas)}
                    </div>
                </div>
            </div>
            <div id='game-bottom-row' className={styles.gameRowLayout}>
                <div id='events' className={styles.events}>
                    <h2 id='events-title' className={styles.sectionTitle}>Cube Draw Results</h2>
                    <div id='events-grid' className={styles.eventsGrid}>
                        {buildEventComponents(events)}
                    </div>
                </div>
            </div>
        </div>
    );
}

function buildActionComponents(actions) {
    return actions.map((action) => (
        <Action
            id={action.id}
            name={action.name}
            actionPossible={action.actionPossible} />
    ));
}

function buildAreaComponents(areas) {
    return areas.map((area) => (
        <Area
            name={area.name}
            contents={area.contents} />
    ))
}

function buildEventComponents(events) {
    console.log(events);
    return events.map((event) => (
        <Event
            id={event.id}
            name={event.name}
            cubes={event.cubes} />
    ));
}

function buildInstitutionComponents(institutions) {
    return institutions.map((institution) => (
        <Institution
            id={institution.id}
            name={institution.name}
            cuts={institution.cuts}
            value={institution.value} />
    ));
}

function buildTrackComponents(tracks) {
    return tracks.map((track) => (
        <Track 
            id={track.id}
            name={track.name}
            value={track.value} />
    ));
}

export default Game;