// TemplateService.js - Simple HTML templating helper
const TemplateService = {
  // Render a template string with data
  render(template, data) {
    // Replace {{variableName}} with actual values
    return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
      return data[key] !== undefined ? data[key] : '';
    });
  },
  
  // Get a template by ID and render it with data
  renderTemplate(templateId, data) {
    const template = document.getElementById(templateId);
    
    if (!template) {
      console.error(`Template not found: ${templateId}`);
      return '';
    }
    
    return this.render(template.innerHTML, data);
  },
  
  // Render a template to an element
  renderToElement(elementId, template, data) {
    const element = document.getElementById(elementId);
    
    if (!element) {
      console.error(`Element not found: ${elementId}`);
      return false;
    }
    
    element.innerHTML = this.render(template, data);
    return true;
  }
};
