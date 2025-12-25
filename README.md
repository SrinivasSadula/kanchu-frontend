# 🧧 KANCHU.IN – E-Commerce Platform

Premium artisan products marketplace for kanchu.in

## 🔷 Tech Stack (Full Stack)

| Layer | Technology |
|-------|------------|
| **Frontend** | Angular (latest, standalone components) |
| **Backend** | Node.js + Express |
| **Database** | MySQL |
| **Authentication** | JWT (Admin only) |
| **UI Framework** | Angular Material / Tailwind CSS |
| **Deployment** | Nginx + PM2 / Vercel + Cloud |
| **Domain** | kanchu.in |

## 📂 Project Structure

```
kanchu-frontend/
├── src/
│   ├── app/
│   │   ├── core/
│   │   │   ├── services/          (API calls, shared logic)
│   │   │   └── guards/            (Route guards, auth guards)
│   │   ├── public/
│   │   │   ├── home/              (Landing page)
│   │   │   ├── products/          (Product listing)
│   │   │   ├── product-detail/    (Product detail view)
│   │   │   └── contact/           (Contact page)
│   │   ├── admin/
│   │   │   ├── login/             (Admin login)
│   │   │   ├── dashboard/         (Admin dashboard)
│   │   │   └── manage-products/   (Product CRUD)
│   │   └── app.routes.ts          (Route configuration)
│   └── assets/                    (Images, icons)
└── package.json
```

## 🚀 Development server

To start a local development server, run:

```bash
npm start
```

or 

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
