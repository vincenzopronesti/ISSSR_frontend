'use strict';
/**
 * @ngdoc overview
 * @name sbAdminApp
 * @description
 * # sbAdminApp
 *
 * Main module of the application.
 */

mainAngularModule
    .factory('PlanningDataFactory', ['$http', 'BACKEND_BASE_URL', 'USER_ENDPOINT_URL', 'ToasterNotifierHandler', '$state',
        function ($http, BACKEND_BASE_URL, USER_ENDPOINT_URL, ToasterNotifierHandler, $state) {
            let thisCrudService = {};
            //thisCrudService.user = {};
            //let _endPointJSON = BACKEND_BASE_URL + USER_ENDPOINT_URL;


            thisCrudService.getTicketsForRel = getTicketsForRel;
            thisCrudService.newRelation = newRelation;
            thisCrudService.escalation = escalation;
            thisCrudService.getAllRel = getAllRel;
            thisCrudService.getTicketForDep = getTicketForDep;
            thisCrudService.getTicketForReg = getTicketForReg;
            thisCrudService.getTicketForEqual = getTicketForEqual;
            thisCrudService.putRelationEqual = putRelationEqual;
            thisCrudService.putRelationDep = putRelationDep;
            thisCrudService.putRelationRegression = putRelationRegression;
            thisCrudService.putRelationCustom = putRelationCustom;
            thisCrudService.getQueue = getQueue;
            thisCrudService.getRelationTicket = getRelationTicket;
            thisCrudService.getRelationCustomTicket = getRelationCustomTicket;
            thisCrudService.getTicketGantt = getTicketGantt;
            thisCrudService.getPlanning =getPlanning;
            thisCrudService.getFatherTicket = getFatherTicket;
            thisCrudService.getTickets = getTickets;
            thisCrudService.getDetailsTicket = getDetailsTicket;
            thisCrudService.getTeamsByTeamMember = getTeamsByTeamMember;
            thisCrudService.getEquivalentTickets = getEquivalentTickets;


            // delete the data from database
            function getTicketsForRel(params, successCB, errorCB) {

                $http({
                    method: 'GET',
                    url: BACKEND_BASE_URL + '/tickets/findTicketForCreateEquality',
                    params: params
                })
                    .then(function (response) {
                            if (successCB) {
                                successCB(response);
                            }
                            //return response.data;
                        },
                        function (response) {
                            if (errorCB) {
                                errorCB(response);
                            }
                            console.error(response.data);
                            ToasterNotifierHandler.showErrorToast("Error in get tickets for relation");
                        });
            }





            function getFatherTicket(data, id, successCB, errorCB) {

                $http({
                    method: 'GET',
                    url: BACKEND_BASE_URL + '/tickets/findFatherTicket/' + id,
                    params: data
                })
                    .then(function (response) {
                            if (successCB) {
                                successCB(response);
                            }
                            //return response.data;
                        },
                        function (response) {
                            if (errorCB) {
                                errorCB(response);
                            }
                            console.error(response.data);
                            ToasterNotifierHandler.handleError(response);
                        });
            }


            function getPlanning(data,teamName,date,durat,idtick, successCB, errorCB) {

                $http({
                    method: 'POST',
                    url: BACKEND_BASE_URL + '/gantt/createGanttInstance/' + teamName + '/'+ date +'/'+ durat +'/'+idtick,
                    data: data
                })
                    .then(function (response) {
                            if (successCB) {
                                successCB(response);
                            }
                            //return response.data;
                        },
                        function (response) {
                            if (errorCB) {
                                errorCB(response);
                            }
                            console.error(response.data);
                            ToasterNotifierHandler.handleError(response);
                        });
            }


            // delete the data from database
            function getTicketGantt(data, team, successCB, errorCB) {

                $http({
                    method: 'GET',
                    url: BACKEND_BASE_URL + '/tickets/findTicketForGantt/' + team,
                    params: data
                })
                    .then(function (response) {
                            if (successCB) {
                                successCB(response);
                            }
                            //return response.data;
                        },
                        function (response) {
                            if (errorCB) {
                                errorCB(response);
                            }
                            console.error(response.data);
                            ToasterNotifierHandler.handleError(response);
                        });
            }


            // delete the data from database
            function getRelationCustomTicket(data,ticketId, successCB, errorCB) {

                $http({
                    method: 'GET',
                    url: BACKEND_BASE_URL + '/relationInstance/findRelations/' + ticketId,
                    params: data
                })
                    .then(function (response) {
                            if (successCB) {
                                successCB(response);
                            }
                            //return response.data;
                        },
                        function (response) {
                            if (errorCB) {
                                errorCB(response);
                            }
                            console.error(response.data);
                            ToasterNotifierHandler.handleError(response);
                        });
            }


            // delete the data from database
            function getRelationTicket(data, successCB, errorCB) {

                $http({
                    method: 'GET',
                    url: BACKEND_BASE_URL + '/relation',
                    params: data
                })
                    .then(function (response) {
                            if (successCB) {
                                successCB(response);
                            }
                            //return response.data;
                        },
                        function (response) {
                            if (errorCB) {
                                errorCB(response);
                            }
                            console.error(response.data);
                            ToasterNotifierHandler.handleError(response);
                        });
            }

            //_______________________________________TOMMASO___________
            function getEquivalentTickets(data, ticketId, successCB, errorCB) {

                $http({
                    method: 'GET',
                    url: BACKEND_BASE_URL + '/tickets/relation/equivalence/' + ticketId,
                    params: data
                })
                    .then(function (response) {
                            if (successCB) {
                                successCB(response);
                            }
                            //return response.data;
                        },
                        function (response) {
                            if (errorCB) {
                                errorCB(response);
                            }
                            console.error(response.data);
                            ToasterNotifierHandler.handleError(response);
                        });
            }
            //_________________________________________________________


            // delete the data from database
            function getQueue(params, successCB, errorCB) {

                $http({
                    method: 'GET',
                    url: BACKEND_BASE_URL + '/tickets/findTicketInQueue',
                    params: params
                })
                    .then(function (response) {
                            if (successCB) {
                                successCB(response);
                            }
                            //return response.data;
                        },
                        function (response) {
                            if (errorCB) {
                                errorCB(response);
                            }
                            console.error(response.data);
                            //ToasterNotifierHandler.handleError(response);
                            ToasterNotifierHandler.showErrorToast("Error in getting pending ticket");
                        });
            }



            function putRelationCustom(data, successCB, errorCB) {

                $http({
                    method: 'POST',
                    url: BACKEND_BASE_URL + '/relationInstance/' + data.relation.name + '/' + data.fatherTicket.id + '/' + data.sonTicket.id,
                    data: data
                })
                    .then(function (response) {
                            if (successCB) {
                                successCB(response);
                            }
                            if (response.status === 201) {
                                ToasterNotifierHandler.showSuccessToast("Operation success", "Relation correctly created!");
                                $state.go('ticket.list', {}, {reload: 'ticket.list'});
                            } else if (response.status === 208) {
                                ToasterNotifierHandler.showSuccessToast("Operation success", "Relation already exist!");
                                $state.go('ticket.list', {}, {reload: 'ticket.list'});
                            }

                            //return response.data;
                        },
                        function (response) {
                            if (errorCB) {
                                errorCB(response);
                            }
                            console.error(response.data);
                            console.log(response);
                            //ToasterNotifierHandler.handleError(response);
                            if (response.status === 424) {
                                if (response.data.length === 0) {
                                    ToasterNotifierHandler.showErrorToast("Reflective relation is forbidden");
                                    $state.go('ticket.list', {}, {reload: 'ticket.list'});
                                } else {
                                    var cicle = "" + response.data[0].id;
                                    for (var i = 1; i < response.data.length; i++) {
                                        cicle += ", " + response.data[i].id;
                                    }
                                    ToasterNotifierHandler.showErrorToast("Creation failed due to this cycle: " + cicle);
                                }
                            }
                        });
            }


            // delete the data from database
            function putRelationRegression(data,choose,idChoose, successCB, errorCB) {

                $http({
                    method: 'POST',
                    url: BACKEND_BASE_URL + '/tickets/addRegression/' + choose + '/' + idChoose,
                    data: data
                })
                    .then(function (response) {
                            if (successCB) {
                                successCB(response);
                            }
                            ToasterNotifierHandler.showSuccessToast("Operazione completata", "Relazione creata correttamente");
                            $state.go('ticket.list', {}, {reload: 'ticket.list'});
                            //return response.data;
                        },
                        function (response) {
                            if (errorCB) {
                                errorCB(response);
                            }
                            console.error(response.data);
                            //ToasterNotifierHandler.handleError(response);
                            if (response.status === 424) {
                                ToasterNotifierHandler.showErrorToast("Relazione riflessiva non ammessa");
                            }
                        });
            }




            // delete the data from database
            function putRelationDep(data,choose,idChoose, successCB, errorCB) {

                $http({
                    method: 'POST',
                    url: BACKEND_BASE_URL + '/tickets/addDependentTicket/'+ idChoose + '/' + choose,
                    data: data
                })
                    .then(function (response) {
                            if (successCB) {
                                successCB(response);
                            }
                            ToasterNotifierHandler.showSuccessToast("Operazione completata", "Relazione creata correttamente");
                            $state.go('ticket.list', {}, {reload: 'ticket.list'});
                            //return response.data;
                        },
                        function (response) {
                            if (errorCB) {
                                errorCB(response);
                            }
                            console.error(response.data);
                            //ToasterNotifierHandler.handleError(response);
                            if (response.status === 424) {
                                ToasterNotifierHandler.showErrorToast("Operazione non permessa. " +
                                    "La relazione che stai provando a creare introduce un ciclo di dipendenze tra ticket.")
                            }
                        });
            }


            // delete the data from database
            function putRelationEqual(data,choose, successCB, errorCB) {

                $http({
                    method: 'PUT',
                    url: BACKEND_BASE_URL + '/tickets/addEqualityTicket/'+ choose + '/' + data.sameTicket.id,
                    data: data
                })
                    .then(function (response) {
                            if (successCB) {
                                successCB(response);
                            }
                            ToasterNotifierHandler.showSuccessToast("Operazione completata", "Relazione creata correttamente");
                            $state.go('ticket.list', {}, {reload: 'ticket.list'});
                            //return response.data;
                        },
                        function (response) {
                            if (errorCB) {
                                errorCB(response);
                            }
                            console.error(response.data);
                            //ToasterNotifierHandler.handleError(response);

                            if (response.status === 424) {
                                if (response.data.ticketStatus === 'BAD_REQUEST') {
                                    ToasterNotifierHandler.showSuccessToast("Nota!", "Relazione riflessiva");
                                } else if (response.data.ticketStatus === 'FAILED_DEPENDENCY') {
                                    ToasterNotifierHandler.showErrorToast('La relazione richiesta introdurrebbe un ciclo di dipendenze tra ticket');
                                } else if (response.data.ticketStatus === 'BLOCKING_DEPENDENCY') {
                                    ToasterNotifierHandler.showErrorToast('Il ticket dipende da un altro che ancora non è stato risolto');
                                }
                            } else {
                                ToasterNotifierHandler.showErrorToast("Errore nella creazione della relazione");
                            }
                        });
            }


            // delete the data from database
            function getTicketForEqual(params, successCB, errorCB) {

                $http({
                    method: 'GET',
                    url: BACKEND_BASE_URL + '/tickets/findTicketForCreateEquality',
                    params: params
                })
                    .then(function (response) {
                            if (successCB) {
                                successCB(response);
                            }
                            //return response.data;
                        },
                        function (response) {
                            if (errorCB) {
                                errorCB(response);
                            }
                            console.error(response.data);
                            //ToasterNotifierHandler.handleError(response);
                            ToasterNotifierHandler.showErrorToast("Error in getting tickets");
                        });
            }


            // delete the data from database
            function getTicketForReg(params, successCB, errorCB) {

                $http({
                    method: 'GET',
                    url: BACKEND_BASE_URL + '/tickets/findTicketForCreateRegression',
                    params: params
                })
                    .then(function (response) {
                            if (successCB) {
                                successCB(response);
                            }
                            //return response.data;
                        },
                        function (response) {
                            if (errorCB) {
                                errorCB(response);
                            }
                            console.error(response.data);
                            //ToasterNotifierHandler.handleError(response);
                            ToasterNotifierHandler.showErrorToast("Error in getting tickets");
                        });
            }

            // delete the data from database
            function getTicketForDep(params, successCB, errorCB) {

                $http({
                    method: 'GET',
                    url: BACKEND_BASE_URL + '/tickets/findTicketForCreateDependency',
                    params: params
                })
                    .then(function (response) {
                            if (successCB) {
                                successCB(response);
                            }
                            //return response.data;
                        },
                        function (response) {
                            if (errorCB) {
                                errorCB(response);
                            }
                            console.error(response.data);
                            //ToasterNotifierHandler.handleError(response);
                            ToasterNotifierHandler.showErrorToast("Error in getting tickets");
                        });
            }


            // delete the data from database
            function getAllRel(params, successCB, errorCB) {

                $http({
                    method: 'GET',
                    url: BACKEND_BASE_URL + '/relation',
                    params: params
                })
                    .then(function (response) {
                            if (successCB) {
                                successCB(response);
                            }
                            //return response.data;
                        },
                        function (response) {
                            if (errorCB) {
                                errorCB(response);
                            }
                            console.error(response.data);
                            //ToasterNotifierHandler.handleError(response);
                            ToasterNotifierHandler.showErrorToast("Error in getting relations");
                        });
            }


            // delete the data from database
            function escalation(data, successCB, errorCB) {

                $http({
                    method: 'POST',
                    url: BACKEND_BASE_URL + '/escalation',
                    data: data
                })
                    .then(function (response) {
                            if (successCB) {
                                successCB(response);
                            }
                            //return response.data;
                        },
                        function (response) {
                            if (errorCB) {
                                errorCB(response);
                            }
                            console.error(response.data);
                            ToasterNotifierHandler.handleError(response);
                        });
            }


            // delete the data from database
            function newRelation(data, successCB, errorCB) {

                $http({
                    method: 'POST',
                    url: BACKEND_BASE_URL + '/relation/'+ data.name,
                    data: data
                })
                    .then(function (response) {
                            if (successCB) {
                                successCB(response);
                            }
                            //return response.data;
                        },
                        function (response) {
                            if (errorCB) {
                                errorCB(response);
                            }
                            console.error(response.data);
                            ToasterNotifierHandler.handleError(response);
                        });
            }

            function getTickets(params, successCB, errorCB) {

                $http({
                    method: 'GET',
                    url: BACKEND_BASE_URL + '/tickets',
                    params: params
                })
                    .then(function (response) {
                            if (successCB) {
                                successCB(response);
                            }
                            //return response.data;
                        },
                        function (response) {
                            if (errorCB) {
                                errorCB(response);
                            }
                            console.error(response.data);
                            ToasterNotifierHandler.handleError(response);
                        });
            }


            function getDetailsTicket(data,idTicket, successCB, errorCB) {
                $http({
                    method: "GET",
                    url: BACKEND_BASE_URL + '/tickets/' + idTicket,
                    params: data
                })
                    .then(function (response) {
                            if (successCB) {
                                successCB(response);
                            }
                            //return response.data;
                        },
                        function (response) {
                            if (errorCB) {
                                errorCB(response);
                            }
                            console.error(response.data);
                            //ToasterNotifierHandler.handleError(response);
                            ToasterNotifierHandler.showErrorToast("Error in get tickets");
                        });
            }



            function getTeamsByTeamMember(username, successCB, errorCB) {
                $http({
                    method: "GET",
                    url: BACKEND_BASE_URL + '/teams/findAllTeamsByPerson/' + username,
                    //params: data
                })
                    .then(function (response) {
                            if (successCB) {
                                successCB(response);
                            }
                            //return response.data;
                        },
                        function (response) {
                            if (errorCB) {
                                errorCB(response);
                            }
                            console.error(response.data);
                            //ToasterNotifierHandler.handleError(response);
                            ToasterNotifierHandler.showErrorToast("Error in get teams by team member");
                        });
            }


            return thisCrudService;
        }]);



