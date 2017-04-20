(function () {
    "use strict";

    angular.module(APPNAME)
        .controller('toDosController', ToDosController);

    ToDosController.$inject = ['$scope', '$baseController', 'toDosService', '$sabio', 'caseService', 'casePropertyService', 'orderByFilter'];

    function ToDosController($scope, $baseController, toDosService, $sabio, caseService, casePropertyService, orderByFilter) {

        var vm = this;
        $baseController.merge(vm, $baseController);
        vm.$scope = $scope;
        vm.toDosService = toDosService;
        vm.caseService = caseService;
        vm.casePropertyService = casePropertyService;
        vm.notify = vm.toDosService.getNotifier($scope);

        // Get current user id from BaseViewModel
        vm.currentUserId = $sabio.model.currentUserId;

        vm.fromDate = null;
        vm.toDate = null;
     

        vm.onAgentDashboard = 0;
        vm.agentPinnedPanel = 0;
        vm.caseId = null;
        vm.listingId = null;
        vm.items = [];

        vm.selectedItem = null;
        vm.edit = _edit;
        vm.save = _save;
        vm.cancel = _cancel;
        vm.delete = _delete;
        vm.create = _create;
        vm.submitForm = _submitForm;
        vm.search = _search;
        vm.cases = [];
        vm.listings = [];
        vm.priority = [];
        vm.toDosStatusName = [];
        vm.getListingsByCaseId = _getListingsByCaseId;
        vm.selectedCaseId = 0;
        vm.toDosId = 0;
    
        vm.markAsComplete = _markAsComplete;
        vm.markAsInComplete = _markAsInComplete;


        vm.reverse = true;
        vm.items = orderByFilter(vm.items, vm.propertyTitle, vm.reverse);
        vm.sortBy = _sortBy;

       

        vm.pinToDashboard = _pinToDashboard;
     
        render();

        //GETALL
        function render() {
            if (vm.$scope.$parent 
                && vm.$scope.$parent.caseId) {
                // parent scope restricts caseId, if it defines caseId
                vm.caseId = vm.$scope.$parent.caseId;
            }
            else if ($sabio.model.currentUser && $sabio.model.currentUser.primaryCase) {
                // otherwise, BaseViewModel restricts caseId,
                vm.caseId = $sabio.model.currentUser.primaryCase;
            }

            if (vm.$scope.$parent && vm.$scope.$parent
            && vm.$scope.$parent.listingId) {
                // parent scope restricts listingId, if it defines listingId
                vm.listingId = vm.$scope.$parent.listingId;
            }
            if (vm.$sabio.model.item && vm.$sabio.model.item.id) {
                vm.toDosId = vm.$sabio.model.item.id;
                vm.toDosService.getToDosById(vm.toDosId, _onGetByIdSuccess, _onGetByIdError);
            }
            else {
                vm.caseService.selectByPersonId(vm.currentUserId, _onGetCasesSuccess, _onGetCasesError);
            }

            

            // check if on agent dashboard
            _checkIfOnAgentDashboard();
        }

        //Get Listings
        function _getListingsByCaseId(caseId) {
            //make ajax call to sabio.services.caseproperty.getlistings
            vm.casePropertyService.getListings(caseId, _onGetListingsSuccess, _onGetListingsError); 

        }

        function _onGetListingsSuccess(data) {
            vm.notify(function () {
                vm.listings = data.items;
            });
        }
        function _onGetListingsError(jqXHR) {
            console.log(jqXHR.responseText);
        };





        //SEARCH
        function _search() {
            var searchParameters = "currentUserId=" + vm.currentUserId;
            if (vm.caseId) {
                searchParameters = searchParameters + "&caseId=" + vm.caseId;
            }
            if (vm.listingId) {
                searchParameters = searchParameters + "&listingId=" + vm.listingId;
            }
            if (vm.priority) {
                searchParameters = searchParameters + "&priority=" + vm.priority;
            }
            if (vm.toDosStatusName) {
                searchParameters = searchParameters + "&toDosStatusName=" + vm.toDosStatusName;
            }
            if (vm.fromDate) {
                var fD = Date(vm.fromDate);
                var d = vm.fromDate.toISOString();
                searchParameters = searchParameters + "&fromDate=" + d;
            }
            if (vm.toDate) {
                var tD = Date(vm.toDate);
                var dt = vm.toDate.toISOString();
                searchParameters = searchParameters + "&toDate=" + dt;
            }
            vm.toDosService.search(searchParameters, _onSearchSuccess, _onSearchError);
        };

        function _onSearchSuccess(data) {
            vm.notify(function () {
                if (data.items) {
                    vm.items = data.items;
                    console.log(vm.items)
                }
                else {
                    vm.items = null;
                }
            });
        }

        function _onSearchError(jqXHR) {
            vm.$alertService.error(jqXHR.responseText, "Error searching for To Dos");
        }

        //Get Cases Success and Error
        function _onGetCasesSuccess(data) {
            vm.notify(function () {
                if (data.items) {
                    vm.cases = data.items;
                }
                else {
                    vm.cases = null;
                }
            });
        }

        function _onGetCasesError(jqXHR) {
            vm.$alertService.error(jqXHR.responseText, "Error getting cases");
        }


        //EDIT
        function _edit(item) {
           
                vm.toDosService.getToDosById(item.id, _onGetByIdSuccess, _onGetByIdError)
           
        }
        function _onGetByIdSuccess(data) {
            vm.notify(function () {
                vm.selectedItem = data.item;
                
            });
        }
        function _onGetByIdError(jqXHR) {
            console.log(jqXHR.responseText);
        }

       


        //SAVE
        function _save() {
            //edit
            //added the line below to make peopleId equal to the person object
            //need the line to add a new add to.
            //vm.selectedItem.peopleId = vm.selectedItem.personId;
            if (vm.selectedItem.personId) {
                vm.selectedItem.peopleId = vm.selectedItem.personId;
            } else if (vm.selectedItem.person && vm.selectedItem.person.id) {
                vm.selectedItem.peopleId = vm.selectedItem.person.id;
                 
            }
           

            if (vm.selectedItem && vm.selectedItem.id) {
                vm.toDosService.put(vm.selectedItem, _onPutSuccess, _onPutError);
            } else {
                //create
                vm.toDosService.insert(vm.selectedItem, _onInsertSuccess, _onInsertError);
            }
        }
        function _onPutSuccess(data) {
            vm.notify(function () {
                vm.selectedItem = null;
                vm.search();
                vm.$alertService.info("Changes saved");
            });
        }

        function _onPutError(jqXHR) {
            vm.$alertService.error(jqXHR.responseText, "Error saving changes to To Do");
        }

        // CREATE TO MAKE THE TO DOS BUTTON WORK
        function _create() {
            // default new To Do to currentUserId, caseId, listingId
            vm.selectedItem = {
                personId: vm.currentUserId,
                caseId: vm.caseId,
                listingId: vm.listingId,
                statusId: 1
            };
        }

        //INSERT NEW TO DOS IN THE FORM
        function _insert() {
            vm.toDosService.insert(vm.selectedItem, _onInsertSuccess, _onInsertError);
        };

        function _onInsertSuccess(data) {
            console.log(data);
            vm.notify(function () {
                vm.selectedItem = null;
                vm.$alertService.info("To Do recorded");
                vm.search();
            });
        }
        function _onInsertError(jqXHR) {
            vm.$alertService.error(jqXHR.responseText, "Error inserting To Do");
        }

        //DELETE
        function _delete(item) {
            vm.toDosService.delete(item.id, _onDeleteSuccess, _onDeleteError)
        }

        function _onDeleteSuccess(data) {
            vm.notify(function () {
                vm.$alertService.info("To Do deleted");
                vm.search()
                vm.selectedItem = null;
            });
        };

        function _onDeleteError(jqXHR) {
            vm.$alertService.error(jqXHR.responseText, "Error deleting To Do");
        }


        //FORM VALIDATION
        function _submitForm(isValid) {
            if (isValid) {
                console.log("data is valid! go save this object -> ");
                vm.save();
            } else {
                console.log("form submitted with invalid data :(")
            }
        }

        function _cancel() {
            vm.selectedItem = null;
        }


        //EDIT on the ToDos Panel
        //function _edit(item) {
        //    //item.peopleId = item.person.id;
        //    window.location = "/ToDos/" + item.person.id + "/Edit";
        //}


        //Mark as Complete
        
        function _markAsComplete(item) {
            
            item.statusId = 3;
            item.peopleId = item.person.id;
            vm.toDosService.put(item, _onPutSuccess, _onPutError);
           
        };

        //Mark as InComplete
        function _markAsInComplete(item) {
            item.statusId = 1;
            item.peopleId = item.person.id
            vm.toDosService.put(item, _onPutSuccess, _onPutError)

        }

        //OrderBy
        function _sortBy(propertyTitle) {
            vm.reverse = (propertyTitle !== null && vm.propertyTitle === propertyTitle)
                ? !vm.reverse : false;
            vm.propertyTitle = propertyTitle;
            vm.items = orderByFilter(vm.items, vm.propertyTitle, vm.reverse);
        };


        //UI PINNING
        function _checkIfOnAgentDashboard() {
            vm.onAgentDashboard = 0;
            var pathParts = vm.$document[0].location.pathname.split('/');
            if ((pathParts.length == 4) && (pathParts[1].toLowerCase() == 'agents') && (pathParts[3].toLowerCase() == 'dashboard')) {
                    vm.onAgentDashboard = 1;
            }
        }

        function _pinToDashboard() {
            vm.agentPinnedPanel = 1;
        }

    }

})();


