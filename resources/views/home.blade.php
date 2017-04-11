@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-default">
                <div class="panel-heading">Dashboard</div>

                <div id="purchaseMessage" style="display: none;"></div>

                <div class="panel-body">
                    <div id="pageContent"></div>
                </div>

                <div id="purchaseForm" style="display: none;">
                    <input id="purchaseId" type="hidden" name="productId" value="0">
                    <label>Customer Name:</label>
                    <input id="purchaseCustomer" type="text" name="customer"><br>
                    <lable>Quantity:</lable>
                    <input id="purchaseQty" type="number" name="quantity" onchange="calcTotal()"><br>

                    <label>Price</label>
                    <input id="purchasePrice" type="text" disabled name="price"><br>
                    <label>Total</label>
                    <input id="purchaseTotal" type="text" disabled name="total"><br>
                    <input type="submit" id="addPurchase">
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
