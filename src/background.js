var tabUrl;

chrome.tabs.onActivated.addListener( (tab) => {
    getTabAndExecScript(tab)
});

// chrome.tabs.onUpdated.addListener(tab => {
//     getCurrentTab();
//     if(tabUrl){
//         getTabAndExecScript(tab)
//     }
// });


async function getCurrentTab() {
    let queryOptions = {
        active: true,
        currentWindow: true
    };

    let [tab] = await chrome.tabs.query(queryOptions)
    tabUrl = tab.url;
}

function getTabAndExecScript(tab){
    let id;
    
    if(typeof(tab) === 'number'){
        id = tab
    } else {
        id = tab.tabId
    }
    chrome.tabs.get(id, current_tab_info => {
        if(/^https:\/\/www\.linkedin\/talent\/profile/.test(current_tab_info.url)){
            executeScript(id)
        }
    });

}

function executeScript(id){
    chrome.scripting.executeScript({
        target: {tabId: id, allFrames: true},
        files: ['src/foreground.js'],
    })
}
