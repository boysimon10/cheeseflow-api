# CheeseFlow API Documentation

## Authentication

### Login
**Avec variables :**
```graphql
mutation Login($loginInput: LoginUserInput!) {
  login(loginInput: $loginInput) {
    access_token,
    user{
      id
      name
      email
      phone
      currency
      createdAt
      updatedAt
    }
  }
}
```
Variables :
```graphql
{
  "loginInput": {
    "email": "string",
    "password": "string"
  }
}
```

**Sans variables :**
```graphql
mutation {
  login(loginInput: {
    email: "user@example.com",
    password: "yourpassword123"
  }) {
    access_token,
    user {
      id
      name
      email
      phone
      currency
      createdAt
      updatedAt
    }
  }
}
```

### Create User
**Avec variables :**
```graphql
mutation CreateUser($createUserInput: CreateUserInput!) {
  createUser(createUserInput: $createUserInput) {
    id
    name
    email
    phone
    currency
    createdAt
    updatedAt
  }
}
```
Variables :
```graphql
{
  "createUserInput": {
    "name": "string",
    "email": "string",
    "password": "string",
    "phone": "string (optional)",
    "currency": "XOF (default) | EUR | USD ..." # See CurrencyType enum
  }
}
```

**Sans variables :**
```graphql
mutation {
  createUser(createUserInput: {
    name: "John Doe",
    email: "john.doe@example.com",
    password: "securepassword123",
    phone: "+123456789",  // Optional
    currency: "XOF"       // Optional, defaults to XOF
  }) {
    id
    name
    email
    phone
    currency
    createdAt
    updatedAt
  }
}
```

### Get Profile
```graphql
query GetProfile {
  profile {
    id
    name
    email
    phone
    currency
    createdAt
    updatedAt
  }
}
```

## Categories

### Get All Categories
```graphql
query GetCategories {
  categories {
    id
    name
    emoji
    type
    userId
    createdAt
    updatedAt
  }
}
```

### Get Single Category
```graphql
query GetCategory($id: Float!) {
  category(id: $id) {
    id
    name
    emoji
    type
    userId
    createdAt
    updatedAt
  }
}
```

**Sans variables :**
```graphql
query {
  category(id: 1) {
    id
    name
    emoji
    type
    userId
    createdAt
    updatedAt
  }
}
```

### Create Category
**Avec variables :**
```graphql
mutation CreateCategory($createCategoryInput: CreateCategoryInput!) {
  createCategory(createCategoryInput: $createCategoryInput) {
    id
    name
    emoji
    type
  }
}
```
Variables :
```graphql
{
  "createCategoryInput": {
    "name": "string",
    "emoji": "string",
    "type": "EXPENSE | INCOME"
  }
}
```

**Sans variables :**
```graphql
mutation {
  createCategory(createCategoryInput: {
    name: "Alimentation",
    emoji: "📋",
    type: "EXPENSE"
  }) {
    id
    name
    emoji
    type
  }
}
```

### Update Category
**Avec variables :**
```graphql
mutation UpdateCategory($id: Float!, $updateCategoryInput: CreateCategoryInput!) {
  updateCategory(id: $id, updateCategoryInput: $updateCategoryInput) {
    id
    name
    emoji
    type
  }
}
```
Variables :
```graphql
{
  "id": 1,
  "updateCategoryInput": {
    "name": "string",
    "emoji": "string",
    "type": "EXPENSE | INCOME"
  }
}
```

**Sans variables :**
```graphql
mutation {
  updateCategory(
    id: 1,
    updateCategoryInput: {
      name: "Alimentation modifiée",
      emoji: "📋",
      type: "EXPENSE"
    }
  ) {
    id
    name
    emoji
    type
  }
}
```

### Delete Category
**Avec variables :**
```graphql
mutation RemoveCategory($id: Float!) {
  removeCategory(id: $id) {
    id
  }
}
```
Variables :
```graphql
{
  "id": 1
}
```

**Sans variables :**
```graphql
mutation {
  removeCategory(id: 1) {
    id
  }
}
```

## Transactions

### Get All Transactions
**Avec variables :**
```graphql
query GetTransactions($filters: TransactionFilterInput) {
  transactions(filters: $filters) {
    id
    amount
    description
    type
    categoryId
    userId
    date
    createdAt
    updatedAt
    category {
      id
      name
      emoji
      type
    }
  }
}
```
Filters :
```graphql
{
  "filters": {
    "categoryId": "number (optional)",
    "startDate": "DateTime (optional)",
    "endDate": "DateTime (optional)",
    "type": "EXPENSE | INCOME (optional)",
    "limit": "number (optional)",
    "offset": "number (optional)"
  }
}
```

