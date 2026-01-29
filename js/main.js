import ExternalServices from "./ExternalServices.mjs";
import WorkoutList from "./WorkoutList.mjs";

const dataSource = new ExternalServices();
const listElement = document.querySelector(".exercise-list");

// Initial load
const workout = new WorkoutList("abs", dataSource, listElement);
workout.init();

// Handle filter clicks
document.querySelector("#muscle-filters").addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
        const muscle = e.target.dataset.muscle;
        const newWorkout = new WorkoutList(muscle, dataSource, listElement);
        newWorkout.init();
    }
});