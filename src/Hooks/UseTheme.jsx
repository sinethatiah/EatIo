import { useState, useEffect } from "react"

const useTheme = () => {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem("theme")
    if (stored === "dark") {
      setDark(true)
      document.documentElement.classList.add("dark")
    }
  }, [])

  const toggle = () => {
    if (dark) {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    } else {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    }
    setDark(!dark)
  }

  return { dark, toggle }
}

export default useTheme