Crie validações nas seguintes rotas no servidor, retornando o status code 422 caso a validação não seja bem sucedida 

POST `/products`

    name é string e obrigatório
    sku é inteiro e obrigatório
    price é inteiro e obrigatório

POST `/customers` 

    name é string e obrigatório
    email é string, email e obrigatório
