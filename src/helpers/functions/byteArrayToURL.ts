const byteArrayToUrl = (byteArray: Uint8Array) => {
          // Create a Blob from the byte array
          const blob = new Blob([byteArray], { type: 'image/webp' })
          // Create a Blob URL from the Blob
          return URL.createObjectURL(blob)
}

export default byteArrayToUrl