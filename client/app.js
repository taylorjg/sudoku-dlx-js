import solve from './dlxlib/dlx'; 

const matrix1 = [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1]
];
const solutions1 = solve(matrix1);
console.log(`solutions1: ${JSON.stringify(solutions1)}`);

const matrix2 = [
    [1, 0, 0, 0],
    [0, 1, 1, 0],
    [1, 0, 0, 1],
    [0, 0, 1, 1],
    [0, 1, 0, 0],
    [0, 0, 1, 0]
];
const solutions2 = solve(matrix2);
console.log(`solutions2: ${JSON.stringify(solutions2)}`);
