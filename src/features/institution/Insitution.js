import React from 'react';
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

    return (
        <div id={`instituion-${id}`} className={styles.institution}>
            <div id={`institution-${id}-header`} className={getHeaderFooterClass(id)}>
                {name}
            </div>
            <div id={`institution-${id}-action`} className={styles.institutionAction}>
                <img
                    id={`institution-${id}-income-icon`}
                    className={styles.institutionIncomeIcon}
                    src={Constants.INCOME_ICON}
                    alt={`institution-${id}-income`} />
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
                {getCutsEffect(id, value)}
            </div>
            <div id={`institution-${id}-header`} className={getHeaderFooterClass(id)} />
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
                id={`institution-${id}-${i}`}
                className={styles.institutionCutImage}
                src={cuts[i]}
                alt={`institution-${id}-${i}`} />
        );
    }

    return cutsBlock;
}

function getCutsEffect(id, value) {
    switch (id) {
        case Institutions.NATIONAL_SECURITY_ID:
            return (
                <div id={`institution-${id}-grid-3`} className={getGridSpaceClass(id, 3, value, styles.institutionGridFinalSpace)}>
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
                <div id={`institution-${id}-grid-3`} className={getGridSpaceClass(id, 3, value, styles.institutionGridFinalSpace)}>
                    <span className={styles.institutionCutText}>-2 Employment</span>
                </div>
            );
        case Institutions.SOCIAL_WELFARE_ID:
            return (
                <div id={`institution-${id}-grid-3`} className={getGridSpaceClass(id, 3, value, styles.institutionGridFinalSpace)}>
                    <span className={styles.institutionCutText}>-2 Health</span>
                </div>
            );
        default:
            return;
    }
}

function getGridSpaceClass(id, gridNum, value, cssClass) {
    if (value === gridNum) {
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

function getHeaderFooterClass(id) {
    switch (id) {
        case Institutions.NATIONAL_SECURITY_ID:
            return InstitutionUtil.addNationalSecurityDark(styles.institutionHeaderFooter);
        case Institutions.PRIVATE_ENTERPRISE_ID:
            return InstitutionUtil.addPrivateEnterpriseDark(styles.institutionHeaderFooter);
        case Institutions.SOCIAL_WELFARE_ID:
            return InstitutionUtil.addSocialWelfareDark(styles.institutionHeaderFooter);
        default:
            return styles.institutionHeaderFooter
    }
};

export default Institution;