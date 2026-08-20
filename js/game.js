function resetStageProgress(stageNum) {
    if (stageNum === 1) stage1Items.forEach(i => i.collected = false);
    else if (stageNum === 2) { nextRequiredOrder = 1;
        stage2Nodes.forEach(n => n.connected = false); } else if (stageNum === 3) { stage3Score = 0;
        fallingItems = []; } else if (stageNum === 4) { player.battery = 100;
        player.angle = 0;
        stage4Batteries.forEach(b => b.collected = false); } else if (stageNum === 5) { pcbTracesCount = 0;
        permanentPcbTraces = [];
        resetStage5Round(); } else if (stageNum === 6) resetStage6();
    else if (stageNum === 7) resetStage7();
    else if (stageNum === 8) resetStage8();
    else if (stageNum === 9) resetStage9();
    else if (stageNum === 10) resetStage10();
}

function loadStage(stageNum) {
    currentStage = stageNum;
    timer = 60;
    resetKeys();
    player.vx = 0;
    player.vy = 0;
    player.invulnerableTimer = 60;
    const titles = {
        1: "📡 Workshop 1: IoT Hardware",
        2: "🧠 Workshop 2: Deep Learning",
        3: "🎬 Workshop 3: AI Video Creator",
        4: "🤖 Workshop 4: Robotics Arena",
        5: "🔌 Workshop 5: PCB Routing",
        6: "⚙️ Workshop 6: PLC & Actuators",
        7: "🛡️ Workshop 7: SOC Cybersecurity",
        8: "🐍 Workshop 8: Python Code",
        9: "🖨️ Workshop 9: 3D Printing",
        10: "🔧 Workshop 10: Arduino Wiring"
    };
    mainTitle.innerText = titles[stageNum] || `Workshop ${stageNum}`;
    if (stageNum === 1) { player.x = 40;
        player.y = 430; } else if (stageNum === 2) { player.x = 40;
        player.y = 120; } else if (stageNum === 3) { player.x = canvas.width / 2 - 20;
        player.y = 440;
        currentPromptText = stage3PromptsList[Math.floor(Math.random() * stage3PromptsList.length)]; } else if (stageNum === 4) { player.x = 60;
        player.y = 60;
        player.angle = 0;
        player.battery = 100; } else if (stageNum === 5) { permanentPcbTraces = [];
        resetStage5Round(); } else if (stageNum === 6) resetStage6();
    else if (stageNum === 7) resetStage7();
    else if (stageNum === 8) resetStage8();
    else if (stageNum === 9) resetStage9();
    else if (stageNum === 10) resetStage10();
}

function startMainTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        if (gameState === "PLAYING") {
            timer--;
            if (currentStage === 3) spawnStage3Item();
            if (currentStage === 6 && Math.random() < 0.7) spawnConveyorItem();
            if (currentStage === 8) spawnPythonBlock();
            if (timer <= 0) gameOver(false);
        }
    }, 1000);
}

function startGame() {
    if (lives <= 0) { openShop();
        showToast("Need at least 1 Life! ❤️"); return; }
    gameState = "PLAYING";
    resetKeys();
    endScreen.classList.add("hidden");
    shopScreen.classList.add("hidden");
    trophyScreen.classList.add("hidden");
    pauseScreen.classList.add("hidden");
    inGameUI.classList.remove("hidden");
    if (currentStage === 6 || currentStage === 7) touchControls.classList.remove("hidden");
    else touchControls.classList.add("hidden");
    touchControlsMobile.style.display = "block";
    startMainTimer();
}

function startMiniGame() {
    gameState = "MINIGAME";
    shopScreen.classList.add("hidden");
    miniTimer = 20;
    inGameUI.classList.add("hidden");
    touchControls.classList.add("hidden");
    touchControlsMobile.style.display = "block";
    resetKeys();
    player.x = canvas.width / 2;
    player.y = canvas.height / 2;
    player.vx = 0;
    player.vy = 0;
    miniCoins = [];
    for (let i = 0; i < 12; i++) {
        miniCoins.push({ x: Math.random() * (canvas.width - 60) + 30, y: Math.random() * (canvas.height - 60) + 30,
            collected: false });
    }
    miniBugs = [];
    for (let i = 0; i < 4; i++) {
        miniBugs.push({ x: Math.random() < 0.5 ? 20 : canvas.width - 20, y: Math.random() * canvas.height,
            speed: Math.random() * 2 + 2.5 });
    }
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        if (gameState === "MINIGAME") {
            miniTimer--;
            if (miniTimer <= 0) openShop();
        }
    }, 1000);
}
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const nameScreen = document.getElementById("nameScreen");
const hubScreen = document.getElementById("hubScreen");
const pauseScreen = document.getElementById("pauseScreen");
const trophyScreen = document.getElementById("trophyScreen");
const shopScreen = document.getElementById("shopScreen");
const endScreen = document.getElementById("endScreen");
const inGameUI = document.getElementById("in-game-ui");
const touchControls = document.getElementById("touch-controls");
const touchControlsMobile = document.getElementById("touch-controls-mobile");

const playerNameInput = document.getElementById("playerNameInput");
const trophyPlayerName = document.getElementById("trophyPlayerName");
const trophyDesc = document.getElementById("trophyDesc");
const mainTitle = document.getElementById("mainTitle");
const shopCoinsText = document.getElementById("shopCoinsText");

const endTitle = document.getElementById("endTitle");
const endMessage = document.getElementById("endMessage");

const saveNameBtn = document.getElementById("saveNameBtn");
const openStoreBtn = document.getElementById("openStoreBtn");
const pauseGameBtn = document.getElementById("pauseGameBtn");
const exitToHubBtn = document.getElementById("exitToHubBtn");
const resumeGameBtn = document.getElementById("resumeGameBtn");
const pauseHubBtn = document.getElementById("pauseHubBtn");
const nextStageBtn = document.getElementById("nextStageBtn");
const restartBtn = document.getElementById("restartBtn");
const backToHubBtn1 = document.getElementById("backToHubBtn1");
const backToHubBtn2 = document.getElementById("backToHubBtn2");
const buyLifeBtn = document.getElementById("buyLifeBtn");
const startMiniGameBtn = document.getElementById("startMiniGameBtn");
const resumeMainBtn = document.getElementById("resumeMainBtn");

// Mobile buttons
const mobileUp = document.getElementById("mobileUp");
const mobileDown = document.getElementById("mobileDown");
const mobileLeft = document.getElementById("mobileLeft");
const mobileRight = document.getElementById("mobileRight");
const mobileJump = document.getElementById("mobileJump");
const mobileActionA = document.getElementById("mobileActionA");
const mobileActionB = document.getElementById("mobileActionB");
const mobileActionC = document.getElementById("mobileActionC");

const marioImg = new Image();
marioImg.src = "src/images/robot.png";

let audioCtx = null;

function unlockAudio() {
    if (!audioCtx) audioCtx = new(window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();
}

function playSound(type) {
    unlockAudio();
    if (!audioCtx) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    const now = audioCtx.currentTime;

    if (type === 'jump') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(160, now);
        osc.frequency.exponentialRampToValueAtTime(650, now + 0.15);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.15);
        osc.start(now);
        osc.stop(now + 0.15);
    } else if (type === 'collect') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(523.25, now);
        osc.frequency.setValueAtTime(783.99, now + 0.16);
        gain.gain.setValueAtTime(0.4, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.25);
        osc.start(now);
        osc.stop(now + 0.25);
    } else if (type === 'lose') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.linearRampToValueAtTime(70, now + 0.4);
        gain.gain.setValueAtTime(0.4, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.4);
        osc.start(now);
        osc.stop(now + 0.4);
    } else if (type === 'win') {
        [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
            const o2 = audioCtx.createOscillator();
            const g2 = audioCtx.createGain();
            o2.connect(g2);
            g2.connect(audioCtx.destination);
            o2.type = 'sine';
            o2.frequency.setValueAtTime(freq, now + i * 0.12);
            g2.gain.setValueAtTime(0.2, now + i * 0.12);
            g2.gain.linearRampToValueAtTime(0.01, now + i * 0.12 + 0.15);
            o2.start(now + i * 0.12);
            o2.stop(now + i * 0.12 + 0.15);
        });
    }
}

let playerName = "Hero";
let gameState = "NAME";
let previousGameState = "HUB";
let currentStage = 1;
let timer = 60;
let timerInterval = null;
let lives = 3;
let coins = 0;
let toastMessage = "";
let toastTimer = 0;
let miniCoins = [];
let miniBugs = [];
let miniTimer = 20;
const keys = { left: false, right: false, jump: false, up: false, down: false };

function resetKeys() { keys.left = false;
    keys.right = false;
    keys.jump = false;
    keys.up = false;
    keys.down = false; }

const player = {
    x: 40,
    y: 400,
    width: 35,
    height: 45,
    vx: 0,
    vy: 0,
    speed: 6.5,
    jumpPower: -12.5,
    gravity: 0.5,
    isJumping: false,
    invulnerableTimer: 0,
    angle: 0,
    battery: 100
};

