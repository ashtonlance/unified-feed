# Unified Feed Project

## Overview

Unified Feed is a Next.js application designed to display a feed of posts, leveraging modern web technologies and best practices for efficient, scalable, and maintainable code.

## Getting Started

### Prerequisites

- Node.js
- npm or Yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/ashtonlance/unified-feed
```

2. Install dependencies:

```bash
npm install

# or

yarn install
```

### Running the Development Server

Run the development server using:

```bash
npm run dev
or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application in the browser.

## Environment Variables

To run the project, you need to set up the following environment variables in your `.env.local` file:

- `NEXT_PUBLIC_API_HOST`: The API host URL.
- `NEXT_PUBLIC_USER`: The API user.
- `NEXT_PUBLIC_PASSWORD`: The API password.

These variables are used in the `src/config/index.ts` to configure the application:

```typescript
const config = {
  API_HOST: process.env.NEXT_PUBLIC_API_HOST || "",
  USER: process.env.NEXT_PUBLIC_USER || "",
  PASSWORD: process.env.NEXT_PUBLIC_PASSWORD || "",
};
export default config;
```

## Key Functions

### API Interaction

The `src/utils/api.ts` file contains functions to interact with the API:

- `getAuth()`: Authenticates the user and stores the access token.
- `getFeed(cursor, limit)`: Fetches the feed data.
- `getPostById(postId)`: Retrieves a specific post by ID.

These functions use Axios for HTTP requests and handle authentication using environment variables.

## Technology Choices

- **Next.js**: A React framework that provides features like server-side rendering and static site generation, enhancing performance and SEO.
- **TypeScript**: Adds static typing to JavaScript, improving reliability and maintainability.
- **Tailwind CSS**: A utility-first CSS framework for rapidly building custom designs.
- **Axios**: A promise-based HTTP client for making requests to external APIs, offering features like interceptors, automatic transforms of JSON data, and client-side protection against XSRF.

### Why These Choices?

- **Next.js** simplifies the setup of a modern React application with its powerful built-in features.
- **TypeScript** ensures type safety, which helps catch errors early during development.
- **Tailwind CSS** allows for building responsive designs quickly without leaving your markup.
- **Axios** is used for its robust handling of HTTP requests, ease of use, and ability to intercept requests and responses, which simplifies the process of adding authentication tokens and handling errors globally.

## Deployment

The project is configured for easy deployment on Vercel, a platform made by the creators of Next.js. You can deploy your Next.js app by linking your GitHub repository to Vercel.

For more details on deployment, refer to the [Next.js deployment documentation](https://nextjs.org/docs/deployment).

## Conclusion

Unified Feed leverages modern technologies and practices to provide a robust platform for displaying a feed of posts. By following the setup instructions and understanding the key components, you can effectively develop and extend the application.
