# Data Models

## Users

```json
{
  _id: ObjectId,
  fullName: String,
  email: { type: String, unique: true, index: true },
  passwordHash: String,

  role: {
    type: String,
    enum: ["super_admin", "admin", "candidate", "company_owner"],
    index: true
  },

  roleRef: ObjectId, // reference to roles collection

  status: {
    type: String,
    enum: ["active", "suspended", "blocked"],
    default: "active",
    index: true
  },

  profile: {
    profileImage: String,
    phone: String
  },

  security: {
    twoFactorEnabled: Boolean,
    twoFactorSecret: String,
    failedLoginAttempts: Number,
    accountLockedUntil: Date,
    lastPasswordChange: Date
  },

  audit: {
    lastLogin: Date,
    lastLoginIP: String
  },

  metadata: {
    createdBy: ObjectId,
    notes: String
  },

  isDeleted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date
}
```

## Roles

```json
{
  _id: ObjectId,
  name: { type: String, unique: true },

  permissions: [
    "MANAGE_ADMINS",
    "MANAGE_COMPANIES",
    "MANAGE_SUBSCRIPTIONS",
    "VIEW_ANALYTICS",
    "OVERRIDE_EVALUATIONS",
    "SYSTEM_SETTINGS"
  ],

  createdAt: Date,
  updatedAt: Date
}
```

## Candidate_profiles

```json
{
  _id: ObjectId,
  userId: { type: ObjectId, index: true },

  skills: [
    {
      name: { type: String, index: true },
      level: { type: String },
      years: Number
    }
  ],

  experienceLevel: String,

  education: [
    {
      degree: String,
      college: String,
      year: Number
    }
  ],

  github: String,
  resumeUrl: String,

  metrics: {
    applications: { type: Number, default: 0 },
    shortlisted: { type: Number, default: 0 },
    selected: { type: Number, default: 0 },
    avgScore: Number
  },

  subscriptionId: ObjectId,

  createdAt: Date,
  updatedAt: Date
}
```

## Companies

