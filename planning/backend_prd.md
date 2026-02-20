# 📘 PRD.md

# ProveIt.io – Backend Product Requirements Document

## Version: 1.1 (Enterprise + AI Architecture)

**Database:** MongoDB \n **Architecture:** Modular Monolith → Microservice Ready → AI-Integrated


---

# 1️⃣ Product Overview

ProveIt.io is a skill-based hiring platform backend that:

* Replaces resume-based hiring with project evaluation
* Supports SaaS subscriptions
* Enables ranking-based hiring
* Provides analytics & business intelligence
* Integrates AI-powered career assistant
* Ensures enterprise-grade security & audit compliance

Backend must support:

* 1M+ users
* Multi-role RBAC
* Real-time ranking
* Secure payment flow
* Analytics-driven insights
* AI-powered assistance (Free model integration)


---

# 2️⃣ System Architecture Overview

### Core Backend Modules


 1. Authentication & Authorization
 2. User & Role Management
 3. Candidate Profile Engine
 4. Company Management
 5. Job & Project Engine
 6. Evaluation & Ranking Engine
 7. Interview System
 8. Subscription & Payment System
 9. Competition Engine
10. Messaging System
11. Notification Engine
12. Support & Contact System
13. OTP & Security System
14. Content Management (FAQs & Testimonials)
15. Analytics & BI Engine
16. Activity Logging & Audit
17. System Configuration
18. 🤖 AI Assistant Module (NEW)


---

# 3️⃣ Authentication & Authorization

### Models Used:

* Users
* Roles
* Otps
* Activity_logs

### Requirements:

* JWT-based authentication
* Role-based access control (RBAC)
* Two-factor authentication (2FA ready)
* Account lock after failed attempts
* Secure OTP validation
* Encrypted password storage (bcrypt)
* Audit logging of login attempts

### Security Rules:

* Never trust frontend role
* Validate permissions from roles collection
* Enforce account lock on repeated failure
* Rate limit login attempts


---

# 4️⃣ User Management Module

### Models:

* Users
* Candidate_profiles

### Functional Requirements:

* Create / Update / Soft Delete user
* Role assignment
* Candidate skill management
* Resume upload
* GitHub profile linking
* Track user metrics (applications, shortlisted, selected)

### Non-Functional:

* Index on email
* Index on skills.name
* Soft delete support
* Query optimization for large user base


---

# 5️⃣ Company Management

### Models:

* Companies
* Subscriptions
* Plans

### Functional Requirements:

* Company onboarding
* Admin verification
* Subscription validation before job posting
* Job credit enforcement
* Company performance metrics tracking

### Business Rule:

If subscription expired → disable job posting \n If job credits exhausted → prevent new job creation


---

# 6️⃣ Job & Project Engine

### Models:

* Jobs
* Projects
* Applications

### Features:

* Slug-based unique job URLs
* Required skill indexing
* Project-based evaluation instead of resume
* Submission type validation
* Max submission control
* Application state machine

### Application Status Flow:

submitted → shortlisted → interview_scheduled → selected/rejected


---

# 7️⃣ Evaluation & Ranking Engine

### Models:

* Projects
* Applications
* System_settings

### Ranking Formula:

Final Score = \n (ManualScore × manualWeight) + \n (AutoScore × autoWeight) + \n (100 − PlagiarismScore) × plagiarismWeight

Weights fetched dynamically from system_settings.

### Features:

* Auto score integration
* Manual score override
* Plagiarism threshold validation
* Ranking recalculation support
* Percentile calculation
* Tie-breaking logic

### Performance Requirement:

Ranking generation must complete < 30 seconds for 10,000 applications


---

# 8️⃣ Interview Module

### Model:

* Interviews

### Requirements:

* Multi-round interview support
* Technical / HR classification
* Round feedback & rating
* Final decision tracking
* Status history
* Interview audit logs


---

# 9️⃣ Subscription & Payment Engine

### Models:

* Subscriptions
* Plans
* Payments

### Requirements:

* Plan-based feature gating
* Monthly recurring revenue (MRR) tracking
* Payment gateway integration
* Audit-safe transaction storage
* Expiry detection
* Retry mechanism for failed payments

### Business Logic:

If payment fails → subscription inactive \n If expired → restrict premium features


---

# 🔟 Competition Module

### Model:

* Competitions

### Features:

* Skill competitions
* Time-bound challenges
* Project schema validation
* Ranking integration
* Leaderboard generation


---

