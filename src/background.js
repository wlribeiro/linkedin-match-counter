chrome.tabs.onActivated.addListener(tab => {
    chrome.tabs.get(tab.tabId, current_tab_info => {
        if(/^https:\/\/www\.linkedin/.test(current_tab_info.url)){
            // chrome.tabs.insertCSS(null, {file:"./style.css"})
            chrome.tabs.executeScript(
                tab.tabId,
                {file: "./foreground.js"},
                buildPopup, 
                );
        }
    });
});

function buildPopup(result) {
    // recebe um array como retorno do metodo
    console.log("injected")
    if(result[0]){
        modifyPopup()
    }
}

function modifyPopup(){
    console.log("popup.html");
}