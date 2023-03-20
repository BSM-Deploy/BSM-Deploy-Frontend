import { SettingType } from "@/types/Setting";
import { Control, useController } from "react-hook-form";

export default function useGetSettingForm({control}: {control: Control<SettingType>}){
    const { field: name } = useController({
        name: "name",
        control,
    })

    const { field: domainPrefix } = useController({
        name: "domainPrefix",
        control,
    })

    const { field: projectType } = useController({
        name: "projectType",
        control,
    })

    return { name, domainPrefix, projectType }
}