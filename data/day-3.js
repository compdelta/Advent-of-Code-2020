// Executing all of this within browser console on puzzle input page.

let data = document.querySelector("pre").textContent
const mapArray = data.split("\n")

// This was my Part 1 solution, but actually the re-jigged 'treeCalc' function in
// Part 2 does the same thing without rigid values being required...

let right = 3;
let treeCount = 0;

for (let i = 1; i < mapArray.length; i++) {
    
    if (mapArray[i][right] == "#") {
        treeCount++;
    }

    right +=3;
    if (right > 30) {
        right = right - 31;
    }
}

console.log(treeCount);


// Part Two solution:

function treeCalc(right, down) {

    let treeCount = 0;
    let rightValue = right;

    for (let i = down; i < mapArray.length; i = i + down) {
    
        if (mapArray[i][rightValue] == "#") {
            treeCount++;
        }
        
        rightValue = rightValue + right;
        if (rightValue > 30) {
            rightValue = rightValue - 31;
        }
    }

    return(treeCount)
}


function partTwo() {
    // This is for producing the final value required as part of the challenge,
    // by running several variants & multiplying the results of each.
    let fig1 = treeCalc(1,1);
    let fig2 = treeCalc(3,1);
    let fig3 = treeCalc(5,1);
    let fig4 = treeCalc(7,1);
    let fig5 = treeCalc(1,2);

    console.log(fig1*fig2*fig3*fig4*fig5)
}

partTwo()