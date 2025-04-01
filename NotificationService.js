// NotificationService.js - Notification management
const NotificationService = {
  // Show a notification
  show(message, type = 'info', duration = 5000) {
    console.log(`Showing notification: ${message}`);
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Get or create container
    let container = document.getElementById('notification-container');
    
    if (!container) {
      container = document.createElement('div');
      container.id = 'notification-container';
      container.className = 'notification-container';
      document.body.appendChild(container);
    }
    
    // Add notification to container
    container.appendChild(notification);
    
    // Remove after duration
    setTimeout(() => {
      notification.style.opacity = '0';
      
      // Remove after fade out
      setTimeout(() => {
        if (notification.parentNode) {
          notification.remove();
        }
      }, 300);
    }, duration);
    
    return notification;
  },
  
  // Success notification
  success(message, duration = 5000) {
    return this.show(message, 'success', duration);
  },
  
  // Error notification
  error(message, duration = 7000) {
    return this.show(message, 'error', duration);
  },
  
  // Warning notification
  warning(message, duration = 6000) {
    return this.show(message, 'warning', duration);
  }
};
