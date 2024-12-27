const telemetrSettings = {
    siteName: "https://telemetr.me",
    // siteName: "https://sinzem.github.io/index.html",
    // siteName: "https://rozetka.com.ua/ua",
    hideBrowser: false,
    // proxy: [ '--proxy-server=socks5://127.0.0.1:9050' ],
    proxy: [],
    littleInterval: 1000,
    middleInterval: 2000,
    bigInterval: 3000,
    authBtn: "#btn_auth",
    emailInput: "input[name='login[email]']",
    passwordInput: "input[name='login[password]']",
    loginSubmitBtn: "button[name='do_login']",
    toCatalogueBtn: "a.btn.btn-warning.btn-lg.btn-block > span",
    describeInput: "input[name='about']",
    participantsMinInput: "input[name='participants_from']",
    findChannelBtn: "button.btn.btn-block.btn-warning",
    channelCards: "a.kt-ch-title",
    paginationsBtns: "a.btn-light"
}

module.exports = telemetrSettings;
