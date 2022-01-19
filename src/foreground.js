// const experiences = document.getElementsByClassName("experience-card");
// let li = experiences[0].getElementsByTagName("li");

var actualProfileName = null;
// espera a pagna carregar para pegar as informações
const interval = setInterval(() =>{
    // pega a div que contem todas as experiencias do usuario
    const experiences = document.getElementsByClassName("experience-card");
    let profileName = document.getElementsByClassName("artdeco-entity-lockup__title ember-view")[0].innerText

    if(actualProfileName != profileName){
        if(experiences){
            actualProfileName = profileName;
            parseExperieces(experiences);
        }
    }
    
}, 10);


async function parseExperieces(experiences) {
    let li = experiences[0].getElementsByTagName("li");
    let match = 0;
    let stacks = ""
    let companyData = "";

    let targetCompanies = []
    for(let k = 0; k < li["length"]; k++){
        try {
            companyData = parseCompanyData(li[k])
            if(seeIfIsATargetCompany(companyData["name"])){
                match += 35;
                targetCompanies.push(companyData["name"])
            }

            if(companyData["summary"]){
                match += await searchForOurTechsInSummary(companyData["summary"]);
            }
            match += await searchForOurTechsInCompetencies()

        } catch (error) {
            console.log(error);
        }
    }

    alert(
        "Match com a empresa: "+ match + "%" +"\n" + targetCompanies
        );   
}

function getCompanyName(li) {
    // alguns perfis com multiplos cargos não são encontrados pela classe company-link
    let companyName;

    try{
        companyName = li.getElementsByClassName("position-item__company-link")[0].text.trim();
    } catch (error) {
        try{
            companyName = li.getElementsByClassName("grouped-position-entity__company-name")[0].textContent;
        } catch {
            try{
                companyName = li.getElementsByClassName("grouped-position-entity__right-content")[0].innerText
            } catch {
                companyName = li.getElementsByClassName("background-entity__summary-definition--subtitle")[0].innerText
            }
        }
    } 

    return companyName;
}

function getCompanyWorkTime(li) {
    // tratar problema da pessoa que trabalhou em varios cargos
    let companyWorkTime

    try {
        companyWorkTime = li.getElementsByClassName("background-entity__duration")[0].textContent 
    } catch (error) {
        try{
            companyWorkTime = li.getElementsByClassName("t-14")[0].textContent;
        } catch {
            companyWorkTime = 0;
        }
    }

    return companyWorkTime;
}


function getCompanyWorkSummary(li) {
    let summary;

    try{
        summary = li.textContent;
    } catch (error){
        summary = null;
    }

    return summary;
}


function parseCompanyData(li) {
    let companyName = getCompanyName(li)
    let companyWorkTime = getCompanyWorkTime(li)
    let companyWorkSummary = getCompanyWorkSummary(li)

    return {"name": companyName, "time": companyWorkTime, "summary": companyWorkSummary}
}

function searchForOurTechsInSummary(summary) {
    return searchForOurTechs(summary);
}

function searchForOurTechsInCompetencies() {
    let competencies = parseCompetencies();
    let num = 0;

    num += searchForOurTechs(competencies);
    
    return num;
    
}

function searchForOurTechs(text) {
    let stacks = 0;
    text.toUpperCase()
    for(let i = 0; i < target_techs.length; i++){
        if(text.search(target_techs[i].toUpperCase()) !== -1){
            stacks += 1
        }
    }

    return stacks;
}

function parseCompetencies() {
    let techs;
    
    try {
        techs = document.getElementsByClassName("skills-card__list")[0].textContent
    } catch (error) {
        techs = null;  
        console.log(error);      
    }
    return techs.replace("\n", "");
}

function seeIfIsATargetCompany(companyName) {
    for(let i = 0; i < target_companies.length; i++){
        if(companyName.toUpperCase() === target_companies[i].toUpperCase()){
            return true;
        }
    }
    return false;
}


