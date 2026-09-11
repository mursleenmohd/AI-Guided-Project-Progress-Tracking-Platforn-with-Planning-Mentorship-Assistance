const default60DayRoadmapData = [
    {
        month: 1,
        title: "Month 1: Core Architecture & Backend Services",
        weeks: [
            {
                week: 1,
                title: "Week 1: System Design & DB Foundation",
                days: [
                    { day: 1, task: "Initialize GitHub repo with .gitignore, main, and dev branches. Setup root directory structure & dotenv.", status: "Completed" },
                    { day: 2, task: "Initialize Node.js project (express, cors, helmet, morgan) with central error middleware & nodemon.", status: "In Progress" },
                    { day: 3, task: "Provision MongoDB Atlas cluster, write connection module with auto reconnect & DB sanity test script.", status: "Pending" },
                    { day: 4, task: "Design User Mongoose schema with roles/address & implement bcrypt pre-save password hashing hooks.", status: "Pending" },
                    { day: 5, task: "Create Product & Category schemas with parent-child hierarchy and Mongoose indexes on search fields.", status: "Pending" },
                    { day: 6, task: "Design Order schema tracking snapshots & write seed.js script generating test products/categories.", status: "Pending" },
                    { day: 7, task: "Verify database relationships, ensure no hardcoded secrets & document schemas in project README.", status: "Pending" }
                ]
            },
            {
                week: 2,
                title: "Week 2: Authentication & Core APIs",
                days: [
                    { day: 8, task: "Build POST /api/v1/auth/register with Joi validation & duplicate email structured error handling.", status: "Pending" },
                    { day: 9, task: "Build POST /api/v1/auth/login validating credentials against bcrypt & issue HTTP-Only JWT tokens.", status: "Pending" },
                    { day: 10, task: "Build protect auth middleware & restrictTo(...roles) guard middleware for privileged endpoint protection.", status: "Pending" },
                    { day: 11, task: "Build public GET /api/v1/products paginated & admin restricted POST /api/v1/products routes.", status: "Pending" },
                    { day: 12, task: "Implement backend filter query parameters (category, price) & MongoDB text search with sorting.", status: "Pending" },
                    { day: 13, task: "Configure Cloudinary/S3 SDK, setup multer middleware & build POST /api/v1/upload for image URLs.", status: "Pending" },
                    { day: 14, task: "Setup Swagger UI / Postman collections & run end-to-end user to admin security flow tests.", status: "Pending" }
                ]
            },
            {
                week: 3,
                title: "Week 3: Business Logic (Cart, Orders, Payments)",
                days: [
                    { day: 15, task: "Design Cart schema linked to user ID & build POST/PATCH /api/v1/cart with inventory validation.", status: "Pending" },
                    { day: 16, task: "Build DELETE /api/v1/cart/:itemId & utility logic for clearing carts upon completed checkout.", status: "Pending" },
                    { day: 17, task: "Build POST /api/v1/orders with atomic transactions to lock stock & deduct product inventory count.", status: "Pending" },
                    { day: 18, task: "Register Stripe/Razorpay developer keys & build POST /api/v1/payments/create-intent endpoint.", status: "Pending" },
                    { day: 19, task: "Construct payment gateway webhook listener updating order status to Paid on verified signatures.", status: "Pending" },
                    { day: 20, task: "Build GET /api/v1/orders/my-orders user logs & admin GET /api/v1/orders tracking endpoints.", status: "Pending" },
                    { day: 21, task: "Run full core lifecycle API test flow (Auth -> Search -> Cart -> Order -> Payment Webhook).", status: "Pending" }
                ]
            },
            {
                week: 4,
                title: "Week 4: Python Microservice Engine",
                days: [
                    { day: 22, task: "Setup Python venv with FastAPI/Flask, pandas, scikit-learn & connect read-driver directly to MongoDB.", status: "Pending" },
                    { day: 23, task: "Write Python extraction pipeline transforming MongoDB interaction logs into Pandas DataFrames.", status: "Pending" },
                    { day: 24, task: "Build TF-IDF vectorizer & Cosine Similarity content-based recommendation model returning top 5 items.", status: "Pending" },
                    { day: 25, task: "Expose recommendation model via FastAPI GET /recommendations/:product_id with cold-start fallback.", status: "Pending" },
                    { day: 26, task: "Link Node backend to Python service using Axios with error fallback timeouts.", status: "Pending" },
                    { day: 27, task: "Create Python analytics service endpoint computing top sales & weekly revenue metrics.", status: "Pending" },
                    { day: 28, task: "Refactor backend modules to clean MVC, verify stack startup & tag GitHub v1.0.0-backend release.", status: "Pending" }
                ]
            }
        ]
    },
    {
        month: 2,
        title: "Month 2: Frontend Client, Integration & Deployment",
        weeks: [
            {
                week: 5,
                title: "Week 5: Frontend Architecture & Auth UI",
                days: [
                    { day: 29, task: "Create React app using Vite, install Lucide icons, Tailwind CSS & configure central styling theme.", status: "Pending" },
                    { day: 30, task: "Configure react-router-dom, set up Context/Redux global state & persistent session storage sync.", status: "Pending" },
                    { day: 31, task: "Create Axios base instance with automatic JWT request interceptors & 401 response redirect guards.", status: "Pending" },
                    { day: 32, task: "Build responsive Navbar, sticky Footer, mobile navigation drawer & reusable Toast notification components.", status: "Pending" },
                    { day: 33, task: "Build User Registration and Login pages with client-side form validation & error alerts.", status: "Pending" },
                    { day: 34, task: "Create ProtectedRoute and AdminRoute wrapper components to guard restricted UI routes.", status: "Pending" },
                    { day: 35, task: "Perform Week 5 frontend sanity check validating session persistence and mobile responsiveness.", status: "Pending" }
                ]
            },
            {
                week: 6,
                title: "Week 6: Product Discovery & Shopping Experience",
                days: [
                    { day: 36, task: "Build ProductCard component, Product Listing Page (PLP) & async fetching UI skeleton loaders.", status: "Pending" },
                    { day: 37, task: "Build sidebar category filters, price sliders & debounced search bar querying backend APIs.", status: "Pending" },
                    { day: 38, task: "Build Product Detail Page (PDP) gallery, stock indicator badges & Add-to-Cart state triggers.", status: "Pending" },
                    { day: 39, task: "Build slide-over Cart drawer showing item list, quantity updates & subtotal calculation.", status: "Pending" },
                    { day: 40, task: "Sync local client cart state with MongoDB cart document & merge guest cart items on login.", status: "Pending" },
                    { day: 41, task: "Build User Profile Dashboard with stored shipping addresses & Order History timeline modal.", status: "Pending" },
                    { day: 42, task: "Perform Week 6 UI polish pass fixing mobile viewport issues & image load efficiency.", status: "Pending" }
                ]
            },
            {
                week: 7,
                title: "Week 7: Advanced Features, Checkout & Admin Portal",
                days: [
                    { day: 43, task: "Build multi-step Checkout Wizard UI (Shipping Address -> Review -> Payment Cost Summary).", status: "Pending" },
                    { day: 44, task: "Integrate Stripe/Razorpay Checkout SDK script on frontend & handle payment result routes.", status: "Pending" },
                    { day: 45, task: "Build RecommendedProducts carousel component on PDP driven by Python microservice engine.", status: "Pending" },
                    { day: 46, task: "Build dedicated Admin Dashboard layout shell with charts displaying sales analytics metrics.", status: "Pending" },
                    { day: 47, task: "Build Admin Product Management table with image upload modals & product CRUD triggers.", status: "Pending" },
                    { day: 48, task: "Build Admin Order Management dashboard with status dropdown toggles (Processing, Shipped, Delivered).", status: "Pending" },
                    { day: 49, task: "Perform end-to-end purchasing test from product discovery to admin order status update.", status: "Pending" }
                ]
            },
            {
                week: 8,
                title: "Week 8: Optimization, Testing & Cloud Deployment",
                days: [
                    { day: 50, task: "Implement React.lazy code splitting, optimize bundle sizes & run Google Lighthouse performance pass.", status: "Pending" },
                    { day: 51, task: "Add express-rate-limit, production CORS origin rules & Mongo injection input sanitization.", status: "Pending" },
                    { day: 52, task: "Run manual end-to-end QA pass covering payment failures, stock limits & form error states.", status: "Pending" },
                    { day: 53, task: "Clean seed database, provision production MongoDB Atlas database & set automated backups.", status: "Pending" },
                    { day: 54, task: "Deploy Node.js server and Python Recommendation microservice to Render / AWS App Runner / Railway.", status: "Pending" },
                    { day: 55, task: "Build production React bundle (npm run build) & deploy static output client to Vercel/Netlify.", status: "Pending" },
                    { day: 56, task: "Perform production smoke testing: Live User Registration -> Payment Hook -> Live Order.", status: "Pending" },
                    { day: 57, task: "Integrate Sentry error monitoring on client/server & configure basic uptime GET /healthz endpoint.", status: "Pending" },
                    { day: 58, task: "Write master README.md with system architecture diagrams, API contracts & installation guide.", status: "Pending" },
                    { day: 59, task: "Seed production database with crisp product sample data & record feature demonstration video.", status: "Pending" },
                    { day: 60, task: "Tag v1.0 Production Release on GitHub, publish live links & mark project officially complete!", status: "Pending" }
                ]
            }
        ]
    }
];
function parseDynamicAIPlanning(planningText, durationMonths) {
    if (!planningText) return null;

    const lines = planningText.split('\n');
    let monthList = [];
    let currentMonth = null;
    let currentWeek = null;
    let dayCounter = 1;

    lines.forEach(line => {
        const trimmed = line.trim();
        if (!trimmed) return;

        if (/^(###|##|#)?\s*(month|phase)\s*\d+/i.test(trimmed)) {
            const mNum = monthList.length + 1;
            currentMonth = {
                month: mNum,
                title: trimmed.replace(/[#*]/g, '').trim(),
                weeks: []
            };
            monthList.push(currentMonth);
            currentWeek = null;
        } 
        else if (/^(###|##|#)?\s*week\s*\d+/i.test(trimmed) || (trimmed.toLowerCase().includes('week') && trimmed.startsWith('#'))) {
            if (!currentMonth) {
                currentMonth = { month: 1, title: "Month 1: Core Project Execution", weeks: [] };
                monthList.push(currentMonth);
            }
            const wNum = currentMonth.weeks.length + 1;
            currentWeek = {
                week: wNum,
                title: trimmed.replace(/[#*]/g, '').trim(),
                days: []
            };
            currentMonth.weeks.push(currentWeek);
        } 
        else if ((trimmed.startsWith('-') || trimmed.startsWith('*') || /^\d+\./.test(trimmed)) && trimmed.length > 5) {
            const taskContent = trimmed.replace(/^[-*\d.]\s*/, '').replace(/\*\*/g, '').trim();
            
            if (!currentMonth) {
                currentMonth = { month: 1, title: "Month 1: Project Implementation", weeks: [] };
                monthList.push(currentMonth);
            }
            if (!currentWeek) {
                currentWeek = { week: 1, title: "Week 1: Foundations & Architecture", days: [] };
                currentMonth.weeks.push(currentWeek);
            }

            currentWeek.days.push({
                day: dayCounter++,
                task: taskContent,
                status: "Pending"
            });
        }
    });

    return monthList.length > 0 && monthList[0].weeks.length > 0 ? monthList : null;
}

function getStoredRoadmapData() {
    const savedCustom = localStorage.getItem('aapm_full_roadmap_active');
    if (savedCustom) {
        try { return JSON.parse(savedCustom); } catch (e) {}
    }
    const currentProjRaw = localStorage.getItem('aapm_current_project');
    if (currentProjRaw) {
        try {
            const activeProj = JSON.parse(currentProjRaw);
            const dynamicPlan = parseDynamicAIPlanning(activeProj.planningReport, activeProj.payload?.duration);
            if (dynamicPlan) return dynamicPlan;
        } catch (e) {
            console.error("Failed to parse dynamic project planning:", e);
        }
    }
    return default60DayRoadmapData;
}

function saveRoadmapData(data) {
    localStorage.setItem('aapm_full_roadmap_active', JSON.stringify(data));
}

let currentRoadmapData = getStoredRoadmapData();

function renderRoadmapApp() {
    const masterContainer = document.getElementById('master-roadmap-tree');
    if (!masterContainer) return;

    masterContainer.innerHTML = '';

    let totalDays = 0;
    let completedDays = 0;
    let inProgressDays = 0;
    let pendingDays = 0;

    let activeTaskObj = null;
    let activeTaskLocation = "";
    currentRoadmapData.forEach((m, mIdx) => {
        const monthBox = document.createElement('div');
        monthBox.className = 'bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-lg mb-6';

        let weekHTML = '';

        m.weeks.forEach((w, wIdx) => {
            let dayCardsHTML = '';

            w.days.forEach((d, dIdx) => {
                totalDays++;
                if (d.status === 'Completed') {
                    completedDays++;
                } else if (d.status === 'In Progress') {
                    inProgressDays++;
                    if (!activeTaskObj) {
                        activeTaskObj = d;
                        activeTaskLocation = `${m.title.split(':')[0]} ➔ ${w.title.split(':')[0]} ➔ Day ${d.day}`;
                    }
                } else {
                    pendingDays++;
                    if (!activeTaskObj && completedDays + inProgressDays === 0 && d.day === 1) {
                        activeTaskObj = d;
                        activeTaskLocation = `${m.title.split(':')[0]} ➔ ${w.title.split(':')[0]} ➔ Day ${d.day}`;
                    }
                }

                let cardClass = d.status === 'Completed' ? 'day-card-completed' : d.status === 'In Progress' ? 'day-card-progress' : 'day-card-pending';
                let badgeClass = d.status === 'Completed' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' : d.status === 'In Progress' ? 'bg-sky-500/20 text-sky-300 border-sky-500/30' : 'bg-slate-800 text-slate-400 border-slate-700';
                let badgeIcon = d.status === 'Completed' ? 'fa-circle-check' : d.status === 'In Progress' ? 'fa-bolt' : 'fa-clock';

                dayCardsHTML += `
                    <div onclick="cycleDayStatus(${mIdx}, ${wIdx}, ${dIdx})" class="day-card ${cardClass} p-3.5 rounded-xl border cursor-pointer flex flex-col justify-between space-y-2 hover:border-indigo-500/50 transition">
                        <div class="flex justify-between items-center">
                            <span class="text-[10px] font-black text-indigo-400">DAY ${d.day}</span>
                            <span class="${badgeClass} border text-[9px] px-2 py-0.5 rounded-full font-extrabold uppercase flex items-center gap-1">
                                <i class="fa-solid ${badgeIcon}"></i> ${d.status}
                            </span>
                        </div>
                        <p class="text-xs font-medium text-slate-200 leading-snug">${d.task}</p>
                        <div class="text-[8px] text-slate-500 flex items-center gap-1">
                            <i class="fa-solid fa-rotate text-[7px]"></i> Click to change
                        </div>
                    </div>
                `;
            });

            weekHTML += `
                <div class="bg-slate-900/90 rounded-xl border border-slate-800/80 p-4 space-y-3">
                    <h4 class="text-xs font-extrabold text-emerald-400 flex items-center gap-2">
                        <i class="fa-solid fa-calendar-week"></i> ${w.title}
                    </h4>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                        ${dayCardsHTML}
                    </div>
                </div>
            `;
        });

        monthBox.innerHTML = `
            <div onclick="toggleMonthBox(${m.month})" class="p-4 bg-slate-900/90 border-b border-slate-800 flex justify-between items-center cursor-pointer hover:bg-slate-800/50 transition">
                <div class="flex items-center gap-3">
                    <span class="px-3 py-1 bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 text-xs font-black rounded-lg">
                        MONTH ${m.month}
                    </span>
                    <h3 class="text-sm font-bold text-white">${m.title}</h3>
                </div>
                <i id="month-icon-${m.month}" class="fa-solid fa-chevron-down text-slate-400 text-xs transition-transform duration-300"></i>
            </div>
            <div id="month-body-${m.month}" class="p-4 space-y-4">
                ${weekHTML}
            </div>
        `;

        masterContainer.appendChild(monthBox);
    });

    if (totalDays === 0) totalDays = 1;

    if (!activeTaskObj) {
        if (completedDays === totalDays && totalDays > 0) {
            activeTaskObj = { task: "All Roadmap Tasks Completed! Project ready for release." };
            activeTaskLocation = "Final Phase ➔ Completed";
        } else if (currentRoadmapData[0]?.weeks[0]?.days[0]) {
            activeTaskObj = currentRoadmapData[0].weeks[0].days[0];
            activeTaskLocation = "Month 1 ➔ Week 1 ➔ Day 1";
        } else {
            activeTaskObj = { task: "No active tasks found." };
            activeTaskLocation = "N/A";
        }
    }

    const currentTaskTitleElem = document.getElementById('current-task-title');
    const currentTaskLocElem = document.getElementById('current-task-location');
    const progressBarElem = document.getElementById('tracker-progress-bar');
    const progressTextElem = document.getElementById('tracker-percentage');

    if (currentTaskTitleElem) currentTaskTitleElem.innerText = activeTaskObj.task;
    if (currentTaskLocElem) currentTaskLocElem.innerText = activeTaskLocation;

    const percent = Math.round((completedDays / totalDays) * 100);
    if (progressBarElem) progressBarElem.style.width = `${percent}%`;
    if (progressTextElem) progressTextElem.innerText = `${percent}%`;
    const statCompleted = document.getElementById('stat-completed-days');
    const statProgress = document.getElementById('stat-progress-days');
    const statPending = document.getElementById('stat-pending-days');
    const statOverall = document.getElementById('stat-overall-status');

    if (statCompleted) statCompleted.innerText = completedDays;
    if (statProgress) statProgress.innerText = inProgressDays;
    if (statPending) statPending.innerText = pendingDays;

    if (statOverall) {
        if (percent === 0) statOverall.innerText = "Phase 1: Project Setup";
        else if (percent < 40) statOverall.innerText = "Core Architecture & Backend";
        else if (percent < 80) statOverall.innerText = "Frontend UI & Service Integration";
        else if (percent < 100) statOverall.innerText = "Testing, Polish & Cloud Deployment";
        else statOverall.innerText = "Fully Deployed & Live!";
    }

    saveRoadmapData(currentRoadmapData);
}

function cycleDayStatus(mIdx, wIdx, dIdx) {
    const currentStatus = currentRoadmapData[mIdx].weeks[wIdx].days[dIdx].status;
    let nextStatus = 'Pending';

    if (currentStatus === 'Pending') nextStatus = 'In Progress';
    else if (currentStatus === 'In Progress') nextStatus = 'Completed';

    currentRoadmapData[mIdx].weeks[wIdx].days[dIdx].status = nextStatus;
    renderRoadmapApp();
}

function toggleMonthBox(monthNum) {
    const body = document.getElementById(`month-body-${monthNum}`);
    const icon = document.getElementById(`month-icon-${monthNum}`);
    if (body && icon) {
        body.classList.toggle('hidden');
        icon.classList.toggle('rotate-180');
    }
}

function resetRoadmapProgress() {
    if (confirm("Are you sure you want to reset all tracking progress back to initial state?")) {
        localStorage.removeItem('aapm_full_roadmap_active');
        currentRoadmapData = getStoredRoadmapData();
        renderRoadmapApp();
    }
}


document.addEventListener('DOMContentLoaded', () => {
    renderRoadmapApp();
});