# Eat.IO
This is a platform who's aim is to aid those seeking clarification in their health, as relates to their eating habits. It consists of recipe suggestions tailored to ones own preferences, and also restrictions. It can also be used by those seeking to explore so it is a one stop shop for one and all who love food....and don't we all.

 ## Problem Statement
Time and again we find ourselves wanting to eat well, only to hit a wall. Whether you have a medical condition that limits what you can eat, a health goal you are trying to work towards, or simply no idea what is safe for your body — finding the right recipes is overwhelming. You end up scouring the internet, reading conflicting advice, and still landing on meals that do not work for you.

## Solution
We bring the right recipes to you. Tell us about your condition, your goal, or your dietary restrictions and we do the rest. No more guesswork, no more hours of research. From Crohn's disease to diabetes, from losing weight to building muscle — our platform filters a full recipe collection to match exactly what your body needs, and gives you the nutritional guidance to back it up. All in one place, at the click of a button.

## Features
- **Personalised onboarding** — users select their intent (medical condition, health goal, or explore freely) and the app tailors everything to match
- **Condition-based guidance** — users with conditions like Crohn's disease, diabetes, IBS, or celiac disease get recipes and food guidance specific to their needs
- **Goal-based guidance** — users working towards goals like losing weight, building muscle, or managing cholesterol get matched recipes and tips
- **Filtered recipe feed** — every recipe on the home page is pre-filtered based on the user's restrictions, so nothing unsafe ever appears
- **Nutrition guide** — a dedicated page showing each user's personalised eat and avoid lists, with actionable tips
- **Recipe search** — search the full recipe collection with restrictions still applied in the background
- **Save recipes** — users can save recipes and access them later from the saved page
- **Public explore page** — non-logged-in users can browse and view full recipes before signing up
- **Dark mode** — full light and dark mode support across all pages
- **Google sign-in** — users can sign up and log in with Google




## Technology used
- **React** — frontend framework
- **Firebase Authentication** — user sign-up, login, and Google OAuth
- **Firestore** — stores user profiles, dietary restrictions, and saved recipes
- **TheMealDB API** — recipe data source
- **Tailwind CSS** — styling and layout
- **React Router** — client-side routing and protected routes

## Pages present
1. Landing page
1. Login page
1. Sing up page
1. Dashboard
1. Home page
1. Recipe listing page
1. Recipe Details page
1. Guide page

## Environment Setup

To run this project locally you will need to set up Firebase and the TheMealDB API.
### Firebase Setup

1. Go to [https://console.firebase.google.com](https://console.firebase.google.com) and create a new project
2. In your project, go to **Authentication → Sign-in method** and enable:
   - Email/Password
   - Google
3. Go to **Firestore Database** and create a database in production mode
4. Go to **Project Settings → Your apps** and register a web app
5. Copy the Firebase config and paste it into `src/firebase.js`:

```js
const firebaseConfig = {
  apiKey: "your_api_key",
  authDomain: "your_auth_domain",
  projectId: "your_project_id",
  storageBucket: "your_storage_bucket",
  messagingSenderId: "your_messaging_sender_id",
  appId: "your_app_id",
}
```
### Firestore Data Structure

Each user gets a document in the `users` collection with the following structure:

```
users/{uid}/
  profile: {
    intent: "condition" | "goal" | "explore"
    conditions: ["crohns"]
    goals: ["lose_weight"]
    restrictions: ["dairy", "spicy foods"]
    savedRecipes: [{ id, title, image, category, area }]
  }
```
### TheMealDB API

This project uses [TheMealDB](https://www.themealdb.com/api.php) which is free and requires no API key. The endpoints used are:

- `GET /api/json/v1/1/search.php?s=` — fetch all recipes or search by name
- `GET /api/json/v1/1/lookup.php?i={id}` — fetch a single recipe by id
### Running Locally

After setting up Firebase:
1. npm install
1. npm run dev




## Contributing

Contributions are welcome. If you find a bug or have a feature request, open an issue on GitHub before starting work so it can be discussed first.

1. Fork the repository
2. Clone your fork locally:
```bash
git clone https://github.com/sinethatiah/EatIo.git
```
3. Install dependencies:
```bash
npm install
```
4. Set up Firebase as described in the Environment Setup section above
5. Create a new branch for your feature:
```bash
git checkout -b feature/your-feature
```
6. Make your changes and commit:
```bash
git commit -m "Add your feature"
```
7. Push to your branch:
```bash
git push origin feature/your-feature
```
8. Open a pull request on the original repository

Original repo:
```bash
git clone https://github.com/sinethatiah/EatIo
```
## Licensing
 This project is licensed under the [MIT License](LICENSE) - see the [LICENSE](LICENSE) file for details.
