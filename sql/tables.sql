
CREATE TABLE `abc_order_records` (
  id                        INT             NOT NULL AUTO_INCREMENT,
  subjectId                 INT             NOT NULL,
  orderId                   INT             NOT NULL,
  orderCode                 VARCHAR(100)    NOT NULL,
  transactionNo             VARCHAR(100)    NOT NULL,
  abcTranNo                 VARCHAR(100)    NOT NULL,
  abcMeta                   TEXT            NOT NULL,
  payStatus                 INT             NOT NULL COMMENT '0待支付,1成功,2失败,3全部退款,4部分退款,5失效',
  supplierId                INT             NOT NULL,
  amount                    INT             NOT NULL,
  createdBy                 INT             NOT NULL,
  createdAt                 DATETIME        NOT NULL,
  updatedBy                 INT             NOT NULL,
  updatedAt                 DATETIME        NOT NULL,
  isDeleted                 INT             NOT NULL,
  comment                   VARCHAR(100)    NOT NULL,
  PRIMARY KEY (id),
  INDEX (subjectId, orderId),
  INDEX (subjectId, orderId, orderCode),
  INDEX (subjectId, abcTranNo)
) ENGINE = InnoDB CHARACTER SET utf8 COLLATE utf8_general_ci COMMENT 'abc 支付跳转记录';

CREATE TABLE `abc_account_records` (
  id                        INT             NOT NULL AUTO_INCREMENT,
  subjectId                 INT             NOT NULL,
  dealerId                  VARCHAR(50)     NOT NULL,
  code                      VARCHAR(50)     NOT NULL,
  name                      VARCHAR(50)     NOT NULL,
  mobile                    VARCHAR(50)     NOT NULL,  
  detailJson                TEXT            NOT NULL,
  createdBy                 INT             NOT NULL,
  createdAt                 DATETIME        NOT NULL,
  updatedBy                 INT             NOT NULL,
  updatedAt                 DATETIME        NOT NULL,
  isDeleted                 INT             NOT NULL,
  comment                   VARCHAR(100)    NOT NULL,
  PRIMARY KEY (id),
  INDEX (subjectId)
) ENGINE = InnoDB CHARACTER SET utf8 COLLATE utf8_general_ci COMMENT 'abc 商户信息表';
