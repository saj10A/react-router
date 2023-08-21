import { useEffect } from "react"


const useTitle = (title) => {

    useEffect(() => {
        document.title = `پروژه ریکت | ${title}`; 
    })
}

export default useTitle;