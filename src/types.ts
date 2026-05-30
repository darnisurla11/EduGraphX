/**
 * Type declarations and educational dataset for the High-End CS Infographic System
 * Created by Surla Darni Sree (Intern @ Indian Servers, Raghu Engineering College)
 */

export interface ConceptBlock {
  beginner: string;
  intermediate: string;
  advanced: string;
  expert: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  id: string;
}

export interface VivaQuestion {
  question: string;
  answer: string;
  expectedKeywords: string[];
  id: string;
}

export interface RealWorldAnalogy {
  title: string;
  analogy: string;
  whyItFits: string;
}

export interface MythVsFact {
  myth: string;
  fact: string;
}

export interface SubtopicMetadata {
  id: string;
  title: string;
  subtitle: string;
  iconName: string;
  colorTheme: {
    primary: string;
    secondary: string;
    glow: string;
    badge: string;
    lightBg: string;
    border: string;
  };
  overview: string;
  curriculumHierarchy: string[];
  hiddenConcepts: string[];
  visualFlowSteps: string[];
  formulasAndComplexity: {
    label: string;
    formula: string;
    notation: string;
    explanation: string;
  }[];
  comparisons: {
    entityA: string;
    entityB: string;
    criteria: string;
    winner: string;
  }[];
  commonMistakes: string[];
  bestPractices: string[];
  futureResearch: string;
  mythVsFact: MythVsFact[];
  realWorldAnalogies: RealWorldAnalogy[];
  faqs: FAQItem[];
  vivaQuestions: VivaQuestion[];
  conceptBlock: ConceptBlock;
  technicalCodeBlock: string;
}