// --- STAGE 1 (IoT) ---
const stage1Platforms = [
    { x: 0, y: 500, width: 1000, height: 50, color: '#00f0ff' },
    { x: 80, y: 410, width: 130, height: 15, color: '#ff007f' },
    { x: 260, y: 330, width: 140, height: 15, color: '#00ff88' },
    { x: 450, y: 250, width: 150, height: 15, color: '#ffea00' },
    { x: 670, y: 330, width: 140, height: 15, color: '#00f0ff' },
    { x: 780, y: 410, width: 140, height: 15, color: '#ff007f' },
    { x: 200, y: 180, width: 130, height: 15, color: '#a855f7' }
];
const stage1Items = [
    { x: 110, y: 375, symbol: "📡", collected: false },
    { x: 290, y: 295, symbol: "📟", collected: false },
    { x: 490, y: 215, symbol: "💡", collected: false },
    { x: 710, y: 295, symbol: "🎛️", collected: false },
    { x: 810, y: 375, symbol: "🔋", collected: false },
    { x: 230, y: 145, symbol: "📷", collected: false },
    { x: 40, y: 465, symbol: "🌐", collected: false }
];
let stage1Obstacles = [
    { x: 270, y: 310, width: 22, height: 22, vx: 1.2, minX: 260, maxX: 380, symbol: "👾" },
    { x: 680, y: 310, width: 22, height: 22, vx: 1.2, minX: 670, maxX: 780, symbol: "👾" }
];

// --- STAGE 2 (Deep Learning) ---
let nextRequiredOrder = 1;
let stage2Nodes = [
    { id: 1, order: 1, x: 120, y: 140, label: "Input", symbol: "📥", connected: false },
    { id: 2, order: 2, x: 300, y: 410, label: "Conv2D", symbol: "🔍", connected: false },
    { id: 3, order: 3, x: 500, y: 170, label: "MaxPool", symbol: "⚡", connected: false },
    { id: 4, order: 4, x: 700, y: 410, label: "BatchNorm", symbol: "⚖️", connected: false },
    { id: 5, order: 5, x: 880, y: 190, label: "Dense", symbol: "🧠", connected: false },
    { id: 6, order: 6, x: 500, y: 460, label: "Softmax", symbol: "🎯", connected: false }
];
let stage2SecurityBugs = [
    { x: 220, y: 220, vx: 3.2, vy: 2.5 },
    { x: 600, y: 240, vx: -2.8, vy: 3.0 },
    { x: 780, y: 300, vx: 3.5, vy: -2.2 },
    { x: 380, y: 120, vx: -3.0, vy: 2.8 }
];
let vanishingZone = { x: 420, y: 250, width: 160, height: 100, active: true };

// --- STAGE 3 (AI Video) ---
let stage3Score = 0;
const targetStage3Score = 15;
let stage3PromptsList = [
    "Prompt: Cinematic Cyberpunk Scene 🎥",
    "Prompt: AI Drone View 🚁",
    "Prompt: 3D Creature 🐉",
    "Prompt: Sci-Fi Cityscape 🌃",
    "Prompt: Water Simulation 🌊"
];
let currentPromptText = stage3PromptsList[0];
let fallingItems = [];

function spawnStage3Item() {
    const r = Math.random();
    let isBad = r < 0.35;
    fallingItems.push({
        x: Math.random() * (canvas.width - 80) + 40,
        y: -20,
        baseSpeed: Math.random() * 1.2 + 1.2,
        drift: (Math.random() - 0.5) * 0.8,
        isBad: isBad,
        symbol: isBad ? (Math.random() < 0.5 ? "💥" : "⚠️") : "🎬"
    });
}

// --- STAGE 4 (Robotics) ---
let stage4Walls = [
    { x: 220, y: 0, width: 25, height: 340 },
    { x: 480, y: 200, width: 25, height: 350 },
    { x: 740, y: 0, width: 25, height: 340 }
];
let stage4Batteries = [
    { x: 130, y: 250, collected: false },
    { x: 130, y: 440, collected: false },
    { x: 360, y: 100, collected: false },
    { x: 360, y: 440, collected: false },
    { x: 610, y: 120, collected: false },
    { x: 610, y: 440, collected: false }
];
let stage4Enemies = [
    { x: 350, y: 320, radius: 20, angle: 0, speed: 0.035, dist: 75 },
    { x: 610, y: 260, radius: 20, angle: 0, speed: 0.045, dist: 85 }
];
const goalZone = { x: 880, y: 410, width: 90, height: 90 };

// --- STAGE 5 (PCB) ---
let pcbTracesCount = 0;
let pcbTargetTraces = 5;
let currentPcbTrace = [];
let permanentPcbTraces = [];
let isImmune = false;
const immunityDuration = 1500;
let pcbStartPad = { x: 90, y: 275, radius: 24 };
let pcbEndPad = { x: 910, y: 275, radius: 24 };
let pcbComponents = [
    { x: 260, y: 120, w: 85, h: 85, label: "IC-1 🔳" },
    { x: 260, y: 330, w: 85, h: 85, label: "IC-2 🔳" },
    { x: 520, y: 80, w: 100, h: 100, label: "MCU 🔲" },
    { x: 520, y: 350, w: 100, h: 90, label: "RELAY ⚡" },
    { x: 780, y: 220, w: 60, h: 100, label: "CAP 🔋" }
];

function resetStage5Round() {
    resetKeys();
    player.x = pcbStartPad.x;
    player.y = pcbStartPad.y;
    currentPcbTrace = [{ x: player.x, y: player.y }];
    isImmune = true;
    setTimeout(() => { isImmune = false; }, immunityDuration);
}

// --- STAGE 6 (PLC) ---
let sortedCount = 0;
const targetSortedCount = 20;
let conveyorItems = [];
let conveyorBeltX = 0;
const actuatorA = { x: 350, width: 60, extendTimer: 0 };
const actuatorB = { x: 680, width: 60, extendTimer: 0 };

function resetStage6() {
    sortedCount = 0;
    conveyorItems = [];
    actuatorA.extendTimer = 0;
    actuatorB.extendTimer = 0;
}

function spawnConveyorItem() {
    const types = [
        { symbol: "🔩", type: "METAL", name: "Metal Part" },
        { symbol: "📦", type: "PLASTIC", name: "Plastic Box" },
        { symbol: "💥", type: "FAULTY", name: "Faulty Component" }
    ];
    let choice = types[Math.floor(Math.random() * types.length)];
    conveyorItems.push({
        x: -30,
        y: 270,
        speed: 3.5,
        symbol: choice.symbol,
        type: choice.type,
        name: choice.name
    });
}

function checkActuatorHit(actuator, expectedType) {
    let hitFound = false;
    for (let i = conveyorItems.length - 1; i >= 0; i--) {
        let item = conveyorItems[i];
        if (item.x >= actuator.x - 30 && item.x <= actuator.x + actuator.width + 30) {
            hitFound = true;
            if (item.type === expectedType) {
                sortedCount++;
                playSound('collect');
                showToast(`✅ ${item.symbol} Sorted! (${sortedCount}/${targetSortedCount})`);
            } else {
                handleHit(`❌ Wrong Actuator for ${item.symbol}!`);
            }
            conveyorItems.splice(i, 1);
            break;
        }
    }
    if (!hitFound) showToast("Actuator Missed!");
}

// --- STAGE 7 (SOC) ---
let socScore = 0;
const targetSocScore = 200;
let currentThreat = null;
const threatTypes = [
    { type: 'ddos', icon: '🔴', name: 'DDoS Attack' },
    { type: 'malware', icon: '👾', name: 'Malware Threat' },
    { type: 'phishing', icon: '📧', name: 'Phishing Mail' },
    { type: 'clean', icon: '🔵', name: 'Clean Data' }
];

function resetStage7() {
    socScore = 0;
    currentThreat = null;
    spawnStage7Threat();
}

function spawnStage7Threat() {
    if (currentStage !== 7) return;
    const t = threatTypes[Math.floor(Math.random() * threatTypes.length)];
    currentThreat = { ...t, y: 80, speed: 2.2 + Math.random() * 1.3 };
}

function defendStage7(defenseType) {
    if (!currentThreat || currentThreat.y >= 430 || gameState !== "PLAYING" || currentStage !== 7) return;
    if (currentThreat.type === defenseType) {
        socScore += 10;
        playSound('collect');
        showToast(`🛡️ Blocked ${currentThreat.name}! (+10)`);
        spawnStage7Threat();
    } else if (currentThreat.type === 'clean') {
        socScore = Math.max(0, socScore - 10);
        playSound('lose');
        showToast(`⚠️ Blocked Clean Data! (-10)`);
        spawnStage7Threat();
    } else {
        handleHit(`❌ Wrong Tool against ${currentThreat.name}!`);
        spawnStage7Threat();
    }
    if (socScore >= targetSocScore) showTrophyScreen();
}

// --- STAGE 8: Python Workshop ---
let pythonCodeBlocks = [];
let pythonScore = 0;
const targetPython = 15;
let pythonActiveBlock = null;
let pythonBugs = [];

