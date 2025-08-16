import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';

interface Workout {
    id: number;
    name: string;
    description: string | null;
    scheduled_at: string;
    capacity: number;
    instructor: string;
    duration_minutes: number;
    status: string;
    available_spots: number;
    clients_count: number;
    created_at: string;
}

interface Props {
    workouts: {
        data: Workout[];
        current_page: number;
        last_page: number;
        total: number;
    };
    [key: string]: unknown;
}

export default function WorkoutsIndex({ workouts }: Props) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active':
                return 'text-green-600 bg-green-100';
            case 'cancelled':
                return 'text-red-600 bg-red-100';
            case 'completed':
                return 'text-gray-600 bg-gray-100';
            default:
                return 'text-gray-600 bg-gray-100';
        }
    };

    const getCapacityColor = (available: number, total: number) => {
        const percentage = (total - available) / total;
        if (percentage >= 0.9) return 'text-red-600';
        if (percentage >= 0.7) return 'text-orange-600';
        return 'text-green-600';
    };

    return (
        <AppShell>
            <Head title="Workouts - Fitness Studio" />
            
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground">
                            💪 Workouts
                        </h1>
                        <p className="text-muted-foreground mt-2">
                            Manage your studio's workout schedule and sessions.
                        </p>
                    </div>
                    <Link href="/workouts/create">
                        <Button className="bg-blue-600 hover:bg-blue-700">
                            ➕ Create Workout
                        </Button>
                    </Link>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-card p-4 rounded-lg shadow-sm border">
                        <div className="text-2xl">📊</div>
                        <div className="text-2xl font-bold text-foreground mt-2">
                            {workouts.total}
                        </div>
                        <div className="text-sm text-muted-foreground">
                            Total Workouts
                        </div>
                    </div>
                    <div className="bg-card p-4 rounded-lg shadow-sm border">
                        <div className="text-2xl">✅</div>
                        <div className="text-2xl font-bold text-green-600 mt-2">
                            {workouts.data.filter(w => w.status === 'active').length}
                        </div>
                        <div className="text-sm text-muted-foreground">
                            Active Workouts
                        </div>
                    </div>
                    <div className="bg-card p-4 rounded-lg shadow-sm border">
                        <div className="text-2xl">🏆</div>
                        <div className="text-2xl font-bold text-blue-600 mt-2">
                            {workouts.data.filter(w => w.status === 'completed').length}
                        </div>
                        <div className="text-sm text-muted-foreground">
                            Completed
                        </div>
                    </div>
                    <div className="bg-card p-4 rounded-lg shadow-sm border">
                        <div className="text-2xl">❌</div>
                        <div className="text-2xl font-bold text-red-600 mt-2">
                            {workouts.data.filter(w => w.status === 'cancelled').length}
                        </div>
                        <div className="text-sm text-muted-foreground">
                            Cancelled
                        </div>
                    </div>
                </div>

                {/* Workouts List */}
                <div className="bg-card rounded-xl shadow-sm border">
                    <div className="p-6 border-b">
                        <h3 className="text-lg font-semibold text-foreground">
                            All Workouts
                        </h3>
                    </div>
                    <div className="p-6">
                        {workouts.data.length > 0 ? (
                            <div className="space-y-4">
                                {workouts.data.map((workout) => (
                                    <div key={workout.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3">
                                                <h4 className="text-lg font-semibold text-foreground">
                                                    {workout.name}
                                                </h4>
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(workout.status)}`}>
                                                    {workout.status}
                                                </span>
                                            </div>
                                            <p className="text-muted-foreground text-sm mt-1">
                                                {formatDate(workout.scheduled_at)} • {workout.duration_minutes} mins • {workout.instructor}
                                            </p>
                                            {workout.description && (
                                                <p className="text-muted-foreground text-sm mt-1">
                                                    {workout.description.substring(0, 100)}...
                                                </p>
                                            )}
                                        </div>
                                        
                                        <div className="flex items-center gap-4 ml-4">
                                            <div className="text-center">
                                                <div className={`text-lg font-bold ${getCapacityColor(workout.available_spots, workout.capacity)}`}>
                                                    {workout.capacity - workout.available_spots}/{workout.capacity}
                                                </div>
                                                <div className="text-xs text-muted-foreground">
                                                    Booked
                                                </div>
                                            </div>
                                            
                                            <div className="flex gap-2">
                                                <Link href={`/workouts/${workout.id}`}>
                                                    <Button size="sm" variant="outline">
                                                        View
                                                    </Button>
                                                </Link>
                                                <Link href={`/workouts/${workout.id}/edit`}>
                                                    <Button size="sm" variant="outline">
                                                        Edit
                                                    </Button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <div className="text-4xl mb-4">💪</div>
                                <h3 className="text-lg font-semibold text-foreground mb-2">
                                    No workouts scheduled yet
                                </h3>
                                <p className="text-muted-foreground mb-4">
                                    Get started by creating your first workout session.
                                </p>
                                <Link href="/workouts/create">
                                    <Button className="bg-blue-600 hover:bg-blue-700">
                                        Create Your First Workout
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                {/* Pagination */}
                {workouts.last_page > 1 && (
                    <div className="flex justify-center gap-2">
                        {Array.from({ length: workouts.last_page }, (_, i) => i + 1).map(page => (
                            <Link
                                key={page}
                                href={`/workouts?page=${page}`}
                                className={`px-3 py-2 rounded ${
                                    page === workouts.current_page 
                                        ? 'bg-blue-600 text-white' 
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                            >
                                {page}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </AppShell>
    );
}