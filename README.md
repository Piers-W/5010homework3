## Project: shopping-site

**Author:** Zhi Wang

**Description:** 
This is a project based on Vite, using only functional components without class components. The backend is based on Firebase. The main functionality is an online shopping website where you can add, modify, and delete products, as well as add and remove items from the shopping cart.

**Here is the** [**video**](https://youtu.be/dg9TgRVvNCo) **for demo.**

### How to use
You can direcly view the page by [Firebase deploy](https://shoppingcart-16ec2.web.app) 

### clone thisrepository
Make sure you have installed [Node.js](https://nodejs.org/en).

Then install packages:

```plaintext
npm install
```

To run the application locally:

```plaintext
npm run dev
```

### Methods used to build the project

First, following the Professor's recordings, I used Vite and Firebase to create the project. Then I build `App.jsx`, `ShoppingCart.jsx`, `ProductList.jsx`, `Product.jsx`, `CreateProductForm.jsx` and `MyFirebase.js` .

Product.jsx：Displaying product information, adding products to the shopping cart, and rendering three buttons.

ProductList.jsx：Implementing the functionality to display and manage a product list, allowing for addition, deletion, and editing operations on these products.

ShoppingCart.jsx：Displaying the list of products in the shopping cart and calculating and displaying the total price.

CreateProductForm.jsx： user inputs the product's name, price, and image URL, and a submit button is provided to add the product.

MyFirebase.js：Reading the product list from Firebase, creating new products, deleting products, and updating product information.

App.jsx：The main body of the project involves calling various component functions to achieve the following functionalities: displaying the product list, adding new products, editing products, deleting products, pagination, implementing the shopping cart functionality, displaying the total number of products and total number of pages, as well as other features to enhance interactivity

To implement interaction with the database, I learned [Firestore documentation](https://firebase.google.com/docs/firestore?authuser=0&hl=en).

To implement pagination functionality, I learned [Pagination](https://getbootstrap.com/docs/5.3/components/pagination/#overview).

To implement the functionality of editing products, I also consulted ChatGPT 3.5.

> I want to click a button to display a new form where I can edit the corresponding content. What method should I use to achieve this?
GPT： You can use a modal dialog box to collect user input.

Afterwards, I learned about what a modal dialog box is and created a new file `UpdateProduct.jsx`.
UpdateProduct.jsx：Implementing a modal dialog box for updating product information

> How can I make the form interface more beautifully? How should I write the CSS?
GPT provided me with some basic code, and I made modifications based on it.

From this process, I learned how to pop up an interactive dialog box on a webpage, as well as many techniques for enhancing page aesthetics.

### the hardest and more rewarding parts

The most challenging part for me was that I couldn't delete or modify products on the second page, although these operations worked fine on the first page. Initially, there were no error messages, and I didn't have a clear understanding of what the problem was. Even after realizing it was a problem with page navigation, I still didn't know how to solve it. Moreover, the issue was too specific to easily find a solution through searching. I had to make incremental code modifications based on GPT's prompts. Finally, I added a 'refreshProducts' function to update the product list in Firebase after each addition, deletion, or modification, which resolved the issue.

The most rewarding part was learning about the challenges of updating frontend data when interacting with the backend database and understanding how the frontend modifications affect the connected database content. Additionally, I learned valuable lessons about maintaining the mindset and approach to gradually tackle problems for which I initially had no clue how to solve.