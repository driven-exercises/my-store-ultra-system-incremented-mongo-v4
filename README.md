Crie validações nas seguintes rotas no servidor, retornando o status code 422 caso a validação não seja bem sucedida 

POST `/products` e PUT `/products/:id`

    name é string e obrigatório
    sku é inteiro e obrigatório
    price é inteiro e obrigatório

POST `/customers` e PUT `/customers/:id`

    name é string e obrigatório
    email é string, email e obrigatório