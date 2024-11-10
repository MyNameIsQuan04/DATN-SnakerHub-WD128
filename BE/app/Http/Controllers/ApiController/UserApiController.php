<?php
namespace App\Http\Controllers\ApiController;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;

class UserApiController extends Controller
{
    /**
     * Display a listing of the resource (for admin).
     */
    public function index()
    {
        if (auth()->user()->type !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $users = User::all();
        return response()->json($users);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6',
            'phone_number' => 'nullable|string|max:20',
            'address' => 'nullable|string',
            'type' => 'required|in:customer,admin',
            'gender' => 'nullable|in:male,female,other',
            'birthday' => 'nullable|date',
            'avatar' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $validatedData['password'] = bcrypt($validatedData['password']);

        $user = User::create($validatedData);

        return response()->json($user, 201);
    }
    public function profile(Request $request)
    {
        // Lấy thông tin người dùng từ token
        $user = $request->user();

        return response()->json($user);
    }

    /**
     * Display the specified resource (for both admin and user).
     */
    public function show(string $id)
    {
        $user = User::findOrFail($id);

        // Admin có thể xem bất kỳ thông tin người dùng nào
        if (auth()->user()->type === 'admin') {
            return response()->json($user);
        }

        // User chỉ có thể xem thông tin của chính mình
        if (auth()->user()->id === $user->id) {
            return response()->json($user);
        }

        return response()->json(['message' => 'Unauthorized'], 403);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $user = User::findOrFail($id);

        $validatedData = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|email|unique:users,email,' . $id,
            'password' => 'sometimes|nullable|string|min:6',
            'phone_number' => 'nullable|string|max:20',
            'address' => 'nullable|string',
            'type' => 'sometimes|required|in:user,admin',
            'gender' => 'nullable|in:male,female,other',
            'birthday' => 'nullable|date',
            'avatar' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        if ($request->has('password') && !empty($validatedData['password'])) {
            $validatedData['password'] = bcrypt($validatedData['password']);
        } else {
            unset($validatedData['password']);
        }

        $user->update($validatedData);

        return response()->json($user);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = User::findOrFail($id);
        $user->delete();

        return response()->json(['message' => 'User deleted successfully']);
    }

    /**
     * Lock user account (for admin).
     */
    public function lockAccount($id)
    {
        if (auth()->user()->type !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $user = User::findOrFail($id);

        if ($user->is_locked) {
            return response()->json(['message' => 'User account is already locked'], 400);
        }

        $user->is_locked = true;
        $user->save();

        return response()->json(['message' => 'User account has been locked successfully']);
    }

    /**
     * Unlock user account (for admin).
     */
    public function unlockAccount($id)
    {
        if (auth()->user()->type !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $user = User::findOrFail($id);

        if (!$user->is_locked) {
            return response()->json(['message' => 'User account is already unlocked'], 400);
        }

        $user->is_locked = false;
        $user->save();

        return response()->json(['message' => 'User account has been unlocked successfully']);
    }

    /**
     * Update profile for the authenticated user.
     */
    public function updateProfile(Request $request)
    {
        // Lấy thông tin người dùng hiện tại
        $user = auth()->user();

        // Xác thực các trường cần thiết
        $validatedData = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|email|unique:users,email,' . $user->id,
            'phone_number' => 'nullable|string|max:20',
            'address' => 'nullable|string',
            'gender' => 'nullable|in:male,female,other',
            'birthday' => 'nullable|date',
            'avatar' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        // Nếu có thay đổi mật khẩu, mã hóa lại mật khẩu
        if ($request->has('password')) {
            $validatedData['password'] = bcrypt($request->password);
        }

        // Cập nhật thông tin người dùng
        $user->update($validatedData);

        // Trả về thông tin người dùng đã cập nhật
        return response()->json($user);
    }
}
