# Cinema App

Este projeto foi criado como desafio para a Sthima.

Comece clonando o projeto:
    
    git clone https://github.com/crsou/dev-cinemapp.git
Instale as dependências e inicie o app:

    yarn
    yarn start

Isso irá abrir o app em seu navegador. Para visualizar em seu celular basta abrir o navegador e acessar o seu endereço de IPv4 + a porta em que o app está aberto. 
    
Exemplo: 192.168.100.32:3000

## Como utilizar

Este app permite que você busque e encontre filmes através da API do OMDb. Basta digitar sua busca (em inglês) na barra de pesquisa e o app irá retornar filmes relacionados. Porém, se a busca for muito ampla a API retornará o erro "Too many results." (resultados demais).

Ao clicar em um filme você verá o Poster ampliado, o título e o ano em que foi lançado. Ao clicar no botão de coração você estará marcando o filme como favorito, isso fará com que fique salvo na sua lista de favoritos.

Na página de favoritos você terá as mesmas ações de busca e visualização de detalhes de filmes, e também poderá removê-los da lista.

## Observações

O app foi desenvolvido a partir da suposição de que não haveria um back-end (além da API do OMDb), portanto os favoritos são salvos utilizando a localStorage. Dessa forma, os dados não estão ligados à nenhum usuário e não irão ser mantidos entre navegadores e dispositivos diferentes.

O layout do app é responsivo, utilizando o pacote react-device-detect. Caso você esteja utilizando no navegador do seu computador e queira emular a tela de um celular, recarregue a página para que o layout seja atualizado.
