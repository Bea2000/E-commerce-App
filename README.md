# E-commerce

E-commerce is a web application that allows users to create a random shopping cart by fetching products from a dummy JSON API. Users can modify the quantity of items, finalize their purchases, and get shipping quotes. The app checks whether delivery is possible and provides alerts or calculates shipping costs accordingly.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)

## Project Overview

E-commerce provides a simple interface where users can:

1. Generate a random shopping cart.
2. Adjust the quantity of each product in the cart.
3. Finalize their purchase.
4. Get a shipping quote, where the system checks if delivery is possible and provides the cost if it is.

The product information (name, price, description) is fetched from the [dummyjson API](https://dummyjson.com/products), and shipping validation is done based on available stock.

## Features

- **Random Cart Generation**: Create a cart with random items and quantities from the product catalog.
- **Product Details**: Display product information including name, price, and description.
- **Editable Quantities**: Modify the quantity of each item before finalizing the purchase.
- **Shipping Quotes**: Calculate and display shipping costs based on stock availability.
- **Alerts**: Inform the user if delivery is not possible and if random cart was generated.

## Tech Stack

- **Frontend**: Next.js
- **Backend**: Node.js with Express
- **Database**: Sequelize (ORM)
- **Docker**: Containerization for both frontend and backend services

## Prerequisites

- **Docker**: Ensure Docker is installed to run the application in containers.

## Setup Instructions

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/repo-name.git
    cd repo-name
    ```

2. Build and run the Docker containers:

    ```bash
    docker compose up
    ```

3. Access the application at `http://localhost:3000`
