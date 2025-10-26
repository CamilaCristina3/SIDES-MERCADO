-- SIDES Mercado — Esquema MySQL atualizado (alinhado ao diagrama)
-- Execute em uma base MySQL vazia (ex.: sides_mercado)
-- Recomendado: utf8mb4 + InnoDB

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- Utilizadores
CREATE TABLE IF NOT EXISTS utilizadores (
  id              INT AUTO_INCREMENT PRIMARY KEY,
  email           VARCHAR(255) NOT NULL UNIQUE,
  password        VARCHAR(255) NOT NULL,
  first_name      VARCHAR(100) NOT NULL,
  last_name       VARCHAR(100) NULL,
  tipo            ENUM('A','P','C') NOT NULL DEFAULT 'C', -- A=Admin, P=Produtor, C=Cliente
  telefone        VARCHAR(30) NULL,
  nif             VARCHAR(20) NULL,
  morada          TEXT NULL,
  provincia       VARCHAR(50) NULL,
  distrito        VARCHAR(50) NULL,
  codigo_postal   VARCHAR(20) NULL,
  localidade      VARCHAR(100) NULL,
  imagem_perfil   VARCHAR(255) NULL,
  is_active       TINYINT(1) NOT NULL DEFAULT 1,
  is_superuser    TINYINT(1) NOT NULL DEFAULT 0,
  data_registo    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  date_joined     DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Categorias
CREATE TABLE IF NOT EXISTS categorias (
  id           INT AUTO_INCREMENT PRIMARY KEY,
  nome         VARCHAR(50) NOT NULL,
  slug         VARCHAR(120) NOT NULL UNIQUE,
  descricao    TEXT NULL,
  icone        VARCHAR(50) NULL,
  ordem_menu   INT NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE INDEX idx_categorias_nome ON categorias(nome);

-- Produtos
CREATE TABLE IF NOT EXISTS produtos (
  id                     INT AUTO_INCREMENT PRIMARY KEY,
  nome                   VARCHAR(100) NOT NULL,
  slug                   VARCHAR(120) NOT NULL UNIQUE,
  descricao              TEXT NULL,
  preco                  DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  unidade                ENUM('kg','g','un','l','ml') NOT NULL DEFAULT 'un',
  stock                  INT NOT NULL DEFAULT 0,
  imagem                 VARCHAR(255) NULL,
  disponivel             TINYINT(1) NOT NULL DEFAULT 1,
  destaque               TINYINT(1) NOT NULL DEFAULT 0,
  local_producao         VARCHAR(100) NULL,
  data_colheita          DATE NULL,
  certificado_biologico  TINYINT(1) NOT NULL DEFAULT 0,
  data_criacao           DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  categoria_id           INT NULL,
  produtor_id            INT NULL,
  CONSTRAINT fk_produtos_categoria FOREIGN KEY (categoria_id) REFERENCES categorias(id) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT fk_produtos_utilizador FOREIGN KEY (produtor_id) REFERENCES utilizadores(id) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE INDEX idx_produtos_categoria ON produtos(categoria_id);
CREATE INDEX idx_produtos_disponivel ON produtos(disponivel);

-- Carrinhos (1 por utilizador)
CREATE TABLE IF NOT EXISTS carrinhos (
  id             INT AUTO_INCREMENT PRIMARY KEY,
  utilizador_id  INT NOT NULL UNIQUE,
  criado_em      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_carrinhos_user FOREIGN KEY (utilizador_id) REFERENCES utilizadores(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Itens do carrinho
CREATE TABLE IF NOT EXISTS itens_carrinho (
  id           INT AUTO_INCREMENT PRIMARY KEY,
  carrinho_id  INT NOT NULL,
  produto_id   INT NOT NULL,
  quantidade   INT NOT NULL,
  preco        DECIMAL(10,2) NOT NULL,
  unidade      VARCHAR(10) NOT NULL DEFAULT 'un',
  UNIQUE KEY uk_carrinho_produto (carrinho_id, produto_id),
  CONSTRAINT fk_itens_carrinho_carrinho FOREIGN KEY (carrinho_id) REFERENCES carrinhos(id) ON DELETE CASCADE,
  CONSTRAINT fk_itens_carrinho_produto FOREIGN KEY (produto_id) REFERENCES produtos(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Favoritos
CREATE TABLE IF NOT EXISTS favoritos (
  id             INT AUTO_INCREMENT PRIMARY KEY,
  utilizador_id  INT NOT NULL,
  produto_id     INT NOT NULL,
  criado_em      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uk_fav_user_prod (utilizador_id, produto_id),
  CONSTRAINT fk_fav_user FOREIGN KEY (utilizador_id) REFERENCES utilizadores(id) ON DELETE CASCADE,
  CONSTRAINT fk_fav_prod FOREIGN KEY (produto_id) REFERENCES produtos(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Pedidos
CREATE TABLE IF NOT EXISTS pedidos (
  id                INT AUTO_INCREMENT PRIMARY KEY,
  utilizador_id     INT NOT NULL,
  total             DECIMAL(10,2) NOT NULL,
  endereco_entrega  TEXT NULL,
  provincia         VARCHAR(50) NULL,
  distrito          VARCHAR(50) NULL,
  metodo_pagamento  ENUM('mpesa','emola','conta_movel','cartao_debito','transferencia') NOT NULL,
  status            ENUM('pendente','pago','enviado','entregue','cancelado') NOT NULL DEFAULT 'pendente',
  codigo            VARCHAR(64) NULL,
  data_criacao      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  atualizado_em     DATETIME NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_pedidos_user FOREIGN KEY (utilizador_id) REFERENCES utilizadores(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Itens do pedido
CREATE TABLE IF NOT EXISTS itens_pedido (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  pedido_id   INT NOT NULL,
  produto_id  INT NOT NULL,
  quantidade  INT NOT NULL,
  preco       DECIMAL(10,2) NOT NULL,
  CONSTRAINT fk_itens_pedido_pedido FOREIGN KEY (pedido_id) REFERENCES pedidos(id) ON DELETE CASCADE,
  CONSTRAINT fk_itens_pedido_produto FOREIGN KEY (produto_id) REFERENCES produtos(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Pagamentos
CREATE TABLE IF NOT EXISTS pagamentos (
  id               INT AUTO_INCREMENT PRIMARY KEY,
  pedido_id        INT NOT NULL,
  transacao_id     VARCHAR(64) NOT NULL UNIQUE,
  metodo_pagamento ENUM('mpesa','emola','conta_movel','cartao_debito','transferencia') NOT NULL,
  valor            DECIMAL(10,2) NOT NULL,
  status           ENUM('pendente','pago','falhou','cancelado') NOT NULL DEFAULT 'pendente',
  data_pagamento   DATETIME NULL,
  atualizado_em    DATETIME NULL,
  CONSTRAINT fk_pag_pedido FOREIGN KEY (pedido_id) REFERENCES pedidos(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Mensagens de contacto
CREATE TABLE IF NOT EXISTS contact_messages (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  nome       VARCHAR(100) NOT NULL,
  email      VARCHAR(255) NOT NULL,
  assunto    VARCHAR(120) NULL,
  mensagem   TEXT NOT NULL,
  data_envio DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

SET FOREIGN_KEY_CHECKS = 1;

