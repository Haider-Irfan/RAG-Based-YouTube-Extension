window.addEventListener("load", () => {
  const btn = document.getElementById("ask-btn");
  const questionInput = document.getElementById("question");
  const chatBox = document.getElementById("chat-box");

  async function sendMessage() {
    const question = questionInput.value.trim();
    if (!question) return;

    // Add user message
    const userMsg = document.createElement("div");
    userMsg.classList.add("message", "user");
    userMsg.textContent = question;
    chatBox.appendChild(userMsg);
    chatBox.scrollTop = chatBox.scrollHeight;

    questionInput.value = "";

    // Add thinking message
    const aiThinking = document.createElement("div");
    aiThinking.classList.add("message", "ai");
    aiThinking.textContent = "Thinking...";
    chatBox.appendChild(aiThinking);
    chatBox.scrollTop = chatBox.scrollHeight;

    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      const videoUrl = tab?.url || "";

      const res = await fetch("http://127.0.0.1:8000/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, video_url: videoUrl }),
      });

      if (!res.ok) {
        aiThinking.textContent = "⚠️ Error fetching response. Check backend.";
        return;
      }

      const data = await res.json();
      aiThinking.textContent = data.answer || "No response received.";
    } catch (err) {
      aiThinking.textContent = "❌ Connection failed (is FastAPI running?)";
      console.error(err);
    }

    chatBox.scrollTop = chatBox.scrollHeight;
  }

  btn.addEventListener("click", sendMessage);

  questionInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });
});
