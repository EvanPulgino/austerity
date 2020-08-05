import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    cutNationalSecurityFinal,
    cutPrivateEnterpriseFinal,
    cutSocialWelfareFinal,
    fundNationalSecurity,
    fundPrivateEnterprise,
    fundSocialWelfare,
    selectCurrentEvent,
    selectCuts, 
} from '../game/gameSlice';
import * as Constants from '../../constants';
import * as Util from '../../util';
import * as Institutions from './InstitutionConstants';
import * as InstitutionUtil from './InstitutionUtil';
import styles from './Institution.module.css'

export function Institution(props) {
    const id = props.id;
    const name = props.name;
    const cuts = props.cuts;
    const value = props.value;
    const funded = props.funded;
    const activeCuts = useSelector(selectCuts);
    const currentEvent = useSelector(selectCurrentEvent);
    const dispatch = useDispatch();

    return (
        <div id={`instituion-${id}`} className={getInstitutionClass(id, activeCuts)}>
            <div id={`institution-${id}-header`} className={getHeaderClass(id)}>
                {name}
            </div>
            <div id={`institution-${id}-action`} className={styles.institutionAction}>
                {getFundingImage(id, funded, currentEvent, dispatch)}
                <img
                    id={`institution-${id}-arrow`}
                    className={styles.institutionArrow}
                    src={Constants.ARROW}
                    alt={`institution-${id}-arrow`} />
                {getActionBlock(id)}
            </div>
            <div id={`institution-${id}-cuts`} className={styles.institutionCuts}>
                {getCuts(id, cuts)}
            </div>
            <div id={`institution-${id}-grid`} className={styles.institutionGrid} >
                <div id={`institution-${id}-grid-0`} className={getGridStartSpaceClass(id, value)} />
                <div id={`institution-${id}-grid-1`} className={getGridSpaceClass(id, 1, value, styles.institutionGridSpace)} />
                <div id={`institution-${id}-grid-2`} className={getGridSpaceClass(id, 2, value, styles.institutionGridSpace)} />
                {getCutsEffect(id, value, dispatch)}
            </div>
            <div id={`institution-${id}-header`} className={getFooterClass(id)} />
        </div>
    );
};

function getActionBlock(id) {
    switch (id) {
        case Institutions.NATIONAL_SECURITY_ID:
            return (
                <div id={`institution-${id}-action-text`} className={styles.institutionActionEffect}>
                    <span className={styles.institutionActionText}>Add</span>
                    <img
                        id={`institution-${id}-action-cube`}
                        className={styles.institutionActionCube}
                        src={Constants.SECURITY_CUBE}
                        alt={`institution-${id}-security-cube`} />
                </div>
            );
        case Institutions.PRIVATE_ENTERPRISE_ID:
            return (
                <div id={`institution-${id}-action-text`} className={styles.institutionActionEffect}>
                    <span className={styles.institutionActionText}>+1 Employment</span>
                </div>
            );
        case Institutions.SOCIAL_WELFARE_ID:
            return (
                <div id={`institution-${id}-action-text`} className={styles.institutionActionEffect}>
                    <span className={styles.institutionActionText}>Add</span>
                    <img
                        id={`institution-${id}-action-cube`}
                        className={styles.institutionActionCube}
                        src={Constants.WELFARE_CUBE}
                        alt={`institution-${id}-welfare-cube`} />
                </div>
            );
        default:
            return;
    }
};

function getCuts(id, cuts) {
    var cutsBlock = [];

    for (var i = 0; i < cuts.length; i++) {
        cutsBlock.push(
            <img
                key={`institution-${id}-${i}`}
                id={`institution-${id}-${i}`}
                className={styles.institutionCutImage}
                src={cuts[i]}
                alt={`institution-${id}-${i}`} />
        );
    }

    return cutsBlock;
}

function getCutsEffect(id, value, dispatch) {
    switch (id) {
        case Institutions.NATIONAL_SECURITY_ID:
            return (
                <div
                    id={`institution-${id}-grid-3`}
                    className={getGridSpaceClass(id, 3, value, styles.institutionGridFinalSpace)}
                    onClick={() => dispatch(cutNationalSecurityFinal())}>
                    <span className={styles.institutionCutText}>Add</span>
                    <img
                        id={`institution-${id}-cut-cube`}
                        className={styles.institutionCutCube}
                        src={Constants.UNREST_CUBE}
                        alt={`institution-${id}-unrest-cube`} />
                </div>
            );
        case Institutions.PRIVATE_ENTERPRISE_ID:
            return (
                <div
                    id={`institution-${id}-grid-3`}
                    className={getGridSpaceClass(id, 3, value, styles.institutionGridFinalSpace)}
                    onClick={() => dispatch(cutPrivateEnterpriseFinal())}>
                    <span className={styles.institutionCutText}>-2 Employment</span>
                </div>
            );
        case Institutions.SOCIAL_WELFARE_ID:
            return (
                <div
                    id={`institution-${id}-grid-3`}
                    className={getGridSpaceClass(id, 3, value, styles.institutionGridFinalSpace)}
                    onClick={() => dispatch(cutSocialWelfareFinal())}>
                    <span className={styles.institutionCutText}>-2 Health</span>
                </div>
            );
        default:
            return;
    }
}

