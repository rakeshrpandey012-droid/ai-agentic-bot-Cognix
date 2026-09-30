import { Type } from "@google/genai"; // or "@google/generative-ai"

export const AgentConfigRespSchema = {
  type: Type.OBJECT,
  properties: {
    status: {
      type: Type.STRING,
      enum: ["needs_clarification", "ready"],
    },

    clarificationQuestions: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },

          question: { type: Type.STRING },

          type: {
            type: Type.STRING,
            enum: ["single_choice", "multiple_choice", "text"], // adjust options as needed
          },

          options: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
          },

          allowCustom: { type: Type.BOOLEAN },

          customPlaceholder: { type: Type.STRING },
        },
        required: ["id", "question", "type"],
      },
    },

    config: {
      type: Type.OBJECT,
    },
  },
  required: ["status"],
};