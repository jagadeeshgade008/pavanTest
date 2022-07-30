$(document).ready(function () {
    $("#submit").click(function () {
        var search = $("#search").val();
        $.ajax({
            url: "/apitocall",
            method: "POST",
            data: {
                search: search
            },
            success: function (data) {

                /*
                    data is object with the following properties:
                    data.status = "success" or "error"
                    data.message = "message"
                    data.data = {
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
                */

                // prepare the object as inputs of the form with type as text

                var inputs = "";
                for (var key in data.data) {

                    // each input is a div with class form-group and contains a label and input field with name as key and value as data[key] and with column of 6
                    inputs += "<div class='form-group col-md-6'>" +
                        "<label for='" + key + "'>" + key + "</label>" +
                        "<input type='text' class='form-control' name='" +
                        key + "' value='" + data.data[key] + "'>" +
                        "</div>";

                    // inputs += "<input type='text' class='form-control' name='" + key + "' value='" + data.data[
                    //     key] + "'>";
                }

                // add update button
                inputs +=
                    "<button type='submit' class='btn btn-primary' id='update' name='update'>Update</button>";

                // append the inputs to the form
                $("#updateDetailsContainer").append(inputs);

                $("#update").click(function () {
                    var data = {};
                    $("input").each(function () {
                        data[$(this).attr("name")] = $(this).val();
                    });
                    console.log(data);

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

            }
        });
    });
});


// For testing purposes uncomment the following lines
/*
    $(document).ready(function () {
    data = {}
    data.status = "success"
    data.message = "message"
    data.data = {
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
    for (var key in data.data) {

        // each input is a div with class form-group and contains a label and input field with name as key and value as data[key] and with column of 6
        inputs += "<div class='form-group col-md-6'>" +
            "<label for='" + key + "'>" + key + "</label>" +
            "<input type='text' class='form-control' name='" +
            key + "' value='" + data.data[key] + "'>" +
            "</div>";

        // inputs += "<input type='text' class='form-control' name='" + key + "' value='" + data.data[
        //     key] + "'>";
    }

    // add update button
    inputs += "<button type='submit' class='btn btn-primary' id='update' name='update'>Update</button>";

    // append the inputs to the form
    $("#updateDetailsContainer").append(inputs);

    $("#update").click(function () {
        var data = {};
        $("input").each(function () {
            data[$(this).attr("name")] = $(this).val();
        });
        console.log(data);

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
});
*/
