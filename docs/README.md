# Documentação do Projeto (TIDocs)

Esta pasta armazena a documentação do projeto para a disciplina de **Trabalho Interdisciplinar 1** dos cursos de Tecnologia da Informação da **[PUC Minas](https://pucminas.br)**. Essa documentação é estruturada na forma de um site que fica disponível por meio do GitHub Pages e pode ser incluído, também, no site da solução hospedada. Um [exemplo publicado do TIDocs](https://webtech-puc-minas.github.io/ti1-template/) está disponível por meio do repositório do **[WebTech PUC Minas](https://github.com/webtech-pucminas)**.

A documentação do projeto inclui as seguintes seções:

1. Introdução
2. Contexto
3. Concepção
4. Metodologia
5. Solução
6. FAQ (Questões frequentes)
7. Referências Bibliográficas

O template para o site é estruturado e permite que a equipe evolua a documentação do projeto à medida que avance no desenvolvimento.

# Orientações gerais

Esta seção traz explicações breves sobre o conjunto de artefatos que precisam ser incluídos na documentação do projeto com uma conjunto de links importantes para que se entenda como criar cada coisa. 

## Problema

Segundo uma pesquisa feita pela agência Brasil, aponta que pessoas entre 36 e 50 anos são as vítimas preferidas por golpistas na internet, sofrendo 35,9% das fraudes registradas. Os golpes virtuais, também conhecidos como golpes online ou cibernéticos, referem-se a práticas fraudulentas realizadas através da internet ou de dispositivos eletrônicos. Esses golpes geralmente têm o objetivo de enganar as vítimas para obter informações pessoais, financeiras ou confidenciais, ou para induzi-las a realizar ações prejudiciais. Como por exemplo as fraudes em compras online, na qual, Os golpistas criam sites falsos de comércio eletrônico que parecem ser legítimos, oferecendo produtos a preços muito baixos. Eles aceitam o pagamento, mas nunca enviam os produtos, ou enviam produtos falsificados ou de baixa qualidade. Os golpistas em geral visam o lucro e golpes que sejam mais rápidos de serem aplicados, procuram o ponto fraco da vitima (momentos de possivel falta de atenção ou conhecimento), na qual a vitima não verifica as informações, como por exemplo os e-mails falsos de venda no mercado livre, ou mensagens de compra por sms.

**Links Úteis**:

- [Objetivos, Problema de pesquisa e Justificativa](https://medium.com/@versioparole/objetivos-problema-de-pesquisa-e-justificativa-c98c8233b9c3)
- [Matriz Certezas, Suposições e Dúvidas](https://medium.com/educa%C3%A7%C3%A3o-fora-da-caixa/matriz-certezas-suposi%C3%A7%C3%B5es-e-d%C3%BAvidas-fa2263633655)
- [Brainstorming](https://www.euax.com.br/2018/09/brainstorming/)

## Objetivos

Este trabalho tem como objetivo geral desenvolver uma aplicação web a fim de previnir golpes virtuais. Utilizando de conhecimentos agregados para facilitar o acesso a informação e como identificar possíveis armadilhas. Como objetivos especificos temos: o desenvolvimento de uma plataforma intuitiva para pessoas com dificuldades tecnológicas, estruturar um forúm para que os usuários da aplicação troquem informações sobres os golpes dos quais tem conhecimento e fornecer ferramentas necessárias para que os usuários identifiquem com facilidades Url's, telefones e progandas falsas.

**Links Úteis**:

- [Objetivo geral e objetivo específico: como fazer e quais verbos utilizar](https://blog.mettzer.com/diferenca-entre-objetivo-geral-e-objetivo-especifico/)

## Justificativa

Descreva a importância ou a motivação para trabalhar com esta aplicação que você escolheu. Indique as razões pelas quais você escolheu seus objetivos específicos ou as razões para aprofundar em certos aspectos do software.

O grupo de trabalho pode fazer uso de questionários, entrevistas e dados estatísticos, que podem ser apresentados, com o objetivo de esclarecer detalhes do problema que será abordado pelo grupo.

**Links Úteis**:

- [Como montar a justificativa](https://guiadamonografia.com.br/como-montar-justificativa-do-tcc/)

## Público-Alvo
O público-alvo da aplicação trata-se de todos usuários que navegam na WEB. Cada usuário tem a possibilidade de ser atraido para um link falso ou programa que roubará dados e afins. Por tanto, entende-se como Público-Alvo as possíveis vítimas destes golpes. Foi utilizado de um mapa de stakeholders para definir o as pessoas fundamentais, importantes e influênciadoras da aplicação. O diagrama abaixo destaca os principais stakeholders do trabalho e os conhecimentos levantados.
![image](https://github.com/ICEI-PUC-Minas-PPLES-TI/plf-es-2024-1-ti1-0387200-security_class/assets/165722302/531fd466-4c77-4e1c-93a3-10e414a39597)

Foram definidos como pessoas fundamentais os usuários da web e os golpistas/hackers. Para as pessoas importantes temos: Bancos, Pessoas públicas, E-comerces, Governo, Grandes marcas e instituições e lojas de aplicativos. Por fim, as pessoas influenciadoras para a aplicação são: Comunidades e blogs online, a Opnião Pública, profissionais do direito, profissionais de segurança da informação e orgãos e instituições reguladoras da internet.

**Links Úteis**:

- [Público-alvo: o que é, tipos, como definir seu público e exemplos](https://klickpages.com.br/blog/publico-alvo-o-que-e/)
- [Qual a diferença entre público-alvo e persona?](https://rockcontent.com/blog/diferenca-publico-alvo-e-persona/)

## Personas

As personas propostas estão descritas nas imagens a seguir.

A primeira persona, trata-se do perfil geral de um golpista, uma pessoa que tem como objetivo enriquecer rápido e sem esforço, independente dos meios para alcançar esse objetivo.
![image](https://github.com/ICEI-PUC-Minas-PPLES-TI/plf-es-2024-1-ti1-0387200-security_class/assets/165722302/66148b78-a5c4-4b8c-9ae3-f5ead6f69007)


As propostas de valor para essa persona são:
![image](https://github.com/ICEI-PUC-Minas-PPLES-TI/plf-es-2024-1-ti1-0387200-security_class/assets/165722302/192c8efe-a183-4da9-ad0a-55e44fa5486c)


A segunda persona, trata-se de um perfil mais suscétivel a ser vítima de um golpe virtual. Esta persona tem pouco conhecimento em navegar na web e de identificar possíveis fraudes, sejam de sites, em aplicativos ou no momento de realizar compras virtuais. 
![image](https://github.com/ICEI-PUC-Minas-PPLES-TI/plf-es-2024-1-ti1-0387200-security_class/assets/165722302/ac49ac0a-030f-4475-8718-2e78848ce2e7)


As propostas de valor para essa persona são:
![image](https://github.com/ICEI-PUC-Minas-PPLES-TI/plf-es-2024-1-ti1-0387200-security_class/assets/165722302/4c48aaa4-a825-422c-9877-3dff129d1cd3)


A terceira persona, trata-se de um usuário que agregará informações importantes ao sistema WEB. Auxiliando, os usuários e as possíveis vítimas, a como identificar as fraudes e golpes.
![image](https://github.com/ICEI-PUC-Minas-PPLES-TI/plf-es-2024-1-ti1-0387200-security_class/assets/165722302/c4a8439f-ae8f-4262-8afc-2349553b9dea)


As propostas de valor para essa persona são:
![image](https://github.com/ICEI-PUC-Minas-PPLES-TI/plf-es-2024-1-ti1-0387200-security_class/assets/165722302/08a67937-f7fd-4434-b07f-2a5f0bb22a52)


A quarta persona, trata-se de outra vítima com perfil parecido a segundo. Entretanto, esta persona não possui conhecimento sobre como navegar na web e está totalmente desinformado sobre a possibilidade de sofrer golpes virtuais. Acredita em práticamente todo anúncio e informação passada, através da web até ele.
![image](https://github.com/ICEI-PUC-Minas-PPLES-TI/plf-es-2024-1-ti1-0387200-security_class/assets/165722302/fd2d47a3-3559-49dd-8949-6b117f2f0e41)


As propostas de valor para essa persona são:
![image](https://github.com/ICEI-PUC-Minas-PPLES-TI/plf-es-2024-1-ti1-0387200-security_class/assets/165722302/2ebc51e3-0160-497b-82d1-198e75d27444)


Por fim, a quinta e ultima persona construída, trata-se de uma vítima que caiu em um golpe devido a pressa e falta de atenção. Esta persona possui conhecimentos avançados sobre o assunto e as ferramentas disponíveis na Web, mas por falta de tempo e atenção está suscetível aos golpes virtuais.
![image](https://github.com/ICEI-PUC-Minas-PPLES-TI/plf-es-2024-1-ti1-0387200-security_class/assets/165722302/4e41edf4-ccaa-45ed-8c9e-bc59575d0e79)


As propostas de valor para essa persona são:
![image](https://github.com/ICEI-PUC-Minas-PPLES-TI/plf-es-2024-1-ti1-0387200-security_class/assets/165722302/7b9541c3-bef0-4c25-9f58-820eff102fcb)



**Links Úteis**:

- [Persona x Público-alvo](https://flammo.com.br/blog/persona-e-publico-alvo-qual-a-diferenca/)
- [O que é persona?](https://resultadosdigitais.com.br/blog/persona-o-que-e/)
- [Rock Content](https://rockcontent.com/blog/personas/)
- [Criar personas (Hotmart)](https://blog.hotmart.com/pt-br/como-criar-persona-negocio/)

## Histórias de Usuários

Apresente aqui as histórias de usuário que são relevantes para o projeto de sua solução. As Histórias de Usuário consistem em uma ferramenta poderosa para a compreensão e elicitação dos requisitos funcionais e não funcionais da sua aplicação. Se possível, agrupe as histórias de usuário por contexto, para facilitar consultas recorrentes à essa parte do documento.

**Links Úteis**:

- [Histórias de usuários com exemplos e template](https://www.atlassian.com/br/agile/project-management/user-stories)
- [Como escrever boas histórias de usuário (User Stories)](https://medium.com/vertice/como-escrever-boas-users-stories-hist%C3%B3rias-de-usu%C3%A1rios-b29c75043fac)

## Requisitos

Os requisitos de um projeto são classificados em dois grupos:

- [Requisitos Funcionais (RF)](https://pt.wikipedia.org/wiki/Requisito_funcional):
  correspondem a uma funcionalidade que deve estar presente na plataforma (ex: cadastro de usuário).
- [Requisitos Não Funcionais (RNF)](https://pt.wikipedia.org/wiki/Requisito_n%C3%A3o_funcional):
  correspondem a uma característica técnica, seja de usabilidade, desempenho, confiabilidade, segurança ou outro (ex: suporte a dispositivos iOS e Android).

Lembre-se que cada requisito deve corresponder à uma e somente uma característica alvo da sua solução. Além disso, certifique-se de que todos os aspectos capturados nas Histórias de Usuário foram cobertos.

**Links Úteis**:

- [O que são Requisitos Funcionais e Requisitos Não Funcionais?](https://codificar.com.br/requisitos-funcionais-nao-funcionais/)
- [O que são requisitos funcionais e requisitos não funcionais?](https://analisederequisitos.com.br/requisitos-funcionais-e-requisitos-nao-funcionais-o-que-sao/)

## User Flow

Fluxo de usuário (User Flow) é uma técnica que permite ao desenvolvedor mapear todo fluxo de telas do site ou app. Essa técnica funciona para alinhar os caminhos e as possíveis ações que o usuário pode fazer junto com os membros de sua equipe.

**Links Úteis**:

- [User Flow: O Quê É e Como Fazer?](https://medium.com/7bits/fluxo-de-usu%C3%A1rio-user-flow-o-que-%C3%A9-como-fazer-79d965872534)
- [User Flow vs Site Maps](http://designr.com.br/sitemap-e-user-flow-quais-as-diferencas-e-quando-usar-cada-um/)
- [Top 25 User Flow Tools &amp; Templates for Smooth](https://www.mockplus.com/blog/post/user-flow-tools)

## Wireframes

Wireframes são protótipos das telas da aplicação usados em design de interface para sugerir a estrutura de um site web e seu relacionamentos entre suas páginas. Um wireframe web é uma ilustração semelhante ao layout de elementos fundamentais na interface.

**Links Úteis**:

- [Ferramentas de Wireframes](https://rockcontent.com/blog/wireframes/)
- [Figma](https://www.figma.com/)
- [Adobe XD](https://www.adobe.com/br/products/xd.html#scroll)
- [MarvelApp](https://marvelapp.com/developers/documentation/tutorials/)

## Gestão de Projetos

 Nesta parte do documento, você deve apresentar  o processo de trabalho baseado nas metodologias ágeis, a divisão de papéis e tarefas, as ferramentas empregadas e como foi realizada a gestão de configuração do projeto via GitHub.

Coloque detalhes sobre o processo de Design Thinking e a implementação do Framework Scrum seguido pelo grupo. O grupo poderá fazer uso de ferramentas on-line para acompanhar o andamento do projeto, a execução das tarefas e o status de desenvolvimento da solução.

**Links Úteis**:

- [Sobre Projects - GitHub Docs](https://docs.github.com/pt/issues/planning-and-tracking-with-projects/learning-about-projects/about-projects)
- [Gestão de projetos com GitHub | balta.io](https://balta.io/blog/gestao-de-projetos-com-github)
- [(460) GitHub Projects - YouTube](https://www.youtube.com/playlist?list=PLiO7XHcmTsldZR93nkTFmmWbCEVF_8F5H)
- [11 Passos Essenciais para Implantar Scrum no seu Projeto](https://mindmaster.com.br/scrum-11-passos/)
- [Scrum em 9 minutos](https://www.youtube.com/watch?v=XfvQWnRgxG0)
