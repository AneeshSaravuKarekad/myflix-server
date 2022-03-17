<div class='outer-container' style='width: 100%; margin-inline:auto;'>
  
  <p align="center" width="100%" id='top'>
    <img width="33%"  src='./public/myFlixLogo.png'>
  </p

  <div class='heading' style='font-weight: bold'>
    <h3  width="100%" align="center">A minimal movie browsing app made for non-commercial use</h3>
  </div>

  <div class='badges-container' align="center" style='width: 100%; display: flex; justify-content: center; gap: 1rem'>
  
  ![GitHub last commit](https://img.shields.io/github/last-commit/AneeshSaravuKarekad/myflix-server)
  [![License](https://img.shields.io/badge/license-MIT-red)](./LICENSE)
  
  </div>

</div>

<details>
  <Summary>TABLE OF CONTENT</Summary>
  <ol>
    <li>
      <a href='#key-features'>Key Features</a>
    </li>
    <li>
      <a href='#built-with'>Built with</a>
    </li>
    <li>
      <a href='#getting-started'>Getting started</a>
      <ul>
        <li>
          <a href='#prerequisites'>Prerequisites</a>
        </li>
        <li>
          <a href='#installation'>Installation</a>
        </li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#license">License</a></li>
    
  </ol>
</details>

## Key Features:

- Browse for movies using title, genre, directors, actors
- Create, update, and delete account
- Get Movie Details
- Get Director Details
- Get Movie Details
- Get Genre Details
- Get, Add & Remove movies from/to favourites
- Add reviews and ratings for movies

### Built With

- [Bcrypt](https://github.com/kelektiv/node.bcrypt.js#readme) 
- [Body-parser](https://github.com/expressjs/body-parser#readme) 
- [Compression](https://github.com/expressjs/compression#readme) 
- [Cors](https://github.com/expressjs/cors) 
- [Dotenv](https://github.com/motdotla/dotenv) 
- [Express](https://expressjs.com/) 
- [Express-validator](https://express-validator.github.io/docs/) 
- [Helmet](https://helmetjs.github.io/) 
- [Jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) 
- [Mongoose](https://mongoosejs.com/) 
- [Morgan](https://github.com/expressjs/morgan) 
- [Passport](https://www.passportjs.org/) 
- [Passport-jwt](https://www.passportjs.org/packages/passport-jwt/) 
- [Passport-local](https://www.passportjs.org/packages/passport-local/)

- [Nodemon](https://nodemon.io/)


<p align="right">(<a href="#top">back to top</a>)</p>

---

## Getting Started

### Prerequisites

- npm
  ```sh
  npm install npm@latest -g
  ```

  -node
    ```sh
  npm install node@latest -g
  ```


### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/AneeshSaravuKarekad/myflix-server.git
   ```
1. Install NPM packages
   ```sh
   npm install
   ```

<p align="right">(<a href="#top">back to top</a>)</p>

---

## Usage

1. Run the app in developer environment:
  ```sh
  npm run dev
  ```

2. Run the app in production:
- Add a .env property
  ```sh
    NODE_ENV: 'production'
  ```
  ```sh
    npm start
  ```

<p align="right">(<a href="#top">back to top</a>)</p>

---

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>
