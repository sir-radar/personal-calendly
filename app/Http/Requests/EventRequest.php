<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EventRequest extends FormRequest
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
            'name' => ['required', 'string', 'max:255'],
            'user_id' => ['required'],
            'start_date' => ['required', 'string'],
            'end_date' => ['nullable', 'string'],
            'start_time' => ['required', 'string'],
            'end_time' => ['required', 'string'],
            'recurrent' => ['nullable', 'boolean'],
            'recurrent_type' => ['nullable', 'in:daily,weekly,monthly'],
            'include_weekends' => ['nullable', 'boolean'],
        ];
    }
}
