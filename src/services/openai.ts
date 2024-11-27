import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export async function generateResponse(prompt: string): Promise<string> {
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        { 
          role: "system", 
          content: "You are MiRA, an advanced AI assistant focused on personal growth and productivity. Your responses should be helpful, concise, and encouraging."
        },
        { 
          role: "user", 
          content: prompt 
        }
      ],
      model: "gpt-3.5-turbo",
    });

    return completion.choices[0]?.message?.content || "I apologize, but I couldn't generate a response. Please try again.";
  } catch (error) {
    console.error('Error generating response:', error);
    throw new Error('Failed to generate response. Please try again later.');
  }
}