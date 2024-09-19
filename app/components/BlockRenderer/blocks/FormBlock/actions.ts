export async function submitPayloadForm(prevState: any, formData: FormData) {
    const dataToSend = Array.from(formData).map((value) => {
        return {
            field: value[0],
            value: value[1],
        }
    })
    try {
        await fetch(`${process.env.NEXT_PUBLIC_PAYLOAD_SERVER_URL}/api/form-submissions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                form: 1,
                submissionData: dataToSend,
            }),
        })

        return {
            message: true,
            error: null
        }

    } catch (err:any) {
        console.warn(err)
        const nodeError: NodeJS.ErrnoException = err
        return {
            message: false,
            error: {
                message: "Something went wrong when submitting the form. Please try again later.",
                fieldName: "all"
            }
        }
    }
}
