retgrid.services.expenseTypes = retgrid.services.expenseTypes || {};

retgrid.services.expenseTypes.authenticateUser = function (data, onSuccess, onError) {

    var url = "/api/users/login";

    var settings = {
        cache: false
        , data: data
        , contentType: "application/x-www-form-urlencoded; charset=UTF-8"
        , dataType: "json"
        , success: onSuccess
        , error: onError
        , type: "POST"
    };

    $.ajax(url, settings);
}

retgrid.services.expenseTypes.insert = function (data, onSuccess, onError) {
    var url = "/api/ExpenseTypes";
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
}

retgrid.services.expenseTypes.getExpenseTypes = function (onSuccess, onError) {

    var url = "/api/ExpenseTypes/";
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

retgrid.services.expenseTypes.getExpenseTypesById = function (id, onSuccess, onError) {

    var url = "/api/ExpenseTypes/" + id;

    var settings = {
        cache: false
    , contentType: "application/json"
    , dataType: "json"
    , success: onSuccess
    , error: onError
    , type: "GET"
    };
