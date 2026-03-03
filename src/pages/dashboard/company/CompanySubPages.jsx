import React from 'react';
import CompanyProfile from './CompanyProfile';

const PlaceholderPage = ({ title }) => (
    <div className="p-8">
        <h1 className="text-3xl font-bold mb-4">{title}</h1>
        <p className="text-text-secondary opacity-50">This section is currently under development.</p>
    </div>
);

export const ProfilePage = () => <CompanyProfile />;
export const JobManagerPage = () => <PlaceholderPage title="Job Manager" />;
export const CompetitionsPage = () => <PlaceholderPage title="Running Competitions" />;
export const EvaluationPage = () => <PlaceholderPage title="Evaluation Queue" />;
export const LeaderboardPage = () => <PlaceholderPage title="Talent Leaderboard" />;
export const InterviewsPage = () => <PlaceholderPage title="Interviews" />;
export const MessagesPage = () => <PlaceholderPage title="Messages" />;
export const AnalyticsPage = () => <PlaceholderPage title="Analytics & Reports" />;
export const SubscriptionPage = () => <PlaceholderPage title="Subscription" />;
export const SettingsPage = () => <PlaceholderPage title="Settings" />;
