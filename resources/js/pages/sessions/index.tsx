import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

interface WorkoutSession {
    id: number;
    scheduled_at: string;
    duration_minutes: number;
    session_type: string;
    status: string;
    notes: string | null;
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

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginatedSessions {
    data: WorkoutSession[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: PaginationLink[];
}

interface Props {
    sessions: PaginatedSessions;
    [key: string]: unknown;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Sessions', href: '/sessions' },
];

export default function SessionsIndex({ sessions }: Props) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'scheduled':
                return 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/20';
            case 'completed':
                return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/20';
            case 'cancelled':
                return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-700/20';
            case 'no_show':
                return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/20';
            default:
                return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-700/20';
        }
    };

    const formatDateTime = (dateString: string) => {
        return new Date(dateString).toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatSessionType = (type: string) => {
        return type.split('_').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Workout Sessions - Coach Desk" />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-4 overflow-x-auto">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground">
                            🏋️ Workout Sessions
                        </h1>
                        <p className="text-muted-foreground mt-2">
                            Manage and track all workout sessions
                        </p>
                    </div>
                    <Link
                        href={route('sessions.create')}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                        Schedule Session
                    </Link>
                </div>

                {/* Stats */}
                <div className="grid gap-4 md:grid-cols-4">
                    <div className="bg-card p-4 rounded-lg border">
                        <p className="text-sm text-muted-foreground">Total Sessions</p>
                        <p className="text-2xl font-bold text-foreground">{sessions.total}</p>
                    </div>
                    <div className="bg-card p-4 rounded-lg border">
                        <p className="text-sm text-muted-foreground">Scheduled</p>
                        <p className="text-2xl font-bold text-blue-600">
                            {sessions.data.filter(s => s.status === 'scheduled').length}
                        </p>
                    </div>
                    <div className="bg-card p-4 rounded-lg border">
                        <p className="text-sm text-muted-foreground">Completed</p>
                        <p className="text-2xl font-bold text-green-600">
                            {sessions.data.filter(s => s.status === 'completed').length}
                        </p>
                    </div>
                    <div className="bg-card p-4 rounded-lg border">
                        <p className="text-sm text-muted-foreground">This Page</p>
                        <p className="text-2xl font-bold text-foreground">{sessions.data.length}</p>
                    </div>
                </div>

                {/* Sessions Table */}
                <div className="bg-card rounded-xl shadow-sm border overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-muted/50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Client</th>
                                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Date & Time</th>
                                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Type</th>
                                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Duration</th>
                                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Status</th>
                                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Subscription</th>
                                    <th className="px-6 py-4 text-right text-sm font-medium text-muted-foreground">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {sessions.data.map((session) => (
                                    <tr key={session.id} className="hover:bg-muted/20">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                                                    <span className="text-blue-600 font-semibold text-sm">
                                                        {session.client.name.charAt(0).toUpperCase()}
                                                    </span>
                                                </div>
                                                <div>
                                                    <p className="font-medium text-foreground">{session.client.name}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-sm text-foreground">{formatDateTime(session.scheduled_at)}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-sm text-foreground">{formatSessionType(session.session_type)}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-sm text-foreground">{session.duration_minutes} min</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(session.status)}`}>
                                                {session.status.replace('_', ' ')}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-sm text-foreground">
                                                {session.client_subscription.subscription_type.name}
                                            </p>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end space-x-2">
                                                <Link
                                                    href={route('sessions.show', session.id)}
                                                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                                >
                                                    View
                                                </Link>
                                                <Link
                                                    href={route('sessions.edit', session.id)}
                                                    className="text-gray-600 hover:text-gray-800 text-sm font-medium"
                                                >
                                                    Edit
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {sessions.last_page > 1 && (
                        <div className="px-6 py-4 border-t">
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-muted-foreground">
                                    Showing {((sessions.current_page - 1) * sessions.per_page) + 1} to{' '}
                                    {Math.min(sessions.current_page * sessions.per_page, sessions.total)} of{' '}
                                    {sessions.total} sessions
                                </p>
                                <div className="flex items-center space-x-1">
                                    {sessions.links.map((link, index) => (
                                        link.url ? (
                                            <Link
                                                key={index}
                                                href={link.url}
                                                className={`px-3 py-1 rounded text-sm ${
                                                    link.active 
                                                        ? 'bg-blue-600 text-white' 
                                                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                                                }`}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        ) : (
                                            <span
                                                key={index}
                                                className="px-3 py-1 text-sm text-muted-foreground/50"
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        )
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {sessions.data.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">🏋️</div>
                        <h3 className="text-xl font-semibold text-foreground mb-2">No sessions scheduled</h3>
                        <p className="text-muted-foreground mb-6">
                            Start scheduling workout sessions with your clients
                        </p>
                        <Link
                            href={route('sessions.create')}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                        >
                            Schedule First Session
                        </Link>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}