// Utility Functions

// Format date for display
function formatDate(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) {
    return 'Today';
  } else if (diffDays === 1) {
    return 'Yesterday';
  } else if (diffDays < 7) {
    return `${diffDays} days ago`;
  } else if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
  } else {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }
}

// Create a custom event
function createCustomEvent(name, detail) {
  return new CustomEvent(name, {
    bubbles: true,
    detail: detail
  });
}

// Convert ArrayBuffer to data URL for images
function arrayBufferToDataURL(buffer, mediaType = 'image/jpeg') {
  // Convert ArrayBuffer to Base64
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  const base64 = window.btoa(binary);
  
  // Create data URL
  return `data:${mediaType};base64,${base64}`;
}

// Helper to handle image data from API
function getImageUrl(image) {
  // If imageData is already a URL (string), return it
  if (typeof image.imageData === 'string') {
    return image.imageData;
  }
  
  // If imageData is an ArrayBuffer, convert it to data URL
  if (image.imageData instanceof ArrayBuffer) {
    return arrayBufferToDataURL(image.imageData, image.mediaType);
  }
  
  // Fallback to placeholder image
  return 'https://via.placeholder.com/400';
} 