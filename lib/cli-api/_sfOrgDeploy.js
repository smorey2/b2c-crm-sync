'use strict';

// Initialize required modules
const config = require('config');
const sfdx = require('sfdx-node/parallel');

/**
 * @function _sfScratchOrgDeploy
 * @description Attempts to deploy b2c-crm-sync code a SFDX scratch org
 *
 * @param {Object} environmentDef Represents the already-validated environment details to use when performing the actions
 * @param {String} [deployPath] Represents the path where the specified meta-data will be deployed to a scratchOrg
 * @returns {Promise} Returns a promise with the scratchOrg deployment results
 */
module.exports = (environmentDef, deployPath) => {

    // noinspection SpellCheckingInspection
    const deployArguments = {
        _rejectOnError: true,
        sourcepath: deployPath
    };
    if (environmentDef.sfTestLevel) {
        deployArguments.testLevel = environmentDef.sfTestLevel;
    }
    if (deployPath === config.get('paths.source.dx.base') && environmentDef.sfRunTestsBase) {
        deployArguments.runTests = environmentDef.sfRunTestsBase;
    }
    if (deployPath === config.get('paths.source.dx.extras') && environmentDef.sfRunTestsExtras) {
        deployArguments.runTests = environmentDef.sfRunTestsExtras;
    }
    if (deployPath === config.get('paths.source.dx.personaccounts') && environmentDef.sfRunTestsPersonAccounts) {
        deployArguments.runTests = environmentDef.sfRunTestsPersonAccounts;
    }

    // Set the username to deploy to if it's defined
    if (Object.prototype.hasOwnProperty.call(environmentDef, 'sfScratchOrgUsername')) {
        deployArguments.targetusername = environmentDef.sfScratchOrgUsername;
    }

    // Attempt to deploy to the scratchOrg
    return sfdx.force.source.deploy(deployArguments);

};
