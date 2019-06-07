'use strict';
mainAngularModule.controller('backlogItemEditDialogController', ['$scope', '$mdDialog', 'selectedBacklogItem',
    'BacklogItemService', 'ToasterNotifierHandler', '$state', 'productId',
    function($scope, $mdDialog, selectedBacklogItem, BacklogItemService, ToasterNotifierHandler, $state, productId) {

        $scope.backlogItemPriorityClasses = ['LOW', 'MEDIUM', 'HIGH'];
        $scope.backlogItem = angular.copy(selectedBacklogItem);
        console.log($scope.backlogItem);

        $scope.closeDialog = function() {
            $mdDialog.cancel();
        };

        $scope.insertBacklogItemToSprintBacklog = function () {
            BacklogItemService.insertBacklogItemToSprintBacklogService(productId, $scope.backlogItem)
                .then(function successCallback(response) {
                    ToasterNotifierHandler.handleCreation(response);
                    $mdDialog.hide();
                    $state.go('backlog_management.view');

                }, function errorCallback(response){
                    if (response.status === 422){
                        ToasterNotifierHandler.showErrorToast("Prima di inserire un item nello Spint Backlog è necessario avviare lo sprint.");
                    } else {
                        ToasterNotifierHandler.handleError(response);
                    }
                });
        };

    }]);