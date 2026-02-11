// js/Routine.mjs

export default class Routine {
    constructor() {
        this.key = "flexflow-routine";
    }

    // Get the current list of saved exercises
    getRoutine() {
        const stored = localStorage.getItem(this.key);
        return stored ? JSON.parse(stored) : [];
    }

    // Add a new exercise to the list
    addExercise(exercise) {
        const routine = this.getRoutine();
        
        // Check if it's already in the routine to avoid duplicates
        const exists = routine.find(item => item.id === exercise.id);
        
        if (!exists) {
            routine.push(exercise);
            localStorage.setItem(this.key, JSON.stringify(routine));
            return { success: true, message: "Added to Routine!" };
        } else {
            return { success: false, message: "Already in Routine" };
        }
    }

    // Remove an exercise (we will use this later)
    removeExercise(id) {
        let routine = this.getRoutine();
        routine = routine.filter(item => item.id !== id);
        localStorage.setItem(this.key, JSON.stringify(routine));
    }
}