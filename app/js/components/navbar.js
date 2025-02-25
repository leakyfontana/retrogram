// NavBar Component
const NavBar = {
  render: function(props) {
    const { selectedButton } = props;
    
    return `
      <div class="nav-bar">
        <div class="nav-button ${selectedButton === NavButtonEnum.GRID ? 'active' : ''}" data-button="${NavButtonEnum.GRID}">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="3" width="7" height="7"></rect>
            <rect x="14" y="3" width="7" height="7"></rect>
            <rect x="14" y="14" width="7" height="7"></rect>
            <rect x="3" y="14" width="7" height="7"></rect>
          </svg>
        </div>
        <div class="nav-button ${selectedButton === NavButtonEnum.LIST ? 'active' : ''}" data-button="${NavButtonEnum.LIST}">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="8" y1="6" x2="21" y2="6"></line>
            <line x1="8" y1="12" x2="21" y2="12"></line>
            <line x1="8" y1="18" x2="21" y2="18"></line>
            <line x1="3" y1="6" x2="3.01" y2="6"></line>
            <line x1="3" y1="12" x2="3.01" y2="12"></line>
            <line x1="3" y1="18" x2="3.01" y2="18"></line>
          </svg>
        </div>
      </div>
    `;
  },
  
  attachEvents: function() {
    const navButtons = document.querySelectorAll('.nav-button');
    
    navButtons.forEach(button => {
      button.addEventListener('click', function() {
        const buttonValue = parseInt(this.getAttribute('data-button'));
        
        // Dispatch custom event for nav change
        const event = createCustomEvent('navChange', { button: buttonValue });
        document.dispatchEvent(event);
      });
    });
  }
}; 