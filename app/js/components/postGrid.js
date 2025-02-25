// PostGrid Component
const PostGrid = {
  render: function(props) {
    const { posts = [] } = props;
    
    if (posts.length === 0) {
      return '<div class="empty-grid">No posts yet</div>';
    }
    
    const gridItems = posts.map((post, index) => {
      return `
        <div class="grid-item" data-index="${index}">
          <img src="${getImageUrl(post)}" alt="Post ${post.id}">
        </div>
      `;
    }).join('');
    
    return `
      <div class="post-grid">
        ${gridItems}
      </div>
    `;
  },
  
  attachEvents: function() {
    const gridItems = document.querySelectorAll('.grid-item');
    
    gridItems.forEach(item => {
      item.addEventListener('click', function() {
        const index = parseInt(this.getAttribute('data-index'));
        
        // Dispatch custom event to scroll to post in list view
        const event = createCustomEvent('scrollToPost', { postIndex: index });
        document.dispatchEvent(event);
      });
    });
  }
}; 