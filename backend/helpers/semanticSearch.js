const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API);

const semanticSearch = async (query, skills) => {
  // For embeddings, use the embedding-001 model
  const model = genAI.getGenerativeModel({ model: "embedding-001" });

  // Query for a web developer

  const queryResult = await model.embedContent(query);
  const queryEmbedding = queryResult.embedding.values;

  // Replace with your actual skills array
  const similarSkills = [];

  // Calculate similarity for each skill
  for (const skill of skills) {
    const skillResult = await model.embedContent(skill);
    const skillEmbedding = skillResult.embedding.values;

    // Calculate cosine similarity (you can use other similarity measures)
    const similarity = calculateCosineSimilarity(
      queryEmbedding,
      skillEmbedding
    );

    // Store skill and similarity
    similarSkills.push({ skill, similarity });
  }

  // Sort skills by similarity in descending order
  similarSkills.sort((a, b) => b.similarity - a.similarity);

  console.log(`Top skills similar to "${query}":`, similarSkills);
  return similarSkills;
};

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

module.exports = { semanticSearch };
