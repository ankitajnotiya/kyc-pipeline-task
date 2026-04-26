# FinTech KYC Pipeline (Full-Stack)

A professional KYC (Know Your Customer) onboarding system featuring a multi-step application process, real-time SLA tracking, and an admin review dashboard.

## Key Features
- **Multi-step KYC Form**: Seamless merchant onboarding with real-time validation.
- **SLA Tracking**: Automated 24-hour countdown for application reviews (At-Risk alerts).
- **Document Management**: Secure file upload and preview for PAN & Aadhaar cards.
- **Admin Dashboard**: A dedicated interface for reviewers to approve/reject applications.
- **Responsive UI**: Fully optimized for Mobile, Tablet, and Desktop.

## Tech Stack
- **Frontend**: React.js, TypeScript, Tailwind CSS, Lucide Icons, Framer Motion.
- **Backend**: Python, Django, Django REST Framework (DRF).
- **Database**: SQLite (Development).

## Installation & Setup

### 1. Backend (Django)
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```
Backend runs on: http://127.0.0.1:8000/

### 2. Frontend (React + Vite)
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on: http://localhost:5173/
