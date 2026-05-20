import useProfile from "../../Hooks/UseProfile"
import { conditions } from "../../data/conditions"
import { goals } from "../../data/goals"

const NutritionGuide = () => {
  const { profile, loading } = useProfile()

  if (loading) return <p className="text-base text-gray-400">Loading...</p>

  const conditionData = conditions.find(c => profile.conditions.includes(c.id))
  const goalData = goals.find(g => profile.goals.includes(g.id))

  const data = conditionData || goalData

  if (!data) return (
    <div>
      <h2 className="text-lg font-medium mb-1">Your nutrition guide</h2>
      <p className="text-base text-gray-400">No condition or goal set. Update your profile to get personalised guidance.</p>
    </div>
  )

  return (
    <div className="max-w-md">

      <h2 className="text-lg font-medium mb-1">Your nutrition guide</h2>
      <p className="text-base text-gray-400 mb-8">Based on: <span style={{ color: "#9e6b47" }}>{data.label}</span></p>

      {/* Eat list */}
      <div className="mb-8">
        <h3 className="text-base font-medium mb-3">Eat more of</h3>
        <div className="flex flex-col gap-2">
          {data.recommend.map((item) => (
            <div key={item} className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#607a52" }} />
              <p className="text-base text-gray-600">{item}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Avoid list */}
      <div className="mb-8">
        <h3 className="text-base font-medium mb-3">Avoid</h3>
        <div className="flex flex-col gap-2">
          {data.avoid.map((item) => (
            <div key={item} className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-400" />
              <p className="text-base text-gray-600">{item}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tips */}
      {data.tips && data.tips.length > 0 && (
        <div>
          <h3 className="text-base font-medium mb-3">Tips</h3>
          <div className="flex flex-col gap-2">
            {data.tips.map((tip) => (
              <p key={tip} className="text-base" style={{ color: "#9e6b47" }}>— {tip}</p>
            ))}
          </div>
        </div>
      )}

    </div>
  )
}

export default NutritionGuide