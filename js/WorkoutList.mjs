import { renderListWithTemplate } from "./utils.mjs";

function exerciseTemplate(exercise) {
    const apiKey = 'c68ad3903dmsh3834323f3cbd19cp12047bjsnde4c82474c93'; 
    const imageUrl = `https://exercisedb.p.rapidapi.com/image/${exercise.id}?rapidapi-key=${apiKey}`;

    return `<li class="exercise-card">
        <img src="${imageUrl}" alt="${exercise.name}" loading="lazy" 
             onerror="this.src='https://placehold.co/300x300?text=Image+Not+Found'">
        <h3 class="exercise-name">${exercise.name}</h3>
        <p class="exercise-target">Target: ${exercise.target}</p>
        <button class="add-to-routine">Add to Routine</button>
    </li>`;
}

export default class WorkoutList {
    constructor(dataSource, listElement) {
        this.dataSource = dataSource;
        this.listElement = listElement;
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
                this.renderList(list);
            } else {
                this.listElement.innerHTML = "<li>No exercises found. Try 'waist', 'shoulders', or 'cardio'.</li>";
            }
        } catch (err) {
            console.error(err);
            this.listElement.innerHTML = "<li>Error loading data.</li>";
        }
    }

    renderList(list) {
        renderListWithTemplate(exerciseTemplate, this.listElement, list, true);
    }

    

    renderList(list) {
        renderListWithTemplate(exerciseTemplate, this.listElement, list, true);

        const cards = this.listElement.querySelectorAll(".exercise-card");
        cards.forEach((card, index) => {
        card.addEventListener("click", () => {
            this.showModal(list[index]);
        });
        });
    }

    showModal(exercise) {
        const modal = document.getElementById("exercise-modal");
        const details = document.getElementById("modal-details");

        const instructions = exercise.instructions 
            ? exercise.instructions.map(step => `<li>${step}</li>`).join("") 
            : "No instructions available.";

        details.innerHTML = `
            <h2>${exercise.name.toUpperCase()}</h2>
            <img src="https://exercisedb.p.rapidapi.com/image/${exercise.id}?rapidapi-key=YOUR_KEY" alt="${exercise.name}">
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