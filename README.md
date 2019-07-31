# Edukee ngAPI

SDK angularJS da API REST da plataforma de EAD Edukee.

A especificação da API, com os parâmetros utilizados é encontrada no menu "Integrações" no painel de controle
do educador.

## Instalação

Instale pelo bower

```
bower install edukee-ngapi
```

```
<script src="bower_components/edukee-ngapi/dist/edukee-ngapi.min.js"></script>
```

O SDK depende do jquery, angularjs e nblutils, então essas bibliotecas devem estar incluídas no seu projeto **antes** do SDK.

```
<script src="bower_components/jquery/dist/jquery.min.js"></script>
<script src="bower_components/angular/angular.min.js"></script>
<script src="bower_components/momentjs/min/moment-with-locales.min.js"></script>
<script src="bower_components/nblutils/dist/js/nblutils.min.js"></script>
```

Por último, inclua o EdukeeSDK e o nblutils como dependências do seu módulo.

```
angular
        .module('seu_modulo', ['nblutils','EdukeeSDK']);
```

## Introdução

O SDK angular implementa as requisições REST à API do Edukee e retorna os resultados 
sob a forma de promises. Logo, qualquer método do SDK segue o padrão:

```
Factory.metodo([parâmetros]).then(function([r]) {
    // processa o resultado
}, function([e]) {
    // processa o erro
});
```

Os factory fornecidos no SDK são:

**Init** - factory para inicializar o SDK
**Curso** - factory para acessar os cursos
**Turma** - factory para acessar as turmas
**Inscricao** - factory para realizar a inscrição

Não se esqueça de incluí-los nos controllers em que serão utilizados

## Uso


### Inicializando


Inicialize o SDK com o token da sua instituição gerado dentro do Edukee, para obter o token da API


```
Init.login(token_instituicao).then(function() {
    // sucesso
}, function(data) {
    // erro
    console.log('Falha ao inicializar o SDK: ' + data.msg);
});
```

Uma vez que o SDK está inicializado é possível executar as demais operações providas na API


### Verificando o token da API


```
Init.test().then(function() {
    // sucesso
}, function(data) {
    // erro
    console.log('Falha ao inicializar o SDK: ' + data.msg);
});
```


### Obtendo a lista de cursos ativos


```
Curso.getAll([pagina][,tamanho_da_pagina][,busca][,ordenar][,status]).then(function(r) {
    // sucesso
    console.log('Cursos: ',r.datas);
}, function(data) {
    // erro
    console.log('Erro: ' + data.msg);
});
```

### Obtendo os dados de um curso por seu id


```
Curso.getMe(curso_id).then(function(r) {
    // sucesso
    console.log('Curso: ',r.datas);
}, function(data) {
    // erro
    console.log('Erro: ' + data.msg);
});
```


### Obtendo a imagem de um curso


```
Curso.getMyImg('nome_imagem', curso_id, token_curso, arquivo_imagem).then(function(r) {
    // sucesso
    console.log('Imagem: ',r);
}, function(data) {
    // erro
    console.log('Erro: ' + data.msg);
});
```


### Obtendo as turmas de um curso


```
Turma.getAll(curso_id [,pagina][,tamanho_da_pagina][,busca][,ordenar][,inscricao_ativa][,em_execucao]).then(function(r) {
    // sucesso
    console.log('Turmas: ',r.datas);
}, function(data) {
    // erro
    console.log('Erro: ' + data.msg);
});
```


### Obtendo os dados de uma turma por seu id


```
Turma.getMe(turma_id).then(function(r) {
    // sucesso
    console.log('Turma: ',r.datas);
}, function(data) {
    // erro
    console.log('Erro: ' + data.msg);
});
```


### Obtendo a imagem de uma turma


```
Turma.getMyImg('nome_imagem', turma_id, token_curso, token_turma, flyer_turma).then(function(r) {
    // sucesso
    console.log('Imagem: ',r);
}, function(data) {
    // erro
    console.log('Erro: ' + data.msg);
});
```


### Obtendo o contrato de uma turma