function getFundingImage(id, funded, currentEvent, dispatch) {
    if (funded) {
        return (
            <img
                id={`institution-${id}-income-icon`}
                className={styles.institutionIncomeIcon}
                src={Constants.INCOME_CUBE}
                alt={`institution-${id}-income`} />
        );
    }

    var iconStyle = styles.institutionIncomeIcon;

    if (currentEvent === 'fund-institution') {
        iconStyle = Util.makeImportantEvent(Util.makeClickable(iconStyle));
    }

    switch (id) {
        case Institutions.NATIONAL_SECURITY_ID:
            return (
                <img
                    id={`institution-${id}-income-icon`}
                    className={iconStyle}
                    src={Constants.INCOME_ICON}
                    onClick={() => dispatch(fundNationalSecurity())}
                    alt={`institution-${id}-income`} />
            );
        case Institutions.PRIVATE_ENTERPRISE_ID:
            return (
                <img
                    id={`institution-${id}-income-icon`}
                    className={iconStyle}
                    src={Constants.INCOME_ICON}
                    onClick={() => dispatch(fundPrivateEnterprise())}
                    alt={`institution-${id}-income`} />
            );
            case Institutions.SOCIAL_WELFARE_ID:
                return (
                    <img
                        id={`institution-${id}-income-icon`}
                        className={iconStyle}
                        src={Constants.INCOME_ICON}
                        onClick={() => dispatch(fundSocialWelfare())}
                        alt={`institution-${id}-income`} />
                );
        default:
            return;
    }
}

function getGridSpaceClass(id, gridNum, value, cssClass) {
    if (value === gridNum && gridNum === 3) {
        cssClass = Util.makeImportantEvent(Util.makeClickable(cssClass));
    } else if (value === gridNum) {
        cssClass = Util.makeHighlighted(cssClass);
    }

    switch (id) {
        case Institutions.NATIONAL_SECURITY_ID:
            return InstitutionUtil.addNationalSecurityLight(cssClass);
        case Institutions.PRIVATE_ENTERPRISE_ID:
            return InstitutionUtil.addPrivateEnterpriseLight(cssClass);
        case Institutions.SOCIAL_WELFARE_ID:
            return InstitutionUtil.addSocialWelfareLight(cssClass);
        default:
            return cssClass;
    }
}

function getGridStartSpaceClass(id, value) {
    var cssClass = styles.institutionGridStartSpace;

    if (value === 0) {
        cssClass = Util.makeHighlighted(cssClass);
    }

    switch (id) {
        case Institutions.NATIONAL_SECURITY_ID:
            return InstitutionUtil.addNationalSecurityMedium(cssClass);
        case Institutions.PRIVATE_ENTERPRISE_ID:
            return InstitutionUtil.addPrivateEnterpriseMedium(cssClass);
        case Institutions.SOCIAL_WELFARE_ID:
            return InstitutionUtil.addSocialWelfareMedium(cssClass);
        default:
            return cssClass;
    }
}

function getHeaderClass(id) {
    switch (id) {
        case Institutions.NATIONAL_SECURITY_ID:
            return InstitutionUtil.addNationalSecurityDark(styles.institutionHeader);
        case Institutions.PRIVATE_ENTERPRISE_ID:
            return InstitutionUtil.addPrivateEnterpriseDark(styles.institutionHeader);
        case Institutions.SOCIAL_WELFARE_ID:
            return InstitutionUtil.addSocialWelfareDark(styles.institutionHeader);
        default:
            return styles.institutionHeaderFooter
    }
};

function getFooterClass(id) {
    switch (id) {
        case Institutions.NATIONAL_SECURITY_ID:
            return InstitutionUtil.addNationalSecurityDark(styles.institutionFooter);
        case Institutions.PRIVATE_ENTERPRISE_ID:
            return InstitutionUtil.addPrivateEnterpriseDark(styles.institutionFooter);
        case Institutions.SOCIAL_WELFARE_ID:
            return InstitutionUtil.addSocialWelfareDark(styles.institutionFooter);
        default:
            return styles.institutionFooter
    }
};

function getInstitutionClass(id, activeCuts) {
    switch (activeCuts) {
        case Constants.DEBT_INCOME_CUT:
            if (id === Institutions.PRIVATE_ENTERPRISE_ID || id === Institutions.SOCIAL_WELFARE_ID) {
                return Util.makeImportantEvent(styles.institution);
            }
            return styles.institution;
        case Constants.DEBT_SECURITY_CUT:
            if (id === Institutions.NATIONAL_SECURITY_ID || id === Institutions.SOCIAL_WELFARE_ID) {
                return Util.makeImportantEvent(styles.institution);
            }
            return styles.institution;
        case Constants.DEBT_UNREST_CUT:
            if (id === Institutions.PRIVATE_ENTERPRISE_ID || id === Institutions.NATIONAL_SECURITY_ID) {
                return Util.makeImportantEvent(styles.institution);
            }
            return styles.institution;
        case Constants.DEBT_WELFARE_CUT:
            if (id === Institutions.PRIVATE_ENTERPRISE_ID || id === Institutions.SOCIAL_WELFARE_ID) {
                return Util.makeImportantEvent(styles.institution);
            }
            return styles.institution;
        default:
            return styles.institution;
    }
}

export default Institution;