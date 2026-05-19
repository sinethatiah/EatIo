import { useNavigate } from "react-router-dom"
import useProfile from "../../Hooks/useProfile"
import useRecipes from "../../hooks/useRecipes"

const Home = () => {
  const { profile, loading: profileLoading } = useProfile()
  const { recipes, loading: recipesLoading } = useRecipes()
  const navigate = useNavigate()

  if (profileLoading || recipesLoading) return <p className="text-base text-gray-400">Loading...</p>

  return (
    <div className="max-w-2xl">

      <h2 className="text-lg font-medium mb-1">Welcome back</h2>
      <p className="text-base text-gray-400 mb-8">
        {profile.intent === "condition"
          ? `Showing recipes safe for: ${profile.conditions[0]}`
          : profile.intent === "goal"
          ? `Showing recipes for: ${profile.goals[0]}`
          : "Showing all recipes"}
      </p>

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
            <p className="text-base font-medium">{recipe.title}</p>
            <p className="text-sm text-gray-400 mt-1">{recipe.readyInMinutes} min · {recipe.servings} servings</p>
          </div>
        ))}
      </div>

    </div>
  )
}

export default Home