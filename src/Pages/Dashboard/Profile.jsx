import { useState, useEffect } from "react"
import { doc, updateDoc } from "firebase/firestore"
import { db } from "../../firebase"
import { useAuth } from "../../Context/AuthContext"
import useProfile from "../../Hooks/useProfile"

const Profile = () => {
  const { profile, loading } = useProfile()
  const { currentUser } = useAuth()
  const [restrictions, setRestrictions] = useState([])
  const [custom, setCustom] = useState("")
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (profile) {
      setRestrictions(profile.restrictions || [])
    }
  }, [profile])

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

  const handleSave = async () => {
    await updateDoc(doc(db, "users", currentUser.uid), {
      "profile.restrictions": restrictions
    })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  if (loading) return <p className="text-base text-gray-400">Loading...</p>

  return (
    <div className="max-w-md">

      <h2 className="text-lg font-medium mb-1">Your profile</h2>
      <p className="text-base text-gray-400 mb-8">
        {profile.intent === "condition" ? `Condition: ${profile.conditions[0]}` : profile.intent === "goal" ? `Goal: ${profile.goals[0]}` : "Exploring"}
      </p>

      <h3 className="text-base font-medium mb-3">Foods to avoid</h3>
      <p className="text-base text-gray-400 mb-4">Click a tag to remove it.</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {restrictions.map((item) => (
          <span
            key={item}
            onClick={() => toggle(item)}
            className="cursor-pointer bg-gray-100 text-gray-600 text-base px-3 py-1 rounded-full"
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
          className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-base outline-none"
        />
        <button onClick={addCustom} className="border border-gray-200 rounded-lg px-3 py-2 text-base">
          Add
        </button>
      </div>

      <button
        onClick={handleSave}
        className="w-full bg-black text-white py-2 rounded-lg text-base"
      >
        {saved ? "Saved!" : "Save changes"}
      </button>

    </div>
  )
}

export default Profile