```json
{
  _id: ObjectId,
  ownerId: { type: ObjectId, index: true },

  companyName: String,
  industry: { type: String, index: true },
  size: String,

  verificationStatus: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    index: true
  },

  isSuspended: Boolean,

  subscriptionId: ObjectId,
  jobCredits: Number,

  stats: {
    jobsPosted: Number,
    hires: Number,
    avgCandidateScore: Number
  },

  isDeleted: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

## Jobs

```json
{
  _id: ObjectId,
  companyId: { type: ObjectId, index: true },

  title: String,
  slug: { type: String, unique: true },

  description: String,

  requiredSkills: [{ type: String, index: true }],

  project: {
    title: String,
    difficulty: String,
    deadline: Date,
    maxSubmissions: Number
  },

  visibility: { type: String, enum: ["public", "private"] },
  status: { type: String, enum: ["active", "closed"], index: true },

  competitionId: ObjectId,

  rankingGenerated: Boolean,
  totalApplications: Number,

  createdAt: Date,
  updatedAt: Date
}
```

## projects

```json
{
  _id: ObjectId,
  candidateId: { type: ObjectId, index: true },
  jobId: { type: ObjectId, index: true },

  submissionType: String,

  files: [
    {
      fileName: String,
      fileUrl: String,
      sizeMB: Number,
      mimeType: String
    }
  ],

  techStack: [{ type: String, index: true }],

  evaluation: {
    autoScore: Number,
    manualScore: Number,
    plagiarismScore: Number,
    finalScore: { type: Number, index: true }
  },

  reviewStatus: {
    type: String,
    enum: ["pending", "reviewed", "flagged"]
  },

  submittedAt: Date
}
```

## applications

```json
{
  _id: ObjectId,
  jobId: { type: ObjectId, index: true },
  candidateId: { type: ObjectId, index: true },
  projectId: ObjectId,

  status: {
    type: String,
    enum: ["submitted", "shortlisted", "interview_scheduled", "selected", "rejected"],
    index: true
  },

  ranking: {
    rank: Number,
    percentile: Number
  },

  audit: {
    evaluatedBy: ObjectId,
    evaluatedAt: Date
  },

  isDeleted: Boolean,
  createdAt: Date
}
```

## interviews

```json
{
  _id: ObjectId,
  applicationId: ObjectId,
  jobId: ObjectId,
  candidateId: ObjectId,

  rounds: [
    {
      roundNumber: Number,
      type: String,
      scheduledAt: Date,
      status: String,
      feedback: String,
      rating: Number
    }
  ],

  finalDecision: String,
  updatedAt: Date
}
```

## competitions

```json
{
  _id: ObjectId,
  title: String,
  description: String,

  competitionType: String,

  rules: String,

  startDate: Date,
  endDate: Date,

  createdByAdminId: ObjectId
}
```

## subscriptions

```json
{
  _id: ObjectId,
  ownerId: ObjectId,
  ownerType: { type: String, enum: ["company", "candidate"] },

  planId: ObjectId,

  status: { type: String, enum: ["active", "expired"] },

  validFrom: Date,
  validTo: Date,

  paymentId: ObjectId,

  createdAt: Date
}
```

## plans

```json
```

## payments (separate if audit required)

```json
{
  _id: ObjectId,
  subscriptionId: ObjectId,

  amount: Number,
  currency: String,

  gateway: String,
  gatewayTransactionId: String,

  status: { type: String, enum: ["success", "failed"] },

  createdAt: Date
}
```

## chats

```json
{
  _id: ObjectId,
  participants: [ObjectId],
  lastMessageAt: Date,
  createdAt: Date
}
```

## messages

```json
{
  _id: ObjectId,
  chatId: { type: ObjectId, index: true },
  senderId: ObjectId,
  message: String,
  sentAt: { type: Date, index: true }
}
```

## notifications

```json
{
  _id: ObjectId,
  userId: { type: ObjectId, index: true },

  type: String,
  title: String,
  message: String,
  referenceId: ObjectId,

  isRead: Boolean,
  createdAt: Date
}
```

## activity_logs

```json
{
  _id: ObjectId,
  actorId: ObjectId,
  actorRole: String,

  action: String,
  targetId: ObjectId,

  ipAddress: String,
  userAgent: String,

  timestamp: Date
}
```

## system_settings

```json
{
  _id: "system_settings",

  platform: {
    maintenanceMode: Boolean,
    allowNewRegistrations: Boolean
  },

  evaluation: {
    autoEvaluationEnabled: Boolean,
    plagiarismThreshold: Number
  },

  ranking: {
    manualWeight: Number,
    autoWeight: Number,
    plagiarismWeight: Number
  },

  updatedBy: ObjectId,
  updatedAt: Date
}
```

## contact_messages

```json
{
  _id: ObjectId,

  senderType: {
    type: String,
    enum: ["user", "company", "guest"],
    index: true
  },

  senderId: {
    type: ObjectId,
    default: null,
    index: true
  },

  name: String,
  email: { type: String, index: true },

  subject: String,
  message: String,

  status: {
    type: String,
    enum: ["new", "in_progress", "resolved", "closed"],
    default: "new",
    index: true
  },

  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "medium"
  },

  assignedTo: ObjectId, // adminId

  response: {
    message: String,
    respondedBy: Objec
```

## otps

```json
{
  _id: ObjectId,

  email: { type: String, index: true },

  otp: String, // hashed OTP (never store plain text)

  purpose: {
    type: String,
    enum: ["email_verification", "password_reset", "2fa_login"],
    index: true
  },

  attempts: {
    type: Number,
    default: 0
  },

  maxAttempts: {
    type: Number,
    default: 5
  },

  isUsed: {
    type: Boolean,
    default: false
  },

  expiresAt: {
    type: Date,
    index: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
}
```

## testimonials

```json
{
  _id: ObjectId,

  authorName: String,

  authorRole: {
    type: String,
    enum: ["candidate", "company"],
    index: true
  },

  authorId: ObjectId,

  companyName: String, // optional display
  designation: String, // optional

  content: String,

  rating: {
    type: Number,
    min: 1,
    max: 5,
    index: true
  },

  isApproved: {
    type: Boolean,
    default: false,
    index: true
  },

  featured: {
    type: Boolean,
    default: false
  },

  createdAt: { type: Date, default: Date.now },
  updatedAt: Date
}
```

## faqs

```json
{
  _id: ObjectId,

  question: String,
  answer: String,

  category: {
    type: String,
    enum: ["general", "candidate", "company", "pricing", "technical"],
    index: true
  },

  order: {
    type: Number,
    default: 0,
    index: true
  },

  isActive: {
    type: Boolean,
    default: true,
    index: true
  },

  viewCount: {
    type: Number,
    default: 0
  },

  createdBy: ObjectId,
  updatedBy: ObjectId,

  createdAt: { type: Date, default: Date.now },
  updatedAt: Date
}
```

## analytics

```json
{
  _id: ObjectId,

  date: { type: Date, unique: true, index: true },

  users: {
    total: Number,
    new: Number,
    active: Number
  },

  companies: {
    total: Number,
    new: Number
  },

  jobs: {
    total: Number,
    new: Number
  },

  applications: {
    total: Number,
    new: Number
  },

  revenue: {
    daily: Number,
    monthlyRecurring: Number
  },

  hiringMetrics: {
    avgTimeToHire: Number,
    conversionRate: Number
  },

  createdAt: { type: Date, default: Date.now }
}
```

## Ai_chats

* ai_chats/{chatId}

```json
{
  userId: String, // reference to users

  title: String, // auto-generated from first message
  contextType: {
    type: String,
    enum: [
      "general",
      "job_assistant",
      "project_review",
      "interview_prep",
      "resume_help"
    ]
  },

  jobId: String | null,
  projectId: String | null,

  model: {
    provider: "openai", // or "gemini"
    modelName: "gpt-4o-mini"
  },

  totalMessages: Number,
  totalTokensUsed: Number,

  lastMessageAt: Timestamp,

  isArchived: Boolean,
  isDeleted: Boolean,

  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

## Ai_Messages

```json
 {
  chatId: String,
  userId: String,

  role: {
    type: String,
    enum: ["user", "assistant", "system"]
  },

  content: String,

  metadata: {
    promptTokens: Number,
    completionTokens: Number,
    totalTokens: Number,

    responseTimeMs: Number,
    modelUsed: String
  },

  contextSnapshot: {
    jobId: String | null,
    projectId: String | null
  },

  createdAt: Timestamp
}
```

## Ai_messages

* ai_chats/{chatId}/messages/{messageId}

```json
{
  role: {
    type: String,
    enum: ["user", "assistant"]
  },

  content: String,

  createdAt: Timestamp
}
```

## Ai_rate_limits

* ai_limits/{userId}

```json
 {
  userId: String,

  dailyMessageCount: Number,

  lastResetAt: Timestamp
}
```


