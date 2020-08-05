import * as Constants from './constants';

export function findObjectWithAttribute(array, attribute, value) {
    for (let i = 0; i < array.length; i += 1) {
        if (array[i][attribute] === value) {
          return i;
        }
      }
      return -1;
}

export function makeClickable(cssClass) {
    return cssClass + ' ' + Constants.CLICKABLE;
}

export function makeHighlighted(cssClass) {
    return cssClass + ' ' + Constants.HIGHLIGHTED;
}

export function makeImportantColor(cssClass) {
    return cssClass + ' ' + Constants.IMPORTANT_COLOR;
}

export function makeImportantEvent(cssClass) {
    return cssClass + ' ' + Constants.IMPORTANT_EVENT;
}

export function makeInvisible(cssClass) {
    return cssClass + ' ' + Constants.INVISIBLE;
}

export function makeUnclickable(cssClass) {
    return cssClass + ' ' + Constants.UNCLICKABLE;
}