const messageInput = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");
const messages = document.getElementById("messages");
const welcome = document.getElementById("welcome");

const newChat = document.getElementById("newChat");
const mobileNewChat = document.getElementById("mobileNewChat");

const menuButton = document.getElementById("menuButton");
const sidebar = document.querySelector(".sidebar");

const chatHistory = document.getElementById("chatHistory");


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

    // Add chat to history
    addHistory(text);

    // Clear input
    messageInput.value = "";

    messageInput.style.height = "auto";

    // Temporary AI response
    setTimeout(() => {

        addMessage(
            "I'm TRAP AI 🤖. My real AI brain will be connected in the next step.",
            "ai"
        );

    }, 700);
}


// ===============================
// ADD MESSAGE
// ===============================

function addMessage(text, type) {

    const message = document.createElement("div");

    message.className = "message";

    if (type === "user") {

        message.innerHTML = `
            <div class="message-avatar">
                T
            </div>

            <div class="message-content user-message">
                ${escapeHTML(text)}
            </div>
        `;

    } else {

        message.innerHTML = `
            <div class="message-avatar">
                AI
            </div>

            <div class="message-content ai-message">
                ${escapeHTML(text)}
            </div>
        `;

    }

    messages.appendChild(message);

    scrollToBottom();
}


// ===============================
// CHAT HISTORY
// ===============================

function addHistory(text) {

    const item = document.createElement("div");

    item.className = "history-item";

    item.textContent = text;

    chatHistory.prepend(item);
}


// ===============================
// NEW CHAT
// ===============================

function startNewChat() {

    messages.innerHTML = "";

    chatHistory.innerHTML = "";

    welcome.style.display = "block";

    messageInput.value = "";

    messageInput.style.height = "auto";
}


newChat.addEventListener("click", startNewChat);

mobileNewChat.addEventListener("click", startNewChat);


// ===============================
// SEND BUTTON
// ===============================

sendButton.addEventListener("click", sendMessage);


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
// AUTO RESIZE
// ===============================

messageInput.addEventListener("input", function() {

    this.style.height = "auto";

    this.style.height =
        Math.min(this.scrollHeight, 180) + "px";

});


// ===============================
// MOBILE SIDEBAR
// ===============================

menuButton.addEventListener("click", function() {

    sidebar.classList.toggle("open");

});


// ===============================
// CLOSE SIDEBAR
// ===============================

document.addEventListener("click", function(event) {

    if (
        window.innerWidth <= 768 &&
        sidebar.classList.contains("open") &&
        !sidebar.contains(event.target) &&
        event.target !== menuButton
    ) {

        sidebar.classList.remove("open");

    }

});


// ===============================
// SCROLL
// ===============================

function scrollToBottom() {

    const chatArea =
        document.getElementById("chatArea");

    chatArea.scrollTo({

        top: chatArea.scrollHeight,

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