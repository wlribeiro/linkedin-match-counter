function getCompanyName(li) {
    // alguns perfis com multiplos cargos não são encontrados pela classe company-link
    let companyName;
    const classToGetData = [
        "position-item__company-link",
        "grouped-position-entity__company-name",
        "grouped-position-entity__right-content",
        "background-entity__summary-definition--subtitle"
    ]

    const parseCompanyName = (tag, class_) => {
        return tag.getElementsByClassName(class_).innerText
    }

    for(let i = 0; i < classToGetData.length; i ++){
        try {
            companyName = parseCompanyName(li, classToGetData[i]);
            console.log(class_);
        } catch (error) {
            console.log("not luck");
        }
    } 
}