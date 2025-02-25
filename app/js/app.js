// Main application state
const appState = {
  selectedNavButton: NavButtonEnum.GRID,
  images: [],
  listScrollIndex: null,
};

// App controller
const App = {
  init: function() {
    // Initialize components
    this.bindEvents();
    this.fetchData();
  },

  bindEvents: function() {
    // Listen for navigation changes
    document.addEventListener('navChange', (e) => {
      appState.selectedNavButton = e.detail.button;
      this.render();
    });

    // Listen for scroll to post requests
    document.addEventListener('scrollToPost', (e) => {
      appState.selectedNavButton = NavButtonEnum.LIST;
      appState.listScrollIndex = e.detail.postIndex;
      this.render();
      
      // Wait for rendering to complete, then scroll
      setTimeout(() => {
        const postElement = document.querySelector(`.post-item[data-index="${appState.listScrollIndex}"]`);
        if (postElement) {
          postElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    });
  },

  fetchData: function() {
    // Show loading state
    document.getElementById('main-content').innerHTML = '<div class="loading">Loading images...</div>';
    
    // Fetch images
    ApiService.getAllImages()
      .then(data => {
        appState.images = data;
        this.render();
      })
      .catch(error => {
        console.error('Error loading images:', error);
        document.getElementById('main-content').innerHTML = 
          '<div class="error">Failed to load images. Please try again later.</div>';
      });
  },

  render: function() {
    // Sort posts by date (newest first)
    const sortedPosts = [...appState.images].sort((x, y) => {
      const parsedXDate = new Date(x.uploadedAt);
      const parsedYDate = new Date(y.uploadedAt);
      return parsedYDate.getTime() - parsedXDate.getTime();
    });

    // Render profile header (only for grid view)
    const profileHeaderElement = document.getElementById('profile-header');
    if (appState.selectedNavButton === NavButtonEnum.GRID) {
      profileHeaderElement.innerHTML = ProfileHeader.render({ postCount: appState.images.length });
    } else {
      profileHeaderElement.innerHTML = '';
    }

    // Render navbar
    const navBarElement = document.getElementById('nav-bar');
    navBarElement.innerHTML = NavBar.render({ selectedButton: appState.selectedNavButton });
    NavBar.attachEvents();

    // Render main content based on selected view
    const mainContentElement = document.getElementById('main-content');
    if (appState.selectedNavButton === NavButtonEnum.GRID) {
      mainContentElement.innerHTML = PostGrid.render({ posts: sortedPosts });
      PostGrid.attachEvents();
    } else {
      mainContentElement.innerHTML = PostList.render({ posts: sortedPosts });
    }
  }
};

// Initialize the app when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
  App.init();
}); 