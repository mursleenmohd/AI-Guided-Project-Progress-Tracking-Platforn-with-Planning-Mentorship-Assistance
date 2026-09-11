const API_BASE_URL = "http://localhost:8000/api/v1/mentor";
let globalData = null;

if (window.mermaid) {
    mermaid.initialize({ startOnLoad: false, theme: 'dark', securityLevel: 'loose' });
}

function renderMarkdownWithMermaid(markdownText) {
    if (!markdownText) return '';
    let parsedHTML = marked.parse(markdownText);
    parsedHTML = parsedHTML.replace(/<pre><code class="(?:language-)?mermaid">([\s\S]*?)<\/code><\/pre>/gi, function(match, code) {
        const decodedCode = code.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
        return `<div class="mermaid bg-slate-950 p-6 rounded-2xl my-6 border border-slate-800 text-center overflow-x-auto">${decodedCode}</div>`;
    });
    return parsedHTML;
}

function triggerMermaidRender(container) {
    setTimeout(() => {
        if (window.mermaid) {
            const mermaidNodes = container.querySelectorAll('.mermaid');
            if (mermaidNodes.length > 0) {
                mermaid.run({ nodes: mermaidNodes });
            }
        }
    }, 100);
}
document.addEventListener('DOMContentLoaded', () => {
    if (typeof renderKanbanBoard === 'function') renderKanbanBoard();

    const form = document.getElementById('project-form');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const nameVal = document.getElementById('p-name').value.trim();
            const domainVal = document.getElementById('p-domain').value.trim();
            const techVal = document.getElementById('p-tech').value.trim();
            const durationVal = parseInt(document.getElementById('p-duration').value, 10);
            const problemVal = document.getElementById('p-problem').value.trim();

            if (!nameVal || !domainVal || !techVal || !problemVal || isNaN(durationVal)) {
                alert("Please fill all fields correctly!");
                return;
            }

            const payload = { name: nameVal, domain: domainVal, technologies: techVal, duration: durationVal, problem: problemVal };

            document.getElementById('loader').classList.remove('hidden');
            document.getElementById('output-files-view').classList.add('hidden');
            document.getElementById('submit-btn').disabled = true;

            try {
                const response = await fetch(`${API_BASE_URL}/analyze-project`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                    body: JSON.stringify(payload)
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(`Server Error (${response.status}): ${JSON.stringify(errorData.detail || errorData)}`);
                }

                globalData = await response.json();
                localStorage.setItem('aapm_current_project', JSON.stringify({
                    payload: payload,
                    planningReport: globalData.sub_reports?.planning || ""
                }));

                const docsElem = document.getElementById('docs-content');
                if (docsElem) {
                    docsElem.innerHTML = renderMarkdownWithMermaid(globalData.sub_reports?.documentation || globalData.final_mentor_report);
                    triggerMermaidRender(docsElem);
                }

                generateBoilerplateCode(nameVal, techVal);
                syncRoadmapToKanban();
                saveProjectToHistory(payload, globalData);
                document.getElementById('output-files-view').classList.remove('hidden');
            } catch (err) {
                alert("Execution Error: " + err.message);
                console.error(err);
            } finally {
                document.getElementById('loader').classList.add('hidden');
                document.getElementById('submit-btn').disabled = false;
            }
        });
    }

    const chatBtn = document.getElementById('chat-btn');
    if (chatBtn) {
        chatBtn.addEventListener('click', async () => {
            const chatInput = document.getElementById('chat-input');
            const query = chatInput.value.trim();
            if (!query) return;

            const chatBox = document.getElementById('chat-box');
            chatBox.innerHTML += `<div class="bg-indigo-600/30 p-3 rounded-xl border border-indigo-500/30 max-w-xl text-slate-200 ml-auto">${query}</div>`;
            chatInput.value = '';

            try {
                const response = await fetch(`${API_BASE_URL}/chat`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        project_context: document.getElementById('p-name')?.value || "Academic Project",
                        user_query: query
                    })
                });
                const data = await response.json();
                chatBox.innerHTML += `<div class="bg-slate-950 p-4 rounded-xl border border-slate-800 max-w-xl text-slate-300 prose prose-invert">${marked.parse(data.reply || data.response || "No response received.")}</div>`;
                chatBox.scrollTop = chatBox.scrollHeight;
            } catch (err) {
                console.error(err);
            }
        });
    }
});

