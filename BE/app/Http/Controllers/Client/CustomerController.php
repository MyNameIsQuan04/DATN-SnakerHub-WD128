<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    public function index()
    {
        $customers = Customer::where('user_id', auth()->user()->id)->get();
        return $customers;
    }
    public function show(Customer $customer)
    {
        return $customer;
    }
}