const pythonKeywords = ['def', 'class', 'import', 'print', 'if', 'for', 'while', 'try', 'return', 'lambda', 'async', 'with', 'yield', 'raise', 'assert'];

function resetStage8() {
    pythonScore = 0;
    pythonCodeBlocks = [];
    pythonBugs = [];
    pythonActiveBlock = null;
    for (let i = 0; i < 18; i++) {
        let kw = pythonKeywords[Math.floor(Math.random() * pythonKeywords.length)];
        pythonCodeBlocks.push({
            x: 50 + Math.random() * 850,
            y: 60 + Math.random() * 300,
            keyword: kw,
            collected: false,
            vx: (Math.random() - 0.5) * 1.5,
            vy: (Math.random() - 0.5) * 1.5
        });
    }
    for (let i = 0; i < 6; i++) {
        pythonBugs.push({
            x: 50 + Math.random() * 850,
            y: 60 + Math.random() * 300,
            vx: (Math.random() - 0.5) * 3.5,
            vy: (Math.random() - 0.5) * 3.5,
            radius: 18
        });
    }
    spawnPythonBlock();
}

function spawnPythonBlock() {
    if (!pythonActiveBlock && pythonCodeBlocks.some(b => !b.collected)) {
        let available = pythonCodeBlocks.filter(b => !b.collected);
        pythonActiveBlock = available[Math.floor(Math.random() * available.length)];
    }
}

// --- STAGE 9: 3D Printing ---
let printParts = [];
let printPartsCollected = 0;
const targetPrintParts = 10;
let printBugs9 = [];

function resetStage9() {
    printPartsCollected = 0;
    printParts = [];
    printBugs9 = [];
    for (let i = 0; i < targetPrintParts; i++) {
        printParts.push({
            x: 40 + Math.random() * 920,
            y: 40 + Math.random() * 350,
            symbol: "🔧",
            collected: false
        });
    }
    for (let i = 0; i < 5; i++) {
        printBugs9.push({
            x: 50 + Math.random() * 850,
            y: 60 + Math.random() * 300,
            vx: (Math.random() - 0.5) * 2.8,
            vy: (Math.random() - 0.5) * 2.8,
            radius: 20
        });
    }
}

// --- STAGE 10: Arduino ---
let arduinoPins = [];
let arduinoScore = 0;
const targetArduino = 8;
let arduinoActiveWire = null;
let arduinoObstacles10 = [];
let arduinoPinOrder = [];
let currentPinIndex = 0;

function resetStage10() {
    arduinoScore = 0;
    currentPinIndex = 0;
    const pinIds = ['GND', '5V', 'D13', 'D12', 'D11', 'A0', 'A1', 'A2', 'A3'];
    arduinoPinOrder = [...pinIds].sort(() => Math.random() - 0.5);
    arduinoPinOrder = arduinoPinOrder.slice(0, targetArduino);

    arduinoPins = [];
    const startX = 150;
    const spacing = 90;
    for (let i = 0; i < arduinoPinOrder.length; i++) {
        arduinoPins.push({
            id: arduinoPinOrder[i],
            x: startX + i * spacing,
            y: 200 + Math.sin(i * 1.2) * 80,
            connected: false
        });
    }

    arduinoActiveWire = null;
    arduinoObstacles10 = [];
    for (let i = 0; i < 8; i++) {
        arduinoObstacles10.push({
            x: 40 + Math.random() * 900,
            y: 40 + Math.random() * 400,
            radius: 18,
            vx: (Math.random() - 0.5) * 3.5,
            vy: (Math.random() - 0.5) * 3.5
        });
    }
    if (arduinoPins.length > 0) {
        arduinoActiveWire = arduinoPins[0];
    }
}

// --- Helper functions ---
function showToast(msg) {
    toastMessage = msg;
    toastTimer = 120;
}

function handleHit(msg) {
    if (isImmune || player.invulnerableTimer > 0) return;
    lives--;
    playSound('lose');
    if (msg) showToast(msg);
    resetKeys();
    player.vx = 0;
    player.vy = 0;
    player.invulnerableTimer = 60;

    if (currentStage === 1) { player.x = 40;
        player.y = 430; } else if (currentStage === 2) { player.x = 40;
        player.y = 120; } else if (currentStage === 3) { player.x = canvas.width / 2 - 20;
        player.y = 440; } else if (currentStage === 4) { player.x = 60;
        player.y = 60;
        player.angle = 0;
        player.battery = 100; } else if (currentStage === 5) resetStage5Round();
    else if (currentStage === 6) resetStage6();
    else if (currentStage === 7) spawnStage7Threat();
    else if (currentStage === 8) resetStage8();
    else if (currentStage === 9) resetStage9();
    else if (currentStage === 10) resetStage10();
    else {
        player.x = 40;
        player.y = 430;
    }

    if (lives <= 0) openShop();
}

function showTrophyScreen() {
    clearInterval(timerInterval);
    gameState = "TROPHY";
    resetKeys();
    inGameUI.classList.add("hidden");
    touchControls.classList.add("hidden");
    trophyPlayerName.innerText = playerName;
    const descs = {
        1: "IoT Hardware & Sensors",
        2: "Deep Learning Neural Architecture",
        3: "AI Video Generation",
        4: "Autonomous Robotics Competition",
        5: "PCB Trace & Circuit Design",
        6: "PLC Conveyor & Actuator Sorting",
        7: "SOC Cybersecurity Defense",
        8: "Python Code Mastery",
        9: "3D Printing Parts Collector",
        10: "Arduino Pin Wiring Challenge"
    };
    trophyDesc.innerText = `Master of Workshop ${currentStage}: ${descs[currentStage] || 'Bootcamp'}`;
    nextStageBtn.innerText = currentStage >= 10 ? "🎓 GRADUATE" : "NEXT 🧠";
    trophyScreen.classList.remove("hidden");
    playSound('win');
}

function gameOver(isWin) {
    gameState = isWin ? "WIN" : "GAMEOVER";
    clearInterval(timerInterval);
    resetKeys();
    inGameUI.classList.add("hidden");
    touchControls.classList.add("hidden");
    if (isWin) {
        endTitle.innerText = `🏆 GRADUATE: ${playerName.toUpperCase()}!`;
        endTitle.style.color = "#00ff88";
        endMessage.innerHTML = `Awesome Job <b>${playerName}</b>!<br>You completed all 10 Workshops!`;
        playSound('win');
    } else {
        playSound('lose');
        endTitle.innerText = "💥 FAILURE!";
        endTitle.style.color = "#ff007f";
        endMessage.innerText = timer <= 0 ? "Time limit exceeded!" : "Out of lives!";
    }
    endScreen.classList.remove("hidden");
}

function triggerActuator(type) {
    if (gameState !== "PLAYING") return;
    if (currentStage === 6) {
        playSound('jump');
        if (type === 'A') { actuatorA.extendTimer = 15;
            checkActuatorHit(actuatorA, 'METAL'); } else if (type === 'B') { actuatorB.extendTimer = 15;
            checkActuatorHit(actuatorB, 'FAULTY'); }
    } else if (currentStage === 7) {
        if (type === 'A') defendStage7('ddos');
        else if (type === 'B') defendStage7('malware');
        else if (type === 'C') defendStage7('phishing');
    }
}

// --- Event listeners ---
// Keyboard
window.addEventListener("keydown", (e) => {
    unlockAudio();
    if (e.code === "ArrowLeft" || e.code === "KeyA" || e.code === "Digit1") { keys.left = true;
        triggerActuator('A'); }
    if (e.code === "ArrowRight" || e.code === "KeyD" || e.code === "Digit2") { keys.right = true;
        triggerActuator('B'); }
    if (e.code === "ArrowUp" || e.code === "Space" || e.code === "KeyW" || e.code === "Digit3") {
        if (!keys.jump && !player.isJumping && gameState === "PLAYING" && currentStage === 1) playSound('jump');
        keys.jump = true;
        keys.up = true;
        if (currentStage === 7) triggerActuator('C');
    }
    if (e.code === "ArrowDown" || e.code === "KeyS") keys.down = true;
});
window.addEventListener("keyup", (e) => {
    if (e.code === "ArrowLeft" || e.code === "KeyA") keys.left = false;
    if (e.code === "ArrowRight" || e.code === "KeyD") keys.right = false;
    if (e.code === "ArrowUp" || e.code === "Space" || e.code === "KeyW") { keys.jump = false;
        keys.up = false; }
    if (e.code === "ArrowDown" || e.code === "KeyS") keys.down = false;
});

// Mobile touch controls
function setupMobileButton(btn, keyOn, keyOff) {
    btn.addEventListener("touchstart", (e) => {
        e.preventDefault();
        unlockAudio();
        keyOn();
        if (btn === mobileJump && gameState === "PLAYING" && currentStage === 1) playSound('jump');
    });
    btn.addEventListener("touchend", (e) => { e.preventDefault();
        keyOff(); });
    btn.addEventListener("touchcancel", (e) => { e.preventDefault();
        keyOff(); });
    btn.addEventListener("mousedown", (e) => { e.preventDefault();
        keyOn(); });
    btn.addEventListener("mouseup", (e) => { e.preventDefault();
        keyOff(); });
    btn.addEventListener("mouseleave", (e) => { keyOff(); });
}

