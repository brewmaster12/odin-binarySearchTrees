function Node(data, left, right) {
    return { data, left, right }
}

function Tree(arr) {
    // Sort and remove duplicates
    arr = [...new Set(arr)].sort((a, b) => a - b);

    const root = buildTree(arr);

    // Private method
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

    function includes(value) {
        let node = root;
        while (node !== undefined) {
            if (node.data === value) return true;
            else if (value < node.data) node = node.left;
            else node = node.right;
        }
        return false;
    }

    return { root, includes }
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null || node === undefined) {
    return;
  }

  prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
}

// const testArr = [16, 456, 6254, 6542, 78, 74, 22, 565, 1, 1, 1, 4, 5, 6, 7, 89, 9, 4];
// const testTree = Tree(testArr);
// prettyPrint(testTree.root);