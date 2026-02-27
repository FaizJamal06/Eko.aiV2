# Architecture Requirements Document (ARD)
## AI Voice Booking Assistant – Demo Version

---

# 1. Overview

## 1.1 Purpose
This document defines the architecture and technical requirements for the AI Voice Booking Assistant demo. The system enables users to book appointments via voice and automatically creates events in Google Calendar using Vapi’s built-in integration.

## 1.2 Scope
The demo system includes:
- A web-based frontend
- Vapi voice agent handling conversation logic
- Direct Google Calendar integration
- Real-time transcript display
- Booking confirmation UI
- Optional upcoming bookings display

This is a single-user demo system and does not include multi-user authentication or advanced scheduling rules.

---

# 2. System Architecture

## 2.1 High-Level Architecture

Frontend (Web Application)
        ↓
Vapi Voice Agent (Built-in Google Calendar Tool)
        ↓
Google Calendar

---

# 3. System Components

## 3.1 Frontend Application

### 3.1.1 Responsibilities
- Initialize and control Vapi voice session
- Display real-time transcript
- Show booking confirmation
- Optionally display upcoming events

### 3.1.2 Suggested Tech Stack
- React or Next.js
- Tailwind CSS (optional)
- Vapi Web SDK

### 3.1.3 Core UI Components

#### A. Start Call Button
- Initiates Vapi voice session
- Shows connection state (Idle, Connecting, Listening, Speaking, Ended)
- Optional visual waveform indicator

#### B. Transcript Display Panel
- Displays:
  - User speech
  - Assistant responses
- Real-time streaming
- Auto-scroll enabled
- Clear role distinction

#### C. Booking Confirmation Card
Displayed after successful booking:
- Event Title
- Date
- Time
- Duration
- Optional link to open in Google Calendar

#### D. Upcoming Bookings Section (Optional)
- Displays next 3 upcoming events
- Read-only
- Shows:
  - Title
  - Date
  - Time

---

## 3.2 Vapi Voice Agent

### 3.2.1 Responsibilities
- Handle voice input/output
- Extract booking details
- Confirm booking information
- Check availability
- Create calendar event
- Respond conversationally

### 3.2.2 Required Capabilities
- Ask for missing information:
  - Date
  - Time
  - Duration (default: 30 minutes)
  - Optional meeting title or purpose
- Confirm details before booking
- Check availability before creating event
- Suggest alternatives if slot unavailable
- Provide clear booking confirmation

### 3.2.3 Behavior Requirements
- Professional tone
- Clear confirmations
- No duplicate bookings
- Graceful handling of unclear inputs

---

## 3.3 Google Calendar Integration

### 3.3.1 Integration Type
Vapi built-in Google Calendar integration

### 3.3.2 Required Permissions
- Read calendar events
- Create calendar events
- Check availability

### 3.3.3 Responsibilities
- Store events
- Return availability data
- Confirm successful creation

---

# 4. Functional Requirements

## 4.1 Call Flow

1. User clicks Start Call
2. Voice session initializes
3. User states booking request
4. Assistant gathers required details
5. Assistant checks availability
6. Assistant confirms details
7. Event is created
8. Confirmation displayed in UI

---

## 4.2 Booking Rules (Demo Defaults)

- Default meeting duration: 30 minutes
- Working hours: 9:00 AM – 6:00 PM
- No buffer time
- No multi-calendar logic
- Single Google account connected

---

## 4.3 Error Handling

### If:
- Time is invalid → ask for clarification
- Slot unavailable → suggest alternative times
- Request vague (“next week”) → narrow down
- Calendar creation fails → apologize and retry

---

# 5. Non-Functional Requirements

## 5.1 Performance
- Voice latency under 3 seconds
- Transcript updates in real time

## 5.2 Reliability
- No duplicate bookings
- Event must be visible in Google Calendar

## 5.3 Security
- OAuth handled through Vapi
- No manual token storage in frontend
- No sensitive keys exposed in client

---

# 6. Demo Experience Flow

1. User opens webpage
2. Clicks Start Call
3. Says:
   "Book me tomorrow at 4 PM for a project discussion."
4. Assistant confirms booking
5. Event is created in Google Calendar
6. Booking appears in UI confirmation section
7. Upcoming Bookings section reflects new event

---

# 7. Limitations (Demo Version)

- Single-user system
- No user accounts
- No payment processing
- No SMS/email notifications
- No CRM integration
- No advanced availability logic

---

# 8. Future Expansion Roadmap

## Phase 2
- Multi-user authentication
- Individual calendar connections
- Configurable working hours
- Buffer times
- Service types with different durations

## Phase 3
- Payment integration
- SMS/email reminders
- CRM integration
- Analytics dashboard
- Outbound calling

---

# 9. Success Criteria

The demo is considered successful if:

- A real calendar event is created via voice
- Transcript clearly shows AI reasoning
- UI appears polished and responsive
- No errors occur during live demonstration