// isso precisa ser melhorado 
const target_companies = Array(
        "99",
        "OLX BRASIL",
        "Mercado Livre Brasil",
        "Globo",
        "Sidia Instituto de Ciência e Tecnologia",
        "CI&T",
        "QuintoAndar.com",
        "UOL BoaCompra",
        "BoaCompra",
        "VTEX The True Cloud Commerce Platform",
        "VTEX - The True Cloud Commerce Platform",
        "Indeva by VTEX",
        "Instituto de Pesquisas Eldorado",
        "IBM",
        "Wildlife Studios",
        "Amaro",
        "Amazon",
        "Amazon Web Services (AWS)",
        "Avenue Code",
        "B2W Digital",
        "CargoX",
        "Cheesecake labs",
        "Cielo",
        "Clickbus",
        "Conta Azul",
        "VTEX",
        "Creditas",
        "Doghero",
        "Daitan Group",
        "Easynvest",
        "ebanx",
        "Elo7 ",
        "Gamers Club",
        "GetNinjas",
        "Globo.com",
        "Google",
        "Guiabolso",
        "Gympass",
        "Hash",
        "Hotmart",
        "iFood",
        "InLoco",
        "Linx",
        "Liv up",
        "Loft",
        "Loggi",
        "Luizalabs",
        "Magazine luiza",
        "Maxmilhas",
        "Méliuz",
        "Mercado livre",
        "Mercadolivre",
        "Microsoft",
        "Softplan Planejamento de Sistemas LTDA",
        "Softplan",
        "Movile",
        "Neon",
        "Nubank",
        "OLX",
        "Thoughtworks",
        "Pagseguro",
        "PagSeguro PagBank",
        "PagBank",
        "ZAP+",
        "Zup Innovation",
        "Passei Direto",
        "Paypal",
        "Petlove",
        "Picpay",
        "Pipefy",
        "Pravaler",
        "Quero Educação",
        "Quintoandar",
        "Red hat",
        "Resultados digitais",
        "Semantix Brasil",
        "Serasa experian",
        "Stilingue",
        "Stone",
        "SumUp",
        "Sympla",
        "Take",
        "Uber",
        "UOL",
        "UOL - Universo Online",
        "Via Varejo",
        "Xerpa",
        "Zé Delivery",
        "Zee.dog",
        "Zoom",
        "buscapé",
        "Stone Pagamentos",
        "PagBank PagSeguro",
        "Compass.uol",
        "PagSeguro UOL",
        "UOL EdTech",
        "BoaCompra",
        "compasso",
        "Loadsmart", 
        "Linx S.A.",
        "Rede Globo",
        "Olist"
)

const target_techs = [
    "JAVA",
    "MICROSERVICES",
    "PYTHON",
    "RUBY",
    "SPRING",
    "RABBITMQ",
    "KAFKA",
    "MQ",
    "AWS",
    "MONGODB",
    "DOCKER",
    "GOOGLE CLOUD PLATFORM",
    "NODE",
    "NODE.JS",
    "TDD",
    "API",
    "APIS",
    "GO"
]

const dont_invade = [
    'Addi', 'Arquivei', 'BizCapital', 'Clínica Sim', 
    'ContaAzul', 'DogHero/Petlove', 'eduK', 'Elo7', 
    'EmCasa', 'Enjoei', 'Estante Mágica', 'Facio', 
    'Flash', 'GetNinjas', 'Grupo Zap', 'Hi Technologies', 
    'idwall', 'Jusbrasil', 'Kovi', 'Kunumi', 'Liftit', 
    'Loft', 'Loggi', 'Magnetis', 'Méliuz', 'Mercos', 
    'Mindlab', 'Neon', 'Neoway', 'Pier', 'Pipo Saúde', 
    'Rebel', 'Rocket Chat', 'Weel', 'Yuca'
]