function generateBoilerplateCode(projectName, techStack) {
    const codeElem = document.getElementById('code-starter-content');
    if (!codeElem) return;
    const formattedName = projectName.toLowerCase().replace(/\s+/g, '_');
    const boilerplateMarkdown = `
# Starter Code Setup: ${projectName}

### 📁 Directory Layout
\`\`\`text
${formattedName}/
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── core/
│   │   ├── main.py
│   │   └── config.py
│   ├── requirements.txt
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
└── README.md
\`\`\`
### ⚡ Backend Entrypoint (\`backend/app/main.py\`)
\`\`\`python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="${projectName} API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Welcome to ${projectName} API Service", "status": "Active"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
\`\`\`
`;
    codeElem.innerHTML = renderMarkdownWithMermaid(boilerplateMarkdown);
}

function openFileModal(type) {
    if (!globalData) return;
    const modal = document.getElementById('file-modal');
    const title = document.getElementById('modal-title');
    const content = document.getElementById('modal-content');
    let rawMarkdown = "";

    if (type === 'mentor') {
        title.innerText = "Master_Mentor_Report.md";
        rawMarkdown = globalData.final_mentor_report || "";
    } else if (type === 'scope') {
        title.innerText = "Scope_&_Objectives.md";
        rawMarkdown = globalData.sub_reports?.scope || "";
    } else if (type === 'tech') {
        title.innerText = "Tech_Stack_Architecture.md";
        rawMarkdown = globalData.sub_reports?.technology || "";
    }

    content.innerHTML = renderMarkdownWithMermaid(rawMarkdown);
    triggerMermaidRender(content);
    modal.classList.remove('hidden');
}

function closeFileModal() {
    const modal = document.getElementById('file-modal');
    if (modal) modal.classList.add('hidden');
}

