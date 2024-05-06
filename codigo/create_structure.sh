#!/bin/bash

# Função para criar a estrutura de arquivos em uma pasta
create_structure() {
    # Navega para a pasta fornecida como argumento
    cd "$1" || exit

    # Cria o arquivo index.html
    touch index.html

    # Cria a pasta 'assets' e navega para dentro dela
    mkdir assets
    cd assets || exit

    # Cria os arquivos CSS, JavaScript e JSON dentro da pasta 'assets'
    touch style.css script.js data.json

    # Retorna para o diretório anterior
    cd ..
}

# Lista das pastas a serem criadas
folders=("Home Page" "TBlackList" "Login" "Cadastro" "Recuperação de Senha" "Cursos" "Descrição dos Cursos" "Fórum" "Compartilhamento - Fórum" "Comentários" "Atualizações")

# Loop para criar a estrutura de arquivos em cada pasta
for folder in "${folders[@]}"; do
    create_structure "$folder"
done

