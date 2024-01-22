const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API);

const semanticEvents = async (userSkills, events, threshold = 0.6) => {
  // For embeddings, use the embedding-001 model
  const model = genAI.getGenerativeModel({ model: "embedding-001" });

  // User skills array

  // Event data with targeted skills arrays
  // Embed user skills
  const userEmbeddings = await embedSkills(model, userSkills);

  // Embed targeted skills for each event and calculate event embeddings
  const eventEmbeddings = await Promise.all(
    events.map(async (event) => {
      const eventSkillsEmbedding = await embedSkills(
        model,
        event?.targetedSkills ? event?.targetedSkills : event.skills
      );
      return { id: event.id, embedding: eventSkillsEmbedding };
    })
  );

  // Calculate similarity between user and each event
  const similarities = eventEmbeddings.map((entry) => {
    const similarity = calculateCosineSimilarity(
      entry.embedding,
      userEmbeddings
    );
    return { id: entry.id, similarity };
  });

  // Filter events based on the threshold
  const filteredEvents = similarities.filter(
    (entry) => entry.similarity >= threshold
  );

  // Sort filtered events by similarity in descending order
  filteredEvents.sort((a, b) => b.similarity - a.similarity);

  console.log("Events ranked by similarity:", filteredEvents);
  return filteredEvents;
};

// Function to embed skills
async function embedSkills(model, skills) {
  const result = await model.embedContent(skills);
  return result.embedding.values;
}

// Function to calculate cosine similarity
function calculateCosineSimilarity(vectorA, vectorB) {
  const dotProduct = vectorA.reduce((acc, val, i) => acc + val * vectorB[i], 0);
  const magnitudeA = Math.sqrt(
    vectorA.reduce((acc, val) => acc + val * val, 0)
  );
  const magnitudeB = Math.sqrt(
    vectorB.reduce((acc, val) => acc + val * val, 0)
  );
  return dotProduct / (magnitudeA * magnitudeB);
}

module.exports = { semanticEvents };
