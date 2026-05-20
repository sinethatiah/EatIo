import { useState, useEffect } from "react"
import useProfile from "./useProfile"

const useRecipes = () => {
  const { profile, loading: profileLoading } = useProfile()
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!profile) return

    const fetchRecipes = async () => {
      try {
        setLoading(true)

        // Step 1: fetch a general pool of recipes
        const res = await fetch(
          "https://www.themealdb.com/api/json/v1/1/search.php?s="
        )
        const data = await res.json()

        const rawRecipes = data.meals || []

        // Step 2: map into your app format
        let formatted = rawRecipes.map((meal) => ({
          id: meal.idMeal,
          title: meal.strMeal,
          image: meal.strMealThumb,
          readyInMinutes: 30,
          servings: 2,
          category: meal.strCategory?.toLowerCase() || "",
          area: meal.strArea?.toLowerCase() || "",
          instructions: meal.strInstructions?.toLowerCase() || "",
          ingredients: extractIngredients(meal),
        }))

        // Step 3: apply profile-based filtering
        if (profile?.restrictions?.length) {
          const restrictions = profile.restrictions.map((r) =>
            r.toLowerCase()
          )

          formatted = formatted.filter((recipe) => {
            const text = [
              recipe.title,
              recipe.category,
              recipe.area,
              recipe.instructions,
              ...recipe.ingredients,
            ].join(" ")

            // if ANY restriction appears → remove recipe
            return !restrictions.some((r) => text.includes(r))
          })
        }

        setRecipes(formatted)
      } catch (error) {
        console.error("Error fetching recipes:", error)
        setRecipes([])
      } finally {
        setLoading(false)
      }
    }

    fetchRecipes()
  }, [profile])

  return { recipes, loading: loading || profileLoading }
}

export default useRecipes

// Helper: extract ingredients from TheMealDB structure
const extractIngredients = (meal) => {
  const ingredients = []

  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`]
    if (ingredient && ingredient.trim()) {
      ingredients.push(ingredient.toLowerCase())
    }
  }

  return ingredients
}