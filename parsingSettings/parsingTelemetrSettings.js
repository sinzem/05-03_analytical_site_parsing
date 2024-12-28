/* ( To work you need to run index.js
--- When you run the script, a Chrome browser window will open with the main page of the Telemetr website. The user needs to log into his account and enter the desired settings in the channel selection inputs. 
--- The user can add the path to the temporary Chrome files on their computer to the .env document, this will save the session data and will allow them not to log into their account again the next time they connect.
--- After logging into your account and setting up selection filters, click the “Найти каналы” button, this will start the parsing process.
--- In the object below you can change the number of pages for parsing, the waiting intervals for loading pages and the proxies used.
--- After finishing its work, the parser will close the browser window and create a json document in the results folder.  These will be objects with the channel name, nickname (or invitation link if it is a private channel) and the number of subscribers.) */

const telemetrSettings = {
    siteName: "https://telemetr.me",
    pagesForParsing: 5, /* (number of pages for parsing, in a free account there is a maximum of 5) */
    // proxy: [ '--proxy-server=socks5://127.0.0.1:9050' ],
    proxy: [],   /* (when changing the proxy you will have to log into your account again each time) */
    /* (if Internet speed and equipment power allow, it is better to reduce the intervals) */
    littleInterval: 30000,  /* (for pages with channel lists) */
    middleInterval: 60000,  /* (for start page) */
    bigInterval: 900000,  /* (waiting for the start button to appear - the big yellow “Найти каналы” button under the window with search settings inputs starts parsing, it is time to log in to your account and make search settings, before starting parsing, wait until the page is fully loaded) */ 
    findChannelBtn: "button.btn.btn-block.btn-warning",
    describeInput: "input[name='about']",
    evenCardsSelector: "tr.tr_even",
    oddCardsSelector: "tr.tr_odd",
    titleCardSelector: "a.kt-ch-title",
    participantsSelector: '[data-do="show_dynamic_participants"]',
    paginationsBtnsSelector: "a.btn-light"
}

module.exports = telemetrSettings;
