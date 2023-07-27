import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const POST = async (request) => {
    console.log(request)
    const { userId, title, prompt, url, tag } = await request.json();
    try {
        await connectToDB();
        const newPrompt = new Prompt({ creator: userId, title, prompt, url, tag });
        await newPrompt.save();
        console.log(JSON.stringify(newPrompt))
        return new Response(JSON.stringify(newPrompt), { status: 201 })
    } catch (error) {
        console.log(error)
        return new Response("Failed to create a new prompt", { status: 500 });
    }
}