import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

interface DashboardStats {
    totalClients: number;
    activeClients: number;
    totalSessions: number;
    thisMonthSessions: number;
}

interface MonthlyStats {
    month: number;
    year: number;
    total_sessions: number;
    completed_sessions: number;
}

interface UpcomingSession {
    id: number;
    scheduled_at: string;
    session_type: string;
    client: {
        id: number;
        name: string;
    };
    client_subscription: {
        subscription_type: {
            name: string;
        };
    };
}

interface LowCreditAlert {
    id: number;
    credits_remaining: number;
    client: {
        id: number;
        name: string;
        email: string;
    };
    subscription_type: {
        name: string;
    };
}

interface RecentClient {
    id: number;
    name: string;
    email: string;
    status: string;
    created_at: string;
    active_subscription?: {
        credits_remaining: number;
        subscription_type: {
            name: string;
        };
    };
}

interface Props {
    stats: DashboardStats;
    monthlyStats: MonthlyStats[];
    upcomingSessions: UpcomingSession[];
    lowCreditAlerts: LowCreditAlert[];
    recentClients: RecentClient[];
    revenueData: Array<{
        month: number;
        year: number;
        revenue: string;
    }>;
    [key: string]: unknown;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard({ 
    stats, 
    // monthlyStats, 
    upcomingSessions, 
    lowCreditAlerts, 
    recentClients,
    revenueData 
}: Props) {
    const formatCurrency = (amount: string | number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(typeof amount === 'string' ? parseFloat(amount) : amount);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active':
                return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/20';
            case 'inactive':
                return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-700/20';
            case 'suspended':
                return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/20';
            default:
                return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-700/20';
        }
    };

    const totalRevenue = revenueData?.reduce((sum, item) => sum + parseFloat(item.revenue), 0) || 0;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Coach Desk Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-4 overflow-x-auto">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground">
                            💪 Coach Desk
                        </h1>
                        <p className="text-muted-foreground mt-2">
                            Welcome back! Here's your training business overview.
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <Link
                            href={route('clients.create')}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                        >
                            Add Client
                        </Link>
                        <Link
                            href={route('sessions.create')}
                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                        >
                            Schedule Session
                        </Link>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid auto-rows-min gap-4 md:grid-cols-4">
                    <div className="bg-card p-6 rounded-xl shadow-sm border">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Total Clients</p>
                                <p className="text-3xl font-bold text-foreground">{stats?.totalClients || 0}</p>
                            </div>
                            <div className="text-2xl">👥</div>
                        </div>
                    </div>

                    <div className="bg-card p-6 rounded-xl shadow-sm border">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Active Clients</p>
                                <p className="text-3xl font-bold text-green-600">{stats?.activeClients || 0}</p>
                            </div>
                            <div className="text-2xl">✅</div>
                        </div>
                    </div>

                    <div className="bg-card p-6 rounded-xl shadow-sm border">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Total Sessions</p>
                                <p className="text-3xl font-bold text-foreground">{stats?.totalSessions || 0}</p>
                            </div>
                            <div className="text-2xl">🏋️</div>
                        </div>
                    </div>

                    <div className="bg-card p-6 rounded-xl shadow-sm border">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">This Month</p>
                                <p className="text-3xl font-bold text-blue-600">{stats?.thisMonthSessions || 0}</p>
                            </div>
                            <div className="text-2xl">📅</div>
                        </div>
                    </div>
                </div>

                {/* Two Column Layout */}
                <div className="grid gap-6 md:grid-cols-2">
                    {/* Upcoming Sessions */}
                    <div className="bg-card rounded-xl shadow-sm border">
                        <div className="p-6 border-b">
                            <h3 className="text-lg font-semibold text-foreground">
                                📅 Upcoming Sessions
                            </h3>
                            <p className="text-muted-foreground text-sm mt-1">
                                Next 7 days
                            </p>
                        </div>
                        <div className="p-6">
                            {upcomingSessions && upcomingSessions.length > 0 ? (
                                <div className="space-y-4">
                                    {upcomingSessions.map((session) => (
                                        <div key={session.id} className="flex items-center justify-between">
                                            <div>
                                                <p className="font-medium text-foreground">
                                                    {session.client.name}
                                                </p>
                                                <p className="text-sm text-muted-foreground">
                                                    {formatDate(session.scheduled_at)} • {session.session_type.replace('_', ' ')}
                                                </p>
                                            </div>
                                            <Link
                                                href={route('sessions.show', session.id)}
                                                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                            >
                                                View
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-muted-foreground text-center py-8">
                                    No upcoming sessions scheduled
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
                                Clients running low on credits
                            </p>
                        </div>
                        <div className="p-6">
                            {lowCreditAlerts && lowCreditAlerts.length > 0 ? (
                                <div className="space-y-4">
                                    {lowCreditAlerts.map((alert) => (
                                        <div key={alert.id} className="flex items-center justify-between bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                                            <div>
                                                <p className="font-medium text-foreground">
                                                    {alert.client.name}
                                                </p>
                                                <p className="text-sm text-muted-foreground">
                                                    {alert.credits_remaining} credits left • {alert.subscription_type.name}
                                                </p>
                                            </div>
                                            <Link
                                                href={route('clients.show', alert.client.id)}
                                                className="text-red-600 hover:text-red-800 text-sm font-medium"
                                            >
                                                Contact
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-muted-foreground text-center py-8">
                                    All clients have sufficient credits ✅
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Recent Clients */}
                <div className="bg-card rounded-xl shadow-sm border">
                    <div className="p-6 border-b">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-foreground">
                                👥 Recent Clients
                            </h3>
                            <Link
                                href={route('clients.index')}
                                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                            >
                                View All
                            </Link>
                        </div>
                    </div>
                    <div className="p-6">
                        {recentClients && recentClients.length > 0 ? (
                            <div className="space-y-4">
                                {recentClients.map((client) => (
                                    <div key={client.id} className="flex items-center justify-between">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                                                <span className="text-blue-600 font-semibold">
                                                    {client.name.charAt(0).toUpperCase()}
                                                </span>
                                            </div>
                                            <div>
                                                <p className="font-medium text-foreground">
                                                    {client.name}
                                                </p>
                                                <p className="text-sm text-muted-foreground">
                                                    {client.email}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(client.status)}`}>
                                                {client.status}
                                            </span>
                                            {client.active_subscription && (
                                                <span className="text-sm text-muted-foreground">
                                                    {client.active_subscription.credits_remaining} credits
                                                </span>
                                            )}
                                            <Link
                                                href={route('clients.show', client.id)}
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
                                No clients yet. <Link href={route('clients.create')} className="text-blue-600 hover:underline">Add your first client</Link>
                            </p>
                        )}
                    </div>
                </div>

                {/* Revenue Summary */}
                {totalRevenue > 0 && (
                    <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl p-6 border border-green-200 dark:border-green-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-semibold text-foreground">
                                    💰 Revenue (Last 6 Months)
                                </h3>
                                <p className="text-3xl font-bold text-green-600 mt-2">
                                    {formatCurrency(totalRevenue)}
                                </p>
                            </div>
                            <div className="text-4xl">📈</div>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}