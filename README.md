# WTWR (What to Wear?): Front End

The front-end project is focused on creating a responsive and interactive user interface for the WTWR application. The front end communicates with the back-end API to manage user authentication, retrieve clothing recommendations based on weather data, and enable users to add, edit, and like items. My goal is to build an intuitive and user-friendly interface that integrates seamlessly with the back-end API.

## Project Description

The WTWR front-end application provides users with clothing recommendations based on weather conditions. Users can also add their own clothing items, like items, and edit their profiles. The front end interacts with a RESTful API built in Node.js, ensuring dynamic data fetching and updates. This project is structured to deliver a smooth user experience, ensuring that each interaction feels fast and responsive.

## Technologies and Techniques Used

- **React.js**: The application is built using React, providing a component-based architecture that makes the UI modular, reusable, and maintainable.
- **React Router**: Used for handling routing in the app, allowing for dynamic navigation between pages without refreshing the browser.
- **CSS Modules**: Employed for styling components in a modular and reusable way, ensuring that styles are scoped locally and do not affect other components.
- **Fetch API**: Used to make HTTP requests to the back-end API for retrieving weather data, managing user accounts, and performing CRUD operations on clothing items.
- **JWT (JSON Web Tokens)**: Used for authentication, with tokens stored securely in localStorage to maintain session persistence across browser reloads.
- **Context API**: Utilized for state management, particularly for managing global states like user authentication and temperature units (Celsius/Fahrenheit).

## Key Features

- **User Authentication**: Users can sign up, log in, and log out. JWT tokens are used to persist login sessions.
- **Weather-based Recommendations**: The app retrieves the current weather and suggests clothing items accordingly.
- **Add/Edit/Delete Clothing Items**: Users can add new clothing items, edit existing ones, or delete items they no longer want.
- **Liking Items**: Users can like and unlike clothing items, and the app reflects these changes in real time.
- **Profile Management**: Users can edit their profile information, including their avatar and name.
- **Conditional Rendering**: The app conditionally shows default clothing items for new users or when no items have been added yet.

[WTWR Backend Repository](https://github.com/iameddysmith/se_project_express)
