<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProductRequest extends FormRequest
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
            'category_id' => 'required|exists:categories,id',
            'name' => 'required|string|max:255|unique:products',
            'description' => 'nullable|string',
            'short_description' => 'nullable|string',
            'price' => 'required|integer',
            'thumbnail' => 'required|image',
            'galleries' => 'nullable|array',
            'galleries.*' => 'image',

            // 'color' => 'required|array',
            // 'color.*' => 'required|integer',
            // 'size' => 'required|array',
            // 'size.*' => 'required|integer',

            'variants' => 'required|array',
            'variants.*.size_id' => 'required|exists:sizes,id',
            'variants.*.color_id' => 'required|exists:colors,id',
            'variants.*.price' => 'nullable|integer',
            'variants.*.stock' => 'required|integer|min:1',
            // 'variants.*.sku' => 'required|string|max:50|unique:product__variants,sku',
            'variants.*.image' => 'nullable|image',
        ];
    }
}
