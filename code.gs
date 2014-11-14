/**
 * @OnlyCurrentDoc
 *
 * The above comment directs Apps Script to limit the scope of file
 * access for this add-on. It specifies that this add-on will only
 * attempt to read or modify the files in which the add-on is used,
 * and not all of the user's files. The authorization request message
 * presented to users will reflect this limited scope.
 */

/**
 * A global constant String holding the title of the add-on. This is
 * used to identify the add-on in the notification emails.
 */
var ADDON_TITLE = 'Lob';

/**
 * A global constant 'notice' text to include with each email
 * notification.
 */
var NOTICE = "Test Lob add-on for Google Docs";


 /**
  * Adds a custom menu to the active form to show the add-on sidebar.
  *
  * @param {object} e The event parameter for a simple onOpen trigger. To
  *     determine which authorization mode (ScriptApp.AuthMode) the trigger is
  *     running in, inspect e.authMode.
  */
function onOpen(e) {
 var ui = DocumentApp.getUi();
  ui.createMenu('Lob')
      .addItem('Send Doc as Letter', 'showSidebar')
      .addToUi();

}

/**
 * Runs when the add-on is installed.
 *
 * @param {object} e The event parameter for a simple onInstall trigger. To
 *     determine which authorization mode (ScriptApp.AuthMode) the trigger is
 *     running in, inspect e.authMode. (In practice, onInstall triggers always
 *     run in AuthMode.FULL, but onOpen triggers may be AuthMode.LIMITED or
 *     AuthMode.NONE).
 */
function onInstall(e) {
  onOpen(e);
}

/**
 * Opens a sidebar in the form containing the add-on's user interface for
 * configuring the notifications this add-on will produce.
 */
function showSidebar() {
  var ui = HtmlService.createHtmlOutputFromFile('Sidebar')
      .setTitle('Lob');
  DocumentApp.getUi().showSidebar(ui);
}

