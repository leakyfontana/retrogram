const byteArrayToUrl = (imageData: ArrayBuffer, mediaType: string | undefined) => {
          // Create a Blob from the byte array
          const byteArray = new Uint8Array(imageData);
          const blob = new Blob([byteArray], { type: mediaType })
          // Create a Blob URL from the Blob
          return URL.createObjectURL(blob)
}

export default byteArrayToUrl