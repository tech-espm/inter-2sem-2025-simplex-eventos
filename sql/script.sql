-- Caso ocorra algum problema no login, executar o código abaixo, para arrumar a senha do usuário root:
-- ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';

-- Esse script vale para o MySQL 8.x. Se seu MySQL for 5.x, precisa executar essa linha comentada:
-- CREATE DATABASE IF NOT EXISTS simplex;
CREATE DATABASE IF NOT EXISTS simplex DEFAULT CHARACTER SET utf8mb4 DEFAULT COLLATE utf8mb4_0900_ai_ci;

USE simplex;

CREATE TABLE evento (
  id int NOT NULL AUTO_INCREMENT,
  nome varchar(100) NOT NULL,
  categoria varchar(100) NOT NULL,
  endereco varchar(100) NOT NULL,
  valor float NOT NULL,
  data datetime NOT NULL,
  descricao text NOT NULL,
  capacidade int NOT NULL,
  PRIMARY KEY (id)
);
