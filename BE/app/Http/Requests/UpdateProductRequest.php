<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateProductRequest extends FormRequest
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
    $id = $this->route('product')->id;
    return [
        
        'category_id' => 'required|integer',
        'name' => 'required|string|max:255|unique:products,name,'. $id,
        'description' => 'nullable|string',
        'price' => 'required|integer',
        'thumbnail' => 'nullable|image',

        'variants' => 'required|array',
        'variants.*.id' => 'nullable',
        'variants.*.size_id' => 'required|exists:sizes,id',
        'variants.*.color_id' => 'required|exists:colors,id',
        'variants.*.price' => 'nullable|integer',
        'variants.*.stock' => 'required|integer|min:1',
        'variants.*.sku' => 'required|string|max:255',
        'variants.*.images' => 'nullable|array',
        'variants.*.images.*' => 'nullable|image',
    ];
}


}
