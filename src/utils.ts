/**
 * This file contains utility functions for general needs which are required again and again
 */

//Get current tab details
export async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);
    console.log(tab);
    return tab;
}

//Fetch easyList block list of ad urls
export const fetchBlockList = async () => {
    const response = await fetch('https://easylist.to/easylist/easylist.txt');
    const textFile = await response.text();
    const blockListArray = textFile.split('\n');
    return blockListArray;
};

// export const buildStaticBlockList = () => {
//     console.log(path.resolve(__dirname, '../public/'));
// };