setupMobileButton(mobileUp, () => { keys.up = true; }, () => { keys.up = false; });
setupMobileButton(mobileDown, () => { keys.down = true; }, () => { keys.down = false; });
setupMobileButton(mobileLeft, () => { keys.left = true; }, () => { keys.left = false; });
setupMobileButton(mobileRight, () => { keys.right = true; }, () => { keys.right = false; });
setupMobileButton(mobileJump, () => { keys.jump = true; }, () => { keys.jump = false; });
setupMobileButton(mobileActionA, () => { triggerActuator('A'); }, () => {});
setupMobileButton(mobileActionB, () => { triggerActuator('B'); }, () => {});
setupMobileButton(mobileActionC, () => { triggerActuator('C'); }, () => {});

// --- Hub / Navigation ---
function openHub() {
    gameState = "HUB";
    clearInterval(timerInterval);
    resetKeys();
    trophyScreen.classList.add("hidden");
    endScreen.classList.add("hidden");
    shopScreen.classList.add("hidden");
    pauseScreen.classList.add("hidden");
    inGameUI.classList.add("hidden");
    touchControls.classList.add("hidden");
    touchControlsMobile.style.display = "none";
    hubScreen.classList.remove("hidden");
    mainTitle.innerText = "🤖 Labeeb Bootcamp Pro";
}

saveNameBtn.addEventListener("click", () => {
    unlockAudio();
    const val = playerNameInput.value.trim();
    if (val) playerName = val;
    nameScreen.classList.add("hidden");
    openHub();
});

pauseGameBtn.addEventListener("click", () => {
    if (gameState === "PLAYING") {
        gameState = "PAUSED";
        clearInterval(timerInterval);
        pauseScreen.classList.remove("hidden");
        touchControls.classList.add("hidden");
        touchControlsMobile.style.display = "none";
    }
});
resumeGameBtn.addEventListener("click", () => {
    if (gameState === "PAUSED") {
        gameState = "PLAYING";
        pauseScreen.classList.add("hidden");
        if (currentStage === 6 || currentStage === 7) touchControls.classList.remove("hidden");
        else touchControls.classList.add("hidden");
        touchControlsMobile.style.display = "block";
        startMainTimer();
    }
});
exitToHubBtn.addEventListener("click", () => openHub());
pauseHubBtn.addEventListener("click", () => openHub());

const stageSelectors = {
    'selectStage1': 1,
    'selectStage2': 2,
    'selectStage3': 3,
    'selectStage4': 4,
    'selectStage5': 5,
    'selectStage6': 6,
    'selectStage7': 7,
    'selectStage8': 8,
    'selectStage9': 9,
    'selectStage10': 10
};
Object.keys(stageSelectors).forEach(id => {
    document.getElementById(id).addEventListener("click", () => {
        hubScreen.classList.add("hidden");
        currentStage = stageSelectors[id];
        resetStageProgress(currentStage);
        loadStage(currentStage);
        startGame();
    });
});

openStoreBtn.addEventListener("click", () => openShop());
backToHubBtn1.addEventListener("click", () => openHub());
backToHubBtn2.addEventListener("click", () => openHub());

nextStageBtn.addEventListener("click", () => {
    unlockAudio();
    trophyScreen.classList.add("hidden");
    let nextStage = currentStage + 1;
    if (nextStage > 10) {
        gameOver(true);
    } else {
        resetStageProgress(nextStage);
        loadStage(nextStage);
        startGame();
    }
});

restartBtn.addEventListener("click", () => {
    unlockAudio();
    resetStageProgress(currentStage);
    loadStage(currentStage);
    startGame();
});

buyLifeBtn.addEventListener("click", () => {
    if (coins >= 5) { coins -= 5;
        lives++;
        playSound('collect');
        updateShopUI(); } else showToast("Not enough coins! 🪙");
});

startMiniGameBtn.addEventListener("click", () => startMiniGame());

resumeMainBtn.addEventListener("click", () => {
    if (lives <= 0) { showToast("Buy a Life to continue! ❤️"); return; }
    shopScreen.classList.add("hidden");
    resetKeys();
    if (currentStage === 1) { player.x = 40;
        player.y = 430; } else if (currentStage === 2) { player.x = 40;
        player.y = 120; } else if (currentStage === 3) { player.x = canvas.width / 2 - 20;
        player.y = 440; } else if (currentStage === 4) { player.x = 60;
        player.y = 60;
        player.angle = 0;
        player.battery = 100; }
    if (previousGameState === "PLAYING") {
        gameState = "PLAYING";
        inGameUI.classList.remove("hidden");
        if (currentStage === 6 || currentStage === 7) touchControls.classList.remove("hidden");
        else touchControls.classList.add("hidden");
        touchControlsMobile.style.display = "block";
        startMainTimer();
    } else openHub();
});

function updateShopUI() { shopCoinsText.innerText = `${coins} 🪙 (Lives: ${lives} ❤️)`; }

function openShop() {
    if (gameState !== "SHOP" && gameState !== "MINIGAME") previousGameState = gameState;
    gameState = "SHOP";
    clearInterval(timerInterval);
    resetKeys();
    inGameUI.classList.add("hidden");
    touchControls.classList.add("hidden");
    touchControlsMobile.style.display = "none";
    updateShopUI();
    shopScreen.classList.remove("hidden");
}



