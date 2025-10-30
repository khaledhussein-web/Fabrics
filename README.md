# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


<!-- The database drawing  -->


# 🛒 E-Commerce Schema Diagram (Using Mermaid)

This diagram visualizes the main entities and their relationships.

```mermaid
erDiagram
    CUSTOMER ||--o{ CART : places

    CUSTOMER {
        int id PK
        string name
        string email
    }

    PRODUCT {
        int id PK
        string name
        float price
        int stockQuantity
    }

    CART {
        int id PK
        int customerId FK "CUSTOMER"
        date creationDate
    }

    CART ||--o{ CART_ITEM : contains

    CART_ITEM {
        int id PK
        int cartId FK "CART"
        int productId FK "PRODUCT"
        int quantity
    }

    PRODUCT ||--o{ CART_ITEM : included_in