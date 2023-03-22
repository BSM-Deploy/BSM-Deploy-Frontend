import { SnackbarOrigin } from "@mui/material";

export interface SettingType{
    name: string;
    domainPrefix: string;
    projectType: string;
}

export interface SnackbarType extends SnackbarOrigin{
    open: boolean
}