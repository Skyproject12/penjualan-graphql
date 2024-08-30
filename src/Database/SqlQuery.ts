const getAllProduct = () => `
  SELECT 
    Product_Code as productCode,
    Product_Name as productName,
    Price as price,
    Currency as currency,
    Discount as discount,
    Dimension as dimention,
    Unit as unit
  FROM product 
`;

const getAllTransactionByUser = (user:any) => `
  SELECT 
    Document_Number as documentNumber,
    Product_Code as productCode,
    Price as price,
    Quantity as quantity,
    Unit as unit,
    Sub_Total as subTotal,
    Currency as currency,
    Document_Code as documentCode,
    User as user
  FROM transaction_detail WHERE user = '${user}' 
`;

const getProductByCode = (productCode: any) => `
  SELECT 
    Product_Code as productCode,
    Product_Name as productName,
    Price as price,
    Currency as currency,
    Discount as discount,
    Dimension as dimention,
    Unit as unit
  FROM product WHERE Product_Code = '${productCode}'
`;

const createUser = (user:any, password:any) => `
  INSERT INTO login
  (user, password) values ('${user}', '${password}')
`;

const createTransactionHeader = (documentCode:any, user:any, total: any, date: any) => `
  INSERT INTO transaction_header
  (document_code, user, total, date) values ('${documentCode}', '${user}', '${total}', '${date}')
`;

const getTransaction = (user: any) => `
  SELECT *
  FROM transaction_header WHERE user = '${user}'
`;

const updateTransactionHeader = (total: any, now:any, user: any) => `
  UPDATE transaction_header 
  SET total = '${total}', date = '${now}'
  WHERE user = '${user}'
`;

const createTransactionDetail = (documentCode:any, documentNumber:any, productCode: any, price: any, qty: any, unit: any, subTotal: any, currency: any, user: any) => `
  INSERT INTO transaction_detail
  (document_code, document_number, product_code, price, quantity, unit, sub_total, currency, user) values ('${documentCode}', '${documentNumber}', '${productCode}', '${price}', ${qty}, '${unit}', '${subTotal}', '${currency}', '${user}')
`;

const getTransactionDetail = (id: any, productCode: any, user: any) => `
  SELECT *
  FROM transaction_detail WHERE product_code = '${productCode}' AND document_number = '${id}' AND user = '${user}'
`;

const checkUserExists = (user: any, password: any) => `
  SELECT *
  FROM login WHERE user = '${user}' AND password = '${password}'
`;

const updateTransactionDetail = (qty: any, subTotal: any, productCode: any, id: any) => `
  UPDATE transaction_detail 
  SET sub_total = '${subTotal}', quantity = '${qty}'
  WHERE product_code = '${productCode}' AND document_number = '${id}'
`;

export default {
  getAllProduct,
  createUser,
  getProductByCode,
  createTransactionHeader,
  getTransaction,
  updateTransactionHeader,
  createTransactionDetail,
  getTransactionDetail,
  updateTransactionDetail,
  checkUserExists,
  getAllTransactionByUser,
}