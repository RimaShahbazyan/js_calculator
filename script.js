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
solveInsideBrackets(problem);
}

function solveInsideBrackets ( exp ) {
    let nums = exp.split('*').join('_').split('/').join('_').
        split('-').join('_').split('+').join('_').
            split('^').join('_').split('%').join('_').split('_');
    let operations=exp.split(/[1.0-9]/).join("").split("");

    if(isNaN(Number(nums[0]))|| isNaN(Number(nums[length-1])))
    {
        return false;
    }
    let newNums =[];
    let newOperations = [];
    let previousWasReplaced =false;
    for (let i = 0; i <operations.length ; i++) {
        let j=0;

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
                newNums.push (nums[i - 1]);
            }
            previousWasReplaced = false;
        }
    }
    alert(nums);
    alert(operations);

}
