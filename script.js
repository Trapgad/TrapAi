const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");
const messages = document.getElementById("messages");
const welcome = document.getElementById("welcome");

const newChatBtn = document.getElementById("newChatBtn");
const mobileNewChat = document.getElementById("mobileNewChat");

const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");


// ===============================
// SEND MESSAGE
// ===============================

function sendMessage() {

    const text = messageInput.value.trim();

    if (!text) return;

    // Hide welcome screen
    welcome.style.display = "none";

    // Add user message
    addMessage(text, "user");

    // Clear input
    messageInput.value = "";

    // Reset textarea height
    messageInput.style.height = "auto";

    // Simulate AI response
    setTimeout(() => {

        const response = generateResponse(text);

        addMessage(response, "ai");

    }, 700);
}


// ===============================
// ADD MESSAGE
// ===============================

function addMessage(text, type) {

    const message = document.createElement("div");

    message.classList.add("message");

    if (type === "user") {

        message.innerHTML = `
            <div class="message-avatar">T</div>

            <div class="message-content user-message">
                ${escapeHTML(text)}
            </div>
        `;

    } else {

        message.innerHTML = `
            <div class="message-avatar">AI</div>

            <div class="message-content ai-message">
                ${escapeHTML(text)}
            </div>
        `;

    }

    messages.appendChild(message);

    scrollToBottom();
}


// ===============================
// SIMPLE AI TEST BRAIN
// ===============================

function generateResponse(text) {

    const message = text.toLowerCase();

    if (
        message.includes("hello") ||
        message.includes("hi") ||
        message.includes("hey")
    ) {

        return "Hey! 👋 I'm TRAP AI. How can I help you today?";

    }

    if (message.includes("who are you")) {

        return "I'm TRAP AI — your AI assistant. 🚀";

    }

    if (message.includes("trap ai")) {

        return "TRAP AI is your own AI assistant. We're currently building version 1.";

    }

    if (message.includes("website")) {

        return "I can help you build websites, debug code, design interfaces and create web applications. 💻";

    }

    if (message.includes("code")) {

        return "Absolutely. Send me the code and tell me what you want to change. 💻";

    }

    return `
I'm still in development right now. 🤖

You said:

"${text}"

My real AI brain isn't connected yet.

That's our next major step.
`;

}


// ===============================
// NEW CHAT
// ===============================

function newChat() {

    messages.innerHTML = "";

    welcome.style.display = "block";

    messageInput.value = "";

    messageInput.style.height = "auto";
}


// Desktop new chat
newChatBtn.addEventListener("click", newChat);


// Mobile new chat
mobileNewChat.addEventListener("click", newChat);


// ===============================
// SEND BUTTON
// ===============================

sendBtn.addEventListener("click", sendMessage);


// ===============================
// ENTER TO SEND
// ===============================

messageInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter" && !event.shiftKey) {

        event.preventDefault();

        sendMessage();

    }

});


// ===============================
// AUTO RESIZE TEXTAREA
// ===============================

messageInput.addEventListener("input", function() {

    this.style.height = "auto";

    this.style.height = Math.min(
        this.scrollHeight,
        180
    ) + "px";

});


// ===============================
// MOBILE SIDEBAR
// ===============================

menuBtn.addEventListener("click", function() {

    sidebar.classList.toggle("open");

});


// Close sidebar when clicking a chat
document.addEventListener("click", function(event) {

    if (
        window.innerWidth <= 768 &&
        sidebar.classList.contains("open") &&
        !sidebar.contains(event.target) &&
        event.target !== menuBtn
    ) {

        sidebar.classList.remove("open");

    }

});


// ===============================
// SCROLL
// ===============================

function scrollToBottom() {

    const chat = document.getElementById("chat");

    chat.scrollTo({

        top: chat.scrollHeight,

        behavior: "smooth"

    });

}


// ===============================
// SECURITY
// ===============================

function escapeHTML(text) {

    const div = document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

}