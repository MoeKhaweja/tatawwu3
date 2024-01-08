const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const fs = require("fs");
const path = require("path");
const pdf = require("pdf-parse");
const mammoth = require("mammoth");
const MODEL_NAME = "gemini-pro";
const API_KEY = "AIzaSyB2HaRbyfk23Dg_O1VpOGU5MxQ7q4GoBlw";

async function run(extracted) {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  const parts = [
    {
      text: `i will provide you with a text of my cv, try to make a small about me (bio), and extract most important skills (skills should be titles or words )and take academic history, return only a json object like this without any surrounding data {bio:{String},academicHistory:[{degreeTitle:String, Institution:String}],skills:[]}, keep in mind that skills are so important, be non biased: ${extracted}`,
    },
  ];

  const result = await model.generateContent({
    contents: [{ role: "user", parts }],
    generationConfig,
    safetySettings,
  });

  const response = result.response;
  return response.text();
}

async function extractTextFromPDF(pdfPath) {
  let dataBuffer = fs.readFileSync(pdfPath);
  return pdf(dataBuffer).then(function (data) {
    return data.text;
  });
}

async function extractTextFromDOCX(docxPath) {
  return mammoth.extractRawText({ path: docxPath }).then(function (result) {
    return result.value;
  });
}

async function extractText(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  let res;

  if (ext === ".pdf") {
    return await extractTextFromPDF(filePath);
  } else if (ext === ".docx") {
    return await extractTextFromDOCX(filePath);
  } else {
    console.log("Unsupported file type.");
  }
}

// Example usage
async function extract(filePath) {
  const extracted = await extractText(filePath);
  const data = await run(extracted);

  let startIndex = data.indexOf("{"); // Find the index of the first {
  let endIndex = data.lastIndexOf("}"); // Find the index of the last }

  if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
    let extractedJSON = data.substring(startIndex, endIndex + 1); // Extract the JSON

    return JSON.parse(extractedJSON); // This will log the extracted JSON object
  } else {
    console.log("JSON not found or invalid format");
  }
}

module.exports = { extract };
