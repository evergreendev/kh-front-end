import FieldError from "@/app/components/BlockRenderer/blocks/FormBlock/FieldError";
import {BaseField, Errors} from "@/app/components/BlockRenderer/blocks/FormBlock/types";

export const Text = ({field, errors}: { field: BaseField & {defaultValue?: string | null}, errors: Errors }) => {
    return <div key={field.id}
                className={`${errors?.fieldName === field.name ? "border-2 border-dashed border-red-200" : ""} p-4 flex flex-col flex-wrap`}
                style={{width: `${field.width || "100"}%`}}>
        {errors?.fieldName === field.name ? <FieldError message={errors.message}/> : ""}
        <label className="mr-2 font-opensans font-bold" htmlFor={field.name}>{field.label || field.name} {field.required ? "(required)" : ""}</label>
        <div className="max-w-full">
            <input defaultValue={field.defaultValue||""} className="border-b-2 border-blue-100 p-1 bg-blue-50 w-full" type="text" name={field.name}
                   id={field.name}/>
        </div>

    </div>
}
