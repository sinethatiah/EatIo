import { useState, useEffect } from "react"
import useProfile from "./useProfile"

const useRecipes = () => {
  const { profile, loading: profileLoading } = useProfile()
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!profile) return

    const fetchRecipes = async () => {
      const restrictions = profile.restrictions.join(",")
      const key = import.meta.env.VITE_SPOONACULAR_KEY

      const res = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${key}&intolerances=${restrictions}&number=10&addRecipeInformation=true`
      )
      const data = await res.json()
      setRecipes(data.results || [])
      setLoading(false)
    }

    fetchRecipes()
  }, [profile])

  return { recipes, loading: loading || profileLoading }
}

export default useRecipes