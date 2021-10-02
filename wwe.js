wweChampions = require("./data/wweChampions.js").wweChampions
wrestlerStats = require("./data/wrestlerHeightAndWeight.js").wrestlerHeightAndWeight

// ===================
// Cleaning the data
// ===================

/*
Object Array -> Array
Check any undefined values

check-expect    undefinedValues([{ name: "John Cena"}, {name: "Hon Boey"}], 
                                [{ name :"2 Cold Scorpio","height":"5’11”","weight":"229 lbs." }, 
                                 { name :"Abbey Laith","height":"5’4″","weight":"125 lbs." }, 
                                 { name :"Abdullah the Butcher","height":"6’0″","weight":"360 lbs." },
                                 { name :"John Cena","height":"6’1″","weight":"251 lbs." }])
                ->  { name: "Hon Boey" }                  
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
Does this string exist in the array?
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

// ======================
// Getting the data
// ======================

/* 
Array Array -> Array
Find the values of an array in a corresponding array

check-expect    [{ name: "John Cena" }],
                [{ name :"2 Cold Scorpio","height":"5’11”","weight":"229 lbs." }, 
                 { name :"Abbey Laith","height":"5’4″","weight":"125 lbs." }, 
                 { name :"Abdullah the Butcher","height":"6’0″","weight":"360 lbs." },
                 { name :"John Cena","height":"6’1″","weight":"251 lbs." }]
                
                -> [{ name :"John Cena","height":"6’1″","weight":"251 lbs." }]

check-expect    [{ name: "John Cena" }, 
                 { name: "2 Cold Scorpio" }],
                [{ name :"2 Cold Scorpio","height":"5’11”","weight":"229 lbs." }, 
                 { name :"Abbey Laith","height":"5’4″","weight":"125 lbs." }, 
                 { name :"Abdullah the Butcher","height":"6’0″","weight":"360 lbs." },
                 { name :"John Cena","height":"6’1″","weight":"251 lbs." }]
                
                -> [{ name :"John Cena","height":"6’1″","weight":"251 lbs." },
                    { name :"2 Cold Scorpio","height":"5’11”","weight":"229 lbs." }]

check-expect    [{ name: "John Cena" }, 
                 { name: "2 Cold Scorpio" }, 
                 { name:"John Cena" }],
                [{ name :"2 Cold Scorpio","height":"5’11”","weight":"229 lbs." }, 
                 { name :"Abbey Laith","height":"5’4″","weight":"125 lbs." }, 
                 { name :"Abdullah the Butcher","height":"6’0″","weight":"360 lbs." },
                 { name :"John Cena","height":"6’1″","weight":"251 lbs." }]
                
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




