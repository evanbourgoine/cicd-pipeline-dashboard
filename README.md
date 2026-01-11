# CI/CD Pipeline Dashboard

A full-stack web application for monitoring CI/CD pipeline metrics with multi-database architecture.

## Features

- **Real-time Pipeline Monitoring**: Track GitHub Actions workflow runs
- **Multi-Database Architecture**: MongoDB for pipeline logs, MySQL for build metadata
- **REST API**: Express.js backend with JWT authentication
- **Interactive Dashboard**: React frontend with Chart.js visualizations
- **GitHub Integration**: Automatic syncing of workflow data
- **Secure Authentication**: JWT-based auth with encrypted passwords
- **Docker Support**: Containerized deployment

## Tech Stack

### Backend
- Node.js + Express
- MongoDB (Mongoose)
- MySQL (Sequelize)
- JWT Authentication
- GitHub API Integration

### Frontend
- React
- Chart.js
- Axios for API calls

### DevOps
- Docker & Docker Compose

## Quick Start with Docker
```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/cicd-pipeline-dashboard.git
cd cicd-pipeline-dashboard

# Create .env file in backend/
cp backend/.env.example backend/.env
# Add your GITHUB_TOKEN and JWT_SECRET

# Run with Docker Compose
docker-compose up
```

Visit `http://localhost:3000` and login with `admin` / `password123`

## Manual Installation

### Prerequisites
- Node.js 16+
- MongoDB
- MySQL
- GitHub Personal Access Token

### Backend Setup
```bash
cd backend
npm install
```

Create `.env` file:
```env
PORT=5001
MONGO_URI=mongodb://localhost:27017/cicd_dashboard
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=your_password
MYSQL_DATABASE=cicd_metadata
JWT_SECRET=your_secret_key_here
GITHUB_TOKEN=your_github_personal_access_token
```

Run backend:
```bash
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login

### Pipeline
- `GET /api/pipeline/runs` - Get all pipeline runs
- `GET /api/pipeline/stats` - Get pipeline statistics
- `GET /api/pipeline/metadata/:runId` - Get build metadata
- `POST /api/pipeline/sync` - Sync GitHub workflow data

## Usage

1. Start MongoDB and MySQL servers
2. Run backend server: `cd backend && npm run dev`
3. Run frontend: `cd frontend && npm start`
4. Login with credentials (default: admin/password123)
5. Sync GitHub repository data via the dashboard

## Project Highlights

- **Multi-Database Integration**: Demonstrates proficiency with both SQL and NoSQL databases
- **RESTful API Design**: Clean separation of concerns with Express.js routes
- **Authentication & Security**: JWT tokens, password encryption, CORS configuration
- **External API Integration**: GitHub Actions API for real-time data
- **Full-Stack Development**: End-to-end implementation from database to UI
- **Docker Ready**: Production-ready containerization

## Future Enhancements

- [ ] Webhook support for real-time updates
- [ ] Email notifications for failed builds
- [ ] Support for multiple CI/CD platforms (Jenkins, CircleCI, GitLab)
- [ ] Advanced analytics and reporting
- [ ] User management system
- [ ] Deployment to cloud platform (AWS/GCP/Azure)

## License

MIT