

const sendImageToCloudinary = async (data: FormData) => {
    const response = await fetch("http://localhost:8080/process-image", {
        method: "POST",
        body: data,
    });
    return response.json()
}

export { sendImageToCloudinary};