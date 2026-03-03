export const dashboardData = {
    company: {
        name: "TechNova Solutions",
        plan: "Pro",
        creditsRemaining: 12,
        totalCredits: 20,
        verificationStatus: "approved",
    },
    activeJobs: [
        {
            id: "job-1",
            title: "Senior Full Stack Engineer",
            applied: 145,
            shortlisted: 28,
            status: "active",
            deadline: "2026-03-15",
        },
        {
            id: "job-2",
            title: "AI/ML Research Scientist",
            applied: 82,
            shortlisted: 12,
            status: "active",
            deadline: "2026-03-20",
        },
        {
            id: "job-3",
            title: "UX Designer - Enterprise",
            applied: 210,
            shortlisted: 35,
            status: "active",
            deadline: "2026-03-10",
        }
    ],
    analytics: {
        timeToHire: [
            { month: "Jan", days: 18 },
            { month: "Feb", days: 15 },
            { month: "Mar", days: 12 },
            { month: "Apr", days: 10 },
            { month: "May", days: 9 },
        ],
        skillAccuracy: [
            { month: "Jan", score: 65 },
            { month: "Feb", score: 72 },
            { month: "Mar", score: 78 },
            { month: "Apr", score: 85 },
            { month: "May", score: 92 },
        ]
    }
};
