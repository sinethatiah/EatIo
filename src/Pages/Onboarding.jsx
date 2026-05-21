import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { doc, setDoc } from "firebase/firestore"
import { db } from "../firebase"
import { useAuth } from "../Context/AuthContext"
import { conditions } from "../data/conditions"
import { goals } from "../data/goals"

const Onboarding = () => {
  const [step, setStep] = useState(1)
  const [intent, setIntent] = useState("")
  const [selected, setSelected] = useState(null)
  const [restrictions, setRestrictions] = useState([])
  const [custom, setCustom] = useState("")
  const { currentUser } = useAuth()
  const navigate = useNavigate()

  const handleIntent = (value) => {
    setIntent(value)
    if (value === "explore") {
      saveProfile({ intent: value, conditions: [], goals: [], restrictions: [] })
    } else {
      setStep(2)
    }
  }

  const handleConditionOrGoal = (value) => {
    setSelected(value)
    setRestrictions(value.avoid || [])
    setStep(3)
  }

  const toggle = (item) => {
    setRestrictions((prev) =>
      prev.includes(item) ? prev.filter((r) => r !== item) : [...prev, item]
    )
  }

  const addCustom = () => {
    if (custom.trim() && !restrictions.includes(custom.trim())) {
      setRestrictions((prev) => [...prev, custom.trim()])
      setCustom("")
    }
  }

  const handleComplete = () => {
    const profile = {
      intent,
      conditions: intent === "condition" ? [selected.id] : [],
      goals: intent === "goal" ? [selected.id] : [],
      restrictions,
    }
    saveProfile(profile)
  }

  const saveProfile = async (profile) => {
    await setDoc(doc(db, "users", currentUser.uid), { profile })
    navigate("/dashboard")
  }

  const intents = [
    { id: "condition", label: "I have a medical condition", description: "e.g. Crohn's, diabetes, celiac disease" },
    { id: "goal", label: "I have a health goal", description: "e.g. lose weight, build muscle, eat healthier" },
    { id: "explore", label: "I just want to explore", description: "No restrictions, show me everything" },
  ]

  return (
    <div className="max-w-sm mx-auto mt-20 px-4 bg-background text-foreground">

      <h1 className="text-2xl font-semibold mb-1 text-brown">eat.io</h1>
      <p className="text-muted-foreground text-base mb-10">
        Step {step} of {intent === "" || intent === "explore" ? 1 : 3}
      </p>

      {step === 1 && (
        <div>
          <h2 className="text-lg font-medium mb-1 text-foreground">What brings you here?</h2>
          <p className="text-muted-foreground text-base mb-4">We'll use this to personalise your experience.</p>
          <div className="flex flex-col gap-2">
            {intents.map((intent) => (
              <button
                key={intent.id}
                onClick={() => handleIntent(intent.id)}
                className="border border-border rounded-lg p-3 text-left hover:border-brown transition-colors bg-card"
              >
                <p className="text-base text-foreground">{intent.label}</p>
                <p className="text-sm text-muted-foreground mt-0.5">{intent.description}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && intent === "condition" && (
        <div>
          <h2 className="text-lg font-medium mb-1 text-foreground">Select your condition</h2>
          <p className="text-muted-foreground text-base mb-4">We'll filter recipes and guidance to match.</p>
          <div className="flex flex-col gap-2">
            {conditions.map((condition) => (
              <button
                key={condition.id}
                onClick={() => handleConditionOrGoal(condition)}
                className="border border-border rounded-lg p-3 text-left text-base hover:border-brown transition-colors bg-card text-foreground"
              >
                {condition.label}
              </button>
            ))}
          </div>
          <button onClick={() => setStep(1)} className="text-sm text-muted-foreground mt-4 underline hover:text-brown transition-colors">← Back</button>
        </div>
      )}

      {step === 2 && intent === "goal" && (
        <div>
          <h2 className="text-lg font-medium mb-1 text-foreground">What's your goal?</h2>
          <p className="text-muted-foreground text-base mb-4">We'll recommend recipes that support where you're headed.</p>
          <div className="flex flex-col gap-2">
            {goals.map((goal) => (
              <button
                key={goal.id}
                onClick={() => handleConditionOrGoal(goal)}
                className="border border-border rounded-lg p-3 text-left text-base hover:border-brown transition-colors bg-card text-foreground"
              >
                {goal.label}
              </button>
            ))}
          </div>
          <button onClick={() => setStep(1)} className="text-sm text-muted-foreground mt-4 underline hover:text-brown transition-colors">← Back</button>
        </div>
      )}

      {step === 3 && (
        <div>
          <h2 className="text-lg font-medium mb-1 text-foreground">Foods to avoid</h2>
          <p className="text-muted-foreground text-base mb-4">Pre-filled based on your profile. Remove or add anything.</p>

          <div className="flex flex-wrap gap-2 mb-4">
            {restrictions.map((item) => (
              <span
                key={item}
                onClick={() => toggle(item)}
                className="cursor-pointer bg-secondary text-brown text-base px-3 py-1 rounded-full hover:opacity-80 transition-opacity"
              >
                {item} ✕
              </span>
            ))}
          </div>

          <div className="flex gap-2 mb-6">
            <input
              type="text"
              value={custom}
              onChange={(e) => setCustom(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addCustom()}
              placeholder="Add something..."
              className="flex-1 border border-border rounded-lg px-3 py-2 text-base outline-none bg-background text-foreground placeholder:text-muted-foreground"
            />
            <button
              onClick={addCustom}
              className="border border-brown text-brown rounded-lg px-3 py-2 text-base hover:opacity-80 transition-opacity"
            >
              Add
            </button>
          </div>

          <button
            onClick={handleComplete}
            className="w-full bg-brown text-primary-foreground py-2 rounded-lg text-base hover:opacity-90 transition-opacity"
          >
            Continue
          </button>
          <button
            onClick={() => setStep(2)}
            className="text-sm text-muted-foreground mt-3 underline block hover:text-brown transition-colors"
          >
            ← Back
          </button>
        </div>
      )}

    </div>
  )
}

export default Onboarding