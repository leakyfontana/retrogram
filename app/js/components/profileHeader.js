// ProfileHeader Component
const ProfileHeader = {
  render: function(props) {
    const { postCount = 0 } = props;
    
    return `
      <div class="profile-header">
        <div class="profile-top">
          <div class="profile-image">
            <img src="https://via.placeholder.com/150" alt="Profile Image">
          </div>
          
          <div class="profile-stats">
            <div class="profile-stat">
              <span class="stat-count">${postCount}</span>
              <span class="stat-label">posts</span>
            </div>
            <div class="profile-stat">
              <span class="stat-count">152</span>
              <span class="stat-label">followers</span>
            </div>
            <div class="profile-stat">
              <span class="stat-count">143</span>
              <span class="stat-label">following</span>
            </div>
          </div>
        </div>
        
        <div class="profile-actions">
          <button class="edit-profile-btn">Edit Profile</button>
        </div>
        
        <div class="profile-bio">
          <p><strong>Username</strong></p>
          <p>Bio description goes here. This is a sample bio for the Retrogram profile.</p>
          <p>www.example.com</p>
        </div>
      </div>
    `;
  }
}; 