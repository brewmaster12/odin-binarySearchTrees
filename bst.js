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
            node = value < node.data ? node.left : node.right;
        }
        return false;
    }

    function insert(value) {
        function insertNode(node, value) {
            if (node === undefined) return Node(value);
            if (value === node.data) return node;
            if (value < node.data) {
                node.left = insertNode(node.left, value);
            } else {
                node.right = insertNode(node.right, value);
            }
            return node;
        }
        root = insertNode(root, value);
    }

    function deleteItem(value) {
        function findMin(node) {
            while (node.left !== undefined) node = node.left;
            return node;
        }

        function deleteNode(node, value) {
            if (node === undefined) return undefined;

            if (value < node.data) {
                node.left = deleteNode(node.left, value);
            } else if (value > node.data) {
                node.right = deleteNode(node.right, value);
            } else {
                // Found node to delete
                if (node.left === undefined) return node.right;
                if (node.right === undefined) return node.left;

                // Replace children
                const successor = findMin(node.right);
                node.data = successor.data;
                node.right = deleteNode(node.right, successor.data);
            }
            return node;
        }

        root = deleteNode(root, value);
    }

    function levelOrderForEach(callback) {
        if (typeof callback !== "function") {
            throw new Error("A callback function is required");
        }
        if (root === undefined) return;

        const queue = [root];
        while (queue.length > 0) {
            const node = queue.shift();
            callback(node.data);
            if (node.left !== undefined) queue.push(node.left);
            if (node.right !== undefined) queue.push(node.right);
        }
    }

    function inOrderForEach(callback) {
        if (typeof callback !== "function") {
            throw new Error("A callbakc function is required");
        }
        function traverse(node) {
            if (node === undefined) return;
            traverse(node.left);
            callback(node.data);
            traverse(node.right);
        }
        traverse(root);
    }

    function preOrderForEach(callback) {
        if (typeof callback !== "function") {
            throw new Error("A callbakc function is required");
        }
        function traverse(node) {
            if (node === undefined) return;
            callback(node.data);
            traverse(node.left);
            traverse(node.right);
        }
        traverse(root);
    }

    function postOrderForEach(callback) {
        if (typeof callback !== "function") {
            throw new Error("A callbakc function is required");
        }
        function traverse(node) {
            if (node === undefined) return;
            traverse(node.left);
            traverse(node.right);
            callback(node.data);
        }
        traverse(root);
    }

    function findNode(value) {
        let node = root;
        while (node !== undefined) {
            if (node.data === value) return node;
            node = value < node.data ? node.left : node.right;
        }
        return null;
    }

    function height(value) {
        const node = findNode(value);
        if (node === undefined) return undefined;
        return heightOfNode(node);

        function heightOfNode(node) {
            if (node === undefined) return -1;
            return 1 + Math.max(heightOfNode(node.left), heightOfNode(node.right));
        }
    }

    function depth(value) {
        let node = root;
        let edges = 0;
        while (node !== undefined) {
            if (node.data === value) return edges;
            node = value < node.data ? node.left : node.right;
            edges++;
        }
        return undefined;
    }

    function isBalanced() {
        function checkHeight(node) {
            if (node === undefined) return -1;

            const leftHeight = checkHeight(node.left);
            if (leftHeight === -Infinity) return -Infinity;

            const rightHeight = checkHeight(node.right);
            if (rightHeight === -Infinity) return -Infinity;

            if (Math.abs(leftHeight - rightHeight) > 1) return -Infinity;

            return 1 + Math.max(leftHeight, rightHeight);
        }
        return checkHeight(root) !== -Infinity;
    }
    

    return { root, includes, insert }
}


// Taken from assignment notes
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