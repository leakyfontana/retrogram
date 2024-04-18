import axios from "axios"

const getImage = async (imageName: String): Promise<Uint8Array> => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/images/${imageName}`, {
            responseType: 'arraybuffer' // Set responseType to 'arraybuffer' to receive response as ArrayBuffer
        });
        
        // Convert the response data (which is ArrayBuffer) to Uint8Array
        const uint8Array = new Uint8Array(response.data);
        
        // Return the Uint8Array
        return uint8Array;
    } catch (error) {
        console.error(error)
        throw error;
    }
}

export default getImage;