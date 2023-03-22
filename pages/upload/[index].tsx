import { useRouter } from "next/router"

export default function Upload(){

    const router = useRouter()

    return(
        <div>
            <span className="text-white">{router.query.index}</span>
        </div>
    )
}