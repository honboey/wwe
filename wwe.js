wweChampions = require("./data/wweChampions.js").wweChampions
wrestlerStats = require("./data/wrestlerHeightAndWeight.js").wrestlerHeightAndWeight

// ===================
// Cleaning the data
// ===================

/*
Array Array -> console.log
Console log any WWE Champion's name that doesn't match / occur in wrestlerStats
check-expect    undefinedValues([{ name: "John Cena"}, {name: "Hon Boey"}], 
                                [{ name :"2 Cold Scorpio","height":"5’11”","weight":"229 lbs." }, 
                                 { name :"Abbey Laith","height":"5’4″","weight":"125 lbs." }, 
                                 { name :"Abdullah the Butcher","height":"6’0″","weight":"360 lbs." },
                                 { name :"John Cena","height":"6’1″","weight":"251 lbs." }])
                -> { name: "Hon Boey" }                  
*/

function undefinedValues(array1, array2) {
    array1.map((element) => {
        if (exist(element.name, array2)) {
            null
        } else {
            console.log(element.name)
        }
    })    
}

// undefinedValues(wweChampions, wrestlerStats)

/*
String Array -> Boolean
If the wrestler name is in the the wrestlerStats array then produce true. Otherwise produce false.
check-expect    exist("Hon Boey", [{ name :"2 Cold Scorpio","height":"5’11”","weight":"229 lbs." }, 
                                   { name :"Abbey Laith","height":"5’4″","weight":"125 lbs." }, 
                                   { name :"Abdullah the Butcher","height":"6’0″","weight":"360 lbs." },
                                   { name :"John Cena","height":"6’1″","weight":"251 lbs." }])
                -> false
*/

function exist(string, array) {
    if ((array.filter(element => element.name === string).length === 0)) {
        return false
    } else {
        return true
    }
}

// Array -> Number
// Change height value to inches
// check-expect convertToInches([5,10]) -> (5*12 + 10)
// check-expect convertToInches([5,0])  -> (5*12 + 0)
function convertToInches(array) {
    return array[0] * 12 + array[1]
}

// Array -> Array
// Convert all height values in an array to inches
/*
check-expect    heightInInches([{ name :"2 Cold Scorpio",height:[5,11],weight:229 }, 
                                { name :"Abbey Laith",height:[5,4],weight:125 }])
                -> [{ name :"2 Cold Scorpio",height:71,weight:229 }, 
                    { name :"Abbey Laith",height:64,weight:125 }]
*/
function heightInInches(array) {
    return array.map(element => ({ ...element, height: convertToInches(element.height) }));
}
wrestlerStats = heightInInches(wrestlerStats)


// ======================
// Getting the data
// ======================

/* 
Array Array -> Array
Go through each element in an array and pull out the corresponding object in another array

check-expect    wweChampionsStats([{ name: "John Cena" }],
                                  [{ name :"2 Cold Scorpio","height":"5’11”","weight":"229 lbs." }, 
                                   { name :"Abbey Laith","height":"5’4″","weight":"125 lbs." }, 
                                   { name :"Abdullah the Butcher","height":"6’0″","weight":"360 lbs." },
                                   { name :"John Cena","height":"6’1″","weight":"251 lbs." }])
                
                -> [{ name :"John Cena","height":"6’1″","weight":"251 lbs." }]

check-expect    wweChampionsStats([{ name: "John Cena" }, 
                                    { name: "2 Cold Scorpio" }],
                                  [{ name :"2 Cold Scorpio","height":"5’11”","weight":"229 lbs." }, 
                                   { name :"Abbey Laith","height":"5’4″","weight":"125 lbs." }, 
                                   { name :"Abdullah the Butcher","height":"6’0″","weight":"360 lbs." },
                                   { name :"John Cena","height":"6’1″","weight":"251 lbs." }])
                
                -> [{ name :"John Cena","height":"6’1″","weight":"251 lbs." },
                    { name :"2 Cold Scorpio","height":"5’11”","weight":"229 lbs." }]

check-expect    wweChampionsStats([{ name: "John Cena" }, 
                                   { name: "2 Cold Scorpio" }, 
                                   { name:"John Cena" }],
                                  [{ name :"2 Cold Scorpio","height":"5’11”","weight":"229 lbs." }, 
                                   { name :"Abbey Laith","height":"5’4″","weight":"125 lbs." }, 
                                   { name :"Abdullah the Butcher","height":"6’0″","weight":"360 lbs." },
                                   { name :"John Cena","height":"6’1″","weight":"251 lbs." }])
                
                -> [{ name :"John Cena","height":"6’1″","weight":"251 lbs." },
                    { name :"2 Cold Scorpio","height":"5’11”","weight":"229 lbs." },
                    { name :"John Cena","height":"6’1″","weight":"251 lbs." }]    
            
*/

function wweChampionsStats(array1, array2) {
    return array1.map((element) => {
        return pullOutWrestlerStat(element.name, array2)
    })
}

const wweChampionsStatsResults = wweChampionsStats(wweChampions, wrestlerStats)
console.log(wweChampionsStatsResults)

/*
String Array -> object
check-expect    pullOutWrestlerStat("John Cena", wrestlerStats) -> 
                { name :"John Cena","height":"6’1″","weight":"251 lbs." }
*/
function pullOutWrestlerStat(wrestler, array) {
    return array.find(element => element.name === wrestler )
}




