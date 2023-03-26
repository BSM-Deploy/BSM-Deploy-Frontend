import Header from "@/components/layout/header/Header"
import UploadForm from "@/components/layout/section/upload/uploadForm"
import Sidebar from "@/components/layout/sidebar/Sidebar"
import { useRouter } from "next/router"

export default function Upload(){

    const router = useRouter()

    return(
        <>
            <Header/>
            <Sidebar/>
            <UploadForm/>
        </>
    )
}