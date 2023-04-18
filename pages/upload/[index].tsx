import Header from "@/components/layout/header/Header"
import UploadForm from "@/components/layout/section/upload/uploadForm"
import Sidebar from "@/components/layout/sidebar/Sidebar"
import ErrorSnackbar from "@/components/snackbar/errorSnackbar"

export default function Upload(){

    return(
        <>
            <Header/>
            <Sidebar/>
            <UploadForm/>
            <ErrorSnackbar />
        </>
    )
}