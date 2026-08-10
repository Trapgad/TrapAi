const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");
const messages = document.getElementById("messages");
const welcome = document.getElementById("welcome");

const newChatBtn = document.getElementById("newChatBtn");
const mobileNewChat = document.getElementById("mobileNewChat");

const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");


// ========================================
// SEND MESSAGE
// ========================================

async function sendMessage() {

    const text = messageInput.value.trim();

    if (!text) return;

    welcome.style.display = "none";

    addMessage(text, "user");

    messageInput.value = "";
    messageInput.style.height = "auto";

    // Show loading message
    const loading = addMessage("Thinking...", "ai");

    try {

        const response = await fetch("/api/chat", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                message: text
            })

        });

        const data = await response.json();

        // Remove loading message
        loading.remove();

        if (!response.ok) {
            throw new Error(data.error || "Something went wrong.");
        }

        addMessage(data.reply, "ai");

    } catch (error) {

        loading.remove();

        addMessage(
            "Sorry, I couldn't connect to the AI right now. Please check your server.",
            "ai"
        );

        console.error("TRAP AI:", error);
    }
}


// ========================================
// ADD MESSAGE
// ========================================

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

    return message;
}


// ========================================
// NEW CHAT
// ========================================

function newChat() {

    messages.innerHTML = "";

    welcome.style.display = "block";

    messageInput.value = "";

    messageInput.style.height = "auto";
}


newChatBtn.addEventListener("click", newChat);

mobileNewChat.addEventListener("click", newChat);


// ========================================
// SEND BUTTON
// ========================================

sendBtn.addEventListener("click", sendMessage);


// ========================================
// ENTER TO SEND
// ========================================

messageInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter" && !event.shiftKey) {

        event.preventDefault();

        sendMessage();
    }

});


// ========================================
// AUTO RESIZE
// ========================================

messageInput.addEventListener("input", function() {

    this.style.height = "auto";

    this.style.height =
        Math.min(this.scrollHeight, 180) + "px";

});


// ========================================
// MOBILE SIDEBAR
// ========================================

menuBtn.addEventListener("click", function() {

    sidebar.classList.toggle("open");

});


// Close sidebar when clicking outside
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


// ========================================
// SCROLL
// ========================================

function scrollToBottom() {

    const chat = document.getElementById("chat");

    chat.scrollTo({

        top: chat.scrollHeight,

        behavior: "smooth"

    });
}


// ========================================
// SECURITY
// ========================================

function escapeHTML(text) {

    const div = document.createElement("div");

    div.textContent = text;

    return div.innerHTML;
}
