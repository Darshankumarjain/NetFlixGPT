import OpenAI from "openai";
import { OPENAI_KEY } from "./constants";

const openai = new OpenAI({
  apiKey: OPENAI_KEY,
  baseURL: "https://openrouter.ai/api/v1",
  dangerouslyAllowBrowser: true,
});

export default openai;
