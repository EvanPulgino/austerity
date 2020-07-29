import React from 'react';
import * as Constants from '../../constants';
import * as Util from '../../util';
import * as Tracks from './TrackConstants';
import * as TrackUtil from './TrackUtil';
import styles from './Track.module.css';

export function Track(props) {
    const id = props.id;
    const name = props.name;
    const value = props.value;

    return (
        <div id={`track-${id}`} className={styles.track}>
            <div id={`track-${id}-title`} className={styles.trackTitle}>
                {name}
            </div>
            <div id={`track-${id}-grid`} className={getGridClass(id)}>
                <div id="track-0" className={getTerminalItemClass(id, value)}>
                    0
                </div>
                <div id="track-1" className={getItemClass(id, value, 1)}>
                    1
                </div>
                <div id="track-2" className={getItemClass(id, value, 2)}>
                    2
                </div>
                <div id="track-3" className={getItemClass(id, value, 3)}>
                    3
                </div>
                <div id="track-4" className={getItemClass(id, value, 4)}>
                    4
                </div>
                <div id="track-5" className={getItemClass(id, value, 5)}>
                    5
                    <div className={getIncomeIconVisibility(id)}>
                        <img
                            className={styles.trackIncomeIcon}
                            src={Constants.INCOME_ICON}
                            alt="income-icon" />
                    </div>
                </div>
                <div id="track-6" className={getItemClass(id, value, 6)}>
                    6
                    <div className={getIncomeIconVisibility(id)}>
                        <img
                            className={styles.trackIncomeIcon}
                            src={Constants.INCOME_ICON}
                            alt="income-icon" />
                    </div>
                </div>
                <div id="track-7" className={getItemClass(id, value, 7)}>
                    7
                    <div className={getIncomeIconVisibility(id)}>
                        <img
                            className={styles.trackIncomeIcon}
                            src={Constants.INCOME_ICON}
                            alt="income-icon" />
                    </div>
                </div>
                <div id="track-8" className={getItemClass(id, value, 8)}>
                    8
                    <div className={getIncomeIconVisibility(id)}>
                        <img
                            className={styles.trackIncomeIcon}
                            src={Constants.INCOME_ICON}
                            alt="income-icon" />
                    </div>
                </div>
                <div id="track-9" className={getItemClass(id, value, 9)}>
                    9
                    <div className={getIncomeIconVisibility(id)}>
                        <img
                            className={styles.trackIncomeIcon}
                            src={Constants.INCOME_ICON}
                            alt="income-icon" />
                        <img
                            className={styles.trackIncomeIcon}
                            src={Constants.INCOME_ICON}
                            alt="income-icon" />
                    </div>
                </div>
                <div id="track-10" className={getItemClass(id, value, 10)}>
                    10
                    <div className={getIncomeIconVisibility(id)}>
                        <img
                            className={styles.trackIncomeIcon}
                            src={Constants.INCOME_ICON}
                            alt="income-icon" />
                        <img
                            className={styles.trackIncomeIcon}
                            src={Constants.INCOME_ICON}
                            alt="income-icon" />
                    </div>
                </div>
            </div>
        </div>
    );
};

function getGridClass(trackId) {
    switch(trackId) {
        case Tracks.EMPLOYMENT_ID:
            return TrackUtil.addEmploymentLight(styles.trackGrid);
        case Tracks.HEALTH_ID:
            return TrackUtil.addHealthLight(styles.trackGrid);
        case Tracks.POPULARITY_ID:
            return TrackUtil.addPopularityLight(styles.trackGrid);
        case Tracks.PUBLIC_SAFETY_ID:
            return TrackUtil.addPublicSafetyLight(styles.trackGrid);
        case Tracks.WEALTH_ID:
            return TrackUtil.addWealthLight(styles.trackGrid);
        default:
            return;
    }
}

function getIncomeIconVisibility(trackId) {
    if (Tracks.EMPLOYMENT_ID === trackId) {
        return styles.incomeIconContainer;
    }
    return Util.makeInvisible(styles.incomeIconContainer);
}

function getItemClass(trackId, value, itemNum) {
    var itemClass = styles.trackItem;

    if (itemNum === value) {
        itemClass = Util.makeHighlighted(itemClass);
    }

    switch (trackId) {
        case Tracks.EMPLOYMENT_ID:
            return TrackUtil.addEmploymentBorderDark(itemClass);
        case Tracks.HEALTH_ID:
            return TrackUtil.addHealthBorderDark(itemClass);
        case Tracks.POPULARITY_ID:
            return TrackUtil.addPopularityBorderDark(itemClass);
        case Tracks.PUBLIC_SAFETY_ID:
            return TrackUtil.addPublicSafetyBorderDark(itemClass);
        case Tracks.WEALTH_ID:
            return TrackUtil.addWealthBorderDark(itemClass);
        default:
            return itemClass;
    }
}

function getTerminalItemClass(trackId, value) {
    var itemClass = styles.trackTerminalItem;

    if (0 === value) {
        itemClass = Util.makeHighlighted(itemClass);
    }

    switch (trackId) {
        case Tracks.EMPLOYMENT_ID:
            return TrackUtil.addEmploymentDark(TrackUtil.addEmploymentBorderLight(itemClass));
        case Tracks.HEALTH_ID:
            return TrackUtil.addHealthDark(TrackUtil.addHealthBorderLight(itemClass));
        case Tracks.POPULARITY_ID:
            return TrackUtil.addPopularityDark(TrackUtil.addPopularityBorderLight(itemClass));
        case Tracks.PUBLIC_SAFETY_ID:
            return TrackUtil.addPublicSafetyDark(TrackUtil.addPublicSafetyBorderLight(itemClass));
        case Tracks.WEALTH_ID:
            return TrackUtil.addWealthDark(TrackUtil.addWealthBorderLight(itemClass));
        default:
            return itemClass;
    }
}