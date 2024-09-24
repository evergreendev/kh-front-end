import FieldError from "@/app/components/BlockRenderer/blocks/FormBlock/FieldError";
import {BaseField, Errors} from "@/app/components/BlockRenderer/blocks/FormBlock/types";
import ReactSelect from 'react-select'
import {stateOptions} from "@/app/components/BlockRenderer/blocks/FormBlock/State/options";
import NeedsWindow from "@/app/components/NeedsWindow";

export const State = ({field, errors}: { field: BaseField, errors: Errors }) => {
    return <div key={field.id}
                className={`${errors?.fieldName === field.name ? "border-2 border-dashed border-red-200" : ""} p-4 flex flex-col flex-wrap`}
                style={{width: `${field.width || "100"}%`}}>
        {errors?.fieldName === field.name ? <FieldError message={errors.message}/> : ""}
        <label className="mr-2 font-opensans font-normal text-sm" htmlFor={field.name}>{field.label || field.name} {field.required ? "(required)" : ""}</label>
        <div className="w-96 max-w-full mt-auto">
            <NeedsWindow>
                <ReactSelect
                    id={field.name}
                    name={field.name}
                    isClearable={!field.required}
                    required={field.required || false}
                    instanceId={field.name}
                    options={stateOptions}
                    inputId={field.name}
                    isSearchable
                />
            </NeedsWindow>
        </div>
    </div>
}
