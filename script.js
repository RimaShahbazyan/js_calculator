let problem = "";

function printClicked ( e ) {
    problem += e;
    document.getElementById ("prob").innerHTML = problem;
}

function deleteChar () {
    problem = problem.slice (0, problem.length - 1);
    document.getElementById ("prob").innerHTML = problem;
}

function solve () {

    document.getElementById ("prob").innerHTML = solveInsideBrackets(problem);
    problem="";
}

function solveInsideBrackets ( exp ) {
    let nums = exp.split('*').join('_').split('/').join('_').
        split('-').join('_').split('+').join('_').
            split('^').join('_').split('%').join('_').split('_');
    let operations=exp.split(/[1.0-9]/).join("").split("");

    if(isNaN(Number(nums[0]))|| isNaN(Number(nums[nums.length-1])) || nums.length-1 !== operations.length)
    {
       return false;
    }
    let newNums =[];
    let newOperations = [];
    let previousWasReplaced =false;
    for (let i = 0, j=0; i <operations.length ; i++) {


        if (operations[i]==='*')
        {
            if (previousWasReplaced)
            {
                newNums[j-1] = newNums[j-1]*nums[i+1];

            }
            else {
                newNums[j] = nums[i] * nums[i + 1];
                j++;
            }
            previousWasReplaced = true;
        }
        else if (operations[i]==='/')
        {
            if (previousWasReplaced)
            {
                newNums[j-1] = newNums[j-1]/nums[i+1];

            }
            else {
                newNums[j] = nums[i] / nums[i + 1];
                j++;
            }
            previousWasReplaced = true;
        }
        else
        {
            newOperations.push(operations[i]);
            if(!previousWasReplaced) {
                newNums.push (nums[i]);
                j++;
            }
            previousWasReplaced = false;
        }
    }
    if(!previousWasReplaced)
    {
        newNums.push (nums[nums.length-1]);
    }
    let result = Number(newNums[0]);
    for (let i = 0; i < newOperations.length ; i++) {

        if (newOperations[i]==='+')
        {
            result += Number(newNums[i+1]);
        }
        else if (newOperations[i]==='-')
        {
           result -= newNums[i+1];
        }
    }
    return result;

}
