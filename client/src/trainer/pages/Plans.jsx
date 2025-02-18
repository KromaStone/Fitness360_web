import { useEffect } from "react"

function Plans() {
    useEffect(() => {
        document.title = 'Plans | Fitness360'
      }, [])
    return (
        <div> trainner Plans</div>
    )
}

export default Plans