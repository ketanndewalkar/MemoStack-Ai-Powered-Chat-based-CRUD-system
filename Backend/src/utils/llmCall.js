import OpenAi from "openai"

let client;

export const llmCall = async (message) => {
    if (!client) {
        // Diagnostic log (safe: only prefix and length)
        const key = process.env.API_KEY || "";
        console.log(`LLM Client initializing. Key detected: ${key.substring(0, 7)}... | Length: ${key.length}`);
        
        client = new OpenAi({
            apiKey: key,
            baseURL: "https://openrouter.ai/api/v1",
            defaultHeaders: {
                "HTTP-Referer": "http://localhost:5173", // Optional, for OpenRouter rankings
                "X-Title": "Personal Knowledge Vault", // Optional
            }
        })
    }
    try {
        const res = await client.chat.completions.create({
            model: "openai/gpt-oss-120b",
            messages: [...message]
        })

        return res.choices[0].message.content
    } catch (error) {
        console.log("Error inside llmCall:", error)
        throw error;
    }
}