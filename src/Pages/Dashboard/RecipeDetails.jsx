import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { doc, updateDoc, arrayUnion, arrayRemove, getDoc } from "firebase/firestore"
import { db } from "../../firebase"
import { useAuth } from "../../Context/AuthContext"

const RecipeDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { currentUser } = useAuth()
  const [recipe, setRecipe] = useState(null)
  const [ingredients, setIngredients] = useState([])
  const [loading, setLoading] = useState(true)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const fetchRecipe = async () => {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      )
      const data = await res.json()
      const meal = data.meals[0]
      setRecipe(meal)

      const extracted = []
      for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`]
        const measure = meal[`strMeasure${i}`]
        if (ingredient && ingredient.trim()) {
          extracted.push(`${measure?.trim()} ${ingredient.trim()}`)
        }
      }
      setIngredients(extracted)
      setLoading(false)
    }

    const checkIfSaved = async () => {
      const ref = doc(db, "users", currentUser.uid)
      const snap = await getDoc(ref)
      if (snap.exists()) {
        const savedRecipes = snap.data().profile.savedRecipes || []
        setSaved(savedRecipes.some((r) => r.id === id))
      }
    }

    fetchRecipe()
    checkIfSaved()
  }, [id])

  const handleSave = async () => {
    const ref = doc(db, "users", currentUser.uid)
    const recipeObj = {
      id: recipe.idMeal,
      title: recipe.strMeal,
      image: recipe.strMealThumb,
      category: recipe.strCategory?.toLowerCase() || "",
      area: recipe.strArea?.toLowerCase() || "",
    }

    if (saved) {
      await updateDoc(ref, { "profile.savedRecipes": arrayRemove(recipeObj) })
      setSaved(false)
    } else {
      await updateDoc(ref, { "profile.savedRecipes": arrayUnion(recipeObj) })
      setSaved(true)
    }
  }

  if (loading) return <p className="text-base text-gray-400">Loading...</p>

  const steps = recipe.strInstructions
    ?.split("\n")
    .filter((s) => s.trim().length > 0) || []

  return (
    <div className="max-w-2xl">

      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-gray-400 underline"
          onMouseOver={e => e.target.style.color = "#9e6b47"}
          onMouseOut={e => e.target.style.color = ""}
        >
          ← Back
        </button>
        <button
          onClick={handleSave}
          className="text-sm px-4 py-2 rounded-lg border transition-all"
          style={
            saved
              ? { backgroundColor: "#9e6b47", color: "white", borderColor: "#9e6b47" }
              : { color: "#9e6b47", borderColor: "#9e6b47", backgroundColor: "transparent" }
          }
        >
          {saved ? "Saved" : "Save recipe"}
        </button>
      </div>

      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        className="w-full h-56 object-cover rounded-lg mb-6"
      />

      <h2 className="text-xl font-medium mb-1">{recipe.strMeal}</h2>
      <p className="text-base text-gray-400 mb-6">
        {recipe.strCategory} · {recipe.strArea}
      </p>

      <h3 className="text-base font-medium mb-3">Ingredients</h3>
      <div className="flex flex-col gap-2 mb-8">
        {ingredients.map((ing, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: "#607a52" }} />
            <p className="text-base text-gray-600">{ing}</p>
          </div>
        ))}
      </div>

      <h3 className="text-base font-medium mb-3">Instructions</h3>
      <div className="flex flex-col gap-4">
        {steps.map((step, index) => (
          <div key={index} className="flex gap-3">
            <span className="text-sm shrink-0 mt-0.5" style={{ color: "#9e6b47" }}>{index + 1}.</span>
            <p className="text-base text-gray-600">{step}</p>
          </div>
        ))}
      </div>

    </div>
  )
}

export default RecipeDetail