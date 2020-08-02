import React from 'react';
import { useSelector } from 'react-redux';
import {
    selectCurrentEvent,
} from '../game/gameSlice';
import * as Constants from '../../constants';
import * as Util from '../../util';
import * as Events from './EventConstants';
import styles from './Event.module.css';

export function Event(props) {
    const id = props.id;
    const name = props.name;
    const cubeZero = props.cubes[0];
    const cubeOne = props.cubes[1];
    const currentEvent = useSelector(selectCurrentEvent);

    return (
        <div id={`event-${id}`} className={getEventClass(id, currentEvent)}>
            <img id={`event-${id}-cube-zero`} className={styles.eventCube} src={cubeZero} alt={`event-${id}-cube-zero`} />
            <img id={`event-${id}-cube-one`} className={styles.eventCube} src={cubeOne} alt={`event-${id}-cube-one`} />
            <div id={`event-${id}-text`} className={styles.eventText}>
                <div id={`event-${id}-name`} className={styles.eventName}>
                    {name}
                </div>
                {getEventEffect(id)}
            </div>
        </div>
    )
}

function getEventClass(id, currentEvent) {
    if (id === currentEvent) {
        return Util.makeImportantEvent(styles.event);
    }
    return styles.event;
}

function getEventEffect(eventId) {
    switch(eventId) {
        case Events.ANTI_AUSTERITY_PROTESTS_ID:
            return (
                <span id={`event-${eventId}-effect`} className={styles.eventEffect}>
                    Either remove
                    <img src={Constants.INCOME_CUBE} className={styles.eventEffectCube} alt="income-cube" />
                    and 
                    <img src={Constants.UNREST_CUBE} className={styles.eventEffectCube} alt="unrest-cube" />
                    OR increase POPULARITY by one and add
                    <img src={Constants.DEBT_CUBE} className={styles.eventEffectCube} alt="debt-cube" />
                </span>
            );
        case Events.BACK_TO_WORK_PROGRAMME_ID:
            return (
                <span id={`event-${eventId}-effect`} className={styles.eventEffect}>
                    Increase EMPLOYMENT by two
                </span>
            );
        case Events.BUDGET_SURPLUS_ID:
            return (
                <span id={`event-${eventId}-effect`} className={styles.eventEffect}>
                    Increase WEALTH by one; may spend both cubes to fun a single already-funded institution
                </span>
            );
        case Events.EARLY_REPAYMENTS_ID:
            return (
                <span id={`event-${eventId}-effect`} className={styles.eventEffect}>
                    Optionally spend
                    <img src={Constants.INCOME_CUBE} className={styles.eventEffectCube} alt="income-cube" />
                    to remove
                    <img src={Constants.DEBT_CUBE} className={styles.eventEffectCube} alt="debt-cube" />
                </span>
            );
        case Events.ECONOMIC_DOWNTURN_ID:
            return (
                <span id={`event-${eventId}-effect`} className={styles.eventEffect}>
                    Reduce WEALTH by one and increase cuts on every Institution by one
                </span>
            );
        case Events.FALLING_CRIME_RATES_ID:
            return (
                <span id={`event-${eventId}-effect`} className={styles.eventEffect}>
                    Increase PUBLIC SAFETY by two
                </span>
            );
        case Events.INDUSTRIAL_VIOLATIONS_ID:
            return (
                <span id={`event-${eventId}-effect`} className={styles.eventEffect}>
                    Decrease PUBLIC SAFETY by two
                </span>
            );
        case Events.NATIONALISED_HEALTHCARE_SPENDING_ID:
            return (
                <span id={`event-${eventId}-effect`} className={styles.eventEffect}>
                    Increase HEALTH by two
                </span>
            );
        case Events.POLITICAL_CORRUPTION_ID:
            return (
                <span id={`event-${eventId}-effect`} className={styles.eventEffect}>
                    Decrease POPULARITY by one
                </span>
            );
        case Events.SECURITY_SPENDING_ID:
            return (
                <span id={`event-${eventId}-effect`} className={styles.eventEffect}>
                    Increase POPULARITY or PUBLIC SAFETY by one
                </span>
            );
        case Events.SPECIAL_OPERATIONS_ID:
            return (
                <span id={`event-${eventId}-effect`} className={styles.eventEffect}>
                    Either remove
                    <img src={Constants.SECURITY_CUBE} className={styles.eventEffectCube} alt="security-cube" />
                    and
                    <img src={Constants.UNREST_CUBE} className={styles.eventEffectCube} alt="unrest-cube" />
                    or reduce PUBLIC SAFETY  by one
                </span>
            );
        case Events.UNDERFUNDED_POLICE_FORCE_ID:
            return (
                <span id={`event-${eventId}-effect`} className={styles.eventEffect}>
                    Spend
                    <img src={Constants.INCOME_CUBE} className={styles.eventEffectCube} alt="income-cube" />
                    or add
                    <img src={Constants.UNREST_CUBE} className={styles.eventEffectCube} alt="unrest-cube" />
                </span>
            );
        case Events.WELFARE_BUDGET_PROBLEMS_ID:
            return (
                <span id={`event-${eventId}-effect`} className={styles.eventEffect}>
                    Spend
                    <img src={Constants.INCOME_CUBE} className={styles.eventEffectCube} alt="income-cube" />
                    OR reduce HEALTH by one
                </span>
            );
        case Events.WELFARE_CHEAT_CRACKDOWN_ID:
            return (
                <span id={`event-${eventId}-effect`} className={styles.eventEffect}>
                    Either remove
                    <img src={Constants.WELFARE_CUBE} className={styles.eventEffectCube} alt="welfare-cube" />
                    OR increase EMPLOYMENT by one and decrease POPULARITY by one
                </span>
            );
        case Events.WELFARE_CHEATS_ID:
            return (
                <span id={`event-${eventId}-effect`} className={styles.eventEffect}>
                    Decrease EMPLOYMENT by one
                </span>
            );
        default:
            return;
    }
}