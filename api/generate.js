export default async function handler(req, res) {
  const prompt = "痛くて恥ずかしいセリフを1つ、日本語で短く作ってください。";

  try {
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

    console.log("OpenAI API response:", data);  // ここでAPIの返答をログに出す

    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      return res.status(500).json({ text: "APIの応答が正しくありません。" });
    }

    res.status(200).json({ text: data.choices[0].message.content.trim() });
  } catch (error) {
    console.error("Error fetching OpenAI API:", error);
    res.status(500).json({ text: "サーバーでエラーが発生しました。" });
  }
}//redeproy