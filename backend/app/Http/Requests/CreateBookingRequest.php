<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class CreateBookingRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'room_id'    => ['required', 'integer', 'exists:rooms,id'],
            'user_name'  => ['required', 'string', 'max:255'],
            'start_time' => ['required', 'date', 'after_or_equal:today'],
            'end_time'   => ['required', 'date', 'after:start_time'],
        ];
    }
}
