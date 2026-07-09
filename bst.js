function Node(data, left, right) {
    return { data, left, right }
}

function Tree(arr) {
    // Sort and remove duplicates
    arr = [...new Set(arr)].sort((a, b) => a - b);

    function buildTree(arr) {
        // Base case
        if (arr.length === 1) return Node(arr[0]);
        if (arr.length === 0) return; 

        const start = 0;
        const end = arr.length - 1;
        const mid = Math.round((start + end) / 2);

        // Split array in two
        const leftArr = arr.slice(start, mid);
        const rightArr = arr.slice(mid+1, arr.length);

        // Recursive call for each subarray
        const leftSubTree = buildTree(leftArr);
        const rightSubTree = buildTree(rightArr);

        const tree = Node(arr[mid], leftSubTree, rightSubTree);

        return tree;
    }

    const root = buildTree(arr);
    return { root }
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null || node === undefined) {
    return;
  }

  prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
}

// const testArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// const testTree = Tree(testArr);
// prettyPrint(testTree.root);