<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Log; // Thêm dòng này để import Log
class StoreProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }
    protected function prepareForValidation()
    {
        // Ghi log toàn bộ dữ liệu request
        Log::info($this->all());
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
            'price' => 'required|integer',
            'thumbnail' => 'required|image',
            'galleries' => 'nullable|array',
            'galleries.*' => 'image',

            'variants' => 'required|array',
            'variants.*.size_id' => 'required|exists:sizes,id',
            'variants.*.color_id' => 'required|exists:colors,id',
            'variants.*.price' => 'nullable|integer',
            'variants.*.stock' => 'required|integer|min:1',
            'variants.*.sku' => 'required|string|max:50|unique:product__variants,sku',
            'variants.*.image' => 'nullable|image',
        ];
    }
}
