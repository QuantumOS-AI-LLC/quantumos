// Role definitions with defaults - now includes employee count for each role
const roles = [
    { id: 'receptionist', name: 'Front Desk Receptionist', icon: '👋', employees: 1, hours: 40, rate: 15 },
    { id: 'ar', name: 'Accounts Receivable', icon: '💰', employees: 1, hours: 30, rate: 22 },
    { id: 'estimator', name: 'Estimator', icon: '📊', employees: 1, hours: 35, rate: 28 },
    { id: 'billing', name: 'Billing Specialist', icon: '🧾', employees: 1, hours: 25, rate: 20 },
    { id: 'hr', name: 'Human Resources', icon: '👥', employees: 1, hours: 20, rate: 25 },
    { id: 'accounting', name: 'Accounting', icon: '📈', employees: 1, hours: 30, rate: 30 },
    { id: 'social', name: 'Social Media Manager', icon: '📱', employees: 1, hours: 15, rate: 18 }
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

// Create role card with sliders for employees, hours, and rate
function createRoleCard(role) {
    const card = document.createElement('div');
    card.className = 'bg-gray-800 rounded-xl p-4 lg:p-6 border-2 border-gray-700 hover:border-indigo-400 transition-all duration-300';

    const monthlyCost = role.employees * role.hours * role.rate * 4.33;

    card.innerHTML = `
                <div class="flex items-center justify-between mb-4">
                    <div class="flex items-center">
                        <span class="text-3xl mr-3">${role.icon}</span>
                        <div>
                            <h3 class="text-lg font-bold text-white">${role.name}</h3>
                            <p class="text-sm text-gray-200">
                                <span id="${role.id}-employees-display">${role.employees}</span> employees × 
                                <span id="${role.id}-hours-display">${role.hours}</span> hrs/week × 
                                $<span id="${role.id}-rate-display">${role.rate}</span>/hr
                            </p>
                        </div>
                    </div>
                    <div class="text-right">
                        <p class="text-2xl font-bold text-indigo-600" id="${role.id}-monthly">$${monthlyCost.toFixed(0)}</p>
                        <p class="text-xs text-gray-200">per month</p>
                    </div>
                </div>
                
                <div class="space-y-4">
                    <div>
                        <div class="flex justify-between items-center mb-2">
                            <label class="text-sm font-semibold text-gray-200">Number of Employees</label>
                            <span class="text-sm font-bold text-indigo-400" id="${role.id}-employees-value">${role.employees}</span>
                        </div>
                        <input 
                            type="range" 
                            id="${role.id}-employees" 
                            min="0" 
                            max="20" 
                            value="${role.employees}" 
                            class="w-full h-3 bg-indigo-200 rounded-lg appearance-none cursor-pointer slider"
                            oninput="updateRole('${role.id}')"
                        />
                        <div class="flex justify-between text-xs text-gray-200 mt-1">
                            <span>0</span>
                            <span>20</span>
                        </div>
                    </div>
                    
                    <div>
                        <div class="flex justify-between items-center mb-2">
                            <label class="text-sm font-semibold text-gray-200">Hours per Week (per employee)</label>
                            <span class="text-sm font-bold text-green-400" id="${role.id}-hours-value">${role.hours}</span>
                        </div>
                        <input 
                            type="range" 
                            id="${role.id}-hours" 
                            min="0" 
                            max="60" 
                            value="${role.hours}" 
                            class="w-full h-3 bg-green-200 rounded-lg appearance-none cursor-pointer slider"
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
                            <span class="text-sm font-bold text-purple-400" id="${role.id}-rate-value">${role.rate}</span>
                        </div>
                        <input 
                            type="range" 
                            id="${role.id}-rate" 
                            min="10" 
                            max="100" 
                            value="${role.rate}" 
                            class="w-full h-3 bg-purple-200 rounded-lg appearance-none cursor-pointer slider"
                            oninput="updateRole('${role.id}')"
                        />
                        <div class="flex justify-between text-xs text-gray-200 mt-1">
                            <span>$10</span>
                            <span>$100</span>
                        </div>
                    </div>
                </div>
            `;

    return card;
}

// Update role values and recalculate
function updateRole(roleId) {
    const employeesInput = document.getElementById(`${roleId}-employees`);
    const hoursInput = document.getElementById(`${roleId}-hours`);
    const rateInput = document.getElementById(`${roleId}-rate`);

    const employees = parseInt(employeesInput.value);
    const hours = parseInt(hoursInput.value);
    const rate = parseInt(rateInput.value);

    // Update display values
    document.getElementById(`${roleId}-employees-display`).textContent = employees;
    document.getElementById(`${roleId}-employees-value`).textContent = employees;
    document.getElementById(`${roleId}-hours-display`).textContent = hours;
    document.getElementById(`${roleId}-hours-value`).textContent = hours;
    document.getElementById(`${roleId}-rate-display`).textContent = rate;
    document.getElementById(`${roleId}-rate-value`).textContent = rate;

    // Calculate monthly cost for this role
    const monthlyCost = employees * hours * rate * 4.33;
    document.getElementById(`${roleId}-monthly`).textContent = `$${monthlyCost.toFixed(0)}`;

    // Recalculate total costs
    calculateCosts();
}

// Calculate and display costs
function calculateCosts() {
    let totalTraditionalCost = 0;
    let totalAlliHours = 0;

    // Calculate traditional costs and Alli AI hours needed
    roles.forEach(role => {
        const employees = parseInt(document.getElementById(`${role.id}-employees`).value);
        const hours = parseInt(document.getElementById(`${role.id}-hours`).value);
        const rate = parseInt(document.getElementById(`${role.id}-rate`).value);

        // Traditional cost for this role
        const roleTraditionalCost = employees * hours * rate * 4.33;
        totalTraditionalCost += roleTraditionalCost;

        // Alli AI hours needed (assuming 70% efficiency vs human employees)
        const roleAlliHours = employees * hours * 4.33 * 0.7;
        totalAlliHours += roleAlliHours;
    });

    // Alli AI cost calculation
    const baseCost = 1500; // Base monthly fee
    const perHourCost = 1.35;
    const alliCost = baseCost + (totalAlliHours * perHourCost);

    // Calculate savings
    const savings = totalTraditionalCost - alliCost;
    const savingsPercent = totalTraditionalCost > 0 ? ((savings / totalTraditionalCost) * 100).toFixed(1) : 0;

    // Update displays with animation
    animateValue('traditional-cost', totalTraditionalCost);
    animateValue('alli-cost', alliCost);
    animateValue('savings', savings);
    document.getElementById('savings-percent').textContent = `${savingsPercent}% saved`;
    document.getElementById('alli-hours').textContent = Math.round(totalAlliHours);
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