```
Turma.getMyAgreement('contrato_turma', turma_id, token_curso, token_turma, contrato_turma).then(function(r) {
    // sucesso
    console.log('Contrato: ',r);
}, function(data) {
    // erro
    console.log('Erro: ' + data.msg);
});
```


### Obtendo o formulário de inscrição de um curso

A API Edukee usa formulários dinâmicos para as inscrições. Por conta disso, o próprio Edukee fornece
os campos que devem conter no formulário de inscrição, para depois receber de volta o mesmo formulário
preenchido. 

Para obter o formulário de inscrição de um curso, use:

```
Inscricao.getForm(curso_id).then(function(r) {
    // sucesso
    console.log('Formulário: ',r.datas);
}, function(data) {
    // erro
    console.log('Erro: ' + data.msg);
});
```

O formulário é um array no seguinte padrão:

```
formulario = [
    { 
        field: "nome", // nome do campo - não deve ser alterado
        label: "Nome", // label do campo para a interface - pode alterar se precisar
        type: "text",  // tipo do campo
        necessary: true,  // se é ou não um campo necessário
        oblige: true, // se é ou não um campo obrigatório
        checked: true // se o campo foi selecionado ou não para aparecer no formulário
    }
];
```

Os tipos possíveis para o campo são:

**text** - texto genérico  
**year** - informação de ano. Ex: 1988  
**date** - informação de data no padrão DD/MM/YYYY. Ex: 22/07/1988  
**email** - informação de e-mail  
**password** - senha. Deve ter pelo menos 6 caracteres e conter caracteres maiúsculos, minúsculos, números e caracteres especiais como @,!,#  
**cpf** - CPF no formato 999.999.999-99  
**sex** - campo de seleção para: M - Masculino; F - Feminino  
**uf** - campo de seleção para as unidades federativas do Brasil  
**cep** - CEP no formato 99.999-999  
**marital** - campo de seleção para: SOL - Solteiro(a); CAS - Casado(a); DIV - Divorciado(a); VIU - Viúvo(a)  
**phone** - campo de telefone no formato (99) 9999-9999  
**cellphone** - campo de celular no formato (99) 9 9999-9999

O Edukee usa esses tipos para validar os dados enviados pelos usuários.

Um campo marcado como **necessary** será obrigatóriamente cobrado pelo Edukee. Então campos assim **devem** ser enviados
preenchidos para o Edukee ou o mesmo acusará erro

Um campo marcado como **oblige** é um campo não necessário que foi marcado como obrigatório pelo usuário que configurou
o formulário de inscrição. O comportamento é parecido com o do necessary, com a diferença que a obrigatoriedade nesse
caso foi definida pela instituição usuária do Edukee e não pelo Edukee em si.

Um campo marcado como **checked** foi selecionado pelo usuário que configurou o formulário de inscrição para compor o formulário,
porém tem seu preenchimento opcional. 

### Enviando o formulário de inscrição preenchido

A partir do formulário obtido no método anterior e após o usuário preenche-lo na interface, é 
possível enviar os dados da inscrição para o Edukee.

Para isso é necessário gerar um array de objetos para cada campo do formulário, 
com o padrão seguinte:

```
campos = [
    { 
        field: "", // nome do campo como obtido na propriedade field durante a busca do formulário
        value: "" // valor do campo obtido da interface
    }
];
```

Esse array deve ser preparado para envio, o que pode ser feito:

```
Inscricao.prepareInscricao(curso_id, turma_id, campos).then(function(r) {
    // sucesso
    console.log('Formulário preparado para envio: ',r.datas);
}, function(data) {
    // erro
    console.log('Erro: ' + data.msg);
});
```

Com os dados preparados para envio, falta só submeter a inscrição

```
Inscricao.doInscricao(formulario_preparado).then(function() {
    // sucesso
    console.log('inscrição realizada');
}, function(data) {
    // erro
    console.log('Erro: ' + data.msg);
    console.log('Erros: ' + data.errs);
});
```

Há um detalhe no retorno do array de erros, que é específico desse método, que é um campo
marcador para indicar o nome do campo como especificado no label (obtido durante a busca do
formulário) que apresentou problemas:

```
<field>Label do Campo</field>
```

Substitua o marcador pelo que considerar mais adequado

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details


