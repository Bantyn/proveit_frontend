# Data Models

## 1. Admins

```javascript
{
  _id: ObjectId,
  fullName: String,
  email: { type: String, unique: true, index: true },
  passwordHash: String,

  role: {
    type: String,
    enum: ["SUPER_ADMIN", "ADMIN"],
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

## 2. Roles

```javascript
{
  _id: ObjectId,
  name: { type: String, unique: true },

  permissions: [

    // 👤 Admin Management
    "ADMIN_VIEW",
    "ADMIN_CREATE",
    "ADMIN_UPDATE",
    "ADMIN_DELETE",

    // 🏢 Company Management
    "COMPANY_VIEW",
    "COMPANY_APPROVE",
    "COMPANY_SUSPEND",
    "COMPANY_UPDATE",
    "COMPANY_DELETE",

    // 🏆 Competition Management
    "COMPETITION_VIEW",
    "COMPETITION_CREATE",
    "COMPETITION_UPDATE",
    "COMPETITION_DELETE",
    "COMPETITION_PUBLISH",
    "COMPETITION_CANCEL",

    // 👨‍🎓 Candidate Management
    "CANDIDATE_VIEW",
    "CANDIDATE_SUSPEND",
    "CANDIDATE_DELETE",

    // 💬 Testimonials
    "TESTIMONIAL_VIEW",
    "TESTIMONIAL_CREATE",
    "TESTIMONIAL_UPDATE",
    "TESTIMONIAL_DELETE",
    "TESTIMONIAL_APPROVE",
    "TESTIMONIAL_REJECT",
    "TESTIMONIAL_FEATURE",

    // ❓ FAQs
    "FAQ_VIEW",
    "FAQ_CREATE",
    "FAQ_UPDATE",
    "FAQ_DELETE",
    "FAQ_PUBLISH",
    "FAQ_ARCHIVE",
    "FAQ_MODERATE",

    // 💳 Subscription & Billing
    "SUBSCRIPTION_VIEW",
    "SUBSCRIPTION_UPDATE",
    "SUBSCRIPTION_CANCEL",

    "PLAN_VIEW",
    "PLAN_CREATE",
    "PLAN_UPDATE",
    "PLAN_DELETE",

    "PAYMENT_VIEW",
    "PAYMENT_REFUND",

    // 🤖 AI Configuration
    "AI_CONFIG_VIEW",
    "AI_CONFIG_UPDATE",

    // 📊 Analytics
    "ANALYTICS_VIEW_GENERAL",
    "ANALYTICS_VIEW_FINANCIAL",

    // 🛡 Moderation & Overrides
    "EVALUATION_OVERRIDE",
    "APPLICATION_STATUS_OVERRIDE",

    // ⚙ System
    "SYSTEM_SETTINGS_VIEW",
    "SYSTEM_SETTINGS_UPDATE",

    // 📜 Logs
    "ACTIVITY_LOG_VIEW",
    "NOTIFICATION_MANAGE"
  ]
  createdAt: Date,
  updatedAt: Date
}
```

## 3. Users

```javascript
{
  _id: ObjectId,
  fullName: String,
  email: { type: String, unique: true, index: true },
  passwordHash: String,

  role: {
    type: String,
    enum: ["CANDIDATE", "COMPANY"],
    index: true
  },

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

## 4. Candidate Profiles

```javascript
{
  _id: ObjectId,

  userId: {
    type: ObjectId,
    ref: "User",
    required: true,
    index: true
  },

  skills: [
    {
      name: {
        type: String,
        required: true,
        index: true
      },
      level: {
        type: String,
        enum: ["Beginner", "Intermediate", "Advanced", "Expert"]
      },
      years: {
        type: Number,
        min: 0
      }
    }
  ],

  experienceLevel: {
    type: String,
    enum: ["Fresher", "Junior", "Mid-Level", "Senior", "Lead"]
  },

  education: [
    {
      degree: {
        type: String,
        required: true
      },
      college: {
        type: String,
        required: true
      },
      year: {
        type: Number
      }
    }
  ],

  github: {
    type: String
  },

  resumeUrl: {
    type: String
  },

  metrics: {

    participation: {
      total: { type: Number, default: 0 },
      hiring: { type: Number, default: 0 },
      skill: { type: Number, default: 0 }
    },

    hiring: {
      shortlisted: { type: Number, default: 0 },
      selected: { type: Number, default: 0 },
      selectionRate: { type: Number, default: 0 }   // selected / hiring participated
    },

    performance: {
      avgScore: { type: Number, default: 0 },
      weightedScore: { type: Number, default: 0 },  // weighted by competition difficulty
      highestScore: { type: Number, default: 0 },
      scoreConsistency: { type: Number, default: 0 } // std deviation inverse
    },

    ranking: {
      wins: { type: Number, default: 0 },          // rank 1 finishes
      topThree: { type: Number, default: 0 },
      bestRank: { type: Number, default: null },
      globalRankScore: { type: Number, default: 0 } // final computed ranking number
    }

  }

  subscriptionId: {
    type: ObjectId,
    ref: "Subscription"
  },

  createdAt: Date.Now,
  updatedAt: Date
}
```

## 5. Companies

```javascript
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

      competitions: {
        total: Number,
        hiring: Number,
        skill: Number,
        active: Number,
        completed: Number
      },

      hiring: {
        totalParticipants: Number,
        shortlisted: Number,
        hired: Number,
        hireRate: Number   // hired / hiring competitions participants
      },

      performance: {
        avgCandidateScore: Number,
        avgWinningScore: Number,
        evaluationConsistency: Number
      },

      engagement: {
        totalSubmissions: Number,
        avgSubmissionsPerCompetition: Number
      }

    }

  isDeleted: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

## 6. Competitions

```javascript
{
  _id: ObjectId,
  slug:{type:String,unique:true},

  companyId: {
    type: ObjectId,
    index: true
  },

  title: String,
  description: String,

  competitionType: {
    type: String,
    enum: ["HIRING", "SKILL"],
    index: true
  },

  // Only used if competitionType = "HIRING"
  jobId: {
    type: ObjectId,
    index: true
  },

  rules: String,

  requiredSkills: [{ type: String, index: true }],

  projectInfo: {
    title: String,
    difficulty: { type: String, enum: ["EASY", "MEDIUM", "HARD"] ,index:true},
    deadline: Date,
    maxSubmissions: Number
  },

  visibility: {
    type: String,
    enum: ["public", "private"]
  },

  status: {
    type: String,
    enum: ["DRAFT", "ACTIVE", "COMPLETED", "CANCELLED"],
    index: true
  },

  totalApplications: Number,
  rankingStatus: {
    type: String,
    enum: ["NOT_GENERATED", "GENERATING", "GENERATED"]
  },

  startDate: {type:Date,index:true},
  endDate: {type:Date,index:true},

  isDeleted: { type: Boolean, default: false },
  
  createdByAdminId: ObjectId,

  createdAt: Date,
  updatedAt: Date
}
```

## 7. Jobs

```javascript
{
  _id: ObjectId,

  companyId: {
    type: ObjectId,
    index: true
  },

  role: {
    type: String,
    index: true
  },

  department: {
    type: String,
    index: true
  },

  experienceLevel: {
    type: String,
    enum: ["Fresher", "Junior", "Mid-Level", "Senior", "Lead"],
    index: true
  },

  employmentType: {
    type: String,
    enum: ["Full-Time", "Part-Time", "Internship", "Contract"]
  },

  salaryRange: {
    min: Number,
    max: Number,
    currency: String
  },

  requiredSkills: [{ type: String, index: true }],

  status: {
    type: String,
    enum: ["active", "closed"],
    index: true
  },

  isDeleted: Boolean,

  createdAt: Date,
  updatedAt: Date
}
```

## 8. Applications

```javascript
{
  _id: ObjectId,

  userId: {
    type: ObjectId,
    ref: "User",
    required: true,
    index: true
  },

  competitionId: {
    type: ObjectId,
    ref: "Competition",
    required: true,
    index: true
  },

  companyId: {
    type: ObjectId,
    ref: "Company",
    required: true,
    index: true
  },

  competitionType: {
    type: String,
    enum: ["HIRING", "SKILL"],
    required: true,
    index: true
  },

  // Optional if competition is tied to a job role
  jobId: {
    type: ObjectId,
    index: true
  },

  status: {
    type: String,
    enum: [
      "APPLIED",
      "SUBMITTED",
      "SHORTLISTED",
      "INTERVIEW_SCHEDULED",
      "SELECTED",
      "REJECTED"
    ],
    default: "APPLIED",
    index: true
  },

  scoring: {
    score: {
      type: Number,
      default: 0
    },
    rank: {
      type: Number,
      default: null
    },
    percentile: {
      type: Number,
      default: null
    }
  },

  feedback: String,

  audit: {
    evaluatedBy: ObjectId,
    evaluatedAt: Date
  },

  isDeleted: {
    type: Boolean,
    default: false
  },

  createdAt: Date,
  updatedAt: Date
}
```

## 9. In application schema

```javascript
ApplicationsSchema.index(
  { userId: 1, competitionId: 1 },
  { unique: true }
);
```

## 10. Projects

```javascript
{
  _id: ObjectId,

  applicationId: {
    type: ObjectId,
    ref: "Application",
    required: true,
    index: true
  },

  submissionType: {
    type: String,
    enum: ["GITHUB", "FILE_UPLOAD", "EXTERNAL_LINK", "DOCUMENT"]
  },

  files: [
    {
      fileName: String,
      fileUrl: String,
      sizeMB: Number,
      mimeType: String
    }
  ],

  externalLinks: [
    {
      label: String,
      url: String
    }
  ],

  techStack: [{ type: String, index: true }],

    evaluation: {
    autoScore: Number,
    manualScore: Number,
    plagiarismScore: Number,

    criteriaScores: [
      {
        criteriaTitle: String,
        score: Number,
        weight: Number
      }
    ],

    finalScore: {
      type: Number,
      index: true
    }
  },

  reviewStatus: {
    type: String,
    enum: ["PENDING", "UNDER_REVIEW", "REVIEWED", "FLAGGED"],
    index: true
  },

  submittedAt: Date,
  updatedAt: Date
}
```

## 11. Interviews

```javascript
{
  _id: ObjectId,

  applicationId: {
    type: ObjectId,
    ref: "Application",
    required: true,
    index: true
  },

  companyId: {
    type: ObjectId,
    index: true
  },

  rounds: [
    {
      roundNumber: {
        type: Number
      },

      type: {
        type: String,
        enum: [
          "SCREENING",        // initial filter call
          "HR",               // HR / culture discussion
          "TECHNICAL",        // coding / system design / technical deep dive
          "CASE_STUDY",       // business / strategy / marketing cases
          "ASSIGNMENT_REVIEW",// review of submitted project
          "PORTFOLIO_REVIEW", // creative / design roles
          "MANAGERIAL",       // leadership / stakeholder round
          "BEHAVIORAL",       // personality / situation-based questions
          "FINAL",            // final approval round
          "OTHER"             // fallback for custom cases
        ]
      },

      scheduledAt: Date,

      durationMinutes: Number, // Optional

      mode: {
        type: String,
        enum: ["ONLINE", "OFFLINE"]
      },

      meetingLink: String, // Optional

      status: {
        type: String,
        enum: [
          "SCHEDULED",
          "COMPLETED",
          "CANCELLED",
          "NO_SHOW"
        ],
        index: true
      },

      feedback: String,

      rating: {
        type: Number,
        min: 0,
        max: 10
      },

      evaluatedAt: Date
    }
  ],

  finalDecision: {
    type: String,
    enum: ["SELECTED", "REJECTED", "ON_HOLD"]
  },

  finalRemarks: String,

  decisionBy: ObjectId,

  createdAt: Date,
  updatedAt: Date
}
```

## 12. Subscriptions

```javascript
{
  _id: ObjectId,

  companyId: {
    type: ObjectId,
    ref: "Company",
    required: true,
    index: true
  },

  planId: {
    type: ObjectId,
    ref: "Plan",
    required: true
  },

  status: {
    type: String,
    enum: ["ACTIVE", "EXPIRED", "CANCELLED", "PAUSED"],
    index: true
  },

  billingCycle: {
    type: String,
    enum: ["MONTHLY", "YEARLY"]
  },

  priceAtPurchase: Number,

  validFrom: Date,
  validTo: Date,

  autoRenew: Boolean,

  createdAt: Date,
  updatedAt: Date
}
```

## 13. Plans

```javascript
{
  _id: ObjectId,

  name: {
    type: String,
    enum: ["STARTER", "GROWTH", "ELITE"],
    unique: true
  },

  description: String,

  priceMonthly: Number,
  priceYearly: Number,

  features: {

    competitions: {
      maxCompetitionsPerMonth: Number,
      maxActiveCompetitions: Number,
      maxApplicationsPerCompetition: Number,
      maxShortlistedPerCompetition: Number   // -1 = unlimited
    },

    interviews: {
      enabled: Boolean,
      maxRoundsPerApplication: Number
    },

    analytics: {
      advancedAnalytics: Boolean,
      leaderboardAccess: Boolean
    },

    branding: {
      brandingCustomization: Boolean
    },

    ai: {
      chatbotSupport: Boolean
    },

    messaging: {
      enabled: Boolean,

      unlockStage: {
        type: String,
        enum: ["NONE", "SUBMITTED", "SHORTLISTED"]
      },

      maxActiveChats: Number,
      allowFileSharing: Boolean,
      maxAttachmentSizeMB: Number
    },

    support: {
      prioritySupport: Boolean
    }
  },

  isActive: Boolean,

  createdAt: Date,
  updatedAt: Date
}
```

## 14. Payments

```javascript
{
  _id: ObjectId,

  companyId: {
    type: ObjectId,
    ref: "Company",
    required: true,
    index: true
  },

  subscriptionId: {
    type: ObjectId,
    ref: "Subscription",
    required: true,
    index: true
  },

  planId: {
    type: ObjectId,
    ref: "Plan"
  },

  billingCycle: {
    type: String,
    enum: ["MONTHLY", "YEARLY"]
  },

  amount: {
    type: Number,
    required: true
  },

  currency: {
    type: String,
    default: "INR"
  },

  paymentType: {
    type: String,
    enum: ["NEW_SUBSCRIPTION", "RENEWAL", "UPGRADE", "DOWNGRADE"]
  },

  gateway: {
    type: String,
    enum: ["STRIPE", "RAZORPAY", "PAYPAL", "OTHER"]
  },

  gatewayTransactionId: {
    type: String,
    index: true
  },

  status: {
    type: String,
    enum: [
      "PENDING",
      "SUCCESS",
      "FAILED",
      "REFUNDED"
    ],
    index: true
  },

  failureReason: String,

  invoiceNumber: String,

  paidAt: Date,

  metadata: Object, // store raw gateway response if needed

  createdAt: Date,
  updatedAt: Date
}
```

## 15. Chats

```javascript
{
  _id: ObjectId,

  applicationId: {
    type: ObjectId,
    ref: "Application",
    required: true,
    unique: true,        // One chat per application
    index: true
  },

  companyId: {
    type: ObjectId,
    ref: "Company",
    required: true,
    index: true
  },

  candidateId: {
    type: ObjectId,
    ref: "User",
    required: true,
    index: true
  },

  isLocked: {
    type: Boolean,
    default: false       // Lock if subscription expires
  },

  lastMessage: String,   // For fast chat list preview

  lastMessageAt: {
    type: Date,
    index: true
  },

  unreadCount: {
    company: { type: Number, default: 0 },
    candidate: { type: Number, default: 0 }
  },

  createdAt: Date,
  updatedAt: Date
}
```

## 16. Messages

```javascript
{
  _id: ObjectId,

  chatId: {
    type: ObjectId,
    ref: "Chat",
    required: true,
    index: true
  },

  senderId: {
    type: ObjectId,
    ref: "User",
    required: true
  },

  senderRole: {
    type: String,
    enum: ["COMPANY", "CANDIDATE"]
  },

  messageType: {
    type: String,
    enum: ["TEXT", "FILE", "SYSTEM"],
    default: "TEXT"
  },

  content: String,

  attachments: [
    {
      fileName: String,
      fileUrl: String,
      sizeMB: Number
    }
  ],

  isEdited: {
    type: Boolean,
    default: false
  },

  isDeleted: {
    type: Boolean,
    default: false
  },

  readBy: [
    {
      userId: ObjectId,
      readAt: Date
    }
  ],

  sentAt: {
    type: Date,
    index: true
  }
}
```

## 17. Notifications

```javascript
{
  _id: ObjectId,

  recipientId: {
    type: ObjectId,
    ref: "User",
    index: true
  },

  recipientRole: {
    type: String,
    enum: ["CANDIDATE", "COMPANY", "ADMIN"]
  },

  type: {
    type: String,
    enum: [
      "APPLICATION_STATUS",
      "NEW_MESSAGE",
      "INTERVIEW_SCHEDULED",
      "INTERVIEW_UPDATED",
      "PAYMENT_SUCCESS",
      "PAYMENT_FAILED",
      "SUBSCRIPTION_EXPIRING",
      "COMPETITION_UPDATE",
      "SYSTEM"
    ],
    index: true
  },

  title: String,
  message: String,

  entityType: {
    type: String,
    enum: ["APPLICATION", "COMPETITION", "INTERVIEW", "PAYMENT", "SUBSCRIPTION", "CHAT"]
  },

  entityId: ObjectId,

  priority: {
    type: String,
    enum: ["LOW", "MEDIUM", "HIGH"],
    default: "LOW"
  },

  isRead: {
    type: Boolean,
    default: false,
    index: true
  },

  readAt: Date,

  deliveryChannels: {
    inApp: Boolean,
    email: Boolean,
    push: Boolean
  },

  isDeleted: {
    type: Boolean,
    default: false
  },

  createdAt: Date,
  updatedAt: Date
}
```

## 18. Activity Logs

```javascript
{
  _id: ObjectId,

  actorId: {
    type: ObjectId,
    index: true
  },

  actorRole: {
    type: String,
    enum: ["CANDIDATE", "COMPANY", "ADMIN", "SUPER_ADMIN", "SYSTEM"],
    index: true
  },

  action: {
    type: String,
    enum: [

      // 🔐 AUTH
      "AUTH_LOGIN",
      "AUTH_LOGOUT",
      "AUTH_PASSWORD_RESET",
      "AUTH_ACCOUNT_LOCK",

      // 🏆 COMPETITION
      "COMPETITION_CREATE",
      "COMPETITION_UPDATE",
      "COMPETITION_DELETE",
      "COMPETITION_PUBLISH",
      "COMPETITION_CANCEL",

      // 📄 APPLICATION
      "APPLICATION_APPLY",
      "APPLICATION_WITHDRAW",
      "APPLICATION_SHORTLIST",
      "APPLICATION_REJECT",
      "APPLICATION_SELECT",
      "APPLICATION_STATUS_OVERRIDE",

      // 📦 PROJECT
      "PROJECT_SUBMIT",
      "PROJECT_UPDATE",
      "PROJECT_EVALUATE",
      "PROJECT_EVALUATION_OVERRIDE",

      // 📅 INTERVIEW
      "INTERVIEW_SCHEDULE",
      "INTERVIEW_UPDATE",
      "INTERVIEW_CANCEL",
      "INTERVIEW_COMPLETE",

      // 💬 CHAT & MESSAGING
      "CHAT_CREATE",
      "CHAT_LOCK",
      "CHAT_UNLOCK",
      "CHAT_DELETE",
      "CHAT_MESSAGE_SEND",
      "CHAT_MESSAGE_EDIT",
      "CHAT_MESSAGE_DELETE",
      "CHAT_ATTACHMENT_UPLOAD",
      "CHAT_MARK_AS_READ",

      // 💳 BILLING & SUBSCRIPTION
      "PAYMENT_CREATE",
      "PAYMENT_FAIL",
      "PAYMENT_REFUND",
      "SUBSCRIPTION_CREATE",
      "SUBSCRIPTION_UPDATE",
      "SUBSCRIPTION_CANCEL",

      // 🏢 COMPANY (Admin-controlled)
      "COMPANY_APPROVE",
      "COMPANY_REJECT",
      "COMPANY_SUSPEND",
      "COMPANY_RESTORE",
      "COMPANY_UPDATE",
      "COMPANY_DELETE",

      // 👨‍🎓 CANDIDATE (Admin-controlled)
      "CANDIDATE_SUSPEND",
      "CANDIDATE_DELETE",

      // 👤 ADMIN MANAGEMENT
      "ADMIN_CREATE",
      "ADMIN_UPDATE",
      "ADMIN_DELETE",
      "ADMIN_ROLE_ASSIGN",

      // 📊 ANALYTICS
      "ANALYTICS_VIEW_GENERAL",
      "ANALYTICS_VIEW_FINANCIAL",

      // ⚙ PLAN & SYSTEM SETTINGS
      "PLAN_CREATE",
      "PLAN_UPDATE",
      "PLAN_DELETE",
      "SYSTEM_SETTINGS_UPDATE",

      // 🤖 SYSTEM AUTOMATIONS
      "SYSTEM_AUTO_SHORTLIST",
      "SYSTEM_GENERATE_RANKING",
      "SYSTEM_AUTO_RENEW_SUBSCRIPTION"

    ],
    index: true
  },

  entityType: {
    type: String,
    enum: [
      "USER",
      "COMPANY",
      "COMPETITION",
      "APPLICATION",
      "PROJECT",
      "INTERVIEW",
      "CHAT",
      "MESSAGE",
      "SUBSCRIPTION",
      "PAYMENT",
      "PLAN",
      "SYSTEM_SETTINGS",
      "ROLE"
    ]
  },

  entityId: ObjectId,

  metadata: Object,

  severity: {
    type: String,
    enum: ["INFO", "WARNING", "CRITICAL"],
    default: "INFO",
    index: true
  },

  ipAddress: String,
  userAgent: String,

  correlationId: String,

  createdAt: {
    type: Date,
    index: true
  }
}
```

## 19. System Settings

```javascript
{
  _id: "system_settings",

  platform: {
    maintenanceMode: {
      enabled: Boolean,
      message: String,
      allowAdminAccess: Boolean
    },

    allowNewRegistrations: Boolean,

    allowCompanyRegistrations: Boolean,

    allowCandidateRegistrations: Boolean
  },

  features: {
    enableChat: Boolean,
    enableInterviews: Boolean,
    enablePayments: Boolean,
    enableSubscriptions: Boolean,
    enableAI: Boolean
  },

  competitions: {
    allowNewCompetitions: Boolean,
    maxGlobalActiveCompetitions: Number
  },

  evaluation: {
    autoEvaluationEnabled: Boolean,
    plagiarismThreshold: Number,
    allowManualOverride: Boolean
  },

  ranking: {
    manualWeight: Number,
    autoWeight: Number,
    plagiarismWeight: Number,
    enableAutoRanking: Boolean
  },

  security: {
    maxLoginAttempts: Number,
    lockoutDurationMinutes: Number,
    enableIPTracking: Boolean,
    enableAuditLogs: Boolean
  },

  limits: {
    maxFileUploadSizeMB: Number,
    maxMessageLength: Number,
    maxProjectsPerApplication: Number
  },

  billing: {
    allowAutoRenew: Boolean,
    gracePeriodDays: Number
  },

  notifications: {
    enableEmailNotifications: Boolean,
    enableInAppNotifications: Boolean,
    enablePushNotifications: Boolean
  },

  updatedBy: {
    type: ObjectId,
    ref: "User"
  },

  version: Number, // increment on every change

  updatedAt: Date
}
```

## 20. Contact Messages

```javascript
{
  _id: ObjectId,

  ticketNumber: String,

  senderId: {
    type: ObjectId,
    index: true
  },

  category: {
    type: String,
    enum: [
      "ACCOUNT_ISSUE",
      "PAYMENT_ISSUE",
      "SUBSCRIPTION",
      "COMPETITION_QUERY",
      "TECHNICAL_BUG",
      "INTERVIEW_ISSUE",
      "GENERAL_INQUIRY"
    ],
    index: true
  },

  subject: String,

  description: String,   // original complaint

  attachments: [
    {
      fileName: String,
      fileUrl: String,
      sizeMB: Number
    }
  ],

  status: {
    type: String,
    enum: ["OPEN", "IN_PROGRESS", "RESOLVED", "CLOSED"],
    default: "OPEN",
    index: true
  },

  priority: {
    type: String,
    enum: ["LOW", "MEDIUM", "HIGH", "URGENT"],
    default: "MEDIUM",
    index: true
  },

  assignedTo: {
    type: ObjectId,
    index: true
  },

  relatedEntity: {
    entityType: String,
    entityId: ObjectId
  },

  resolvedAt: Date,

  createdAt: {
    type: Date,
    index: true
  },

  updatedAt: Date
}
```

## 21. OTPs

```javascript
{
  _id: ObjectId,

  userId: {
    type: ObjectId,
    index: true
  },

  email: {
    type: String,
    index: true
  },

  otpHash: String,   // store hashed value only

  purpose: {
    type: String,
    enum: ["EMAIL_VERIFICATION", "PASSWORD_RESET", "TWO_FA_LOGIN"],
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

  requestIp: String,

  isUsed: {
    type: Boolean,
    default: false,
    index: true
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

## 22. Testimonials

```javascript
{
  _id: ObjectId,

  sourceType: {
    type: String,
    enum: ["USER_SUBMITTED", "ADMIN_CREATED"],
    required: true,
    index: true
  },

  author: {
    id: {
      type: ObjectId,
      default: null,        // null if admin-created external testimonial
      index: true
    },

    role: {
      type: String,
      enum: ["CANDIDATE", "COMPANY", "EXTERNAL"],
      required: true,
      index: true
    },

    nameSnapshot: String,
    designationSnapshot: String,
    companySnapshot: String
  },

  content: {
    type: String
  },

  rating: {
    type: Number,
    min: 1,
    max: 5,
    index: true
  },

  status: {
    type: String,
    enum: ["PENDING", "APPROVED", "REJECTED"],
    default: "PENDING",
    index: true
  },

  rejectionReason: String,

  isFeatured: {
    type: Boolean,
    default: false,
    index: true
  },

  displayOrder: {
    type: Number,
    default: 0,
    index: true
  },

  isDeleted: {
    type: Boolean,
    default: false,
    index: true
  },

  viewCount: {
    type: Number,
    default: 0
  },

  moderation: {
    approvedBy: ObjectId,
    approvedAt: Date
  },

  createdBy: ObjectId,   // who created this record (user or admin)

  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  },

  updatedAt: Date
}
```

## 23. FAQs

```javascript
{
  _id: ObjectId,

  sourceType: {
    type: String,
    enum: ["ADMIN_CREATED", "COMPANY_CREATED"],
    required: true,
    index: true
  },

  scope: {
    type: String,
    enum: ["GLOBAL", "COMPANY", "COMPETITION"],
    required: true,
    index: true
  },

  scopeId: {
    type: ObjectId,
    default: null,
    index: true
    // null if GLOBAL
    // companyId if COMPANY
    // competitionId if COMPETITION
  },

  question: {
    type: String,
    index: true
  },

  answer: String,

  slug: {
    type: String,
    index: true
    // only required unique for GLOBAL FAQs
  },

  category: {
    type: String,
    enum: [
      "GENERAL",
      "CANDIDATE",
      "COMPANY",
      "PRICING",
      "TECHNICAL",
      "COMPETITION_SPECIFIC"
    ],
    index: true
  },

  tags: [String],

  displayOrder: {
    type: Number,
    default: 0,
    index: true
  },

  isFeatured: {
    type: Boolean,
    default: false,
    index: true
  },

  status: {
    type: String,
    enum: ["DRAFT", "PUBLISHED", "ARCHIVED"],
    default: "DRAFT",
    index: true
  },

  isDeleted: {
    type: Boolean,
    default: false,
    index: true
  },

  viewCount: {
    type: Number,
    default: 0
  },

  moderation: {
    approvedBy: ObjectId,
    approvedAt: Date
  },

  createdBy: ObjectId,
  updatedBy: ObjectId,

  publishedAt: Date,

  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  },

  updatedAt: Date
}
```

## 24. Analytics

```javascript
{
  _id: ObjectId,

  date: {
    type: Date,
    unique: true,
    index: true
  },

  users: {
    total: Number,
    new: Number,
    active: Number,        // logged in that day
    candidates: Number,
    companies: Number
  },

  competitions: {
    total: Number,
    new: Number,
    active: Number,
    completed: Number
  },

  applications: {
    total: Number,
    new: Number,
    shortlisted: Number,
    selected: Number
  },

  projects: {
    submitted: Number,
    evaluated: Number,
    avgScore: Number
  },

  interviews: {
    scheduled: Number,
    completed: Number
  },

  subscriptions: {
    active: Number,
    new: Number,
    cancelled: Number,
    churnRate: Number
  },

  revenue: {
    daily: Number,
    monthlyRecurring: Number,   // MRR = Monthly Recurring Revenue - The predictable revenue your platform earns every month from active subscriptions.
    yearlyRecurring: Number     // ARR = Annual Recurring Revenue - The total predictable revenue your platform expects to earn over a year from active subscriptions.
  },

  hiringMetrics: {
    avgTimeToHireDays: Number,
    hireConversionRate: Number,   // selected / total applicants
    shortlistRate: Number         // shortlisted / applicants
  },

  engagement: {
    messagesSent: Number,
    activeChats: Number
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
}
```

## 25. AI Chats

```javascript
{
  _id: ObjectId,

  userId: {
    type: ObjectId,
    index: true
  },

  userType: {
    type: String,
    enum: ["CANDIDATE", "COMPANY"],
    index: true
  },

  companyId: {
    type: ObjectId,
    default: null,
    index: true
  },

  candidateId: {
    type: ObjectId,
    default: null,
    index: true
  },

  title: String,

  contextType: {
    type: String,
    enum: [
      "GENERAL",
      "JOB_ASSISTANT",
      "PROJECT_REVIEW",
      "INTERVIEW_PREP",
      "RESUME_HELP",
      "PERFORMANCE_ANALYSIS"
    ],
    index: true
  },

  relatedEntity: {
    entityType: {
      type: String,
      enum: ["JOB", "PROJECT", "COMPETITION", null]
    },
    entityId: ObjectId
  },

  model: {
    provider: String,
    modelName: String
  },

  planSnapshot: {
    planId: ObjectId,
    planName: String
  },

  usage: {
    totalMessages: Number,
    totalTokensUsed: Number,
    totalCost: Number
  },

  lastMessageAt: Date,

  isArchived: Boolean,
  isDeleted: Boolean,

  createdAt: Date,
  updatedAt: Date
}
```

## 26. AI Messages

```javascript
{
  _id: ObjectId,

  chatId: {
    type: ObjectId,
    index: true
  },

  senderRole: {
    type: String,
    enum: ["USER", "ASSISTANT", "SYSTEM"]
  },

  content: String,

  tokenUsage: {
    promptTokens: Number,
    completionTokens: Number,
    totalTokens: Number
  },

  responseTimeMs: Number,

  modelUsed: String,

  createdAt: {
    type: Date,
    index: true
  }
}
```

## 27. AI Rate Limits

```javascript
{
  _id: ObjectId,

  userId: {
    type: ObjectId,
    index: true
  },

  userType: {
    type: String,
    enum: ["CANDIDATE", "COMPANY"]
  },

  dailyMessageCount: Number,
  monthlyTokenUsage: Number,

  lastDailyResetAt: Date,
  lastMonthlyResetAt: Date,

  planSnapshot: {
    planId: ObjectId,
    dailyLimit: Number,
    monthlyTokenLimit: Number
  }
}
```


