let problem = "5*(2+0)^2-20";

function printClicked ( e ) {
    problem += e;
    document.getElementById ("prob").innerHTML = problem;
}

function deleteChar () {
    problem = problem.slice (0, problem.length - 1);
    document.getElementById ("prob").innerHTML = problem;
}

function solve () {
    let exp = [];
    let arr=[];
    problem = problem.split('');
    for (let i = 0; i < problem.length; i++) {
        arr.push( problem[i]);
        if(problem[i] ===')')
        {   arr.pop();
            let poped = arr.pop();
            while(poped !=="(") {
                exp.push( poped);
                poped = arr.pop ();
            }
            arr.push(solveInsideBrackets(exp.reverse().join('')));
        }
    }
    problem = solveInsideBrackets(arr.join('')).toString();
    document.getElementById ("prob").innerHTML = problem;

}

function solveInsideBrackets ( exp ) {
    let isNegative= false;
    if(exp[0]==='-')
    {
        isNegative=true;
        exp=exp.slice(1,exp.length)
    }
    let nums = exp.split('*').join('_').split('/').join('_').
        split('-').join('_').split('+').join('_').
            split('^').join('_').split('%').join('_').split('_');
    let operations=exp.split(/[0.0-9]/).join("").split("");
    if(isNegative)
        nums[0]="-" +nums[0];

    if(isNaN(Number(nums[0]))|| isNaN(Number(nums[nums.length-1])) || ( operations[0]!=="" && nums.length-1 !== operations.length))
    {
       return false;
    }
    let newNums =[];
    let newOperations = [];
    let previousWasReplaced =false;
    for (let i = operations.length -1, j=0; i >= 0 ; i--) {
        if (operations[i] === '^') {
            if (previousWasReplaced) {
                newNums[j - 1] = Math.pow( Number(nums[i]),newNums[j - 1]);

            }
            else {
                newNums[j] = Math.pow( Number(nums[i ]),Number(nums[i+1]));
                j++;
            }
            previousWasReplaced = true;
        }
        else
        {
            newOperations.push(operations[i]);
            if(!previousWasReplaced) {
                newNums.push (nums[i+1]);
                j++;
            }
            if(i===0)
            {
                newNums.push(nums[i]);
            }
            previousWasReplaced = false;
        }
    }

    nums = newNums.reverse();
    newNums = [];
    operations = newOperations.reverse();
    newOperations = [];
    for (let i = 0, j=0; i <operations.length ; i++) {

        if (operations[i]==='%')
        {
            if (previousWasReplaced)
            {
                newNums[j-1] = newNums[j-1]%nums[i+1];

            }
            else {
                newNums[j] = nums[i] % nums[i + 1];
                j++;
            }
            previousWasReplaced = true;
        }
        else if (operations[i]==='*')
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
