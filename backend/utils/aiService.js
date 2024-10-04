// utils/aiService.js
const OpenAI = require('openai'); // Use CommonJS import style

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // Ensure your API key is set in the environment
});

const getEnhancedDescription = async (taskDescription) => {
    try {
        const chatCompletion = await client.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'user',
                    content: `Enhance this task description: ${taskDescription}`,
                },
            ],
        });

        return chatCompletion.choices[0].message.content; 
    } catch (error) {
        console.error('Error communicating with OpenAI:', error);
        throw error; 
    }
};

const getRecommendation = async (workerSkills, taskDescription, taskName) => {
    const prompt = `Based on the skills "${workerSkills}", recommend if the task "${taskName}" is a good fit. Provide reasons why or why not. Task description: "${taskDescription}".`;
    
    try {
        const response = await client.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: prompt }],
        });
        return response.choices[0].message.content; // Extract the recommendation message
    } catch (error) {
        console.error('Error fetching AI recommendation:', error);
        throw error; // Rethrow the error for handling in the route
    }
};

module.exports = {
    getEnhancedDescription, 
    getRecommendation,
};
