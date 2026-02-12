
export default class ExternalServices {
    constructor() {
        this.apiKey = 'c68ad3903dmsh3834323f3cbd19cp12047bjsnde4c82474c93'; 
        this.host = 'exercisedb.p.rapidapi.com';
    }

    async getTargetList() {
        const options = {
            method: 'GET',
            headers: { 
                'x-rapidapi-key': this.apiKey, 
                'x-rapidapi-host': this.host 
            }
        };
        
        const response = await fetch(`https://${this.host}/exercises/targetList`, options);
        return await this.convertToJSON(response);
    }

    async getExerciseData(muscle) {
        const options = {
            method: 'GET',
            headers: { 'x-rapidapi-key': this.apiKey, 'x-rapidapi-host': this.host }
        };
        const response = await fetch(`https://${this.host}/exercises/target/${muscle}`, options);
        return await this.convertToJSON(response);
    }

    async convertToJSON(res) {
        const jsonResponse = await res.json();
        if (res.ok) {
            return jsonResponse;
        } else {
            throw new Error(jsonResponse.message || "Bad Response");
        }
    }

    async getExerciseImage(exerciseId) {
       const options = {
            method: 'GET',
            headers: { 
                'x-rapidapi-key': this.apiKey, 
                'x-rapidapi-host': this.host 
            }
        };
        const response = await fetch(`https://${this.host}/image/${exerciseId}`, options);
        if (!response.ok) throw new Error("Image fetch failed");
    
        const blob = await response.blob();
        return URL.createObjectURL(blob);
    }

    async getExercisesByBodyPart(bodyPart) {
        const options = {
            method: 'GET',
            headers: { 
                'x-rapidapi-key': this.apiKey, 
                'x-rapidapi-host': this.host 
            }
        };
    const response = await fetch(`https://${this.host}/exercises/bodyPart/${bodyPart}`, options);
    return await this.convertToJSON(response);
    }


// WORKING ON THE SECOND API
    async getCaloriesBurned(activity, weight, duration) {
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': 'c68ad3903dmsh3834323f3cbd19cp12047bjsnde4c82474c93',
                'x-rapidapi-host': 'calories-burned-by-api-ninjas.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(
                `https://calories-burned-by-api-ninjas.p.rapidapi.com/v1/caloriesburned?activity=${activity}&weight=${weight}&duration=${duration}`, 
                options
            );
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching calories:", error);
        }
    } 
}