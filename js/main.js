async function getLaureates(){
    let response = await fetch('https://api.nobelprize.org/2.0/laureates?gender=female')
    let listLaureates = await response.json()
    return listLaureates.results;
}

function createCheckYear(){
    
    let selectList = document.querySelector("#select-year")
    let itemTest = document.querySelector("option.before");
    let startYear = 1901;
    let d = new Date();
    let endYear = d.getFullYear();
    
    while (startYear <= endYear) {
        let yearOption = itemTest.cloneNode(true);
        yearOption.setAttribute("value",startYear);
        yearOption.classList.remove("before");
        yearOption.classList.add("option-list");
        yearOption.innerText = startYear;
        selectList.append(yearOption);
        startYear++;
    }

}

createCheckYear();

async function renderLaureatesByYear(){
    let list = await getLaureates();
    

}