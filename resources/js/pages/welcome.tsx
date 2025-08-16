import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

export default function Welcome() {
    return (
        <>
            <Head title="Fitness Studio Management" />
            
            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
                {/* Header */}
                <div className="relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-90"></div>
                    <div className="relative px-6 pt-16 pb-20 sm:px-12 sm:pt-24 sm:pb-32 lg:px-16 lg:pt-32 lg:pb-40">
                        <div className="mx-auto max-w-4xl text-center">
                            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                                <span className="block">🏋️‍♀️ Fitness Studio</span>
                                <span className="block text-purple-200">Management System</span>
                            </h1>
                            <p className="mt-6 text-lg leading-8 text-purple-100 sm:text-xl">
                                Streamline your fitness studio operations with our comprehensive management platform. 
                                Track clients, manage workouts, and boost engagement with automated notifications.
                            </p>
                            
                            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                                <Link href="/login">
                                    <Button size="lg" className="bg-white text-purple-600 hover:bg-purple-50 text-lg px-8 py-3">
                                        🔑 Admin Login
                                    </Button>
                                </Link>
                                <Link href="/dashboard">
                                    <Button 
                                        size="lg" 
                                        variant="outline" 
                                        className="border-white text-white hover:bg-white hover:text-purple-600 text-lg px-8 py-3"
                                    >
                                        📊 View Dashboard
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Features Section */}
                <div className="py-16 sm:py-24 lg:py-32">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl text-center">
                            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                                ✨ Powerful Features for Your Studio
                            </h2>
                            <p className="mt-6 text-lg leading-8 text-gray-600">
                                Everything you need to run a successful fitness studio in one comprehensive platform.
                            </p>
                        </div>
                        
                        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                                {/* Client Management */}
                                <div className="flex flex-col bg-white p-8 rounded-2xl shadow-lg">
                                    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-lg bg-gradient-to-r from-purple-500 to-blue-500">
                                        <span className="text-2xl">👥</span>
                                    </div>
                                    <dt className="text-xl font-semibold leading-7 text-gray-900">
                                        Client Management
                                    </dt>
                                    <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                                        <p className="flex-auto">
                                            Manage client profiles, track subscription types (6 or 13 sessions), 
                                            monitor remaining credits, and maintain detailed health records.
                                        </p>
                                        <div className="mt-6">
                                            <div className="flex items-center gap-2 text-sm">
                                                <span className="text-green-600">✓</span> Subscription tracking
                                            </div>
                                            <div className="flex items-center gap-2 text-sm">
                                                <span className="text-green-600">✓</span> Credit management
                                            </div>
                                            <div className="flex items-center gap-2 text-sm">
                                                <span className="text-green-600">✓</span> Health profiles
                                            </div>
                                        </div>
                                    </dd>
                                </div>

                                {/* Workout Scheduling */}
                                <div className="flex flex-col bg-white p-8 rounded-2xl shadow-lg">
                                    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-lg bg-gradient-to-r from-purple-500 to-blue-500">
                                        <span className="text-2xl">🗓️</span>
                                    </div>
                                    <dt className="text-xl font-semibold leading-7 text-gray-900">
                                        Workout Scheduling
                                    </dt>
                                    <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                                        <p className="flex-auto">
                                            Create and manage workout sessions, handle client bookings, 
                                            track attendance, and automatically deduct credits when clients attend.
                                        </p>
                                        <div className="mt-6">
                                            <div className="flex items-center gap-2 text-sm">
                                                <span className="text-green-600">✓</span> Session scheduling
                                            </div>
                                            <div className="flex items-center gap-2 text-sm">
                                                <span className="text-green-600">✓</span> Attendance tracking
                                            </div>
                                            <div className="flex items-center gap-2 text-sm">
                                                <span className="text-green-600">✓</span> Auto credit deduction
                                            </div>
                                        </div>
                                    </dd>
                                </div>

                                {/* Analytics & Notifications */}
                                <div className="flex flex-col bg-white p-8 rounded-2xl shadow-lg">
                                    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-lg bg-gradient-to-r from-purple-500 to-blue-500">
                                        <span className="text-2xl">📈</span>
                                    </div>
                                    <dt className="text-xl font-semibold leading-7 text-gray-900">
                                        Analytics & Alerts
                                    </dt>
                                    <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                                        <p className="flex-auto">
                                            Comprehensive dashboard with monthly statistics, automated low-credit 
                                            notifications, and detailed analytics to help grow your business.
                                        </p>
                                        <div className="mt-6">
                                            <div className="flex items-center gap-2 text-sm">
                                                <span className="text-green-600">✓</span> Monthly statistics
                                            </div>
                                            <div className="flex items-center gap-2 text-sm">
                                                <span className="text-green-600">✓</span> Email notifications
                                            </div>
                                            <div className="flex items-center gap-2 text-sm">
                                                <span className="text-green-600">✓</span> Performance metrics
                                            </div>
                                        </div>
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </div>

                {/* Stats Preview */}
                <div className="bg-gradient-to-r from-purple-600 to-blue-600">
                    <div className="px-6 py-16 sm:px-12 sm:py-24 lg:px-16">
                        <div className="mx-auto max-w-4xl text-center">
                            <h2 className="text-3xl font-bold text-white sm:text-4xl">
                                📊 Real-Time Studio Insights
                            </h2>
                            <p className="mt-6 text-lg text-purple-100">
                                Get instant visibility into your studio's performance with our comprehensive dashboard.
                            </p>
                            
                            <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                                <div className="text-center">
                                    <div className="text-4xl font-bold text-white">📅</div>
                                    <div className="mt-2 text-sm text-purple-200">Monthly Check-ins</div>
                                    <div className="text-2xl font-semibold text-white">Track attendance</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-4xl font-bold text-white">👤</div>
                                    <div className="mt-2 text-sm text-purple-200">Unique Clients</div>
                                    <div className="text-2xl font-semibold text-white">Engagement metrics</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-4xl font-bold text-white">💳</div>
                                    <div className="mt-2 text-sm text-purple-200">Credit Usage</div>
                                    <div className="text-2xl font-semibold text-white">By subscription</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-4xl font-bold text-white">🔔</div>
                                    <div className="mt-2 text-sm text-purple-200">Smart Alerts</div>
                                    <div className="text-2xl font-semibold text-white">Low credits</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="py-16 sm:py-24">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            🚀 Ready to Transform Your Studio?
                        </h2>
                        <p className="mt-6 text-lg leading-8 text-gray-600">
                            Join the future of fitness studio management. Get started today!
                        </p>
                        <div className="mt-10">
                            <Link href="/login">
                                <Button 
                                    size="lg" 
                                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg px-8 py-3"
                                >
                                    🎯 Get Started Now
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <footer className="bg-gray-50 border-t">
                    <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
                        <div className="text-center text-sm text-gray-500">
                            <p>🏋️‍♀️ Fitness Studio Management System - Streamline Your Operations</p>
                            <p className="mt-2">Built with Laravel, React & TypeScript</p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}