// Executing all within browser console on data page.

let data = document.querySelector("pre").textContent;
const dataArray = data.split("\n")
// There's an extra empty entry at the end because of a line-break, so snip that:
dataArray.length--

// Part 1
// Starting at the 26th value, I'll iterate over the previous 25 values
// in multiple passes to check whether any of them add up to the 26th value.
// For each failed combination, I'll add one to a 'checkCount' variable.
// There are a maximum of 300 different 2-number combinations of 25 numbers,
// so if checkCount == 300 at the end of all passes, the starting value is
// the 'invalid number' we're seeking.

let checkCount = 0;

for (let i = 25; i < dataArray.length; i++) {
    checkCount = 0;
    for (j = (i - 25); j < i; j++) {
        for (k = (j + 1); k < i; k++) {
            if ((parseInt(dataArray[j]) + parseInt(dataArray[k])) != parseInt(dataArray[i])) {
                checkCount++;
            }
        }
    }
    if (checkCount == 300) {
        console.log(dataArray[i])
    }
}

// Part 2
//
// I need to check all possible contiguous combinations of numbers to see
// if any add up to the invalid number from Part 1 (556543474, in my case).
// Once this range is found, I need to add the SMALLEST and LARGEST NUMBER in 
// that range, result being the 'encryption weakness' we seek.
// I'll do this by iterating over the data array, combining values & keeping
// track of the range start & end indexes, which - once we hit upon the correct
// range - I can then use to figure out our answer.

let invalidNumber = 556543474
let rangeStartIndex = 0;
let rangeEndIndex = 0;
let sum = 0;

for (let i = 0; i < dataArray.length; i++) {
    sum = 0;
    rangeStartIndex = i;
    sum = sum + parseInt(dataArray[i])
    for (let j = i + 1; j < dataArray.length; j++) {
        rangeEndIndex = j;
        sum = sum + parseInt(dataArray[j]);
        if (sum == invalidNumber) {
            console.log(`Range start index = ${rangeStartIndex} which is ${dataArray[rangeStartIndex]}`)
            console.log(`Range end index = ${rangeEndIndex} which is ${dataArray[rangeEndIndex]}`)
            let rangeArray = dataArray.slice(rangeStartIndex, rangeEndIndex);
            rangeArray.sort(function(a, b){return a-b});
            console.log(`Lowest value: ${rangeArray[0]}`)
            console.log(`Highest value: ${rangeArray[rangeArray.length-1]}`)
            console.log(`Encryption weakness (sum) = ${(parseInt(rangeArray[0]) + parseInt(rangeArray[rangeArray.length-1]))}`)
        }
    }
}