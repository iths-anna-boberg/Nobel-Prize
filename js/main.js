async function getLaureates(){
    let response = await fetch('https://api.nobelprize.org/2.0/laureates?gender=female')
    let listLaureates = await response.json()
    return listLaureates.results;
}