import ExternalServices from "./ExternalServices.mjs";
import WorkoutList from "./WorkoutList.mjs";

const dataSource = new ExternalServices();
const listElement = document.querySelector(".exercise-list");

const workout = new WorkoutList(dataSource, listElement);

workout.init("abs", "target");

document.querySelector("#muscle-filters").addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
        const muscle = e.target.dataset.muscle;
        workout.init(muscle, "target"); 
    }
});

document.querySelector("#search-btn").addEventListener("click", () => {
    const query = document.querySelector("#search-input").value.toLowerCase().trim();
    if (query) {
        workout.init(query, "bodyPart");
    }
});