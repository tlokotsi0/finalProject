import { renderListWithTemplate } from "./utils.mjs";
import Routine from "./Routine.mjs"; 

function exerciseTemplate(exercise) {
    const apiKey = 'c68ad3903dmsh3834323f3cbd19cp12047bjsnde4c82474c93'; 
    const imageUrl = `https://exercisedb.p.rapidapi.com/image/${exercise.id}?rapidapi-key=${apiKey}`;

    return `<li class="exercise-card">
        <div class="image-container">
            <img src="${imageUrl}" 
                 alt="${exercise.name}" 
                 loading="lazy"
                 onerror="this.src='https://placehold.co/300x300?text=Image+Not+Available'">
        </div>
        <h3 class="exercise-name">${exercise.name}</h3>
        <p class="exercise-target">Target: ${exercise.target}</p>
        <button class="add-to-routine" data-id="${exercise.id}">Add to Routine</button>
    </li>`;
}

export default class WorkoutList {
    constructor(dataSource, listElement) {
        this.dataSource = dataSource;
        this.listElement = listElement;
        this.routine = new Routine(); // Initialize routine saving logic
    }

    async init(searchTerm, type = "target") {
        this.listElement.innerHTML = "<li>Loading...</li>";
        
        try {
            let list = [];
            if (type === "target") {
                list = await this.dataSource.getExerciseData(searchTerm);
            } else if (type === "bodyPart") {
                list = await this.dataSource.getExercisesByBodyPart(searchTerm);
            }

            if (list && list.length > 0) {
                // Slice to 20 to save your API credits!
                const limitedList = list.slice(0, 20);
                this.renderList(limitedList);
            } else {
                this.listElement.innerHTML = "<li>No exercises found. Try 'waist', 'shoulders', or 'cardio'.</li>";
            }
        } catch (err) {
            console.error(err);
            this.listElement.innerHTML = "<li>Error loading data.</li>";
        }
    }

    renderList(list) {
        // 1. Render the cards
        renderListWithTemplate(exerciseTemplate, this.listElement, list, true);

        // 2. Attach click events for BOTH the Modal and the Add Button
        const cards = this.listElement.querySelectorAll(".exercise-card");
        
        cards.forEach((card, index) => {
            const exercise = list[index];

            // Click the card (except the button) to see Modal
            card.addEventListener("click", (e) => {
                if (e.target.tagName !== "BUTTON") {
                    this.showModal(exercise);
                }
            });

            // Click the Button to add to routine
            const btn = card.querySelector(".add-to-routine");
            btn.addEventListener("click", (e) => {
                e.stopPropagation(); // Prevents the modal from opening when clicking the button
                this.addToRoutineHandler(exercise, btn);
            });
        });
    }

    addToRoutineHandler(exercise, button) {
        const result = this.routine.addExercise(exercise);

        if (result.success) {
            button.textContent = "✅ Added!";
            button.style.backgroundColor = "#2ecc71";
        } else {
            button.textContent = "⚠ In Routine";
            button.style.backgroundColor = "#e67e22";
        }

        setTimeout(() => {
            button.textContent = "Add to Routine";
            button.style.backgroundColor = "";
        }, 2000);
    }

    showModal(exercise) {
        const modal = document.getElementById("exercise-modal");
        const details = document.getElementById("modal-details");
        const apiKey = 'c68ad3903dmsh3834323f3cbd19cp12047bjsnde4c82474c93';

        const instructions = exercise.instructions 
            ? exercise.instructions.map(step => `<li>${step}</li>`).join("") 
            : "No instructions available.";

        details.innerHTML = `
            <h2>${exercise.name.toUpperCase()}</h2>
            <img src="https://exercisedb.p.rapidapi.com/image/${exercise.id}?rapidapi-key=${apiKey}" alt="${exercise.name}">
            <div class="modal-info">
                <p><strong>Body Part:</strong> ${exercise.bodyPart}</p>
                <p><strong>Equipment:</strong> ${exercise.equipment}</p>
                <p><strong>Target Muscle:</strong> ${exercise.target}</p>
            </div>
            <h3>Instructions</h3>
            <ol>${instructions}</ol>
        `;

        modal.style.display = "block";
        modal.querySelector(".close-modal").onclick = () => modal.style.display = "none";
        window.onclick = (event) => { if (event.target == modal) modal.style.display = "none"; };
    }
}