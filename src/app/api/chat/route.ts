import { google } from "@ai-sdk/google";
import { streamText } from "ai";

export async function POST(req: Request) {
  const {
    messages,
    data: { modelConfig },
  } = await req.json();
  const {
    temperature,
    topPSampling: topP,
    presencePenalty,
    frequencyPenalty,
  } = modelConfig;

  /*  Temperature setting. This is a number between 0 (almost no randomness) and 1 (very random).
      Presence penalty setting. It affects the likelihood of the model to repeat information that is already in the prompt.
      Frequency penalty setting. It affects the likelihood of the model to repeatedly use the same words or phrases.
  */

  const result = streamText({
    model: google("gemini-1.5-flash-latest"),
    messages: messages,
    temperature,
    topP,
    presencePenalty,
    frequencyPenalty,
  });

  return result.toDataStreamResponse();
}
