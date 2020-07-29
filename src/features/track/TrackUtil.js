import * as Tracks from './TrackConstants';
import styles from './Track.module.css';

export function getInitialTracks() {
    return [
        Tracks.INITIAL_EMPLOYMENT,
        Tracks.INITIAL_PUBLIC_SAFETY,
        Tracks.INITIAL_WEALTH,
        Tracks.INITIAL_HEALTH,
        Tracks.INITIAL_POPULARITY
    ];
};

export function addEmploymentBorderDark(cssClass) {
    return cssClass + ' ' + styles.employmentBorderDark;
}

export function addEmploymentBorderLight(cssClass) {
    return cssClass + ' ' + styles.employmentBorderLight;
}

export function addEmploymentDark(cssClass) {
    return cssClass + ' ' + styles.employmentDark;
}

export function addEmploymentLight(cssClass) {
    return cssClass + ' ' + styles.employmentLight;
}

export function addHealthBorderDark(cssClass) {
    return cssClass + ' ' + styles.healthBorderDark;
}

export function addHealthBorderLight(cssClass) {
    return cssClass + ' ' + styles.healthBorderLight;
}

export function addHealthDark(cssClass) {
    return cssClass + ' ' + styles.healthDark;
}

export function addHealthLight(cssClass) {
    return cssClass + ' ' + styles.healthLight;
}

export function addPopularityBorderDark(cssClass) {
    return cssClass + ' ' + styles.popularityBorderDark;
}

export function addPopularityBorderLight(cssClass) {
    return cssClass + ' ' + styles.popularityBorderLight;
}

export function addPopularityDark(cssClass) {
    return cssClass + ' ' + styles.popularityDark;
}

export function addPopularityLight(cssClass) {
    return cssClass + ' ' + styles.popularityLight;
}

export function addPublicSafetyBorderDark(cssClass) {
    return cssClass + ' ' + styles.publicSafetyBorderDark;
}

export function addPublicSafetyBorderLight(cssClass) {
    return cssClass + ' ' + styles.publicSafetyBorderLight;
}

export function addPublicSafetyDark(cssClass) {
    return cssClass + ' ' + styles.publicSafetyDark;
}

export function addPublicSafetyLight(cssClass) {
    return cssClass + ' ' + styles.publicSafetyLight;
}

export function addWealthBorderDark(cssClass) {
    return cssClass + ' ' + styles.wealthBorderDark;
}

export function addWealthBorderLight(cssClass) {
    return cssClass + ' ' + styles.wealthBorderLight;
}

export function addWealthDark(cssClass) {
    return cssClass + ' ' + styles.wealthDark;
}

export function addWealthLight(cssClass) {
    return cssClass + ' ' + styles.wealthLight;
}