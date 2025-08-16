import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

interface ClientFormData {
    name: string;
    email: string;
    phone: string;
    address: string;
    date_of_birth: string;
    fitness_goals: string;
    health_conditions: string;
    emergency_contact: string;
    status: string;
    [key: string]: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Clients', href: '/clients' },
    { title: 'Create', href: '/clients/create' },
];

export default function CreateClient() {
    const { data, setData, post, processing, errors } = useForm<ClientFormData>({
        name: '',
        email: '',
        phone: '',
        address: '',
        date_of_birth: '',
        fitness_goals: '',
        health_conditions: '',
        emergency_contact: '',
        status: 'active'
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('clients.store'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Add New Client - Coach Desk" />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-4">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold text-foreground">
                        👤 Add New Client
                    </h1>
                    <p className="text-muted-foreground mt-2">
                        Create a new client profile for your training business
                    </p>
                </div>

                {/* Form */}
                <div className="bg-card rounded-xl shadow-sm border p-6">
                    <form onSubmit={submit} className="space-y-6">
                        <div className="grid gap-6 md:grid-cols-2">
                            {/* Basic Information */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-foreground border-b pb-2">
                                    Basic Information
                                </h3>
                                
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-background text-foreground"
                                        placeholder="Enter client's full name"
                                    />
                                    {errors.name && (
                                        <p className="text-red-600 text-sm mt-1">{errors.name}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-background text-foreground"
                                        placeholder="client@example.com"
                                    />
                                    {errors.email && (
                                        <p className="text-red-600 text-sm mt-1">{errors.email}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        value={data.phone}
                                        onChange={(e) => setData('phone', e.target.value)}
                                        className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-background text-foreground"
                                        placeholder="(555) 123-4567"
                                    />
                                    {errors.phone && (
                                        <p className="text-red-600 text-sm mt-1">{errors.phone}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="date_of_birth" className="block text-sm font-medium text-foreground mb-2">
                                        Date of Birth
                                    </label>
                                    <input
                                        type="date"
                                        id="date_of_birth"
                                        value={data.date_of_birth}
                                        onChange={(e) => setData('date_of_birth', e.target.value)}
                                        className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-background text-foreground"
                                    />
                                    {errors.date_of_birth && (
                                        <p className="text-red-600 text-sm mt-1">{errors.date_of_birth}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="status" className="block text-sm font-medium text-foreground mb-2">
                                        Status *
                                    </label>
                                    <select
                                        id="status"
                                        value={data.status}
                                        onChange={(e) => setData('status', e.target.value)}
                                        className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-background text-foreground"
                                    >
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                        <option value="suspended">Suspended</option>
                                    </select>
                                    {errors.status && (
                                        <p className="text-red-600 text-sm mt-1">{errors.status}</p>
                                    )}
                                </div>
                            </div>

                            {/* Additional Information */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-foreground border-b pb-2">
                                    Additional Information
                                </h3>

                                <div>
                                    <label htmlFor="address" className="block text-sm font-medium text-foreground mb-2">
                                        Address
                                    </label>
                                    <textarea
                                        id="address"
                                        value={data.address}
                                        onChange={(e) => setData('address', e.target.value)}
                                        rows={3}
                                        className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-background text-foreground"
                                        placeholder="Enter client's address"
                                    />
                                    {errors.address && (
                                        <p className="text-red-600 text-sm mt-1">{errors.address}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="fitness_goals" className="block text-sm font-medium text-foreground mb-2">
                                        Fitness Goals
                                    </label>
                                    <textarea
                                        id="fitness_goals"
                                        value={data.fitness_goals}
                                        onChange={(e) => setData('fitness_goals', e.target.value)}
                                        rows={3}
                                        className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-background text-foreground"
                                        placeholder="What are the client's fitness goals?"
                                    />
                                    {errors.fitness_goals && (
                                        <p className="text-red-600 text-sm mt-1">{errors.fitness_goals}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="health_conditions" className="block text-sm font-medium text-foreground mb-2">
                                        Health Conditions
                                    </label>
                                    <textarea
                                        id="health_conditions"
                                        value={data.health_conditions}
                                        onChange={(e) => setData('health_conditions', e.target.value)}
                                        rows={3}
                                        className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-background text-foreground"
                                        placeholder="Any health conditions or injuries to be aware of?"
                                    />
                                    {errors.health_conditions && (
                                        <p className="text-red-600 text-sm mt-1">{errors.health_conditions}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="emergency_contact" className="block text-sm font-medium text-foreground mb-2">
                                        Emergency Contact
                                    </label>
                                    <input
                                        type="text"
                                        id="emergency_contact"
                                        value={data.emergency_contact}
                                        onChange={(e) => setData('emergency_contact', e.target.value)}
                                        className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-background text-foreground"
                                        placeholder="Name and phone number"
                                    />
                                    {errors.emergency_contact && (
                                        <p className="text-red-600 text-sm mt-1">{errors.emergency_contact}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Submit Buttons */}
                        <div className="flex items-center justify-end space-x-4 pt-6 border-t">
                            <button
                                type="button"
                                onClick={() => window.history.back()}
                                className="px-4 py-2 text-muted-foreground border border-input rounded-md hover:bg-muted/50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition-colors disabled:opacity-50"
                            >
                                {processing ? 'Creating...' : 'Create Client'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}