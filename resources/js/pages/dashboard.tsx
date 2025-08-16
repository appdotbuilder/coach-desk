import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';

interface MonthlyStats {
    total_checkins: number;
    unique_clients: number;
    checkins_by_subscription: Record<string, number>;
}

interface QuickStats {
    total_clients: number;
    low_credit_clients: number;
    upcoming_workouts: number;
    todays_workouts: number;
}

interface RecentBooking {
    id: number;
    attended: boolean;
    credits_deducted: boolean;
    booking_date: string;
    client: {
        id: number;
        name: string;
        email: string;
    };
    workout: {
        id: number;
        name: string;
        scheduled_at: string;
    };
}

interface LowCreditClient {
    id: number;
    name: string;
    email: string;
    credits_remaining: number;
}

interface Props {
    monthlyStats: MonthlyStats;
    quickStats: QuickStats;
    recentBookings: RecentBooking[];
    lowCreditClients: LowCreditClient[];
    [key: string]: unknown;
}

export default function Dashboard({ 
    monthlyStats, 
    quickStats, 
    recentBookings, 
    lowCreditClients 
}: Props) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getAttendanceColor = (attended: boolean) => {
        return attended 
            ? 'text-green-600 bg-green-100' 
            : 'text-orange-600 bg-orange-100';
    };

    return (
        <AppShell>
            <Head title="Fitness Studio Dashboard" />
            
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-4 overflow-x-auto">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground">
                            🏋️‍♀️ Fitness Studio Dashboard
                        </h1>
                        <p className="text-muted-foreground mt-2">
                            Welcome back! Here's your studio overview for this month.
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <Link href="/clients/create">
                            <Button className="bg-blue-600 hover:bg-blue-700">
                                👤 Add Client
                            </Button>
                        </Link>
                        <Link href="/workouts/create">
                            <Button className="bg-green-600 hover:bg-green-700">
                                💪 Create Workout
                            </Button>
                        </Link>
                        <Link href="/workout-clients/create">
                            <Button className="bg-purple-600 hover:bg-purple-700">
                                📅 Book Session
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Quick Stats Cards */}
                <div className="grid auto-rows-min gap-4 md:grid-cols-4">
                    <div className="bg-card p-6 rounded-xl shadow-sm border">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Total Clients</p>
                                <p className="text-3xl font-bold text-foreground">
                                    {quickStats?.total_clients || 0}
                                </p>
                            </div>
                            <div className="text-2xl">👥</div>
                        </div>
                    </div>

                    <div className="bg-card p-6 rounded-xl shadow-sm border">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Low Credit Alerts</p>
                                <p className="text-3xl font-bold text-red-600">
                                    {quickStats?.low_credit_clients || 0}
                                </p>
                            </div>
                            <div className="text-2xl">🔔</div>
                        </div>
                    </div>

                    <div className="bg-card p-6 rounded-xl shadow-sm border">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Today's Workouts</p>
                                <p className="text-3xl font-bold text-blue-600">
                                    {quickStats?.todays_workouts || 0}
                                </p>
                            </div>
                            <div className="text-2xl">📅</div>
                        </div>
                    </div>

                    <div className="bg-card p-6 rounded-xl shadow-sm border">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Upcoming Workouts</p>
                                <p className="text-3xl font-bold text-green-600">
                                    {quickStats?.upcoming_workouts || 0}
                                </p>
                            </div>
                            <div className="text-2xl">⏰</div>
                        </div>
                    </div>
                </div>

                {/* Monthly Statistics */}
                <div className="grid gap-6 md:grid-cols-3">
                    <div className="bg-card p-6 rounded-xl shadow-sm border">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-foreground">
                                📊 This Month's Check-ins
                            </h3>
                            <div className="text-2xl">✅</div>
                        </div>
                        <p className="text-4xl font-bold text-blue-600">
                            {monthlyStats?.total_checkins || 0}
                        </p>
                        <p className="text-muted-foreground text-sm mt-2">
                            Total attendance this month
                        </p>
                    </div>

                    <div className="bg-card p-6 rounded-xl shadow-sm border">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-foreground">
                                👤 Unique Clients
                            </h3>
                            <div className="text-2xl">🎯</div>
                        </div>
                        <p className="text-4xl font-bold text-green-600">
                            {monthlyStats?.unique_clients || 0}
                        </p>
                        <p className="text-muted-foreground text-sm mt-2">
                            Active clients this month
                        </p>
                    </div>

                    <div className="bg-card p-6 rounded-xl shadow-sm border">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-foreground">
                                💳 By Subscription
                            </h3>
                            <div className="text-2xl">📈</div>
                        </div>
                        <div className="space-y-2">
                            {monthlyStats?.checkins_by_subscription && 
                             Object.entries(monthlyStats.checkins_by_subscription).map(([type, count]) => (
                                <div key={type} className="flex justify-between">
                                    <span className="text-sm text-muted-foreground">{type}</span>
                                    <span className="font-semibold">{count}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Two Column Layout */}
                <div className="grid gap-6 md:grid-cols-2">
                    {/* Recent Bookings */}
                    <div className="bg-card rounded-xl shadow-sm border">
                        <div className="p-6 border-b">
                            <h3 className="text-lg font-semibold text-foreground">
                                📋 Recent Bookings
                            </h3>
                            <p className="text-muted-foreground text-sm mt-1">
                                Latest workout bookings
                            </p>
                        </div>
                        <div className="p-6">
                            {recentBookings && recentBookings.length > 0 ? (
                                <div className="space-y-4">
                                    {recentBookings.map((booking) => (
                                        <div key={booking.id} className="flex items-center justify-between">
                                            <div>
                                                <p className="font-medium text-foreground">
                                                    {booking.client.name}
                                                </p>
                                                <p className="text-sm text-muted-foreground">
                                                    {booking.workout.name} • {formatDate(booking.workout.scheduled_at)}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAttendanceColor(booking.attended)}`}>
                                                    {booking.attended ? 'Attended' : 'Booked'}
                                                </span>
                                                <Link
                                                    href={`/workout-clients/${booking.id}`}
                                                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                                >
                                                    View
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-muted-foreground text-center py-8">
                                    No recent bookings
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Low Credit Alerts */}
                    <div className="bg-card rounded-xl shadow-sm border">
                        <div className="p-6 border-b">
                            <h3 className="text-lg font-semibold text-foreground">
                                🔔 Low Credit Alerts
                            </h3>
                            <p className="text-muted-foreground text-sm mt-1">
                                Clients with fewer than 2 credits
                            </p>
                        </div>
                        <div className="p-6">
                            {lowCreditClients && lowCreditClients.length > 0 ? (
                                <div className="space-y-4">
                                    {lowCreditClients.map((client) => (
                                        <div key={client.id} className="flex items-center justify-between bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                                            <div>
                                                <p className="font-medium text-foreground">
                                                    {client.name}
                                                </p>
                                                <p className="text-sm text-red-600">
                                                    {client.credits_remaining} credit{client.credits_remaining !== 1 ? 's' : ''} remaining
                                                </p>
                                            </div>
                                            <div className="flex gap-2">
                                                <Link href={`/clients/${client.id}`}>
                                                    <Button size="sm" variant="outline">
                                                        View
                                                    </Button>
                                                </Link>
                                                <Button 
                                                    size="sm" 
                                                    className="bg-red-600 hover:bg-red-700"
                                                    onClick={() => window.location.href = `mailto:${client.email}?subject=Time to Top Up Your Credits!`}
                                                >
                                                    📧 Email
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <div className="text-4xl mb-2">🎉</div>
                                    <p className="text-muted-foreground">
                                        All clients have sufficient credits!
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl p-6 border">
                    <h3 className="text-lg font-semibold text-foreground mb-4">
                        🚀 Quick Actions
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <Link href="/clients">
                            <Button variant="outline" className="w-full h-16 flex flex-col gap-1">
                                <span className="text-xl">👥</span>
                                <span className="text-sm">Manage Clients</span>
                            </Button>
                        </Link>
                        <Link href="/workouts">
                            <Button variant="outline" className="w-full h-16 flex flex-col gap-1">
                                <span className="text-xl">💪</span>
                                <span className="text-sm">View Workouts</span>
                            </Button>
                        </Link>
                        <Link href="/workout-clients">
                            <Button variant="outline" className="w-full h-16 flex flex-col gap-1">
                                <span className="text-xl">📋</span>
                                <span className="text-sm">Booking Management</span>
                            </Button>
                        </Link>
                        <Link href="/notifications">
                            <Button variant="outline" className="w-full h-16 flex flex-col gap-1">
                                <span className="text-xl">📧</span>
                                <span className="text-sm">Send Notifications</span>
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}