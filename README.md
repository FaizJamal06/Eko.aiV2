# Eko.aiV2 - Voice Booking Assistant

A modern, glassmorphic React web application powered by **Vapi.ai** that serves as an AI voice receptionist. This assistant is capable of holding natural voice conversations, understanding user intent, capturing details (name and email), checking calendar availability, and booking appointments directly into Google Calendar.

## 🌟 Features

- **Real-time Voice AI:** Instantaneous voice-to-voice interaction using Vapi's Web SDK.
- **Google Calendar Integration:** Checks real-time availability and creates 30-minute calendar events automatically.
- **Live Transcription Panel:** See what the AI and the user are saying in a beautiful chat-like interface.
- **Booking Confirmation UI:** Visually pops up event details upon successful booking.
- **Premium Aesthetics:** Uses modern CSS features out of the box—Glassmorphism, animated waveforms, dynamic gradients, and smooth state transitions.

---

## 🏗 Tech Stack

- **Frontend Framework:** [React 18](https://react.dev/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **AI Infrastructure:** [Vapi.ai SDK](https://docs.vapi.ai/)
- **Styling:** Vanilla CSS (No utility frameworks; custom design system)
- **Icons & Visuals:** Inline SVGs and CSS micro-animations

---

## 🧠 AI Agent Workflow & Rules

The soul of this project lives within the Vapi Assistant's system prompt. Built for a dental clinic, the agent rigorously follows these rules:

1. **Context Understanding:** Primary goal is to book appointments or answer general queries.
2. **Detail Extraction:** Asks for Full Name and explicitly confirms Email Addresses (spelling out if necessary).
3. **Availability Checking:** *NEVER* guesses availability. Always calls the `google_calendar_check_availability_tool` before proposing a slot.
4. **Time & Bounds:** Books strictly in `Asia/Kolkata` time, only issues 30-minute slots, and restricts bookings strictly to `09:00 - 18:00`.
5. **Event Creation:** Automatically invokes `google_calendar_create_tool`, linking the user's email so they immediately receive a calendar invite.

---

## 🚀 Local Setup

### Prerequisites
- Node.js (v18+)
- A [Vapi.ai](https://vapi.ai) account with a configured Assistant.
- Google Calendar integrated within your Vapi Dashboard.

### 1. Clone & Install
\`\`\`bash
git clone https://github.com/FaizJamal06/Eko.aiV2.git
cd Miniproject2
npm install
\`\`\`

### 2. Configure Vapi Keys
1. Open `src/App.jsx`.
2. Locate the following variables at the top of the file:
   \`\`\`javascript
   const vapi = new Vapi('YOUR_VAPI_PUBLIC_KEY');
   const ASSISTANT_ID = 'YOUR_ASSISTANT_ID';
   \`\`\`
3. (Note: In this specific repository, the API keys are pushed directly into the codebase as this is a private demo repo.)

### 3. Required Dashboard Configuration
The frontend *does not* override the assistant's prompt (to avoid wiping out Vapi tool configurations). You must paste the following into the **System Prompt** inside the Vapi Dashboard for your Assistant:

<details>
<summary>Click to view System Prompt</summary>

\`\`\`text
You are the voice receptionist for a dental clinic in India.

Booking rules (must follow):
- Timezone: Asia/Kolkata.
- Appointment length: exactly 30 minutes.
- Working hours: 09:00–18:00 (inclusive start time; last start time is 17:30).
- Never book outside working hours.
- Never guess availability: ALWAYS call the calendar availability tool before proposing/confirming a time.
- If requested time is unavailable, offer the next available 30-minute slot within working hours.

Workflow:
1) Understand what the caller needs. Focus on booking.
2) For booking: Collect full name first. IF the name sounds unusual, explicitly ask them to spell it out.
3) Ask for their email address. IMPORTANT: Instruct them to say their email address slowly, character by character if needed.
4) CRITICAL EMAIL CONFIRMATION: You must read the email address back to them exactly as you understood it (e.g., "I heard J O H N at G M A I L dot com, is that correct?") and wait for their confirmation before moving on.
5) Ask for preferred date and time.
6) Check availability using google_calendar_check_availability_tool.
7) When booking: create a calendar event using google_calendar_create_tool, setting the email as an attendee.
8) Confirm: repeat the booked date/time in IST.

Style:
- Friendly, professional, concise.
- Ask ONE question at a time.
- Read times clearly.

Safety:
- No medical advice.
\`\`\`
</details>

Ensure both `google_calendar_check_availability_tool` and `google_calendar_create_tool` are enabled on the assistant! Setting the LLM model to **GPT-4o** and transcriber to **Deepgram** is highly recommended for accurate email capturing.

### 4. Run the Dev Server
\`\`\`bash
npm run dev
\`\`\`
Navigate to `http://localhost:5173/` in your browser. Click **Start Call**, put on your headphones, and book an appointment!

---

## 🎨 Project Structure

- `src/App.jsx`: The core orchestrator handling SDK integration and visual state mapping.
- `src/components/StartCallButton.jsx`: Handles microphone states and waveform UI.
- `src/components/TranscriptPanel.jsx`: Parses the `vapi.on('message')` stream into distinct assistant/user bubbles.
- `src/components/BookingConfirmation.jsx`: Intercepts tool calls to slide an event card onto the screen when booked.
- `src/index.css`: Global styles, layout systems, and animations.
