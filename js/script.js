//EFEITO BINARY

document.addEventListener('DOMContentLoaded', function () {
    function applyBinaryEffect(container) {
        const originalText = container.getAttribute('data-text');
        if (!originalText) return;

        let binaryText = '';
        for (let i = 0; i < originalText.length; i++) {
            if (i % 3 === 0) {
                binaryText += originalText[i].charCodeAt(0).toString(2).substring(0, 4);
            } else if (i % 5 === 0) {
                binaryText += '.:';
            } else if (i % 7 === 0) {
                binaryText += '+-';
            } else {
                binaryText += '01';
            }
        }

        const originalArray = originalText.split('');
        const textArray = binaryText.split('');
        while (textArray.length < originalArray.length * 3) {
            textArray.push('0', '1', '.', ':', '+', '-');
        }

        for (let i = 0; i < originalArray.length; i++) {
            const span = document.createElement('span');
            const randomIndex = Math.floor(Math.random() * 5) + (i * 3);
            span.textContent = textArray[randomIndex % textArray.length];
            span.className = 'binary-char';
            span.setAttribute('data-original', originalArray[i]);
            container.appendChild(span);

            if (originalArray[i] === ' ' || originalArray[i] === '.') {
                container.appendChild(document.createTextNode(' '));
            }
        }
    }

    function addHoverEffect() {
        document.addEventListener('mousemove', function (e) {
            document.querySelectorAll('.binary-char').forEach(span => {
                const rect = span.getBoundingClientRect();
                const spanX = rect.left + rect.width / 2;
                const spanY = rect.top + rect.height / 2;
                const distance = Math.sqrt(
                    Math.pow(e.clientX - spanX, 2) +
                    Math.pow(e.clientY - spanY, 2)
                );

                if (distance < 50) {
                    span.textContent = span.getAttribute('data-original');
                    span.classList.add('revealed');
                } else {
                    setTimeout(() => {
                        if (!span.matches(':hover')) {
                            span.textContent = '01+-.:'.charAt(Math.floor(Math.random() * 6));
                            span.classList.remove('revealed');
                        }
                    }, 200);
                }
            });
        });
    }

    document.querySelectorAll('.text-effect-container').forEach(container => {
        applyBinaryEffect(container);
    });

    addHoverEffect();
});


//PONTOS GRID

const container = document.querySelector(".grid-container");

        for (let i = 0; i < 130; i++) {  // Adjust for denser/sparser grid
            const dot = document.createElement("div");
            dot.classList.add("grid-dot");
            container.appendChild(dot);
        }

// Make sure this code runs after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Get references to your elements
  const container = document.querySelector('.background-wrapper'); // Use the wrapper as the container
  const overlay = document.getElementById('overlay');
  
  // Check if elements exist
  if (!container || !overlay) {
    console.error("Required elements not found");
    return;
  }
  

// EFEITO SPOTLIGHT
  // Set initial spotlight size
  let spotlightSize = 200;
  
  // Add direct mousemove listener to the document or a larger container
  document.body.addEventListener('mousemove', function(event) {
    // Get position relative to the container
    const rect = container.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Update the mask properties
    overlay.style.setProperty('--mouse-x', x + 'px');
    overlay.style.setProperty('--mouse-y', y + 'px');
    
    // Apply the spotlight effect
    const maskValue = `radial-gradient(circle ${spotlightSize}px at ${x}px ${y}px, transparent 0, black ${spotlightSize}px)`;
    overlay.style.webkitMaskImage = maskValue;
    overlay.style.maskImage = maskValue;
  });
  
  // Optional - Add listener to adjust spotlight size with scroll wheel
  document.addEventListener('wheel', function(event) {
    if (event.deltaY < 0) {
      spotlightSize = Math.min(spotlightSize + 10, 300);
    } else {
      spotlightSize = Math.max(spotlightSize - 10, 50);
    }
  });
  
  console.log("Spotlight hover script initialized");
});


//INVERT
document.addEventListener('click', () => {
  const body = document.body;
  const currentTheme = body.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  body.setAttribute('data-theme', newTheme);
});

