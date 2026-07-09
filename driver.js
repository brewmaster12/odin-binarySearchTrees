import { Tree } from "./bst.js";

// From assignment notes
const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null || node === undefined) {
    return;
  }

  prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
}

function randomArray(length = 15, max = 100) {
    return Array.from({ length }, () => Math.floor(Math.random() * max));
}

function printTraversals(tree) {
    const level = [];
    const pre = [];
    const post = [];
    const inOrd = [];
    tree.levelOrderForEach((v) => level.push(v));
    tree.preOrderForEach((v) => pre.push(v));
    tree.postOrderForEach((v) => post.push(v));
    tree.inOrderForEach((v) => inOrd.push(v));
 
    console.log('Level order:', level);
    console.log('Pre order:  ', pre);
    console.log('Post order: ', post);
    console.log('In order:   ', inOrd);
}


// 1. Build a BST from random numbers < 100
const tree = Tree(randomArray(15, 100));
console.log('Initial tree:');
prettyPrint(tree.root);
 
// 2. Confirm it's balanced
console.log('\nIs balanced?', tree.isBalanced());
 
// 3. Print all traversal orders
console.log('\nTraversals:');
printTraversals(tree);
 
// 4. Unbalance it with values > 100
console.log('\nInserting values > 100 to unbalance the tree...');
[150, 200, 175, 300, 250].forEach((value) => tree.insert(value));
prettyPrint(tree.root);
 
// 5. Confirm it's now unbalanced
console.log('\nIs balanced?', tree.isBalanced());
 
// 6. Rebalance
console.log('\nRebalancing...');
tree.rebalance();
prettyPrint(tree.root);
 
// 7. Confirm it's balanced again
console.log('\nIs balanced?', tree.isBalanced());
 
// 8. Print all traversal orders again
console.log('\nTraversals after rebalancing:');
printTraversals(tree);
