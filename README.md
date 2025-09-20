************************HOW TO CLONE THE REPOSITORY************************

step 1: cloning of the project
>> git clone https://github.com/naidhruvraj/Learning_platform.git
(Note: make sure the destination folder path do not have space between their names)


step 2: install node modules
>> cd (adaptive-assessment path)
>> npm install
(for node modules creation)


step 3: copy from .env.example to .env.local
>> cp .env.example .env.local
(for creating environmental variables ---secret and api keys to be added)
You have to fill your own API keys
(Note: Ensure you have downloaded MongoDBCompass in your system)


step 4: create .env inside the backend folder
>> cd NextjsReact\\\\adaptive-assessment\\\\app\\\\backend
>> New-Item -Name ".env" -ItemType "file"

(Note: Add the API for Google Gemini and MongoDB inside the file)


step 5: create virtual environment and install python dependencies
>> cd NextjsReact
>> python -m venv .venv
>>.venv\\\\Scripts\\\\activate
>> pip install -r requirements.txt


step 6: install .next modules
>> cd NextjsReact\\\\adaptive-assessment
>> npm run build
(if needed, download the requested dependencies by >>npm install [name])



************************RUNNING THE PROJECT************************

We need to run both frontend server and backend server separately in two different terminals.
  1. Running the backend server:
     
           * Open new terminal in vscode: ctrl+shift+`
     
           * Change the current directory to 'NextjsReact' folder where '.env' is located:   eg: cd D:\...\...\NextjsReact
     
           * Activate the virtual environment:   .venv\Scripts\activate
     
           * Change the current directory to 'backend' folder where server.py is located:   eg: cd D:\...\...\app\backend
     
           * Run the server:    uvicorn server:app --host 0.0.0.0 --port 8000 --reload  
           
  3. Running the frontend server:
     
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
