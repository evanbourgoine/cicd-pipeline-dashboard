# CI/CD Pipeline Dashboard

A full-stack web application for monitoring CI/CD pipeline metrics with multi-database architecture.

## Features

- **Real-time Pipeline Monitoring**: Track GitHub Actions workflow runs
- **Multi-Database Architecture**: MongoDB for pipeline logs, MySQL for build metadata
- **REST API**: Express.js backend with JWT authentication
- **Interactive Dashboard**: React frontend with Chart.js visualizations
- **GitHub Integration**: Automatic syncing of workflow data
- **Secure Authentication**: JWT-based auth with bcrypt password hashing

## Tech Stack

### Backend
- Node.js + Express
- MongoDB (Mongoose)
- MySQL (Sequelize)
- JWT Authentication
- GitHub API Integration

### Frontend
- React
- Chart.js / Recharts
- Axios for API calls

### DevOps
- Docker & Docker Compose
- GitHub Actions CI/CD

## Installation

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
PORT=5000
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

## Environment Variables

| Variable | Description |
|----------|-------------|
| `GITHUB_TOKEN` | GitHub Personal Access Token for API access |
| `MONGO_URI` | MongoDB connection string |
| `MYSQL_HOST` | MySQL host |
| `JWT_SECRET` | Secret key for JWT signing |

## Security Features

- JWT-based authentication
- Bcrypt password hashing
- Environment variable protection
- CORS configuration
- Input validation

## Future Enhancements

- [ ] Webhook support for real-time updates
- [ ] Email notifications for failed builds
- [ ] Support for multiple CI/CD platforms
- [ ] Advanced analytics and reporting
- [ ] User management system

## License

MIT