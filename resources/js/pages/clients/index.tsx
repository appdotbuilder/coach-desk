import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

interface Client {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    status: string;
    created_at: string;
    active_subscription?: {
        credits_remaining: number;
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

interface PaginatedClients {
    data: Client[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: PaginationLink[];
}

interface Props {
    clients: PaginatedClients;
    [key: string]: unknown;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Clients', href: '/clients' },
];

export default function ClientsIndex({ clients }: Props) {
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

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Clients - Coach Desk" />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-4 overflow-x-auto">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground">
                            👥 Clients
                        </h1>
                        <p className="text-muted-foreground mt-2">
                            Manage your personal training clients
                        </p>
                    </div>
                    <Link
                        href={route('clients.create')}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                        Add New Client
                    </Link>
                </div>

                {/* Stats */}
                <div className="grid gap-4 md:grid-cols-3">
                    <div className="bg-card p-4 rounded-lg border">
                        <p className="text-sm text-muted-foreground">Total Clients</p>
                        <p className="text-2xl font-bold text-foreground">{clients.total}</p>
                    </div>
                    <div className="bg-card p-4 rounded-lg border">
                        <p className="text-sm text-muted-foreground">Active Clients</p>
                        <p className="text-2xl font-bold text-green-600">
                            {clients.data.filter(c => c.status === 'active').length}
                        </p>
                    </div>
                    <div className="bg-card p-4 rounded-lg border">
                        <p className="text-sm text-muted-foreground">With Subscriptions</p>
                        <p className="text-2xl font-bold text-blue-600">
                            {clients.data.filter(c => c.active_subscription).length}
                        </p>
                    </div>
                </div>

                {/* Clients Table */}
                <div className="bg-card rounded-xl shadow-sm border overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-muted/50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Client</th>
                                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Contact</th>
                                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Status</th>
                                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Subscription</th>
                                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Credits</th>
                                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Joined</th>
                                    <th className="px-6 py-4 text-right text-sm font-medium text-muted-foreground">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {clients.data.map((client) => (
                                    <tr key={client.id} className="hover:bg-muted/20">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                                                    <span className="text-blue-600 font-semibold text-sm">
                                                        {client.name.charAt(0).toUpperCase()}
                                                    </span>
                                                </div>
                                                <div>
                                                    <p className="font-medium text-foreground">{client.name}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div>
                                                <p className="text-sm text-foreground">{client.email}</p>
                                                {client.phone && (
                                                    <p className="text-sm text-muted-foreground">{client.phone}</p>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(client.status)}`}>
                                                {client.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            {client.active_subscription ? (
                                                <span className="text-sm text-foreground">
                                                    {client.active_subscription.subscription_type.name}
                                                </span>
                                            ) : (
                                                <span className="text-sm text-muted-foreground">No active subscription</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            {client.active_subscription ? (
                                                <span className={`text-sm font-medium ${
                                                    client.active_subscription.credits_remaining <= 2 
                                                        ? 'text-red-600' 
                                                        : client.active_subscription.credits_remaining <= 5 
                                                        ? 'text-yellow-600' 
                                                        : 'text-green-600'
                                                }`}>
                                                    {client.active_subscription.credits_remaining}
                                                </span>
                                            ) : (
                                                <span className="text-sm text-muted-foreground">-</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-muted-foreground">
                                            {formatDate(client.created_at)}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end space-x-2">
                                                <Link
                                                    href={route('clients.show', client.id)}
                                                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                                >
                                                    View
                                                </Link>
                                                <Link
                                                    href={route('clients.edit', client.id)}
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
                    {clients.last_page > 1 && (
                        <div className="px-6 py-4 border-t">
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-muted-foreground">
                                    Showing {((clients.current_page - 1) * clients.per_page) + 1} to{' '}
                                    {Math.min(clients.current_page * clients.per_page, clients.total)} of{' '}
                                    {clients.total} clients
                                </p>
                                <div className="flex items-center space-x-1">
                                    {clients.links.map((link, index) => (
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

                {clients.data.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">👥</div>
                        <h3 className="text-xl font-semibold text-foreground mb-2">No clients yet</h3>
                        <p className="text-muted-foreground mb-6">
                            Get started by adding your first client to your Coach Desk
                        </p>
                        <Link
                            href={route('clients.create')}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                        >
                            Add First Client
                        </Link>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}