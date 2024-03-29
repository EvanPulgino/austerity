import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    drawCubes,
    endTurn,
    endYear,
    fundInstitution,
    putIncomeInTreasury,
    reset,
    selectCanEndTurn,
    selectCanEndYear,
    selectCanFundInstitution,
    selectDrawDisabled,
    selectGameLost,
    selectGameWon,
    selectHasIncomeToSpend,
} from '../game/gameSlice';
import * as Util from '../../util';
import styles from './DrawFromBagButton.module.css';

export function DrawFromBagButton() {
    const canEndTurn = useSelector(selectCanEndTurn);
    const canEndYear = useSelector(selectCanEndYear);
    const canFundInstitution = useSelector(selectCanFundInstitution);
    const drawDisabled = useSelector(selectDrawDisabled);
    const gameLost = useSelector(selectGameLost);
    const gameWon = useSelector(selectGameWon)
    const hasIncomeToSpend = useSelector(selectHasIncomeToSpend);
    const dispatch = useDispatch();

    var ableToFundInstitution = hasIncomeToSpend && canFundInstitution;

    return (
        <div>
            <div id="draw-cubes-button" className={getButtonClass(drawDisabled)} onClick={() => dispatch(drawCubes())}>
                <div id="draw-cubes-text" className={styles.drawCubesText}>Draw Cubes</div>
            </div>
            <div id="end-year-button" className={getButtonClass(!canEndYear)} onClick={() => dispatch(endYear())}>
            <div id="end-year-text" className={styles.drawCubesText}>End Year</div>
            </div>
            <div id="end-turn-section" className={getSectionClass(!canEndTurn)}>
                <div id="fund-institution-button" className={getButtonClass(!ableToFundInstitution)} onClick={() => dispatch(fundInstitution())}>
                    <div id="draw-cubes-text" className={styles.drawCubesText}>Fund an Institution</div>
                </div>
                <div id="put-in-treasury-button" className={getButtonClass(!hasIncomeToSpend)} onClick={() => dispatch(putIncomeInTreasury())}>
                    <div id="draw-cubes-text" className={styles.drawCubesText}>Put Income into Treasury</div>
                </div>
                <div id="end-turn-button" className={styles.drawCubesButton} onClick={() => dispatch(endTurn())}>
                    <div id="draw-cubes-text" className={styles.drawCubesText}>End Turn</div>
                </div>
            </div>
            <button id="game-lost-button" className={getButtonClass(!gameLost)} onClick={() => dispatch(reset())}>
                <div id="game-lost-text" className={styles.drawCubesText}>You Lose. Play Again</div>
            </button>
            <button id="game-won-button" className={getButtonClass(!gameWon)} onClick={() => dispatch(reset())}>
                <div id="game-won-text" className={styles.drawCubesText}>You Win! Play Again</div>
            </button>
        </div>
    );
}

function getButtonClass(buttonDisabled) {
    if (buttonDisabled) {
        return Util.makeInvisible(styles.drawCubesButton);
    }

    return styles.drawCubesButton;
}

function getSectionClass(sectionDisabled) {
    if (sectionDisabled) {
        return Util.makeInvisible(styles.endTurnSection);
    }
    return styles.endTurnSection;
}