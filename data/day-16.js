// Executing in browser console on data page

const data = document.querySelector("pre").textContent

// Part 1
// 
// Check validity of all 'nearby tickets' & return ticket scanning error rate
// (being sum of all invalid values). So need to have ticket details & valid ranges
// in workable format for a start.

// Create array just containing the 'nearby tickets' data:
let ticketsArray = data.split("tickets:\n")[1].split("\n")
// Empty final entry due to extra line break at end, trim off:
ticketsArray.length--
// Then break each ticket into a sub-array within new array 'tickets':
let tickets = []

for (let i=0; i < ticketsArray.length; i++) {
    tickets.push(ticketsArray[i].split(","))
}

// We also need to extract our valid data ranges from provided notes.

let notesArray = data.split("your ticket")[0].replace(/[a-z]|:/g, "").replace(/^\s+|\s+$/g, "").replace(/\s{2,}/g, " ").split(" ")

// We need to check all ticket values against ranges, and sum all
// invalid values to produce 'ticket scanning error rate'.
// RegExp doesn't let us check value ranges (or not easily, at least)
// so we'll have to manually compare entries to ranges.

let errorRate = 0
let checkLength = 0;
let ticketValue = 0;
let low1 = 0;
let high1 = 0;
let low2 = 0;
let high2 = 0;

for (let i = 0; i < tickets.length; i++) {
    for (let j = 0; j < tickets[i].length; j++) {
        ticketValue = parseInt(tickets[i][j])
        checkLength = 0;
        for (let k = 0; k < notesArray.length; k = k+2) {
            low1 = parseInt(notesArray[k].split("-")[0])
            high1 = parseInt(notesArray[k].split("-")[1])
            low2 = parseInt(notesArray[k+1].split("-")[0])
            high2 = parseInt(notesArray[k+1].split("-")[1])
            if ((ticketValue < low1 || ticketValue > high1) && (ticketValue < low2 || ticketValue > high2)) {
                checkLength++;
            }
            if (checkLength == (notesArray.length / 2)) {
                errorRate = errorRate + ticketValue
            }
        }
    }
}

console.log(errorRate)


// Part 2

// To start, we need a new array made up only of valid tickets, i.e.,
// an array that ditches all the tickets we found to be invalid in part 1.
// So I'll tweak & re-use part of Part 1 to accomplish that, creating an array
// of invalid ticket index numbers, and a new array of valid ticket numbers
// working from that.

let validArray = []
let invalidIndexes = []

for (let i = 0; i < tickets.length; i++) {
    for (let j = 0; j < tickets[i].length; j++) {
        ticketValue = parseInt(tickets[i][j])
        checkLength = 0;
        for (let k = 0; k < notesArray.length; k = k+2) {
            low1 = parseInt(notesArray[k].split("-")[0])
            high1 = parseInt(notesArray[k].split("-")[1])
            low2 = parseInt(notesArray[k+1].split("-")[0])
            high2 = parseInt(notesArray[k+1].split("-")[1])
            if ((ticketValue < low1 || ticketValue > high1) && (ticketValue < low2 || ticketValue > high2)) {
                checkLength++;
            }
            if (checkLength == (notesArray.length / 2)) {
                if (!invalidIndexes.includes(i)) {
                    invalidIndexes.push(i)
                }
            }
        }
    }
}

for (let i = 0; i < tickets.length; i++) {
    if (!invalidIndexes.includes(i)) {
        validArray.push(tickets[i])
    }
}

console.log(validArray)


// That's as far as I've gotten with this one. Only 1x star today.