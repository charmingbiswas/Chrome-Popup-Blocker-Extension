//TODO - Doesn't do much as of now, will implement new features in the future
import { fetchBlockList } from './utils';

let urlBlockList = []; //In memory block list
let addedRules: chrome.declarativeNetRequest.Rule[] = [];
let idsOfRulesToRemove: number[] = [];

chrome.runtime.onInstalled.addListener(async () => {
    urlBlockList = await fetchBlockList();
    urlBlockList.forEach((url, index) => {
        if (url.includes('[')) {
            return;
        } else if (url.includes('!')) {
            return;
        } else {
            let ruleId = index + 1;
            let rulesObject: chrome.declarativeNetRequest.Rule = {
                id: ruleId,
                priority: 1,
                action: {
                    type: chrome.declarativeNetRequest.RuleActionType.BLOCK,
                },
                condition: {
                    urlFilter: `${url}`,
                    domainType:
                        chrome.declarativeNetRequest.DomainType.THIRD_PARTY,
                    resourceTypes: [
                        chrome.declarativeNetRequest.ResourceType.MAIN_FRAME,
                        chrome.declarativeNetRequest.ResourceType.SUB_FRAME,
                        chrome.declarativeNetRequest.ResourceType.SCRIPT,
                    ],
                },
            };

            addedRules.push(rulesObject);
            idsOfRulesToRemove.push(ruleId);
        }
    });

    console.log(addedRules);
    console.log(
        //     chrome.declarativeNetRequest.MAX_NUMBER_OF_DYNAMIC_AND_SESSION_RULES,
        //     chrome.declarativeNetRequest.MAX_NUMBER_OF_STATIC_RULESETS,
        //     chrome.declarativeNetRequest.GUARANTEED_MINIMUM_STATIC_RULES,
        //     chrome.declarativeNetRequest.MAX_GETMATCHEDRULES_CALLS_PER_INTERVAL,
        //     chrome.declarativeNetRequest.MAX_NUMBER_OF_STATIC_RULESETS,
        //     chrome.declarativeNetRequest.MAX_NUMBER_OF_REGEX_RULES,
        chrome.declarativeNetRequest.getAvailableStaticRuleCount()
        //     chrome.declarativeNetRequest.getEnabledRulesets(),
        //     chrome.declarativeNetRequest.getDynamicRules()
    );

    // chrome.declarativeNetRequest.updateDynamicRules({
    //     addRules: addedRules,
    //     removeRuleIds: idsOfRulesToRemove,
    // });
});

// chrome.webNavigation.onBeforeNavigate.addListener(() => {
//     chrome.declarativeNetRequest.getDynamicRules().then((details) => {
//         console.log(details);
//     });
// });
