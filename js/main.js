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
    let result = document.querySelector(".result")
    var femLaur = false;
    
    btnYear.addEventListener("click", event =>{
        result.innerHTML = " "
        let selectedYear = selectOption.value
        for (let i=0; i<list.length; i++){
            let laureate = list[i]
            let firstNobelPrize = laureate.nobelPrizes[0]
            let awardYear = firstNobelPrize.awardYear
            if(selectedYear==awardYear){
                console.log(laureate.knownName.en)
                let presentYear = document.createElement("p")
                presentYear.textContent = `In ${awardYear}`
                result.appendChild(presentYear)
                let nameHeading = document.createElement("h2")
                nameHeading.textContent = laureate.knownName.en
                result.appendChild(nameHeading)
                let presentAward = document.createElement("p")
                presentAward.textContent = `was awarded the ${laureate.nobelPrizes[0].categoryFullName.en}.` 
                result.appendChild(presentAward)
                femLaur = true

            }        
            
        }
        if(femLaur == false){
            result.innerHTML = " "
            let negativeRes = document.createElement("p")
            negativeRes.textContent = `In ${selectedYear} there were no female laureates. Sorry.`
            result.appendChild(negativeRes)
        }
    })

}

createCheckYear();
renderLaureatesByYear();