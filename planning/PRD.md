# 📘 Product Requirements Document (PRD)

# [ProveIt.io](http://ProveIt.io) – Skill-Based Hiring Platform


---

## 1. 📌 Product Overview

**[ProveIt.io](http://ProveIt.io)** is a skill-based hiring platform where companies evaluate candidates based on real project submissions instead of resumes.

The platform enables:

* Project-based job hiring
* AI + manual evaluation
* Ranking engine
* Competitions
* Subscription-based SaaS model
* Enterprise-level admin control


---

## 2. 🎯 Vision

To eliminate resume-based hiring and replace it with real, verifiable skill evaluation.


---

## 3. 👥 User Roles

### 3.1 Super Admin

* Manage system settings
* Manage feature flags
* Override evaluations
* View analytics
* Manage roles & permissions

### 3.2 Admin

* Approve companies
* Evaluate projects
* Schedule interviews
* Moderate content

### 3.3 Candidate

* Create profile
* Apply to jobs
* Submit projects
* View rankings
* Participate in competitions

### 3.4 Company

* Post jobs
* Define project challenges
* View ranked candidates
* Schedule interviews
* Purchase subscription plans


---

## 4. 🧩 Core Modules


---

### 4.1 Authentication & Role System

* JWT-based authentication
* Role-based access control (RBAC)
* Two-factor authentication (2FA)
* Account lock system
* Audit logs


---

### 4.2 Candidate Module

* Profile management
* Skills & experience tracking
* Resume upload
* GitHub integration
* Application tracking
* Metrics dashboard


---

### 4.3 Company Module

* Company verification
* Job credit system
* Job posting with project statement
* Candidate shortlist view
* Hiring analytics


---

### 4.4 Job & Project System

Each job includes:

* Required skills
* Project statement
* Difficulty level
* Deadline
* Ranking logic

Project submission supports:

* GitHub repo
* ZIP upload
* Google Drive link
* Live demo link


---

### 4.5 Evaluation System

Project evaluation includes:

* Auto score (AI based)
* Manual score (Admin)
* Plagiarism detection
* Weighted final score

### Ranking Formula:

Final Score =
(ManualScore × 0.5) +
(AutoScore × 0.3) +
(100 − PlagiarismScore) × 0.2


---

### 4.6 Ranking Engine

* Auto ranking per job
* Leaderboard generation
* Percentile calculation
* Tie-breaking logic
* Re-ranking support


---

### 4.7 Interview System

* Multi-round interviews
* Technical / HR / Managerial
* Feedback & rating system
* Final decision tracking


---

### 4.8 Subscription & SaaS Engine

Plan types:

* Free
* Pro
* Enterprise

Features controlled via:

* Feature flags
* Job limits
* Competition access
* Analytics access
* Priority ranking


---

### 4.9 Competition Module

* Skill challenges
* Hiring competitions
* Project schema validation
* File restrictions
* Leaderboard


---

### 4.10 Notification System

Event-based notifications:

* Application status
* Interview scheduled
* Payment success
* Competition results

Supports:

* In-app notifications
* Future push/email integration


---

### 4.11 Chat System

* Candidate ↔ Company communication
* Message history
* Real-time support (future WebSocket support)


---

### 4.12 File Storage System

* Secure cloud storage
* File metadata tracking
* Size validation
* Plagiarism scanning integration


---

### 4.13 Admin Dashboard

* Platform analytics
* Revenue tracking
* User growth metrics
* System health monitoring


---

### 4.14 System Settings

* Maintenance mode
* Auto-evaluation toggle
* Ranking weight control
* Registration control


---

## 5. 📊 Analytics & Reporting

Daily metrics tracked:

* Total users
* Total applications
* Revenue
* Job success rate
* Conversion rates
* Hiring efficiency


---

## 6. 🔐 Security Requirements

* Password hashing (bcrypt)
* 2FA support
* Role-based permission validation (backend enforced)
* Activity logs
* Account lock after failed attempts
* Rate limiting
* Input validation & sanitization


---

## 7. ⚙️ Non-Functional Requirements

* Scalable to 1M+ users
* Modular architecture
* Microservice-ready design
* Cloud deployment ready
* High availability
* Database indexing optimization


---

## 8. 🚀 Future Enhancements

* AI Resume Parsing
* AI Interview Bot
* Skill Verification Badges
* Video Interview Recording
* Blockchain-based Skill Certificates
* Redis caching layer
* Event-driven architecture


---

## 9. 📅 MVP Scope

MVP Includes:

* Authentication
* Job posting
* Project submission
* Evaluation system
* Ranking engine
* Basic subscription
* Notifications


---

## 10. 🏁 Success Metrics

* % of hires through project evaluation
* Average hiring time reduction
* Candidate skill accuracy improvement
* Subscription conversion rate
* Monthly recurring revenue (MRR)


---

# End of PRD

[ProveIt.io](http://ProveIt.io) – Skill First. Resume Later.