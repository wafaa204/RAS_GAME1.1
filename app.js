import { levels, getLevel } from "../levels/levels.js";

const Bootcamp = {
    levels,
    currentLevel: 1,

    getLevel(levelId) {
        return getLevel(Number(levelId));
    },

    setCurrentLevel(levelId) {
        const level = this.getLevel(levelId);
        this.currentLevel = level.id;

        const title = document.getElementById("mainTitle");

        if (title) {
            title.textContent = level.title;
        }

        window.dispatchEvent(
            new CustomEvent("bootcamp:level-selected", {
                detail: level
            })
        );

        return level;
    },

    updateHubCards() {
        this.levels.forEach(level => {
            const card = document.getElementById(`selectStage${level.id}`);

            if (!card) return;

            const title = card.querySelector("h4");
            const description = card.querySelector("p");

            if (title) {
                title.textContent = `WS ${level.id}`;
                title.style.color = level.color;
            }

            if (description) {
                description.textContent = level.shortTitle;
            }

            card.title = level.description;
            card.style.borderColor = level.color;
            card.dataset.levelId = String(level.id);
        });
    },

    getAllLevels() {
        return [...this.levels];
    }
};

window.Bootcamp = Bootcamp;

function loadGameScript() {
    if (document.querySelector('script[data-game-script="true"]')) {
        return;
    }

    const script = document.createElement("script");
    script.src = "./js/game.js";
    script.dataset.gameScript = "true";
    script.defer = true;

    script.addEventListener("error", () => {
        console.error("Unable to load js/game.js");
    });

    document.body.appendChild(script);
}

document.addEventListener("DOMContentLoaded", () => {
    Bootcamp.updateHubCards();
    loadGameScript();
});