import { renderListWithTemplate } from "./utils.mjs";

function exerciseTemplate(exercise) {
    return `<li class="exercise-card">
        <img src="${exercise.gifUrl}" alt="${exercise.name}">
        <h3>${exercise.name}</h3>
        <p>Target: ${exercise.target}</p>
    </li>`;
}

export default class WorkoutList {
    constructor(muscle, dataSource, listElement) {
        this.muscle = muscle;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }

    async init() {
        const list = await this.dataSource.getExerciseData(this.muscle);
        this.renderList(list);
    }

    renderList(list) {
        renderListWithTemplate(exerciseTemplate, this.listElement, list);
    }
}