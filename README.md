# 🔒 **Cybersecurity Threat Intelligence Dashboard**

A lightweight cybersecurity monitoring dashboard with automated threat processing and optional **n8n integration** for workflow automation.

---

## 🚀 **Overview**

This project provides:

- **Real-time threat detection**
- **Severity-based classification (High / Medium / Low)**
- **Activity logging**
- **Dashboard UI**
- **REST API for integrations**
- **Optional n8n workflow automation**

---

## 📦 **Features**

- **Threat Detection API**
- **n8n Webhook Automation** (optional)
- **Activity Log & Stats Visualization**
- **Threat Export (JSON)**
- **Simple Express.js Backend**
- **Clean Frontend (HTML + Tailwind)**

---

## 🗂 **Project Structure**
```
cybersecurity-dashboard/
├── public/              # Frontend UI
│   └── index.html
├── server.js            # Backend API
├── package.json
├── n8n-workflow.json    # n8n automation workflow
├── .env.example         # Example environment variables
└── README.md
```

---

## ⚙️ **Setup & Installation**

### **1️⃣ Clone the repository**

```bash
git clone https://github.com/Rohit-Zi/cybersecurity-dashboard.git
cd cybersecurity-dashboard
```
### **2️⃣ Install dependencies**
``` bash
npm install
```
### **3️⃣ Configure environment variables**
``` bash
cp .env.example .env
```

### Edit `.env` file:
```bash
PORT=3000
N8N_WEBHOOK_URL=http://localhost:5678/webhook/threat-alert
```

## 🚀 Getting Started

### Start the server
```bash
npm start
```

### Open the dashboard

Navigate to: **http://localhost:3000**

## 🤖 Optional: n8n Automation Setup

### 1️⃣ Start n8n
```bash
npx n8n
```

Opens at: **http://localhost:5678**

### 2️⃣ Import the workflow

1. Go to **Workflows** → **Import from File**
2. Select `n8n-workflow.json`
3. Click **Save**
4. Enable **Active**

### 3️⃣ Configure Webhook URL

1. Copy the **Production URL** from the Webhook node
2. Update your `.env`:
```bash
N8N_WEBHOOK_URL=http://localhost:5678/webhook/threat-alert
```

3. Restart the server:
```bash
npm start
```

### 4️⃣ Test connection
```bash
curl http://localhost:3000/api/test-n8n
```

## 📡 API Endpoints

### Threats

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/threats` | Create new threat |
| GET | `/api/threats` | Fetch recent threats |

### Logs & Status

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/logs` | Activity logs |
| GET | `/api/stats` | Dashboard stats |
| GET | `/api/status` | Server status |

### Tools

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/export` | Download JSON report |
| POST | `/api/reset` | Reset dashboard data |

## 🧪 Example Usage

### Create a test threat
```bash
curl -X POST http://localhost:3000/api/threats \
  -H "Content-Type: application/json" \
  -d '{"type":"SQL Injection","severity":"high","ip":"192.168.1.10","blocked":true}'
```

### Get statistics
```bash
curl http://localhost:3000/api/stats
```

## 🔐 Security Notes

- ⚠️ Never commit your real `.env` file
- 🔒 Use HTTPS in production
- ✅ Validate all inputs
- 🔑 Add authentication middleware
- 🔄 Keep dependencies updated

## 🙌 Author

Made with ❤️ by **Rohit Zilka**

GitHub: [https://github.com/Rohit-Zi](https://github.com/Rohit-Zi)





