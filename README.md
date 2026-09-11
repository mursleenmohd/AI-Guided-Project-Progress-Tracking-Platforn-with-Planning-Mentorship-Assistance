# AI-Guided Project Progress Tracking Platform

An AI-powered developer platform featuring dynamic multi-month roadmap generation, automated task tracking, real-time mentorship guidance, and intelligent project analytics.

---

## Features

**Dynamic AI Roadmap Generation:** Automatically parses custom project durations (1, 2, 4+ months) into structured Month ➔ Week ➔ Day action plans.
**Interactive Task Tracking Engine:** Real-time status toggling (`Pending`, `In Progress`, `Completed`) with automatic completion percentage updates.
**Live Analytics & Dashboard:** Real-time visibility into overall project health, active execution phases, and completed milestones.
**AI Mentorship & Planning Assistant:** Architectural recommendations, technical strategy guidance, and step-by-step problem solving.
**Persistent Data Storage:** Relational database management with PostgreSQL and seamless LocalStorage client caching.

---

## Project Structure

```text
AAPM project/
├── beckend/                          
│   ├── app/
│   │   ├── agents/                   
│   │   │   ├── base_agent.py        
│   │   │   ├── orchestrator.py       
│   │   │   └── sub_agents.py        
│   │   ├── api/
│   │   │   └── v1/
│   │   │       ├── endpoints/       
│   │   │       │   ├── auth.py      
│   │   │       │   ├── chat.py       
│   │   │       │   └── mentor.py     
│   │   │       └── router.py         
│   │   ├── models/                  
│   │   │   ├── database.py         
│   │   │   ├── request.py           
│   │   │   └── response.py           
│   │   ├── routers/                 
│   │   │   └── mentor.py
│   │   └── utils/                    
│   │       └── prompts.py            
│   │   ├── config.py                 
│   │   └── main.py                  
│   ├── myenv/                       
│   ├── .env                          
│   ├── .gitignore                    
│   └── requirements.txt             
│
└── frontend/                      
    ├── assets/
    │   └── roadmap.json             
    ├── landing/                     
    │   ├── landing.css
    │   ├── landing.html
    │   └── landing.js
    ├── roadmap-tracker/             
    │   ├── roadmap.css
    │   ├── roadmap.html
    │   └── roadmap.js
    ├── api-services.js               
    ├── index.html                    
    ├── styles.css                    
    └── ui-handlers.js              
```


---

## Screenshots & Workflow

### 1. Dynamic AI Roadmap View
Parsable generated project plans into collapsible Month, Week, and Day units.

<img width="1437" height="820" alt="Screenshot 2026-09-11 155122" src="https://github.com/user-attachments/assets/2d2f3a1f-f5ab-440d-8880-898898358677" />

<img width="1440" height="972" alt="Screenshot 2026-09-11 155146" src="https://github.com/user-attachments/assets/9efacd92-6458-4859-a3bb-15264d16392c" />

<img width="1470" height="795" alt="Screenshot 2026-09-11 155218" src="https://github.com/user-attachments/assets/b650cd7f-2708-4f3d-8ffa-3be95084d2fc" />

### 2. Analytics & Progress Dashboard
Real-time task state updates, automated progress calculation, and phase tracking.

<img width="1911" height="965" alt="Screenshot 2026-09-11 155042" src="https://github.com/user-attachments/assets/c707bf2b-0ece-434d-8ac9-800d7566f9d2" />

<img width="1237" height="900" alt="Screenshot 2026-09-11 155231" src="https://github.com/user-attachments/assets/6da083e4-078d-4ac4-ab91-36865926f2d1" />

<img width="1160" height="797" alt="Screenshot 2026-09-11 155244" src="https://github.com/user-attachments/assets/d6087e25-114d-41e1-a9a2-335d5d462ff0" />

<img width="1108" height="807" alt="Screenshot 2026-09-11 155302" src="https://github.com/user-attachments/assets/d7de39b9-2598-4823-a2a9-7ff2a1f82445" />

---

## Tech Stack

* **Backend:** FastAPI (Python 3.10+)
* **Database:** PostgreSQL
* **ORM:** SQLAlchemy / SQLModel
* **Data Validation:** Pydantic
* **Frontend:** HTML5, CSS3 / Tailwind CSS, JavaScript (Vanilla ES6+)

---

##Getting Started

### Prerequisites
* **Python:** v3.10 or higher
* **PostgreSQL:** Installed and running locally or on a cloud instance (e.g., Supabase / Render)

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/mursleenmohd/AI-Guided-Project-Progress-Tracking-Platform-with-Planning-Mentorshi-Assitence.git
   ```

2. **Create and activate a Python Virtual Environment:**
   * **On Linux / macOS:**
     ```bash
     python3 -m venv venv
     source venv/bin/activate
     ```
   * **On Windows:**
     ```bash
     python -m venv venv
     venv\Scripts\activate
     ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure Environment Variables:**
   Create a `.env` file in the root directory and add the following:
   ```env
   DATABASE_URL=postgresql://postgres:your_password@localhost:5432/your_database_name
   SECRET_KEY=your_super_secret_jwt_key
   ENVIRONMENT=development
   ```

5. **Run Database Migrations / Initialize DB:**
   ```bash
   alembic upgrade head
   ```

6. **Start the FastAPI Development Server:**
   ```bash
   uvicorn app.main:app --reload
   ```

7. **Access the Application:**
   * **Web App:** Open [http://127.0.0.1:8000](http://127.0.0.1:8000) in your browser.
   * **Interactive API Docs (Swagger):** [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

---

## Contributing

Contributions are welcome! Feel free to open an Issue or submit a Pull Request.
