/**
 * Created by user on 11.04.17.
 */

var products;

$(document).ready(function(){

    $("#getOfferings").click(function(event){

        $.ajax({
            url: "/offering/get",
            success: function(data){
                var tbl_body = "";
                var odd_even = false;

                products = data;

                var tbl_hdr = "<tr>";
                $.each(data[0], function(k , v) {
                    tbl_hdr += "<th>"+k+"</th>";
                });

                tbl_hdr += "</tr>";

                $.each(data, function() {
                    var tbl_row = "";
                    $.each(this, function(k , v) {
                        tbl_row += "<td>"+v+"</td>";
                    })

                    tbl_row += "<td><a href='#' onclick='makePurchase("+this.id+")'>Add Purchase</a>";
                    tbl_body += "<tr class=\""+( odd_even ? "odd" : "even")+"\">"+tbl_row+"</tr>";
                    odd_even = !odd_even;
                });
                $("#pageContent").html("<table class='contentTable'>" + tbl_hdr + tbl_body + "</table>");
            }
        });

    });

    $("#showPurchases").click(function(event){

        $.ajax({
            url: "/purchase/get",
            success: function(data){
                var tbl_body = "";
                var odd_even = false;

                var tbl_hdr = "<tr>";
                $.each(data[0], function(k , v) {
                    if(k == "offering_id") return;
                    if(k == "offering") {
                        tbl_hdr += "<th>Offering Title</th>";
                        return;
                    }
                    tbl_hdr += "<th>"+k+"</th>";
                });

                tbl_hdr += "</tr>";

                $.each(data, function() {
                    var tbl_row = "";

                    $.each(this, function(k , v) {
                        if(k == "offering_id") return;
                        if(k == "offering") {
                            tbl_row += "<td>"+v.title+"</td>";
                            return;
                        }
                        tbl_row += "<td>"+v+"</td>";
                    })


                    tbl_body += "<tr class=\""+( odd_even ? "odd" : "even")+"\">"+tbl_row+"</tr>";
                    odd_even = !odd_even;
                });
                $("#pageContent").html("<table class='contentTable'>" + tbl_hdr + tbl_body + "</table>");
            }
        });

    });

    $("#addPurchase").click(function() {

        var data = {};

        data.id = $("#purchaseId").val();
        data.quantity = $("#purchaseQty").val();
        data.customer = $("#purchaseCustomer").val();



        console.log(data);

        $.ajax({
            url: "/purchase/save",
            type: "POST",
            headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
            data: data,
            success: function (response) {
                $("#purchaseMessage").html(response).toggle().fadeOut('slow');


                $("#purchaseForm").toggle();
                //todo add success message
            }
        });

    });

});

function makePurchase(productId) {
    $("#purchasePrice").val("");
    $("#purchaseQty").val("");
    $("#purchaseId").val("");
    $("#purchaseCustomer").val("");

    for(p in products) {
        console.log(products[p].id);
        if(products[p].id == productId) {
            $("#purchasePrice").val(products[p].price);
            $("#purchaseId").val(products[p].id);
        }
    }

    $("#purchaseForm").toggle();
}

function calcTotal() {


    $("#purchaseTotal").val(

        $("#purchasePrice").val() *
        $("#purchaseQty").val()

    );

}
