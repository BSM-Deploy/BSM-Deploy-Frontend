import { SnackbarOrigin } from "@mui/material/Snackbar/Snackbar";


export interface SettingType {
    name: string;
    domainPrefix: string;
    projectType: string;
}

export interface SnackbarType extends SnackbarOrigin {
    open: boolean
}