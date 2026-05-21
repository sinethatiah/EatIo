import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { doc, updateDoc, arrayUnion, arrayRemove, getDoc } from "firebase/firestore"
import { db } from "../../firebase"
import { useAuth } from "../../Context/AuthContext"
import useProfile from "../../Hooks/UseProfile"
import useRecipes from "../../Hooks/UseRecipes"

const Home = () => {
  const { profile, loading: profileLoading } = useProfile()
  const { recipes, loading: recipesLoading, fetchRecipes } = useRecipes()
  const { currentUser } = useAuth()
  const navigate = useNavigate()
  const [savedRecipes, setSavedRecipes] = useState([])
  const [query, setQuery] = useState("")

  useEffect(() => {
    if (!currentUser) return
    const fetchSaved = async () => {
      const ref = doc(db, "users", currentUser.uid)
      const snap = await getDoc(ref)
      if (snap.exists()) {
        setSavedRecipes(snap.data().profile.savedRecipes || [])
      }
    }
    fetchSaved()
  }, [currentUser])

  const handleSearch = () => fetchRecipes(query)

  const handleSave = async (e, recipeId) => {
    e.stopPropagation()
    const ref = doc(db, "users", currentUser.uid)
    const recipe = recipes.find((r) => r.id === recipeId)

    if (savedRecipes.some((r) => r.id === recipeId)) {
      await updateDoc(ref, { "profile.savedRecipes": arrayRemove(recipe) })
      setSavedRecipes((prev) => prev.filter((r) => r.id !== recipeId))
    } else {
      await updateDoc(ref, { "profile.savedRecipes": arrayUnion(recipe) })
      setSavedRecipes((prev) => [...prev, recipe])
    }
  }

  if (profileLoading || recipesLoading)
    return <p className="text-base text-muted-foreground">Loading...</p>

  return (
    <div>
      <div className="flex items-end justify-between mb-6">
        <div>
          <h2 className="text-lg font-medium text-foreground mb-1">Welcome back</h2>
          <p className="text-sm text-muted-foreground">
            {profile.intent === "condition"
              ? `Showing recipes safe for: ${profile.conditions[0]}`
              : profile.intent === "goal"
              ? `Showing recipes for: ${profile.goals[0]}`
              : "Showing all recipes"}
          </p>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Search..."
            className="border border-border rounded-lg px-3 py-2 text-sm outline-none bg-background text-foreground placeholder:text-muted-foreground w-48"
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2 rounded-lg text-primary-foreground bg-brown hover:opacity-90 transition-opacity text-sm"
          >
            Search
          </button>
        </div>
      </div>

      {recipes.length === 0 ? (
        <p className="text-sm text-muted-foreground">No recipes found.</p>
      ) : (
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
                    savedRecipes.some((r) => r.id === recipe.id)
                      ? "bg-brown text-primary-foreground border-brown"
                      : "text-brown border-brown hover:opacity-80"
                  }`}
                >
                  {savedRecipes.some((r) => r.id === recipe.id) ? "Saved" : "Save"}
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
      )}
    </div>
  )
}

export default Home