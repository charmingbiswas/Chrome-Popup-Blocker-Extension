console.log('backgroundScript is working!');

let hostname: string;

const enum blockedIds {
    'ONE' = 1,
}

chrome.webNavigation.onBeforeNavigate.addListener((details) => {
    if (details.parentFrameId === -1) {
        hostname = new URL(details.url).hostname;
    }

    chrome.declarativeNetRequest.updateDynamicRules({
        addRules: [
            {
                id: blockedIds.ONE,
                priority: 1,
                action: {
                    type: chrome.declarativeNetRequest.RuleActionType.BLOCK,
                },
                condition: {
                    domainType:
                        chrome.declarativeNetRequest.DomainType.THIRD_PARTY,
                    resourceTypes: [
                        chrome.declarativeNetRequest.ResourceType.SCRIPT,
                        chrome.declarativeNetRequest.ResourceType.SUB_FRAME,
                    ],
                    excludedRequestDomains: [`$https://*/{hostname}/*`],
                },
            },
        ],
        removeRuleIds: [blockedIds.ONE],
    });
});
3;
