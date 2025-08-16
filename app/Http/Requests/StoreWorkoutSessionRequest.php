<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreWorkoutSessionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'client_id' => 'required|exists:clients,id',
            'client_subscription_id' => 'required|exists:client_subscriptions,id',
            'scheduled_at' => 'required|date|after:now',
            'duration_minutes' => 'required|integer|min:15|max:180',
            'session_type' => 'required|in:personal_training,group_training,consultation,assessment',
            'notes' => 'nullable|string',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'client_id.required' => 'Please select a client.',
            'client_id.exists' => 'Selected client does not exist.',
            'client_subscription_id.required' => 'Please select a subscription.',
            'client_subscription_id.exists' => 'Selected subscription does not exist.',
            'scheduled_at.required' => 'Session date and time is required.',
            'scheduled_at.after' => 'Session must be scheduled for a future date and time.',
            'duration_minutes.required' => 'Session duration is required.',
            'duration_minutes.min' => 'Session must be at least 15 minutes.',
            'duration_minutes.max' => 'Session cannot exceed 3 hours.',
            'session_type.required' => 'Session type is required.',
            'session_type.in' => 'Invalid session type selected.',
        ];
    }
}