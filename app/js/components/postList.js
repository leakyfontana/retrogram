// PostList Component
const PostList = {
  render: function(props) {
    const { posts = [] } = props;
    
    if (posts.length === 0) {
      return '<div class="empty-list">No posts yet</div>';
    }
    
    const listItems = posts.map((post, index) => {
      return `
        <div class="post-item" data-index="${index}">
          <div class="post-header">
            <div class="profile-image">
              <img src="https://via.placeholder.com/150" alt="Profile Image">
            </div>
            <div class="post-user-info">
              <strong>username</strong>
            </div>
          </div>
          
          <img class="post-image" src="${getImageUrl(post)}" alt="Post ${post.id}">
          
          <div class="post-info">
            ${post.location ? `<div class="post-location">${post.location}</div>` : ''}
            <div class="post-timestamp">${formatDate(post.uploadedAt)}</div>
          </div>
        </div>
      `;
    }).join('');
    
    return `
      <div class="post-list">
        ${listItems}
      </div>
    `;
  }
}; 