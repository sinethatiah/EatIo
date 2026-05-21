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
        const saved = snap.data().profile.savedRecipes || []
        setRecipes(saved)
      }
      setLoading(false)
    }
    fetchSaved()
  }, [currentUser])

  const handleUnsave = async (e, recipeId) => {
    e.stopPropagation()
    const ref = doc(db, "users", currentUser.uid)
    const recipe = recipes.find((r) => r.id === recipeId)
    await updateDoc(ref, { "profile.savedRecipes": arrayRemove(recipe) })
    setRecipes((prev) => prev.filter((r) => r.id !== recipeId))
  }

  if (loading) return <p className="text-base text-muted-foreground">Loading...</p>

  if (!recipes.length) return (
    <div>
      <h2 className="text-lg font-medium mb-1 text-foreground">Saved recipes</h2>
      <p className="text-base text-muted-foreground">Nothing saved yet. Go to home and save some recipes.</p>
    </div>
  )

  return (
    <div>
      <h2 className="text-lg font-medium mb-8 text-foreground">Saved recipes</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="border border-border rounded-lg p-4 bg-card text-card-foreground"
          >
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-32 object-cover rounded-md mb-3"
            />
            <p className="text-base font-medium mb-1">{recipe.title}</p>
            <p className="text-sm text-muted-foreground mb-3">
              {recipe.category} · {recipe.area}
            </p>

            <div className="flex items-center justify-between">
              <button
                onClick={(e) => handleUnsave(e, recipe.id)}
                className="text-xs px-3 py-1 rounded-lg border bg-brown border-brown text-primary-foreground hover:opacity-80 transition-opacity"
              >
                Remove
              </button>

              <button
                onClick={() => navigate(`/dashboard/recipe/${recipe.id}`)}
                className="text-xs underline text-green hover:text-brown transition-colors"
              >
                View more →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Saved