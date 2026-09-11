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

### 2. Analytics & Progress Dashboard
Real-time task state updates, automated progress calculation, and phase tracking.

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
