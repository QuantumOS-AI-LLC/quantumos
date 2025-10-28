// Role definitions with defaults
const roles = [
  { id: 'receptionist', name: 'Front Desk Receptionist', icon: '👋', hours: 40, rate: 15 },
  { id: 'ar', name: 'Accounts Receivable', icon: '💰', hours: 30, rate: 22 },
  { id: 'estimator', name: 'Estimator', icon: '📊', hours: 35, rate: 28 },
  { id: 'billing', name: 'Billing Specialist', icon: '🧾', hours: 25, rate: 20 },
  { id: 'hr', name: 'Human Resources', icon: '👥', hours: 20, rate: 25 },
  { id: 'accounting', name: 'Accounting', icon: '📈', hours: 30, rate: 30 },
  { id: 'social', name: 'Social Media Manager', icon: '📱', hours: 15, rate: 18 },
  { id: 'employees', name: 'Number of Employees', icon: '🏢', hours: 1, rate: 0 }
];

// Initialize the calculator
function initCalculator() {
  const container = document.getElementById('roles-container');
  
  roles.forEach(role => {
    const roleCard = createRoleCard(role);
    container.appendChild(roleCard);
  });
  
  // Initial calculation
  calculateCosts();
}

// Create role card with sliders
function createRoleCard(role) {
  const card = document.createElement('div');
  card.className = 'bg-gray-800 rounded-xl p-4 lg:p-6 border-2 border-gray-700 hover:border-indigo-400 transition-all duration-300';
  
  // For "Number of Employees", show different layout
  if (role.id === 'employees') {
    card.innerHTML = `
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center">
          <span class="text-3xl mr-3">${role.icon}</span>
          <div>
            <h3 class="text-lg font-bold text-white">${role.name}</h3>
            <p class="text-sm text-gray-200">Total workforce size</p>
          </div>
        </div>
        <div class="text-right">
          <p class="text-3xl font-bold text-indigo-600" id="${role.id}-count">${role.hours}</p>
          <p class="text-xs text-white">employees</p>
        </div>
      </div>
      
      <div class="space-y-3">
        <div>
          <div class="flex justify-between items-center mb-2">
            <label class="text-sm font-semibold text-gray-200">Number of Employees</label>
          </div>
          <input 
            type="range" 
            id="${role.id}-hours" 
            min="1" 
            max="50" 
            value="${role.hours}" 
            class="w-full h-3 bg-indigo-200 rounded-lg appearance-none cursor-pointer slider"
            oninput="updateRole('${role.id}')"
          />
          <div class="flex justify-between text-xs text-gray-200 mt-1">
            <span>1</span>
            <span>50</span>
          </div>
        </div>
      </div>
    `;
  } else {
    card.innerHTML = `
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center">
          <span class="text-3xl mr-3">${role.icon}</span>
          <div>
            <h3 class="text-lg font-bold text-white">${role.name}</h3>
            <p class="text-sm text-gray-200">
              <span id="${role.id}-hours-display">${role.hours}</span> hrs/week × 
              $<span id="${role.id}-rate-display">${role.rate}</span>/hr
            </p>
          </div>
        </div>
        <div class="text-right">
          <p class="text-2xl font-bold text-indigo-600" id="${role.id}-monthly">$${(role.hours * role.rate * 4.33).toFixed(0)}</p>
          <p class="text-xs text-gray-200">per month</p>
        </div>
      </div>
      
      <div class="space-y-3">
        <div>
          <div class="flex justify-between items-center mb-2">
            <label class="text-sm font-semibold text-gray-200">Hours per Week</label>
          </div>
          <input 
            type="range" 
            id="${role.id}-hours" 
            min="0" 
            max="60" 
            value="${role.hours}" 
            class="w-full h-3 bg-indigo-200 rounded-lg appearance-none cursor-pointer slider"
            oninput="updateRole('${role.id}')"
          />
          <div class="flex justify-between text-xs text-gray-200 mt-1">
            <span>0</span>
            <span>60</span>
          </div>
        </div>
        
        <div>
          <div class="flex justify-between items-center mb-2">
            <label class="text-sm font-semibold text-gray-200">Hourly Rate ($)</label>
          </div>
          <input 
            type="range" 
            id="${role.id}-rate" 
            min="10" 
            max="100" 
            value="${role.rate}" 
            class="w-full h-3 bg-green-200 rounded-lg appearance-none cursor-pointer slider"
            oninput="updateRole('${role.id}')"
          />
          <div class="flex justify-between text-xs text-gray-200 mt-1">
            <span>$10</span>
            <span>$100</span>
          </div>
        </div>
      </div>
    `;
  }
  
  return card;
}

// Update role values
function updateRole(roleId) {
  const hoursInput = document.getElementById(`${roleId}-hours`);
  const rateInput = document.getElementById(`${roleId}-rate`);
  
  const hours = parseInt(hoursInput.value);
  const rate = rateInput ? parseInt(rateInput.value) : 0;
  
  // Update displays
  if (roleId === 'employees') {
    document.getElementById(`${roleId}-count`).textContent = hours;
  } else {
    document.getElementById(`${roleId}-hours-display`).textContent = hours;
    document.getElementById(`${roleId}-rate-display`).textContent = rate;
    
    const monthly = (hours * rate * 4.33).toFixed(0);
    document.getElementById(`${roleId}-monthly`).textContent = `$${monthly}`;
  }
  
  // Recalculate total costs
  calculateCosts();
}

// Calculate and display costs
async function calculateCosts() {
  const roleData = [];
  
  roles.forEach(role => {
    if (role.id !== 'employees') {
      const hours = parseInt(document.getElementById(`${role.id}-hours`).value);
      const rate = parseInt(document.getElementById(`${role.id}-rate`).value);
      
      roleData.push({
        id: role.id,
        name: role.name,
        hours: hours,
        rate: rate
      });
    }
  });
  
  try {
    // const response = await fetch('/api/calculate', {
    const response = await fetch('https://3000-iqcvlqca9mjq59d2n3bh5-82b888ba.sandbox.novita.ai/api/calculate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ roles: roleData })
    });
    
    const result = await response.json();
    
    // Update displays with animation
    animateValue('traditional-cost', result.traditionalCost);
    animateValue('alli-cost', result.alliCost);
    animateValue('savings', result.savings);
    document.getElementById('savings-percent').textContent = `${result.savingsPercent}% saved`;
    document.getElementById('alli-hours').textContent = result.totalAlliHours;
    
  } catch (error) {
    console.error('Calculation error:', error);
  }
}

// Animate number changes
function animateValue(elementId, value) {
  const element = document.getElementById(elementId);
  const formatted = `$${parseFloat(value).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
  element.textContent = formatted;
  
  // Add pulse animation
  element.classList.add('animate-pulse');
  setTimeout(() => {
    element.classList.remove('animate-pulse');
  }, 500);
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCalculator);
} else {
  initCalculator();
}
