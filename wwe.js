
wweChampions = require("./data/wweChampions.js").wweChampions
wrestlerStats = require("./data/wrestlerHeightAndWeight.js").wrestlerHeightAndWeight
wrestlerDob = require("./data/wrestlerDob.js").wrestlerDob


// =======================
// Cleaning the data
// =======================

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

// undefinedValues(wweChampions, wrestlerDob)

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

// Format date in wrestlerDob
wrestlerDob = wrestlerDob.map(element => {
    return {
        name: element.name,
        dob: new Date(element.day + " " + element.year)
    }
})

console.dir(wrestlerDob,{'maxArrayLength': null})

// =======================

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

// Array -> Number
// Change height value to inches
// check-expect convertToInches([5,10]) -> (5*12 + 10)
// check-expect convertToInches([5,0])  -> (5*12 + 0)
function convertToInches(array) {
    return array[0] * 12 + array[1]
}


// =======================
// Creating the list
// =======================

// Array Array -> Array
// Input 2 arrays and output an array of the combined matching objects
// check-expect mergeArrays([{a:"Hon", b:2, c:3}, {a:"Hannah", b:2, c:3}], [{a:"Xav", d:4}, {a:"Ang", d:4}, {a:"Hon", d:4}, {a:"Hannah", d:4}])
//              -> [{a:"Hon", b:2, c:3, d:4}, {a:"Hannah", b:2, c:3, d:4}]
function mergeArrays(array1, array2) {
    // Get the element, find the corresponding object then merge
    return array1.map(element => {
        return Object.assign(element, pullOutWrestlerStat(element.name, array2))  
    })
}
let wweChampionsStats = mergeArrays(wweChampions, wrestlerStats)

// String Array -> object
// check-expect    pullOutWrestlerStat("John Cena", wrestlerStats) -> 
//                 { name :"John Cena","height":"6’1″","weight":"251 lbs." }
function pullOutWrestlerStat(wrestler, array) {
    return array.find(element => element.name === wrestler )
}

// =======================
// Drawing out the info
// =======================

// Array -> Array
// Create an array of all weight values
function createArrayOfWeights(array) {
    return array.map(element => element.weight).filter(Number)
}
let arrayOfWeights = createArrayOfWeights(wweChampionsStats)

// Array -> Number 
// Find total sum of an array of numbers
function findTotalSum(array) {
    return array.reduce((pV, cV) => {
        return pV + cV
    }) 
}

// Array -> Number
// Find average of an array of numbers
function findAverage(array) {
    return findTotalSum(array) / array.length
}
// console.log(findAverage(arrayOfWeights))
// console.dir(wweChampionsStats, {'maxArrayLength': null})