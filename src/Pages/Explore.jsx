import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import useTheme from "../Hooks/UseTheme"

const Explore = () => {
  const navigate = useNavigate()
  const { dark, toggle } = useTheme()
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState("")

  useEffect(() => {
    fetchRecipes("")
  }, [])

  const fetchRecipes = async (search) => {
    setLoading(true)
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
    const data = await res.json()
    setRecipes(data.meals || [])
    setLoading(false)
  }

  const handleSearch = () => fetchRecipes(query)

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
          <button onClick={() => navigate("/explore")} className="text-sm text-brown font-medium">Explore</button>
          <button onClick={() => navigate("/login")} className="text-sm text-muted-foreground hover:text-brown transition-colors">Log in</button>
          <button onClick={() => navigate("/signup")} className="text-sm px-4 py-2 rounded-lg text-primary-foreground bg-brown hover:opacity-90 transition-opacity">Sign up</button>
        </div>
      </div>

      <div className="px-10 py-10">

        {/* Header row */}
        <div className="flex items-end justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-foreground mb-1">Explore recipes</h1>
            <p className="text-sm text-muted-foreground">Browse our full collection.</p>
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

        {/* Personalise strip */}
        <div className="flex items-center justify-between bg-secondary rounded-xl px-5 py-3 mb-8">
          <p className="text-sm text-muted-foreground">Want recipes tailored to your health needs?</p>
          <button
            onClick={() => navigate("/signup")}
            className="text-sm px-4 py-2 rounded-lg text-primary-foreground bg-brown hover:opacity-90 transition-opacity shrink-0 ml-4"
          >
            Get started →
          </button>
        </div>

        {/* Recipe grid */}
        {loading ? (
          <p className="text-sm text-muted-foreground">Loading...</p>
        ) : recipes.length === 0 ? (
          <p className="text-sm text-muted-foreground">No recipes found.</p>
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
                <p className="text-sm text-muted-foreground mb-3">{recipe.strCategory} · {recipe.strArea}</p>
                <button
                  onClick={() => navigate(`/recipe/${recipe.idMeal}`)}
                  className="text-xs underline text-green hover:text-brown transition-colors"
                >
                  View more →
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  )
}

export default Explore