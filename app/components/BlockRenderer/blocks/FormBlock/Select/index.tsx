import FieldError from "@/app/components/BlockRenderer/blocks/FormBlock/FieldError";
import {BaseField, Errors} from "@/app/components/BlockRenderer/blocks/FormBlock/types";
import ReactSelect from 'react-select'

export const Select = ({field, errors}: {
    field: BaseField & {
        defaultValue?: string | null,
        options?: { label: string, value: string, id?: string | null }[] | null
    },
    errors: Errors
}) => {
    const defaultOption = field.options?.find(x => x.value === field.defaultValue)
    return <div key={field.id}
                className={`${errors?.fieldName === field.name ? "border-2 border-dashed border-red-200" : ""} p-4 flex flex-col flex-wrap`}
                style={{width: `${field.width || "100"}%`}}>
        {errors?.fieldName === field.name ? <FieldError message={errors.message}/> : ""}
        <label className="mr-2 font-opensans font-normal text-sm" htmlFor={field.name}>{field.label || field.name} {field.required ? "(required)" : ""}</label>
        <div className="w-96 max-w-full mt-auto">
            <ReactSelect
                id={field.name}
                name={field.name}
                isClearable={!field.required}
                defaultValue={defaultOption || "Select"}
                required={field.required || false}
                instanceId={field.name}
                options={field.options || []}
                inputId={field.name}
                isSearchable
            />
        </div>

    </div>
}
