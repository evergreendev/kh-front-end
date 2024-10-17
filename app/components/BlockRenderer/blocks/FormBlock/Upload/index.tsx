import FieldError from "@/app/components/BlockRenderer/blocks/FormBlock/FieldError";
import {BaseField, Errors} from "@/app/components/BlockRenderer/blocks/FormBlock/types";

const allowedFileDict = {
    Images: "image/jpeg,image/png,image/gif,image/webp",
    Video: "video/*",
    PDF: "application/pdf",
    WordDocs: ".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
}

export const Upload = ({field, errors}: {
    field: BaseField & {
        maxSize?: number | null,
        fileTypes?: ('Images' | 'Video' | 'PDF' | 'WordDocs')[] | null;
    }, errors: Errors
}) => {
    return <div key={field.id}
                className={`${errors?.fieldName === field.name ? "border-2 border-dashed border-red-200" : ""} p-4 flex flex-col flex-wrap`}
                style={{width: `${field.width || "100"}%`}}>
        {errors?.fieldName === field.name ? <FieldError message={errors.message}/> : ""}
        <label className="mr-2 font-opensans font-normal text-sm"
               htmlFor={field.name}>
            {field.label || field.name} {field.required ? "(required field)" : ""} {field.maxSize ? `(max upload size: ${field.maxSize}MB)`:"(max upload size: 25MB)"}
        </label>
        <div className="max-w-full mt-auto">
            <input
                className="border border-stone-300 p-1.5 bg-white rounded w-full"
                type="file"
                name={field.name}
                required={field.required || false}
                accept={field.fileTypes?.map(type => allowedFileDict[type]).join(",")}
                id={field.name}
            />
        </div>

    </div>
}

