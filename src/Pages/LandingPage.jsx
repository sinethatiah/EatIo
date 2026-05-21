import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import useTheme from "../Hooks/UseTheme"

const LandingPage = () => {
  const navigate = useNavigate()
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)
   const { dark, toggle } = useTheme()

  useEffect(() => {
    const fetchRecipes = async () => {
      const res = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=")
      const data = await res.json()
      setRecipes(data.meals?.slice(0, 6) || [])
      setLoading(false)
    }
    fetchRecipes()
  }, [])

  return (
    <div className="bg-background text-foreground min-h-screen">

      {/* Navbar */}
     <div className="flex items-center justify-between px-10 py-5 border-b border-border">
  <div className="flex items-center gap-2">
    <img
      src="/myLogo.png"
      alt="eat.io"
      className="w-12 h-12 rounded-xl"
      style={{ backgroundColor: "#5c3318" }}
    />
    <span className="text-lg font-semibold text-brown">eat.io</span>
  </div>

  <div className="flex items-center gap-4">
    <button
      onClick={toggle}
      className="text-muted-foreground hover:text-brown transition-colors"
    >
      <span className="material-symbols-outlined text-xl">
        {dark ? "light_mode" : "dark_mode"}
      </span>
    </button>

    <button
      onClick={() => navigate("/login")}
      className="text-sm text-muted-foreground hover:text-brown transition-colors"
    >
      Log in
    </button>

    <button
      onClick={() => navigate("/signup")}
      className="text-sm px-4 py-2 rounded-lg text-primary-foreground bg-brown hover:opacity-90 transition-opacity"
    >
      Sign up
    </button>
  </div>
</div>

      {/* Hero */}
      <div className="text-center px-10 py-20">
        <h1 className="text-5xl font-semibold mb-4 text-foreground">
          Eat well, for <span className="text-brown">your</span> body.
        </h1>
        <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
          Recipes tailored to your health conditions, goals, and dietary restrictions. No guesswork.
        </p>
        <button
          onClick={() => navigate("/signup")}
          className="px-8 py-3 rounded-lg text-primary-foreground bg-brown hover:opacity-90 transition-opacity text-base"
        >
          Get started →
        </button>
      </div>

      {/* Recipe showcase */}
      <div className="px-10 pb-16">
        <h2 className="text-xl font-medium mb-2 text-foreground">Explore recipes</h2>
        <p className="text-base text-muted-foreground mb-8">A taste of what's inside.</p>

        {loading ? (
          <p className="text-base text-muted-foreground">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {recipes.map((recipe) => (
              <div
                key={recipe.idMeal}
                className="border border-border rounded-lg p-4 bg-card text-card-foreground"
              >
                <img
                  src={recipe.strMealThumb}
                  alt={recipe.strMeal}
                  className="w-full h-32 object-cover rounded-md mb-3"
                />
                <p className="text-base font-medium mb-1">{recipe.strMeal}</p>
                <p className="text-sm text-muted-foreground">{recipe.strCategory} · {recipe.strArea}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Personalize section */}
      <div className="mx-10 mb-16 rounded-2xl px-10 py-12 text-center bg-secondary">
        <h2 className="text-2xl font-semibold mb-3 text-foreground">
          Want recipes tailored for you?
        </h2>
        <p className="text-base text-muted-foreground mb-8 max-w-sm mx-auto">
          Tell us about your condition, goal, or dietary needs and we'll filter everything to match.
        </p>
        <button
          onClick={() => navigate("/signup")}
          className="px-8 py-3 rounded-lg text-primary-foreground bg-brown hover:opacity-90 transition-opacity text-base"
        >
          Personalise my feed →
        </button>
      </div>

      {/* Footer */}
      <div className="text-center pb-8">
        <p className="text-sm text-muted-foreground">eat.io — eat well, for your body.</p>
      </div>

    </div>
  )
}

export default LandingPage