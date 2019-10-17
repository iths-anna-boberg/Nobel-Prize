


//funktion som ska hämta wiki-information 
async function createWikiLink(name){
    let searchGet = `https://en.wikipedia.org/w/api.php?action=opensearch&search=${name}&limit=1&format=json&origin=*`
    let response = await fetch(searchGet, {
        headers: {
            'User-Agent': 'anna.boberg@iths.se'
        }
    })
    let listResponse = await response.json()
    console.log(listResponse)
    return listResponse[3]
} 



async function getLaureates(){
    let response = await fetch('https://api.nobelprize.org/2.0/laureates?gender=female&limit=100')
    let listLaureates = await response.json()
    return listLaureates.laureates;
}

function createCheckLists(){
    
    let selectList = document.querySelector("#select-year")
    let itemTest = document.querySelector("option.before");
    let categoryTest = document.querySelector("option.before-c")
    let startYear = 1901;
    let d = new Date();
    let endYear = d.getFullYear();
    let selectCategory = document.querySelector("#select-category")
    let categoryList = ["Chemistry","Literature","Peace","Physiology or Medicine","Physics","Economic Sciences"]
    
    while (startYear <= endYear) {
        let yearOption = itemTest.cloneNode(true);
        yearOption.setAttribute("value",startYear);
        yearOption.classList.remove("before");
        yearOption.classList.add("option-list");
        yearOption.innerText = startYear;
        selectList.append(yearOption);
        startYear++;
    }

    for(let item of categoryList){
        let categoryOption = categoryTest.cloneNode(true);
        categoryOption.setAttribute("value",item);
        categoryOption.classList.remove("before-c");
        categoryOption.classList.add("category-option-list");
        categoryOption.innerText = item;
        selectCategory.append(categoryOption);
    }

}



async function renderLaureatesByYear(){
    let list = await getLaureates();
    let btnYear = document.querySelector("#year-btn")
    let selectOption = document.querySelector("#select-year")
    let result = document.querySelector(".result")
    
    
    btnYear.addEventListener("click", async event =>{
        result.innerHTML = " "
        var femLaur = false;
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
                let linkUrl = await createWikiLink(laureate.knownName.en);
                let linkElement = document.createElement("a");
                linkElement.setAttribute("href", linkUrl);
                linkElement.setAttribute("target", "_blank");
                linkElement.innerHTML = `Read about ${laureate.knownName.en} on Wikipedia.org`;
                result.appendChild(linkElement);
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

async function renderLaureatesByCategory(){
    let list = await getLaureates();
    let btnCat = document.querySelector("#cat-btn")
    let selectOption = document.querySelector("#select-category")
    let result = document.querySelector(".category-result")

    btnCat.addEventListener("click", event =>{
        result.innerHTML = " "
        let selectedCat = selectOption.value
        for (let i=0; i<list.length; i++){
            let laureate = list[i]
            let categoryPrize = laureate.nobelPrizes[0].category
            let categoryName = categoryPrize.en

            if(selectedCat == categoryName){
                console.log(laureate.knownName.en)
                let nameHeading = document.createElement("h2")
                nameHeading.textContent = laureate.knownName.en
                result.appendChild(nameHeading)
                let categoryFull = document.createElement("p")
                categoryFull.textContent = `was awarded ${laureate.nobelPrizes[0].categoryFullName.en} in ${laureate.nobelPrizes[0].awardYear}, ${laureate.nobelPrizes[0].motivation.en}.`
                result.appendChild(categoryFull)

            }
        }


    })

 
}

createCheckLists();
renderLaureatesByYear();
renderLaureatesByCategory();