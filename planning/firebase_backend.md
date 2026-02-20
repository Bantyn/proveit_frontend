# ProveIt.io – Backend Product Requirements Document

## Version: 1.1 (Firebase Enterprise Architecture)

**Backend Stack:** Firebase (Auth + Firestore + Cloud Functions + Storage + FCM) \n **Architecture Type:** Serverless → Scalable → Microservice-Ready


---

# 1️⃣ Product Overview

ProveIt.io is a skill-based hiring platform backend built on Firebase that:

* Enables project-based hiring instead of resume-based hiring
* Supports SaaS subscription model
* Implements ranking-based candidate selection
* Provides enterprise-grade analytics
* Ensures secure authentication and RBAC
* Supports AI-ready architecture for future expansion

### Backend must support:

* 1M+ users
* Multi-role access control
* Secure file handling
* Real-time updates
* Automated ranking
* Business intelligence dashboard


---

# 2️⃣ Backend Architecture Overview

### Firebase Services Used:

* Firebase Authentication
* Firestore (NoSQL Database)
* Firebase Storage
* Cloud Functions (Business Logic Layer)
* Firebase Cloud Messaging (Push Notifications)
* Scheduled Functions (Analytics Cron Jobs)

### Architecture Principles:

* Serverless-first design
* Business logic isolated in Cloud Functions
* Firestore optimized with indexed queries
* Cost-efficient read/write patterns
* Security enforced at database level


---

# 3️⃣ Authentication & Authorization

## 3.1 Authentication

* Email & Password login
* Google OAuth
* Optional Phone Authentication
* Multi-Factor Authentication (2FA)

## 3.2 Role Management

### Roles:

* super_admin
* admin
* candidate
* company_owner

### Role Storage:

* Firestore user document
* Firebase custom claims (server-side enforced)

## 3.3 Access Control

* Enforced through Firestore Security Rules
* No role validation on frontend
* All sensitive writes verified via Cloud Functions
* Rate limiting for authentication attempts


---

# 4️⃣ User & Profile Management

### Supports:

* User registration
* Profile updates
* Candidate skill tracking
* Resume uploads
* GitHub integration
* Soft account disable

### Security:

* Only authenticated user can update own profile
* Admin override capability
* Firestore rule-level ownership validation


---

# 5️⃣ Company Management

### Supports:

* Company onboarding
* Admin verification workflow
* Subscription linking
* Job credit validation
* Company performance metrics

### Business Rules:

* If subscription expired → disable job posting
* If job credits exhausted → prevent job creation
* Only verified companies can publish public jobs


---

# 6️⃣ Job & Project Engine

### Features:

* Unique job slugs
* Required skills indexing
* Project-based submission
* Max submission enforcement
* Visibility control (public/private)
* Status control (active/closed)

Applications stored as subcollections under jobs.

### Application Status Flow:

submitted → shortlisted → interview_scheduled → selected/rejected


---

# 7️⃣ Project Evaluation & Ranking Engine

### Evaluation Types:

* Auto score
* Manual score
* Plagiarism score

### Ranking Formula:

Final Score = \n (ManualScore × manualWeight) + \n (AutoScore × autoWeight) + \n (100 − PlagiarismScore) × plagiarismWeight

Weights are dynamically fetched from system_settings.

### Execution:

* Ranking logic runs in Cloud Functions
* Triggered on evaluation update
* Re-ranking supported

### Performance Requirement:

Ranking calculation < 30 seconds for 10,000 submissions


---

# 8️⃣ Interview Module

### Supports:

* Multi-round interviews
* Round-based feedback
* Rating system
* Final decision tracking
* Interview state validation

### Security:

Only company owner or admin can update interview status.


---

# 9️⃣ Subscription & Payment Engine

### Supports:

* Plan-based feature control
* Active / expired status
* Payment verification via Cloud Functions
* Monthly recurring revenue tracking
* Subscription expiry monitoring

### Business Rules:

* Payment success → activate subscription
* Payment failure → restrict features
* Expired subscription → disable premium features


---

# 🔟 Competition Module

### Supports:

* Skill-based competitions
* Time-bound project challenges
* Ranking integration
* Competition-specific validation
* Leaderboard generation


---

# 1️⃣1️⃣ Messaging System

### Architecture:

* chats collection
* messages subcollection

### Supports:

* Candidate ↔ Company communication
* Timestamp-based sorting
* Real-time updates via Firestore listeners
* WebSocket-ready future integration


---

# 1️⃣2️⃣ Notification System

### Triggers:

* Application status updates
* Interview scheduled
* Subscription activated
* Competition results
* AI usage limit alerts (future ready)

Notifications stored in Firestore. \n Push notifications sent via Firebase Cloud Messaging.


---

# 1️⃣3️⃣ Support & Contact System

### Features:

* Contact form submission
* Admin assignment
* Priority levels
* Status lifecycle (new → in_progress → resolved → closed)
* Response tracking
* Audit logging


---

# 1️⃣4️⃣ OTP & Security System

### Used For:

* Email verification
* Password reset
* 2FA login

### Requirements:

* OTP stored hashed
* TTL expiration via Firestore TTL
* Max attempt limit
* Single-use enforcement
* Cloud Function validation


---

# 1️⃣5️⃣ Content Management

Includes:

* Testimonials (admin approval required)
* FAQs (category-based filtering)
* Order-based display
* Featured testimonials
* View tracking

Admin-only write access enforced by rules.


---

# 1️⃣6️⃣ Analytics & Business Intelligence

### Daily Snapshot Model Includes:

Users:

* Total users
* New users
* Active users

Business:

* Companies count
* Jobs count
* Applications count

Revenue:

* Daily revenue
* Monthly recurring revenue

Hiring Metrics:

* avgTimeToHire
* conversionRate

### Aggregation Strategy:

* Cloud Scheduled Function runs every 24 hours
* Snapshot stored in analytics collection
* Dashboard reads only from analytics (no heavy live queries)

### Performance Requirement:

Admin dashboard load < 1 second


---

# 1️⃣7️⃣ Activity Logs & Audit Trail

Tracks:

* Actor ID
* Role
* Action performed
* Target entity
* IP address
* Timestamp

Required for:

* Compliance
* Admin accountability
* Debugging
* Security investigation


---

# 1️⃣8️⃣ System Configuration

System settings allow runtime control of:

* Maintenance mode
* Registration toggle
* Ranking weight adjustment
* Plagiarism threshold
* Auto-evaluation enable/disable

Must support live update without redeployment.


---

# 1️⃣9️⃣ Non-Functional Requirements

* Must scale to 1M+ users
* All critical operations via Cloud Functions
* Firestore indexed queries only
* Input validation mandatory
* Rate limiting enforced
* Secure storage rules
* Encryption for sensitive fields
* Minimal read/write costs
* Cost monitoring for Firebase usage


---

# 2️⃣0️⃣ Performance Benchmarks

* Authentication < 300ms
* Job query < 500ms
* Ranking generation < 30 sec
* Analytics dashboard < 1 sec
* File upload validation < 2 sec


---

# 2️⃣1️⃣ Future Enhancements

* AI Resume Parsing
* AI Interview Bot
* Redis caching layer (hybrid backend)
* Microservice extraction
* Predictive hiring analytics
* Skill demand heatmaps
* AI-powered candidate ranking


---

# 🚀 Final Status

Backend is:

✅ Firebase-native \n ✅ Serverless \n ✅ SaaS ready \n ✅ Ranking engine integrated \n ✅ Enterprise RBAC compliant \n ✅ Analytics-driven \n ✅ Cost-optimized \n ✅ Microservice-ready \n ✅ Investor-ready