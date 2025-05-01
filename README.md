# 🧀💸 CheeseFlow API

**CheeseFlow API** is a robust personal finance API built with **NestJS**, **GraphQL**, **PostgreSQL**, and **TypeORM**. It helps users easily track their income and expenses, organize transactions, and generate detailed reports to better understand their financial health.


## 🚀 Tech Stack

- 🎯 **NestJS** — Progressive Node.js framework for building scalable backend applications
- 🌐 **GraphQL** — Query language for APIs offering more flexibility than REST
- 🐘 **PostgreSQL** — Robust and performant relational database
- 🔄 **TypeORM** — Elegant and complete TypeScript ORM for data management

## 📱 Mobile Application

This API powers the CheeseFlow mobile application. For more information about the mobile app, check out the [mobile repository](https://github.com/boysimon10/cheeseflow-mobile).

## ✨ Features

- **Secure Authentication**  
  Robust authentication system with JWT tokens and secure session management.

- **Transaction Management**  
  Log income and expenses with categories, amounts, dates, and notes. Multi-currency support.

- **Category Management**  
  Create and manage custom categories to better organize transactions.

- **Balance Tracking**  
  View total balance updated in real-time with detailed breakdown.

- **Monthly Reports**  
  Detailed analysis of expenses and income month by month with statistics.

- **Category Analysis**  
  Visualize transactions grouped by category with detailed statistics.

- **Multi-Currency Support**  
  Support for multiple currencies (XOF, EUR, USD, etc.) with automatic conversion.

## 🧠 What I Learned

- **NestJS Architecture & Best Practices**  
  Built a scalable and maintainable backend architecture using NestJS modules, services, and resolvers with dependency injection.

- **GraphQL API Design**  
  Implemented a robust GraphQL API with resolvers, types, and efficient query optimization using DataLoader.

- **TypeORM & PostgreSQL**  
  Mastered database design, relationships, migrations, and advanced querying with TypeORM and PostgreSQL.

- **Authentication & Security**  
  Implemented secure JWT authentication, role-based access control, and input validation.

## 📚 API Documentation

Complete GraphQL API documentation is available in [docs/graphql.api.md](docs/graphql.api.md). It covers:

- Authentication and user management
- Transaction management
- Category management
- Statistics and reports
- Available types and enumerations

## 🛠️ Installation and Setup

1. **Clone the repository**
```bash
git clone https://github.com/boysimon10/cheeseflow-api.git
cd cheeseflow-api
```

2. **Install dependencies**
```bash
npm install
```

3. **Configuration**
   - Create a `.env` file in the project root based on the provided `.env.example` file
   - Configure the necessary environment variables according to your needs:

4. **Start the application**
```bash
# Development mode
npm run start:dev

# Production mode
npm run build
npm run start:prod
```

The API will be accessible at `http://localhost:3000/graphql`

---

## 🔒 Security

- Robust JWT authentication
- Input data validation
- SQL injection protection via TypeORM
- Secure password hashing
- Secure session management

## 🔮 Future Improvements

- 🧪 End-to-end (E2E) testing implementation
- 🔄 GitHub Actions CI/CD workflow
- 🔔 Spending limit notifications
- 💳 Debt tracking and management
- 📈 Debt repayment planning
- 📅 Subscription and recurring payment management
- 🌍 Complete internationalization
- 📱 Push notification support

---

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the project
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request