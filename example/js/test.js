

angular
        .module('test', ['nblutils','EdukeeSDK'])
        .controller('TestCtrl', function($scope, Init, Curso, Turma, Inscricao) {
            Init.login('token_instituicao').then(function() {
                Init.test().then(function() {
                    Curso.getAll().then(function(r) {
                        console.log(r);
                        $scope.cursoId = r.datas[0].id;
                        Curso.getMe($scope.cursoId).then(function(r) {
                            console.log(r);
                            $scope.curso = r.datas;
                            Curso.getMyImg('imagem_curso', $scope.curso.id, $scope.curso.token, $scope.curso.imagem).then(function(r) {
                                console.log(r);
                                $scope.cursoImg = r;
                                Turma.getAll($scope.cursoId).then(function(r) {
                                    console.log(r);
                                    $scope.turmaId = r.datas[0].id;
                                    Turma.getMe($scope.turmaId).then(function(r) {
                                        console.log(r);
                                        $scope.turma = r.datas;
                                        Turma.getMyImg('imagem_turma', $scope.turma.id, $scope.curso.token, $scope.turma.token, $scope.turma.flyer).then(function(r) {
                                            console.log(r);
                                            $scope.turmaImg = r;
                                            Turma.getMyAgreement('contrato_turma', $scope.turma.id, $scope.curso.token, 
                                                    $scope.turma.token, $scope.turma.contrato).then(function(r) {
                                                console.log(r);
                                                $scope.turmaImg = r;
                                                Inscricao.getForm($scope.cursoId).then(function(r) {
                                                    $scope.form = r.datas;
                                                    $scope.inscricao = [];
                                                    for(var k in $scope.form) {
                                                        var val = '';
                                                        if($scope.form[k].necessary || $scope.form[k].oblige) {
                                                            if($scope.form[k].type == 'text') {
                                                                val = 'angular teste';
                                                            }
                                                            else if($scope.form[k].type == 'email') {
                                                                val = 'angular@teste.com';
                                                            }
                                                            else if($scope.form[k].type == 'password') {
                                                                val = 'Teste123@';
                                                            }
                                                            else if($scope.form[k].type == 'cpf') {
                                                                val = '465.064.590-50';
                                                            }
                                                            else if($scope.form[k].type == 'date') {
                                                                val = '22/07/1988';
                                                            }
                                                        }
                                                        
                                                        if($scope.form[k].checked) {
                                                            $scope.inscricao.push({
                                                                field: $scope.form[k].field,
                                                                value: val
                                                            });
                                                        }
                                                    }
                                                    
                                                    console.log($scope.inscricao);
                                                    
                                                    Inscricao.prepareInscricao($scope.cursoId, $scope.turmaId, $scope.inscricao).then(function(r) {
                                                        console.log(r);
                                                        Inscricao.doInscricao(r.datas).then(function() {
                                                            console.log('inscrição realizada');
                                                        }, function(e) {
                                                            console.log(e);
                                                        });
                                                    }, function(e) {
                                                        console.log(e);
                                                    });
                                                }, function(e) {
                                                    console.log(e);
                                                });
                                            }, function(e) {
                                                console.log(e);
                                            });
                                        }, function(e) {
                                            console.log(e);
                                        });
                                    }, function(e) {
                                        console.log(e);
                                    });
                                }, function(e) {
                                    console.log(e);
                                });
                            }, function(e) {
                                console.log(e);
                            });
                        }, function(e) {
                            console.log(e);
                        });
                    }, function(e) {
                        console.log(e);
                    });
                }, function(e) {
                    console.log(e);
                });
            }, function(e) {
                console.log(e);
            });
        });

