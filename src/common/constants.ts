export enum RabbitMQ {
  ProductQueue = 'products',
  CategoryQueue = 'categories',
  BranchQueue = 'branch',
}

export enum ProductMSG {
  CREATE = 'CREATE_PRODUCT',
  FIND_ALL = 'FIND_PRODUCTS',
  FIND_ONE = 'FIND_PRODUCT',
  UPDATE = 'UPDATE_PRODUCT',
  DELETE = 'DELETE_PRODUCT',
}

export enum BranchMSG {
  CREATE = 'CREATE_BRANCH',
  FIND_ALL = 'FIND_BRANCHES',
  FIND_ONE = 'FIND_BRANCH',
  UPDATE = 'UPDATE_BRANCH',
  DELETE = 'DELETE_BRANCH',
}

export enum CategoryMSG {
  CREATE = 'CREATE_CATEGORY',
  FIND_ALL = 'FIND_CATEGORIES',
  FIND_ONE = 'FIND_CATEGORY',
  UPDATE = 'UPDATE_CATEGORY',
  DELETE = 'DELETE_CATEGORY',
}
