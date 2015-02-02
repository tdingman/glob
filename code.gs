/*
 * @OnlyCurrentDoc
 *
 * The above comment directs Apps Script to limit the scope of file
 * access for this add-on. It specifies that this add-on will only
 * attempt to read or modify the files in which the add-on is used,
 * and not all of the user's files. The authorization request message
 * presented to users will reflect this limited scope.
 */
var ADDON_TITLE = 'Lob';
var NOTICE = "Test Lob add-on for Google Docs";
/**
 * Adds a custom menu to the active form to show the add-on sidebar.
 *
 * @param {object} e The event parameter for a simple onOpen trigger. To
 * determine which authorization mode (ScriptApp.AuthMode) the trigger is
 * running in, inspect e.authMode.
 */
function onOpen(e) {
        var ui = DocumentApp.getUi();
        ui.createMenu('Lob').addItem('Send Doc as Letter', 'showSidebar').addToUi();
    }
    /**
     * Runs when the add-on is installed.
     *
     * @param {object} e The event parameter for a simple onInstall trigger. To
     * determine which authorization mode (ScriptApp.AuthMode) the trigger is
     * running in, inspect e.authMode. (In practice, onInstall triggers always
     * run in AuthMode.FULL, but onOpen triggers may be AuthMode.LIMITED or
     * AuthMode.NONE).
     */
    //Helper to encode string in Base64
var Base64 = {
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    encode: function(e) {
        var t = "";
        var n, r, i, s, o, u, a;
        var f = 0;
        e = Base64._utf8_encode(e);
        while (f < e.length) {
            n = e.charCodeAt(f++);
            r = e.charCodeAt(f++);
            i = e.charCodeAt(f++);
            s = n >> 2;
            o = (n & 3) << 4 | r >> 4;
            u = (r & 15) << 2 | i >> 6;
            a = i & 63;
            if (isNaN(r)) {
                u = a = 64
            } else if (isNaN(i)) {
                a = 64
            }
            t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a)
        }
        return t
    },
    decode: function(e) {
        var t = "";
        var n, r, i;
        var s, o, u, a;
        var f = 0;
        e = e.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (f < e.length) {
            s = this._keyStr.indexOf(e.charAt(f++));
            o = this._keyStr.indexOf(e.charAt(f++));
            u = this._keyStr.indexOf(e.charAt(f++));
            a = this._keyStr.indexOf(e.charAt(f++));
            n = s << 2 | o >> 4;
            r = (o & 15) << 4 | u >> 2;
            i = (u & 3) << 6 | a;
            t = t + String.fromCharCode(n);
            if (u != 64) {
                t = t + String.fromCharCode(r)
            }
            if (a != 64) {
                t = t + String.fromCharCode(i)
            }
        }
        t = Base64._utf8_decode(t);
        return t
    },
    _utf8_encode: function(e) {
        e = e.replace(/\r\n/g, "\n");
        var t = "";
        for (var n = 0; n < e.length; n++) {
            var r = e.charCodeAt(n);
            if (r < 128) {
                t += String.fromCharCode(r)
            } else if (r > 127 && r < 2048) {
                t += String.fromCharCode(r >> 6 | 192);
                t += String.fromCharCode(r & 63 | 128)
            } else {
                t += String.fromCharCode(r >> 12 | 224);
                t += String.fromCharCode(r >> 6 & 63 | 128);
                t += String.fromCharCode(r & 63 | 128)
            }
        }
        return t
    },
    _utf8_decode: function(e) {
        var t = "";
        var n = 0;
        var r = c1 = c2 = 0;
        while (n < e.length) {
            r = e.charCodeAt(n);
            if (r < 128) {
                t += String.fromCharCode(r);
                n++
            } else if (r > 191 && r < 224) {
                c2 = e.charCodeAt(n + 1);
                t += String.fromCharCode((r & 31) << 6 | c2 & 63);
                n += 2
            } else {
                c2 = e.charCodeAt(n + 1);
                c3 = e.charCodeAt(n + 2);
                t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
                n += 3
            }
        }
        return t
    }
}

function onInstall(e) {
        onOpen(e);
    }
    //Saves settings for Lob Job

function saveSettingsAndSendLetter(settings) {
    PropertiesService.getDocumentProperties().setProperties(settings);
    sendLetterRequest();
}

function sendLetterRequest() {
    var settings = PropertiesService.getDocumentProperties();
    var api_key = settings.getProperty('apiKey') + ":";
    var auth = Base64.encode(api_key);
    var headers = {
            'Authorization': 'Basic ' + auth
        }
        //Creating the to address object
    var to_address_obj = {
        name: settings.getProperty('toName'),
        address_line1: settings.getProperty('toAddress'),
        address_city: settings.getProperty('toCity'),
        address_state: settings.getProperty('toState'),
        address_zip: settings.getProperty('toZip'),
        address_country: 'US'
    }
    var options = {
        "method": "post",
        "payload": to_address_obj,
        "headers": headers
    };
    var url = "https://api.lob.com/v1/addresses";
    var to_id = JSON.parse(UrlFetchApp.fetch(url, options).getContentText()).id;
    //
    //Creating the from address object
    var from_address_obj = {
        name: settings.getProperty('fromName'),
        address_line1: settings.getProperty('fromAddress'),
        address_city: settings.getProperty('fromCity'),
        address_state: settings.getProperty('fromState'),
        address_zip: settings.getProperty('fromZip'),
        address_country: 'US'
    }
    options = {
        "method": "post",
        "payload": from_address_obj,
        "headers": headers
    };
    var from_id = JSON.parse(UrlFetchApp.fetch(url, options).getContentText()).id;
    //
    //PDF the Doc and create an Object
    var this_id = DocumentApp.getActiveDocument().getId();
    var pdf = DocsList.getFileById(this_id).getAs('application/pdf');
    var url = "https://api.lob.com/v1/objects";
    var object1 = {
        file: pdf,
        setting: "100"
    }
    options = {
        "method": "post",
        "payload": object1,
        "headers": headers
    };
    var object_id = JSON.parse(UrlFetchApp.fetch(url, options).getContentText()).id;
    //
    //Finally, create the job object:
    var url = "https://api.lob.com/v1/jobs";
    var letter = {
        to: to_id,
        from: from_id,
        object1: object_id
    }
    options = {
        "method": "post",
        "payload": letter,
        "headers": headers
    };
    UrlFetchApp.fetch(url, options);
}

function getAddresses(api_key) {
        var auth = Base64.encode(api_key + ":");
        var headers = {
            'Authorization': 'Basic ' + auth
        }
        var url = "https://api.lob.com/v1/addresses/";
        options = {
            "method": "get",
            "headers": headers
        };
        return JSON.parse(UrlFetchApp.fetch(url, options));
    }
    
//adapted from http://code.google.com/p/google-apps-script-issues/issues/detail?id=1656
function getNumberOfPages() {
    var this_id = DocumentApp.getActiveDocument().getId();
    var pdf = DocsList.getFileById(this_id).getAs('application/pdf');
    var data = pdf.getDataAsString();
    var re = /Pages\/Count (\d+)/g;
    var match;
    var pages = 0;
    while (match = re.exec(data)) {
        var value = parseInt(match[1]);
        if (value > pages) {
            pages = value;
        }
    }
    return pages + 1;
}

function showSidebar() {
    var ui = HtmlService.createHtmlOutputFromFile('sidebar').setTitle('Lob');
    DocumentApp.getUi().showSidebar(ui);
}
