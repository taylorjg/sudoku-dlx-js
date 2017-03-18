import solve from './dlxlib/dlx';

const matrix1 = [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1]
];

const matrix2 = [
    [1, 0, 0, 0],
    [0, 1, 1, 0],
    [1, 0, 0, 1],
    [0, 0, 1, 1],
    [0, 1, 0, 0],
    [0, 0, 1, 0]
];

const showAllSolutions = matrix => {
    console.log(`solutions to ${JSON.stringify(matrix)}:`);
    for (const solution of solve(matrix)) {
        console.log(`\tsolution: ${JSON.stringify(solution)}`);
    }
};

showAllSolutions(matrix1);
showAllSolutions(matrix2);
