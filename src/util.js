import * as Constants from './constants';

export function makeClickable(cssClass) {
    return cssClass + ' ' + Constants.CLICKABLE;
}

export function makeHighlighted(cssClass) {
    return cssClass + ' ' + Constants.HIGHLIGHTED;
}

export function makeInvisible(cssClass) {
    return cssClass + ' ' + Constants.INVISIBLE;
}

export function makeUnclickable(cssClass) {
    return cssClass + ' ' + Constants.UNCLICKABLE;
}