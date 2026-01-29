export default class ExternalServices {
    constructor() {
        // Replace with your actual key
        this.apiKey = 'c68ad3903dmsh3834323f3cbd19cp12047bjsnde4c82474c93'; 
        this.host = 'exercisedb.p.rapidapi.com';
    }

    // This handles the specific code you received (The Target List)
    async getTargetList() {
        const options = {
            method: 'GET',
            headers: { 
                'x-rapidapi-key': this.apiKey, 
                'x-rapidapi-host': this.host 
            }
        };
        
        // Fetching from the endpoint provided in your snippet
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
            // RapidAPI often sends error messages in the JSON body
            throw new Error(jsonResponse.message || "Bad Response");
        }
    }
}
