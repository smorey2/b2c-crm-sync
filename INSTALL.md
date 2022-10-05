# INSTALL : BASE

## steps
nvm use 15.2.1
copy the correct env file to .env

## SFCC Verify
npm run crm-sync:test:cli
npm run crm-sync:test:b2c
npm run crm-sync:b2c:verify

## SFDC Connection
#sfdx force:org:list --all
#sfdx auth:web:login -r https://test.salesforce.com
#sfdx auth:web:login -r https://login.salesforce.com
#sfdx force:auth:logout -u <alias>
#sfdx force:alias:set newAlias=username@domain.com

## SFDC Verify
sfdx force:org:list --all
sfdx config:set defaultusername=<name here>
npm run crm-sync:sf:auth:usercreds

## SFDC DEPLOY
npm run crm-sync:sf:org:deploy
npm run crm-sync:sf:connectedapps
npm run crm-sync:sf:duplicaterules
CRM: Edit Duplicate Rules: [B2C Commerce: Standard Person Accounts]
- Set Filter Logic
  1 OR (2 AND 3) OR (2 AND 4 AND 5) OR (2 AND 4) OR (4 AND 5 AND 6)

## OOBO
npm run crm-sync:oobo:password:display
CRM: Authentication Settings for External Systems 
npm run crm-sync:b2c:auth:bmuser

## Certificate and Key Management
npm run crm-sync:sf:cert:publickey:get
npm run crm-sync:b2c:auth:jwt
npm run crm-sync:b2c:auth:clientcreds
CRM: Create self-signed-cert: b2ccrmsync_testing

## Apex Tests
sfdx force:apex:test:run -r json

## Seed Records
npm run crm-sync:sf:b2cclientid:setup
npm run crm-sync:sf:b2cinstance:setup

## Update Your PersonAccount and Contact Page Layouts
CRM: Update Contact and PersonAccount Page Layouts
- reference : B2C (Contact) Support Layout for Accounts and Contacts
- reference : B2C (PersonAccount) Support Layout for PersonAccounts

## Build and Deploy b2c-crm-sync
npm run crm-sync:b2c:build
npm run crm-sync:b2c:siteprefs:activate  (in production, manually turn these on)
npm run crm-sync:oobo:customers:create

## Validate Your Installation
npm run crm-sync:test:use-cases


# INSTALL : EXTRA

## steps
verify Salesforce Connect is a licensed capability

## Deploy the Salesforce Connect Extras
sfdx force:source:deploy -p "src/sfdc/extras/sf-connect/base"
sfdx force:source:deploy -p "src/sfdc/extras/sf-connect/personaccounts"

## Validate and Synchronize Salesforce Connect External Objects
Read: follow document