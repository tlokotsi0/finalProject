import Routine from "./Routine.mjs";
import { renderListWithTemplate } from "./utils.mjs";

const routineManager = new Routine();
const listElement = document.getElementById("routine-list");

// We can reuse a modified version of your template
function routineTemplate(exercise) {
    return `<li class="exercise-card">
        <div class="image-container">
            <img src="https://exercisedb.p.rapidapi.com/image/${exercise.id}?rapidapi-key=c68ad3903dmsh3834323f3cbd19cp12047bjsnde4c82474c93" alt="${exercise.name}">
        </div>
        <h3>${exercise.name}</h3>
        <p>Target: ${exercise.target}</p>
        <button class="remove-btn" data-id="${exercise.id}">❌ Remove</button>
    </li>`;
}

function init() {
    const myExercises = routineManager.getRoutine();
    
    if (myExercises.length === 0) {
        listElement.innerHTML = "<p>Your routine is empty. Go add some exercises!</p>";
        return;
    }

    // Render the saved list
    renderListWithTemplate(routineTemplate, listElement, myExercises);

    // Add "Remove" functionality
    const removeButtons = document.querySelectorAll(".remove-btn");
    removeButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            const id = e.target.dataset.id;
            routineManager.removeExercise(id);
            init(); // Refresh the list
        });
    });
}

init();

import ExternalServices from "./ExternalServices.mjs";

const services = new ExternalServices();

async function calculateTotalCalories() {
    const weight = document.getElementById("user-weight").value;
    const duration = document.getElementById("total-duration").value;
    const burnValue = document.getElementById("burn-value");
    const resultDisplay = document.getElementById("calorie-result");

    if (!weight || !duration) {
        alert("Please enter weight and duration!");
        return;
    }

    const myExercises = routineManager.getRoutine();
    let totalBurn = 0;
    burnValue.innerText = "Calculating...";
    resultDisplay.classList.remove("hidden");

    for (const exercise of myExercises) {
        // IMPROVEMENT: Use the 'target' muscle or 'bodyPart' instead of the specific name
        // This is much more likely to match the Calorie API's database
        const searchTerm = exercise.target || exercise.bodyPart || "calisthenics";
        
        const data = await services.getCaloriesBurned(searchTerm, weight, duration);
        
        if (data && data.length > 0) {
            totalBurn += data[0].total_calories;
        } else {
            // Fallback: If muscle fails, try a generic "weight lifting" search
            const fallbackData = await services.getCaloriesBurned("weight lifting", weight, duration);
            if (fallbackData && fallbackData.length > 0) {
                totalBurn += fallbackData[0].total_calories;
            }
        }
    }

    burnValue.innerText = Math.round(totalBurn);
}

document.getElementById("calc-calories-btn").onclick = calculateTotalCalories;