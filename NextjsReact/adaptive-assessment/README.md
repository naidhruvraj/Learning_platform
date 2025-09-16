This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.



Running the project:
     *We need to run both frontend server and backend server separately in two different terminals.
     1. Running the backend server:
           * Open new terminal in vscode: ctrl+shift+`

           * Change the current directory to 'NextjsReact' folder where '.env' is located:   eg: cd D:\...\...\NextjsReact

           * Activate the virtual environment:   .venv\Scripts\activate

           * Change the current directory to 'backend' folder where server.py is located:   eg: cd D:\...\...\app\backend

           * Run the server:    uvicorn server:app --host 0.0.0.0 --port 8000 --reload
 
     2. Running the frontend server:
           * Open new terminal in vscode: ctrl+shift+`

           * Change the current directory to 'adaptive-assessment' folder:   eg: cd D:\...\...\adaptive-assessment

           * Run the application: npm run dev
 
 
In the application:

     Student account: 
         just need to signup to land on the dashboard
     
     Teacher account:
         **Only admins can create teacher account**

              * Sign in to clerk dashboard from the admin account:  "https://dashboard.clerk.com/"
              
              * Open the 'Learn&Grow' application --> Users --> Create user
 
              * Create a teacher account by filling the username, mail_id and password

              * Click on the user created --> metadata --> public --> edit
 
              * Clear the current names and type:  
                    {
                      "role": "teacher"
                    }

              * Now sign into the application as a teacher rom the mail_id added