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
            'name' => 'required|string|max:255|unique:products,name,' . $id,
            'description' => 'nullable|string',
            'price' => 'required|integer',
            'thumbnail' => 'nullable|image',
            'galleries' => 'nullable|array',
            'galleries.*.id' => 'nullable|integer',   //(input ẩn)khi cập nhật cần galleries.*.id để check cập nhập đúng sp và nếu id ko tồn tại mà có mảng sẽ thêm gallery mới 
            'galleries.*.image' => 'image',

            'variants' => 'required|array',
            'variants.*.id' => 'nullable|integer', // tương tự
            'variants.*.size_id' => 'required|exists:sizes,id',
            'variants.*.color_id' => 'required|exists:colors,id',
            'variants.*.price' => 'nullable|integer',
            'variants.*.stock' => 'required|integer|min:1',
            'variants.*.sku' => 'required|string|max:255',
            'variants.*.image' => 'image',
        ];
    }


}