// --- UPDATE ---
function update() {
    if (player.invulnerableTimer > 0) player.invulnerableTimer--;
    if (toastTimer > 0) toastTimer--;

    if (gameState === "PLAYING") {
        // STAGE 1
        if (currentStage === 1) {
            if (keys.right) player.vx = player.speed;
            else if (keys.left) player.vx = -player.speed;
            else player.vx = 0;
            if (keys.jump && !player.isJumping) { player.vy = player.jumpPower;
                player.isJumping = true; }
            player.vy += player.gravity;
            player.x += player.vx;
            player.y += player.vy;
            if (player.x < 0) player.x = 0;
            if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;
            player.isJumping = true;
            stage1Platforms.forEach(p => {
                if (player.x < p.x + p.width && player.x + player.width > p.x && player.y + player.height >= p.y &&
                    player.y + player.height <= p.y + p.height + player.vy) {
                    player.y = p.y - player.height;
                    player.vy = 0;
                    player.isJumping = false;
                }
            });
            stage1Obstacles.forEach(obs => {
                obs.x += obs.vx;
                if (obs.x <= obs.minX || obs.x >= obs.maxX) obs.vx *= -1;
                if (player.x < obs.x + obs.width && player.x + player.width > obs.x && player.y < obs.y + obs
                    .height && player.y + player.height > obs.y) handleHit("Hit Enemy Bug! 👾");
            });
            let collectedCount = 0;
            stage1Items.forEach(item => {
                if (!item.collected) {
                    if (player.x < item.x + 22 && player.x + player.width > item.x && player.y < item.y + 22 &&
                        player.y + player.height > item.y) {
                        item.collected = true;
                        playSound('collect');
                    }
                } else collectedCount++;
            });
            if (collectedCount === stage1Items.length) showTrophyScreen();
        }
        // STAGE 2
        else if (currentStage === 2) {
            if (keys.right && player.x < canvas.width - player.width) player.x += 6;
            if (keys.left && player.x > 0) player.x -= 6;
            if (keys.up && player.y > 0) player.y -= 6;
            if (keys.down && player.y < canvas.height - player.height) player.y += 6;
            if (player.x < vanishingZone.x + vanishingZone.width && player.x + player.width > vanishingZone.x &&
                player.y < vanishingZone.y + vanishingZone.height && player.y + player.height > vanishingZone.y) {
                handleHit("Vanishing Gradient Trap!");
            }
            stage2SecurityBugs.forEach(bug => {
                bug.x += bug.vx;
                bug.y += bug.vy;
                if (bug.x <= 30 || bug.x >= canvas.width - 30) bug.vx *= -1;
                if (bug.y <= 30 || bug.y >= canvas.height - 30) bug.vy *= -1;
                let dist = Math.hypot((player.x + player.width / 2) - bug.x, (player.y + player.height / 2) -
                bug.y);
                if (dist < 22) handleHit("Model Overfitting Virus! 👾");
            });
            let connectedCount = 0;
            stage2Nodes.forEach(node => {
                let dist = Math.hypot((player.x + player.width / 2) - node.x, (player.y + player.height / 2) -
                    node.y);
                if (dist < 35) {
                    if (!node.connected) {
                        if (node.order === nextRequiredOrder) { node.connected = true;
                            nextRequiredOrder++;
                            playSound('collect'); } else handleHit(`Wrong Neural Layer!`);
                    }
                }
                if (node.connected) connectedCount++;
            });
            if (connectedCount === stage2Nodes.length) showTrophyScreen();
        }
        // STAGE 3
        else if (currentStage === 3) {
            if (keys.right && player.x < canvas.width - player.width) player.x += 7.5;
            if (keys.left && player.x > 0) player.x -= 7.5;
            let timeElapsed = 60 - timer;
            let speedMultiplier = 1 + (timeElapsed / 60);
            for (let i = fallingItems.length - 1; i >= 0; i--) {
                let item = fallingItems[i];
                item.y += item.baseSpeed * speedMultiplier;
                item.x += item.drift;
                let dist = Math.hypot((player.x + player.width / 2) - item.x, (player.y + player.height / 2) - item
                    .y);
                if (dist < 28) {
                    if (item.isBad) handleHit("Hallucination Noise! 💥");
                    else { stage3Score++;
                        playSound('collect');
                        currentPromptText = stage3PromptsList[Math.floor(Math.random() * stage3PromptsList
                        .length)]; }
                    fallingItems.splice(i, 1);
                    continue;
                }
                if (item.y > canvas.height + 20) fallingItems.splice(i, 1);
            }
            if (stage3Score >= targetStage3Score) showTrophyScreen();
        }
        // STAGE 4
        else if (currentStage === 4) {
            if (keys.left) player.angle -= 0.06;
            if (keys.right) player.angle += 0.06;
            let moveSpeed = 0;
            if (keys.up) { moveSpeed = 4.2;
                player.battery -= 0.06; }
            if (keys.down) { moveSpeed = -2.5;
                player.battery -= 0.04; }
            player.x += Math.cos(player.angle) * moveSpeed;
            player.y += Math.sin(player.angle) * moveSpeed;
            if (player.battery <= 0) handleHit("Battery Depleted!");
            if (player.x < 15) player.x = 15;
            if (player.x > canvas.width - 35) player.x = canvas.width - 35;
            if (player.y < 15) player.y = 15;
            if (player.y > canvas.height - 35) player.y = canvas.height - 35;
            stage4Walls.forEach(w => {
                if (player.x < w.x + w.width && player.x + 30 > w.x && player.y < w.y + w.height && player.y +
                    30 > w.y) handleHit("Wall Collision!");
            });
            stage4Batteries.forEach(b => {
                if (!b.collected) {
                    let dist = Math.hypot((player.x + 15) - b.x, (player.y + 15) - b.y);
                    if (dist < 28) { b.collected = true;
                        player.battery = Math.min(100, player.battery + 30);
                        playSound('collect'); }
                }
            });
            stage4Enemies.forEach(e => {
                e.angle += e.speed;
                let ex = e.x + Math.cos(e.angle) * e.dist;
                let ey = e.y + Math.sin(e.angle) * e.dist;
                let dist = Math.hypot((player.x + 15) - ex, (player.y + 15) - ey);
                if (dist < 25) handleHit("Enemy Robot!");
            });
            if (player.x < goalZone.x + goalZone.width && player.x + 30 > goalZone.x && player.y < goalZone.y +
                goalZone.height && player.y + 30 > goalZone.y) {
                showTrophyScreen();
            }
        }
        // STAGE 5
        else if (currentStage === 5) {
            let timeElapsed = 60 - timer;
            let pcbSpeed = 3.6 + (timeElapsed / 18);
            let moved = false;
            let nextX = player.x;
            let nextY = player.y;
            if (keys.right) { nextX += pcbSpeed;
                moved = true; } else if (keys.left) { nextX -= pcbSpeed;
                moved = true; } else if (keys.up) { nextY -= pcbSpeed;
                moved = true; } else if (keys.down) { nextY += pcbSpeed;
                moved = true; }
            if (moved) {
                player.x = nextX;
                player.y = nextY;
                currentPcbTrace.push({ x: player.x, y: player.y });
                if (player.x < 15 || player.x > canvas.width - 15 || player.y < 15 || player.y > canvas.height -
                    15) handleHit("PCB Boundary!");
                pcbComponents.forEach(comp => {
                    if (player.x > comp.x && player.x < comp.x + comp.w && player.y > comp.y && player.y <
                        comp.y + comp.h) handleHit("Short Circuit!");
                });
                if (currentPcbTrace.length > 25) {
                    for (let i = 0; i < currentPcbTrace.length - 25; i++) {
                        let pt = currentPcbTrace[i];
                        let dist = Math.hypot(player.x - pt.x, player.y - pt.y);
                        if (dist < 6) { handleHit("Trace Intersection!"); break; }
                    }
                }
                if (!isImmune) {
                    permanentPcbTraces.forEach(oldTrace => {
                        for (let i = 15; i < oldTrace.length; i++) {
                            let pt = oldTrace[i];
                            let dist = Math.hypot(player.x - pt.x, player.y - pt.y);
                            if (dist < 7) { handleHit("Crossing Old Trace!"); break; }
                        }
                    });
                }
                let distEnd = Math.hypot(player.x - pcbEndPad.x, player.y - pcbEndPad.y);
                if (distEnd < pcbEndPad.radius) {
                    pcbTracesCount++;
                    playSound('collect');
                    permanentPcbTraces.push([...currentPcbTrace]);
                    if (pcbTracesCount >= pcbTargetTraces) showTrophyScreen();
                    else { showToast(`Trace ${pcbTracesCount}/${pcbTargetTraces} Locked!`);
                        resetStage5Round(); }
                }
            }
        }
        // STAGE 6
        else if (currentStage === 6) {
            conveyorBeltX = (conveyorBeltX + 3) % 40;
            if (actuatorA.extendTimer > 0) actuatorA.extendTimer--;
            if (actuatorB.extendTimer > 0) actuatorB.extendTimer--;
            for (let i = conveyorItems.length - 1; i >= 0; i--) {
                let item = conveyorItems[i];
                item.x += item.speed;
                if (item.x > canvas.width + 30) {
                    if (item.type === 'METAL' || item.type === 'FAULTY') handleHit(`Missed ${item.name}!`);
                    conveyorItems.splice(i, 1);
                }
            }
            if (sortedCount >= targetSortedCount) showTrophyScreen();
        }
        // STAGE 7
        else if (currentStage === 7) {
            if (!currentThreat) spawnStage7Threat();
            if (currentThreat) {
                currentThreat.y += currentThreat.speed;
                if (currentThreat.y >= 430) {
                    if (currentThreat.type !== 'clean') handleHit(`${currentThreat.name} Breached!`);
                    else { socScore += 5;
                        playSound('collect'); }
                    spawnStage7Threat();
                }
            }
            if (socScore >= targetSocScore) showTrophyScreen();
        }
        // STAGE 8
        else if (currentStage === 8) {
            if (keys.right && player.x < canvas.width - player.width) player.x += 5;
            if (keys.left && player.x > 0) player.x -= 5;
            if (keys.up && player.y > 0) player.y -= 5;
            if (keys.down && player.y < canvas.height - player.height) player.y += 5;

            pythonBugs.forEach(bug => {
                bug.x += bug.vx;
                bug.y += bug.vy;
                if (bug.x < 20 || bug.x > canvas.width - 20) bug.vx *= -1;
                if (bug.y < 20 || bug.y > canvas.height - 20) bug.vy *= -1;
                let dist = Math.hypot((player.x + player.width / 2) - bug.x, (player.y + player.height / 2) -
                bug.y);
                if (dist < bug.radius + 15) handleHit("🐍 Python Bug Attack!");
            });

            pythonCodeBlocks.forEach(block => {
                if (!block.collected) {
                    block.x += block.vx;
                    block.y += block.vy;
                    if (block.x < 20 || block.x > canvas.width - 20) block.vx *= -1;
                    if (block.y < 20 || block.y > canvas.height - 20) block.vy *= -1;
                    let dist = Math.hypot((player.x + player.width / 2) - block.x, (player.y + player.height /
                        2) - block.y);
                    if (dist < 30) {
                        block.collected = true;
                        pythonScore++;
                        playSound('collect');
                        showToast(`🐍 ${block.keyword} collected! (${pythonScore}/${targetPython})`);
                    }
                }
            });
            if (pythonScore >= targetPython) showTrophyScreen();
        }
        // STAGE 9
        else if (currentStage === 9) {
            if (keys.right && player.x < canvas.width - player.width) player.x += 5;
            if (keys.left && player.x > 0) player.x -= 5;
            if (keys.up && player.y > 0) player.y -= 5;
            if (keys.down && player.y < canvas.height - player.height) player.y += 5;

            printBugs9.forEach(bug => {
                bug.x += bug.vx;
                bug.y += bug.vy;
                if (bug.x < 20 || bug.x > canvas.width - 20) bug.vx *= -1;
                if (bug.y < 20 || bug.y > canvas.height - 20) bug.vy *= -1;
                let dist = Math.hypot((player.x + player.width / 2) - bug.x, (player.y + player.height / 2) -
                bug.y);
                if (dist < bug.radius + 15) handleHit("🖨️ Printing Bug!");
            });

            printParts.forEach(part => {
                if (!part.collected) {
                    let dist = Math.hypot((player.x + player.width / 2) - part.x, (player.y + player.height /
                        2) - part.y);
                    if (dist < 30) {
                        part.collected = true;
                        printPartsCollected++;
                        playSound('collect');
                        showToast(`🔧 Part collected! (${printPartsCollected}/${targetPrintParts})`);
                    }
                }
            });
            if (printPartsCollected >= targetPrintParts) showTrophyScreen();
        }
        // STAGE 10
        else if (currentStage === 10) {
            if (keys.right && player.x < canvas.width - player.width) player.x += 5;
            if (keys.left && player.x > 0) player.x -= 5;
            if (keys.up && player.y > 0) player.y -= 5;
            if (keys.down && player.y < canvas.height - player.height) player.y += 5;

            arduinoObstacles10.forEach(obs => {
                obs.x += obs.vx;
                obs.y += obs.vy;
                if (obs.x < 20 || obs.x > canvas.width - 20) obs.vx *= -1;
                if (obs.y < 20 || obs.y > canvas.height - 20) obs.vy *= -1;
                let dist = Math.hypot((player.x + player.width / 2) - obs.x, (player.y + player.height / 2) -
                obs.y);
                if (dist < obs.radius + 15) handleHit("⚡ Short Circuit!");
            });

            if (currentPinIndex < arduinoPinOrder.length) {
                let targetId = arduinoPinOrder[currentPinIndex];
                let targetPin = arduinoPins.find(p => p.id === targetId);
                if (targetPin && !targetPin.connected) {
                    arduinoActiveWire = targetPin;
                } else {
                    currentPinIndex++;
                    if (currentPinIndex < arduinoPinOrder.length) {
                        arduinoActiveWire = arduinoPins.find(p => p.id === arduinoPinOrder[currentPinIndex]);
                    } else {
                        arduinoActiveWire = null;
                    }
                }
            }

            if (arduinoActiveWire) {
                let pin = arduinoActiveWire;
                let dist = Math.hypot((player.x + player.width / 2) - pin.x, (player.y + player.height / 2) - pin
                    .y);
                if (dist < 30) {
                    pin.connected = true;
                    arduinoScore++;
                    currentPinIndex++;
                    playSound('collect');
                    showToast(`🔌 Pin ${pin.id} connected! (${arduinoScore}/${targetArduino})`);
                    if (currentPinIndex < arduinoPinOrder.length) {
                        arduinoActiveWire = arduinoPins.find(p => p.id === arduinoPinOrder[currentPinIndex]);
                    } else {
                        arduinoActiveWire = null;
                    }
                }
            }
            if (arduinoScore >= targetArduino) showTrophyScreen();
        }
    } else if (gameState === "MINIGAME") {
        if (keys.right && player.x < canvas.width - player.width) player.x += 5;
        if (keys.left && player.x > 0) player.x -= 5;
        if (keys.up && player.y > 0) player.y -= 5;
        if (keys.down && player.y < canvas.height - player.height) player.y += 5;
        miniCoins.forEach(coin => {
            if (!coin.collected) {
                let dist = Math.hypot((player.x + player.width / 2) - coin.x, (player.y + player.height / 2) -
                    coin.y);
                if (dist < 25) { coin.collected = true;
                    coins++;
                    playSound('collect'); }
            }
        });
        miniBugs.forEach(bug => {
            let angle = Math.atan2((player.y + player.height / 2) - bug.y, (player.x + player.width / 2) - bug
                .x);
            bug.x += Math.cos(angle) * bug.speed;
            bug.y += Math.sin(angle) * bug.speed;
            let dist = Math.hypot((player.x + player.width / 2) - bug.x, (player.y + player.height / 2) - bug
                .y);
            if (dist < 20) { playSound('lose');
                openShop(); }
        });
    }
}

