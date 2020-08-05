import React from 'react';
import { useDispatch } from 'react-redux';
import { removeLoanCube } from '../game/gameSlice'
import * as Areas from './AreaConstants';
import * as Constants from '../../constants';
import * as Util from '../../util';
import styles from './Area.module.css';

export function Area(props) {
    const name = props.name;
    const contents = props.contents;
    const debtCount = getCubeCount(Constants.DEBT_CUBE, contents);
    const incomeCount = getCubeCount(Constants.INCOME_CUBE, contents);
    const securityCount = getCubeCount(Constants.SECURITY_CUBE, contents);
    const unrestCount = getCubeCount(Constants.UNREST_CUBE, contents);
    const welfareCount = getCubeCount(Constants.WELFARE_CUBE, contents);
    const dispatch = useDispatch();

    const debtLoanPayload = {cube: Constants.DEBT_CUBE, area: getAreaIndex(name)};
    const incomeLoanPayload = {cube: Constants.INCOME_CUBE, area: getAreaIndex(name)};

    return (
        <div id="area" className={styles.area}>
            <div id="area-title" className={styles.areaTitle}>{name}</div>
            <div id="area-box" className={styles.areaBox}>
                <div id="area-cube-grid" className={styles.areaCubeGrid}>
                    <div id="area-debt-cubes" className={showCube(debtCount)}>
                        <img
                            className={getCubeClass(Constants.DEBT_CUBE, contents)}
                            src={Constants.DEBT_CUBE}
                            onClick={() => dispatch(removeLoanCube(debtLoanPayload))}
                            alt="Debt" />
                        <div className={styles.cubeCount}>{debtCount}</div>
                    </div>
                    <div id="area-income-cubes" className={showCube(incomeCount)}>
                        <img
                            className={getCubeClass(Constants.INCOME_CUBE, contents)}
                            src={Constants.INCOME_CUBE}
                            onClick={() => dispatch(removeLoanCube(incomeLoanPayload))}
                            alt="Income" />
                        <div className={styles.cubeCount}>{incomeCount}</div>
                    </div>
                    <div id="area-security-cubes" className={showCube(securityCount)}>
                        <img
                            className={getCubeClass(Constants.SECURITY_CUBE, contents)}
                            src={Constants.SECURITY_CUBE}
                            alt="Security" />
                        <div className={styles.cubeCount}>{securityCount}</div>
                    </div>
                    <div id="area-unrest-cubes" className={showCube(unrestCount)}>
                        <img
                            className={getCubeClass(Constants.UNREST_CUBE, contents)}
                            src={Constants.UNREST_CUBE}
                            alt="Unrest" />
                        <div className={styles.cubeCount}>{unrestCount}</div>
                    </div>
                    <div id="area-welfare-cubes" className={showCube(welfareCount)}>
                        <img
                            className={getCubeClass(Constants.WELFARE_CUBE, contents)}
                            src={Constants.WELFARE_CUBE}
                            alt="Debt" />
                        <div className={styles.cubeCount}>{welfareCount}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

function getAreaIndex(areaName) {
    switch (areaName) {
        case Areas.BAG_NAME:
            return 0;
        case Areas.CURRENT_NAME:
            return 1;
        case Areas.USED_NAME:
            return 2;
        case Areas.TREASURY_NAME:
            return 3;
        default:
            return -1;
    }
}

function getCubeCount(cubeType, contents) {
    var count = 0;
    for (let i = 0; i < contents.length; i++) {
        if (contents[i].cube === cubeType) {
            count++;
        }
    }
    return count;
};

function getCubeClass(cubeType, contents) {
    for (let i = 0; i < contents.length; i++) {
        if (cubeType === contents[i].cube && contents[i].clickable) {
            return Util.makeImportantEvent(Util.makeClickable(styles.areaCube));
        }
    }
    return styles.areaCube;
}

function showCube(cubeCount) {
    if (0 === cubeCount) {
        return Util.makeInvisible(styles.areaCubeItem);
    }
    return styles.areaCubeItem;
};