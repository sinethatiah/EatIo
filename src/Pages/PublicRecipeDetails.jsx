import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import useTheme from "../Hooks/UseTheme"

const PublicRecipeDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { dark, toggle } = useTheme()
  const [recipe, setRecipe] = useState(null)
  const [ingredients, setIngredients] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRecipe = async () => {
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
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
    fetchRecipe()
  }, [id])

  if (loading) return <p className="text-base text-muted-foreground p-10">Loading...</p>

  const steps = recipe.strInstructions?.split("\n").filter((s) => s.trim().length > 0) || []

  return (
    <div className="bg-background text-foreground min-h-screen">

      {/* Navbar */}
      <div className="flex items-center justify-between px-10 py-5 border-b border-border">
        <div className="flex items-center gap-2">
          <img src="/myLogo.png" alt="eat.io" className="w-12 h-12 rounded-xl" style={{ backgroundColor: "#5c3318" }} />
          <span className="text-lg font-semibold text-brown">eat.io</span>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={toggle} className="text-muted-foreground hover:text-brown transition-colors">
            <span className="material-symbols-outlined text-xl">{dark ? "light_mode" : "dark_mode"}</span>
          </button>
          <button onClick={() => navigate("/explore")} className="text-sm text-muted-foreground hover:text-brown transition-colors">Explore</button>
          <button onClick={() => navigate("/login")} className="text-sm text-muted-foreground hover:text-brown transition-colors">Log in</button>
          <button onClick={() => navigate("/signup")} className="text-sm px-4 py-2 rounded-lg text-primary-foreground bg-brown hover:opacity-90 transition-opacity">Sign up</button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-10 py-10">

        <button
          onClick={() => navigate(-1)}
          className="text-sm text-muted-foreground underline hover:text-brown transition-colors mb-6 block"
        >
          ← Back
        </button>

        <img src={recipe.strMealThumb} alt={recipe.strMeal} className="w-full h-56 object-cover rounded-lg mb-6" />

        <h2 className="text-xl font-medium mb-1 text-foreground">{recipe.strMeal}</h2>
        <p className="text-base text-muted-foreground mb-6">{recipe.strCategory} · {recipe.strArea}</p>

        <h3 className="text-base font-medium mb-3 text-foreground">Ingredients</h3>
        <div className="flex flex-col gap-2 mb-8">
          {ingredients.map((ing, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green shrink-0" />
              <p className="text-base text-muted-foreground">{ing}</p>
            </div>
          ))}
        </div>

        <h3 className="text-base font-medium mb-3 text-foreground">Instructions</h3>
        <div className="flex flex-col gap-4 mb-10">
          {steps.map((step, index) => (
            <div key={index} className="flex gap-3">
              <span className="text-sm text-brown shrink-0 mt-0.5">{index + 1}.</span>
              <p className="text-base text-muted-foreground">{step}</p>
            </div>
          ))}
        </div>

        {/* Sign up banner */}
        <div className="rounded-2xl px-8 py-8 text-center bg-secondary">
          <h2 className="text-lg font-semibold mb-2 text-foreground">Like this recipe?</h2>
          <p className="text-base text-muted-foreground mb-6">Sign up to save recipes and get a personalised feed based on your health needs.</p>
          <button
            onClick={() => navigate("/signup")}
            className="px-6 py-2 rounded-lg text-primary-foreground bg-brown hover:opacity-90 transition-opacity text-base"
          >
            Get started →
          </button>
        </div>

      </div>
    </div>
  )
}

export default PublicRecipeDetails