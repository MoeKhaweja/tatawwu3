<img src="./readme/title1.svg"/>

<br><br>

<!-- project philosophy -->
<img src="./readme/title2.svg"/>

> A mobile app for finding volunteering oppurtunities based on skills, making it easier for volunteers and communities/organizations to connect.
>
> Tatawwu3 aims to simplify the process of volunteering by providing a user-friendly platform for volunteers to apply for opputunities, and for communities/organizations to find suitable volunteers.

### User Stories

  <h4>As a Volunteer:</h4>
  <ul>
  <li>I want to be able to create my profile by uploading nessesary documents, so that I don't waste time on manually creating my profile.</li>
  <li>I want to be able to find oppurtunities based on my skill/experience, so that I can help with what I'm best at.</li>
    <li>I want to be able to chat with other volunteers in chat rooms, so that I can stay connected with people with similar interests.</li>
</ul>

<h4>As an Organization:</h4>
<ul>
  <li>I want to be able to find volunteers efficiently, so that I can make sure my events run smoothly on time.</li>
  <li>I want to be able to add events and manage applicants, so that I can organize my events precisely.</li>
  <li>I want to be able to create chat rooms for my volunteers, so that I can leave a good impact on youth.</li>
</ul>
<h4>As an Admin:</h4>
<ul>
  <li>I want to be able to approve or deny users registering for the app, so that I can verify their identities.</li>
  <li>I want to be able to monitor general information on a dashboard, so that I can keep track of app.
</li>
</ul>
<br><br>

<!-- Tech stack -->
<img src="./readme/title3.svg"/>

### Tatawwu3 is built using the following technologies:

- This project uses [React](https://react.dev/) for the admin dashboard. React is a JavaScript library for building user interfaces, it is used to build single-page applications, and it allows us to create reusable UI components.
- This project uses [React Native](https://reactnative.dev/) with [Expo](https://expo.dev/) for the frontend. React Native is a cross-platform hybrid app development platform which allows us to use a single codebase for apps on mobile, desktop, and the web.
- For persistent storage (database), the app uses [MongoDB Atlas](https://www.mongodb.com/) which is a fully-managed cloud database that handles all the complexity of deploying, managing, and healing our deployments on the cloud.
- As a backend, the app uses [Node.js](https://nodejs.org/en) with [Express.js](https://nodejs.org/en), Express JS is a small framework that works on top of Node web server functionality to simplify its APIs and add helpful new features. It makes it easier to organize your application’s functionality with middleware and routing.
- The app uses [Socket.io](https://socket.io/) for real time chats, Socket.IO is an event-driven library for real-time web applications. It enables real-time, bi-directional communication between web clients and servers. 
- The app also relies heavily on [Google Gemini AI](https://ai.google.dev/docs) which is Google's largest and most capable AI model, in our app it is used to:
  <ul><li>Analyze every user's resume and return specific data based on prompt engineering</li> 
  <li>Recommend events for volunteers using vector embeddings</li> 
  <li>Allow users to search semantically over events or volunteers, based on skills or targeted skills using vector embeddings</li> </ul>
<br><br>

<!-- UI UX -->
<img src="./readme/title4.svg"/>

> We designed Tatawwu3 using wireframes and mockups, iterating on the design until we reached the ideal layout for easy navigation and a seamless user experience.

- Project Figma design [figma](https://www.figma.com/file/7X4q4csvnqkHpUb2iipfej/Tatawwu3?type=design&node-id=20%3A3220&mode=design&t=ZlyIql4yj3VNkuNU-1)

### Mockups

| Home screen                             | Menu Screen                           | Order Screen                          |
| --------------------------------------- | ------------------------------------- | ------------------------------------- |
| ![Landing](./readme/demo/1440x1024.png) | ![fsdaf](./readme/demo/1440x1024.png) | ![fsdaf](./readme/demo/1440x1024.png) |

<br><br>

<!-- Database Design -->
<img src="./readme/title5.svg"/>

### Architecting Data Excellence: Innovative Database Design Strategies:

- Insert ER Diagram here

<br><br>

<!-- Implementation -->
<img src="./readme/title6.svg"/>

### User Screens (Mobile)

| Login screen                              | Register screen                         | Landing screen                          | Loading screen                          |
| ----------------------------------------- | --------------------------------------- | --------------------------------------- | --------------------------------------- |
| <img width="900" height="1600"  src="./readme/demo/Screenshot_20240129_010857_Expo Go.jpg"/> | <img width="900" height="1600"   src="./readme/demo/Screenshot_20240129_025730_Expo Go.jpg"/> | <img  width="900" height="1600" src="./readme/demo/Screenshot_20240129_030016_Expo Go.jpg"/>(https://placehold.co/900x1600) |
| Home screen                               | Menu Screen                             | Order Screen                            | Checkout Screen                         |
| ![Landing](https://placehold.co/900x1600) | ![fsdaf](https://placehold.co/900x1600) | ![fsdaf](https://placehold.co/900x1600) | ![fsdaf](https://placehold.co/900x1600) |

### Admin Screens (Web)

| Login screen                            | Register screen                       | Landing screen                        |
| --------------------------------------- | ------------------------------------- | ------------------------------------- |
| ![Landing](./readme/demo/1440x1024.png) | ![fsdaf](./readme/demo/1440x1024.png) | ![fsdaf](./readme/demo/1440x1024.png) |
| Home screen                             | Menu Screen                           | Order Screen                          |
| ![Landing](./readme/demo/1440x1024.png) | ![fsdaf](./readme/demo/1440x1024.png) | ![fsdaf](./readme/demo/1440x1024.png) |

<br><br>

<!-- Prompt Engineering -->
<img src="./readme/title7.svg"/>

### Mastering AI Interaction: Unveiling the Power of Prompt Engineering:

- This project uses advanced prompt engineering techniques to optimize the interaction with natural language processing models. By skillfully crafting input instructions, we tailor the behavior of the models to achieve precise and efficient language understanding and generation for various tasks and preferences.

<br><br>

<!-- AWS Deployment -->
<img src="./readme/title8.svg"/>

### Efficient AI Deployment: Unleashing the Potential with AWS Integration:

- This project leverages AWS deployment strategies to seamlessly integrate and deploy natural language processing models. With a focus on scalability, reliability, and performance, we ensure that AI applications powered by these models deliver robust and responsive solutions for diverse use cases.

<br><br>

<!-- Unit Testing -->
<img src="./readme/title9.svg"/>

### Precision in Development: Harnessing the Power of Unit Testing:

- This project employs rigorous unit testing methodologies to ensure the reliability and accuracy of code components. By systematically evaluating individual units of the software, we guarantee a robust foundation, identifying and addressing potential issues early in the development process.

<br><br>

<!-- How to run -->
<img src="./readme/title10.svg"/>

> To set up Coffee Express locally, follow these steps:

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.

- npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

_Below is an example of how you can instruct your audience on installing and setting up your app. This template doesn't rely on any external dependencies or services._

1. Get a free API Key at [example](https://example.com)
2. Clone the repo
   git clone [github](https://github.com/your_username_/Project-Name.git)
3. Install NPM packages
   ```sh
   npm install
   ```
4. Enter your API in `config.js`
   ```js
   const API_KEY = "ENTER YOUR API";
   ```

Now, you should be able to run Coffee Express locally and explore its features.
