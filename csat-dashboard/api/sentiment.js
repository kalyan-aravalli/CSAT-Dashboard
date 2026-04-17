export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { feedbacks } = req.body;
  if (!feedbacks || !feedbacks.length) return res.json({ sentiments: [] });

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 1000,
        messages: [{
          role: "user",
          content: `Analyze sentiment of these survey responses. Return ONLY a valid JSON array, no markdown, no explanation. Each item: {id: number, sentiment: "positive"|"neutral"|"negative"}. Responses: ${JSON.stringify(feedbacks)}`
        }]
      })
    });

    const data = await response.json();
    const text = (data.content || []).find(c => c.type === "text")?.text || "[]";
    const clean = text.replace(/```json|```/g, "").trim();
    const sentiments = JSON.parse(clean);
    res.json({ sentiments });
  } catch (e) {
    console.error("Sentiment error:", e);
    res.status(500).json({ error: e.message, sentiments: [] });
  }
}
