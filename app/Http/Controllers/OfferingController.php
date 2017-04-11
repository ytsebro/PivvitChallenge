<?php

namespace App\Http\Controllers;

use App\Offering;
use Illuminate\Http\Request;

class OfferingController extends Controller
{
    public function get()
    {
        return Offering::all();
    }
}
