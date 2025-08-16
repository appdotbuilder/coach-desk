<?php

namespace App\Http\Requests;

use App\Models\Client;
use App\Models\Workout;
use App\Models\WorkoutClient;
use Illuminate\Foundation\Http\FormRequest;

class StoreWorkoutClientRequest extends FormRequest
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
            'workout_id' => 'required|exists:workouts,id',
            'client_id' => 'required|exists:clients,id',
            'attended' => 'boolean',
        ];
    }

    /**
     * Configure the validator instance.
     */
    public function withValidator($validator): void
    {
        $validator->after(function ($validator) {
            $workoutId = $this->input('workout_id');
            $clientId = $this->input('client_id');

            // Check if booking already exists
            $existingBooking = WorkoutClient::where('workout_id', $workoutId)
                ->where('client_id', $clientId)
                ->first();

            if ($existingBooking) {
                $validator->errors()->add('client_id', 'This client is already booked for this workout.');
            }

            // Check workout capacity
            $workout = Workout::find($workoutId);
            if ($workout && $workout->workoutClients()->count() >= $workout->capacity) {
                $validator->errors()->add('workout_id', 'This workout is fully booked.');
            }

            // Check client has credits
            $client = Client::find($clientId);
            if ($client && $client->credits_remaining <= 0) {
                $validator->errors()->add('client_id', 'This client has no remaining credits.');
            }

            // Check client is active
            if ($client && $client->status !== 'active') {
                $validator->errors()->add('client_id', 'This client account is not active.');
            }
        });
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'workout_id.required' => 'Please select a workout.',
            'workout_id.exists' => 'The selected workout does not exist.',
            'client_id.required' => 'Please select a client.',
            'client_id.exists' => 'The selected client does not exist.',
        ];
    }
}