export const CSInfographicsDataset: SubtopicMetadata[] = [
  {
    id: "stack-visualized",
    title: "1. Stack Operations Visualized",
    subtitle: "LIFO (Last In First Out) Memory Architecture",
    iconName: "Layers",
    colorTheme: {
      primary: "bg-[#3b82f6] text-white",
      secondary: "text-[#3b82f6]",
      glow: "rgba(59, 130, 246, 0.4)",
      badge: "bg-blue-500/10 text-[#60a5fa] border-blue-500/20",
      lightBg: "bg-[#0b1329]",
      border: "border-blue-500/30",
    },
    overview: "An abstract data type serving as a collection of elements with two principal operations: Push, which adds an element to the collection, and Pop, which removes the most recently added element.",
    curriculumHierarchy: [
      "Beginner: Simple Array/List implementation of a Stack.",
      "Intermediate: Dynamic resizing, LinkedList-backed stacks, Stack Pointer calculations.",
      "Advanced: Processor-level Activation Records & Hardware call stack layouts (ESP/RSP registers).",
      "Expert Insights: Memory exhaustion safety, thread stacks, zero-overhead stack allocations, escape analysis."
    ],
    hiddenConcepts: [
      "Hardware Alignment: On actual CPUs, registers like ESP/RSP hold 64-bit addresses, and the stack typically grows downward from high memory to low memory.",
      "Activation Frame Layout: Pushing stack parameters, return addresses, saved frame pointers (EBP), and local variables creates the actual activation record.",
      "Zero-overhead stack allocation: Languages like Go/Rust allocate variables on the stack if they do not escape the scope, eliminating GC pressure entirely."
    ],
    visualFlowSteps: [
      "EMPTY STATE: Stack Pointer (SP) initializes to -1 (or bottom address). Frame bounds are set.",
      "PUSH OPERATION: SP increments first. The new element is written exactly at array[SP]. Checked against MAX_SIZE.",
      "PEEK OPERATION: Read array[SP] selectively without decrementing or altering SP.",
      "POP OPERATION: Item at array[SP] is returned. SP decrements. Slot is marked empty/garbage collected.",
      "OVERFLOW EXCEPTION: Check SP >= MAX_SIZE - 1. Recursion or execution halts to prevent security stack smashing."
    ],
    formulasAndComplexity: [
      {
        label: "Push Time Complexity",
        formula: "O(1)",
        notation: "Constant Time",
        explanation: "Pushes operate at the top index without resetting existing elements."
      },
      {
        label: "Pop Time Complexity",
        formula: "O(1)",
        notation: "Constant Time",
        explanation: "Pulls the top item instantly by reading and lowering the stack pointer."
      },
      {
        label: "Space Complexity",
        formula: "O(N)",
        notation: "Linear Space",
        explanation: "Requires memory proportional to the maximum number of active elements stored."
      }
    ],
    comparisons: [
      {
        criteria: "Search Access",
        entityA: "Stack LIFO Structure",
        entityB: "Array Linear Search",
        winner: "Array Search: Stack bounds restrict mid-element access, requiring O(N) popping cycles."
      },
      {
        criteria: "Memory Performance",
        entityA: "Stack Frame Allocation",
        entityB: "Heap Dynamic Allocation",
        winner: "Stack Allocation: Local frames have strict deterministic lifespans solved at high clock speed with NO GC."
      }
    ],
    commonMistakes: [
      "Off-By-One Index Boundaries: Forgetting that SP starting at -1 means SP == MAX_SIZE - 1 results in overflow.",
      "Memory Leak in Custom Stacks: Leaving references to popped objects in the array index, preventing garbage collection.",
      "Infinite Recursion Crash: Stack Overflow caused by a missing base condition in recursive algorithms."
    ],
    bestPractices: [
      "Pre-allocate capacity if maximum stack depth is known to avoid run-time copies.",
      "Shield stack buffers using canary values or safety shields to prevent stack-smashing security vulnerabilities.",
      "Verify recursive functions have simple proof of termination under all runtime contexts."
    ],
    futureResearch: "Hardware-enforced Shadow Stacks to detect and drop return-oriented programming (ROP) cyber exploits dynamically in CPU pipelines.",
    mythVsFact: [
      {
        myth: "The stack is always stored in a physically separate memory hardware chip.",
        fact: "The stack resides inside general RAM. The CPU tracks it purely via register pointers (ESP/RSP)."
      },
      {
        myth: "A stack overflow can only happen during infinite recursion.",
        fact: "It can also be triggered by allocating giant arrays or local variables on the call stack instead of the heap."
      }
    ],
    realWorldAnalogies: [
      {
        title: "The Stack of Clean Dinner Plates",
        analogy: "You wash plate A, B, and then C. C is placed on top of B, which sits on A. When serving, you must pick C first.",
        whyItFits: "It presents LIFO physically. Pulling plate A from the bottom without lifting top plates ruins stability."
      },
      {
        title: "Browser Back/Forward Nav History",
        analogy: "Visiting Home -> Shop -> Item. 'Shop' is pushed on top of 'Home'. Clicking back Pops 'Item' off to show 'Shop'.",
        whyItFits: "Tracks history in strict linear backtracking order effortlessly."
      }
    ],
    faqs: [
      {
        id: "s_faq_1",
        question: "What is the difference between Stack Overflow and Stack Underflow?",
        answer: "Stack Overflow occurs when pushing an item to an already full stack (SP >= Limit). Underflow occurs when popping an empty stack (SP == -1), both resulting in system halt or crash."
      },
      {
        id: "s_faq_2",
        question: "How is Stack used in Undo/Redo mechanisms?",
        answer: "Two stacks are maintained: 'Undo Stack' and 'Redo Stack'. Pushing movements onto the Undo stack lets you step back. Popping off Undo pushes the item onto Redo, enabling complete bidirectional states."
      }
    ],
    vivaQuestions: [
      {
        id: "s_viva_1",
        question: "Explain Dijkstra's Shunting-Yard Algorithm and which data structure powers it.",
        answer: "It parses mathematical infix strings to postfix notation. It is powered by an Operator Stack to hold operations while obeying operator precedence.",
        expectedKeywords: ["Operator Stack", "Precedence", "Infix to Postfix"]
      },
      {
        id: "s_viva_2",
        question: "Why is stack memory allocation much faster than heap memory allocation?",
        answer: "Stack allocation simply requires shifting the stack pointer register instruction (one instruction). Heap allocation needs locating variable chunks, sweeping, merging fragments, and garbage collection.",
        expectedKeywords: ["Stack Pointer", "Deterministic", "O(1) Shift", "No GC"]
      }
    ],
    conceptBlock: {
      beginner: "Imagine a box where you insert papers on top of each other. You can only read or remove the paper on the absolute top.",
      intermediate: "Implied using static arrays or dynamic arrays. A dynamic integer called Stack Pointer tracks the top. Pushing increments the register and drops data; popping reads values first, then decrements pointer to free memory space.",
      advanced: "Explains CPU Registers. The call stack tracks function calls. Local variables are compiled into activation records. Invoking a nested function shifts the ESP stack boundaries downward.",
      expert: "Underlines compiler escapes. High-performance compilers read loops to see if objects survive outside. Variables that escape the function scope are heap allocated; otherwise, they stay on the stack, preventing malloc latencies."
    },
    technicalCodeBlock: `// High-Performance Array Stack in TypeScript
export class OptimizedStack<T> {
  private items: T[] = [];
  private sp: number = -1; // Stack Pointer

  constructor(private readonly limit: number = 1024) {}

  public push(value: T): void {
    if (this.sp >= this.limit - 1) {
      throw new Error("StackOverflowError: Memory boundaries exceeded");
    }
    this.sp++;
    this.items[this.sp] = value;
  }

  public pop(): T {
    if (this.sp < 0) {
      throw new Error("StackUnderflowError: No elements in scope");
    }
    const item = this.items[this.sp];
    // Prevent reference retention (Memory Leaks)
    (this.items as any)[this.sp] = undefined;
    this.sp--;
    return item;
  }

  public peek(): T {
    if (this.sp < 0) return null as any;
    return this.items[this.sp];
  }

  public size(): number {
    return this.sp + 1;
  }
}`
  },
  {
    id: "tree-traversal",
    title: "2. Tree Traversal Techniques",
    subtitle: "Systematic Hierarchical Data Traversal (DFS vs BFS)",
    iconName: "BinaryType",
    colorTheme: {
      primary: "bg-[#14b8a6] text-white",
      secondary: "text-[#14b8a6]",
      glow: "rgba(20, 184, 166, 0.4)",
      badge: "bg-teal-500/10 text-teal-400 border-teal-500/20",
      lightBg: "bg-[#0b1716]",
      border: "border-teal-500/30",
    },
    overview: "Traversals are processes of visiting all nodes in a tree data structure exactly once in a specific recursive order (Pre-Order, In-Order, Post-Order) or queue order (Level-Order Breadth-First-Search).",
    curriculumHierarchy: [
      "Beginner: Concept of Nodes, Roots, Leaves, and standard Tree shapes.",
      "Intermediate: Implementation of Pre-Order, In-Order, and Post-Order recursively.",
      "Advanced: Iterative simulations of traversals using custom helper Stacks to eliminate recursion.",
      "Expert Insights: Threaded Trees (Morris Traversal) yielding constant space O(1) traversals."
    ],
    hiddenConcepts: [
      "Morris Traversal: Uses existing null pointers at leaf nodes to map temporary pointers back to parent roots, avoiding recursion stack space.",
      "DFS Space Boundaries: The recursive call stack uses space proportional to the Tree Height O(H). In worst skewed trees, this equals O(N).",
      "Prefix/Postfix Math Evaluation: Building expression trees where Pre-Order maps to Polish (Prefix) Notation and Post-Order maps to Reverse Polish."
    ],
    visualFlowSteps: [
      "PRE-ORDER (Root, Left, Right): Visit root first. Process left branch, then complete right branch. (Copying structure)",
      "IN-ORDER (Left, Root, Right): Visit left subtree fully. Process current root. Process right subtree. (Sorts BST components)",
      "POST-ORDER (Left, Right, Root): Process left subtree. Process right. Finally handle parent root. (Used for file-size calculation)",
      "LEVEL-ORDER (BFS): Initialize FIFO Queue. Push Root. Dequeue, print, then push children from Left to Right."
    ],
    formulasAndComplexity: [
      {
        label: "Traversal Time (All Types)",
        formula: "O(N)",
        notation: "Linear Time",
        explanation: "Every single node in the tree structure must be touched exactly once to output the full sequence."
      },
      {
        label: "Recursive Space Complexity",
        formula: "O(H)",
        notation: "Proportional to Height",
        explanation: "Tracks execution stack depth. O(log N) for balanced trees; degrades to O(N) for skewed lines."
      },
      {
        label: "Queue BFS Space Complexity",
        formula: "O(W)",
        notation: "Proportional to Width",
        explanation: "Holds the maximum tree breadth (nodes at widest leaf level), which approaches N/2 in full trees."
      }
    ],
    comparisons: [
      {
        criteria: "Recursive Stack Overhead",
        entityA: "Recursive Traversal",
        entityB: "Morris Traversal",
        winner: "Morris Traversal: Redefines null leaves as pointers. Requires O(1) Auxiliary Space instead of O(H) call stack."
      },
      {
        criteria: "Sorted Output generation",
        entityA: "In-Order Traversal",
        entityB: "Pre-Order Traversal",
        winner: "In-Order Traversal: Guarantees numeric sorting output when executed upon a valid Binary Search Tree (BST)."
      }
    ],
    commonMistakes: [
      "Missing Base Null Check: Failing to verify 'if (node == null) return' leading to catastrophic runtime null references.",
      "Confusing Post-Order execution sequence: Processing Left, then Root, then Right (which is In-order) instead of child nodes first.",
      "Queue Bloat in Level-Order: Forgetting to remove visited nodes from the Queue structure, causing infinite loops/memory exhaustion."
    ],
    bestPractices: [
      "Use recursive traversals for easy debugging when H remains small (balanced trees).",
      "Shift to iterative or Morris traversals in highly unstable environments where stack size checks are limited.",
      "Implement deep tree structures using memory-friendly arrays when managing binary heaps to exploit cache locality."
    ],
    futureResearch: "Parallel Multi-threaded Traversals optimizing GPU thread warps for massive hierarchical file systems and graphic BVH rendering.",
    mythVsFact: [
      {
        myth: "All traversals must start at the left-most leaf of the tree structure.",
        fact: "All traversals start their evaluation at the Root node, but they recursively explore paths based on L/R priorities."
      },
      {
        myth: "DFS and BFS always use the exact same space requirements.",
        fact: "DFS depends on Tree Height O(H); BFS depends on Maximum Tree Width O(W). In a deep, narrow tree, DFS takes minimal space while BFS expands heavily."
      }
    ],
    realWorldAnalogies: [
      {
        title: "File Directory Size Calculator",
        analogy: "To calculate folder size, you calculate child files A & B, then subfolders, and sum them in the root folder.",
        whyItFits: "This is a perfect example of Post-Order traversal. You cannot evaluate parent size before mapping child leaf sizes."
      },
      {
        title: "Syllabus Layout Organization",
        analogy: "Reading a textbook Chapter 1, then Chapter 1.1, then 1.1.1, exploring topic trees systematically down.",
        whyItFits: "Models Pre-Order traversal. The main topic title (Root) is encountered before studying the inner details (Leaves)."
      }
    ],
    faqs: [
      {
        id: "t_faq_1",
        question: "Can we uniquely reconstruct a binary tree from any single traversal list?",
        answer: "No. A single traversal list (e.g., In-order) is ambiguous. You require AT LEAST TWO traversals, one of which must be In-order (e.g., Pre-order + In-order, or Post-order + In-order) to reconstruct a unique binary tree."
      },
      {
        id: "t_faq_2",
        question: "When should I choose BFS (Level-Order) over DFS?",
        answer: "Choose BFS when searching for shortest paths (first occurrence closest to root) or when processing nodes layer-by-layer. Choose DFS when mapping terminal leaves or solving structural hierarchies like file paths."
      }
    ],
    vivaQuestions: [
      {
        id: "t_viva_1",
        question: "What is Morris Traversal, and what are its performance traits?",
        answer: "Morris Traversal is an in-order traversal algorithm that uses threaded binary trees. By linking leaf node right pointers back to their in-order successors, it traverses the tree in O(N) time with O(1) space, avoiding recursion or explicit stacks.",
        expectedKeywords: ["Threaded Binary Tree", "O(1) Auxiliary Space", "In-order Successor"]
      },
      {
        id: "t_viva_2",
        question: "How do Pre-Order, In-Order, and Post-Order relate to prefix, infix, and postfix syntax forms?",
        answer: "When applied to an expression tree, Pre-order traversal yields the prefix Polish notation, In-order yields standard infix math equations, and Post-order yields postfix Reverse Polish notation used in compiler execution.",
        expectedKeywords: ["Expression Tree", "Prefix", "Infix", "Postfix", "Reverse Polish"]
      }
    ],
    conceptBlock: {
      beginner: "Imagine examining a family tree. DFS means exploring one branch all the way to its youngest descendant before starting the next line. BFS means meeting all siblings before moving to cousins.",
      intermediate: "Implemented via recursion. Root position determines the type. In Pre-order, Root is processed, then we recurse left, then right. In Post-order, we complete the recursion of both children first before doing any work on the parent.",
      advanced: "Explains standard iterative forms. Because modern OS memory restricts recursion on huge hierarchies, we execute traversals using a custom loops stack. For BFS, we swap our stack with a queue, popping the front and pushing child nodes.",
      expert: "Unravels Morris Threaded Trees. Traversing a tree of one billion deep elements with normal recursion causes memory faults. Morris traversal dynamically sets temporary right pointers, restoring them instantly during the walk."
    },
    technicalCodeBlock: `// Recursive and Constant Space Morris Tree Traversal in TS
export interface TreeNode<T> {
  value: T;
  left: TreeNode<T> | null;
  right: TreeNode<T> | null;
}

// Pre-Order: Root, Left, Right
export function preOrderRecursive<T>(node: TreeNode<T> | null, result: T[] = []): T[] {
  if (node === null) return result;
  result.push(node.value); // Process Root
  preOrderRecursive(node.left, result); // Traverse Left
  preOrderRecursive(node.right, result); // Traverse Right
  return result;
}

// In-Order Morris Traversal: O(N) Time, O(1) Space (Zero Stack!)
export function morrisInOrder<T>(root: TreeNode<T> | null): T[] {
  const result: T[] = [];
  let current = root;

  while (current !== null) {
    if (current.left === null) {
      result.push(current.value);
      current = current.right;
    } else {
      // Find the in-order predecessor of current
      let predecessor = current.left;
      while (predecessor.right !== null && predecessor.right !== current) {
        predecessor = predecessor.right;
      }

      // Make current as the right child of its in-order predecessor
      if (predecessor.right === null) {
        predecessor.right = current;
        current = current.left;
      } else {
        // Revert the changes to restore original tree structure
        predecessor.right = null;
        result.push(current.value);
        current = current.right;
      }
    }
  }
  return result;
}`
  },
  {
    id: "bst-explained",
    title: "3. Binary Search Tree Explained",
    subtitle: "Highly Efficient Structured Querying Constraints",
    iconName: "Binary",
    colorTheme: {
      primary: "bg-[#f59e0b] text-white",
      secondary: "text-[#f59e0b]",
      glow: "rgba(245, 158, 11, 0.4)",
      badge: "bg-amber-500/10 text-amber-400 border-amber-500/20",
      lightBg: "bg-[#18120b]",
      border: "border-amber-500/30",
    },
    overview: "A binary tree node structure maintaining the order invariant: for every node, and all nested elements, Left Subtree Values < Node Value < Right Subtree Values. Accelerates searches, insertions, and deletions.",
    curriculumHierarchy: [
      "Beginner: Understanding Left vs Right ordering logic.",
      "Intermediate: Implementing Search, Node Insertion, and Min/Max finding.",
      "Advanced: Complex Deletion cases recursively (including In-order Successor replacement).",
      "Expert Insights: Self-balancing logic theorems (AVL Rotations, Red-Black node coloring)."
    ],
    hiddenConcepts: [
      "In-Order Successor Search: For a node with two children, its successor is the absolute leftmost element in its right subtree.",
      "Degeneracy performance fall: Pushing pre-sorted sequences (e.g. 1, 2, 3, 4) into a simple BST causes search O(N) chains, behaving like a Linked List.",
      "Successor Deletion Swaps: When deleting a node with two children, swapping with its successor guarantees zero structural breaches during recursive deletions."
    ],
    visualFlowSteps: [
      "BST INVARIANT Rule: Every node acts as an array pivot. Left branches contain lesser keys, right branches contain greater.",
      "INSERT PROCESS: Start from root. If key < current, recurse left. If key > current, recurse right. Insert as leaf at empty slot.",
      "SEARCH PROCESS: Instantly discard half the search space. If target is lower, branch left; if greater, branch right.",
      "DELETION - LEAF CASE: Node has zero children. Sever connection from parent instantly.",
      "DELETION - ONE CHILD: Node has single branch. Link node parent directly to child node (bypassing current).",
      "DELETION - TWO CHILDREN: Find In-order Successor. Overwrite value of target with successor value. Delete successor recursively."
    ],
    formulasAndComplexity: [
      {
        label: "Search Time (Balanced Case)",
        formula: "O(log N)",
        notation: "Logarithmic Search",
        explanation: "Halves the active elements space at each node comparisons. Analogous to Binary Search."
      },
      {
        label: "Search Time (Worst Case)",
        formula: "O(N)",
        notation: "Linear Time",
        explanation: "Happens in highly skewed trees where nodes are inserted in strictly ascending/descending sorting orders."
      },
      {
        label: "Insertion Complexity",
        formula: "O(H)",
        notation: "Proportional to Height",
        explanation: "Proportional to tree height. Equal to O(log N) average, and O(N) when degenerate."
      }
    ],
    comparisons: [
      {
        criteria: "Unsorted Lookup Performance",
        entityA: "Binary Search Tree",
        entityB: "Sorted Array Structure",
        winner: "BST Insertion: Inserting elements into an array forces shifts O(N). BST inserts dynamic pointers in O(log N) time."
      },
      {
        criteria: "Tree Deletion Space Overhead",
        entityA: "Simple BST Deletion",
        entityB: "Garbage Collector clean",
        winner: "BST Deletion: In-order successor swap maintains memory size directly without structural leaks."
      }
    ],
    commonMistakes: [
      "Violating BST properties during updates: Incorrectly re-linking parent nodes during deletions without checking invariants.",
      "Assuming BST guarantees O(log N) search at all times: Neglecting self-balancing algorithms which leads to linear O(N) degradation in real-world pipelines.",
      "Failing to compare duplicates: Assuming keys are strictly unique and crash loops on duplicate attempts, instead of tracking key frequency counters."
    ],
    bestPractices: [
      "Never feed pre-sorted keys directly into a standard BST without shuffling the data first.",
      "Move to balanced trees (Red-Black, AVL trees) for applications that require guaranteed O(log N) timing profiles.",
      "Cache the root nodes locally in GPU/L1 cache structures to boost indexing speed in server files systems."
    ],
    futureResearch: "Lock-Free Concurrent BST architectures capable of infinite multi-thread parallel reads and writes in cluster server grids.",
    mythVsFact: [
      {
        myth: "The absolute minimum value in a Binary Search Tree can sit anywhere along the tree structure.",
        fact: "The minimum value always sits at the absolute leftmost leaf block of the entire tree."
      },
      {
        myth: "All Binary Trees are automatically Binary Search Trees.",
        fact: "A standard Binary Tree permits children to hold any value. A BST enforces the strict left < parent < right invariant."
      }
    ],
    realWorldAnalogies: [
      {
        title: "The Dictionary Directory Finder",
        analogy: "To find 'Kernel', you open the book middle. 'K' is after 'M'? No, left. Discard letters M to Z, look left.",
        whyItFits: "Models binary lookup. Cuts search paths in half at each page choice step."
      },
      {
        title: "Company Hierarchy Routing",
        analogy: "You have a project that goes to the VP. If budget < $50k left manager, if > $50k right VP directs.",
        whyItFits: "Structured decision branching based on quantitative ordering rules recursively."
      }
    ],
    faqs: [
      {
        id: "b_faq_1",
        question: "How do AVL Trees and Red-Black Trees solve the O(N) degenerate tree risk?",
        answer: "They track height balance factors. If an insertion makes the left subtree significantly taller than the right, they execute structural pointer 'Rotations' to balance the node heights, keeping search strictly focused around O(log N)."
      },
      {
        id: "b_faq_2",
        question: "What is In-order Successor of a node, and how is it used during deleting?",
        answer: "The In-order Successor is the node with the smallest key strictly greater than the current node. When removing a node with two children, we swap its value with this successor and recursively delete the successor, ensuring the subtrees remain in perfect sorted order."
      }
    ],
    vivaQuestions: [
      {
        id: "b_viva_1",
        question: "Describe what AVL Tree rotations are, and name the four core rotation cases.",
        answer: "Rotations are local pointer swaps to restore height balance. The 4 cases are: Left-Left (LL), Right-Right (RR) solved with a single rotation, and Left-Right (LR), Right-Left (RL) solved via double rotations.",
        expectedKeywords: ["Height Balance", "Rotations", "LL", "RR", "LR", "RL"]
      },
      {
        id: "b_viva_2",
        question: "Under pre-sorted array inputs, what shape does standard BST insertion form?",
        answer: "It forms a degenerate skewed single-line tree that is structurally identical to a Linked List, degrading search complexity from O(log N) to O(N).",
        expectedKeywords: ["Degenerate Tree", "Skewed Tree", "Linked List", "O(N) Degradation"]
      }
    ],
    conceptBlock: {
      beginner: "Think of an interactive number guessing game. I think of a number. If you guess, I say 'higher' or 'lower'. Guided by this, you instantly dump half of the numbers. A BST stores values following this rules.",
      intermediate: "Defines recursive lookup, insert and deletion. To delete a node with two branches, we locate the smallest of its elements on the right (Successor). Overwriting current value preserves structural integrity.",
      advanced: "Explains standard Skewed Trees. Sorting keys first and feeding them to BST results in linear paths. To fix this, high-performance engines use local AVL Rotations or color balance tags.",
      expert: "Presents concurrent lock-free search structures. Large web engines run multi-core systems indexing BST trees. Using atomic CAS (Compare-and-Swap) algorithms replaces heavy mutex threads."
    },
    technicalCodeBlock: `// Fully Functional Binary Search Tree with Balanced Search in TS
export class BSTNode {
  constructor(
    public value: number,
    public left: BSTNode | null = null,
    public right: BSTNode | null = null
  ) {}
}

export class BinarySearchTree {
  private root: BSTNode | null = null;

  public getRoot(): BSTNode | null {
    return this.root;
  }

  public insert(value: number): void {
    const newNode = new BSTNode(value);
    if (!this.root) {
      this.root = newNode;
      return;
    }
    this.insertNode(this.root, newNode);
  }

  private insertNode(current: BSTNode, newNode: BSTNode): void {
    if (newNode.value < current.value) {
      if (!current.left) {
        current.left = newNode;
      } else {
        this.insertNode(current.left, newNode);
      }
    } else {
      if (!current.right) {
        current.right = newNode;
      } else {
        this.insertNode(current.right, newNode);
      }
    }
  }

  public search(value: number): BSTNode | null {
    let current = this.root;
    while (current) {
      if (value === current.value) return current;
      current = value < current.value ? current.left : current.right;
    }
    return null;
  }

  // Find Min helper (Leftmost node)
  public findMinNode(node: BSTNode): BSTNode {
    let current = node;
    while (current.left !== null) {
      current = current.left;
    }
    return current;
  }
}`
  },
  {
    id: "hash-tables",
    title: "4. Hash Tables Simplified",
    subtitle: "Map-Based Keys to Immediate Indexes Lookup",
    iconName: "FileSpreadsheet",
    colorTheme: {
      primary: "bg-[#ec4899] text-white",
      secondary: "text-[#ec4899]",
      glow: "rgba(236, 72, 153, 0.4)",
      badge: "bg-pink-500/10 text-pink-400 border-pink-500/20",
      lightBg: "bg-[#1d0e16]",
      border: "border-pink-500/30",
    },
    overview: "An associative array mapping keys to system indices via mathematical algorithms called Hash Functions. Achieves immediate constant O(1) time processing via custom collision mitigations.",
    curriculumHierarchy: [
      "Beginner: Basic concepts of Keys, Values, and Array Indexes.",
      "Intermediate: Building simple Hash Functions (Modulo operations) and indexing.",
      "Advanced: Handling Collisions (Separate Chaining chains vs Open Addressing Linear Probing).",
      "Expert Insights: Dynamic Rehashing, Load Factor limits, Cryptographic hashing vs Non-cryptographic hashing loops."
    ],
    hiddenConcepts: [
      "Load Factor (Alpha = N/M): Controls efficiency. When occupied cells cross 70-75% threshold, collision rates skyrocket, necessitating dynamic array resizing.",
      "Primary Clustering: In linear probing, consecutive occupied slots form giant chunks, creating long linear performance lookups.",
      "Amortized O(1): Resizing and rehashing takes O(N) time list copying. However, because it occurs infrequently, average insertion speed stays O(1)."
    ],
    visualFlowSteps: [
      "HASH FUNCTION: Convert arbitrary keys (like string 'James') to integer hash values using polynomial algorithms.",
      "INDEX COMPRESSION: Compressing raw integers to fit array index dimensions using modulus limits, i.e. index = hash % capacity.",
      "COLLISION DETECTED: Two unique keys (e.g. 'Jane' and 'Bob') resolve to the exact same array slot index.",
      "SEPARATE CHAINING: Each bucket index points to a dynamic Linked List. Appends overlapping nodes into this chain.",
      "OPEN ADDRESSING (Probing): When slot is busy, slide to next index linearly (index + 1) % size until an empty slot is located.",
      "REHASH EXCELLENCE: If Load Factor exceeds 0.75, double capacity and re-map all variables to the new larger array."
    ],
    formulasAndComplexity: [
      {
        label: "Hash Lookup Complexity",
        formula: "O(1) Average",
        notation: "Constant Time",
        explanation: "Using direct mathematical indexing, mapping keys to values occurs instantly without search loops."
      },
      {
        label: "Worst Case Performance",
        formula: "O(N)",
        notation: "Linear Time",
        explanation: "Avoided through rehashing. Occurs when collision logic creates a giant linked list at a single array index."
      },
      {
        label: "Load Factor Equation",
        formula: "α = N / M",
        notation: "Occupied Slots Ratio",
        explanation: "Ratio of total elements (N) to bucket slots size (M). Best limit kept strictly under 0.75."
      }
    ],
    comparisons: [
      {
        criteria: "Collision Resolution Overhead",
        entityA: "Chaining (Buckets)",
        entityB: "Linear Probing",
        winner: "Chaining: Memory efficient. Linear Probing degrades when primary clustering slows the search steps."
      },
      {
        criteria: "Search Performance Bounds",
        entityA: "Hash Modulo Lookup",
        entityB: "Binary Search Tree",
        winner: "Hash Lookup: Achieves O(1) performance vs BST O(log N), but lacks sorted range querying capabilities."
      }
    ],
    commonMistakes: [
      "Poor Hash distribution math: Modulus mapping using non-prime bucket sizes, leading to high collision recurrence rates on aligned numbers.",
      "Neglecting load factors resizing: Allowing table occupancy to reach 99%, reducing lookup speed into sluggish linear scans.",
      "Using mutable pointers as hash keys: Changing key variable state after insertion, losing references to stored hashes entirely."
    ],
    bestPractices: [
      "Always set hash table bucket size to a Prime Number to maximize modulo dispersion rates.",
      "Re-map hashes (Rehash) to double the size the moment load factor crosses 0.70 threshold.",
      "Use cryptographically sound, fast non-cryptographic hashes like MurmurHash or FNV-1a for general key storage."
    ],
    futureResearch: "Cuckoo Hashing & Bloom Filter hybrids executing multi-choice hashing steps to guarantee O(1) worst-case search times.",
    mythVsFact: [
      {
        myth: "Writing a flawless Hash function completely prevents all collisions forever.",
        fact: "The Pigeonhole Principle states that if keys space exceeds bucket spaces, collisions are mathematically inevitable."
      },
      {
        myth: "A Hash Table allows you to print elements in fully sorted order instantly.",
        fact: "Hash tables do not maintain any sequential ordering of internal keys. Printing values results in randomized distributions."
      }
    ],
    realWorldAnalogies: [
      {
        title: "The Gym Locker Room Slots",
        analogy: "You calculate locker tag based on last two digits of phone number. If Tag 45 is taken, you search slots.",
        whyItFits: "Models Linear Probing. You sequentially scan empty spaces nearby when your direct locker assignment is loaded."
      },
      {
        title: "An Indexed Library Index Catalog",
        analogy: "Looking up author name starting with 'S' routes you to a bin containing small index cards listed for 'S'.",
        whyItFits: "Describes Separate Chaining. 'S' acts as the bucket hash where dynamic card lists are appended."
      }
    ],
    faqs: [
      {
        id: "h_faq_1",
        question: "Why are prime numbers highly selected when defining Hash Table capacity limit?",
        answer: "Array sizes set to prime numbers prevent clustering when hashing keys with common factors. It minimizes indexing overlap during modulo compression operations."
      },
      {
        id: "h_faq_2",
        question: "What is 'Amortized O(1)' in the context of Hash Tables?",
        answer: "Dynamic rehashing copies all keys to a new array, taking O(N) time. However, since capacity doubles, rehashing occurs only once after many O(1) steps, making the average mathematical lookup speed strictly constant O(1)."
      }
    ],
    vivaQuestions: [
      {
        id: "h_viva_1",
        question: "Explain the Pigeonhole Principle in relation to Hash Collision theorems.",
        answer: "If you have N pigeonholes and N+1 pigeons, at least one hole must contain multiple pigeons. Similarly, mapping unlimited keys to a finite bucket space guarantees collisions mathematically.",
        expectedKeywords: ["Pigeonhole Principle", "Collisions", "Finite Bucket Space"]
      },
      {
        id: "h_viva_2",
        question: "Compare Separate Chaining vs Open Addressing in terms of memory utilization.",
        answer: "Separate Chaining uses extra heap memory for linked list nodes, introducing pointer overhead. Open Addressing relies purely on pre-allocated slots, maintaining cache locality but degrading fast if clustering spikes.",
        expectedKeywords: ["Linked Lists", "Pointer Overhead", "Cache Locality", "Clustering"]
      }
    ],
    conceptBlock: {
      beginner: "Think of an array of labeled cubbies. When storing an item, you compute its cubby index by passing its name to a mathematical function. To fetch it later, re-calculate the label index to extract it instantly.",
      intermediate: "Explains standard index compression index = hash(key) % capacity. If two unique items maps to the same index, a 'Collision' occurs, requiring separate list links or sliding empty slot probes.",
      advanced: "Focuses on the Load Factor alpha. As cells occupy past 70%, search steps spike. To keep speeds O(1), engines execute 'Rehashing'—copying elements into an active double-sized array with new indexes.",
      expert: "Explores high-end algorithms like Cuckoo Hashing. It uses two hash functions and two separate tables. When an item collides, it 'kicks out' the old item to its alternative slot, guaranteeing absolute O(1) worst-case search speed."
    },
    technicalCodeBlock: `// High-Performance Hash Map using Separate Chaining in TS
export class HashNode<K, V> {
  constructor(public key: K, public value: V, public next: HashNode<K, V> | null = null) {}
}

export class SimpleHashMap<K extends string, V> {
  private buckets: Array<HashNode<K, V> | null>;
  private size: number = 0;

  constructor(private capacity: number = 31) {
    this.buckets = new Array(capacity).fill(null);
  }

  // Polynomial Rolling Hash Function
  private generateHash(key: string): number {
    let hash = 0;
    const prime = 31;
    for (let i = 0; i < key.length; i++) {
      hash = (hash * prime + key.charCodeAt(i)) % this.capacity;
    }
    return Math.abs(hash);
  }

  public insert(key: K, value: V): void {
    const index = this.generateHash(key);
    let current = this.buckets[index];

    while (current !== null) {
      if (current.key === key) {
        current.value = value; // Update existing
        return;
      }
      current = current.next;
    }

    // Insert new node at head of chain (Separate Chaining)
    const newNode = new HashNode(key, value);
    newNode.next = this.buckets[index];
    this.buckets[index] = newNode;
    this.size++;
  }

  public get(key: K): V | null {
    const index = this.generateHash(key);
    let current = this.buckets[index];

    while (current !== null) {
      if (current.key === key) {
        return current.value;
      }
      current = current.next;
    }
    return null;
  }
}
`
  },
  {
    id: "sorting-race",
    title: "5. Sorting Algorithms Race",
    subtitle: "Comparative Runtime Races: Bubble vs Selection vs Insertion vs Quick vs Merge",
    iconName: "Sliders",
    colorTheme: {
      primary: "bg-[#8b5cf6] text-white",
      secondary: "text-[#8b5cf6]",
      glow: "rgba(139, 92, 246, 0.4)",
      badge: "bg-purple-500/10 text-purple-400 border-purple-500/20",
      lightBg: "bg-[#110d19]",
      border: "border-purple-500/30",
    },
    overview: "A side-by-side graphical simulator demonstrating the performance race between sorting paradigms, highlighting the massive runtime divide between quadratic algorithms O(N²) and recursive logarithmic algorithms O(N log N).",
    curriculumHierarchy: [
      "Beginner: Basic element swaps, sorting state checks, and linear scanning.",
      "Intermediate: Quadratic loops in Bubble Sort, Selection Sort, and Insertion Sort.",
      "Advanced: Recursive Divide-and-Conquer paradigms in Heap, Quick, and Merge Sort.",
      "Expert Insights: Adaptive sub-array sorting algorithms (Timsort, IntroSort) using cache locality."
    ],
    hiddenConcepts: [
      "Cache Locality Factor: Inline array sweep algorithms (like Insertion Sort) access memory sequentially. This uses computer line caches far better than pointer-based data nodes.",
      "Sorting Stability (Invariant): A sort is stable if elements with equal keys maintain their original relative order. Invaluable for sorting multi-key databases.",
      "Median-of-Three pivot selection: Solves Quick Sort degeneracy so that sorted or reversed input lists don't drop to O(N²) quadratic limits."
    ],
    visualFlowSteps: [
      "DATA SEEDING: Generate an unsorted random array containing mixed numbers.",
      "SWAP & COMPARISON COUNTERS: Track every array lookup and position swap as the algorithm executes.",
      "QUADRATIC NESTED LOOPS: Bubble or select key indices and slide elements into place.",
      "RECURSIVE PARTITIONING: Select pivot indices and swap elements so all values to the left are smaller, right are larger.",
      "TEMPORARY SCRATCHPAD SPLITS: In Merge Sort, copy elements into left and right sub-arrays, then rebuild in sorted order.",
      "ORDER STABILITY COMPLETE: The array holds sorting invariant: array[i] <= array[i + 1] across all elements."
    ],
    formulasAndComplexity: [
      {
        label: "Bubble / Selection Time",
        formula: "O(N²)",
        notation: "Quadratic Time",
        explanation: "Requires nested loop scans. Slow and highly inefficient for larger datasets."
      },
      {
        label: "Merge / Quick Sort Time",
        formula: "O(N log N)",
        notation: "Logarithmic Time",
        explanation: "Efficient divide-and-conquer strategy, recursively splitting problem boundaries."
      },
      {
        label: "Merge Auxiliary Space",
        formula: "O(N)",
        notation: "Linear Memory Space",
        explanation: "Requires temporary copy buffers to merge sorted intervals, unlike in-place algorithms."
      }
    ],
    comparisons: [
      {
        criteria: "Sorting Stability",
        entityA: "Merge Sort (Stable)",
        entityB: "Quick Sort (Unstable)",
        winner: "Merge Sort: Keeps the original index alignment of identical nodes; Quick Sort swaps elements across pivots."
      },
      {
        criteria: "Memory Consumption",
        entityA: "In-Place Sorts (Bubble/Quick)",
        entityB: "Out-of-Place Sorts (Merge)",
        winner: "In-Place Sorts: Operate strictly within the original array size with O(1) extra space overhead."
      }
    ],
    commonMistakes: [
      "Array Index Errors: Running the search loop up to array length boundary, causing out-of-bounds pointer crashes on comparison checks.",
      "Stack Overflow in Quick Sort: Picking the first node as pivot on pre-sorted data, creating O(N) call stack frames.",
      "Forgetting stable sorts constraints: Using unstable sorts in multi-key database setups, corrupting primary sorting keys."
    ],
    bestPractices: [
      "Use Quick/Heap Sort if memory limits are strict and in-place sorting is required.",
      "Use Merge Sort when sorting linked lists or when retaining sorting stability is critical.",
      "Incorporate key threshold checks to swap deep recursion to Insertion Sort for sublists of capacity <= 10."
    ],
    futureResearch: "GPU CUDA Core parallel routing sorters capable of sorting trillions of float keys in a fraction of a millisecond.",
    mythVsFact: [
      {
        myth: "Quick Sort is always faster than Merge Sort because of its logarithmic complexity.",
        fact: "Merge Sort can outperform Quick Sort when data is extremely non-uniform, or on linked lists where pointer switches are fast."
      },
      {
        myth: "Bubble Sort is completely useless in modern engineering.",
        fact: "Bubble Sort is adaptive. With an early exit flag, it runs in O(N) time on fully sorted arrays, making it useful as a cheap verification check."
      }
    ],
    realWorldAnalogies: [
      {
        title: "Sorting a Hand of Playing Cards",
        analogy: "You pluck cards from a messy deck and slide them into your left hand, placing each new card exactly in its sorted position.",
        whyItFits: "This is exactly how Insertion Sort operates: keeping a sorted subarray on the left and sliding unsorted items into their correct spot."
      },
      {
        title: "Dividing Exam Sheets",
        analogy: "You split a stack of exams into two, hand them to two assistants to sort, then zipper their sorted piles back together by comparing top cards.",
        whyItFits: "Models Merge Sort's divide-and-conquer tree behavior, merging sorted branches with minimal lookups."
      }
    ],
    faqs: [
      {
        id: "so_faq_1",
        question: "Why does Quick Sort excel over Heap Sort in real-world benchmarks despite similar O(N log N) complex curves?",
        answer: "Heap Sort references elements at wildly separated array indexes during heapify operations, causing continuous CPU cache misses. Quick Sort navigates adjacent elements, allowing the hardware L1/L2 cache pre-fetcher to maximize speed."
      },
      {
        id: "so_faq_2",
        question: "What is Timsort and why is it so heavily used in modern programming languages?",
        answer: "Timsort is a hybrid sorting algorithm derived from Merge Sort and Insertion Sort. Developed by Tim Peters for Python in 2002, it finds already-sorted sequences ('runs') and uses Insertion Sort and merge blocks to optimize real-world data sorting."
      }
    ],
    vivaQuestions: [
      {
        id: "so_viva_1",
        question: "Explain the early-exit optimization in Bubble Sort and its best-case complexity.",
        answer: "By tracking whether a swap occurred during a full pass, we can break out of the outer loop early. If no elements were swapped, the array is already sorted, turning Bubble Sort's best-case speed to O(N).",
        expectedKeywords: ["early-exit", "swap flag", "already sorted", "O(N) best case"]
      },
      {
        id: "so_viva_2",
        question: "Why is Merge Sort highly preferred for sorting linked lists over Quick Sort?",
        answer: "Linked lists lack random memory indexing O(1), making Quick Sort's remote partitions slow. Merge Sort's sequential merge fits linked lists perfectly, reorganizing nodes purely by shifting pointer links with O(1) space overhead.",
        expectedKeywords: ["random access", "linked list pointers", "sequential merge", "O(1) space"]
      }
    ],
    conceptBlock: {
      beginner: "Imagine sorting a scattered squad of kids by height. You walk down the line, comparing side-by-side neighbors, and swap them if they are in the wrong order. You repeat this from the start until the entire squad is organized.",
      intermediate: "Quadratic algorithms scan the array repeatedly. Bubble Sort rolls through, swapping nearby slots. Selection Sort scans the entire unsorted interval to find the absolute minimum value, then swaps it to the front.",
      advanced: "Logarithmic algorithms split the problem. Quick Sort chooses a pivot, moves lesser items left and greater items right, and recursively sorts the parts. Merge Sort slices the array in half repeatedly, then zippers the sorted halves together.",
      expert: "Modern engineering engines combine techniques. Java and Python's Timsort tracks pre-sorted intervals, merging them dynamically. C++'s IntroSort runs Quick Sort, but automatically swaps to Heap Sort if the recursion gets too deep, avoiding quadratic limits."
    },
    technicalCodeBlock: `// TypeScript Implementations of Merge Sort and In-place Quick Sort
export class SortingEngine {
  // 1. Quick Sort: O(N log N) Average, O(1) Auxiliary Space
  public static quickSort(arr: number[], low: number = 0, high: number = arr.length - 1): number[] {
    if (low < high) {
      const pIdx = this.partition(arr, low, high);
      this.quickSort(arr, low, pIdx - 1);
      this.quickSort(arr, pIdx + 1, high);
    }
    return arr;
  }

  private static partition(arr: number[], low: number, high: number): number {
    // Median-of-three pivot selection can prevent O(N^2) degradation
    const pivot = arr[high]; 
    let i = low - 1;
    for (let j = low; j < high; j++) {
      if (arr[j] <= pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap elements
      }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return i + 1;
  }

  // 2. Merge Sort: O(N log N) Guaranteed, O(N) Auxiliary Space
  public static mergeSort(arr: number[]): number[] {
    if (arr.length <= 1) return arr;
    const mid = Math.floor(arr.length / 2);
    const left = this.mergeSort(arr.slice(0, mid));
    const right = this.mergeSort(arr.slice(mid));
    return this.merge(left, right);
  }

  private static merge(left: number[], right: number[]): number[] {
    const result: number[] = [];
    let l = 0, r = 0;
    while (l < left.length && r < right.length) {
      if (left[l] <= right[r]) {
        result.push(left[l++]);
      } else {
        result.push(right[r++]);
      }
    }
    return result.concat(left.slice(l)).concat(right.slice(r));
  }
}`
  },
  {
    id: "searching-comparison",
    title: "6. Searching Algorithms Comparison",
    subtitle: "Linear Search vs Binary Search Invariants",
    iconName: "Search",
    colorTheme: {
      primary: "bg-[#f43f5e] text-white",
      secondary: "text-[#f43f5e]",
      glow: "rgba(244, 63, 94, 0.4)",
      badge: "bg-rose-500/10 text-rose-400 border-rose-500/20",
      lightBg: "bg-[#1c080d]",
      border: "border-rose-500/30",
    },
    overview: "An architectural comparison demonstrating how enforcing list ordering invariants enables Binary Search to cut search boundaries in half at each step, outperforming sequential linear scans.",
    curriculumHierarchy: [
      "Beginner: Sequential linear lookups across unsorted elements lists.",
      "Intermediate: Binary search on sorted lists with low, high, and middle index pointers.",
      "Advanced: Estimation-based search (Interpolation) calculating numeric spacing ratios.",
      "Expert Insights: Massive multi-branch index hierarchies (B+ Trees) powering live database queries."
    ],
    hiddenConcepts: [
      "Sorting tax: Binary Search is O(log N) but requires sorting first. If a list is searched only once, sorting it takes O(N log N), which exceeds a simple O(N) linear search.",
      "Midpoint Overflow prevention: Adding low and high can exceed 32-bit integer limits. Safe midpoints calculation uses low + Math.floor((high - low) / 2).",
      "Branch Prediction Overhead: Linear searches run faster on very small cache lines (<16 items) than binary branching due to hardware pipelining."
    ],
    visualFlowSteps: [
      "TARGET ALIGNMENT: Declare the numerical key target value to search for within the array.",
      "LINEAR TRAVERSAL: Scan items sequentially from index zero onward, verifying until a match is found.",
      "SORTING CO-REQUISITE: Check if the array is sorted, enabling Binary Search low-high limits.",
      "MIDPOINT CALCULATION: Compute the mid index of the active boundary range safely.",
      "BOUNDARY DISCARDING: Compare target to mid: discard left half if target is greater, or right half if smaller.",
      "POINTER CONVERGENCE: Move low and high boundary indicators until they converge or target is extracted."
    ],
    formulasAndComplexity: [
      {
        label: "Linear Search Time",
        formula: "O(N)",
        notation: "Linear Time",
        explanation: "Inspects every single element in sequence in the worst case."
      },
      {
        label: "Binary Search Time",
        formula: "O(log N)",
        notation: "Logarithmic Time",
        explanation: "Bisects the searchable intervals repeatedly. Superbly fast for massive databases."
      },
      {
        label: "Search Space Complexity",
        formula: "O(1)",
        notation: "Constant Space",
        explanation: "Operates in-place using simple pointers, requiring no secondary buffers."
      }
    ],
    comparisons: [
      {
        criteria: "Array Sort Requirement",
        entityA: "Linear Search",
        entityB: "Binary Search",
        winner: "Linear Search: Requires zero pre-sorting. Binary Search requires a pre-sorted array."
      },
      {
        criteria: "Search Efficiency at Scale",
        entityA: "Sequential Lookup (Linear)",
        entityB: "Logarithmic Lookup (Binary)",
        winner: "Binary Search: Logarithmic curves scales incredibly well. Searching 1 billion elements takes only 30 steps."
      }
    ],
    commonMistakes: [
      "Binary Search on Unsorted Data: Executing Binary Search on random data without sorting, producing incorrect or null index outputs.",
      "Pointer Infinite Loops: Omitting the ±1 offset, i.e., coding low = mid or high = mid, which causes stuck loops on rounding.",
      "Midpoint Arithmetic Overflow: Coding (low + high) / 2 which triggers bit rollovers on massive arrays."
    ],
    bestPractices: [
      "Always verify that data is sorted before initiating a Binary Search query.",
      "Use low + Math.floor((high - low) / 2) to calculate mid ranges safely.",
      "Keep array indices and target keys in a hash table or B-tree if immediate querying speeds are needed frequently."
    ],
    futureResearch: "Grover's Quantum Search Algorithm, allowing quadratic speedup O(√N) searches across completely unsorted nodes.",
    mythVsFact: [
      {
        myth: "Binary Search is always faster than Linear Search under all circumstances.",
        fact: "For tiny lists (N < 16), Linear Search is often faster due to sequential memory pre-fetching and lack of conditional jumps."
      },
      {
        myth: "Binary Search can be applied to Linked Lists to search items in O(log N) time.",
        fact: "No. Linked lists do not support fast O(1) random access. Traversing to the middle element takes O(N) steps, degrading total search speed to O(N)."
      }
    ],
    realWorldAnalogies: [
      {
        title: "Flipping Through a Phone Directory",
        analogy: "Instead of scanning page-by-page from the start, you open the middle, check the alphabetical letter, and ignore half the directory.",
        whyItFits: "This mirrors Binary Search: discarding half the search boundaries at each midpoint decision."
      },
      {
        title: "Scanning Grocery Aisle Shelves",
        analogy: "Walking down the snack aisle, examining every single box sequentially until you locate your favorite chips.",
        whyItFits: "Exactly matches Linear Search: stepping item-by-item from start to finish."
      }
    ],
    faqs: [
      {
        id: "se_faq_1",
        question: "How does Interpolation Search improve on classic Binary Search?",
        answer: "If data is uniformly distributed, Interpolation Search estimates the target's position like a human finding 'Zebra' in a dictionary: jumping directly near the end. It achieves O(log log N) average speed by mapping numerical value distributions."
      },
      {
        id: "se_faq_2",
        question: "Why and when is the sorting overhead worth it for Binary Search?",
        answer: "Sorting takes O(N log N). If you perform only a single lookup, a simple sequential Linear Search O(N) is faster. However, if you perform many searches (M) at scale, sorting first makes total time O(N log N + M log N) which is far better than O(M * N)."
      }
    ],
    vivaQuestions: [
      {
        id: "se_viva_1",
        question: "Explain why standard mid calculations (low + high) / 2 can trigger integer overflows, and write the fix.",
        answer: "If low and high indices are extremely large, their sum can exceed the maximum 32-bit signed integer value (2,147,483,647), leading to negative numbers. The fix is writing: mid = low + Math.floor((high - low) / 2).",
        expectedKeywords: ["signed integer limit", "bit overflow", "negative values", "safe midpoint subtraction"]
      },
      {
        id: "se_viva_2",
        question: "Why is Binary Search on a single linked list highly inefficient?",
        answer: "Binary Search relies on immediate index lookups O(1). Linked lists require traversing node step-by-step to find the midpoint, requiring O(N) operations. This degrades the overall search speed to O(N), which is no better than Linear Search.",
        expectedKeywords: ["sequential pointers traversal", "sequential access", "no random access indexing", "O(N) lookup degradation"]
      }
    ],
    conceptBlock: {
      beginner: "Think of finding a page in a thick handbook. Linear Search is turning every single page from the very beginning. Binary Search is opening the book in the middle, check if the page you want is higher or lower, and instantly throw away the wrong half.",
      intermediate: "For Binary Search, we use low starting at 0 and high starting at N - 1. We compute middle: mid = low + (high - low) / 2. Compare mid's value to target. If target is larger, slide low to mid + 1. Else, slide high to mid - 1.",
      advanced: "If data is evenly distributed, Interpolation Search estimates target location like humans do when finding names: calculating ratios. It computes the mid index mathematically, achieving extremely fast O(log log N) lookups on massive datasets.",
      expert: "At scale, search databases use multi-branch indexes called B+ Trees. These structure pointers into pages matching disk alignment. This minimizes mechanical disk read lookups, maintaining steady search speeds across trillions of keys."
    },
    technicalCodeBlock: `// Safe and Highly Optimized Linear and Binary Searches in TS
export class SearchPerformanceComparisons {
  // 1. Linear Search: O(N) Time, O(1) Space, Works on Unsorted Arrays
  public static linearSearch<T>(arr: T[], target: T): number {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === target) {
        return i; // Target index located
      }
    }
    return -1; // Target does not exist
  }

  // 2. Binary Search: O(log N) Time, O(1) Space, REQUIRES Sorted Arrays
  public static binarySearch(arr: number[], target: number): number {
    let low = 0;
    let high = arr.length - 1;

    while (low <= high) {
      // Safe midpoint calculation avoiding signed integer bit overflow
      const mid = low + Math.floor((high - low) / 2);
      const midVal = arr[mid];

      if (midVal === target) {
        return mid; // Target index located
      } else if (midVal < target) {
        low = mid + 1; // Search the right half
      } else {
        high = mid - 1; // Search the left half
      }
    }
    return -1; // Target does not exist
  }
}`
  }
];

