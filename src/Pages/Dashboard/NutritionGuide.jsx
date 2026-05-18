import useProfile from "../../hooks/useProfile"
import { conditions } from "../../data/conditions"
import { goals } from "../../data/goals"

const NutritionGuide = () => {
  const { profile, loading } = useProfile()

  if (loading) return <p className="text-xs text-gray-400">Loading...</p>

  // find the matching condition or goal from data files
  const conditionData = conditions.find(c => profile.conditions.includes(c.id))
  const goalData = goals.find(g => profile.goals.includes(g.id))

  const data = conditionData || goalData

  if (!data) return (
    <div>
      <h2 className="text-sm font-medium mb-1">Your nutrition guide</h2>
      <p className="text-xs text-gray-400">No condition or goal set. Update your profile to get personalised guidance.</p>
    </div>
  )

  return (
    <div className="max-w-md">

      <h2 className="text-sm font-medium mb-1">Your nutrition guide</h2>
      <p className="text-xs text-gray-400 mb-8">Based on: {data.label}</p>

      {/* Eat list */}
      <div className="mb-8">
        <h3 className="text-xs font-medium mb-3">Eat more of</h3>
        <div className="flex flex-col gap-2">
          {data.recommend.map((item) => (
            <div key={item} className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
              <p className="text-xs text-gray-600">{item}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Avoid list */}
      <div className="mb-8">
        <h3 className="text-xs font-medium mb-3">Avoid</h3>
        <div className="flex flex-col gap-2">
          {data.avoid.map((item) => (
            <div key={item} className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
              <p className="text-xs text-gray-600">{item}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tips */}
      {data.tips && data.tips.length > 0 && (
        <div>
          <h3 className="text-xs font-medium mb-3">Tips</h3>
          <div className="flex flex-col gap-2">
            {data.tips.map((tip) => (
              <p key={tip} className="text-xs text-gray-500">— {tip}</p>
            ))}
          </div>
        </div>
      )}

    </div>
  )
}

export default NutritionGuide