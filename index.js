require("dotenv").config();
const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");
const {siteName,
        hideBrowser,
        proxy,
        littleInterval,
        middleInterval,
        bigInterval,
    } = require("./parsingSettings/parsingTelemetrSettings.js");



async function parsingTelemetr(urlName, name, pagesTotal) {

    let url;
    if (urlName.toLowerCase() === "telemetr") {
        url = siteName;
    }
    
    const browser = await puppeteer.launch({
        timeout: 60000,
        headless: hideBrowser,
        // args: proxy,
        userDataDir: 'C:/Users/sinzem/AppData/Local/Google/Chrome/User Data/Profile 2/Sessions',
    });
    const page = await browser.newPage();
    await page.setViewport({width: 1200, height: 800});

    await page.exposeFunction('startButtonClicked', async () => {
        console.log("Start process");
        let tgData = [];
        let currentPage = 1;
        while (pagesTotal) {
            
            await new Promise(resolve => { setTimeout(resolve, 29000)});
            let arr = await page.evaluate((currentPage, pagesTotal) => {
                let channelCards = [];
                let evenCards = document.querySelectorAll("tr.tr_even"); 
                let oddCards = document.querySelectorAll("tr.tr_odd"); 
                evenCards.forEach((e, i) => i % 2 === 0 ? channelCards.push(e) : null);
                oddCards.forEach((e, i) => i % 2 === 0 ? channelCards.push(e) : null);
                
                let cardsData = [];
                channelCards.forEach(card => {
                    let link = card.querySelector("a.kt-ch-title");
                    let name = link.textContent;
                    let tgAddress = link.href.split("/").at(-1);
                    let participantsElem = card.querySelector('[data-do="show_dynamic_participants"]');
                    let participants = participantsElem.textContent.trim();
                    let cardData = {name, tgAddress, participants};
                    cardsData.push(cardData);
                }) 
                // data = [...data, ...cardsData];
                // let channelsJson = JSON.stringify(cardsData, null, 2); 
                // return channelsJson;
                // console.log(data);
                let nextPage = currentPage + 1;
                let reject = pagesTotal;
                let paginationBtns = document.querySelectorAll("a.btn-light");
                let flag = 0;
                paginationBtns.forEach(e => {
                    if (e.textContent == nextPage && flag === 0) {
                        e.click();
                        flag++;
                    }
                })
                if (flag === 0) {
                    reject = 0;
                }
                return {
                    cardsData,
                    nextPage,
                    reject
                }
            }, currentPage, pagesTotal)
            tgData = [...tgData, arr.cardsData];
            currentPage = arr.nextPage;
            if (arr.reject === 0) {
                pagesTotal = 0; 
            } else {
                pagesTotal--; 
            }
        }
        // console.log(tgData);
        fs.writeFileSync(path.resolve(__dirname, `${name}.json`), JSON.stringify(tgData, null, 2));
        console.log("End process");
        await browser.close();
    });

    await page.goto(url);

    await page.waitForSelector("button.btn.btn-block.btn-warning", {timeout: 600000});
    await page.evaluate(() => {
        let startBtn = document.querySelector("button.btn.btn-block.btn-warning");
        startBtn.addEventListener("click", () => {
            console.log("startButtonClicked")
            window.startButtonClicked();
        })
    })
   
} 

parsingTelemetr("telemetr", "психология", 3);

// analytical chat parsing

