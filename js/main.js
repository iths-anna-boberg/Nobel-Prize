async function getLaureates(){
    let response = await fetch('https://api.nobelprize.org/2.0/laureates?gender=female&limit=100')
    let listLaureates = await response.json()
    return listLaureates.laureates;
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



async function renderLaureatesByYear(){
    let list = await getLaureates();
    let btnYear = document.querySelector("#year-btn")
    let selectOption = document.querySelector("#select-year")

    
    btnYear.addEventListener("click", event =>{
        let selectedYear = selectOption.value
        for (let i=0; i<list.length; i++){
            let laureate = list[i]
            let firstNobelPrize = laureate.nobelPrizes[0]
            let awardYear = firstNobelPrize.awardYear
            if(selectedYear==awardYear){
                let name = list[i]
                console.log(name.knownName.en)
            }
            // else{
            //     console.log("Nope")
            // }
        }
    })

}

createCheckYear();
renderLaureatesByYear();