# 1️⃣1️⃣ Messaging System

### Models:

* Chats
* Messages

### Requirements:

* Scalable design (separate messages collection)
* Indexed on chatId
* Future WebSocket ready
* Last message timestamp for sorting
* Soft delete support


---

# 1️⃣2️⃣ Notification System

### Model:

* Notifications

### Events Supported:

* Application updates
* Interview scheduled
* Payment success
* Competition results
* AI usage limit alerts

### Requirements:

* Read/unread state
* Indexed by userId
* Event-driven generation
* Push notification ready


---

# 1️⃣3️⃣ Support & Contact System

### Model:

* Contact_messages

### Requirements:

* Admin assignment
* Status lifecycle (new → in_progress → resolved → closed)
* Priority management
* Response tracking
* Full audit trail


---

# 1️⃣4️⃣ OTP & Security Layer

### Model:

* Otps

### Requirements:

* Hashed OTP storage
* TTL index on expiresAt
* Max attempt enforcement
* Single-use validation
* Auto-expire logic


---

# 1️⃣5️⃣ Content Management

### Models:

* Testimonials
* Faqs

### Requirements:

* Admin approval system
* Category filtering
* Featured testimonial flag
* FAQ ordering support
* View count tracking
* Soft delete support


---

# 1️⃣6️⃣ Analytics & Business Intelligence

### Model:

* Analytics

### Purpose:

* Daily snapshot aggregation
* Revenue tracking
* User growth monitoring
* Hiring efficiency tracking
* AI usage monitoring (NEW)

### Metrics:

Users:

* users.total
* users.new
* users.active

Business:

* companies.total
* jobs.total
* applications.total

Revenue:

* revenue.daily
* revenue.monthlyRecurring

Hiring:

* hiringMetrics.avgTimeToHire
* hiringMetrics.conversionRate

AI:

* ai.totalChats
* ai.totalMessages
* ai.dailyUsage

### Aggregation Strategy:

* Daily cron job at 00:00 UTC
* Snapshot stored permanently
* Dashboard reads only from analytics collection

### Performance Requirement:

Dashboard load < 1 second


---

# 1️⃣7️⃣ 🤖 AI Assistant Module (NEW)

### Models:

* ai_chats
* ai_messages
* ai_limits (optional rate limit)

### Features:

* Resume improvement AI
* Interview preparation assistant
* Project explanation assistant
* General career guidance
* Context-aware AI (job/project linked)

### Rate Limiting:

* Free tier daily message limit
* Reset via scheduled job

### Security:

* Only owner can access chat
* Assistant responses written via backend service only

### Future Upgrade Path:

* Token tracking
* AI subscription monetization
* AI resume scoring
* AI interview simulator


---

# 1️⃣8️⃣ Activity Logs & Audit

### Model:

* Activity_logs

Track:

* Actor ID
* Role
* Action performed
* Target entity
* IP address
* User agent
* Timestamp

Required for:

* Compliance
* Admin accountability
* Debugging
* Security monitoring


---

# 1️⃣9️⃣ System Settings

### Model:

* System_settings

Controls:

* Maintenance mode
* Registration toggle
* Ranking weight adjustment
* Auto-evaluation toggle
* Plagiarism threshold
* AI enable/disable toggle

Must support runtime configuration changes without redeployment.


---

# 2️⃣0️⃣ Non-Functional Requirements

* Support 1M+ users
* Horizontal scaling ready
* Index optimization
* Soft delete where needed
* Read-heavy optimization
* Secure API validation
* Input sanitization
* Rate limiting
* Secure headers
* AI service timeout handling
* Graceful error fallback


---

# 2️⃣1️⃣ Performance Benchmarks

* Login response < 300ms
* Job search < 500ms
* Ranking generation < 30 sec
* Dashboard analytics < 1 sec
* AI response time < 3 sec


---

# 2️⃣2️⃣ Future Enhancements

* AI Resume Parsing
* AI Interview Bot
* Event-driven microservices
* Redis caching layer
* GraphQL support
* AI hiring prediction
* Growth forecasting engine
* Enterprise multi-tenant mode

# 🚀 Final Backend Status (v1.1)

Backend is:

✅ Enterprise RBAC Ready \n ✅ SaaS Subscription Ready \n ✅ Ranking Engine Integrated \n ✅ Analytics Driven \n ✅ AI Integrated (Free Tier Ready) \n ✅ Audit Compliant \n ✅ Microservice Ready \n ✅ Investor Ready