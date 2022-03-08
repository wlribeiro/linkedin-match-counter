chrome.tabs.onActivated.addListener( (tab) => {
    getTabAndExecScript(tab)
});

function getTabAndExecScript(tab){
    chrome.tabs.get(tab.tabId, current_tab_info => {
        if(/^https:\/\/www\.linkedin/.test(current_tab_info.url)){
            executeScript(tab.tabId)
        }
    });

}

function executeScript(id){
    chrome.scripting.executeScript({
        target: {tabId: id, allFrames: true},
        files: ['src/foreground.js'],
    })
}
