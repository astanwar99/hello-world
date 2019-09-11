var rect = require('./rectangle')

function solveRect(l, b) {
    console.log("l = " + l + ", b = " + b);

    if(l <= 0 || b <= 0) {
        console.log("Invalid input");
    }else {
        console.log("area: " + rect.area(l, b));
        console.log("peri: " + rect.perimeter(l, b));
    }
}

solveRect(3, 4);
solveRect(3, 0);