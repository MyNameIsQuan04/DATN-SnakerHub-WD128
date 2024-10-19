<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Log; // Thêm dòng này để import Log

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
     * Prepare the data for validation.
     */
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
        $id = $this->route('product')->id; // Lấy ID từ route
        return [
            'category_id' => 'required|integer',
            'name' => 'required|string|max:255|unique:products,name,' . $id,
            'description' => 'nullable|string',
            'price' => 'required|integer',
            'thumbnail' => 'nullable|image',
            'galleries' => 'nullable|array',
            'galleries.*.id' => 'nullable|integer',
            'galleries.*.image' => 'image',
            'variants' => 'required|array',
            'variants.*.id' => 'nullable|integer',
            'variants.*.size_id' => 'required|exists:sizes,id',
            'variants.*.color_id' => 'required|exists:colors,id',
            'variants.*.price' => 'nullable|integer',
            'variants.*.stock' => 'required|integer|min:1',
            'variants.*.sku' => 'required|string|max:255',
            'variants.*.image' => 'image',
        ];
    }
}
