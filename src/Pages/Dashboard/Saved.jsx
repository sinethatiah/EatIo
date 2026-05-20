import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { doc, getDoc, updateDoc, arrayRemove } from "firebase/firestore"
import { db } from "../../firebase"
import { useAuth } from "../../Context/AuthContext"

const Saved = () => {
  const { currentUser } = useAuth()
  const navigate = useNavigate()
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSaved = async () => {
      const ref = doc(db, "users", currentUser.uid)
      const snap = await getDoc(ref)
      if (snap.exists()) {
        const savedIds = snap.data().profile.savedRecipes || []

        if (savedIds.length === 0) {
          setLoading(false)
          return
        }

        const key = import.meta.env.VITE_SPOONACULAR_KEY
        const res = await fetch(
          `https://api.spoonacular.com/recipes/informationBulk?apiKey=${key}&ids=${savedIds.join(",")}`
        )
        const data = await res.json()
        setRecipes(data)
      }
      setLoading(false)
    }

    fetchSaved()
  }, [currentUser])

  const handleUnsave = async (e, recipeId) => {
    e.stopPropagation()
    const ref = doc(db, "users", currentUser.uid)
    await updateDoc(ref, {
      "profile.savedRecipes": arrayRemove(recipeId)
    })
    setRecipes((prev) => prev.filter((r) => r.id !== recipeId))
  }

  if (loading) return <p className="text-base text-gray-400">Loading...</p>

  if (recipes.length === 0) return (
    <div>
      <h2 className="text-lg font-medium mb-1">Saved recipes</h2>
      <p className="text-base text-gray-400">Nothing saved yet. Go to home and save some recipes.</p>
    </div>
  )

  return (
    <div className="max-w-2xl">

      <h2 className="text-lg font-medium mb-8">Saved recipes</h2>

      <div className="grid grid-cols-2 gap-4">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            onClick={() => navigate(`/dashboard/recipe/${recipe.id}`)}
            className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:border-gray-400"
          >
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-32 object-cover rounded-md mb-3"
            />
            <p className="text-base font-medium mb-1">{recipe.title}</p>
            <p className="text-sm text-gray-400 mb-3">{recipe.readyInMinutes} min · {recipe.servings} servings</p>

            <button
              onClick={(e) => handleUnsave(e, recipe.id)}
              className="text-xs px-3 py-1 rounded-lg border border-black bg-black text-white hover:bg-gray-800"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

    </div>
  )
}

export default Saved