
function animateCountUp(element, endValue, duration = 1000) {
    let startValue = 0;
    const increment = endValue / (duration / 16);
  
    function update() {
      startValue += increment;
      if (startValue >= endValue) {
        element.textContent = endValue;
      } else {
        element.textContent = Math.floor(startValue);
        requestAnimationFrame(update);
      }
    }
  
    requestAnimationFrame(update);
  }
  
  fetch('./data.json')
    .then(response => response.json())
    .then(data => {
      const statsContainer = document.querySelector('.stats');
      let total = 0;
  
      data.forEach(item => {
        total += item.score;
  
        const stat = document.createElement('div');
        stat.classList.add(item.category.toLowerCase());
  
        stat.innerHTML = `
          <div style="display: flex; align-items: center; gap: 10px;">
            <img src="${item.icon}" alt="${item.category}" />
            ${item.category}
          </div>
          <div><strong class="animated-score">0</strong> / 100</div>
        `;
  
        statsContainer.appendChild(stat);
  
        const scoreEl = stat.querySelector('.animated-score');
        animateCountUp(scoreEl, item.score, 1000);
      });
  

      const average = Math.round(total / data.length);
      const scoreDisplay = document.querySelector('.score');
      animateCountUp(scoreDisplay, average, 1000);
    })
    .catch(error => {
      console.error('Error loading data.json:', error);
    });
  
