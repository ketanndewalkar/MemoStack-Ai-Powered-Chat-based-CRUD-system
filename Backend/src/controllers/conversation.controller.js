import Conversation from "../models/conversation.modal.js";
import Session from "../models/session.model.js";
import Tools from "../utils/aiAgentTools.js";
import { llmCall } from "../utils/llmCall.js";
import { SYSTEM_PROMPT } from "../utils/SYSTEM_PROMPT.js";

export const createSession = async (req, res) => {
  try {
    const userId = req.user.id;
    const session = await Session.create({ userId });
    const conversation = await Conversation.create({
      userId,
      sessionId: session._id,
    });
    if (!session || !conversation) {
      return res.status(500).json({
        message: "Server Error",
      });
    }
    res.status(201).json({
      message: `Session Id : ${session._id}`,
      data: { session, conversation },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const handleChat = async (req, res) => {
  try {
    const userId = req.user.id;
    const { query, sessionId } = req.body;
    const session = await Session.findById("69cfcccc86db8f2a96d4ff3e");
    // const session = await Session.findById(sessionId);
    // const conversation = await Conversation.findOne({ sessionId });
    const conversation = await Conversation.findOne({ sessionId:"69cfcccc86db8f2a96d4ff3e" });
    console.log("session : ",session)
    console.log("conversation : ",conversation)
    if (!session || !conversation) {
      res.status(500).json({
        message: "Server Error",
      });
    }

    // Adding SYSTEM_PROMPT and Query of User
    let message = [
      { role: "system", content: `${SYSTEM_PROMPT}\nuserId:${userId}` },
    ];

    if (conversation.recentMessages && conversation.recentMessages.length > 0) {
      // Assuming recentMessages is an array of objects. 
      // If it's a string, we wrap it.
      message.push({
        role: "system",
        content: `Previous conversation context: ${JSON.stringify(conversation.recentMessages)}`
      });
    }

    if (session.message && session.message.length > 0) {
      message.push(...session.message);
    }

    // adding the user Query
    message.push({ role: "user", content: query });

    // Initialize loop control
    let hold = false;
    // Continue interacting with LLM until a terminal response is received
    while (!hold) {
      const llmRes = await llmCall(message);
      let parseOut;
      // Attempt to parse JSON; if fails, extract JSON substring heuristically
      try {
        parseOut = JSON.parse(llmRes);
      } catch (error) {
        // Try to recover JSON from response text
        const jsonMatch = llmRes.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          try {
            parseOut = JSON.parse(jsonMatch[0]);
          } catch (_) {
            console.log("Failed to parse extracted JSON, requesting proper format");
          }
        }
        if (!parseOut) {
          message.push({
            role: "user",
            content: `Please respond with a valid JSON object only, without any surrounding text or arrays.`,
          });
          continue; // retry with corrected prompt
        }
      }

      // Handle parsed response types
      if (parseOut && parseOut.type === "output") {
        res.status(200).json({
          message: parseOut.msg,
        });
        session.message = message
        await session.save()
        hold = true; // terminal output
      } else if (parseOut && parseOut.type === "action") {
        const { Fn, args } = parseOut;
        // Save the assistant's action to history before getting observation
        message.push({ role: "assistant", content: JSON.stringify(parseOut) });

        const observation = await Tools[Fn](...(args || []));

        // Append observation to message chain for next LLM call
        message.push({
          role: "user",
          content: `Observation: ${JSON.stringify(observation)}. Now provide the final output or next action.`
        });
      } else if (parseOut && parseOut.type === "input_required") {
        res.status(200).json({
          message: parseOut.msg
        });
        message.push({ role: "assistant", content: JSON.stringify(parseOut) });
        session.message = message
        await session.save()
        hold = true;
      } else if (parseOut && parseOut.type === "plan") {
        // Save the plan to history
        message.push({ role: "assistant", content: JSON.stringify(parseOut) });
        // Acknowledge the plan and nudge to proceed
        message.push({
          role: "user",
          content: "Plan acknowledged. Please proceed with the action or final output."
        });
      } else if (parseOut) {
        // For any other structured response
        message.push({ role: "assistant", content: JSON.stringify(parseOut) });
        message.push({ role: "user", content: "Proceed." });
      }
    }
  } catch (error) {
    console.log("Error in handleChat:", error);
    if (!res.headersSent) {
      res.status(500).json({ message: "Server Error" });
    }
  }
};
