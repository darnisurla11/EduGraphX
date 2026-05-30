import React, { useState, useEffect, useRef } from "react";
import { 
  Layers, 
  Play, 
  RotateCcw, 
  Info, 
  Terminal, 
  TrendingUp, 
  Lightbulb, 
  HelpCircle, 
  Check, 
  CheckCircle2, 
  XCircle, 
  Search, 
  Plus, 
  Trash, 
  ArrowRight, 
  BookOpen, 
  Download, 
  Sparkles, 
  Briefcase, 
  GraduationCap, 
  User, 
  ChevronLeft, 
  ChevronRight,
  Maximize2,
  Calendar,
  Globe,
  Share2,
  Sliders,
  Shuffle,
  Activity,
  ArrowUpDown
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { CSInfographicsDataset, SubtopicMetadata, FAQItem, VivaQuestion } from "./types";

export default function App() {
  // Global States
  const [selectedTopicId, setSelectedTopicId] = useState<string>("stack-visualized");
  const [activeViewMode, setActiveViewMode] = useState<"interactive" | "poster" | "slides" | "social">("interactive");
  
  // Find current active metadata
  const activeMetadata = CSInfographicsDataset.find(t => t.id === selectedTopicId) || CSInfographicsDataset[0];

  // 1. STACK SIMULATOR STATES
  const [stackItems, setStackItems] = useState<string[]>(["0xCAFE", "0xFA15", "0x992B"]);
  const [stackInputValue, setStackInputValue] = useState<string>("");
  const [stackLog, setStackLog] = useState<string>("Interactive Stack Pointer aligned. Initial heap frames allocated.");
  const [stackError, setStackError] = useState<string>("");
  const [peekHighlight, setPeekHighlight] = useState<boolean>(false);
  const [shuntingYardStep, setShuntingYardStep] = useState<number>(-1);
  const [shuntingYardStacks, setShuntingYardStacks] = useState<{
    expr: string[];
    nums: string[];
    ops: string[];
    log: string;
  }>({
    expr: ["(", "3", "+", "5", ")", "*", "2"],
    nums: [],
    ops: [],
    log: "Click 'Process Next Step' to simulate Dijkstra's 2-Stack evaluation of '(3 + 5) * 2'."
  });

  // 2. TREE TRAVERSAL SIMULATOR STATES
  const [traversalSelectedType, setTraversalSelectedType] = useState<"preorder" | "inorder" | "postorder" | "levelorder">("preorder");
  const [traversalSequence, setTraversalSequence] = useState<string[]>([]);
  const [activeVisitingNode, setActiveVisitingNode] = useState<string | null>(null);
  const [traversalPlaying, setTraversalPlaying] = useState<boolean>(false);
  const [traversalLog, setTraversalLog] = useState<string[]>(["Ready. Select Traversal Strategy and click 'Execute Traversal Walk'."]);
  const [traversalCallStack, setTraversalCallStack] = useState<string[]>([]);
  const traversalIntervalRef = useRef<any>(null);

  // 3. BINARY SEARCH TREE SIMULATOR STATES
  const [bstInsertValue, setBstInsertValue] = useState<string>("");
  const [bstSearchValue, setBstSearchValue] = useState<string>("");
  const [isBstSkewed, setIsBstSkewed] = useState<boolean>(false);
  const [bstSearchPath, setBstSearchPath] = useState<string[]>([]);
  const [bstSearchTarget, setBstSearchTarget] = useState<string | null>(null);
  const [bstSearchFound, setBstSearchFound] = useState<boolean | null>(null);
  const [bstConsole, setBstConsole] = useState<string>("BST invariant validated: Left < Parent < Right. Ready for insertion/queries.");
  // BST virtual tree representation
  const [bstNodes, setBstNodes] = useState<Array<{ id: string; value: number; x: number; y: number; left: string | null; right: string | null; parent: string | null }>>([
    { id: "50", value: 50, x: 50, y: 15, left: "30", right: "70", parent: null },
    { id: "30", value: 30, x: 28, y: 40, left: "15", right: "40", parent: "50" },
    { id: "70", value: 70, x: 72, y: 40, left: "62", right: "85", parent: "50" },
    { id: "15", value: 15, x: 15, y: 68, left: null, right: null, parent: "30" },
    { id: "40", value: 40, x: 38, y: 68, left: null, right: null, parent: "30" },
    { id: "62", value: 62, x: 62, y: 68, left: null, right: null, parent: "70" },
    { id: "85", value: 85, x: 85, y: 68, left: null, right: null, parent: "70" }
  ]);

  // 4. HASH TABLE SIMULATOR STATES
  const [hashKey, setHashKey] = useState<string>("");
  const [hashVal, setHashVal] = useState<string>("");
  const [hashConsole, setHashConsole] = useState<string>("Modulo offset compression active (Mod 8 prime ratio).");
  const [hashBuckets, setHashBuckets] = useState<Array<Array<{ key: string; val: string }>>>(
    Array.from({ length: 8 }, () => [])
  );
  const [hashAnimateKey, setHashAnimateKey] = useState<{ step: number; characters: string[]; asciiSum: number; modulo: number; finalIndex: number; name: string } | null>(null);

  // 5. SORTING ALGORITHMS RACE STATES
  const [sortArray, setSortArray] = useState<number[]>([48, 12, 85, 34, 5, 23, 62, 51]);
  const [sortActiveType, setSortActiveType] = useState<"bubble" | "selection" | "insertion">("bubble");
  const [sortCompareIndices, setSortCompareIndices] = useState<[number, number]>([-1, -1]);
  const [sortSwapIndices, setSortSwapIndices] = useState<[number, number]>([-1, -1]);
  const [sortComparesCount, setSortComparesCount] = useState<number>(0);
  const [sortSwapsCount, setSortSwapsCount] = useState<number>(0);
  const [sortIsRunning, setSortIsRunning] = useState<boolean>(false);
  const [sortHistory, setSortHistory] = useState<string[]>(["Seeded fresh numerical array [48, 12, 85, 34, 5, 23, 62, 51]. Click 'Cycle Sort Step' or 'Automate Race' to run."]);
  const [sortBubbleState, setSortBubbleState] = useState<{ i: number; j: number; sorted: boolean }>({ i: 0, j: 0, sorted: false });
  const [sortSelectionState, setSortSelectionState] = useState<{ i: number; j: number; minIdx: number; sorted: boolean }>({ i: 0, j: 1, minIdx: 0, sorted: false });
  const [sortInsertionState, setSortInsertionState] = useState<{ i: number; j: number; key: number; sorted: boolean }>({ i: 1, j: 0, key: 12, sorted: false });
  const [sortStats, setSortStats] = useState<Record<string, { compares: number; swaps: number }>>({
    bubble: { compares: 0, swaps: 0 },
    selection: { compares: 0, swaps: 0 },
    insertion: { compares: 0, swaps: 0 }
  });

  // 6. SEARCHING ALGORITHMS COMPARISON STATES
  const [searchArray, setSearchArray] = useState<number[]>([12, 19, 23, 31, 37, 45, 58, 62, 70, 85]);
  const [searchTarget, setSearchTarget] = useState<number>(37);
  const [searchStrategy, setSearchStrategy] = useState<"linear" | "binary">("linear");
  const [searchLowIdx, setSearchLowIdx] = useState<number>(-1);
  const [searchHighIdx, setSearchHighIdx] = useState<number>(-1);
  const [searchMidIdx, setSearchMidIdx] = useState<number>(-1);
  const [searchActiveScanIdx, setSearchActiveScanIdx] = useState<number>(-1);
  const [searchFoundIdx, setSearchFoundIdx] = useState<number>(-1);
  const [searchTotalSteps, setSearchTotalSteps] = useState<number>(0);
  const [searchLogTrace, setSearchLogTrace] = useState<string>("Ready to explore target values index scanning. Linear vs Binary paradigms validated.");
  const [searchIsActive, setSearchIsActive] = useState<boolean>(false);

  // 7. PRESENTATION SLIDES STATES
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);

  // 6. TRIVIA QUIZ STATE
  const [quizScore, setQuizScore] = useState<number>(0);
  const [quizAnswered, setQuizAnswered] = useState<Record<string, string>>({});
  const [quizAlert, setQuizAlert] = useState<string | null>(null);

  // Reset helper functions when shifting tabs
  useEffect(() => {
    // Clear traversal timers
    if (traversalIntervalRef.current) {
      clearInterval(traversalIntervalRef.current);
    }
    setTraversalPlaying(false);
    setActiveVisitingNode(null);
    setTraversalSequence([]);
    setTraversalCallStack([]);
    setTraversalLog(["Ready. Select Traversal Strategy and click 'Execute Traversal Walk'."]);
    
    // Reset BST searches
    setBstSearchPath([]);
    setBstSearchTarget(null);
    setBstSearchFound(null);
    setBstConsole("BST invariant validated. Balanced hierarchy loaded.");
    setBstSearchValue("");
    setBstInsertValue("");
    
    // Reset Sorting Race
    setSortArray([48, 12, 85, 34, 5, 23, 62, 51]);
    setSortCompareIndices([-1, -1]);
    setSortSwapIndices([-1, -1]);
    setSortComparesCount(0);
    setSortSwapsCount(0);
    setSortIsRunning(false);
    setSortHistory(["Seeded fresh numerical array [48, 12, 85, 34, 5, 23, 62, 51]. Click 'Cycle Sort Step' or 'Automate Race' to run."]);
    setSortBubbleState({ i: 0, j: 0, sorted: false });
    setSortSelectionState({ i: 0, j: 1, minIdx: 0, sorted: false });
    setSortInsertionState({ i: 1, j: 0, key: 12, sorted: false });
    setSortStats({
      bubble: { compares: 0, swaps: 0 },
      selection: { compares: 0, swaps: 0 },
      insertion: { compares: 0, swaps: 0 }
    });

    // Reset Searching Comparison
    setSearchArray([12, 19, 23, 31, 37, 45, 58, 62, 70, 85]);
    setSearchTarget(37);
    setSearchLowIdx(-1);
    setSearchHighIdx(-1);
    setSearchMidIdx(-1);
    setSearchActiveScanIdx(-1);
    setSearchFoundIdx(-1);
    setSearchTotalSteps(0);
    setSearchLogTrace("Ready and loaded. Enter lookup key and select searching algorithm profile.");
    setSearchIsActive(false);

    // Reset slide decks
    setCurrentSlideIndex(0);
    setQuizAlert(null);
  }, [selectedTopicId]);

  // Clean-up on unmount
  useEffect(() => {
    return () => {
      if (traversalIntervalRef.current) {
        clearInterval(traversalIntervalRef.current);
      }
    };
  }, []);

  // -------------------------------------------------------------
  // SIMULATOR ACTIONS
  // -------------------------------------------------------------

  // STACK OPERATIONS
  const handleStackPush = () => {
    if (!stackInputValue.trim()) return;
    if (stackItems.length >= 6) {
      setStackError("StackOverflowError: Memory boundaries exceeded (Max Size 6 reached)");
      setStackLog("CRITICAL FAILURE: Stack pointer hit maximum heap configuration boundaries.");
      return;
    }
    setStackError("");
    const newItem = stackInputValue.trim().toUpperCase();
    const updated = [...stackItems, newItem];
    setStackItems(updated);
    setStackLog(`Push success: Wrote '${newItem}' exactly at Stack Pointer SP Index: ${updated.length - 1} (Offset Address: 0x${(0x7ffee31a0000 + updated.length * 8).toString(16).toUpperCase()})`);
    setStackInputValue("");
  };

  const handleStackPop = () => {
    if (stackItems.length === 0) {
      setStackError("StackUnderflowError: Cannot Pop from an empty stack (Stack Pointer is -1)");
      setStackLog("CRITICAL FAILURE: Attempted decrementing empty stack pointer register.");
      return;
    }
    setStackError("");
    const popped = stackItems[stackItems.length - 1];
    const updated = stackItems.slice(0, -1);
    setStackItems(updated);
    setStackLog(`Pop success: Read and discharged '${popped}' from memory. SP decremented to: ${updated.length - 1}`);
  };

  const handleStackPeek = () => {
    if (stackItems.length === 0) {
      setStackError("RuntimeAlert: Stack bounds contain null entries");
      return;
    }
    setPeekHighlight(true);
    setTimeout(() => setPeekHighlight(false), 800);
    setStackLog(`Peek success: Inspected value '${stackItems[stackItems.length - 1]}' directly at current Stack Pointer (SP: ${stackItems.length - 1}). SP unchanged.`);
  };

  const traverseShuntingYard = () => {
    const steps = [
      { nums: [], ops: [], log: "Initialize shunting stacks. Read open parenthesis '(' - push to Operator stack." },
      { nums: ["3"], ops: [], log: "Read literal number '3'. Write directly to Value stack." },
      { nums: ["3"], ops: ["+"], log: "Read '+' operator. Operator stack push decision." },
      { nums: ["3", "5"], ops: ["+"], log: "Read literal number '5'. Write to Value stack." },
      { nums: ["8"], ops: [], log: "Read close parenthesis ')'. Pop Operator '+' and trigger calculation: 3 + 5 = 8. Push 8 back to numerical stack." },
      { nums: ["8"], ops: ["*"], log: "Read operator '*'. Top is clear. Push '*' to Operator Stack." },
      { nums: ["8", "2"], ops: ["*"], log: "Read literal '2'. Push to Value stack." },
      { nums: ["16"], ops: [], log: "Expression parsed fully. Pop final operator '*' to evaluate: 8 * 2 = 16. Done!" }
    ];

    const nextStep = shuntingYardStep + 1;
    if (nextStep >= steps.length) {
      // Reset
      setShuntingYardStep(-1);
      setShuntingYardStacks({
        expr: ["(", "3", "+", "5", ")", "*", "2"],
        nums: [],
        ops: [],
        log: "Click 'Process Next Step' to simulate Dijkstra's 2-Stack evaluation of '(3 + 5) * 2'."
      });
    } else {
      setShuntingYardStep(nextStep);
      setShuntingYardStacks({
        expr: ["(", "3", "+", "5", ")", "*", "2"],
        nums: steps[nextStep].nums,
        ops: steps[nextStep].ops,
        log: `[Step ${nextStep + 1}/8] ${steps[nextStep].log}`
      });
    }
  };

  // TREE TRAVERSALS WALK ANIMATOR
  const executeTraversalWalk = () => {
    if (traversalPlaying) {
      clearInterval(traversalIntervalRef.current);
      setTraversalPlaying(false);
      setActiveVisitingNode(null);
      return;
    }

    setTraversalSequence([]);
    setTraversalPlaying(true);
    setTraversalLog(["Initiating systematic traversal recursion walk inside Compiler memory map..."]);
    
    // Define exact traversal order outputs for our tree
    // Root = 50, Left = 30, Right = 70. 30's Children = 15, 40. 70's Children = 62, 85.
    let WalkPath: string[] = [];
    let StepsLog: string[] = [];
    let StackVisuals: string[][] = [];

    if (traversalSelectedType === "preorder") {
      // Root, Left, Right
      WalkPath = ["50", "30", "15", "40", "70", "62", "85"];
      StepsLog = [
        "1. Start at Root node 50. Process parent root FIRST. Pinned value: 50.",
        "2. Recurse down LEFT subtree. Visit Node 30. Process immediately.",
        "3. Recurse LEFT from 30. Visit Node 15 (Leaf block). Print to screen.",
        "4. Both children of 15 are NULL. Backtrack. Check right child of parent 30. Visit Node 40.",
        "5. Node 40 children are NULL. Retrace fully back to Root 50. Divert down RIGHT subtree to Node 70. Process immediately.",
        "6. Recurse LEFT from Node 70. Process terminal leaf Node 62.",
        "7. Retrace to parent 70 and check RIGHT. Process leaf Node 85. Traversal complete!"
      ];
      StackVisuals = [
        ["main()", "preOrder(50)"],
        ["main()", "preOrder(50)", "preOrder(30)"],
        ["main()", "preOrder(50)", "preOrder(30)", "preOrder(15)"],
        ["main()", "preOrder(50)", "preOrder(30)", "preOrder(40)"],
        ["main()", "preOrder(50)", "preOrder(70)"],
        ["main()", "preOrder(50)", "preOrder(70)", "preOrder(62)"],
        ["main()", "preOrder(50)", "preOrder(70)", "preOrder(85)"]
      ];
    } else if (traversalSelectedType === "inorder") {
      // Left, Root, Right
      WalkPath = ["15", "30", "40", "50", "62", "70", "85"];
      StepsLog = [
        "1. Start Root 50. Divert down left sub-branches fully first. In-order traverses Left side to maximum depth.",
        "2. Arrive at leftmost terminal node 15. Since its left satisfies null, process Node 15 value.",
        "3. Backtrack up to Parent Root Node 30. Process the root block here. Print: 30.",
        "4. Traverse parent's right branch. Visit Node 40. Left is null, process Node 40.",
        "5. Left branch fully complete. Retrace back to main tree Root 50. Process Root. Print: 50. (Yields fully sorted BST elements!)",
        "6. Move right. Traverse LEFT of right child 70. Visit and print Leaf Node 62.",
        "7. Backtrack up to Parent 70. Process Node 70. Finally check right branch, visiting and printing Leaf Node 85."
      ];
      StackVisuals = [
        ["main()", "inOrder(50)", "inOrder(30)", "inOrder(15)"],
        ["main()", "inOrder(50)", "inOrder(30)", "inOrder(15) - Print 15"],
        ["main()", "inOrder(50)", "inOrder(30) - Print 30"],
        ["main()", "inOrder(50)", "inOrder(30)", "inOrder(40) - Print 40"],
        ["main()", "inOrder(50) - Print 50"],
        ["main()", "inOrder(50)", "inOrder(70)", "inOrder(62) - Print 62"],
        ["main()", "inOrder(50)", "inOrder(70)", "inOrder(85) - Print 85"]
      ];
    } else if (traversalSelectedType === "postorder") {
      // Left, Right, Root
      WalkPath = ["15", "40", "30", "62", "85", "70", "50"];
      StepsLog = [
        "1. Dive to leftmost sub-depth from Root 50. Post-order requires left and right subtrees to complete before Root is printed.",
        "2. Check Leftmost leaf 15. All children processed (NULL). process Leaf 15 value.",
        "3. Shift to right brother node before writing parent. Visit Leaf 40. Process value.",
        "4. Both children branches of Node 30 are now fully processed. Backtrack to process Parent Node 30.",
        "5. Retrace up, but hold print of Root 50. Recurse down Right side. Dive leftmost to Node 62, process value.",
        "6. Check right counterpart child node. Visit and print leaf Node 85.",
        "7. Children of Node 70 are complete. Print Parent 70. Finally, both subtrees of Root 50 are evaluated. Print final main root Node 50!"
      ];
      StackVisuals = [
        ["main()", "postOrder(50)", "postOrder(30)", "postOrder(15)"],
        ["main()", "postOrder(50)", "postOrder(30)", "postOrder(40)"],
        ["main()", "postOrder(50)", "postOrder(30) - Print 30"],
        ["main()", "postOrder(50)", "postOrder(70)", "postOrder(62)"],
        ["main()", "postOrder(50)", "postOrder(70)", "postOrder(85)"],
        ["main()", "postOrder(50)", "postOrder(70) - Print 70"],
        ["main()", "postOrder(50) - Print 50 (Final Root)"]
      ];
    } else {
      // Level-order (BFS Queue)
      WalkPath = ["50", "30", "70", "15", "40", "62", "85"];
      StepsLog = [
        "1. Queue Queue = [50]. Dequeue 50, print value. Enqueue its children Left (30) and Right (70).",
        "2. Current Queue = [30, 70]. Dequeue front item: Node 30. Print 30. Enqueue its children [15, 40].",
        "3. Current Queue = [70, 15, 40]. Dequeue front item: Node 70. Print 70. Enqueue its children [62, 85].",
        "4. Current Queue = [15, 40, 62, 85]. Dequeue leftmost leaf Node 15. Print, children are NULL.",
        "5. Dequeue Node 40. Print value, children are NULL.",
        "6. Dequeue Node 62. Print value, children are NULL.",
        "7. Dequeue last node 85. Print value. Queue empty, Level-Order BFS complete!"
      ];
      StackVisuals = [
        ["FIFO Queue: [50]"],
        ["FIFO Queue: [30, 70]"],
        ["FIFO Queue: [70, 15, 40]"],
        ["FIFO Queue: [15, 40, 62, 85]"],
        ["FIFO Queue: [40, 62, 85]"],
        ["FIFO Queue: [62, 85]"],
        ["FIFO Queue: [85]"]
      ];
    }

    let currentIndex = 0;
    traversalIntervalRef.current = setInterval(() => {
      if (currentIndex >= WalkPath.length) {
        clearInterval(traversalIntervalRef.current);
        setTraversalPlaying(false);
        setActiveVisitingNode(null);
        setTraversalLog(prev => [...prev, "✔ SUCCESS: All hierarchy sectors visited and flushed safely."]);
        return;
      }

      const activeId = WalkPath[currentIndex];
      setActiveVisitingNode(activeId);
      setTraversalSequence(prev => [...prev, activeId]);
      setTraversalLog(prev => [...prev, StepsLog[currentIndex]]);
      setTraversalCallStack(StackVisuals[currentIndex] || []);
      
      currentIndex++;
    }, 1200);
  };

  // BST SEARCH/INSERT ACTION
  const executeBstSearch = () => {
    const val = parseInt(bstSearchValue);
    if (isNaN(val)) {
      setBstConsole("ERROR: Invalid numerical sequence entered.");
      return;
    }

    setBstSearchTarget(bstSearchValue);
    setBstSearchPath([]);
    setBstSearchFound(null);

    // If skewed tree is active, loop linearly
    if (isBstSkewed) {
      const skewedValues = [10, 20, 30, 40, 50];
      const stepPath: string[] = [];
      let found = false;
      
      setBstConsole("Search simulation details (SKEWED DEGENERATE CASE - LINEAR SEARCH):");

      for (let i = 0; i < skewedValues.length; i++) {
        const currVal = skewedValues[i];
        stepPath.push(currVal.toString());
        if (currVal === val) {
          found = true;
          break;
        }
      }

      setBstSearchPath(stepPath);
      setBstSearchFound(found);
      
      if (found) {
        setBstConsole(`Found target ${val} linearly after scanning ${stepPath.length} nodes consecutively! performance: O(N) (Sluggish linear linked-list speed due to bad balance!).`);
      } else {
        setBstConsole(`Checked ALL ${stepPath.length} linear nodes. Value ${val} is not present in the sequence. performance: O(N) exhaustive traversal!`);
      }
      return;
    }

    // Default Balanced BST Walk
    const path: string[] = [];
    let currentId: string | null = "50";
    let found = false;
    let logLines = ["Initializing BST traversal..."];

    while (currentId !== null) {
      const node = bstNodes.find(n => n.id === currentId);
      if (!node) break;

      path.push(currentId);
      if (node.value === val) {
        found = true;
        logLines.push(`Comparing Root Node ${node.value} == target ${val}. Value matched!`);
        break;
      } else if (val < node.value) {
        logLines.push(`Target ${val} < Node ${node.value}: Discard RIGHT branch! Diverting LEFT to child node [${node.left || 'NULL'}].`);
        currentId = node.left;
      } else {
        logLines.push(`Target ${val} > Node ${node.value}: Discard LEFT branch! Diverting RIGHT to child node [${node.right || 'NULL'}].`);
        currentId = node.right;
      }
    }

    setBstSearchPath(path);
    setBstSearchFound(found);
    setBstConsole(logLines.join("\n"));
  };

  const handleBstInsert = () => {
    const val = parseInt(bstInsertValue);
    if (isNaN(val)) {
      setBstConsole("ERROR: Enter a valid integer coordinate.");
      return;
    }

    // Dup check
    if (bstNodes.some(n => n.value === val)) {
      setBstConsole(`Constraint Violations: Key '${val}' already occupies a tree sector slot.`);
      return;
    }

    // Enforce max nodes for visual preservation
    if (bstNodes.length >= 12) {
      setBstConsole("Visual boundary safeguard: Limiting maximum BST nodes to 12 for clean layout readability.");
      return;
    }

    // Insert algorithm
    const newNodes = [...bstNodes];
    let parentId: string | null = null;
    let currentId: string | null = "50";
    let isLeftChild = false;

    while (currentId !== null) {
      const current = newNodes.find(n => n.id === currentId);
      if (!current) break;

      parentId = currentId;
      if (val < current.value) {
        if (current.left === null) {
          isLeftChild = true;
          currentId = null;
        } else {
          currentId = current.left;
        }
      } else {
        if (current.right === null) {
          isLeftChild = false;
          currentId = null;
        } else {
          currentId = current.right;
        }
      }
    }

    if (parentId !== null) {
      const parentNode = newNodes.find(n => n.id === parentId)!;
      const newId = val.toString();
      
      // Dynamic visual position coordinates based on parent
      const parentX = parentNode.x;
      const parentY = parentNode.y;
      // Calculate depth offset
      const childY = parentY + 16;
      const offsetMultiplier = childY > 70 ? 4 : 10;
      const childX = isLeftChild 
        ? parentX - offsetMultiplier 
        : parentX + offsetMultiplier;

      const newNode = {
        id: newId,
        value: val,
        x: childX,
        y: childY,
        left: null,
        right: null,
        parent: parentId
      };

      if (isLeftChild) {
        parentNode.left = newId;
      } else {
        parentNode.right = newId;
      }

      newNodes.push(newNode);
      setBstNodes(newNodes);
      setBstConsole(`Successfully inserted Node '${val}' as ${isLeftChild ? 'Left' : 'Right'} child lock of Parent Node '${parentId}'. O(log N) optimal timing maintained.`);
      setBstInsertValue("");
    }
  };

  const resetBstStructure = () => {
    setBstNodes([
      { id: "50", value: 50, x: 50, y: 15, left: "30", right: "70", parent: null },
      { id: "30", value: 30, x: 28, y: 40, left: "15", right: "40", parent: "50" },
      { id: "70", value: 70, x: 72, y: 40, left: "62", right: "85", parent: "50" },
      { id: "15", value: 15, x: 15, y: 68, left: null, right: null, parent: "30" },
      { id: "40", value: 40, x: 38, y: 68, left: null, right: null, parent: "30" },
      { id: "62", value: 62, x: 62, y: 68, left: null, right: null, parent: "70" },
      { id: "85", value: 85, x: 85, y: 68, left: null, right: null, parent: "70" }
    ]);
    setIsBstSkewed(false);
    setBstSearchPath([]);
    setBstSearchTarget(null);
    setBstSearchFound(null);
    setBstConsole("BST restored to original optimal balanced shape configuration.");
  };

  // SKEWED RE-SHAPE TRIGGERS
  const triggerSkewedShape = () => {
    setIsBstSkewed(true);
    setBstSearchPath([]);
    setBstSearchTarget(null);
    setBstSearchFound(null);
    setBstConsole("BST skewed configuration mode initialized. Standard search algorithms degrade to linear performance sequences O(N).");
  };


  // HASH TABLE WORKFLOWS
  const handleHashInsert = () => {
    if (!hashKey.trim() || !hashVal.trim()) {
      setHashConsole("ERROR: Key and value credentials cannot remain null.");
      return;
    }

    const keyLower = hashKey.trim();
    const valStr = hashVal.trim();

    // Map ASCII conversion workflow visual
    let asciiSum = 0;
    const charsList: string[] = [];
    for (let i = 0; i < keyLower.length; i++) {
      const cc = keyLower.charCodeAt(i);
      asciiSum += cc;
      charsList.push(`'${keyLower[i]}':${cc}`);
    }

    const finalModIndex = asciiSum % 8;

    // Trigger sequential visual animation
    setHashAnimateKey({
      step: 0,
      characters: charsList,
      asciiSum: asciiSum,
      modulo: finalModIndex,
      finalIndex: finalModIndex,
      name: keyLower
    });

    setTimeout(() => {
      setHashAnimateKey(prev => prev ? { ...prev, step: 1 } : null);
      setTimeout(() => {
        setHashAnimateKey(prev => prev ? { ...prev, step: 2 } : null);
        
        // Execute block insertion
        const updatedBuckets = [...hashBuckets];
        const targetList = [...updatedBuckets[finalModIndex]];

        // Duplicate override check
        const dupIdx = targetList.findIndex(x => x.key.toLowerCase() === keyLower.toLowerCase());
        let collided = false;

        if (dupIdx >= 0) {
          targetList[dupIdx] = { key: keyLower, val: valStr };
          setHashConsole(`Hash Match: Key '${keyLower}' verified. Replaced old value with dynamic string '${valStr}'. No physical collisions.`);
        } else {
          collided = targetList.length > 0;
          targetList.push({ key: keyLower, val: valStr });
          setHashConsole(
            `Indexed Successfully: Key '${keyLower}' mapped -> Index bucket #${finalModIndex}.\n` +
            `Hash polynomial sum: ${asciiSum}. Operation: ${asciiSum} % 8 (Modulo Compression) = index ${finalModIndex}.\n` +
            `${collided ? '⚠️ COLLISION DETECTED: This slot contains active pointers. Seperate chaining appended Node at tail!' : 'Optimal: Single data block mapped directly.'}`
          );
        }

        updatedBuckets[finalModIndex] = targetList;
        setHashBuckets(updatedBuckets);
        setHashKey("");
        setHashVal("");
      }, 1500);
    }, 1200);
  };

  const getHashLoadFactor = () => {
    let activeSize = 0;
    hashBuckets.forEach(b => {
      activeSize += b.length;
    });
    return activeSize / 8;
  };

  const clearHashSimulation = () => {
    setHashBuckets(Array.from({ length: 8 }, () => []));
    setHashConsole("Hash Table Buckets reset. Modulo offset compressed values empty.");
    setHashAnimateKey(null);
  };


  // 5. SORTING ALGORITHMS RACE WORKFLOWS
  const seedRandomSortArray = () => {
    const fresh: number[] = [];
    for (let i = 0; i < 8; i++) {
      fresh.push(Math.floor(Math.random() * 85) + 10);
    }
    setSortArray(fresh);
    setSortCompareIndices([-1, -1]);
    setSortSwapIndices([-1, -1]);
    setSortComparesCount(0);
    setSortSwapsCount(0);
    setSortIsRunning(false);
    setSortHistory([`Generated fresh random numerical array: [${fresh.join(", ")}]. Select algorithm and click 'Cycle Sort Step' or 'Automate Race' to run.`]);
    setSortBubbleState({ i: 0, j: 0, sorted: false });
    setSortSelectionState({ i: 0, j: 1, minIdx: 0, sorted: false });
    setSortInsertionState({ i: 1, j: 0, key: fresh[1], sorted: false });
    setSortStats({
      bubble: { compares: 0, swaps: 0 },
      selection: { compares: 0, swaps: 0 },
      insertion: { compares: 0, swaps: 0 }
    });
  };

  const handleSortIncrementalStep = () => {
    if (sortActiveType === "bubble") {
      if (sortBubbleState.sorted) {
        setSortIsRunning(false);
        setSortHistory(prev => [...prev, "🏁 Bubble Sort complete! Array is fully ordered."]);
        return;
      }
      const { i, j } = sortBubbleState;
      const arr = [...sortArray];
      const nextBubble = { ...sortBubbleState };
      
      // Compare elements at j and j + 1
      const compVal = sortComparesCount + 1;
      setSortComparesCount(compVal);
      setSortStats(prev => ({
        ...prev,
        bubble: { ...prev.bubble, compares: prev.bubble.compares + 1 }
      }));
      setSortCompareIndices([j, j + 1]);

      if (arr[j] > arr[j + 1]) {
        // Swap
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        setSortSwapIndices([j, j + 1]);
        const swapVal = sortSwapsCount + 1;
        setSortSwapsCount(swapVal);
        setSortStats(prev => ({
          ...prev,
          bubble: { ...prev.bubble, swaps: prev.bubble.swaps + 1 }
        }));
        setSortHistory(prev => [...prev, `Compare idx #${j} (${arr[j + 1]}) & #${j+1} (${arr[j]}) ➔ Swap executed.`]);
      } else {
        setSortSwapIndices([-1, -1]);
        setSortHistory(prev => [...prev, `Compare idx #${j} (${arr[j]}) & #${j+1} (${arr[j + 1]}) ➔ Stayed position.`]);
      }

      // Progress pointers
      let nextJ = j + 1;
      let nextI = i;
      if (nextJ >= arr.length - 1 - i) {
        nextJ = 0;
        nextI = i + 1;
      }

      if (nextI >= arr.length - 1) {
        nextBubble.sorted = true;
        setSortIsRunning(false);
        setSortCompareIndices([-1, -1]);
        setSortSwapIndices([-1, -1]);
        setSortHistory(prev => [...prev, "🏁 Bubble Sort complete! The list ordering invariant holds: Left <= Right across all items."]);
      }

      nextBubble.j = nextJ;
      nextBubble.i = nextI;
      setSortBubbleState(nextBubble);
      setSortArray(arr);

    } else if (sortActiveType === "selection") {
      if (sortSelectionState.sorted) {
        setSortIsRunning(false);
        setSortHistory(prev => [...prev, "🏁 Selection Sort complete! Array fully sorted."]);
        return;
      }
      const { i, j, minIdx } = sortSelectionState;
      const arr = [...sortArray];
      
      if (i >= arr.length - 1) {
        setSortSelectionState(prev => ({ ...prev, sorted: true }));
        setSortIsRunning(false);
        setSortCompareIndices([-1, -1]);
        setSortSwapIndices([-1, -1]);
        setSortHistory(prev => [...prev, "🏁 Selection Sort complete! Minimum markers converged."]);
        return;
      }

      setSortStats(prev => ({
        ...prev,
        selection: { ...prev.selection, compares: prev.selection.compares + 1 }
      }));
      setSortComparesCount(prev => prev + 1);
      setSortCompareIndices([j, minIdx]);

      let nextMinIdx = minIdx;
      if (arr[j] < arr[minIdx]) {
        nextMinIdx = j;
        setSortHistory(prev => [...prev, `Found smaller key: [${arr[j]}] at idx #${j} is < [${arr[minIdx]}] at idx #${minIdx}. Update min index pointer.`]);
      } else {
        setSortHistory(prev => [...prev, `Compare active target idx #${j} (${arr[j]}) vs current minimum idx #${minIdx} (${arr[minIdx]}). No update.`]);
      }

      let nextJ = j + 1;
      let nextI = i;

      if (nextJ >= arr.length) {
        // Swap i and final nextMinIdx
        if (nextMinIdx !== i) {
          const temp = arr[i];
          arr[i] = arr[nextMinIdx];
          arr[nextMinIdx] = temp;
          setSortSwapIndices([i, nextMinIdx]);
          setSortSwapsCount(prev => prev + 1);
          setSortStats(prev => ({
            ...prev,
            selection: { ...prev.selection, swaps: prev.selection.swaps + 1 }
          }));
          setSortHistory(prev => [...prev, `Pass ending: Swapped absolute min element [${arr[i]}] at idx #${nextMinIdx} to sorted front position idx #${i}.`]);
        } else {
          setSortHistory(prev => [...prev, `Pass ending: Element [${arr[i]}] was already at correct minimum index #${i}. No swap needed.`]);
        }
        nextI = i + 1;
        nextJ = nextI + 1;
        nextMinIdx = nextI;
      }

      const nextSelection = { i: nextI, j: nextJ, minIdx: nextMinIdx, sorted: nextI >= arr.length - 1 };
      if (nextSelection.sorted) {
        setSortIsRunning(false);
        setSortCompareIndices([-1, -1]);
        setSortSwapIndices([-1, -1]);
        setSortHistory(prev => [...prev, "🏁 Selection Sort complete! Minimum elements fixed in place."]);
      }
      setSortSelectionState(nextSelection);
      setSortArray(arr);

    } else if (sortActiveType === "insertion") {
      if (sortInsertionState.sorted) {
        setSortIsRunning(false);
        setSortHistory(prev => [...prev, "🏁 Insertion Sort complete! Array fully sorted."]);
        return;
      }
      const { i, j, key } = sortInsertionState;
      const arr = [...sortArray];

      if (i >= arr.length) {
        setSortInsertionState(prev => ({ ...prev, sorted: true }));
        setSortIsRunning(false);
        setSortCompareIndices([-1, -1]);
        setSortSwapIndices([-1, -1]);
        setSortHistory(prev => [...prev, "🏁 Insertion Sort complete! Shifting operations complete."]);
        return;
      }

      let nextJ = j;
      let nextI = i;
      let nextKey = key;
      let isStepSorted = false;

      setSortStats(prev => ({
        ...prev,
        insertion: { ...prev.insertion, compares: prev.insertion.compares + 1 }
      }));
      setSortComparesCount(prev => prev + 1);
      setSortCompareIndices([nextJ >= 0 ? nextJ : 0, nextJ + 1]);

      if (nextJ >= 0 && arr[nextJ] > nextKey) {
        // Shift right
        arr[nextJ + 1] = arr[nextJ];
        setSortSwapIndices([nextJ, nextJ + 1]);
        setSortSwapsCount(prev => prev + 1);
        setSortStats(prev => ({
          ...prev,
          insertion: { ...prev.insertion, swaps: prev.insertion.swaps + 1 }
        }));
        setSortHistory(prev => [...prev, `Key [${nextKey}] < [${arr[nextJ]}]: Copied item [${arr[nextJ]}] from idx #${nextJ} ➔ #${nextJ + 1}.`]);
        nextJ = nextJ - 1;
      } else {
        // Insert key back
        arr[nextJ + 1] = nextKey;
        setSortSwapIndices([nextJ + 1, nextJ + 1]);
        setSortHistory(prev => [...prev, `Inserted active Key [${nextKey}] into target index #${nextJ + 1}.`]);
        
        nextI = i + 1;
        if (nextI < arr.length) {
          nextKey = arr[nextI];
          nextJ = nextI - 1;
        } else {
          isStepSorted = true;
        }
      }

      const nextInsertion = { i: nextI, j: nextJ, key: nextKey, sorted: isStepSorted };
      if (nextInsertion.sorted) {
        setSortIsRunning(false);
        setSortCompareIndices([-1, -1]);
        setSortSwapIndices([-1, -1]);
        setSortHistory(prev => [...prev, "🏁 Insertion Sort complete! All keys nested properly."]);
      }
      setSortInsertionState(nextInsertion);
      setSortArray(arr);
    }
  };

  useEffect(() => {
    let timer: any = null;
    if (sortIsRunning) {
      timer = setInterval(() => {
        handleSortIncrementalStep();
      }, 350);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [sortIsRunning, sortArray, sortBubbleState, sortSelectionState, sortInsertionState, sortActiveType]);


  // 6. SEARCHING ALGORITHMS COMPARISON WORKFLOWS
  const handleSearchIncrementalStep = () => {
    if (searchFoundIdx !== -1 && searchFoundIdx !== -2) {
      setSearchIsActive(false);
      return;
    }

    if (searchStrategy === "linear") {
      const nextScan = searchActiveScanIdx + 1;
      if (nextScan >= searchArray.length) {
        setSearchActiveScanIdx(-1);
        setSearchFoundIdx(-2); // -2 denotes NOT FOUND
        setSearchIsActive(false);
        setSearchLogTrace(`❌ Lookup finished: Target key ${searchTarget} was not found after full linear scan of all ${searchArray.length} items.`);
        return;
      }
      
      setSearchActiveScanIdx(nextScan);
      
      const compVal = searchTotalSteps + 1;
      setSearchTotalSteps(compVal);

      if (searchArray[nextScan] === searchTarget) {
        setSearchFoundIdx(nextScan);
        setSearchIsActive(false);
        setSearchLogTrace(`🎉 Found value! Target ${searchTarget} matches element at index #${nextScan} after ${compVal} sequential checks.`);
      } else {
        setSearchLogTrace(`Linear sweep step: arr[#${nextScan}] (${searchArray[nextScan]}) is not equal to ${searchTarget}. Advance pointer.`);
      }

    } else if (searchStrategy === "binary") {
      let currentLow = searchLowIdx === -1 ? 0 : searchLowIdx;
      let currentHigh = searchHighIdx === -1 ? searchArray.length - 1 : searchHighIdx;

      if (currentLow > currentHigh) {
        setSearchFoundIdx(-2); // -2 denotes NOT FOUND
        setSearchIsActive(false);
        setSearchLogTrace(`❌ Binary Search failed: Target key ${searchTarget} does not exist. The low pointer (${currentLow}) crossed high pointer (${currentHigh}).`);
        return;
      }

      const mid = currentLow + Math.floor((currentHigh - currentLow) / 2);
      setSearchMidIdx(mid);
      
      const compVal = searchTotalSteps + 1;
      setSearchTotalSteps(compVal);

      if (searchArray[mid] === searchTarget) {
        setSearchFoundIdx(mid);
        setSearchIsActive(false);
        setSearchLogTrace(`🎉 Found value! Target ${searchTarget} matches midpoint index #${mid} exactly, after only ${compVal} boundary cuts.`);
      } else if (searchArray[mid] < searchTarget) {
        setSearchLowIdx(mid + 1);
        setSearchLogTrace(`Binary subdivision step: Mid point arr[#${mid}] (${searchArray[mid]}) < Target ${searchTarget}. Discard left boundary (indexes ${currentLow} to ${mid}). Move Low ➔ #${mid + 1}.`);
      } else {
        setSearchHighIdx(mid - 1);
        setSearchLogTrace(`Binary subdivision step: Mid point arr[#${mid}] (${searchArray[mid]}) > Target ${searchTarget}. Discard right boundary (indexes ${mid} to ${currentHigh}). Move High ➔ #${mid - 1}.`);
      }
    }
  };

  useEffect(() => {
    let timer: any = null;
    if (searchIsActive) {
      timer = setInterval(() => {
        handleSearchIncrementalStep();
      }, 800);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [searchIsActive, searchLowIdx, searchHighIdx, searchMidIdx, searchActiveScanIdx, searchStrategy, searchArray, searchTarget, searchFoundIdx, searchTotalSteps]);

  const triggerSearchEvaluation = () => {
    if (searchStrategy === "binary") {
      setSearchLowIdx(0);
      setSearchHighIdx(searchArray.length - 1);
    } else {
      setSearchLowIdx(-1);
      setSearchHighIdx(-1);
    }
    setSearchMidIdx(-1);
    setSearchActiveScanIdx(-1);
    setSearchFoundIdx(-1);
    setSearchTotalSteps(0);
    setSearchIsActive(true);
    setSearchLogTrace(`Spawning active search trace. Selected strategy: ${searchStrategy.toUpperCase()} for Target Value: ${searchTarget}...`);
  };

  const seedNewSearchTarget = (val: number) => {
    setSearchTarget(val);
    setSearchLowIdx(-1);
    setSearchHighIdx(-1);
    setSearchMidIdx(-1);
    setSearchActiveScanIdx(-1);
    setSearchFoundIdx(-1);
    setSearchTotalSteps(0);
    setSearchIsActive(false);
    setSearchLogTrace(`Selected target query value: ${val}. Click 'Launch Search Trace' to visualize.`);
  };


  // QUIZ SELECTION AND SYSTEM
  const handleQuizAnswer = (qId: string, selection: string) => {
    setQuizAnswered(prev => ({
      ...prev,
      [qId]: selection
    }));
  };

  const evaluateQuizScore = () => {
    const correctKeys: Record<string, string> = {
      "q1": "LIFO",
      "q2": "In-Order",
      "q3": "Pre-sorted items insertion",
      "q4": "Rehash and double capacity"
    };

    let total = 0;
    let questionsAnsweredCount = 0;
    Object.keys(correctKeys).forEach(k => {
      if (quizAnswered[k]) questionsAnsweredCount++;
      if (quizAnswered[k] === correctKeys[k]) {
        total++;
      }
    });

    if (questionsAnsweredCount < 4) {
      setQuizAlert("Incomplete parameters: Answer all four interactive checkpoint inputs first!");
      return;
    }

    setQuizScore(total);
    setQuizAlert(`Review finished! score: ${total}/4 correct answers mapped safely.`);
  };


  return (
    <div className="min-h-screen bg-[#070b13] text-slate-100 flex flex-col font-sans selection:bg-blue-500/30 selection:text-white custom-grid-bg">
      
      {/* PROFESSIONAL SCHOLASTIC HEADER & CRADLE BRANDING */}
      <header className="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md px-6 py-4 sticky top-0 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          
          {/* Logo Title Section */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 via-[#14b8a6] to-amber-500 flex items-center justify-center shadow-lg shadow-blue-500/10">
              <span className="font-display font-bold text-white text-xl">8K</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono tracking-widest bg-blue-500/10 border border-blue-500/20 text-blue-400 font-bold uppercase">
                  ACM Academic Standard
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <h1 className="text-2xl font-display font-extrabold tracking-tight text-white flex items-center gap-2">
                CS EduVisuals <span className="text-sm font-light text-slate-400 font-sans border-l border-slate-700 pl-2">Computer science and engineering</span>
              </h1>
            </div>
          </div>

          {/* SURLA DARNI SREE INTERN BADGE */}
          <div className="flex items-center gap-4 bg-slate-950/80 border border-slate-800 rounded-xl p-3 shadow-inner hover:border-slate-700/80 transition-all group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-teal-500 flex items-center justify-center text-white font-display font-medium shadow-md">
              SD
            </div>
            <div className="text-left text-xs">
              <div className="flex items-center gap-1">
                <p className="font-semibold text-white tracking-wide font-display group-hover:text-cyan-300 transition-colors">
                  Surla Darni Sree
                </p>
                <span className="px-1.5 py-0.2 text-[8px] bg-[#14b8a6]/10 text-teal-400 border border-[#14b8a6]/20 rounded font-mono uppercase">
                  Intern
                </span>
              </div>
              <p className="text-slate-400 font-mono text-[10px]">Student @ Raghu Engineering College</p>
              <p className="text-[#14b8a6] font-mono text-[9px] font-medium flex items-center gap-1">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#14b8a6]" />
                Intern @ Indian Servers
              </p>
            </div>
          </div>

        </div>
      </header>

      {/* SUBTOPICS DIRECTORY PANEL (TOP SLIDER BAR WITH GRAPHICS) */}
      <nav className="bg-slate-950/40 border-b border-slate-800/50 py-3 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-2 md:gap-4 justify-center">
          {CSInfographicsDataset.map((topic) => {
            const isSelected = selectedTopicId === topic.id;
            return (
              <button
                key={topic.id}
                onClick={() => setSelectedTopicId(topic.id)}
                className={`relative flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all font-display text-sm tracking-wide border cursor-pointer ${
                  isSelected 
                    ? "bg-slate-800/80 text-white shadow-md border-slate-700" 
                    : "bg-transparent text-slate-400 border-transparent hover:text-slate-200 hover:bg-slate-900/40"
                }`}
              >
                <div className={`p-1.5 rounded-lg ${isSelected ? topic.colorTheme.primary : 'bg-slate-900 border border-slate-800'}`}>
                  {topic.id === "stack-visualized" && <Layers size={14} />}
                  {topic.id === "tree-traversal" && <Sparkles size={14} />}
                  {topic.id === "bst-explained" && <TrendingUp size={14} />}
                  {topic.id === "hash-tables" && <BookOpen size={14} />}
                  {topic.id === "sorting-race" && <Sliders size={14} />}
                  {topic.id === "searching-comparison" && <Search size={14} />}
                </div>
                <span>{topic.title.replace(/^\d+\.\s*/, '')}</span>
                {isSelected && (
                  <motion.div 
                    layoutId="activeSubtopicIndicator" 
                    className="absolute -bottom-[13px] left-4 right-4 h-1 bg-gradient-to-r from-cyan-400 to-indigo-500 rounded-full"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* VIEW MODES CONTROLLER (Interactive vs Static Poster vs Slides vs Social Crops) */}
      <div className="bg-slate-900/30 border-b border-slate-800/40 px-6 py-3">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-xs text-slate-400 flex items-center gap-2">
            <Info size={14} className="text-blue-400" />
            <span>Switch representations for classroom presentation, printing, or interactive experimentation:</span>
          </div>
          
          <div className="flex bg-slate-950/80 p-1 rounded-xl border border-slate-800/80">
            <button
              onClick={() => setActiveViewMode("interactive")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeViewMode === "interactive" 
                  ? "bg-blue-600 text-white shadow-sm" 
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              🖥️ Simulator Hub
            </button>
            <button
              onClick={() => setActiveViewMode("poster")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeViewMode === "poster" 
                  ? "bg-teal-600 text-white shadow-sm" 
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              🗺️ 8K Printable Poster
            </button>
            <button
              onClick={() => setActiveViewMode("slides")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeViewMode === "slides" 
                  ? "bg-amber-600 text-white shadow-sm" 
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              📽️ Presentation Slides
            </button>
            <button
              onClick={() => setActiveViewMode("social")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeViewMode === "social" 
                  ? "bg-pink-600 text-white shadow-sm" 
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              🎴 Micro-Flashcards
            </button>
          </div>
        </div>
      </div>

      {/* MAIN LAYOUT GATEWAY */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-6 mb-12">
        
        {/* ========================================================================= */}
        {/* VIEW MODE 1: MASTER INTERACTIVE SIMULATOR HUB */}
        {/* ========================================================================= */}
        {activeViewMode === "interactive" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Left Console controls - Interactive visualizer */}
            <div className="lg:col-span-7 bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5 md:p-6 flex flex-col justify-between shadow-xl">
              <div>
                <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-5">
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
                    <h2 className="text-xl font-display font-bold text-white tracking-tight">
                      Sandbox Simulation Window
                    </h2>
                  </div>
                  <span className={`px-2.5 py-1 text-[11px] font-mono rounded-md border ${activeMetadata.colorTheme.badge}`}>
                    {activeMetadata.subtitle}
                  </span>
                </div>

                {/* DYNAMIC CASE: STACK SIMULATOR */}
                {selectedTopicId === "stack-visualized" && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Control Form */}
                      <div className="space-y-4">
                        <label className="block text-xs font-mono text-slate-400 uppercase tracking-widest">
                          Manipulate Call Frame
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            maxLength={8}
                            placeholder="e.g. 0xBE2F"
                            value={stackInputValue}
                            onChange={(e) => setStackInputValue(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleStackPush()}
                            className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 flex-1 font-mono"
                          />
                          <button
                            onClick={handleStackPush}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-500 transition-colors flex items-center gap-1.5 cursor-pointer"
                          >
                            <Plus size={14} /> Push
                          </button>
                        </div>

                        <div className="grid grid-cols-2 gap-2 pt-2">
                          <button
                            onClick={handleStackPop}
                            className="px-3 py-2 bg-slate-950 border border-slate-800 text-slate-300 rounded-lg text-xs font-mono hover:bg-slate-900 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <Trash size={12} /> Pop (LIFO)
                          </button>
                          <button
                            onClick={handleStackPeek}
                            className="px-3 py-2 bg-slate-950 border border-slate-800 text-slate-300 rounded-lg text-xs font-mono hover:bg-slate-900 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            Peek Top
                          </button>
                        </div>

                        <button
                          onClick={() => {
                            setStackItems([]);
                            setStackLog("Stack cleared fully. Stack pointer reset to -1.");
                            setStackError("");
                          }}
                          className="w-full py-1.5 bg-red-950/20 border border-red-500/20 text-red-400 rounded-lg text-[11px] font-mono hover:bg-red-950/40 transition-all cursor-pointer"
                        >
                          Clear Register Memory
                        </button>

                        {stackError && (
                          <div className="p-3 bg-red-950/40 border border-red-500/30 text-red-300 text-xs rounded-lg flex items-start gap-2 animate-bounce">
                            <XCircle size={14} className="mt-0.5 text-red-400 flex-shrink-0" />
                            <span>{stackError}</span>
                          </div>
                        )}
                      </div>

                      {/* Stack Visualization Columns */}
                      <div className="border border-slate-800 rounded-xl bg-slate-950/40 p-4 flex flex-col items-center justify-center min-h-[220px]">
                        <span className="text-[10px] font-mono text-slate-500 mb-2 uppercase tracking-wide">
                          Call Stack Buffer Space
                        </span>

                        <div className="w-full max-w-[180px] bg-slate-900/80 border-2 border-slate-800 rounded-xl px-2 py-4 flex flex-col-reverse gap-2 relative">
                          
                          {/* Top Pointer Indicator */}
                          <div className="absolute right-[-45px] transition-all duration-300" 
                               style={{ bottom: `${(stackItems.length * 28) + 12}px` }}>
                            {stackItems.length > 0 && (
                              <div className="flex items-center gap-1 text-[10px] font-mono text-blue-400 font-bold">
                                <span>SP ({stackItems.length - 1})</span>
                                <ArrowRight size={12} className="rotate-180 translate-x-1" />
                              </div>
                            )}
                          </div>

                          <AnimatePresence initial={false}>
                            {stackItems.length === 0 ? (
                              <div className="text-center py-6 text-slate-600 text-xs font-mono">
                                [ Empty Stack Pointer -1 ]
                              </div>
                            ) : (
                              stackItems.map((item, idx) => {
                                const isTop = idx === stackItems.length - 1;
                                return (
                                  <motion.div
                                    key={`${item}-${idx}`}
                                    initial={{ opacity: 0, y: -20, scale: 0.95 }}
                                    animate={{ 
                                      opacity: 1, 
                                      y: 0, 
                                      scale: isTop && peekHighlight ? 1.05 : 1,
                                      backgroundColor: isTop 
                                        ? "rgba(59, 130, 246, 0.2)" 
                                        : "rgba(30, 41, 59, 0.4)",
                                      borderColor: isTop && peekHighlight 
                                        ? "#60a5fa" 
                                        : isTop 
                                        ? "#3b82f6" 
                                        : "#1e293b"
                                    }}
                                    exit={{ opacity: 0, x: 50, scale: 0.9 }}
                                    transition={{ duration: 0.2 }}
                                    className="h-7 border rounded text-xs px-2 flex items-center justify-between font-mono"
                                  >
                                    <span className="text-slate-500 text-[9px]">0x{(0x7ffee31a0 + idx * 8).toString(16).toUpperCase()}</span>
                                    <span className="font-semibold text-slate-200">{item}</span>
                                    <span className="text-slate-500 text-[10px] bg-slate-950 px-1 rounded">Idx:{idx}</span>
                                  </motion.div>
                                );
                              })
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    </div>

                    {/* Shunting Yard Dijkstra 2-Stack simulation */}
                    <div className="border border-slate-800/80 rounded-xl p-4 bg-slate-950/60 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-300 uppercase tracking-wide font-display">
                          Dijkstra 2-Stack Evaluation Engine
                        </span>
                        <span className="text-[10px] font-mono text-emerald-400">MATH PARSER DEMO</span>
                      </div>
                      <p className="text-xs text-slate-400">
                        Compilers evaluate arithmetic nested operations like <strong className="text-white font-mono">(3 + 5) * 2</strong> using two separate LIFO stacks: a **Value Stack** and an **Operator Stack**.
                      </p>

                      <div className="flex flex-wrap items-center gap-1 pb-2">
                        {shuntingYardStacks.expr.map((char, i) => {
                          // Compute highlight states based on step
                          let active = false;
                          if (shuntingYardStep >= 0 && i <= shuntingYardStep) active = true;
                          return (
                            <span 
                              key={i} 
                              className={`px-2 py-1 rounded text-xs font-mono font-bold border transition-all ${
                                active 
                                  ? "bg-blue-600/20 text-blue-300 border-blue-500" 
                                  : "bg-slate-900 text-slate-500 border-slate-800"
                              }`}
                            >
                              {char}
                            </span>
                          );
                        })}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg">
                          <span className="text-[10px] font-mono text-blue-400 uppercase tracking-wider block mb-1">
                            Values Stack:
                          </span>
                          <div className="flex gap-1 h-8 items-center flex-wrap-reverse">
                            {shuntingYardStacks.nums.length === 0 ? (
                              <span className="text-[10px] text-slate-600 font-mono">[Empty]</span>
                            ) : (
                              shuntingYardStacks.nums.map((n, idx) => (
                                <span key={idx} className="bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs px-2 py-0.5 rounded font-mono font-bold">
                                  {n}
                                </span>
                              ))
                            )}
                          </div>
                        </div>

                        <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg">
                          <span className="text-[10px] font-mono text-[#14b8a6] uppercase tracking-wider block mb-1">
                            Operators Stack:
                          </span>
                          <div className="flex gap-1 h-8 items-center flex-wrap-reverse">
                            {shuntingYardStacks.ops.length === 0 ? (
                              <span className="text-[10px] text-slate-600 font-mono">[Empty]</span>
                            ) : (
                              shuntingYardStacks.ops.map((o, idx) => (
                                <span key={idx} className="bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs px-2 py-0.5 rounded font-mono font-bold">
                                  {o}
                                </span>
                              ))
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between items-center bg-[#070b13] p-3 rounded-lg border border-slate-800/80">
                        <p className="text-xs font-mono text-slate-400 max-w-[80%]">
                          {shuntingYardStacks.log}
                        </p>
                        <button
                          onClick={traverseShuntingYard}
                          className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded text-xs font-semibold cursor-pointer"
                        >
                          Step Action »
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* DYNAMIC CASE: TREE TRAVERSAL TECHNIQUE SIMULATOR */}
                {selectedTopicId === "tree-traversal" && (
                  <div className="space-y-6">
                    <div className="bg-slate-950 p-4 border border-slate-800/80 rounded-xl flex flex-col items-center relative">
                      <span className="text-[10px] text-slate-500 font-mono self-start mb-2 uppercase tracking-wide">
                        Dynamic Binary Tree Memory Layout
                      </span>

                      {/* Render Visual Vector Binary Tree Graph */}
                      <div className="w-full max-w-[400px] h-[190px] relative mt-4">
                        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                          {/* Lines connecting Root (50, 15) to Children (30, 40) and (70, 40) */}
                          <line x1="50%" y1="15%" x2="28%" y2="40%" stroke="#334155" strokeWidth="2" />
                          <line x1="50%" y1="15%" x2="72%" y2="40%" stroke="#334155" strokeWidth="2" />

                          {/* Lines from 30 to (15, 68) and (40, 68) */}
                          <line x1="28%" y1="40%" x2="15%" y2="68%" stroke="#334155" strokeWidth="2" />
                          <line x1="28%" y1="40%" x2="38%" y2="68%" stroke="#334155" strokeWidth="2" />

                          {/* Lines from 70 to (62, 68) and (85, 68) */}
                          <line x1="72%" y1="40%" x2="62%" y2="68%" stroke="#334155" strokeWidth="2" />
                          <line x1="72%" y1="40%" x2="85%" y2="68%" stroke="#334155" strokeWidth="2" />
                        </svg>

                        {/* Nodes placements */}
                        {[
                          { id: "50", val: 50, x: "left-[50%]", translate: "-translate-x-1/2", y: "top-[15%]" },
                          { id: "30", val: 30, x: "left-[28%]", translate: "-translate-x-1/2", y: "top-[40%]" },
                          { id: "70", val: 70, x: "left-[72%]", translate: "-translate-x-1/2", y: "top-[40%]" },
                          { id: "15", val: 15, x: "left-[15%]", translate: "-translate-x-1/2", y: "top-[68%]" },
                          { id: "40", val: 40, x: "left-[38%]", translate: "-translate-x-1/2", y: "top-[68%]" },
                          { id: "62", val: 62, x: "left-[62%]", translate: "-translate-x-1/2", y: "top-[68%]" },
                          { id: "85", val: 85, x: "left-[85%]", translate: "-translate-x-1/2", y: "top-[68%]" },
                        ].map((node) => {
                          const isVisited = traversalSequence.includes(node.id);
                          const isVisiting = activeVisitingNode === node.id;
                          return (
                            <div
                              key={node.id}
                              className={`absolute ${node.y} ${node.x} ${node.translate} w-10 h-10 rounded-full flex items-center justify-center font-display font-bold text-xs border-2 transition-all duration-300 z-10 ${
                                isVisiting 
                                  ? "bg-teal-500 border-white text-slate-950 scale-125 shadow-lg shadow-teal-500/50 animate-pulse" 
                                  : isVisited 
                                  ? "bg-[#14b8a6]/30 border-[#14b8a6] text-teal-300" 
                                  : "bg-slate-900 border-slate-700 text-slate-400"
                              }`}
                            >
                              {node.val}
                            </div>
                          );
                        })}
                      </div>

                      {/* Interactive Controls Bar */}
                      <div className="w-full mt-6 flex flex-wrap gap-2 justify-between items-center border-t border-slate-800/80 pt-4">
                        <div className="flex gap-2">
                          {["preorder", "inorder", "postorder", "levelorder"].map((strat) => (
                            <button
                              key={strat}
                              disabled={traversalPlaying}
                              onClick={() => {
                                setTraversalSelectedType(strat as any);
                                setTraversalSequence([]);
                              }}
                              className={`px-2.5 py-1 rounded text-xs px-2 cursor-pointer capitalize font-mono border ${
                                traversalSelectedType === strat 
                                  ? "bg-teal-500/10 border-teal-500 text-teal-400" 
                                  : "bg-slate-900 border-slate-800 text-slate-500"
                              }`}
                            >
                              {strat === "levelorder" ? "BFS Level-Order" : strat}
                            </button>
                          ))}
                        </div>

                        <button
                          onClick={executeTraversalWalk}
                          className="px-4 py-2 bg-teal-500 text-slate-950 hover:bg-teal-400 font-bold rounded-lg text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                        >
                          {traversalPlaying ? (
                            <>
                              <RotateCcw size={14} className="animate-spin" /> Stop Walk
                            </>
                          ) : (
                            <>
                              <Play size={14} /> Play Walk Animation
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Step-by-Step Traversal Output Sequence */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                        <span className="text-[10px] text-slate-400 font-mono uppercase tracking-widest block">
                          Output Visited Index Sequence:
                        </span>
                        <div className="flex items-center gap-1.5 min-h-[44px] bg-[#070b13] p-2 rounded-lg border border-slate-800/80 flex-wrap">
                          {traversalSequence.length === 0 ? (
                            <span className="text-[10px] text-slate-600 font-mono">No nodes visited yet. Play animation walk.</span>
                          ) : (
                            traversalSequence.map((val, idx) => (
                              <React.Fragment key={idx}>
                                <span className="bg-teal-500/10 border border-teal-500/40 text-teal-300 px-2.5 py-1 rounded font-display font-extrabold text-sm shadow-sm animate-scale-up">
                                  {val}
                                </span>
                                {idx < traversalSequence.length - 1 && (
                                  <ArrowRight size={12} className="text-slate-600" />
                                )}
                              </React.Fragment>
                            ))
                          )}
                        </div>
                      </div>

                      {/* Recursive call stack simulation */}
                      <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                        <span className="text-[10px] text-teal-400 font-mono uppercase tracking-widest block">
                          Recursive Activation Record Call Stack:
                        </span>
                        <div className="flex flex-col-reverse justify-end gap-1 min-h-[44px] bg-[#070b13] p-2 rounded-lg border border-slate-800/80">
                          {traversalCallStack.length === 0 ? (
                            <span className="text-[10px] text-slate-600 font-mono">[0x00]: Thread suspended</span>
                          ) : (
                            traversalCallStack.map((frame, i) => (
                              <div key={i} className={`h-6 border-b border-teal-500/20 px-2 flex items-center justify-between text-[11px] font-mono ${i === traversalCallStack.length - 1 ? 'text-white font-bold bg-teal-500/10' : 'text-slate-400'}`}>
                                <span>{frame}</span>
                                <span className="text-[9px] text-slate-500">[Nest Level: {i}]</span>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* DYNAMIC CASE: BINARY SEARCH TREE SIMULATOR */}
                {selectedTopicId === "bst-explained" && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                      
                      {/* Left Side: Controls Form */}
                      <div className="md:col-span-5 space-y-4">
                        {/* Insert key */}
                        <div className="space-y-2 p-3.5 bg-slate-950 border border-slate-800 rounded-xl">
                          <label className="block text-xs font-mono text-amber-400 uppercase tracking-widest">
                            Add BST coordinate pointer
                          </label>
                          <div className="flex gap-2">
                            <input
                              type="number"
                              min={1}
                              max={99}
                              placeholder="e.g. 45"
                              value={bstInsertValue}
                              onChange={(e) => setBstInsertValue(e.target.value)}
                              className="bg-slate-900 border border-slate-800 rounded px-2.5 py-1 text-sm focus:outline-none focus:border-amber-500 flex-grow font-mono"
                            />
                            <button
                              onClick={handleBstInsert}
                              className="px-3 bg-amber-500 text-slate-950 hover:bg-amber-400 font-bold rounded-lg text-xs cursor-pointer flex items-center gap-1"
                            >
                              <Plus size={14} /> Insert
                            </button>
                          </div>
                        </div>

                        {/* Search key */}
                        <div className="space-y-2 p-3.5 bg-slate-950 border border-slate-800 rounded-xl">
                          <label className="block text-xs font-mono text-cyan-400 uppercase tracking-widest">
                            Query Search path
                          </label>
                          <div className="flex gap-2">
                            <input
                              type="number"
                              min={1}
                              max={99}
                              placeholder="e.g. 15"
                              value={bstSearchValue}
                              onChange={(e) => setBstSearchValue(e.target.value)}
                              className="bg-slate-900 border border-slate-800 rounded px-2.5 py-1 text-sm focus:outline-none focus:border-cyan-500 flex-grow font-mono"
                            />
                            <button
                              onClick={executeBstSearch}
                              className="px-3 bg-cyan-600 text-white hover:bg-cyan-500 font-bold rounded-lg text-xs cursor-pointer flex items-center gap-1"
                            >
                              <Search size={14} /> Search
                            </button>
                          </div>
                          {bstSearchTarget && (
                            <div className="pt-2 flex items-center gap-2 text-xs">
                              <span className="text-slate-400">Result for target {bstSearchTarget}:</span>
                              {bstSearchFound ? (
                                <span className="text-emerald-400 font-bold flex items-center gap-1">
                                  <CheckCircle2 size={12} /> Found!
                                </span>
                              ) : (
                                <span className="text-red-400 font-bold flex items-center gap-1">
                                  <XCircle size={12} /> Missing
                                </span>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Skew triggers */}
                        <div className="space-y-2 p-3 bg-slate-950 border border-slate-800 rounded-xl">
                          <span className="block text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-1">
                            Balance Path Threat Checks
                          </span>
                          <div className="grid grid-cols-2 gap-2">
                            <button
                              onClick={triggerSkewedShape}
                              className={`py-1.5 px-2 border rounded-lg text-xs cursor-pointer font-mono ${isBstSkewed ? 'bg-red-500/10 border-red-500 text-red-400' : 'bg-transparent border-slate-800 text-slate-400 hover:text-slate-200'}`}
                            >
                              Skew Tree (O(N))
                            </button>
                            <button
                              onClick={resetBstStructure}
                              className="py-1.5 px-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg text-xs cursor-pointer text-slate-200 font-mono"
                            >
                              Reset Balanced
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Right Side: Tree Space Renderer */}
                      <div className="md:col-span-7 border border-slate-800 bg-slate-950 p-4 rounded-2xl flex flex-col justify-between min-h-[260px]">
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wide">
                              {isBstSkewed ? 'Skewer Linked List Degenerate Representation' : 'Dynamic BST Memory Node Mapping'}
                            </span>
                            <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-amber-500/10 text-amber-400 border border-amber-500/20">
                              Average: O(log N)
                            </span>
                          </div>

                          {isBstSkewed ? (
                            /* Skewed Degenerate Visual Sequence representing linear linked list BST */
                            <div className="flex flex-col items-center py-4 space-y-3">
                              {[10, 20, 30, 40, 50].map((val, i) => {
                                const idStr = val.toString();
                                const isSearched = bstSearchPath.includes(idStr);
                                const isTarget = bstSearchTarget === idStr;
                                return (
                                  <div key={val} className="flex flex-col items-center">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-display font-black text-xs border-2 duration-300 ${
                                      isTarget && bstSearchFound
                                        ? "bg-emerald-500 border-white text-slate-950 scale-110 shadow-lg shadow-emerald-500/30"
                                        : isSearched 
                                        ? "bg-cyan-500/20 border-cyan-400 text-cyan-300"
                                        : "bg-slate-900 border-slate-800 text-slate-400"
                                    }`}>
                                      {val}
                                    </div>
                                    {i < 4 && (
                                      <div className="w-0.5 h-4 bg-slate-800 flex items-center justify-center">
                                        <div className="w-1 h-1 bg-slate-700 rounded-full" />
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          ) : (
                            /* Normal Binary Tree Representation */
                            <div className="w-full h-[220px] relative mt-4">
                              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                                {bstNodes.map(node => {
                                  if (node.parent === null) return null;
                                  const parentNode = bstNodes.find(n => n.id === node.parent);
                                  if (!parentNode) return null;
                                  // Draw line from parent coordinates to node coordinates
                                  return (
                                    <line
                                      key={`line-${node.id}`}
                                      x1={`${parentNode.x}%`}
                                      y1={`${parentNode.y}%`}
                                      x2={`${node.x}%`}
                                      y2={`${node.y}%`}
                                      stroke="#334155"
                                      strokeWidth="2"
                                    />
                                  );
                                })}
                              </svg>

                              {bstNodes.map(node => {
                                const isSearched = bstSearchPath.includes(node.id);
                                const isTarget = bstSearchTarget === node.id;
                                let nodeColorClass = "bg-[#070b13] border-slate-700 text-slate-400";
                                
                                if (isTarget) {
                                  nodeColorClass = bstSearchFound 
                                    ? "bg-emerald-500 border-white text-slate-950 scale-115 ring-4 ring-emerald-500/20" 
                                    : "bg-red-500 border-white text-white scale-115";
                                } else if (isSearched) {
                                  nodeColorClass = "bg-amber-500/20 border-amber-500 text-amber-300";
                                }

                                return (
                                  <div
                                    key={node.id}
                                    className={`absolute w-9 h-9 rounded-full flex items-center justify-center text-xs font-display font-extrabold border-2 duration-300 -translate-x-1/2 -translate-y-1/2 z-10 ${nodeColorClass}`}
                                    style={{ left: `${node.x}%`, top: `${node.y}%` }}
                                  >
                                    {node.value}
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      </div>

                    </div>
                  </div>
                )}

                {/* DYNAMIC CASE: HASH TABLES SIMPLIFIED */}
                {selectedTopicId === "hash-tables" && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                      
                      {/* Control Panel inputs */}
                      <div className="md:col-span-5 space-y-4">
                        <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
                          <span className="block text-xs font-mono text-pink-400 uppercase tracking-widest">
                            Add Association Node Key-Value
                          </span>

                          <div className="space-y-2">
                            <label className="block text-[10px] text-slate-400 font-mono">Key Segment string:</label>
                            <input
                              type="text"
                              maxLength={12}
                              placeholder="e.g. Sree"
                              value={hashKey}
                              onChange={(e) => setHashKey(e.target.value)}
                              className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-xs focus:outline-none focus:border-pink-500 font-mono"
                            />
                          </div>

                          <div className="space-y-2">
                            <label className="block text-[10px] text-slate-400 font-mono">Payload data:</label>
                            <input
                              type="text"
                              maxLength={12}
                              value={hashVal}
                              onChange={(e) => setHashVal(e.target.value)}
                              placeholder="e.g. Score 99"
                              className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-xs focus:outline-none focus:border-pink-500 font-mono"
                            />
                          </div>

                          <button
                            onClick={handleHashInsert}
                            className="w-full py-2 bg-pink-600 hover:bg-pink-500 text-white rounded text-xs font-bold cursor-pointer"
                          >
                            Hash Map Record
                          </button>

                          <button
                            onClick={clearHashSimulation}
                            className="w-full py-1.5 bg-transparent hover:bg-slate-900 border border-slate-800 text-slate-400 rounded text-[10px] font-mono cursor-pointer"
                          >
                            Reset Table Slots
                          </button>
                        </div>

                        {/* Hashing steps animation flow */}
                        {hashAnimateKey && (
                          <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg space-y-2 animate-scale-up">
                            <div className="flex justify-between text-[10px] font-mono">
                              <span className="text-slate-400">HASH CALCULATOR TRACE:</span>
                              <span className="text-slate-500">Key: '{hashAnimateKey.name}'</span>
                            </div>
                            
                            {hashAnimateKey.step === 0 && (
                              <p className="text-[11px] font-mono text-slate-300">
                                Step 1: Accumulate Polynomial Char Weights...
                                <br />
                                <span className="text-indigo-400">{hashAnimateKey.characters.join(" + ")}</span>
                              </p>
                            )}
                            
                            {hashAnimateKey.step === 1 && (
                              <p className="text-[11px] font-mono text-slate-300">
                                Step 2: Summed Hash Key Value = <strong className="text-pink-400">{hashAnimateKey.asciiSum}</strong>.
                              </p>
                            )}

                            {hashAnimateKey.step === 2 && (
                              <p className="text-[11px] font-mono text-slate-300">
                                Step 3: Modulo size mapping: 
                                <br />
                                <span className="text-yellow-400">{hashAnimateKey.asciiSum} % 8 (Modulo Compression) = index {hashAnimateKey.modulo}</span>
                              </p>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Right side: Buckets and separate chaining lists */}
                      <div className="md:col-span-7 bg-slate-950 border border-slate-800 rounded-2xl p-4">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-[10px] text-slate-550 font-mono uppercase tracking-wide">
                            Array Slots (Modulo Buckets capacity 8)
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono text-slate-400">Load Factor:</span>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${getHashLoadFactor() >= 0.75 ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-emerald-500/10 text-emerald-400'}`}>
                              {getHashLoadFactor().toFixed(2)}
                            </span>
                          </div>
                        </div>

                        {getHashLoadFactor() >= 0.75 && (
                          <div className="mb-3 p-2 bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[10px] rounded font-mono animate-pulse">
                            ⚠️ ALERT: Load factor exceeded optimal 0.75 threshold. Dynamic re-mapping (Rehashing) recommended to prevent collision searches!
                          </div>
                        )}

                        <div className="space-y-1.5">
                          {hashBuckets.map((bucket, bucketIdx) => {
                            const isSlotTarget = hashAnimateKey && hashAnimateKey.step === 2 && hashAnimateKey.modulo === bucketIdx;
                            return (
                              <div 
                                key={bucketIdx}
                                className={`flex items-stretch border rounded-lg overflow-hidden transition-all duration-300 ${isSlotTarget ? 'border-pink-500 bg-[#ec4899]/5' : 'border-slate-850 bg-[#070b13]'}`}
                              >
                                {/* Bucket slot ID */}
                                <div className="w-12 bg-slate-900 flex items-center justify-center font-mono font-bold text-xs text-slate-500 border-r border-slate-800">
                                  #{bucketIdx}
                                </div>

                                {/* Chaining list items visualization */}
                                <div className="flex items-center gap-2 p-1.5 flex-1 flex-wrap">
                                  {bucket.length === 0 ? (
                                    <span className="text-[10px] text-slate-700 font-mono">0x{bucketIdx.toString(16).toUpperCase()}8F: [Null Pointer]</span>
                                  ) : (
                                    bucket.map((node, nodeIdx) => (
                                      <div key={nodeIdx} className="flex items-center gap-1.5">
                                        <div className="p-1 px-2 border border-[#ec4899]/30 bg-pink-500/5 hover:bg-pink-500/10 transition-colors text-white rounded text-[10px] font-mono flex items-center gap-1.5 max-w-[170px]">
                                          <span className="font-extrabold text-pink-400">{node.key}</span>
                                          <span className="text-slate-500">→</span>
                                          <span className="text-slate-300 font-light truncate">{node.val}</span>
                                        </div>
                                        {nodeIdx < bucket.length - 1 && (
                                          <span className="text-slate-600 font-mono text-[10px] flex items-center justify-center pointer-events-none">→ Pointer</span>
                                        )}
                                      </div>
                                    ))
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                    </div>
                  </div>
                )}

                {/* DYNAMIC CASE: SORTING ALGORITHMS RACE */}
                {selectedTopicId === "sorting-race" && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                      
                      {/* Left side controller */}
                      <div className="lg:col-span-4 space-y-4">
                        <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
                          <span className="block text-xs font-mono text-orange-400 uppercase tracking-widest">
                            Race Controls & Seed Setup
                          </span>

                          <div className="space-y-2">
                            <label className="block text-[10px] text-slate-400 font-mono">Algorithm Profile:</label>
                            <div className="grid grid-cols-3 gap-1">
                              {(["bubble", "selection", "insertion"] as const).map((algo) => (
                                <button
                                  key={algo}
                                  onClick={() => {
                                    setSortActiveType(algo);
                                    setSortIsRunning(false);
                                    setSortCompareIndices([-1, -1]);
                                    setSortSwapIndices([-1, -1]);
                                    setSortHistory([`Selected ${algo.toUpperCase()} algorithm profile. Resetting step markers. j=0, i=0.`]);
                                  }}
                                  className={`py-1.5 rounded text-[10px] uppercase font-mono font-bold cursor-pointer transition-colors border ${
                                    sortActiveType === algo 
                                      ? 'bg-orange-500 border-orange-400 text-slate-950' 
                                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                                  }`}
                                >
                                  {algo}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-2 pt-2">
                            <button
                              onClick={() => {
                                handleSortIncrementalStep();
                              }}
                              disabled={sortIsRunning}
                              className="py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded text-xs font-bold font-mono cursor-pointer disabled:opacity-50 text-slate-200 flex items-center justify-center gap-1"
                            >
                              <ArrowUpDown size={12} /> Step Pass
                            </button>
                            <button
                              onClick={() => {
                                setSortIsRunning(!sortIsRunning);
                              }}
                              className={`py-2 rounded text-xs font-bold cursor-pointer transition-colors flex items-center justify-center gap-1 ${
                                sortIsRunning 
                                  ? 'bg-red-650 hover:bg-red-500 text-white' 
                                  : 'bg-orange-500 hover:bg-orange-400 text-slate-950'
                              }`}
                            >
                              {sortIsRunning ? (
                                <>
                                  <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                                  Pause
                                </>
                              ) : (
                                <>
                                  <Play size={12} /> Automate
                                </>
                              )}
                            </button>
                          </div>

                          <div className="grid grid-cols-2 gap-2 pt-1">
                            <button
                              onClick={seedRandomSortArray}
                              className="w-full py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-350 rounded text-[10px] font-mono cursor-pointer flex items-center justify-center gap-1"
                            >
                              <Shuffle size={10} /> Seed Random
                            </button>
                            <button
                              onClick={() => {
                                const original = [48, 12, 85, 34, 5, 23, 62, 51];
                                setSortArray(original);
                                setSortCompareIndices([-1, -1]);
                                setSortSwapIndices([-1, -1]);
                                setSortComparesCount(0);
                                setSortSwapsCount(0);
                                setSortIsRunning(false);
                                setSortHistory(["Restored initial academic dataset [48, 12, 85, 34, 5, 23, 62, 51]. Ready."]);
                                setSortBubbleState({ i: 0, j: 0, sorted: false });
                                setSortSelectionState({ i: 0, j: 1, minIdx: 0, sorted: false });
                                setSortInsertionState({ i: 1, j: 0, key: 12, sorted: false });
                              }}
                              className="w-full py-1.5 bg-transparent hover:bg-slate-900 border border-slate-800 text-slate-400 rounded text-[10px] font-mono cursor-pointer flex items-center justify-center gap-1"
                            >
                              <RotateCcw size={10} /> Set Default
                            </button>
                          </div>
                        </div>

                        {/* Real-time Counter Stats Panel */}
                        <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2.5">
                          <span className="block text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                            Race Statistics (Real-time Operations count)
                          </span>
                          <div className="grid grid-cols-2 gap-2 text-center">
                            <div className="p-2 bg-slate-900 border border-slate-850 rounded-lg">
                              <span className="text-[10px] text-slate-500 block">Comparisons:</span>
                              <span className="text-xl font-display font-black text-orange-400">{sortComparesCount}</span>
                            </div>
                            <div className="p-2 bg-slate-900 border border-slate-850 rounded-lg">
                              <span className="text-[10px] text-slate-500 block">Swaps/Shifts:</span>
                              <span className="text-xl font-display font-black text-amber-500">{sortSwapsCount}</span>
                            </div>
                          </div>

                          {/* Historical Race Ledger */}
                          <div className="pt-2 border-t border-slate-900 space-y-1">
                            <span className="block text-[9px] text-slate-500 uppercase tracking-wider font-mono">Algorithm Scoreboard:</span>
                            <div className="space-y-1 text-xs font-mono text-slate-300">
                              <div className="flex justify-between items-center bg-[#070b13] p-1 px-2.5 rounded border border-slate-900">
                                <span className="text-[10px]">Bubble Sort:</span>
                                <span>C: {sortStats.bubble.compares} | S: {sortStats.bubble.swaps}</span>
                              </div>
                              <div className="flex justify-between items-center bg-[#070b13] p-1 px-2.5 rounded border border-slate-900">
                                <span className="text-[10px]">Selection Sort:</span>
                                <span>C: {sortStats.selection.compares} | S: {sortStats.selection.swaps}</span>
                              </div>
                              <div className="flex justify-between items-center bg-[#070b13] p-1 px-2.5 rounded border border-slate-900">
                                <span className="text-[10px]">Insertion Sort:</span>
                                <span>C: {sortStats.insertion.compares} | S: {sortStats.insertion.swaps}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right side visual bar chart bars list */}
                      <div className="lg:col-span-8 bg-slate-950 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between min-h-[300px]">
                        <div>
                          <div className="flex justify-between items-center mb-4">
                            <span className="text-[10px] text-slate-550 font-mono uppercase tracking-wide">
                              Graphical Array State Bar Chart
                            </span>
                            <div className="flex items-center gap-3 text-[10px] font-mono">
                              <span className="flex items-center gap-1 text-slate-400">
                                <span className="w-2.5 h-2.5 rounded bg-orange-400 inline-block border border-orange-300/40" /> comparing
                              </span>
                              <span className="flex items-center gap-1 text-slate-400">
                                <span className="w-2.5 h-2.5 rounded bg-amber-500 inline-block border border-amber-400/40" /> swapping/shifted
                              </span>
                            </div>
                          </div>

                          {/* Bar Heights Visualizers */}
                          <div className="flex items-end justify-between h-[180px] bg-[#070b13]/80 border border-slate-900 rounded-xl p-4 md:p-6 gap-2">
                            {sortArray.map((val, idx) => {
                              const isComparing = sortCompareIndices.includes(idx);
                              const isSwapping = sortSwapIndices.includes(idx);
                              
                              let barBg = "bg-slate-800 border-slate-700 hover:bg-slate-750";
                              let labelClass = "text-slate-450";
                              if (isSwapping) {
                                barBg = "bg-gradient-to-t from-amber-600 to-amber-400 border-amber-300 shadow-md shadow-amber-500/10";
                                labelClass = "text-amber-400 font-bold";
                              } else if (isComparing) {
                                barBg = "bg-gradient-to-t from-orange-600 to-orange-400 border-orange-300 shadow-md shadow-orange-500/10";
                                labelClass = "text-orange-400 font-bold";
                              }

                              return (
                                <div key={idx} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                                  {/* Value bubble inside/above bar */}
                                  <span className={`text-xs font-mono transition-all duration-300 ${labelClass}`}>
                                    {val}
                                  </span>

                                  {/* Bar column */}
                                  <div 
                                    className={`w-full rounded-t-lg transition-all duration-350 border-t border-x ${barBg}`}
                                    style={{ height: `${(val / 100) * 120 + 10}px` }}
                                  />

                                  {/* Item index */}
                                  <span className="text-[10px] font-mono text-slate-600">
                                    #{idx}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Interactive state descriptor labels */}
                        <div className="pt-3 border-t border-slate-900 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs leading-relaxed text-slate-400">
                          <div>
                            <span className="font-bold text-slate-350 font-mono text-[10px] tracking-wide block uppercase">ACTIVE POINTERS:</span>
                            {sortActiveType === "bubble" && (
                              <p className="font-mono text-[11px] text-slate-400">
                                Outer bubble loop <code>i = {sortBubbleState.i}</code>, Inner scanning <code>j = {sortBubbleState.j}</code>
                              </p>
                            )}
                            {sortActiveType === "selection" && (
                              <p className="font-mono text-[11px] text-slate-400">
                                Sorted boundary <code>i = {sortSelectionState.i}</code>, Scanning active <code>j = {sortSelectionState.j}</code>, Minimum index pointer <code>minIdx = {sortSelectionState.minIdx}</code>
                              </p>
                            )}
                            {sortActiveType === "insertion" && (
                              <p className="font-mono text-[11px] text-slate-400">
                                Unsorted target <code>i = {sortInsertionState.i}</code>, Sorting back pointer <code>j = {sortInsertionState.j}</code>, Active element key <code>key = {sortInsertionState.key}</code>
                              </p>
                            )}
                          </div>
                          <div>
                            <span className="font-bold text-slate-350 font-mono text-[10px] tracking-wide block uppercase">MATRICULATED COMPLEXITY:</span>
                            <span className="text-[11px] font-mono bg-slate-950 text-slate-405 rounded p-1 px-2 border border-slate-900 inline-block mt-0.5 animate-scale-up">
                              {sortActiveType === "bubble" && "Average: O(N²) quadratic comparisons | Space: O(1)"}
                              {sortActiveType === "selection" && "Matches ALWAYS exactly O(N²) comparisons | Space: O(1)"}
                              {sortActiveType === "insertion" && "Best: O(N) linear for preordered list | Space: O(1)"}
                            </span>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                )}

                {/* DYNAMIC CASE: SEARCHING ALGORITHMS COMPARISON */}
                {selectedTopicId === "searching-comparison" && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                      
                      {/* Left Side Lookup Controller */}
                      <div className="lg:col-span-4 space-y-4">
                        <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
                          <span className="block text-xs font-mono text-cyan-400 uppercase tracking-widest">
                            Search Setup Parameters
                          </span>

                          <div className="space-y-2">
                            <label className="block text-[10px] text-slate-400 font-mono">Strategy Blueprint:</label>
                            <div className="grid grid-cols-2 gap-2">
                              {(["linear", "binary"] as const).map((strat) => (
                                <button
                                  key={strat}
                                  onClick={() => {
                                    setSearchStrategy(strat);
                                    setSearchLowIdx(-1);
                                    setSearchHighIdx(-1);
                                    setSearchMidIdx(-1);
                                    setSearchActiveScanIdx(-1);
                                    setSearchFoundIdx(-1);
                                    setSearchTotalSteps(0);
                                    setSearchIsActive(false);
                                    setSearchLogTrace(`Swapped strategy to ${strat.toUpperCase()}. Boundaries and pointers reset.`);
                                  }}
                                  className={`py-1.5 rounded text-[10px] uppercase font-mono font-bold cursor-pointer transition-colors border ${
                                    searchStrategy === strat 
                                      ? 'bg-cyan-505 border-cyan-400 text-slate-950 bg-cyan-400' 
                                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-205'
                                  }`}
                                >
                                  {strat}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="space-y-2 pt-1">
                            <label className="block text-[10px] text-slate-400 font-mono">Target Lookup Value:</label>
                            <div className="flex flex-wrap gap-1">
                              {[12, 19, 31, 37, 45, 62, 70, 85].map((num) => (
                                <button
                                  key={num}
                                  onClick={() => seedNewSearchTarget(num)}
                                  className={`px-2 py-1 rounded text-xs font-mono cursor-pointer transition-colors border ${
                                    searchTarget === num 
                                      ? 'bg-cyan-950 border-cyan-500 text-cyan-300 font-bold' 
                                      : 'bg-slate-900 hover:bg-slate-850 border-slate-800 text-slate-400'
                                  }`}
                                >
                                  {num}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="flex gap-2 pt-2">
                            <button
                              onClick={triggerSearchEvaluation}
                              disabled={searchIsActive}
                              className="w-full py-2 bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white rounded text-xs font-bold cursor-pointer disabled:opacity-50 flex items-center justify-center gap-1"
                            >
                              <Play size={12} /> Launch Search Trace
                            </button>
                            <button
                              onClick={() => {
                                setSearchLowIdx(-1);
                                setSearchHighIdx(-1);
                                setSearchMidIdx(-1);
                                setSearchActiveScanIdx(-1);
                                setSearchFoundIdx(-1);
                                setSearchTotalSteps(0);
                                setSearchIsActive(false);
                                setSearchLogTrace("All scanning parameters reset. Inactive.");
                              }}
                              className="px-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 rounded text-xs flex items-center justify-center cursor-pointer"
                            >
                              <RotateCcw size={12} />
                            </button>
                          </div>
                        </div>

                        {/* Search Metric Output Card */}
                        <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
                          <span className="block text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                            Comparative Performance metrics
                          </span>

                          <div className="grid grid-cols-2 gap-2 text-center text-xs font-mono">
                            <div className="p-2 bg-[#070b13] border border-slate-900 rounded-lg">
                              <span className="text-[9px] text-slate-500 block">STEPS TAKEN:</span>
                              <span className="text-xl font-display font-black text-cyan-400">{searchTotalSteps}</span>
                            </div>
                            <div className="p-2 bg-[#070b13] border border-slate-900 rounded-lg">
                              <span className="text-[9px] text-slate-550 block">RESULT:</span>
                              {searchFoundIdx >= 0 ? (
                                <span className="text-sm font-black text-emerald-400 block pt-1.5 uppercase">FOUND AT #{searchFoundIdx}</span>
                              ) : searchFoundIdx === -2 ? (
                                <span className="text-xs font-black text-red-500 block pt-2 uppercase">NOT EXISTS</span>
                              ) : (
                                <span className="text-xs text-slate-600 block pt-2">STANDBY</span>
                              )}
                            </div>
                          </div>

                          <div className="pt-1.5 border-t border-slate-900 space-y-1 text-[11px] leading-snug">
                            <span className="text-slate-400 block font-bold font-mono text-[9px] tracking-wide uppercase">Complexity Scaling:</span>
                            <div className="flex justify-between text-slate-350">
                              <span>Linear Complexity (O(N)):</span>
                              <strong className="text-pink-400">10 steps max</strong>
                            </div>
                            <div className="flex justify-between text-slate-350">
                              <span>Binary Complexity (O(log N)):</span>
                              <strong className="text-cyan-400 font-extrabold text-[12px]">4 steps max</strong>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right Side array visualizer list */}
                      <div className="lg:col-span-8 bg-slate-950 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between min-h-[300px]">
                        <div>
                          <div className="flex justify-between items-center mb-4">
                            <span className="text-[10px] text-slate-550 font-mono uppercase tracking-wide">
                              Sorted List Index Map (Binary subdivision highlight)
                            </span>
                            <div className="flex flex-wrap items-center gap-2 md:gap-3 text-[10px] font-mono">
                              <span className="flex items-center gap-1 text-slate-400">
                                <span className="w-2 h-2 rounded bg-cyan-450 bg-cyan-400 inline-block" /> Scan / Midpoint
                              </span>
                              <span className="flex items-center gap-1 text-slate-400">
                                <span className="w-2 h-2 rounded bg-[#070b13] border border-slate-700/60 inline-block" /> Active Bounds
                              </span>
                              <span className="flex items-center gap-1 text-slate-550">
                                <span className="w-2 h-2 rounded bg-slate-900/40 inline-block border border-dashed border-slate-800" /> Discarded Space
                              </span>
                            </div>
                          </div>

                          {/* Index boxes block */}
                          <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 md:gap-3 py-6 bg-[#070b13]/80 rounded-xl p-4 md:p-6 border border-slate-900">
                            {searchArray.map((val, idx) => {
                              const isLinearActive = searchStrategy === "linear" && searchActiveScanIdx === idx;
                              const isBinaryMid = searchStrategy === "binary" && searchMidIdx === idx;
                              const isFound = searchFoundIdx === idx;
                              
                              // Check if within binary search boundaries
                              let isWithinBounds = true;
                              if (searchStrategy === "binary" && searchLowIdx !== -1 && searchHighIdx !== -1) {
                                isWithinBounds = idx >= searchLowIdx && idx <= searchHighIdx;
                              }

                              let borderStyle = "border-slate-800 bg-slate-900/50";
                              let textStyle = "text-slate-400";
                              let markerText = "";

                              if (isFound) {
                                borderStyle = "border-emerald-400 bg-emerald-500/10 scale-110 shadow-lg shadow-emerald-500/20";
                                textStyle = "text-emerald-400 scale-110 font-bold";
                                markerText = "FOUND";
                              } else if (isBinaryMid) {
                                borderStyle = "border-cyan-400 bg-cyan-500/15 scale-105";
                                textStyle = "text-cyan-300 font-extrabold";
                                markerText = "MIDPOINT";
                              } else if (isLinearActive) {
                                borderStyle = "border-cyan-400 bg-cyan-500/15 scale-105";
                                textStyle = "text-cyan-300 font-extrabold";
                                markerText = "SCANNING";
                              } else if (!isWithinBounds) {
                                borderStyle = "border-slate-950 bg-slate-900/10 opacity-20 border-dashed";
                                textStyle = "text-slate-700 font-light line-through";
                                markerText = "DISCARD";
                              } else {
                                // Within bounds but not midpoint
                                if (searchStrategy === "binary" && searchLowIdx !== -1) {
                                  if (idx === searchLowIdx) markerText = "LOW";
                                  if (idx === searchHighIdx) markerText = "HIGH";
                                  borderStyle = "border-slate-700 bg-slate-900";
                                  textStyle = "text-slate-250";
                                }
                              }

                              return (
                                <div key={idx} className="flex flex-col items-center gap-1.5 transition-all duration-300">
                                  {/* Pointer labels */}
                                  <span className="text-[8px] font-mono font-bold tracking-tighter text-cyan-400 h-3 flex items-center justify-center truncate w-full text-center">
                                    {markerText}
                                  </span>

                                  {/* Interactive Box card wrapper */}
                                  <div className={`w-full max-w-[50px] aspect-square rounded-lg border-2 flex items-center justify-center font-display font-extrabold text-base transition-all duration-320 ${borderStyle} ${textStyle}`}>
                                    {val}
                                  </div>

                                  {/* Array index indicator below index box */}
                                  <span className="font-mono text-[9px] text-slate-500">
                                    Idx #{idx}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Comparative walkthrough tutorial tips */}
                        <div className="pt-3.5 border-t border-slate-900 text-xs text-slate-400 leading-relaxed grid grid-cols-1 md:grid-cols-2 gap-4">
                          <p>
                            <strong className="text-slate-350 font-mono text-[10px] uppercase block mb-0.5">Linear strategy:</strong>
                            Probes indexes sequentially <code>0, 1, 2... N</code>. Works on unsorted elements. Scalability: average <code>O(N)</code> scans.
                          </p>
                          <p>
                            <strong className="text-slate-350 font-mono text-[10px] uppercase block mb-0.5">Binary strategy:</strong>
                            Divides sorted space in half each iteration by evaluating midpoint. High efficiency <code>O(log N)</code>. Requires pre-sorted array invariant.
                          </p>
                        </div>
                      </div>

                    </div>
                  </div>
                )}

              </div>

              {/* Console log footer outputs */}
              <div className="mt-6 border-t border-slate-850 pt-4">
                <div className="bg-black/40 border border-slate-850 rounded-xl p-3 flex flex-col gap-1 text-xs">
                  <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500">
                    <Terminal size={12} className="text-teal-400" />
                    <span>DEBUG CONSOLE LOGGER EXPORTS:</span>
                  </div>
                  <pre className="text-green-400 font-mono whitespace-pre-wrap text-[11px] leading-relaxed max-h-[100px] overflow-y-auto">
                    {selectedTopicId === "stack-visualized" && stackLog}
                    {selectedTopicId === "tree-traversal" && traversalLog[traversalLog.length - 1]}
                    {selectedTopicId === "bst-explained" && bstConsole}
                    {selectedTopicId === "hash-tables" && hashConsole}
                    {selectedTopicId === "sorting-race" && sortHistory[sortHistory.length - 1]}
                    {selectedTopicId === "searching-comparison" && searchLogTrace}
                  </pre>
                </div>
              </div>

            </div>

            {/* Right Side Info Pane: Deep content educational insights */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-6">
              
              {/* Concept Master Levels Cards */}
              <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5 md:p-6 space-y-4">
                <span className="px-2 py-0.5 rounded-full text-[9px] font-mono bg-gradient-to-r from-blue-600 to-indigo-500 text-white font-bold uppercase tracking-wider block self-start">
                  Visual Knowledge Framework Hierarchy
                </span>
                
                <h3 className="text-base font-display font-extrabold text-[#f1f5f9] tracking-tight">
                  Academic Progress Level Breakdowns:
                </h3>

                <div className="space-y-2 text-xs">
                  {[
                    { label: "Beginner Level Core", desc: activeMetadata.conceptBlock.beginner, border: "border-emerald-500/25 bg-emerald-500/5", name: "Green", text: "text-emerald-300" },
                    { label: "Intermediate Architecture", desc: activeMetadata.conceptBlock.intermediate, border: "border-blue-500/25 bg-blue-500/5", name: "Blue", text: "text-blue-300" },
                    { label: "Advanced Call Trace Details", desc: activeMetadata.conceptBlock.advanced, border: "border-amber-500/25 bg-amber-500/5", name: "Amber", text: "text-amber-300" },
                    { label: "Industry Expert Insights", desc: activeMetadata.conceptBlock.expert, border: "border-pink-500/25 bg-pink-500/5", name: "Pink", text: "text-pink-300" }
                  ].map((lvl, index) => (
                    <div key={index} className={`p-3 rounded-xl border ${lvl.border} space-y-1`}>
                      <span className={`font-mono text-[10px] uppercase font-black ${lvl.text}`}>
                        {lvl.label}
                      </span>
                      <p className="text-slate-300 leading-normal text-xs font-light">
                        {lvl.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Revision Box / Statistics anchor card */}
              <div className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-5 shadow-lg space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
                  <Lightbulb size={16} className="text-yellow-400" />
                  <span className="font-display font-medium text-xs text-slate-200">
                    Scientific Analogy & Memory Retainer
                  </span>
                </div>

                <div className="space-y-4">
                  {activeMetadata.realWorldAnalogies.map((an, i) => (
                    <div key={i} className="space-y-1">
                      <span className="text-[11px] font-bold text-indigo-300 font-display">💡 {an.title}</span>
                      <p className="text-xs text-slate-350 leading-relaxed italic pr-2 font-mono">
                        "{an.analogy}"
                      </p>
                      <p className="text-[10px] text-slate-500">
                        <strong className="text-slate-400">Why it fits:</strong> {an.whyItFits}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="pt-2">
                  <div className="p-2.5 bg-slate-900 border border-slate-850 rounded-xl">
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block mb-1">
                      Core Academic Complexity Formulas:
                    </span>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      {activeMetadata.formulasAndComplexity.map((form, idx) => (
                        <div key={idx} className="border border-slate-800 p-1.5 rounded bg-slate-950">
                          <span className="text-[9px] text-[#14b8a6] block font-mono truncate">{form.label}</span>
                          <span className="text-base font-display font-black text-white">{form.formula}</span>
                          <span className="text-[8px] text-slate-400 block truncate leading-tight">{form.notation}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW MODE 2: COMPREHENSIVE INFOGRAPHIC MAP (8K POSTER FORMAT) */}
        {/* ========================================================================= */}
        {activeViewMode === "poster" && (
          <div className="bg-slate-900 border-2 border-slate-800 rounded-3xl p-6 md:p-10 shadow-2xl relative space-y-10 max-w-4xl mx-auto overflow-hidden">
            
            {/* Poster Header Background Decors */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-[#14b8a6] to-pink-500" />
            
            {/* NAT-GEO / PUBLISHING HOUSE STYLED POSTER HEADER */}
            <div className="text-center space-y-4 border-b border-slate-800/80 pb-8 relative">
              <div className="flex justify-center items-center gap-2">
                <span className="px-3 py-1 text-[10px] font-mono font-bold tracking-widest bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full uppercase">
                  TED-Ed Digital Scholastic Series
                </span>
                <span className="text-slate-500 font-mono text-xs">•</span>
                <span className="px-3 py-1 text-[10px] font-mono font-bold tracking-widest bg-teal-500/10 text-teal-400 border border-teal-500/20 rounded-full uppercase">
                  CS-TRAVERSALS-112
                </span>
              </div>
              
              <h1 className="text-3xl md:text-5xl font-display font-black text-white tracking-tight uppercase leading-none">
                {activeMetadata.title}
              </h1>
              <p className="text-md md:text-lg text-slate-400 font-light max-w-2xl mx-auto font-sans">
                {activeMetadata.subtitle} — Interactive visual memory retention blueprint mapped in scholastic academic details.
              </p>

              {/* Prominent creator details */}
              <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-slate-400 bg-slate-950/40 p-3 rounded-2xl max-w-xl mx-auto border border-slate-850">
                <div className="flex items-center gap-1">
                  <User size={12} className="text-blue-400" />
                  <span>Curator: <strong className="text-white">Surla Darni Sree</strong></span>
                </div>
                <span className="text-slate-700">|</span>
                <div className="flex items-center gap-1">
                  <GraduationCap size={12} className="text-[#14b8a6]" />
                  <span>College: <strong className="text-teal-400">Raghu Engineering College</strong></span>
                </div>
                <span className="text-slate-700">|</span>
                <div className="flex items-center gap-1">
                  <Briefcase size={12} className="text-yellow-400" />
                  <span>Placement: <strong className="text-[#f59e0b]">Intern @ Indian Servers</strong></span>
                </div>
              </div>
            </div>

            {/* OVERVIEW SECTION */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-8 space-y-3">
                <h3 className="text-xs font-mono text-[#14b8a6] uppercase tracking-widest block font-bold">
                  Scientific Essence Overview
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed font-sans font-light">
                  {activeMetadata.overview} Every computing layer—from web routing queues, operating execution memory blocks, semantic parsing trees, to data structure lookups—relies on optimized implementations of this concept.
                </p>
              </div>
              <div className="md:col-span-4 bg-slate-950 border border-slate-800 p-4 rounded-2xl text-center space-y-1">
                <span className="text-[10px] font-mono text-slate-500 uppercase block">Curriculum Weight:</span>
                <p className="text-3xl font-display font-black text-indigo-400">Grade A+</p>
                <div className="text-[11px] text-slate-400 font-mono">Academic Core Syllabus</div>
              </div>
            </div>

            {/* BENTO GRID: SUBSECTOR VISUAL FLO ACTION STEPS */}
            <div className="space-y-4">
              <h3 className="text-xs font-mono text-blue-400 uppercase tracking-widest block font-bold mb-2">
                Structural Execution Pipeline Walkthrough
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3.5">
                {activeMetadata.visualFlowSteps.map((step, idx) => (
                  <div key={idx} className="p-3.5 bg-slate-950 border border-slate-850 rounded-xl space-y-3 relative group hover:border-blue-500/20 transition-all">
                    <span className="text-2xl font-display font-black text-slate-800 absolute top-2 right-2 group-hover:text-cyan-400/20 transition-all">
                      0{idx + 1}
                    </span>
                    <span className="px-1.5 py-0.5 rounded text-[8px] font-mono bg-blue-500/10 text-blue-400 border border-blue-500/20 uppercase tracking-wider">
                      Stage {idx + 1}
                    </span>
                    <p className="text-xs font-mono font-bold text-slate-200 mt-2">
                      {step.split(":")[0]}
                    </p>
                    <p className="text-[11px] text-slate-405 leading-normal font-light">
                      {step.split(":")[1] || step}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* REVISION AND MISTAKES & ADVANCED SECTIONS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Common Mistakes box */}
              <div className="bg-slate-950 p-6 border border-slate-800 rounded-2xl space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-900 pb-2.5">
                  <XCircle size={16} className="text-red-400" />
                  <h4 className="font-display font-bold text-sm text-slate-100 uppercase tracking-wider">
                    Common Mistakes Students Commit
                  </h4>
                </div>
                
                <ul className="space-y-3.5 text-xs text-slate-300">
                  {activeMetadata.commonMistakes.map((mistake, idx) => (
                    <li key={idx} className="flex gap-2.5 items-start bg-red-950/5 border border-red-500/10 p-2 rounded-xl">
                      <span className="bg-red-500/10 text-red-400 font-bold px-1.5 py-0.5 text-[10px] rounded font-mono">
                        Error 0{idx + 1}
                      </span>
                      <span>{mistake}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Best Practices rules */}
              <div className="bg-slate-950 p-6 border border-slate-800 rounded-2xl space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-900 pb-2.5">
                  <CheckCircle2 size={16} className="text-emerald-400" />
                  <h4 className="font-display font-bold text-sm text-slate-100 uppercase tracking-wider">
                    Industry Standard Best Practices
                  </h4>
                </div>
                
                <ul className="space-y-3.5 text-xs text-slate-300">
                  {activeMetadata.bestPractices.map((bp, idx) => (
                    <li key={idx} className="flex gap-2.5 items-start bg-[#14b8a6]/5 border border-[#14b8a6]/10 p-2 rounded-xl">
                      <span className="bg-[#14b8a6]/10 text-teal-400 font-bold px-1.5 py-0.5 text-[10px] rounded font-mono">
                        Rule 0{idx + 1}
                      </span>
                      <span>{bp}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* COMPARATIVE ANALYSIS TABLE */}
            <div className="space-y-4 bg-slate-950/40 p-5 rounded-2xl border border-slate-850">
              <div className="flex justify-between items-center">
                <h4 className="font-display font-bold text-sm text-slate-200 tracking-wide uppercase">
                  Comparative Analysis & Structural Overrides
                </h4>
                <span className="text-[10px] font-mono text-slate-500">BENCHMARK PERFORMANCE</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 font-mono text-[9px] uppercase tracking-widest bg-slate-900/60">
                      <th className="py-2.5 px-3">Performance Criteria</th>
                      <th className="py-2.5 px-3">Subject Option A</th>
                      <th className="py-2.5 px-3">Subject Option B</th>
                      <th className="py-2.5 px-3">Critical Winner Analysis</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeMetadata.comparisons.map((c, idx) => (
                      <tr key={idx} className="border-b border-slate-850 bg-slate-900/10">
                        <td className="py-3 px-3 font-semibold font-display text-[#14b8a6]">{c.criteria}</td>
                        <td className="py-3 px-3">{c.entityA}</td>
                        <td className="py-3 px-3">{c.entityB}</td>
                        <td className="py-3 px-3 font-mono text-[11px] text-slate-200">{c.winner}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* TECHNICAL SOURCE IMPLEMENTATION CODEBLOCK */}
            <div className="space-y-3">
              <span className="block text-xs font-mono text-purple-400 uppercase tracking-widest font-bold">
                Optimized Structural Code Engine Reference
              </span>
              <div className="bg-slate-950 border border-slate-850 rounded-2xl overflow-hidden p-4">
                <pre className="text-blue-300 font-mono text-[11px] leading-relaxed max-h-[180px] overflow-y-auto whitespace-pre-wrap select-all">
                  {activeMetadata.technicalCodeBlock}
                </pre>
              </div>
            </div>

            {/* REVISION CHECKPOINT QUIZ */}
            <div className="bg-slate-950 border border-slate-850 rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-900 pb-3">
                <HelpCircle size={18} className="text-amber-500 animate-bounce" />
                <h4 className="font-display font-bold text-sm text-slate-100 uppercase tracking-wider">
                  Checkpoint Self-Assessment Quiz
                </h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { id: "q1", question: "What is the primary memory retrieval paradigm for Stacks?", options: ["LIFO", "FIFO", "LILO", "Random Access"] },
                  { id: "q2", question: "Which traversal walk yield values sorted numerically in a BST?", options: ["Pre-Order", "In-Order", "Post-Order", "BFS"] },
                  { id: "q3", question: "In simple BST engines, which factor causes degenerate O(N) paths?", options: ["Pre-sorting items insertion", "Balanced rotators", "Modulo overflows", "Garbage collection"] },
                  { id: "q4", question: "If the load factor is exceeded (e.g. >= 0.75), what is the optimal remedy?", options: ["Do nothing", "Rehash and double capacity", "Clear the array fully", "Decrease key frequencies"] }
                ].map((q) => (
                  <div key={q.id} className="p-3 bg-[#0d1525] border border-slate-850 rounded-xl space-y-2">
                    <span className="text-[10px] text-indigo-400 font-mono uppercase tracking-wider block">Question Match</span>
                    <p className="text-xs text-slate-200 font-semibold">{q.question}</p>
                    <div className="grid grid-cols-2 gap-1.5 pt-1">
                      {q.options.map((opt) => {
                        const isChosen = quizAnswered[q.id] === opt;
                        return (
                          <button
                            key={opt}
                            onClick={() => handleQuizAnswer(q.id, opt)}
                            className={`py-1 rounded text-xs px-2 text-left transition-all ${isChosen ? 'bg-amber-500/10 border border-amber-500 text-amber-300' : 'bg-slate-900 border border-slate-850 text-slate-400 hover:text-slate-200'}`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-center bg-[#070b13] p-4 rounded-xl border border-slate-850 pt-3 gap-3">
                <p className="text-[11px] text-slate-400 max-w-[70%]">
                  Verify your theoretical understanding before passing viva. Click evaluate scores below!
                </p>
                <button
                  onClick={evaluateQuizScore}
                  className="px-5 py-2 bg-amber-500 text-slate-950 font-extrabold rounded-lg text-xs hover:bg-amber-400 transition-colors cursor-pointer shrink-0"
                >
                  Evaluate Scores
                </button>
              </div>

              {quizAlert && (
                <div className="p-3 bg-indigo-950/40 border border-indigo-500/20 text-indigo-350 text-xs rounded-xl flex items-center gap-2 animate-bounce justify-center font-mono">
                  <Sparkles size={14} className="text-amber-400" />
                  <span>{quizAlert}</span>
                </div>
              )}
            </div>

            {/* FUTURE SCOPE RESEARCH & CITATIONS */}
            <div className="border-t border-slate-800/80 pt-6 flex flex-col md:flex-row justify-between items-start md:items-center text-xs text-slate-450 gap-4 bg-slate-950/30 p-4 rounded-2xl-inner">
              <div className="space-y-1">
                <span className="text-[9px] font-mono tracking-widest text-[#14b8a6] uppercase block font-bold">Future Scope Area:</span>
                <p className="text-xs text-slate-450 pr-4 italic leading-relaxed font-sans font-light">
                  "{activeMetadata.futureResearch}"
                </p>
              </div>
              <div className="flex-shrink-0 text-right md:border-l md:border-slate-800 md:pl-5 space-y-1">
                <span className="text-[9px] font-mono uppercase text-slate-500 block">Poster UUID Reference</span>
                <p className="font-mono text-[10px] text-slate-400">BLUEPRINT-TRAVERS-8K-992A</p>
                <p className="text-[8px] text-[#14b8a6] font-mono">Designed dynamically for students and publishers.</p>
              </div>
            </div>

            {/* SCIENTIFIC STAMPS AND CREATOR MARKER */}
            <div className="border-t border-slate-850 pt-4 flex justify-between items-center text-[10px] text-slate-550 font-mono">
              <span>Verified Academic Copy © 2026. All Rights Reserved.</span>
              <span className="text-right">Surla Darni Sree • Raghu Engineering College</span>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW MODE 3: PRESENTATION SLIDES FORMAT FOR DIGITAL SCREEN INJECTION */}
        {/* ========================================================================= */}
        {activeViewMode === "slides" && (
          <div className="max-w-3xl mx-auto space-y-6">
            
            {/* Visual Screen Container */}
            <div className="aspect-[16/9] bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between shadow-2xl relative overflow-hidden">
              
              {/* slide number marker */}
              <div className="absolute top-4 right-6 text-xs text-slate-500 font-mono">
                Slide 0{currentSlideIndex + 1} / 05
              </div>

              {/* Slide design decors */}
              <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-indigo-505" />

              {/* SLIDE 1: INTRO TITLE */}
              {currentSlideIndex === 0 && (
                <div className="flex-1 flex flex-col justify-center space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-ping" />
                    <span className="px-2.5 py-0.5 text-[9px] font-mono tracking-widest bg-indigo-505/10 text-indigo-400 border border-indigo-500/20 uppercase rounded">
                      Presentation Board Unit
                    </span>
                  </div>
                  <h2 className="text-3xl md:text-5xl font-display font-black text-white leading-tight uppercase">
                    {activeMetadata.title}
                  </h2>
                  <p className="text-slate-400 text-sm md:text-md max-w-xl font-sans font-light">
                    Deep interactive exploration of hierarchical memory operations, traversals, binary split queries, and polynomial compressed keys resolving collisions.
                  </p>

                  <div className="pt-4 flex items-center gap-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#14b8a6]/10 text-[#14b8a6] border border-[#14b8a6]/25">
                      Presenter: Surla Darni Sree
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-blue-500/10 text-blue-400 border border-blue-500/25">
                      Designation: Student Intern
                    </span>
                  </div>
                </div>
              )}

              {/* SLIDE 2: THEORETICAL BLUEPRINT / COMPREHENSION LEVEL MAP */}
              {currentSlideIndex === 1 && (
                <div className="flex-1 flex flex-col justify-center space-y-4">
                  <div>
                    <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block font-bold">Slide Section 02</span>
                    <h3 className="text-xl md:text-2xl font-display font-extrabold text-white">
                      Curriculum Progression Levels Mapping
                    </h3>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs leading-relaxed">
                    <div className="p-3 bg-slate-950 border border-slate-850 rounded-xl">
                      <strong className="text-emerald-400 block mb-1">BEGINNER BASE</strong>
                      <p className="text-slate-400 text-[11px] font-light">
                        {activeMetadata.conceptBlock.beginner}
                      </p>
                    </div>
                    <div className="p-3 bg-slate-950 border border-slate-850 rounded-xl">
                      <strong className="text-blue-400 block mb-1">INTERMEDIATE LOGIC</strong>
                      <p className="text-slate-400 text-[11px] font-light">
                        {activeMetadata.conceptBlock.intermediate}
                      </p>
                    </div>
                    <div className="p-3 bg-slate-950 border border-slate-850 rounded-xl">
                      <strong className="text-amber-400 block mb-1">ADVANCED TRAJECTORY</strong>
                      <p className="text-slate-400 text-[11px] font-light">
                        {activeMetadata.conceptBlock.advanced}
                      </p>
                    </div>
                    <div className="p-3 bg-slate-950 border border-slate-850 rounded-xl">
                      <strong className="text-[#ec4899] block mb-1">EXPERT INTUITION</strong>
                      <p className="text-slate-400 text-[11px] font-light">
                        {activeMetadata.conceptBlock.expert}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 3: COMPLEXITY DEEP DIVE & DYNAMIC EQUATIONS */}
              {currentSlideIndex === 2 && (
                <div className="flex-1 flex flex-col justify-center space-y-4">
                  <div>
                    <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest block font-bold">Slide Section 03</span>
                    <h3 className="text-xl md:text-2xl font-display font-extrabold text-white uppercase">
                      Big-O Algorithm Performance Complexities
                    </h3>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    {activeMetadata.formulasAndComplexity.map((form, i) => (
                      <div key={i} className="p-4 bg-slate-950 border border-slate-850 rounded-2xl text-center space-y-2">
                        <span className="text-[10px] font-mono text-cyan-400 block uppercase tracking-wider">{form.label}</span>
                        <div className="text-4xl font-display font-black text-white">{form.formula}</div>
                        <p className="text-[11px] text-slate-400 leading-normal font-light">
                          {form.explanation}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SLIDE 4: PITFALLS & MYTHS VS FACTS */}
              {currentSlideIndex === 3 && (
                <div className="flex-1 flex flex-col justify-center space-y-4">
                  <div>
                    <span className="text-[10px] font-mono text-pink-400 uppercase tracking-widest block font-bold">Slide Section 04</span>
                    <h3 className="text-xl md:text-2xl font-display font-black text-white uppercase">
                      Myths Deconstructed vs Fact Realities
                    </h3>
                  </div>

                  <div className="space-y-3">
                    {activeMetadata.mythVsFact.map((mf, i) => (
                      <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                        <div className="p-3.5 bg-red-950/20 border border-red-500/20 text-slate-300 rounded-xl">
                          <strong className="text-red-400 font-mono block mb-1 uppercase text-[10px]">❌ POPULAR MYTH:</strong>
                          "{mf.myth}"
                        </div>
                        <div className="p-3.5 bg-emerald-950/20 border border-emerald-500/20 text-slate-300 rounded-xl">
                          <strong className="text-emerald-400 font-mono block mb-1 uppercase text-[10px]">✔ VERIFIED FACT:</strong>
                          "{mf.fact}"
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SLIDE 5: CLASSROOM VIVA DISCUSSION QUESTIONS */}
              {currentSlideIndex === 4 && (
                <div className="flex-1 flex flex-col justify-center space-y-4">
                  <div>
                    <span className="text-[10px] font-mono text-teal-400 uppercase tracking-widest block font-bold">Slide Section 05</span>
                    <h3 className="text-xl md:text-2xl font-display font-black text-white uppercase">
                       viva / Campus Placement Defense Topics
                    </h3>
                  </div>

                  <div className="space-y-3 font-sans">
                    {activeMetadata.vivaQuestions.map((vq, i) => (
                      <div key={i} className="p-3.5 bg-slate-950 border border-slate-850 rounded-xl space-y-1 text-xs">
                        <strong className="text-amber-400 font-display">Q: {vq.question}</strong>
                        <p className="text-slate-300 font-light pr-2">
                          {vq.answer}
                        </p>
                        <div className="pt-2 flex items-center gap-1.5 flex-wrap">
                          <span className="text-[9px] font-mono text-slate-500">Suggested Keywords:</span>
                          {vq.expectedKeywords.map((kw) => (
                            <span key={kw} className="px-1.5 py-0.2 text-[8px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded font-mono">
                              #{kw}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Slide Deck Footer Watermark */}
              <div className="border-t border-slate-800/80 pt-3.5 flex justify-between items-center text-[9px] font-mono text-slate-500">
                <span>Presenter: Surla Darni Sree (Indian Servers Intern)</span>
                <span>Institute: Raghu Engineering College</span>
              </div>

            </div>

            {/* Slides Controls Interface Panels */}
            <div className="flex justify-between items-center bg-slate-950/60 p-4 border border-slate-800/80 rounded-2xl">
              <div className="text-xs text-slate-400">
                Click controls to navigate through academic presentations:
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentSlideIndex(p => Math.max(0, p - 1))}
                  disabled={currentSlideIndex === 0}
                  className="p-2 bg-slate-900 border border-slate-800 text-slate-300 rounded-lg hover:bg-slate-805 disabled:opacity-30 cursor-pointer"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={() => setCurrentSlideIndex(p => Math.min(4, p + 1))}
                  disabled={currentSlideIndex === 4}
                  className="p-2 bg-slate-900 border border-slate-800 text-slate-300 rounded-lg hover:bg-slate-805 disabled:opacity-30 cursor-pointer"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW MODE 4: SOCIAL PREVIEW / CROPPED INFOGRAPHIC CARDS FOR COMPACT SIZES */}
        {/* ========================================================================= */}
        {activeViewMode === "social" && (
          <div className="max-w-md mx-auto space-y-6">
            
            <div className="text-xs text-slate-400 text-center flex items-center justify-center gap-2 mb-2">
              <Share2 size={14} className="text-pink-500" />
              <span>Compact Flashcard view optimized for Linkedin or Mobile revision slides:</span>
            </div>

            {/* LinkedIn Cropped 1:1 Aspect Graphic Card */}
            <div className="aspect-square bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-pink-500 to-indigo-500" />
              
              {/* Header card badges */}
              <div className="flex justify-between items-center text-[10px] font-mono">
                <span className="text-pink-400 uppercase tracking-widest font-extrabold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-pulse" />
                  Mnemonic revision card
                </span>
                <span className="text-slate-500">BLUEPRINT_MNEM_01</span>
              </div>

              {/* Middle core high visual mnemonic anchors */}
              <div className="space-y-4 text-center py-4 flex-1 flex flex-col justify-center">
                <span className="text-3xl font-display font-black text-white tracking-widest">
                  {selectedTopicId === "stack-visualized" && "L. I. F. O."}
                  {selectedTopicId === "tree-traversal" && "PRE vs IN vs POST"}
                  {selectedTopicId === "bst-explained" && "LEFT < ROOT < RIGHT"}
                  {selectedTopicId === "hash-tables" && "KEY ➜ HASH ➜ SLOT"}
                  {selectedTopicId === "sorting-race" && "SWAP vs COMPARE"}
                  {selectedTopicId === "searching-comparison" && "DIVIDE & CONQUER"}
                </span>

                <div className="p-4 bg-slate-950 border border-slate-850 rounded-2xl">
                  {selectedTopicId === "stack-visualized" && (
                    <p className="text-xs text-slate-300 leading-relaxed font-mono">
                      {"\"Last In, First Out. The plate pushed onto the box stack last is popped and eaten first.\""}
                    </p>
                  )}
                  {selectedTopicId === "tree-traversal" && (
                    <p className="text-xs text-slate-300 leading-relaxed font-mono">
                      {"\"PRE means Root is printed BEFORE children. IN means Root is printed IN-BETWEEN children. POST means Root is printed AFTER children.\""}
                    </p>
                  )}
                  {selectedTopicId === "bst-explained" && (
                    <p className="text-xs text-slate-300 leading-relaxed font-mono">
                      {"\"Discard half the coordinates at each step. Search is average O(log N). If pre-sorted keys insert, tree skews to O(N) linked list shape.\""}
                    </p>
                  )}
                  {selectedTopicId === "hash-tables" && (
                    <p className="text-xs text-slate-300 leading-relaxed font-mono">
                      {"\"Pigeonholes guarantee collisions. Seperate chaining links collided items into buckets. Rehash when Load factor checks >= 0.75.\""}
                    </p>
                  )}
                  {selectedTopicId === "sorting-race" && (
                    <p className="text-xs text-slate-300 leading-relaxed font-mono">
                      {"\"Bubble sorts by neighboring swaps. Selection selects the absolute minimum each pass. Insertion slides keys iteratively into sorted positions. O(N²) quadratic limits.\""}
                    </p>
                  )}
                  {selectedTopicId === "searching-comparison" && (
                    <p className="text-xs text-slate-300 leading-relaxed font-mono">
                      {"\"Linear search sweeps everything sequentially in O(N). Binary search bisects a sorted segment boundaries in O(log N) operations. Half discarded each pass!\""}
                    </p>
                  )}
                </div>
              </div>

              {/* Stamp markings of creator */}
              <div className="border-t border-slate-850 pt-3.5 space-y-2">
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-450">
                  <span className="font-extrabold text-white">Surla Darni Sree</span>
                  <span className="text-slate-500">Raghu Engineering College</span>
                </div>
                <div className="flex justify-between items-center text-[9px] font-mono text-slate-550 border-t border-slate-850/50 pt-2">
                  <span>Intern @ Indian Servers</span>
                  <span className="text-pink-400 uppercase font-black font-display text-[8px] tracking-wider">ACM Education standard</span>
                </div>
              </div>

            </div>

          </div>
        )}

      </main>

      {/* FIXED SCHOLASTIC FOOTER & COLLEGIUM CREDIT */}
      <footer className="border-t border-slate-850/60 bg-slate-950/80 px-6 py-6 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-slate-500 text-center md:text-left">
          
          <div className="space-y-1">
            <p className="text-slate-400 font-display font-medium text-xs">
              Computer Science & Engineering Visual Knowledge Map Project
            </p>
            <p className="text-slate-500 text-[10px]">
              Fulfilling industrial design requirements under ACM/IEEE Curriculum Standards. Developed exclusively for students & teachers.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-2 text-[11px]">
            <p className="text-[#14b8a6] flex items-center gap-1">
              <span className="inline-block w-2.5 h-2.5 bg-[#14b8a6]/15 text-[#14b8a6] rounded px-1 text-[8px] font-bold">SD</span>
              Surla Darni Sree • Raghu Engineering College
            </p>
            <p className="text-slate-500 text-[10px]">
              Placement Portfolio Series — Intern @ Indian Servers
            </p>
          </div>

        </div>
      </footer>

    </div>
  );
}
