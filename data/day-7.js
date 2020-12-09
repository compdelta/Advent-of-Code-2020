let data = document.querySelector("pre").textContent
const dataArray = data.split("\n")
// Removing empty element from end of array (appears due to un-needed '\n' at end of data):
dataArray.length = dataArray.length-1
// So we've got 594 total elements with our data set.


// Part 1

let stringSplitTemp = [];
let bagColours = [];
let bagColourSum = 0;

// I'm going to do this in 2 sections. First, I need to find the bags that can directly hold "shiny gold" bags.
// I add these to the 'bagColours' array. Here's the loop for that:

for (i = 0; i < dataArray.length; i++) {
    stringSplitTemp = dataArray[i].split("contain ")
    if (stringSplitTemp[1].includes("shiny gold")) {
        bagColours.push(stringSplitTemp[0].replace(" bags ",""))
    }
}

// Second, I need to loop through the data array again, looking for any bags that can hold the bags
// listed in the bagColours array, and adding those to the bagColours array. The trouble is,
// for each new colour added, that's another search that needs to be done to find bags that
// can hold THAT colour, and so on and so forth. So I need to 2 do things here:
// 1. Introduce a check to ensure I'm not adding the same colours repeatedly to the array on each loop, and
// 2. Construct a 'while' loop, so that the array loop only repeats for as long as it's actually adding
// new colours. Once it stops adding new colours, the looping can end.
// For 1., I use 'indexOf' to check the bagColours array contents against the colour in the string.
// For 2., I set a variable to the length of the bagColours array, and have the while loop continue
// until those 2 values are the same (i.e. until nothing new has been added to it during the loop).

let colourArrayLength = 0;

while (colourArrayLength != bagColours.length) {
    colourArrayLength = bagColours.length;
    for (i = 0; i < dataArray.length; i++) {
        stringSplitTemp = dataArray[i].split("contain ")
        for (j = 0; j < bagColours.length; j++) {
            if ((stringSplitTemp[1].includes(bagColours[j])) && (bagColours.indexOf(stringSplitTemp[0].replace(" bags ",""))==-1)) {
                bagColours.push(stringSplitTemp[0].replace(" bags ",""));
            }
        }
    }
}

console.log(bagColours.length)


// I gave up on part 2 this time! May return to.