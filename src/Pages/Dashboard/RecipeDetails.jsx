import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"

const RecipeDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [recipe, setRecipe] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRecipe = async () => {
      const key = import.meta.env.VITE_SPOONACULAR_KEY
      const res = await fetch(
        `https://api.spoonacular.com/recipes/${id}/information?apiKey=${key}`
      )
      const data = await res.json()
      setRecipe(data)
      setLoading(false)
    }

    fetchRecipe()
  }, [id])

  if (loading) return <p className="text-base text-gray-400">Loading...</p>

  return (
    <div className="max-w-2xl">

      <button
        onClick={() => navigate(-1)}
        className="text-sm text-gray-400 underline mb-6 block"
      >
        ← Back
      </button>

      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full h-56 object-cover rounded-lg mb-6"
      />

      <h2 className="text-xl font-medium mb-1">{recipe.title}</h2>
      <p className="text-base text-gray-400 mb-6">
        {recipe.readyInMinutes} min · {recipe.servings} servings
      </p>

      {/* Ingredients */}
      <h3 className="text-base font-medium mb-3">Ingredients</h3>
      <div className="flex flex-col gap-2 mb-8">
        {recipe.extendedIngredients.map((ing) => (
          <div key={ing.id} className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0" />
            <p className="text-base text-gray-600">{ing.original}</p>
          </div>
        ))}
      </div>

      {/* Instructions */}
      <h3 className="text-base font-medium mb-3">Instructions</h3>
      <div className="flex flex-col gap-4">
        {recipe.analyzedInstructions[0]?.steps.map((step) => (
          <div key={step.number} className="flex gap-3">
            <span className="text-sm text-gray-400 shrink-0 mt-0.5">{step.number}.</span>
            <p className="text-base text-gray-600">{step.step}</p>
          </div>
        ))}
      </div>

    </div>
  )
}

export default RecipeDetail