<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreWorkoutRequest extends FormRequest
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
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'scheduled_at' => 'required|date|after:now',
            'capacity' => 'required|integer|min:1|max:50',
            'instructor' => 'required|string|max:255',
            'duration_minutes' => 'required|integer|min:15|max:180',
            'status' => 'required|in:active,cancelled,completed',
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
            'name.required' => 'Workout name is required.',
            'scheduled_at.required' => 'Please select a date and time for the workout.',
            'scheduled_at.after' => 'Workout must be scheduled for a future date and time.',
            'capacity.required' => 'Please specify the workout capacity.',
            'capacity.min' => 'Capacity must be at least 1 person.',
            'capacity.max' => 'Capacity cannot exceed 50 people.',
            'instructor.required' => 'Instructor name is required.',
            'duration_minutes.min' => 'Workout duration must be at least 15 minutes.',
            'duration_minutes.max' => 'Workout duration cannot exceed 3 hours.',
        ];
    }
}