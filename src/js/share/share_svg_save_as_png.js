// Function to convert SVG to PNG and download it
async function saveSvgAsPng() {
  // Get the SVG element
  const svgElement = document.querySelector('.share_note_svg');
  
  if (!svgElement) {
    console.error('SVG element not found');
    return;
  }

  try {
    // Clone the SVG element to avoid modifying the original
    const clonedSvg = svgElement.cloneNode(true);
    
    // Handle foreignObject elements by converting them to regular SVG text
    const foreignObjects = clonedSvg.querySelectorAll('foreignObject');
    foreignObjects.forEach(foreignObj => {
      const div = foreignObj.querySelector('div[xmlns="http://www.w3.org/1999/xhtml"]');
      if (div) {
        const textDiv = div.querySelector('.svg_note_text');
        if (textDiv) {
          // Create equivalent SVG text elements
          const textElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');
          textElement.setAttribute('x', '140'); // Adjust position as needed
          textElement.setAttribute('y', '150'); // Adjust position as needed
          textElement.setAttribute('font-family', 'Arial');
          textElement.setAttribute('font-size', '30');
          textElement.setAttribute('fill', 'black');
          textElement.setAttribute('text-anchor', 'start');
          textElement.setAttribute('dominant-baseline', 'hanging');
          
          // Split text into lines to handle wrapping
          const textContent = textDiv.textContent || textDiv.innerText;
          const lines = textContent.split('\n');
          
          lines.forEach((line, index) => {
            const tspan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
            tspan.setAttribute('x', '140');
            tspan.setAttribute('dy', index === 0 ? '0' : '1.2em');
            tspan.textContent = line;
            textElement.appendChild(tspan);
          });
          
          // Replace foreignObject with the new text element
          foreignObj.parentNode.replaceChild(textElement, foreignObj);
        }
      }
    });

    // Get the SVG as a string
    const svgData = new XMLSerializer().serializeToString(clonedSvg);
    
    // Encode the SVG data as a data URI
    const svgUrl = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
    
    // Create an image element to draw onto canvas
    const img = new Image();
    
    return new Promise((resolve, reject) => {
      img.onload = function() {
        // Create a canvas element
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Set canvas dimensions to match SVG
        canvas.width = svgElement.width.baseVal.value;
        canvas.height = svgElement.height.baseVal.value;
        
        // Set a white background for the canvas
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw the SVG image onto the canvas
        ctx.drawImage(img, 0, 0);
        
        // Convert canvas to PNG data URL
        const pngUrl = canvas.toDataURL('image/png');
        
        // Create a temporary link to download the PNG
        const downloadLink = document.createElement('a');
        downloadLink.href = pngUrl;
        downloadLink.download = 'stickynote.png';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        
        resolve();
      };
      
      img.onerror = function(error) {
        console.error('Error loading SVG as image:', error);
        reject(error);
      };
      
      // Load the SVG as an image
      img.src = svgUrl;
    });
  } catch (error) {
    console.error('Error converting SVG to PNG:', error);
  }
}

// Add event listener to the save PNG button
document.addEventListener('DOMContentLoaded', function() {
  const savePngButton = document.getElementById('save_SVG_as_PNG_button');
  
  if (savePngButton) {
    savePngButton.addEventListener('click', saveSvgAsPng);
  } else {
    console.warn('Save PNG button not found');
  }
});