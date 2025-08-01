// import {createAgent, gemini} from '@inngest/agent-kit'

// const analyzeTicket = async (ticket)=>{

//         const supportAgent = createAgent({
//                 model:gemini({
//                         model:"gemini-1.5-flash-8b",
//                         apiKey:process.env.GEMINI_API_KEY,

//                 }),

//                 name:"Ai Ticket Triage Assistant",
//                 system:`You are an expert AI assistant that processes technical support tickets. 

// Your job is to:
// 1. Summarize the issue.
// 2. Estimate its priority.
// 3. Provide helpful notes and resource links for human moderators.
// 4. List relevant technical skills required.

// IMPORTANT:
// - Respond with *only* valid raw JSON.
// - Do NOT include markdown, code fences, comments, or any extra formatting.
// - The format must be a raw JSON object.

// Repeat: Do not wrap your output in markdown or code fences.`,

//         });

//         const response = await supportAgent.run(`You are a ticket triage agent. Only return a strict JSON object with no extra text, headers, or markdown.
        
// Analyze the following support ticket and provide a JSON object with:

// - summary: A short 1-2 sentence summary of the issue.
// - priority: One of "low", "medium", or "high".
// - helpfulNotes: A detailed technical explanation that a moderator can use to solve this issue. Include useful external links or resources if possible.
// - relatedSkills: An array of relevant skills required to solve the issue (e.g., ["React", "MongoDB"]).

// Respond ONLY in this JSON format and do not include any other text or markdown in the answer:

// {
// "summary": "Short summary of the ticket",
// "priority": "high",
// "helpfulNotes": "Here are useful tips...",
// "relatedSkills": ["React", "Node.js"]
// }

// ---

// Ticket information:

// - Title: ${ticket.title}
// - Description: ${ticket.description}`);

// const raw = response.output[0].context 

// try {
//         const match = raw.match(/```json\s*([\s\S]*?)\s*```/i);
//         const jsonString = match? match[1] : raw.trim() 

//         return JSON.parse(jsonString)

// } catch (e) {
//         console.log("Failed to parse json from ai response"+e.message)
//         return null   // we need to know more about this
// }
                
// }

// export default 


import { createAgent, gemini } from '@inngest/agent-kit'

const analyzeTicket = async (ticket) => {
  console.log("inside analyzeTicket function with ticket:", ticket);
  const supportAgent = createAgent({
    model: gemini({
      model: 'gemini-1.5-flash-8b',
      apiKey: process.env.GEMINI_API_KEY,
    }),
    name: 'AI Ticket Triage Assistant',
    system: `You are an expert AI assistant that processes technical support tickets.

Your job is to:
1. Summarize the issue.
2. Estimate its priority.
3. Provide helpful notes and resource links for human moderators.
4. List relevant technical skills required.

IMPORTANT:
- Respond with *only* valid raw JSON.
- Do NOT include markdown, code fences, comments, or any extra formatting.
- The format must be a raw JSON object.`,
  });

  const response = await supportAgent.run(`Analyze the following support ticket and return ONLY a strict JSON object with:

{
  "summary": "Short summary of the ticket",
  "priority": "high",
  "helpfulNotes": "Here are useful tips...",
  "relatedSkills": ["React", "Node.js"]
}

Ticket:
- Title: ${ticket.title}
- Description: ${ticket.description}`);

  let rawOutput = response.output[0].content ;

  console.log("Raw AI Output:", rawOutput);

  // ✅ Clean handling for raw JSON or markdown-wrapped response
  try {
    // If AI wrapped it in ```json...```, extract only inner JSON
    const match = rawOutput.match(/```json\s*([\s\S]*?)\s*```/i);
    const jsonString = match ? match[1].trim() : rawOutput.trim();
    const json = JSON.parse(jsonString);
    console.log("Parsed AI JSON:", json);
    return json;
  } catch (e) {
    console.error("❌ Failed to parse AI JSON:", e.message);
    console.log("AI Raw Output:", rawOutput);
    return null;
  }
};

export default analyzeTicket;
