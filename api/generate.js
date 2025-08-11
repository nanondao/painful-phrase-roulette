export default async function handler(req, res) {
  const prompt = "痛くて恥ずかしいセリフを1つ、日本語で短く作ってください。";

  const apiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 50
    })
  });

  const data = await apiResponse.json();
  res.status(200).json({ text: data.choices[0].message.content.trim() });
}