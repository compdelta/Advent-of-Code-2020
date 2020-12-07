// Executing all of this within browser console on puzzle input page.

let data = document.querySelector("pre").textContent
const dataArray = data.replace(/\n/g,",").replace(/,,/g,"\n").split("\n")


// Part 1
// Okay, basically need to count number of unique alphanumeric characters in each entry.

var unique = "";
let groupCount = 0;
let sum = 0;

for (let i = 0; i < dataArray.length; i++) {
    for (let j = 0; j < dataArray[i].length; j++) {
        if (dataArray[i][j] != ",") {
            if(unique.indexOf(dataArray[i].charAt(j))==-1) {
                unique += dataArray[i][j];
            }
        }

    }
    groupCount = unique.length;
    sum = sum + groupCount;
    unique = "";
}

console.log(sum)


// Part 2
// Need to check if occurrences of a particular character match the number of groups in the entry.
// If so, record count of such characters, and return sum of all.

let numOfGroups = 1;
let charCount = {};
let everyoneCount = [];
let finalSum = 0;

for (let i = 0; i < dataArray.length; i++) {
    // Variable to reset at the start of each loop:
    numOfGroups = 1;
    charCount = {}
    everyoneCount = []
    // First I figure out how many groups are in the entry, based on number of comma separators in string:
    for (let j = 0; j < dataArray[i].length; j++) {
        if (dataArray[i].charAt(j) == ",") {
        // if (dataArray[i][j] == ",") {
            numOfGroups++;
            }
        }
    // Then I add to the 'charCount' object a note of how many times each character appears in the entry:
        charCount = [...dataArray[i]].reduce((result, nextChar) => { 
            result[nextChar] = result[nextChar] ? result[nextChar] + 1 : 1; 
            return result 
        }, {});
    // I then scan through the object, using Object.entries, and any entry with a value matching
    // the number of groups (i.e. it appears in every person's response) gets added to an array.
        for (var [letter, count] of Object.entries(charCount)) {
            if ((count===numOfGroups) && (letter != ",")) {
                everyoneCount.push(letter)
            }
        }

    // And the length value of that array (i.e. the 'everyone' count from that group) gets added to the sum.
        finalSum = finalSum + everyoneCount.length;
    }
    console.log(finalSum)