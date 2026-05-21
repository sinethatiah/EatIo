import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { doc, updateDoc, arrayUnion, arrayRemove, getDoc } from "firebase/firestore"
import { db } from "../../firebase"
import { useAuth } from "../../Context/AuthContext"
import useProfile from "../../Hooks/UseProfile"
import useRecipes from "../../Hooks/UseRecipes"

const Home = () => {
  const { profile, loading: profileLoading } = useProfile()
  const { recipes, loading: recipesLoading } = useRecipes()
  const { currentUser } = useAuth()
  const navigate = useNavigate()
  const [savedRecipes, setSavedRecipes] = useState([])

  useEffect(() => {
    const fetchSaved = async () => {
      const ref = doc(db, "users", currentUser.uid)
      const snap = await getDoc(ref)
      if (snap.exists()) {
        setSavedRecipes(snap.data().profile.savedRecipes || [])
      }
    }
    fetchSaved()
  }, [currentUser])

  const handleSave = async (e, recipeId) => {
    e.stopPropagation()
    const ref = doc(db, "users", currentUser.uid)
    const recipe = recipes.find((r) => r.id === recipeId)

    if (savedRecipes.includes(recipeId)) {
      await updateDoc(ref, { "profile.savedRecipes": arrayRemove(recipe) })
      setSavedRecipes((prev) => prev.filter((id) => id !== recipeId))
    } else {
      await updateDoc(ref, { "profile.savedRecipes": arrayUnion(recipe) })
      setSavedRecipes((prev) => [...prev, recipeId])
    }
  }

  if (profileLoading || recipesLoading)
    return <p className="text-base text-muted-foreground">Loading...</p>

  return (
    <div>
      <h2 className="text-lg font-medium mb-1 text-foreground">Welcome back</h2>
      <p className="text-base text-muted-foreground mb-8">
        {profile.intent === "condition"
          ? `Showing recipes safe for: ${profile.conditions[0]}`
          : profile.intent === "goal"
          ? `Showing recipes for: ${profile.goals[0]}`
          : "Showing all recipes"}
      </p>

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
            <p className="text-sm text-muted-foreground mb-3">{recipe.category} · {recipe.area}</p>

            <div className="flex items-center justify-between">
              <button
                onClick={(e) => handleSave(e, recipe.id)}
                className={`text-xs px-3 py-1 rounded-lg border transition-all ${
                  savedRecipes.includes(recipe.id)
                    ? "bg-brown text-primary-foreground border-brown"
                    : "text-brown border-brown hover:opacity-80"
                }`}
              >
                {savedRecipes.includes(recipe.id) ? "Saved" : "Save"}
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

export default Home