// API Service
const ApiService = {
  // Base API URL - replace with your actual API URL
  apiUrl: window.API_URL || 'http://localhost:3001',
  
  // Get all images
  getAllImages: async function() {
    try {
      const response = await fetch(`${this.apiUrl}/images`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching images:', error);
      throw error;
    }
  },
  
  // For development/testing, use sample data if no API available
  getSampleData: function() {
    return [
      {
        id: 1,
        fileName: 'sample1.jpg',
        imageData: 'https://picsum.photos/400/400?random=1',
        mediaType: 'image/jpeg',
        uploadedAt: '2023-06-15T10:30:00Z',
        location: 'New York'
      },
      {
        id: 2,
        fileName: 'sample2.jpg',
        imageData: 'https://picsum.photos/400/400?random=2',
        mediaType: 'image/jpeg',
        uploadedAt: '2023-06-14T08:15:00Z',
        location: 'Los Angeles'
      },
      {
        id: 3,
        fileName: 'sample3.jpg',
        imageData: 'https://picsum.photos/400/400?random=3',
        mediaType: 'image/jpeg',
        uploadedAt: '2023-06-13T15:45:00Z',
        location: 'Chicago'
      },
      {
        id: 4,
        fileName: 'sample4.jpg',
        imageData: 'https://picsum.photos/400/400?random=4',
        mediaType: 'image/jpeg',
        uploadedAt: '2023-06-12T12:20:00Z',
        location: 'Miami'
      },
      {
        id: 5,
        fileName: 'sample5.jpg',
        imageData: 'https://picsum.photos/400/400?random=5',
        mediaType: 'image/jpeg',
        uploadedAt: '2023-06-11T09:10:00Z',
        location: 'Seattle'
      },
      {
        id: 6,
        fileName: 'sample6.jpg',
        imageData: 'https://picsum.photos/400/400?random=6',
        mediaType: 'image/jpeg',
        uploadedAt: '2023-06-10T16:30:00Z',
        location: 'Boston'
      }
    ];
  }
};

// For development/testing without a backend, uncomment this line
ApiService.getAllImages = function() {
  return Promise.resolve(this.getSampleData());
}; 