// --- DRAW ---
function draw() {
    ctx.fillStyle = '#020617';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (gameState === "PLAYING" || gameState === "PAUSED" || gameState === "WIN" || gameState === "GAMEOVER" ||
        gameState === "SHOP") {
        // Stage specific drawing
        if (currentStage === 1) {
            stage1Platforms.forEach(p => {
                ctx.fillStyle = "#0f172a";
                ctx.fillRect(p.x, p.y, p.width, p.height);
                ctx.strokeStyle = p.color;
                ctx.lineWidth = 2.5;
                ctx.strokeRect(p.x, p.y, p.width, p.height);
            });
            ctx.font = "24px Arial";
            stage1Items.forEach(item => { if (!item.collected) ctx.fillText(item.symbol, item.x, item.y); });
            stage1Obstacles.forEach(obs => ctx.fillText(obs.symbol, obs.x, obs.y + 15));
        } else if (currentStage === 2) {
            ctx.strokeStyle = "rgba(168,85,247,0.15)";
            ctx.lineWidth = 1;
            for (let x = 0; x < canvas.width; x += 50) { ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, canvas.height);
                ctx.stroke(); }
            for (let y = 0; y < canvas.height; y += 50) { ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(canvas.width, y);
                ctx.stroke(); }
            ctx.fillStyle = "rgba(255,0,127,0.25)";
            ctx.fillRect(vanishingZone.x, vanishingZone.y, vanishingZone.width, vanishingZone.height);
            ctx.strokeStyle = "#ff007f";
            ctx.lineWidth = 2;
            ctx.strokeRect(vanishingZone.x, vanishingZone.y, vanishingZone.width, vanishingZone.height);
            ctx.fillStyle = "#ff007f";
            ctx.font = "bold 12px 'Segoe UI'";
            ctx.fillText("⚠️ Vanishing Gradient", vanishingZone.x + 10, vanishingZone.y + 55);
            let connectedList = stage2Nodes.filter(n => n.connected).sort((a, b) => a.order - b.order);
            if (connectedList.length > 1) {
                for (let i = 0; i < connectedList.length - 1; i++) {
                    ctx.strokeStyle = "#00ff88";
                    ctx.lineWidth = 4;
                    ctx.beginPath();
                    ctx.moveTo(connectedList[i].x, connectedList[i].y);
                    ctx.lineTo(connectedList[i + 1].x, connectedList[i + 1].y);
                    ctx.stroke();
                }
            }
            stage2Nodes.forEach(node => {
                ctx.fillStyle = node.connected ? "#00ff88" : "#a855f7";
                ctx.beginPath();
                ctx.arc(node.x, node.y, 28, 0, Math.PI * 2);
                ctx.fill();
                ctx.strokeStyle = "#fff";
                ctx.lineWidth = 2;
                ctx.stroke();
                ctx.font = "20px Arial";
                ctx.fillText(node.symbol, node.x - 10, node.y + 7);
                ctx.fillStyle = "#fff";
                ctx.font = "bold 11px 'Segoe UI'";
                ctx.fillText(node.label, node.x - 45, node.y + 43);
            });
            ctx.font = "22px Arial";
            stage2SecurityBugs.forEach(bug => ctx.fillText("👾", bug.x - 10, bug.y + 10));
        } else if (currentStage === 3) {
            ctx.fillStyle = "rgba(255,0,127,0.08)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "#0f172a";
            ctx.fillRect(canvas.width / 2 - 270, 45, 540, 42);
            ctx.strokeStyle = "#ff007f";
            ctx.lineWidth = 2;
            ctx.strokeRect(canvas.width / 2 - 270, 45, 540, 42);
            ctx.fillStyle = "#00f0ff";
            ctx.font = "bold 15px 'Segoe UI'";
            ctx.fillText(currentPromptText, canvas.width / 2 - 250, 72);
            ctx.fillStyle = "#ff007f";
            ctx.fillRect(0, canvas.height - 20, canvas.width, 10);
            fallingItems.forEach(item => { ctx.font = "28px Arial";
                ctx.fillText(item.symbol, item.x - 14, item.y + 10); });
            ctx.fillStyle = "#fff";
            ctx.font = "bold 14px 'Segoe UI'";
            ctx.fillText(`🎞️ Rendered: ${stage3Score}/${targetStage3Score}`, 20, 80);
            let speedRatio = Math.round((1 + ((60 - timer) / 60)) * 100) / 100;
            ctx.fillStyle = speedRatio > 1.8 ? "#ff007f" : "#ffea00";
            ctx.fillText(`⚡ Speed: ${speedRatio}x`, 20, 102);
        } else if (currentStage === 4) {
            ctx.strokeStyle = "rgba(0,240,255,0.2)";
            ctx.lineWidth = 2;
            ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);
            ctx.fillStyle = "#ff007f";
            stage4Walls.forEach(w => {
                ctx.fillRect(w.x, w.y, w.width, w.height);
                ctx.strokeStyle = "#00f0ff";
                ctx.lineWidth = 1.5;
                ctx.strokeRect(w.x, w.y, w.width, w.height);
            });
            ctx.fillStyle = "rgba(0,255,136,0.3)";
            ctx.fillRect(goalZone.x, goalZone.y, goalZone.width, goalZone.height);
            ctx.strokeStyle = "#00ff88";
            ctx.lineWidth = 3;
            ctx.strokeRect(goalZone.x, goalZone.y, goalZone.width, goalZone.height);
            ctx.font = "32px Arial";
            ctx.fillText("🏁", goalZone.x + 28, goalZone.y + 55);
            ctx.font = "24px Arial";
            stage4Batteries.forEach(b => { if (!b.collected) ctx.fillText("🔋", b.x - 12, b.y + 10); });
            stage4Enemies.forEach(e => {
                let ex = e.x + Math.cos(e.angle) * e.dist;
                let ey = e.y + Math.sin(e.angle) * e.dist;
                ctx.fillText("👾", ex - 12, ey + 10);
            });
            let rayX = (player.x + 18) + Math.cos(player.angle) * 70;
            let rayY = (player.y + 20) + Math.sin(player.angle) * 70;
            ctx.strokeStyle = "#00ff88";
            ctx.lineWidth = 1.5;
            ctx.setLineDash([4, 4]);
            ctx.beginPath();
            ctx.moveTo(player.x + 18, player.y + 20);
            ctx.lineTo(rayX, rayY);
            ctx.stroke();
            ctx.setLineDash([]);
            let batColor = player.battery > 50 ? "#00ff88" : (player.battery > 25 ? "#ffea00" : "#ff007f");
            ctx.fillStyle = "rgba(15,23,42,0.9)";
            ctx.fillRect(20, 50, 160, 24);
            ctx.strokeStyle = batColor;
            ctx.lineWidth = 2.5;
            ctx.strokeRect(20, 50, 160, 24);
            ctx.fillStyle = batColor;
            ctx.fillRect(23, 53, (player.battery / 100) * 154, 18);
            ctx.fillStyle = "#fff";
            ctx.font = "bold 12px 'Segoe UI'";
            ctx.fillText(`⚡ BATTERY: ${Math.ceil(player.battery)}%`, 35, 66);
        } else if (currentStage === 5) {
            ctx.fillStyle = "#043927";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.strokeStyle = "rgba(0,255,136,0.15)";
            ctx.lineWidth = 1;
            for (let x = 0; x < canvas.width; x += 35) { ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, canvas.height);
                ctx.stroke(); }
            for (let y = 0; y < canvas.height; y += 35) { ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(canvas.width, y);
                ctx.stroke(); }
            pcbComponents.forEach(comp => {
                ctx.fillStyle = "#0f172a";
                ctx.fillRect(comp.x, comp.y, comp.w, comp.h);
                ctx.strokeStyle = "#ffea00";
                ctx.lineWidth = 2;
                ctx.strokeRect(comp.x, comp.y, comp.w, comp.h);
                ctx.fillStyle = "#ffea00";
                ctx.font = "bold 11px 'Segoe UI'";
                ctx.fillText(comp.label, comp.x + 6, comp.y + comp.h / 2 + 4);
            });
            ctx.fillStyle = "#00f0ff";
            ctx.beginPath();
            ctx.arc(pcbStartPad.x, pcbStartPad.y, pcbStartPad.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = "#fff";
            ctx.lineWidth = 3;
            ctx.stroke();
            ctx.fillStyle = "#000";
            ctx.font = "bold 11px 'Segoe UI'";
            ctx.fillText("START", pcbStartPad.x - 17, pcbStartPad.y + 4);
            ctx.fillStyle = "#00ff88";
            ctx.beginPath();
            ctx.arc(pcbEndPad.x, pcbEndPad.y, pcbEndPad.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = "#fff";
            ctx.lineWidth = 3;
            ctx.stroke();
            ctx.fillStyle = "#000";
            ctx.font = "bold 11px 'Segoe UI'";
            ctx.fillText("TARGET", pcbEndPad.x - 20, pcbEndPad.y + 4);
            permanentPcbTraces.forEach((oldTrace) => {
                if (oldTrace.length > 1) {
                    ctx.strokeStyle = "#f97316";
                    ctx.lineWidth = 8;
                    ctx.lineCap = "round";
                    ctx.lineJoin = "round";
                    ctx.beginPath();
                    ctx.moveTo(oldTrace[0].x, oldTrace[0].y);
                    for (let i = 1; i < oldTrace.length; i++) ctx.lineTo(oldTrace[i].x, oldTrace[i].y);
                    ctx.stroke();
                }
            });
            if (currentPcbTrace.length > 1) {
                ctx.strokeStyle = isImmune ? "#00ff88" : "#ffea00";
                ctx.lineWidth = 7;
                ctx.lineCap = "round";
                ctx.lineJoin = "round";
                ctx.beginPath();
                ctx.moveTo(currentPcbTrace[0].x, currentPcbTrace[0].y);
                for (let i = 1; i < currentPcbTrace.length; i++) ctx.lineTo(currentPcbTrace[i].x, currentPcbTrace[
                i].y);
                ctx.stroke();
            }
            ctx.fillStyle = "#fff";
            ctx.font = "bold 14px 'Segoe UI'";
            ctx.fillText(`⚡ Traces: ${pcbTracesCount}/${pcbTargetTraces}`, 20, 80);
            ctx.fillStyle = "#ffea00";
            ctx.font = "12px 'Segoe UI'";
            ctx.fillText(isImmune ? "🛡️ Immunity Active" : "⚠️ Avoid previous traces!", 20, 100);
        } else if (currentStage === 6) {
            ctx.fillStyle = "#1e293b";
            ctx.fillRect(0, 280, canvas.width, 55);
            ctx.strokeStyle = "#00f0ff";
            ctx.lineWidth = 3;
            ctx.strokeRect(0, 280, canvas.width, 55);
            ctx.strokeStyle = "#334155";
            ctx.lineWidth = 4;
            for (let x = -conveyorBeltX; x < canvas.width; x += 30) {
                ctx.beginPath();
                ctx.moveTo(x, 280);
                ctx.lineTo(x + 15, 335);
                ctx.stroke();
            }
            ctx.fillStyle = "rgba(0,255,136,0.2)";
            ctx.fillRect(actuatorA.x - 20, 230, 100, 105);
            ctx.strokeStyle = "#00ff88";
            ctx.lineWidth = 1.5;
            ctx.strokeRect(actuatorA.x - 20, 230, 100, 105);
            ctx.fillStyle = "#00ff88";
            ctx.font = "bold 11px 'Segoe UI'";
            ctx.fillText("SENSOR A (METAL)", actuatorA.x - 15, 220);
            ctx.fillStyle = "rgba(255,0,127,0.2)";
            ctx.fillRect(actuatorB.x - 20, 230, 100, 105);
            ctx.strokeStyle = "#ff007f";
            ctx.lineWidth = 1.5;
            ctx.strokeRect(actuatorB.x - 20, 230, 100, 105);
            ctx.fillStyle = "#ff007f";
            ctx.font = "bold 11px 'Segoe UI'";
            ctx.fillText("SENSOR B (FAULT)", actuatorB.x - 15, 220);
            let extensionA = actuatorA.extendTimer > 0 ? 50 : 0;
            ctx.fillStyle = "#64748b";
            ctx.fillRect(actuatorA.x + 20, 140, 20, 90 + extensionA);
            ctx.fillStyle = "#00f0ff";
            ctx.fillRect(actuatorA.x, 130, 60, 30);
            ctx.fillStyle = "#fff";
            ctx.font = "bold 11px 'Segoe UI'";
            ctx.fillText("ACT A", actuatorA.x + 12, 150);
            let extensionB = actuatorB.extendTimer > 0 ? 50 : 0;
            ctx.fillStyle = "#64748b";
            ctx.fillRect(actuatorB.x + 20, 140, 20, 90 + extensionB);
            ctx.fillStyle = "#ff007f";
            ctx.fillRect(actuatorB.x, 130, 60, 30);
            ctx.fillStyle = "#fff";
            ctx.font = "bold 11px 'Segoe UI'";
            ctx.fillText("ACT B", actuatorB.x + 12, 150);
            conveyorItems.forEach(item => { ctx.font = "32px Arial";
                ctx.fillText(item.symbol, item.x - 16, item.y + 20); });
            ctx.fillStyle = "#fff";
            ctx.font = "bold 14px 'Segoe UI'";
            ctx.fillText(`⚙️ Sorted: ${sortedCount}/${targetSortedCount}`, 20, 80);
            ctx.fillStyle = "#00f0ff";
            ctx.font = "12px 'Segoe UI'";
            ctx.fillText("Keys: [1] Protect | [2] Scan | [3] Block", 20, 105);
        } else if (currentStage === 7) {
            ctx.strokeStyle = "rgba(0,240,255,0.1)";
            ctx.lineWidth = 1;
            for (let x = 0; x < canvas.width; x += 50) { ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, canvas.height);
                ctx.stroke(); }
            ctx.fillStyle = "#00f0ff";
            ctx.fillRect(canvas.width / 2 - 80, canvas.height - 100, 160, 45);
            ctx.strokeStyle = "#fff";
            ctx.lineWidth = 2;
            ctx.strokeRect(canvas.width / 2 - 80, canvas.height - 100, 160, 45);
            ctx.fillStyle = "#030712";
            ctx.font = "bold 15px 'Segoe UI'";
            ctx.fillText("MAIN SERVER", canvas.width / 2 - 50, canvas.height - 72);
            if (currentThreat) { ctx.font = "42px Arial";
                ctx.fillText(currentThreat.icon, canvas.width / 2 - 21, currentThreat.y); }
            ctx.fillStyle = "#fff";
            ctx.font = "bold 15px 'Segoe UI'";
            ctx.fillText(`🛡️ SOC Score: ${socScore}/${targetSocScore}`, 20, 80);
            ctx.fillStyle = "#00f0ff";
            ctx.font = "13px 'Segoe UI'";
            ctx.fillText("Keys: [1] Protect | [2] Scan | [3] Block", 20, 105);
        } else if (currentStage === 8) {
            ctx.fillStyle = "rgba(168,85,247,0.1)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "#0f172a";
            ctx.fillRect(20, 20, 200, 30);
            ctx.fillStyle = "#a855f7";
            ctx.font = "bold 14px 'Segoe UI'";
            ctx.fillText(`🐍 Python: ${pythonScore}/${targetPython}`, 30, 42);
            pythonCodeBlocks.forEach(block => {
                if (!block.collected) {
                    ctx.fillStyle = "#1e293b";
                    ctx.shadowColor = "#a855f7";
                    ctx.shadowBlur = 15;
                    ctx.fillRect(block.x - 25, block.y - 15, 50, 30);
                    ctx.shadowBlur = 0;
                    ctx.strokeStyle = "#a855f7";
                    ctx.lineWidth = 2;
                    ctx.strokeRect(block.x - 25, block.y - 15, 50, 30);
                    ctx.fillStyle = "#00f0ff";
                    ctx.font = "bold 12px 'Segoe UI'";
                    ctx.fillText(block.keyword, block.x - 18, block.y + 6);
                }
            });
            pythonBugs.forEach(bug => {
                ctx.fillStyle = "rgba(255,0,0,0.3)";
                ctx.beginPath();
                ctx.arc(bug.x, bug.y, bug.radius, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = "#ff4444";
                ctx.font = "20px Arial";
                ctx.fillText("🐛", bug.x - 10, bug.y + 7);
            });
        } else if (currentStage === 9) {
            ctx.fillStyle = "rgba(249,115,22,0.08)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "#0f172a";
            ctx.fillRect(20, 20, 260, 30);
            ctx.fillStyle = "#f97316";
            ctx.font = "bold 14px 'Segoe UI'";
            ctx.fillText(`🖨️ Parts: ${printPartsCollected}/${targetPrintParts}`, 30, 42);
            printParts.forEach(part => {
                if (!part.collected) {
                    ctx.fillStyle = "#1e293b";
                    ctx.shadowColor = "#f97316";
                    ctx.shadowBlur = 15;
                    ctx.fillRect(part.x - 15, part.y - 15, 30, 30);
                    ctx.shadowBlur = 0;
                    ctx.strokeStyle = "#f97316";
                    ctx.lineWidth = 2;
                    ctx.strokeRect(part.x - 15, part.y - 15, 30, 30);
                    ctx.font = "20px Arial";
                    ctx.fillText(part.symbol, part.x - 10, part.y + 8);
                }
            });
            printBugs9.forEach(bug => {
                ctx.fillStyle = "rgba(255,0,0,0.3)";
                ctx.beginPath();
                ctx.arc(bug.x, bug.y, bug.radius, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = "#ff4444";
                ctx.font = "20px Arial";
                ctx.fillText("🐛", bug.x - 10, bug.y + 7);
            });
        } else if (currentStage === 10) {
            ctx.fillStyle = "rgba(16,185,129,0.08)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "#0f172a";
            ctx.fillRect(20, 20, 250, 30);
            ctx.fillStyle = "#10b981";
            ctx.font = "bold 14px 'Segoe UI'";
            ctx.fillText(`🔧 Arduino: ${arduinoScore}/${targetArduino}`, 30, 42);
            arduinoObstacles10.forEach(obs => {
                ctx.fillStyle = "rgba(255,0,0,0.3)";
                ctx.beginPath();
                ctx.arc(obs.x, obs.y, obs.radius, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = "#ff3333";
                ctx.font = "18px Arial";
                ctx.fillText("⚡", obs.x - 10, obs.y + 8);
            });
            arduinoPins.forEach(pin => {
                ctx.fillStyle = pin.connected ? "#10b981" : "#1e293b";
                ctx.shadowColor = pin.connected ? "#10b981" : "transparent";
                ctx.shadowBlur = pin.connected ? 15 : 0;
                ctx.beginPath();
                ctx.arc(pin.x, pin.y, 22, 0, Math.PI * 2);
                ctx.fill();
                ctx.shadowBlur = 0;
                ctx.strokeStyle = pin.connected ? "#10b981" : "#64748b";
                ctx.lineWidth = 2;
                ctx.stroke();
                ctx.fillStyle = "#fff";
                ctx.font = "bold 10px 'Segoe UI'";
                ctx.fillText(pin.id, pin.x - 12, pin.y + 4);
                let orderIdx = arduinoPinOrder.indexOf(pin.id);
                if (orderIdx >= 0 && !pin.connected) {
                    ctx.fillStyle = "#ffea00";
                    ctx.font = "bold 10px 'Segoe UI'";
                    ctx.fillText(`#${orderIdx+1}`, pin.x - 8, pin.y + 40);
                }
            });
            if (arduinoActiveWire) {
                ctx.strokeStyle = "#10b981";
                ctx.lineWidth = 3;
                ctx.setLineDash([5, 5]);
                ctx.beginPath();
                ctx.moveTo(player.x + player.width / 2, player.y + player.height / 2);
                ctx.lineTo(arduinoActiveWire.x, arduinoActiveWire.y);
                ctx.stroke();
                ctx.setLineDash([]);
                ctx.beginPath();
                ctx.arc(arduinoActiveWire.x, arduinoActiveWire.y, 28, 0, Math.PI * 2);
                ctx.strokeStyle = "#10b981";
                ctx.lineWidth = 2;
                ctx.stroke();
            }
        }

        // Draw player
        if (currentStage <= 5 && player.invulnerableTimer % 10 < 5) {
            if (currentStage === 4) {
                ctx.save();
                ctx.translate(player.x + 18, player.y + 20);
                ctx.rotate(player.angle);
                ctx.drawImage(marioImg, -18, -20, 36, 40);
                ctx.restore();
            } else if (currentStage === 5) {
                ctx.fillStyle = isImmune ? "#00ff88" : "#ff007f";
                ctx.beginPath();
                ctx.arc(player.x, player.y, 10, 0, Math.PI * 2);
                ctx.fill();
                ctx.strokeStyle = "#fff";
                ctx.lineWidth = 2;
                ctx.stroke();
            } else if (currentStage >= 8 && currentStage <= 10) {
                ctx.drawImage(marioImg, player.x, player.y, player.width, player.height);
            } else {
                ctx.drawImage(marioImg, player.x, player.y, player.width, player.height);
            }
        } else if (currentStage >= 8 && currentStage <= 10) {
            ctx.drawImage(marioImg, player.x, player.y, player.width, player.height);
        }

        // UI overlay
        ctx.fillStyle = "#00f0ff";
        ctx.font = "bold 14px 'Segoe UI', Tahoma";
        ctx.fillText(`👤 ${playerName} | 🎯 WS ${currentStage} | ❤️ ${lives} | 🪙 ${coins}`, 15, 30);
        ctx.fillStyle = timer <= 10 ? "#ff007f" : "#00ff88";
        ctx.fillText(`⏱️ ${timer}s`, canvas.width / 2 - 35, 30);
    } else if (gameState === "MINIGAME") {
        miniCoins.forEach(coin => {
            if (!coin.collected) { ctx.fillStyle = "#ffea00";
                ctx.beginPath();
                ctx.arc(coin.x, coin.y, 10, 0, Math.PI * 2);
                ctx.fill(); }
        });
        ctx.font = "24px Arial";
        miniBugs.forEach(bug => ctx.fillText("👾", bug.x - 12, bug.y + 12));
        ctx.drawImage(marioImg, player.x, player.y, player.width, player.height);
        ctx.fillStyle = "#ffea00";
        ctx.font = "bold 16px 'Segoe UI', Tahoma";
        ctx.fillText(`🪙 ${coins} | ⏱️ ${miniTimer}s`, 20, 30);
    }

    if (toastTimer > 0) {
        ctx.fillStyle = "rgba(255,0,127,0.9)";
        ctx.fillRect(canvas.width / 2 - 220, 110, 440, 38);
        ctx.strokeStyle = "#fff";
        ctx.lineWidth = 2;
        ctx.strokeRect(canvas.width / 2 - 220, 110, 440, 38);
        ctx.fillStyle = "#fff";
        ctx.font = "bold 14px 'Segoe UI'";
        ctx.textAlign = "center";
        ctx.fillText(toastMessage, canvas.width / 2, 135);
        ctx.textAlign = "left";
    }
}

function gameLoop() { update();
    draw();
    requestAnimationFrame(gameLoop); }

// --- Start ---
gameLoop();

