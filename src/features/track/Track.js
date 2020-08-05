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
                <div id="track-0" className={getItemClass(id, value, 0)}>
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
                        {getIncomeIconImage(value, 5)}
                    </div>
                </div>
                <div id="track-6" className={getItemClass(id, value, 6)}>
                    6
                    <div className={getIncomeIconVisibility(id)}>
                        {getIncomeIconImage(value, 6)}
                    </div>
                </div>
                <div id="track-7" className={getItemClass(id, value, 7)}>
                    7
                    <div className={getIncomeIconVisibility(id)}>
                        {getIncomeIconImage(value, 7)}
                    </div>
                </div>
                <div id="track-8" className={getItemClass(id, value, 8)}>
                    8
                    <div className={getIncomeIconVisibility(id)}>
                        {getIncomeIconImage(value, 8)}
                    </div>
                </div>
                <div id="track-9" className={getItemClass(id, value, 9)}>
                    9
                    <div className={getIncomeIconVisibility(id)}>
                        {getIncomeIconImage(value, 9)}
                        {getIncomeIconImage(value, 9)}
                    </div>
                </div>
                <div id="track-10" className={getItemClass(id, value, 10)}>
                    10
                    <div className={getIncomeIconVisibility(id)}>
                        {getIncomeIconImage(value, 10)}
                        {getIncomeIconImage(value, 10)}
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

function getIncomeIconImage(value, itemNum) {
    if (itemNum === value) {
        return (
            <img
                className={styles.trackIncomeIcon}
                src={Constants.INCOME_ICON_HIGHLIGHTED}
                alt="income-icon" />
        );
    }
    return (
        <img
            className={styles.trackIncomeIcon}
            src={Constants.INCOME_ICON}
            alt="income-icon" />
    );
}

function getItemClass(trackId, value, itemNum) {
    if (itemNum === value) {
        return getHighlightedItemClass(trackId);
    }

    switch (trackId) {
        case Tracks.EMPLOYMENT_ID:
            return TrackUtil.addEmploymentBorderDark(styles.trackItem);
        case Tracks.HEALTH_ID:
            return TrackUtil.addHealthBorderDark(styles.trackItem);
        case Tracks.POPULARITY_ID:
            return TrackUtil.addPopularityBorderDark(styles.trackItem);
        case Tracks.PUBLIC_SAFETY_ID:
            return TrackUtil.addPublicSafetyBorderDark(styles.trackItem);
        case Tracks.WEALTH_ID:
            return TrackUtil.addWealthBorderDark(styles.trackItem);
        default:
            return styles.trackItem;
    }
}

function getHighlightedItemClass(trackId) {
    switch (trackId) {
        case Tracks.EMPLOYMENT_ID:
            return TrackUtil.addEmploymentDark(TrackUtil.addEmploymentBorderDark(styles.trackHighlightedItem));
        case Tracks.HEALTH_ID:
            return TrackUtil.addHealthDark(TrackUtil.addHealthBorderDark(styles.trackHighlightedItem));
        case Tracks.POPULARITY_ID:
            return TrackUtil.addPopularityDark(TrackUtil.addPopularityBorderDark(styles.trackHighlightedItem));
        case Tracks.PUBLIC_SAFETY_ID:
            return TrackUtil.addPublicSafetyDark(TrackUtil.addPublicSafetyBorderDark(styles.trackHighlightedItem));
        case Tracks.WEALTH_ID:
            return TrackUtil.addWealthDark(TrackUtil.addWealthBorderDark(styles.trackHighlightedItem));
        default:
            return styles.trackHighlightedItem;
    }
}