'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
mainAngularModule
    .controller(
        'TicketCreateCtrl',
        ['$scope', '$state', 'AuthFactory', 'UserDataFactory', 'TicketDataFactory', 'softwareProductDataFactory', 'ErrorStateRedirector',
            function ($scope, $state, AuthFactory, UserDataFactory, TicketDataFactory, softwareProductDataFactory, ErrorStateRedirector) {
                const ctrl = this;


                getFields();

                //prende i metadati che li servono con una get
                function getFields() {
                    TicketDataFactory.getMetadata(function (response) {
                        console.log("Metadata", response.data);
                        ctrl.TICKET_VISIBILITIES = response.data.visibilities;
                        ctrl.TICKET_CATEGORIES = response.data.categories;
                        ctrl.TICKET_CUSTOMER_PRIORITIES = response.data.priorities;
                        ctrl.TICKET_TEAM_PRIORITIES = response.data.priorities;
                        ctrl.TICKET_STATUS = response.data.statuses;
                        ctrl.softwareProducts = response.data.activeTargets;
                    }, function () {
                        alert("Invalid metadata");
                    });
                }


                function resetFieldsFn() {
                    console.log('reset ticket form');
                    //currentTicket prende il campo customer con l'id dell'utente loggato
                    ctrl.currentTicket = {
                        customer: ctrl.userInfo.userId
                    };
                    ctrl.userInfo = AuthFactory.getAuthInfo();

                }

                //questa funzione cerca di inserire i ticket, i campi lo prende dalla view.
                //se la post ha successo faccio resetFieldsFn e visualizzo un'altra pagina
                //altrimenti vado alla pagina di errore.
                function insertTicketFn() {
                    console.log('insert ticket', ctrl.currentTicket);
//ctrl.currentTicket['attachmentType'] =
                    TicketDataFactory.Insert(
                        ctrl.currentTicket,
                        function (response) {
                            console.log(response);
                            resetFieldsFn();

                            if (ctrl.userInfo.userRole === 'TEAM_MEMBER') {
                                $state.go('ticket.list', {}, {reload: 'ticket.list'});
                            } else if (ctrl.userInfo.userRole === 'CUSTOMER') {
                                $state.go('ticket.customer', {}, {reload: 'ticket.customer'});
                            }  else if (ctrl.userInfo.userRole === 'ADMIN') {
                                $state.go('ticket.list', {}, {reload: 'ticket.list'});
                            }
                        }, function (response) {
                            console.error(response);
                            ErrorStateRedirector.GoToErrorPage({Messaggio: 'Errore nell\'inserimento del ticket'});
                        });
                }

                /*
                function populateProductSoftwareListFn() {
                    console.log('populate softwareProducts list');

                    softwareProductDataFactory.GetAll(
                        function (products) {
                            ctrl.softwareProducts = products;
                        }
                    );
                }

                function populateProductSoftwareListFn() {
                    console.log('populate softwareProducts list');
                    ctrl.softwareProducts = TicketDataFactory.GetTargets();
                }

                function populateTicketCategoriesFn() {
                    alert(TicketDataFactory.GetTicketCategories());
                    ctrl.TICKET_CATEGORIES = TicketDataFactory.GetTicketCategories();
                }

                function populateTicketCustomerPrioritiesFn() {
                    ctrl.TICKET_CUSTOMER_PRIORITIES = TicketDataFactory.GetTicketCustomerPriorities();
                }
*/

                function init() {
                    ctrl.userInfo = AuthFactory.getAuthInfo();

                    resetFieldsFn();
                    //populateProductSoftwareListFn();

                    // Popola costanti per le ng-option
                    //populateTicketCategoriesFn();
                    //populateTicketCustomerPrioritiesFn();
                }


                ctrl.resetFields = resetFieldsFn;
                ctrl.insertTicket = insertTicketFn;

                init();

            }])
    // se inserisco multiple nell'html, la direttiva carica cmq solo il primo file
    //qui si parla del file allegato.
    .directive(
        'loadfile',
        [function () {
            return {
                scope: {
                    loadfile: '='
                },
                link: function (scope, element, attributes) {
                    element.bind('change', function (changeEvent) {
                        let reader = new FileReader();
                        reader.onload = function (loadEvent) {
                            scope.$apply(function () {
                                scope.loadfile = loadEvent.target.result;
                            });
                        };
                        reader.readAsDataURL(changeEvent.target.files[0]);
                    });
                }
            };
        }]
    );