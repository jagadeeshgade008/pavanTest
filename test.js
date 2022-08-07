
    $(document).ready(function () {
        $("#submit").click(function () {
            var search = $("#search").val();

            if (search != "") {
                $("#resultsContainer h3").text("Results");

                // hide insert
                $("#insert").addClass("d-none");
                $("#delete").removeClass("d-none");

                /*
                $.ajax({
                url: "/apitocall",
                method: "POST",
                data: {
                    search: search
                },
                success: function (data) {

                    
                 

                }
            });
        
            
            */


                $("#resultsContainer").removeClass("d-none");

                data = {}
                data.status = "success"
                data.message = "message"
                data.data = {
                    "id": "id",
                    "name": "name",
                    "email": "email",
                    "phone": "phone",
                    "address": "address",
                    "city": "city",
                    "state": "state",
                    "zip": "zip",
                    "country": "country",
                    "company": "company",
                    "position": "position",
                    "website": "website",
                    "linkedin": "linkedin",
                    "facebook": "facebook",
                    "twitter": "twitter",
                    "instagram": "instagram",
                    "youtube": "youtube",
                    "notes": "notes"
                }


                // prepare the object as inputs of the form with type as text

                var inputs = "";

                inputs += `<div class="col-12">`;
                // add edit button
                inputs += `
                <div class="row justify-content-end">
                    <button type='submit' class='btn btn-primary' id='edit' name='edit'>Edit</button>
                </div>
            `

                inputs += "<div class='row'>";

                for (var key in data.data) {

                    // each input is a div with class form-group and contains a label and input field with name as key and value as data[key] and with column of 6 and make input disabled
                    inputs += "<div class='form-group col-md-6'>" +
                        "<label for='" + key + "'>" + key + "</label>" +
                        "<input type='text' class='form-control' name='" +
                        key + "' value='" + data.data[key] + "' disabled>" +
                        "</div>";

                    // inputs += "<input type='text' class='form-control' name='" + key + "' value='" + data.data[
                    //     key] + "'>";
                }

                inputs += "</div>";
                inputs += "</div>";

                // add update button
                inputs +=
                    "<button type='submit' class='btn btn-primary d-none' id='update' name='update'>Update</button>";

                // append the inputs to the form
                $("#updateDetailsContainer").html(inputs);


            }else{
                alert("Please enter a search term");
            }

        });


        // add delete button  
        $("#delete").click(function () {

            $("#insert").removeClass("d-none");
            $("#delete").addClass("d-none");

            var data = {};
            $("#resultsContainer input").each(function () {
                data[$(this).attr("name")] = $(this).val();
            });
            console.log(data);

            // show alert notification in updateDetailsContainer container
            $("#updateDetailsContainer").removeClass("d-none");
            $("#updateDetailsContainer").html(`
            <div class="col-md-4">
                <div class="alert alert-danger" role="alert">
                    <b>
                        Document deleted successfully!!!
                    </b>
                </div>
            </div>

            `);

            // post data to api
            // $.ajax({
            //     url: "/apitocall",
            //     method: "POST",
            //     data: data,
            //     success: function (data) {
            //         console.log(data);
            //     }
            // });
        });


        // add insert button
        $('#insert').click(function () {
            // $("#insert").addClass("d-none");
            // $("#delete").removeClass("d-none");

            $("#resultsContainer").removeClass("d-none");
            $("#resultsContainer h3").text("Insert new document");

            data = {
                "id": "",
                "name": "",
                "email": "",
                "phone": "",
                "address": "",
                "city": "",
                "state": "",
                "zip": "",
                "country": "",
                "company": "",
                "position": "",
                "website": "",
                "linkedin": "",
                "facebook": "",
                "twitter": "",
                "instagram": "",
                "youtube": "",
                "notes": ""
            }


            // prepare the object as inputs of the form with type as text

            var inputs = "";
            for (var key in data) {

                // each input is a div with class form-group and contains a label and input field with name as key and value as data[key] and with column of 6
                inputs += "<div class='form-group col-md-6'>" +
                    "<label for='" + key + "'>" + key + "</label>" +
                    "<input type='text' class='form-control' name='" +
                    key + "' value='" + data[key] + "'>" +
                    "</div>";

                // inputs += "<input type='text' class='form-control' name='" + key + "' value='" + data.data[
                //     key] + "'>";
            }

            // add update button
            inputs +=
                "<button type='submit' class='btn btn-primary' id='insertNewDocument' name='insert'>Insert</button>";

            // append the inputs to the form
            $("#updateDetailsContainer").html(inputs);


        });


    });

    $(document).on('click', "#insertNewDocument", function (e) {

        // preapre the data to be sent to api
        var data = {};
        $("#resultsContainer input").each(function () {
            data[$(this).attr("name")] = $(this).val();
        });
        console.log(data);

        alert("Document inserted successfully");
        window.location.reload();

        // post data to api
        $.ajax({
            url: "/apitocall",
            method: "POST",
            data: data,
            success: function (data) {
                console.log(data);
            }
        });

    })

    $(document).on("click", "#edit", function (e) {
        // $("#insert").addClass("d-none");
        // $("#delete").removeClass("d-none");

        // enable all the inputs
        $("#resultsContainer input").each(function () {
            $(this).removeAttr("disabled");
        });

        // show update button
        $("#update").removeClass("d-none");

    });

    $(document).on("click", "#update", function (e) {
        var data = {};
        $("#resultsContainer input").each(function () {
            data[$(this).attr("name")] = $(this).val();
        });
        console.log(data);

        alert("Document updated successfully");

        // post data to api
        $.ajax({
            url: "/apitocall",
            method: "POST",
            data: data,
            success: function (data) {
                console.log(data);
            }
        });

    });


    $(document).ready(function() {

        $("#search").autocomplete({

            source:function(request, response) {

                $.ajax({

                    type:"GET",

                    url:"https://localhost:44342/States/Search",

                    data: { query: $("#search").val() },

                    dataType:"json",

                    contentType:"application/json; charset=utf-8",

                    success:function(data) {
                        console.log(data)
                        response(data);

                    },

                    error:function(data) {

                        alert("error found");

                    }

                });

            }

        });

    });