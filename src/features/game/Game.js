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
import { DrawFromBagButton } from '../drawFromBagButton/DrawFromBagButton';
import { Event } from '../event/Event';
import { EventHandler } from '../eventHandler/EventHandler';
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
                        {buildInstitutionComponents(institutions)}
                    </div>
                </div>
                <div id="game-col-2" className={styles.gameColumn}>
                    <div id="actions" className={styles.actions}>
                        {buildActionComponents(actions)}
                    </div>
                </div>
                <div id="game-col-3" className={styles.gameColumn}>
                    <div id="game-mid-row" className={styles.gameRowLayout}>
                        <div id="status-area" className={styles.statusArea}>
                            <EventHandler />
                            <DrawFromBagButton />
                        </div>
                        <div id="tracks" className={styles.tracks}>
                            {buildTrackComponents(tracks)}
                        </div>
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
            key={action.id}
            id={action.id}
            name={action.name}
            actionPossible={action.actionPossible} />
    ));
}

function buildAreaComponents(areas) {
    return areas.map((area) => (
        <Area
            key={area.name}
            name={area.name}
            contents={area.contents} />
    ))
}

function buildEventComponents(events) {
    return events.map((event) => (
        <Event
            key={event.id}
            id={event.id}
            name={event.name}
            cubes={event.cubes} />
    ));
}

function buildInstitutionComponents(institutions) {
    return institutions.map((institution) => (
        <Institution
            key={institution.id}
            id={institution.id}
            name={institution.name}
            cuts={institution.cuts}
            value={institution.value}
            funded={institution.funded} />
    ));
}

function buildTrackComponents(tracks) {
    return tracks.map((track) => (
        <Track
            key={track.id}
            id={track.id}
            name={track.name}
            value={track.value} />
    ));
}

export default Game;