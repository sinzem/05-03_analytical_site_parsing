require("dotenv").config();
const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");
const telemetrSettings = require("./parsingSettings/parsingTelemetrSettings.js");
    /* (Settings and description of work are in the telemetrSettings document) */

async function parsingTelemetr() {

    let pagesTotal = telemetrSettings.pagesForParsing;
    const findChannelBtn = telemetrSettings.findChannelBtn;

    const browser = await puppeteer.launch({
        timeout: telemetrSettings.middleInterval,
        headless: false,
        // args: telemetrSettings.proxy,
        userDataDir: process.env.PATH_TO_TEMP || null,
    });
    const page = await browser.newPage();
    await page.setViewport({width: 1200, height: 800});

    await page.exposeFunction('startButtonClicked', async () => {
        console.log("Start process");
        let tgData = [];
        let describe = "";
        let currentPage = 1;

        while (pagesTotal) {
            --pagesTotal;
            await new Promise(resolve => { setTimeout(resolve, telemetrSettings.littleInterval)});
            let arr = await page.evaluate((currentPage, pagesTotal, obj) => {
                let channelCards = [];
                let evenCards = document.querySelectorAll(obj.evenCardsSelector); 
                let oddCards = document.querySelectorAll(obj.oddCardsSelector); 
                evenCards.forEach((e, i) => i % 2 === 0 ? channelCards.push(e) : null);
                oddCards.forEach((e, i) => i % 2 === 0 ? channelCards.push(e) : null);
                
                let cardsData = [];
                channelCards.forEach(card => {
                    let link = card.querySelector(obj.titleCardSelector);
                    let name = link.textContent;
                    let tgAddress = link.href.split("/").at(-1);
                    let participantsElem = card.querySelector(obj.participantsSelector);
                    let participants = participantsElem.textContent.trim();
                    let cardData = {name, tgAddress, participants};
                    cardsData.push(cardData);
                }) 
                
                let describeInput = document.querySelector(obj.describeInput);
                let describeInputValue = describeInput.value;
                let nextPage = currentPage + 1;
                let paginationBtns = document.querySelectorAll(obj.paginationsBtnsSelector);
                let flag = 0;
                paginationBtns.forEach(e => {
                    if (e.textContent == nextPage && flag === 0 && pagesTotal > 0) {
                        e.click();
                        flag++;
                    }
                })
                return { cardsData, nextPage, flag, describeInputValue}
            }, currentPage, pagesTotal, telemetrSettings)
            
            tgData = [...tgData, arr.cardsData];
            currentPage = arr.nextPage;
            arr.flag === 0 ? pagesTotal = 0 : null;
            arr.describeInputValue ? describe = arr.describeInputValue : describe = "NoName";
        }
    
        fs.writeFileSync(path.resolve(__dirname, "results", `${describe}_${telemetrSettings.pagesForParsing}_${Date.now()}.json`), JSON.stringify(tgData, null, 2));
        console.log("End process");
        await browser.close();
    });

    await page.goto(telemetrSettings.siteName);

    await page.waitForSelector(findChannelBtn, {timeout: telemetrSettings.bigInterval});
    await page.evaluate((btn) => {
        let startBtn = document.querySelector(btn);
        startBtn.addEventListener("click", () => {
            console.log("Start button clicked")
            window.startButtonClicked();
        })
    }, findChannelBtn)
   
} 

parsingTelemetr();



