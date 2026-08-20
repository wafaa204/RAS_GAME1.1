export const levels = [
    {
        id: 1,
        title: "📡 Workshop 1: IoT Hardware",
        shortTitle: "IoT Hardware",
        icon: "📡",
        color: "#00f0ff",
        description: "Collect all IoT hardware and sensor components.",
        target: 10
    },
    {
        id: 2,
        title: "🧠 Workshop 2: Deep Learning",
        shortTitle: "Deep Learning",
        icon: "🧠",
        color: "#a855f7",
        description: "Build the neural network in the correct order.",
        target: 8
    },
    {
        id: 3,
        title: "🎬 Workshop 3: AI Video Creator",
        shortTitle: "AI Video",
        icon: "🎬",
        color: "#ff007f",
        description: "Collect valid AI video frames and avoid hallucinations.",
        target: 22
    },
    {
        id: 4,
        title: "🤖 Workshop 4: Robotics Arena",
        shortTitle: "Robotics",
        icon: "🤖",
        color: "#ffea00",
        description: "Navigate the arena, collect batteries and reach the goal.",
        target: 2
    },
    {
        id: 5,
        title: "🔌 Workshop 5: PCB Routing",
        shortTitle: "PCB Routing",
        icon: "🔌",
        color: "#00ff88",
        description: "Create more safe PCB traces without crossing components.",
        target: 7
    },
    {
        id: 6,
        title: "⚙️ Workshop 6: PLC & Actuators",
        shortTitle: "PLC & Actuators",
        icon: "⚙️",
        color: "#00f0ff",
        description: "Sort more conveyor items using the correct actuator.",
        target: 30
    },
    {
        id: 7,
        title: "🛡️ Workshop 7: SOC Cybersecurity",
        shortTitle: "SOC",
        icon: "🛡️",
        color: "#ff007f",
        description: "Defend the server against stronger incoming cyber threats.",
        target: 300
    },
    {
        id: 8,
        title: "🐍 Workshop 8: Python Code",
        shortTitle: "Python",
        icon: "🐍",
        color: "#a855f7",
        description: "Collect more Python keywords and avoid code bugs.",
        target: 22
    },
    {
        id: 9,
        title: "🖨️ Workshop 9: 3D Printing",
        shortTitle: "3D Printing",
        icon: "🖨️",
        color: "#f97316",
        description: "Collect all printed parts while avoiding more bugs.",
        target: 15
    },
    {
        id: 10,
        title: "🔧 Workshop 10: Arduino Wiring",
        shortTitle: "Arduino",
        icon: "🔧",
        color: "#10b981",
        description: "Connect more Arduino pins in the required order.",
        target: 8
    }
];

export function getLevel(levelId) {
    return levels.find(level => level.id === levelId) || levels[0];
}