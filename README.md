# BackEnd-Project
Back end project made during the course. Created with node js and MongoDB.

The project includes a simple frontend homepage to log in and sign up using passport. Once logged in, the user will be able to use the server chat.

Home url: /home

API PATHS:

Use the following paths to interact with the API:

PRODUCTS:

A) To see all the existing products: GET---->  /api/products
B) To get a specific product information (entering MongoDB _ID in :id): GET---->  /api/products/:id
Example ID to test: 63e01e66aa7643a50bd58baa
C) To filter products by a specific category (for example, RAM): GET---->  /api/products/category/:category
D) To add a new product to the database POST---->  /api/products
    Example with needed parameters: 
    {
        "title": "Mechanical Keyboard",
        "price": 35000,
        "thumbnail": "hhttps://cdn3.iconfinder.com/data/icons/google-material-design-icons/48/ic_keyboard_48px-512.png",
        "category": "Keyboard",
        "stock": 8,
        "desc": "New 2023 version.",
        "code": "DFFAGW"
    }
E) To update an existing product information (entering MongoDB _ID in :id): PUT---->  /api/products/:id
  Example ID to test: 63e01e66aa7643a50bd58baa
  Example with needed parameters:
      {
        "title": "Corsair Keyboard",
        "price": 45000,
        "thumbnail": "hhttps://cdn3.iconfinder.com/data/icons/google-material-design-icons/48/ic_keyboard_48px-512.png",
        "category": "Keyboard",
        "stock": 8,
        "desc": "New 2023 version.",
        "code": "DFFAGW"
    }
F) To delete an existing product (entering MongoDB _ID in :id): DELETE---->  /api/products/:id
Example ID to test: 63e01e66aa7643a50bd58baa

CARTS:

A) To see all the existing carts: GET----> /api/cart
B) To get a specific cart's information (entering MongoDB _ID in :id): GET----> /api/cart/:id
Example ID to test: 63e2ddeb1a390a5c33e92251
C) To create a new cart: POST----> /api/cart
  Example with the needed parameters:
    {
        "products": [
            {
                "title": "GPU 16GB",
                "price": 70000,
                "quantity": 1,
                "_id": "632bc7ddfca8eddd942ed30f"
            },
            {
                "title": "Monitor Samsung 200hz 1440p 1MS",
                "price": 200000,
                "quantity": 2,
                "_id": "63decdeb80f7076cc9caf86c"
            }
        ],
        "email": "client@gmail.com",
        "location": "Argentina"
    }
D) To add a product to an existing cart (entering MongoDB _ID in :id): PUT----> /api/cart/:id
  Example ID to test: 63e2ddeb1a390a5c33e92251
  Example with the needed parameters:
    {
        "title": "GPU 16GB",
        "price": 70000,
        "quantity": 1,
        "id":"632bc7ddfca8eddd942ed30f"
    }
E) To delete a product from an existing cart (entering MongoDB _ID in :id): DELETE----> /api/cart/:id/:productid
  Example of ID to test:  cart:63e2ddeb1a390a5c33e92251
                          Product:632bc7ddfca8eddd942ed30f
F) To delete an existing cart (entering MongoDB _ID in :id): DELETE----> /apì/cart/:id

ORDERS:

A) To see all current orders: GET----> /api/order
B) To create a new order (entering a chart's _ID from MongoDB as the parameter): POST----> /apì/order
  Example with the needed parameters:
  {
    "cart":"63e2ddeb1a390a5c33e92251"
  }
  
CHAT:

A) To see all current chat messages: GET----> /api/chat
B) To filter the chat messages by a specific user (entering the user's email to filter): GET----> /api/chat/:user
C) To add a new message to the chat: POST----> /api/chat
  Example with the needed parameters:
  {
    "email":"customer@gmail.com",
    "time":"7/2/2022 - 20:42",
    "message": "Hello!"
  }