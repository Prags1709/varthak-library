# varthakTech

this TypeScript-based project offers a comprehensive platform for book enthusiasts, enabling them to register, log in securely, create and manage their personal book collections, and explore a wide range of books shared by the community.

**Deploy Link**
- Render website link-> https://varthaktech.onrender.com/
  
**Tech Stacks Used**

<p align = "center">
<img src="https://camo.githubusercontent.com/d737a6008d934c8ffae2d5e58851eed48d6dd7fd7677fadf6de1c5df5ba396b7/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f747970657363726970742d2532333233384230302e7376673f7374796c653d666c61742d737175617265266c6f676f3d74797065736372697074266c6f676f436f6c6f723d7768697465" alt="Typescript" width="105" height="55"/>
<img src="https://user-images.githubusercontent.com/25181517/117447155-6a868a00-af3d-11eb-9cfe-245df15c9f3f.png" alt="js" width="50" height="50"/>
<img src="https://raw.githubusercontent.com/PrinceCorwin/Useful-tech-icons/main/images/nodejs.png" alt="nodejs" width="50" height="50"/>
<img src="https://res.cloudinary.com/kc-cloud/images/f_auto,q_auto/v1651772163/expressjslogo/expressjslogo.webp?_i=AA" alt="express" width="50" height="50"/>
 <img src="https://raw.githubusercontent.com/PrinceCorwin/Useful-tech-icons/main/images/mongodb-leaf.png" alt="mongo" width="50" height="50"/> 
<img src="https://user-images.githubusercontent.com/25181517/121401671-49102800-c959-11eb-9f6f-74d49a5e1774.png" alt="npm" width="50" height="50"/>
  
</p>
<hr>

## Run Locally
### Clone this Project

```
https://github.com/Prags1709/Attryb-assignment.git
```

### Install npm Packages

```javascript
npm i --global
```

### Start ts compiler
```javascript
npx tsc --watch
```

### Go to typescript-src Folder
```javascript
cd typescript-src
```

### Run Server
```javascript
node index.js (or) nodemon index.js
```
### Runs the project in the development mode

http://localhost:4500

## API end points

| METHOD | ENDPOINT | DESCRIPTION | STATUS CODE |
| --- | --- | --- | --- |
| POST | /user/signup | This endpoint allow users to register. | 201 |
| POST | /user/login | This endpoint allow users to login. | 201 |
| POST | /books/ | This endpoint allow users to create a new book only for role "CREATOR"| 201 |
| GET | /books/ | This endpoint return the details books only for role "VIEWER" and "VIWE_ALL" | 200 |
| GET | /books?old=1 | This endpoint allow show books that were created 10 minutes ago and more | 200 |
| GET | /books?new=1 | This endpoint allow show books that were created less then 10 minutes ago | 200 |

### Sample signup input Schema
```javascript
{
  "name": "pragathees",
  "email": "prags@gmail.com",
  "password": "prags@123",
  "role":["CREATOR","VIEWER","VIWE_ALL"]
}
```

### Sample login input Schema
```javascript
{
  "email": "prags@gmail.com",
  "password": "prags@123"
}
```

### Sample Books input Schema
```javascript
{
  "title":"the secret",
  "author": "elon"
}
```

