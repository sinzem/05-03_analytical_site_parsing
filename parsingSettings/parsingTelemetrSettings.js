const telemetrSettings = {
    siteName: "https://telemetr.me",
    pagesForParsing: 5, /* (number of pages for parsing, in a free account there is a maximum of 5) */
    // proxy: [ '--proxy-server=socks5://127.0.0.1:9050' ],
    proxy: [],   /* (when changing the proxy you will have to log into your account again each time) */
    /* (if Internet speed and equipment power allow, it is better to reduce the intervals) */
    littleInterval: 30000,  /* (to load pages with channel lists) */
    middleInterval: 60000,  /* (to load the start page) */
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
