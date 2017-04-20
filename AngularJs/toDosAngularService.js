 (function () {
     "use strict";

     angular.module(APPNAME)
                .factory('toDosService', ToDosServiceFactory);

     ToDosServiceFactory.$inject = ['$baseService', '$retgrid'];    //  $retgrid is a reference to retgrid.page object which is created in retgrid.js

     function ToDosServiceFactory($baseService, $retgrid) {

         var aRetgridServiceObject = retgrid.services.toDos;

         var newService = $baseService.merge(true, {}, aRetgridServiceObject, $baseService);

         console.log("toDosService", aRetgridServiceObject);

         return newService;
     }

 })();
