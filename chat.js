const messageInput = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");
const messages = document.getElementById("messages");
const welcome = document.getElementById("welcome");

function addMessage(text, sender) {
  const message = document.createElement("div");
  message.className = `message ${sender}`;
  message.textContent = text;

  messages.appendChild(message);
  messages.scrollTop = messages.scrollHeight;
}

async function sendMessage() {
  const message = messageInput.value.trim();

  if (!message) return;

  // Show user's message
  addMessage(message, "user");

  messageInput.value = "";
  sendButton.disabled = true;

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: message
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Something went wrong");
    }

    // Show TRAP AI response
    addMessage(data.reply, "assistant");

  } catch (error) {
    console.error(error);
    addMessage("Sorry, TRAP AI couldn't connect to the server.", "assistant");
  }

  sendButton.disabled = false;
}

sendButton.addEventListener("click", sendMessage);

messageInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    sendMessage();
  }
});