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
  const [loading, setLoading] = useState(true)
  const [saved, setSaved] = useState(false)

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

    const checkIfSaved = async () => {
      const ref = doc(db, "users", currentUser.uid)
      const snap = await getDoc(ref)
      if (snap.exists()) {
        const savedRecipes = snap.data().profile.savedRecipes || []
        setSaved(savedRecipes.includes(Number(id)))
      }
    }

    fetchRecipe()
    checkIfSaved()
  }, [id])

  const handleSave = async () => {
    const ref = doc(db, "users", currentUser.uid)
    if (saved) {
      await updateDoc(ref, {
        "profile.savedRecipes": arrayRemove(Number(id))
      })
      setSaved(false)
    } else {
      await updateDoc(ref, {
        "profile.savedRecipes": arrayUnion(Number(id))
      })
      setSaved(true)
    }
  }

  if (loading) return <p className="text-base text-gray-400">Loading...</p>

  return (
    <div className="max-w-2xl">

      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-gray-400 underline"
        >
          ← Back
        </button>
        <button
          onClick={handleSave}
          className={`text-sm px-4 py-2 rounded-lg border transition-all ${
            saved
              ? "bg-black text-white border-black"
              : "bg-white text-gray-400 border-gray-200 hover:border-gray-400"
          }`}
        >
          {saved ? "Saved" : "Save recipe"}
        </button>
      </div>

      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full h-56 object-cover rounded-lg mb-6"
      />

      <h2 className="text-xl font-medium mb-1">{recipe.title}</h2>
      <p className="text-base text-gray-400 mb-6">
        {recipe.readyInMinutes} min · {recipe.servings} servings
      </p>

      <h3 className="text-base font-medium mb-3">Ingredients</h3>
      <div className="flex flex-col gap-2 mb-8">
        {recipe.extendedIngredients.map((ing) => (
          <div key={ing.id} className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0" />
            <p className="text-base text-gray-600">{ing.original}</p>
          </div>
        ))}
      </div>

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