**Sans variables :**
```graphql
query {
  transactions(filters: {
    categoryId: 1,
    startDate: "2023-01-01T00:00:00Z",
    endDate: "2023-12-31T23:59:59Z",
    type: "EXPENSE"
  }) {
    id
    amount
    description
    type
    categoryId
    userId
    date
    createdAt
    updatedAt
    category {
      id
      name
      emoji
      type
    }
  }
}
```

### Get Single Transaction
**Avec variables :**
```graphql
query GetTransaction($id: Float!) {
  transaction(id: $id) {
    id
    amount
    description
    type
    categoryId
    userId
    date
    createdAt
    updatedAt
    category {
      id
      name
      emoji
      type
    }
  }
}
```
Variables :
```graphql
{
  "id": 1
}
```

**Sans variables :**
```graphql
query {
  transaction(id: 1) {
    id
    amount
    description
    type
    categoryId
    userId
    date
    createdAt
    updatedAt
    category {
      id
      name
      emoji
      type
    }
  }
}
```

### Create Transaction
**Avec variables :**
```graphql
mutation CreateTransaction($createTransactionInput: CreateTransactionInput!) {
  createTransaction(createTransactionInput: $createTransactionInput) {
    id
    amount
    description
    type
    categoryId
  }
}
```
Variables :
```graphql
{
  "createTransactionInput": {
    "amount": "number",
    "description": "string",
    "type": "EXPENSE | INCOME",
    "categoryId": "number"
  }
}
```

**Sans variables :**
```graphql
mutation {
  createTransaction(createTransactionInput: {
    amount: 50.75,
    description: "Courses au supermarché",
    type: "EXPENSE",
    categoryId: 1
  }) {
    id
    amount
    description
    type
    categoryId
  }
}
```

### Update Transaction
**Avec variables :**
```graphql
mutation UpdateTransaction($id: Float!, $createTransactionInput: CreateTransactionInput!) {
  updateTransaction(id: $id, createTransactionInput: $createTransactionInput) {
    id
    amount
    description
    type
    categoryId
  }
}
```
Variables :
```graphql
{
  "id": 1,
  "createTransactionInput": {
    "amount": "number",
    "description": "string",
    "type": "EXPENSE | INCOME",
    "categoryId": "number"
  }
}
```

**Sans variables :**
```graphql
mutation {
  updateTransaction(
    id: 1,
    createTransactionInput: {
      amount: 55.25,
      description: "Courses modifiées",
      type: "EXPENSE",
      categoryId: 1
    }
  ) {
    id
    amount
    description
    type
    categoryId
  }
}
```

### Delete Transaction
**Avec variables :**
```graphql
mutation DeleteTransaction($id: Float!) {
  deleteTransaction(id: $id) {
    id
  }
}
```
Variables :
```graphql
{
  "id": 1
}
```

**Sans variables :**
```graphql
mutation {
  deleteTransaction(id: 1) {
    id
  }
}
```

## Statistics

### Get Monthly Expenses
```graphql
query GetMonthlyExpenses {
  monthlyExpenses
}
```

### Get Monthly Incomes
```graphql
query GetMonthlyIncomes {
  monthlyIncomes
}
```

### Get Balance
```graphql
query GetBalance {
  balance
}
```

### Get Expenses By Category
```graphql
query GetExpensesByCategory {
  expensesByCategory {
    categoryId
    categoryName
    amount
  }
}
```

### Get Monthly History
```graphql
query GetMonthlyHistory {
  monthlyHistory {
    month
    expenses
    incomes
    balance
  }
}
```

### Get Current Month History
```graphql
query GetCurrentMonthHistory {
  currentMonthHistory {
    month
    expenses
    incomes
    balance
  }
}
```

## Enums

### TransactionType
- `EXPENSE`
- `INCOME`

### CurrencyType
Available currencies: `XOF` (default), `EUR`, `USD`, `GBP`, `AED`, `AUD`, `BRL`, `CAD`, `CHF`, `CNY`, `DKK`, `EGP`, `GHS`, `HKD`, `INR`, `JPY`, `KES`, `KRW`, `MAD`, `MXN`, `NGN`, `NOK`, `NZD`, `RUB`, `SAR`, `SEK`, `SGD`, `TND`, `XAF`, `ZAR`

## Authentication Notes
- All queries and mutations except `login` and `createUser` require JWT authentication
- Include the JWT token in the Authorization header: `Bearer <token>`