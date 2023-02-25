console.log('Hello from the background script');

//Register whatever content scripts your extension would like to run on the existing page
// chrome.scripting
//     .registerContentScripts([
//         {
//             id: 'session-script',
//             js: ['content.js'],
//             persistAcrossSessions: false,
//             matches: ['https://*/*'],
//             runAt: 'document_start',
//         },
//     ])
//     .then(() => {
//         console.log('Content script registered');
//     })
//     .catch((err: Error) => {
//         console.log(`Content script not registered. Error occurred: ${err}`);
//     });
