<?php

namespace App\Http\Controllers\Client;

use App\Models\Customer;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class CustomerController extends Controller
{
    public function index()
    {
        $customers = Customer::where('user_id', Auth::id())->get();
        return $customers;
    }
    public function show(Customer $customer)
    {
        return $customer;
    }
}