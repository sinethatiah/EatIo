import { useState, useEffect } from "react"
import { doc, getDoc } from "firebase/firestore"
import { db } from "../firebase"
import { useAuth } from "../Context/AuthContext"

const useProfile = () => {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const { currentUser } = useAuth()

  useEffect(() => {
    const fetchProfile = async () => {
      const ref = doc(db, "users", currentUser.uid)
      const snap = await getDoc(ref)
      if (snap.exists()) {
        setProfile(snap.data().profile)
      }
      setLoading(false)
    }

    fetchProfile()
  }, [currentUser])

  return { profile, loading }
}

export default useProfile