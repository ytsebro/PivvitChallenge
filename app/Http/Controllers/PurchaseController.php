<?php

namespace App\Http\Controllers;

use App\Offering;
use App\Purchase;
use Illuminate\Http\Request;

class PurchaseController extends Controller
{
    public function save(Request $request)
    {

        $offering = Offering::where('id', $request->id)->firstOrFail();

        $purchase = new Purchase();
        $purchase->offering_id = $request->id;
        $purchase->quantity = $request->quantity;
        $purchase->customer = $request->customer;
        $purchase->price = $offering->price;
        $purchase->total = $request->quantity * $offering->price;

        $purchase->save();

        return "saved";
    }

    public function get()
    {

        return Purchase::select('quantity', 'price', 'total', 'customer', 'offering_id')->with(
            array('offering' => function($query){
                $query->select('id', 'title');
            }))->get();
    }
}
