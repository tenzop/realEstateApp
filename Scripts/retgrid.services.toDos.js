retgrid.services.toDos = retgrid.services.toDos || {};

retgrid.services.toDos.insert = function (data, onSuccess, onError) {
    var url = "/api/ToDos";
    var settings = {
        cache: false,
        type: "post",
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        dataType: "json",
        success: onSuccess,
        error: onError,
        data: data
    };
    $.ajax(url, settings);
};


retgrid.services.toDos.update = function (id, data, onSuccess, onError) {
    var url = "/api/ToDos/" + id + "/Edit";
    var settings = {
        cache: false
        , data: data
        , contentType: "application/x-www-form-urlencoded; charset=UTF-8"
        , dataType: "json"
        , success: onSuccess
        , error: onError
        , type: "PUT"
    };

    $.ajax(url, settings);
}


retgrid.services.toDos.getToDos = function (onSuccess, onError) {

    var url = "/api/ToDos/";
    var settings = {
        cache: false
    , contentType: "application/json"
    , dataType: "json"
    , success: onSuccess
    , error: onError
    , type: "GET"
    };

    $.ajax(url, settings);

}

retgrid.services.toDos.getToDosById = function (id, onSuccess, onError) {

    var url = "/api/ToDos/" + id;
    var settings = {
        cache: false
    , contentType: "application/json"
    , dataType: "json"
    , success: onSuccess
    , error: onError
    , type: "GET"
    };

    $.ajax(url, settings);

}

retgrid.services.toDos.getToDosByCaseId = function (id, onSuccess, onError) {

    var url = "/api/cases/" + id + "/todos/";
    var settings = {
        cache: false
    , contentType: "application/json"
    , dataType: "json"
    , success: onSuccess
    , error: onError
    , type: "GET"
    };

    $.ajax(url, settings);

}

retgrid.services.toDos.search = function (queryParameters, onSuccess, onError) {

    var url = "/api/toDos/search?" + queryParameters;
    var settings = {
        cache: false
    , contentType: "application/json"
    , dataType: "json"
    , success: onSuccess
    , error: onError
    , type: "GET"
    };

    $.ajax(url, settings);

}




retgrid.services.toDos.delete = function (id, onSuccess, onError) {


    var url = "/api/ToDos/" + id;
    var settings = {
        cache: false
    , contentType: "application/x-www-form-urlencoded; charset=UTF-8"
    , dataType: "json"
    , success: onSuccess
    , error: onError
    , type: "DELETE"
    };

    $.ajax(url, settings);

}

retgrid.services.toDos.put = function (toDos, successFunction, failureFunction) {
    event.preventDefault();
    var url = "/api/ToDos/Edit";
    console.log("Updating");

    var settings = {
        cache: false
        , contentType: "application/json; charset=utf-8"
        , data: JSON.stringify(toDos)
        , dataType: "json"
        , success: successFunction
        , error: failureFunction
        , type: "PUT"
    };
    $.ajax(url, settings);
}

