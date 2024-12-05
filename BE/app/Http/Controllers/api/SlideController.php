<?php

namespace App\Http\Controllers\api;

use App\Models\Slide;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class SlideController extends Controller
{
     // Lấy danh sách tất cả các slide
     public function index()
     {
         $slides = Slide::all();  // Lấy tất cả các slide
         return response()->json($slides, Response::HTTP_OK);  // Trả về dữ liệu dưới dạng JSON
     }
 
     // Lấy thông tin slide cụ thể
     public function show($id)
     {
         $slide = Slide::find($id);  // Tìm slide theo ID
 
         if (!$slide) {
             return response()->json(['message' => 'Slide not found'], Response::HTTP_NOT_FOUND);
         }
 
         return response()->json($slide, Response::HTTP_OK);  // Trả về thông tin slide
     }
 
     // Tạo mới slide
     public function store(Request $request)
     {
         // Validation
         $validator = Validator::make($request->all(), [
             'title' => 'required|string|max:255',
             'image' => 'required|image|mimes:jpg,jpeg,png,gif',
             'link' => 'nullable|url',
         ]);
 
         if ($validator->fails()) {
             return response()->json(['errors' => $validator->errors()], Response::HTTP_BAD_REQUEST);
         }
 
         // Lưu hình ảnh slide vào thư mục public
         $imagePath = $request->file('image')->store('slides', 'public');
 
         // Tạo slide mới
         $slide = Slide::create([
             'title' => $request->title,
             'image' => $imagePath,
             'link' => $request->link,
             'status' => $request->status ?? 1,  // Mặc định trạng thái là 1 (hiển thị)
         ]);
 
         return response()->json($slide, Response::HTTP_CREATED);  // Trả về slide vừa tạo
     }
 
     // Cập nhật thông tin slide
     public function update(Request $request, $id)
     {
         // Tìm slide theo ID
         $slide = Slide::find($id);
 
         if (!$slide) {
             return response()->json(['message' => 'Slide not found'], Response::HTTP_NOT_FOUND);
         }
 
         // Validation
         $validator = Validator::make($request->all(), [
             'title' => 'required|string|max:255',
             'image' => 'nullable|image|mimes:jpg,jpeg,png,gif',
             'link' => 'nullable|url',
         ]);
 
         if ($validator->fails()) {
             return response()->json(['errors' => $validator->errors()], Response::HTTP_BAD_REQUEST);
         }
 
         // Cập nhật thông tin slide
         $slide->title = $request->title;
         $slide->link = $request->link;
 
         // Nếu có hình ảnh mới, lưu lại
         if ($request->hasFile('image')) {
             $imagePath = $request->file('image')->store('slides', 'public');
             $slide->image = $imagePath;
         }
 
         $slide->status = $request->status ?? $slide->status;  // Giữ nguyên trạng thái nếu không thay đổi
 
         $slide->save();
 
         return response()->json($slide, Response::HTTP_OK);  // Trả về slide đã cập nhật
     }
 
     // Xóa slide
     public function destroy($id)
     {
         // Tìm slide theo ID
         $slide = Slide::find($id);
 
         if (!$slide) {
             return response()->json(['message' => 'Slide not found'], Response::HTTP_NOT_FOUND);
         }
 
         // Xóa slide
         $slide->delete();
 
         return response()->json(['message' => 'Slide deleted successfully'], Response::HTTP_OK);
     }
}
