--- To work you need to run index.js.

--- When you run the script, a Chrome browser window will open with the main page of the Telemetr website. The user needs to log into his account and enter the desired settings in the channel selection inputs. 

--- When working in a browser opened with Puppeteer, it is advisable to wait until pages have fully loaded before interacting with them, otherwise the session may fail or fail to trigger the desired operations.

--- The user can add the path to the temporary Chrome files on their computer to the .env document, this will save the session data and will allow them not to log into their account again the next time they connect.

--- After logging into your account and setting up selection filters, click the “Найти каналы” button, this will start the parsing process.

--- In the parsingSettings folder in the settings object, you can change the number of pages for parsing, the waiting intervals for loading pages, and the proxies used.

--- After finishing its work, the parser will close the browser window and create a json document in the results folder.  These will be objects with the channel name, nickname (or invitation link if it is a private channel) and the number of subscribers.