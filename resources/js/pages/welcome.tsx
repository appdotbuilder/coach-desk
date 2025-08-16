import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Coach Desk - Personal Training CRM">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6 text-gray-900 lg:justify-center lg:p-8 dark:from-gray-900 dark:to-gray-800 dark:text-white">
                <header className="mb-6 w-full max-w-[335px] text-sm lg:max-w-6xl">
                    <nav className="flex items-center justify-end gap-4">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="inline-block rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="inline-block rounded-lg border border-gray-300 px-5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="inline-block rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
                                >
                                    Start Free Trial
                                </Link>
                            </>
                        )}
                    </nav>
                </header>

                <main className="flex w-full max-w-6xl flex-col items-center text-center">
                    {/* Hero Section */}
                    <div className="mb-16">
                        <div className="mb-6">
                            <h1 className="mb-4 text-5xl font-bold lg:text-6xl">
                                <span className="text-blue-600">💪 Coach Desk</span>
                            </h1>
                            <p className="text-xl text-gray-600 lg:text-2xl dark:text-gray-300">
                                The Complete CRM Solution for Personal Trainers
                            </p>
                        </div>
                        <p className="mb-8 text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed dark:text-gray-200">
                            Streamline your personal training business with powerful client management, 
                            session tracking, subscription handling, and automated notifications. 
                            Focus on what you do best - training clients!
                        </p>
                        
                        {!auth.user && (
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    href={route('register')}
                                    className="inline-block rounded-lg bg-blue-600 px-8 py-3 text-lg font-semibold text-white hover:bg-blue-700 transition-colors shadow-lg"
                                >
                                    Get Started Free
                                </Link>
                                <Link
                                    href={route('login')}
                                    className="inline-block rounded-lg border-2 border-blue-600 px-8 py-3 text-lg font-semibold text-blue-600 hover:bg-blue-50 transition-colors dark:text-blue-400 dark:hover:bg-gray-700"
                                >
                                    Sign In
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Features Grid */}
                    <div className="mb-16 w-full">
                        <h2 className="mb-12 text-3xl font-bold text-gray-900 dark:text-white">
                            Everything You Need to Manage Your Training Business
                        </h2>
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            <div className="rounded-xl bg-white p-8 shadow-lg dark:bg-gray-800">
                                <div className="mb-4 text-4xl">👥</div>
                                <h3 className="mb-3 text-xl font-semibold">Client Management</h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Store detailed client profiles with fitness goals, health conditions, 
                                    and contact information all in one place.
                                </p>
                            </div>
                            
                            <div className="rounded-xl bg-white p-8 shadow-lg dark:bg-gray-800">
                                <div className="mb-4 text-4xl">📅</div>
                                <h3 className="mb-3 text-xl font-semibold">Session Scheduling</h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Schedule workout sessions, track attendance, and automatically 
                                    manage client credits with every completed session.
                                </p>
                            </div>
                            
                            <div className="rounded-xl bg-white p-8 shadow-lg dark:bg-gray-800">
                                <div className="mb-4 text-4xl">💳</div>
                                <h3 className="mb-3 text-xl font-semibold">Subscription Tracking</h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Manage different subscription types, track remaining credits, 
                                    and monitor expiration dates effortlessly.
                                </p>
                            </div>
                            
                            <div className="rounded-xl bg-white p-8 shadow-lg dark:bg-gray-800">
                                <div className="mb-4 text-4xl">📊</div>
                                <h3 className="mb-3 text-xl font-semibold">Analytics Dashboard</h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Get insights into monthly check-ins, revenue trends, and client 
                                    engagement with beautiful charts and statistics.
                                </p>
                            </div>
                            
                            <div className="rounded-xl bg-white p-8 shadow-lg dark:bg-gray-800">
                                <div className="mb-4 text-4xl">🔔</div>
                                <h3 className="mb-3 text-xl font-semibold">Smart Notifications</h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Get automatically notified when clients are running low on credits 
                                    or when subscriptions are about to expire.
                                </p>
                            </div>
                            
                            <div className="rounded-xl bg-white p-8 shadow-lg dark:bg-gray-800">
                                <div className="mb-4 text-4xl">⚡</div>
                                <h3 className="mb-3 text-xl font-semibold">Easy to Use</h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Intuitive interface designed specifically for personal trainers. 
                                    No technical knowledge required - just focus on your clients.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Stats Section */}
                    <div className="mb-16 w-full rounded-2xl bg-white p-12 shadow-lg dark:bg-gray-800">
                        <h2 className="mb-8 text-3xl font-bold">Built for Professional Trainers</h2>
                        <div className="grid gap-8 md:grid-cols-3">
                            <div>
                                <div className="mb-2 text-4xl font-bold text-blue-600">100%</div>
                                <p className="text-gray-600 dark:text-gray-300">Web-based - No installation required</p>
                            </div>
                            <div>
                                <div className="mb-2 text-4xl font-bold text-blue-600">24/7</div>
                                <p className="text-gray-600 dark:text-gray-300">Access your client data anytime, anywhere</p>
                            </div>
                            <div>
                                <div className="mb-2 text-4xl font-bold text-blue-600">Secure</div>
                                <p className="text-gray-600 dark:text-gray-300">Your client data is encrypted and protected</p>
                            </div>
                        </div>
                    </div>

                    {/* CTA Section */}
                    {!auth.user && (
                        <div className="w-full rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 p-12 text-white shadow-xl">
                            <h2 className="mb-4 text-3xl font-bold">Ready to Transform Your Training Business?</h2>
                            <p className="mb-8 text-xl opacity-90">
                                Join thousands of personal trainers who have simplified their client management with Coach Desk.
                            </p>
                            <Link
                                href={route('register')}
                                className="inline-block rounded-lg bg-white px-8 py-3 text-lg font-semibold text-blue-600 hover:bg-gray-100 transition-colors shadow-lg"
                            >
                                Start Your Free Trial Today
                            </Link>
                        </div>
                    )}
                </main>

                <footer className="mt-16 text-center text-sm text-gray-500 dark:text-gray-400">
                    <p>© 2024 Coach Desk. Built with ❤️ for personal trainers.</p>
                </footer>
            </div>
        </>
    );
}