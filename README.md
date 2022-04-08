# OnlineEntryForm

This project is about create basic entry form.

## Web api

Web api uses entity framework for persistence of filled forms. 
It uses SQLite for storing data in file OnlineForm.db.
The file should be created by migration after first api run automatically.

Web api has one endpoint for post of filled form.
The filled form is persisted and exported into folder exports as json file.
The folder should be created automatically after first form is filled.

## Client

Client is build with ReactJs framework.

It uses typescript for type safety.

For managing requests it uses axios framework in agent.ts file.
For managing form result and validation it uses Formik and Yup.
For managing language simple store was created using mobX.

## Running web api

     cd .\Api\

     dotnet run

## Running client 

    cd .\client-app\
    
    npm start
    
## See exported forms

     cd .\exports
  
     ls or dir
