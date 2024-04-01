# Web-page-project
It is a simple web page project for an e-commerce platform using MERN stack (MongoDB, Express, React, Node.js); customer can browse what products we have; add, edit, and delete items from their cart; and search products by names or category. 

**To run this project, you need to follow these three steps: 

We have three seperate files under the project: app, express, and mongodb, we start them one by one: 

1. Start Mango service: open terminal, cd to "bin" file under "mongodb", enter: ./mongod --dbpath ..\mongodata\
   
   you should see a long data runing, after it does not run anything new, go to the next step
   
3. Start Express service: open a new terminal under "express" file, enter: npm start

   you should see something like:
   
> node server.js

Server running on port 5000
Connected to MongoDB

3. Start web page front-end: open a new terminal under "app" file, enter: npm start
   
   you should see something like:

   Compiled successfully!

You can now view trello-frontend in the browser.

After you see this, wait for a few second (or a while, it has a chance to get stuck especially when the internet is unstable)
Then, your browser will pop a new page with web address like: localhost:3000

Then, let's add "/productList" behind the web address, it should be: localhost:3000/productList. 

Confirm the web address, 

you will see the web page now!

**Function of this web page: 
1. User can create and login to the web page with email address and password. After login, they can see their own cart. Click on the email address, they can choose to log out. 
2. Customer can browse what products we have
3. Customer can add, edit, remove items from their shopping cart, and see the total price for their cart. 
4. Customer can search products by searching product's name and category.
5. Customer can browse the product list with product filter criteria: Last added, price: low to high, price: high to low
6. Administrator can edit product information: add and delete product, change the product photo, change the price of the product, change the name and the description of the product, define the category for the product.
   Notice: an user will be defined as administrator if their account email adress have format: admin@ [any mail suffix]

Wish you enjoy the web page!