function downloadAsPDF() {
    const titleText = document.getElementById('modal-title').innerText;
    const contentHTML = document.getElementById('modal-content').innerHTML;
    if (!contentHTML) return;

    const printWindow = window.open('', '', 'height=800,width=800');
    printWindow.document.write(`
        <html>
            <head>
                <title>${titleText}</title>
                <style>
                    body { font-family: Arial, sans-serif; padding: 40px; color: #111; line-height: 1.6; }
                    h1, h2, h3 { color: #1e1b4b; border-bottom: 1px solid #ddd; padding-bottom: 5px; margin-top: 20px; }
                    code { background: #f1f5f9; padding: 2px 5px; border-radius: 4px; font-family: monospace; }
                    pre { background: #f8fafc; padding: 12px; border: 1px solid #e2e8f0; border-radius: 6px; overflow-x: auto; }
                    ul, ol { padding-left: 20px; }
                </style>
            </head>
            <body>
                <h1>${titleText.replace('.md', '')}</h1>
                <hr/>
                <div>${contentHTML}</div>
            </body>
        </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
        printWindow.print();
        printWindow.close();
    }, 300);
}
function downloadAllAsZip() {
    if (!globalData) {
        alert("Pehle project generate karein!");
        return;
    }
    const JSZipLib = window.JSZip || JSZip;
    const saveAsLib = window.saveAs || saveAs;
    if (typeof JSZipLib === "undefined" || typeof saveAsLib === "undefined") {
        alert("JSZip library missing.");
        return;
    }
    const zip = new JSZipLib();
    const projectName = (document.getElementById('p-name').value || "Project").replace(/\s+/g, '_');
    const folder = zip.folder(`${projectName}_Blueprint`);

    folder.file("Master_Mentor_Report.md", globalData.final_mentor_report || "");
    folder.file("Scope_and_Objectives.md", globalData.sub_reports?.scope || "");
    folder.file("Tech_Stack_Architecture.md", globalData.sub_reports?.technology || "");
    folder.file("Project_Execution_Roadmap.md", globalData.sub_reports?.planning || "");
    folder.file("IEEE_Documentation_Guide.md", globalData.sub_reports?.documentation || "");

    zip.generateAsync({ type: "blob" }).then(function (content) {
        saveAsLib(content, `${projectName}_Academic_Blueprint.zip`);
    });
}
function syncRoadmapToKanban() {
    if (!globalData || !globalData.sub_reports?.planning) return;

    const planningText = globalData.sub_reports.planning;
    const lines = planningText.split('\n');
    let currentPhase = "Phase 1 / Month 1";
    let extractedTasks = [];
    let idCounter = 1;

    lines.forEach(line => {
        const trimmed = line.trim();
        if (/^(###|##|#)?\s*(month|week|phase)/i.test(trimmed)) {
            currentPhase = trimmed.replace(/[#*]/g, '').trim();
        } else if ((trimmed.startsWith('-') || trimmed.startsWith('*') || /^\d+\./.test(trimmed)) && trimmed.length > 5) {
            const taskContent = trimmed.replace(/^[-*\d.]\s*/, '').replace(/\*\*/g, '').trim();
            if (taskContent.length > 3) {
                extractedTasks.push({
                    id: `task-${Date.now()}-${idCounter++}`,
                    month: currentPhase.length > 25 ? currentPhase.substring(0, 25) + "..." : currentPhase,
                    title: taskContent,
                    status: 'todo'
                });
            }
        }
    });

    if (extractedTasks.length > 0) {
        kanbanTasks = extractedTasks;
        localStorage.setItem('aapm_kanban_tasks', JSON.stringify(kanbanTasks));
        if (typeof renderKanbanBoard === 'function') renderKanbanBoard();
    }
}

function copyAllBoilerplate() {
    const codeContainer = document.getElementById('code-starter-content');
    if (!codeContainer) return;

    navigator.clipboard.writeText(codeContainer.innerText).then(() => {
        alert("Boilerplate code copied to clipboard!");
    }).catch(err => console.error("Copy failed:", err));
}
function toggleProjectDrawer() {
    const drawer = document.getElementById('project-drawer');
    if (drawer) {
        drawer.classList.toggle('hidden');
        if (!drawer.classList.contains('hidden')) {
            renderProjectHistory();
        }
    }
}

function saveProjectToHistory(payload, resultData) {
    let savedProjects = JSON.parse(localStorage.getItem('aapm_saved_projects')) || [];
    const newEntry = {
        id: 'proj_' + Date.now(),
        payload: payload,
        resultData: resultData,
        createdAt: new Date().toLocaleDateString()
    };
    savedProjects.unshift(newEntry);
    localStorage.setItem('aapm_saved_projects', JSON.stringify(savedProjects));
}

function renderProjectHistory() {
    const container = document.getElementById('projects-list');
    if (!container) return;

    let savedProjects = JSON.parse(localStorage.getItem('aapm_saved_projects')) || [];
    if (savedProjects.length === 0) {
        container.innerHTML = `<p class="text-xs text-slate-500 text-center py-6">No saved projects found.</p>`;
        return;
    }

    container.innerHTML = savedProjects.map((p) => `
        <div class="p-3.5 bg-slate-950 border border-slate-800 rounded-xl hover:border-indigo-500/50 transition flex justify-between items-center group">
            <div onclick="loadProjectFromHistory('${p.id}')" class="cursor-pointer flex-1">
                <h4 class="font-semibold text-slate-200 text-xs">${p.payload.name}</h4>
                <p class="text-[10px] text-slate-500 mt-0.5">${p.payload.domain} • ${p.payload.duration} Month(s) • ${p.createdAt}</p>
            </div>
            <button onclick="deleteProjectHistory('${p.id}')" class="text-slate-600 hover:text-red-400 p-1.5 transition">
                <i class="fa-solid fa-trash text-xs"></i>
            </button>
        </div>
    `).join('');
}

function loadProjectFromHistory(id) {
    let savedProjects = JSON.parse(localStorage.getItem('aapm_saved_projects')) || [];
    const proj = savedProjects.find(p => p.id === id);
    if (!proj) return;

    globalData = proj.resultData;
    document.getElementById('p-name').value = proj.payload.name;
    document.getElementById('p-domain').value = proj.payload.domain;
    document.getElementById('p-tech').value = proj.payload.technologies;
    document.getElementById('p-duration').value = proj.payload.duration;
    document.getElementById('p-problem').value = proj.payload.problem;

    localStorage.setItem('aapm_current_project', JSON.stringify({
        payload: proj.payload,
        planningReport: globalData.sub_reports?.planning || ""
    }));

    generateBoilerplateCode(proj.payload.name, proj.payload.technologies);
    syncRoadmapToKanban();
    document.getElementById('output-files-view').classList.remove('hidden');
    toggleProjectDrawer();
    if (typeof switchTab === 'function') switchTab('generator');
}

function deleteProjectHistory(id) {
    let savedProjects = JSON.parse(localStorage.getItem('aapm_saved_projects')) || [];
    savedProjects = savedProjects.filter(p => p.id !== id);
    localStorage.setItem('aapm_saved_projects', JSON.stringify(savedProjects));
    renderProjectHistory();
}