import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    drawCubes,
    selectDrawDisabled
} from '../game/gameSlice';
import * as Util from '../../util';
import styles from './DrawFromBagButton.module.css';

export function DrawFromBagButton() {
    const drawDisabled = useSelector(selectDrawDisabled);
    const dispatch = useDispatch();

    return (
        <div id="draw-cubes-button" className={getButtonClass(drawDisabled)} onClick={() => dispatch(drawCubes())}>
            <div id="draw-cubes-text" className={styles.drawCubesText}>Draw Cubes</div>
        </div>
    );
}

function getButtonClass(drawDisabled) {
    if (drawDisabled) {
        return Util.makeUnclickable(styles.drawCubesButton);
    }

    return styles.drawCubesButton;
}