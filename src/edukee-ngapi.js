
var EdukeeEndpoint = {
    URL: 'https://www.edukee.com.br/api',
    init: function() {
        
        if(window.location.href.includes("edukee.local"))
        {
            EdukeeEndpoint.URL = 'http://edukee.local/api';
        }
        
    }
};
EdukeeEndpoint.init();

angular.module('EdukeeSDK', [])

        .constant('ApiEndpoint', {
                url: EdukeeEndpoint.URL
        })
        
        .factory('Init', function ($localstorage, $q, $http, ApiEndpoint) {
            
            var login = function(token_instituicao) {
                var deferred = $q.defer();
                $http
                    .get(ApiEndpoint.url+'/integracao/loginInstituicao?token='+token_instituicao)
                    .then(function(r) {
                        if(r.data.success)
                        {
                            $localstorage.set('edukee_api_token', r.data.api_token);
                            deferred.resolve();
                        }
                        else
                        {
                            deferred.reject({ msg: r.data.msg });
                        }
                    }, 
                    function(r) {
                        deferred.reject({ msg: 'Não foi possível realizar a operação :( erro #'+r.status, errs: [] });
                    });
                return deferred.promise;
            };
            
            var test = function() {
                var token = $localstorage.get('edukee_api_token');
                var deferred = $q.defer();
                
                $http
                    .get(ApiEndpoint.url+'/integracao/test?token='+token, {
                        headers: {
                            "Authorization": "token=" + token
                        }
                    })
                    .then(function(r) {
                        if(r.data.success)
                        {
                            deferred.resolve();
                        }
                        else
                        {
                            deferred.reject({ msg: r.data.msg });
                        }
                    }, 
                    function(r) {
                        deferred.reject({ msg: 'Não foi possível realizar a operação :( erro #'+r.status, errs: [] });
                    });
                return deferred.promise;
            };
            
            return {
                login: login,
                test: test
            };
        })
        
        .factory('Curso', function ($localstorage, $q, $http, ApiEndpoint) {
            
            var getAll = function(page, pagesize, searchBy, orderBy, stat) {
                
                var token = $localstorage.get('edukee_api_token');
                var deferred = $q.defer();
                
                var pg = (page == undefined) ? '' : page;
                var ps = (pagesize == undefined) ? '' : pagesize;
                var sb = (searchBy == undefined) ? '' : searchBy;
                var ob = (orderBy == undefined) ? '' : orderBy;
                var st = (stat == undefined) ? '' : stat;
                
                $http
                    .get(ApiEndpoint.url+'/cursos/all?page='+pg+'&pageSize='+ps+'&searchBy='+sb+
                                '&orderBy='+ob+'&stat='+st, {
                        headers: {
                            "Authorization": "token=" + token
                        }
                    })
                    .then(function(r) {

                        if(r.data.success)
                        {
                            deferred.resolve({ datas: r.data.datas, total: r.data.total });
                        }
                        else
                        {
                            deferred.reject({ msg: r.data.msg, errs: r.data.errs });
                        }
                    }, 
                    function(r) {
                        deferred.reject({ msg: 'Não foi possível realizar a operação :( erro #'+r.status, errs: [] });
                    });
                
                return deferred.promise;
            };
    
            var getMe = function(id) {
                
                var token = $localstorage.get('edukee_api_token');
                var deferred = $q.defer();
                
                $http
                    .get(ApiEndpoint.url+'/cursos/me?id='+id, {
                        headers: {
                            "Authorization": "token=" + token
                        }
                    })
                    .then(function(r) {

                        if(r.data.success)
                        {
                            deferred.resolve({ datas: r.data.datas });
                        }
                        else
                        {
                            deferred.reject({ msg: r.data.msg, errs: r.data.errs });
                        }
                    }, 
                    function(r) {
                        deferred.reject({ msg: 'Não foi possível realizar a operação :( erro #'+r.status, errs: [] });
                    });
                
                return deferred.promise;
            };
            
            var getMyImg = function(nome, id, curso_token, file) {
                
                var token = $localstorage.get('edukee_api_token');
                var deferred = $q.defer();
                
                $http
                    .get(ApiEndpoint.url+'/download.php?isAPI=true&tipo=curso_logo'+
                            '&nome='+nome+'&id='+id+'&curso='+curso_token+'&file='+file, {
                        headers: {
                            "Authorization": "token=" + token
                        }
                    })
                    .then(function(r) {

                        if(r.data.success)
                        {
                            deferred.resolve({ 
                                name: r.data.name,
                                type: r.data.type,
                                content: r.data.content,
                                size: r.data.size
                            });
                        }
                        else
                        {
                            deferred.reject({ msg: r.data.msg });
                        }
                    }, 
                    function(r) {
                        deferred.reject({ msg: 'Não foi possível realizar a operação :( erro #'+r.status, errs: [] });
                    });
                
                return deferred.promise;
            };
            
            return {
                getAll: getAll,
                getMe: getMe,
                getMyImg: getMyImg
            };
        })
        
        .factory('Turma', function ($localstorage, $q, $http, ApiEndpoint) {
            
            var getAll = function(curso, page, pagesize, searchBy, orderBy, inscricao_ativa, em_execucao) {
                
                var token = $localstorage.get('edukee_api_token');
                var deferred = $q.defer();
                
                var pg = (page == undefined) ? '' : page;
                var ps = (pagesize == undefined) ? '' : pagesize;
                var sb = (searchBy == undefined) ? '' : searchBy;
                var ob = (orderBy == undefined) ? '' : orderBy;
                var cs = (curso == undefined) ? '' : curso;
                var ia = (inscricao_ativa == undefined) ? '' : inscricao_ativa;
                var ex = (em_execucao == undefined) ? '' : em_execucao;
                
                $http
                    .get(ApiEndpoint.url+'/turmas/all?page='+pg+'&pageSize='+ps+'&searchBy='+sb+
                                '&orderBy='+ob+'&curso='+cs+'&inscricaoAtiva='+ia+'&emExecucao='+ex, {
                        headers: {
                            "Authorization": "token=" + token
                        }
                    })
                    .then(function(r) {

                        if(r.data.success)
                        {
                            deferred.resolve({ datas: r.data.datas, total: r.data.total });
                        }
                        else
                        {
                            deferred.reject({ msg: r.data.msg, errs: r.data.errs });
                        }
                    }, 
                    function(r) {
                        deferred.reject({ msg: 'Não foi possível realizar a operação :( erro #'+r.status, errs: [] });
                    });
                
                return deferred.promise;
            };
    
            var getMe = function(id) {
                
                var token = $localstorage.get('edukee_api_token');
                var deferred = $q.defer();
                
                $http
                    .get(ApiEndpoint.url+'/turmas/me?id='+id, {
                        headers: {
                            "Authorization": "token=" + token
                        }
                    })
                    .then(function(r) {

                        if(r.data.success)
                        {
                            deferred.resolve({ datas: r.data.datas });
                        }
                        else
                        {
                            deferred.reject({ msg: r.data.msg, errs: r.data.errs });
                        }
                    }, 
                    function(r) {
                        deferred.reject({ msg: 'Não foi possível realizar a operação :( erro #'+r.status, errs: [] });
                    });
                
                return deferred.promise;
            };
            
            var getMyImg = function(nome, id, curso_token, turma_token, file) {
                
                var token = $localstorage.get('edukee_api_token');
                var deferred = $q.defer();
                
                $http
                    .get(ApiEndpoint.url+'/download.php?isAPI=true&tipo=turma_logo'+
                            '&nome='+nome+'&id='+id+'&curso='+curso_token+
                            '&turma='+turma_token+'&file='+file, {
                        headers: {
                            "Authorization": "token=" + token
                        }
                    })
                    .then(function(r) {

                        if(r.data.success)
                        {
                            deferred.resolve({ 
                                name: r.data.name,
                                type: r.data.type,
                                content: r.data.content,
                                size: r.data.size
                            });
                        }
                        else
                        {
                            deferred.reject({ msg: r.data.msg });
                        }
                    }, 
                    function(r) {
                        deferred.reject({ msg: 'Não foi possível realizar a operação :( erro #'+r.status, errs: [] });
                    });
                
                return deferred.promise;
            };
            
            var getMyAgreement = function(nome, id, curso_token, turma_token, file) {
                
                var token = $localstorage.get('edukee_api_token');
                var deferred = $q.defer();
                
                $http
                    .get(ApiEndpoint.url+'/download.php?isAPI=true&tipo=turma_contrato'+
                            '&nome='+nome+'&id='+id+'&curso='+curso_token+
                            '&turma='+turma_token+'&file='+file, {
                        headers: {
                            "Authorization": "token=" + token
                        }
                    })
                    .then(function(r) {

                        if(r.data.success)
                        {
                            deferred.resolve({ 
                                name: r.data.name,
                                type: r.data.type,
                                content: r.data.content,
                                size: r.data.size
                            });
                        }
                        else
                        {
                            deferred.reject({ msg: r.data.msg });
                        }
                    }, 
                    function(r) {
                        deferred.reject({ msg: 'Não foi possível realizar a operação :( erro #'+r.status, errs: [] });
                    });
                
                return deferred.promise;
            };
            
            return {
                getAll: getAll,
                getMe: getMe,
                getMyImg: getMyImg,
                getMyAgreement: getMyAgreement
            };
        })
        
        .factory('Inscricao', function ($localstorage, $q, $http, ApiEndpoint) {
            
            var getForm = function(curso_id) {
                
                var token = $localstorage.get('edukee_api_token');
                var deferred = $q.defer();
                
                $http
                    .get(ApiEndpoint.url+'/cursos/me?id='+curso_id, {
                        headers: {
                            "Authorization": "token=" + token
                        }
                    })
                    .then(function(r) {

                        if(r.data.success)
                        {
                            deferred.resolve({ datas: jQuery.parseJSON(r.data.datas.campos_inscricao) });
                        }
                        else
                        {
                            deferred.reject({ msg: r.data.msg, errs: r.data.errs });
                        }
                    }, 
                    function(r) {
                        deferred.reject({ msg: 'Não foi possível realizar a operação :( erro #'+r.status, errs: [] });
                    });
                
                return deferred.promise;
            };
            
            var prepareInscricao = function(curso_id, turma_id, form) {
                
                var deferred = $q.defer();
                
                var campos_to_send = {};
                for(var k in form) {
                    campos_to_send[form[k].field] = '';
                }

                campos_to_send['curso'] = curso_id;
                campos_to_send['turma'] = turma_id;
                campos_to_send['modulos'] = '';
                campos_to_send['disciplinas'] = '';
                campos_to_send['aulas'] = '';

                for(var k in form) {
                    if(campos_to_send.hasOwnProperty(form[k].field)) {
                        campos_to_send[form[k].field] = form[k].value;
                    }
                }
                deferred.resolve({ datas: campos_to_send });
                
                return deferred.promise;
                
            };
    
            var doInscricao = function(dados) {
                
                var token = $localstorage.get('edukee_api_token');
                var data = JSON.stringify(dados);
                
                var deferred = $q.defer();
                
                $http
                    .post(ApiEndpoint.url+'/inscricao/inscrevame', data, {
                        headers: {
                            "Authorization": "token=" + token
                        }
                    })
                    .then(function(r) {

                        if(r.data.success)
                        {
                            deferred.resolve();
                        }
                        else
                        {
                            deferred.reject({ msg: r.data.msg, errs: r.data.errs });
                        }
                    }, 
                    function(r) {
                        deferred.reject({ msg: 'Não foi possível realizar a operação :( erro #'+r.status, errs: [] });
                    });
                
                return deferred.promise;
            };
            
            return {
                getForm: getForm,
                prepareInscricao: prepareInscricao,
                doInscricao: doInscricao
            };
        })
        ;

