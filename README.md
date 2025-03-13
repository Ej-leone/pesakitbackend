## About

This project was created with [express-generator-typescript](https://github.com/seanpmaxwell/express-generator-typescript).

**IMPORTANT** for demo purposes I had to disable `helmet` in production. In any real world app you should change these 3 lines of code in `src/server.ts`:
```ts
// eslint-disable-next-line n/no-process-env
if (!process.env.DISABLE_HELMET) {
  app.use(helmet());
}
```

To just this:
```ts
app.use(helmet());
```


## Available Scripts

### `npm run clean-install`

Remove the existing `node_modules/` folder, `package-lock.json`, and reinstall all library modules.


### `npm run dev` or `npm run dev:hot` (hot reloading)

Run the server in development mode.<br/>

**IMPORTANT** development mode uses `swc` for performance reasons which DOES NOT check for typescript errors. Run `npm run type-check` to check for type errors. NOTE: you should use your IDE to prevent most type errors.


### `npm test` or `npm run test:hot` (hot reloading)

Run all unit-tests.


### `npm test -- "name of test file" (i.e. users).`

Run a single unit-test.


### `npm run lint`

Check for linting errors.


### `npm run build`

Build the project for production.


### `npm start`

Run the production build (Must be built first).


### `npm run type-check`

Check for typescript errors.


## Additional Notes

- If `npm run dev` gives you issues with bcrypt on MacOS you may need to run: `npm rebuild bcrypt --build-from-source`. 


## Documentation 

 once the project is running   browser `http://localhost:3000/api-docs/`  to view the documentation 




## Architecture

This project follows a polyrepo architecture, where the frontend and backend are maintained in separate repositories. This approach is particularly beneficial for an e-commerce application for several reasons:

1. **Separation of Concerns**: By keeping the frontend and backend in separate repositories, each can be developed, tested, and deployed independently. This allows teams to focus on their specific areas without interference.

2. **Scalability**: As the application grows, different teams can scale the frontend and backend independently. This is especially useful in e-commerce, where the frontend might need to handle a large number of users, while the backend focuses on processing transactions and managing inventory.

3. **Technology Flexibility**: Different technologies can be used for the frontend and backend. For instance, the frontend could be built with React or Angular, while the backend could use Node.js with Express. This flexibility allows teams to choose the best tools for their specific needs.

4. **Deployment Independence**: Each part of the application can be deployed separately. This means updates to the frontend can be made without affecting the backend and vice versa, reducing downtime and deployment risks.

5. **Improved Collaboration**: Teams can work more effectively by focusing on their specific repositories. This can lead to faster development cycles and more efficient use of resources.

### Clean Architecture for the Backend

The backend of this project is designed using the principles of Clean Architecture, which offers several advantages:

1. **Independence of Frameworks**: The architecture is not tied to any specific framework, allowing for flexibility in choosing or changing frameworks without affecting the core business logic.

2. **Testability**: By organizing code into layers, each with a specific responsibility, the architecture makes it easier to write unit tests for individual components, leading to more reliable and maintainable code.

3. **Separation of Concerns**: The architecture divides the application into layers, such as the domain, application, and infrastructure layers. This separation ensures that business rules are isolated from external concerns like databases and user interfaces.

4. **Ease of Maintenance**: With clear boundaries between layers, changes in one part of the system have minimal impact on others, making the system easier to maintain and evolve over time.

5. **Scalability and Flexibility**: The architecture supports scalability by allowing different parts of the system to be developed and deployed independently. It also provides the flexibility to adapt to changing business requirements.

Overall, the use of Clean Architecture in the backend ensures a robust, maintainable, and scalable system that can adapt to the evolving needs of an e-commerce application.



