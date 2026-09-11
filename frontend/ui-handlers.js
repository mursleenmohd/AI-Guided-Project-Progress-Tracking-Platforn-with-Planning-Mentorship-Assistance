function switchTab(tabName) {
    ['generator', 'roadmap', 'code-starter', 'documentation', 'chat'].forEach(tab => {
        const elem = document.getElementById(`tab-${tab}`);
        const btn = document.getElementById(`btn-${tab}`);
        if (elem) elem.classList.add('hidden');
        if (btn) btn.classList.remove('active');
    });
    
    const activeTab = document.getElementById(`tab-${tabName}`);
    const activeBtn = document.getElementById(`btn-${tabName}`);
    if (activeTab) activeTab.classList.remove('hidden');
    if (activeBtn) activeBtn.classList.add('active');
}
function openRoadmapTracker() {
    switchTab('roadmap');
}

function handleUserLogout() {
    if (confirm("Do you want to logout?")) {
        localStorage.removeItem('aapm_token');
        localStorage.removeItem('aapm_user');
        window.location.href = "landing/landing.html";
    }
}

function startNewProject() {
    if (typeof switchTab === 'function') switchTab('generator');
    const form = document.getElementById('project-form');
    if (form) form.reset();
    const outputView = document.getElementById('output-files-view');
    if (outputView) outputView.classList.add('hidden');
}

function openSettingsModal() {
    const modal = document.getElementById('settings-modal');
    if (modal) modal.classList.remove('hidden');
}

function closeSettingsModal() {
    const modal = document.getElementById('settings-modal');
    if (modal) modal.classList.add('hidden');
}

function closeFileModal() {
    const modal = document.getElementById('file-modal');
    if (modal) modal.classList.add('hidden');
}

function openSearchModal() {
    const modal = document.getElementById('search-modal');
    const input = document.getElementById('search-input');
    if (modal && input) {
        modal.classList.remove('hidden');
        input.value = '';
        input.focus();
        handleSearchQuery();
    }
}

function closeSearchModal() {
    const modal = document.getElementById('search-modal');
    if (modal) modal.classList.add('hidden');
}

document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        openSearchModal();
    }
    if (e.key === 'Escape') {
        closeSearchModal();
        closeSettingsModal();
        closeFileModal();
    }
});

function handleSearchQuery() {
    const input = document.getElementById('search-input');
    if (!input) return;

    const query = input.value.toLowerCase().trim();
    const resultsContainer = document.getElementById('search-results');
    if (!resultsContainer) return;

    let searchItems = [
        { label: "Generator Workspace", action: () => { switchTab('generator'); closeSearchModal(); }, type: "Tab Navigation" },
        { label: "Project Roadmap Execution Tracker", action: () => { switchTab('roadmap'); closeSearchModal(); }, type: "Tab Navigation" },
        { label: "Starter Code Boilerplate", action: () => { switchTab('code-starter'); closeSearchModal(); }, type: "Tab Navigation" },
        { label: "File Explorer Documentation", action: () => { switchTab('documentation'); closeSearchModal(); }, type: "Tab Navigation" },
        { label: "AI Mentor Chat", action: () => { switchTab('chat'); closeSearchModal(); }, type: "Tab Navigation" }
    ];

    let savedProjects = JSON.parse(localStorage.getItem('aapm_saved_projects')) || [];
    savedProjects.forEach(p => {
        searchItems.push({
            label: `Project: ${p.payload?.name || 'Untitled'} (${p.payload?.domain || 'General'})`,
            action: () => { 
                if (typeof loadProjectFromHistory === 'function') loadProjectFromHistory(p.id); 
                closeSearchModal(); 
            },
            type: "Saved History"
        });
    });

    const filtered = searchItems.filter(item => item.label.toLowerCase().includes(query));

    if (filtered.length === 0) {
        resultsContainer.innerHTML = `<p class="text-slate-500 text-center py-4 text-xs">No matching topics or tasks found.</p>`;
        return;
    }

    resultsContainer.innerHTML = filtered.map((item, index) => `
        <div onclick="executeSearchAction(${index})" class="p-3 bg-slate-950 hover:bg-slate-800 rounded-xl cursor-pointer transition flex justify-between items-center border border-slate-800/60">
            <span class="font-medium text-xs text-slate-200">${item.label}</span>
            <span class="text-[10px] bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded border border-indigo-500/20">${item.type}</span>
        </div>
    `).join('');

    window.activeSearchItems = filtered;
}

function executeSearchAction(index) {
    if (window.activeSearchItems && window.activeSearchItems[index]) {
        window.activeSearchItems[index].action();
    }
}

function toggleProjectDrawer() {
    const drawer = document.getElementById('project-drawer');
    if (drawer) drawer.classList.toggle('hidden');
}