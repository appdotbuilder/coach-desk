import React from 'react';
import { Head, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';

interface NotificationStats {
    total_low_credit_clients: number;
    clients_with_zero_credits: number;
    clients_with_one_credit: number;
    breakdown_by_subscription: Array<{
        type: string;
        count: number;
    }>;
}

interface Props {
    stats: NotificationStats;
    [key: string]: unknown;
}

export default function NotificationsIndex({ stats }: Props) {
    const handleSendNotifications = () => {
        router.post('/notifications', {}, {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                // Success message will be shown via flash message
            }
        });
    };

    return (
        <AppShell>
            <Head title="Notifications - Fitness Studio" />
            
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground">
                            📧 Notifications
                        </h1>
                        <p className="text-muted-foreground mt-2">
                            Manage email notifications and client alerts.
                        </p>
                    </div>
                </div>

                {/* Low Credits Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-card p-6 rounded-xl shadow-sm border">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Total Low Credit Clients</p>
                                <p className="text-3xl font-bold text-red-600">
                                    {stats.total_low_credit_clients}
                                </p>
                            </div>
                            <div className="text-2xl">🔔</div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">
                            Clients with less than 2 credits
                        </p>
                    </div>

                    <div className="bg-card p-6 rounded-xl shadow-sm border">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Zero Credits</p>
                                <p className="text-3xl font-bold text-red-700">
                                    {stats.clients_with_zero_credits}
                                </p>
                            </div>
                            <div className="text-2xl">❌</div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">
                            Urgent attention needed
                        </p>
                    </div>

                    <div className="bg-card p-6 rounded-xl shadow-sm border">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">One Credit</p>
                                <p className="text-3xl font-bold text-orange-600">
                                    {stats.clients_with_one_credit}
                                </p>
                            </div>
                            <div className="text-2xl">⚠️</div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">
                            Will need credits soon
                        </p>
                    </div>
                </div>

                {/* Send Notifications */}
                <div className="bg-card rounded-xl shadow-sm border">
                    <div className="p-6 border-b">
                        <h3 className="text-lg font-semibold text-foreground">
                            📨 Send Low Credits Notifications
                        </h3>
                        <p className="text-muted-foreground text-sm mt-1">
                            Automatically send email notifications to clients with low credits.
                        </p>
                    </div>
                    <div className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h4 className="font-semibold text-foreground mb-2">
                                    Email Low Credits Alerts
                                </h4>
                                <p className="text-muted-foreground text-sm">
                                    This will send personalized emails to all clients with fewer than 2 credits remaining, 
                                    encouraging them to top up their sessions to continue their fitness journey.
                                </p>
                                {stats.total_low_credit_clients > 0 && (
                                    <p className="text-orange-600 text-sm mt-2 font-medium">
                                        Ready to send to {stats.total_low_credit_clients} client{stats.total_low_credit_clients !== 1 ? 's' : ''}
                                    </p>
                                )}
                            </div>
                            <Button 
                                onClick={handleSendNotifications}
                                className="bg-orange-600 hover:bg-orange-700"
                                disabled={stats.total_low_credit_clients === 0}
                            >
                                📤 Send Notifications
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Breakdown by Subscription */}
                {stats.breakdown_by_subscription.length > 0 && (
                    <div className="bg-card rounded-xl shadow-sm border">
                        <div className="p-6 border-b">
                            <h3 className="text-lg font-semibold text-foreground">
                                📊 Low Credits by Subscription Type
                            </h3>
                        </div>
                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {stats.breakdown_by_subscription.map((item) => (
                                    <div key={item.type} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                                            <span className="font-medium text-foreground">{item.type}</span>
                                        </div>
                                        <span className="text-lg font-bold text-orange-600">
                                            {item.count}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Email Template Preview */}
                <div className="bg-card rounded-xl shadow-sm border">
                    <div className="p-6 border-b">
                        <h3 className="text-lg font-semibold text-foreground">
                            📋 Email Template Preview
                        </h3>
                        <p className="text-muted-foreground text-sm mt-1">
                            Preview of the email that will be sent to clients.
                        </p>
                    </div>
                    <div className="p-6">
                        <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 p-6 rounded-lg border">
                            <div className="mb-4">
                                <div className="text-center text-white bg-gradient-to-r from-purple-600 to-blue-600 p-4 rounded-t-lg">
                                    <h2 className="text-xl font-bold">🏋️‍♀️ Fitness Studio</h2>
                                </div>
                                <div className="bg-white dark:bg-gray-800 p-6 rounded-b-lg border-l border-r border-b">
                                    <div className="text-lg font-semibold mb-2">Hi [Client Name]! 👋</div>
                                    <p className="text-muted-foreground mb-4">
                                        We hope you're enjoying your fitness journey with us! We wanted to give you a heads up that your workout credits are running low.
                                    </p>
                                    <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 mb-4">
                                        <div className="flex items-center gap-2">
                                            <span>⚠️</span>
                                            <div>
                                                <strong>Credits Remaining: [X]</strong>
                                                <br />
                                                <small>[Subscription Type] Package</small>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-muted-foreground mb-4">
                                        To continue booking your favorite workouts and maintain your fitness routine, please contact us to top up your credits.
                                    </p>
                                    <div className="text-center">
                                        <Button className="bg-purple-600 hover:bg-purple-700">
                                            💬 Contact Us to Top Up
                                        </Button>
                                    </div>
                                    <p className="text-muted-foreground text-sm mt-4">
                                        💪 We look forward to seeing you at your next workout!
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Automation Info */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
                    <div className="flex items-start gap-4">
                        <div className="text-2xl">🤖</div>
                        <div>
                            <h3 className="text-lg font-semibold text-foreground mb-2">
                                Automated Daily Notifications
                            </h3>
                            <p className="text-muted-foreground mb-2">
                                The system can automatically send these notifications daily using the following command:
                            </p>
                            <code className="bg-gray-800 text-green-400 px-3 py-1 rounded text-sm">
                                php artisan notify:low-credits
                            </code>
                            <p className="text-muted-foreground text-sm mt-2">
                                Set this up as a daily cron job to keep clients engaged and ensure they never run out of credits unexpectedly.
                            </p>
                        </div>
                    </div>
                </div>

                {/* No Clients Message */}
                {stats.total_low_credit_clients === 0 && (
                    <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-8 text-center border border-green-200 dark:border-green-800">
                        <div className="text-4xl mb-4">🎉</div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">
                            All Clients Have Sufficient Credits!
                        </h3>
                        <p className="text-muted-foreground">
                            Great job! All your active clients currently have 2 or more credits remaining. 
                            No notification emails need to be sent at this time.
                        </p>
                    </div>
                )}
            </div>
        </AppShell>
    );
}