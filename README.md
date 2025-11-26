\# 🔒 Cybersecurity Threat Intelligence Dashboard



!\[Dashboard Preview](https://img.shields.io/badge/Status-Active-success)

!\[Node](https://img.shields.io/badge/Node.js-16+-green)

!\[License](https://img.shields.io/badge/License-MIT-blue)



A professional-grade cybersecurity monitoring platform with \*\*n8n automation\*\* for real-time threat detection, analysis, and automated incident response.



\## 🎯 Features



\- ✅ \*\*Real-time Threat Detection\*\* - Monitor and detect cyber threats instantly

\- ✅ \*\*Multi-Severity Classification\*\* - High, Medium, Low severity levels

\- ✅ \*\*Automated Blocking\*\* - Intelligent threat mitigation

\- ✅ \*\*n8n Workflow Integration\*\* - Automated incident response

\- ✅ \*\*Activity Logging\*\* - Complete audit trail

\- ✅ \*\*Statistical Dashboard\*\* - Visual analytics

\- ✅ \*\*Report Export\*\* - JSON format for SIEM integration

\- ✅ \*\*RESTful API\*\* - Easy integration with other tools



\## 🚀 Quick Start



\### Prerequisites



\- Node.js 16+ (\[Download](https://nodejs.org/))

\- Git (\[Download](https://git-scm.com/))

\- n8n (optional but recommended)



\### Installation



1\. \*\*Clone the repository:\*\*

```bash

git clone https://github.com/yourusername/cybersecurity-dashboard.git

cd cybersecurity-dashboard

```



2\. \*\*Install dependencies:\*\*

```bash

npm install

```



3\. \*\*Configure environment variables:\*\*

```bash

cp .env.example .env

\# Edit .env with your settings

```



4\. \*\*Start the server:\*\*

```bash

npm start

```



5\. \*\*Open your browser:\*\*

```

http://localhost:3000

```



\## 🔧 Configuration



\### Environment Variables



Edit the `.env` file:

```env

PORT=3000                                          # Server port

N8N\_WEBHOOK\_URL=http://localhost:5678/webhook/threat-alert  # n8n webhook

SMTP\_HOST=smtp.gmail.com                          # Email server

SMTP\_USER=your-email@gmail.com                    # Email address

SLACK\_WEBHOOK\_URL=https://hooks.slack.com/...     # Slack notifications

```



\## 🤖 n8n Integration Setup



\### Step 1: Install n8n

```bash

npm install n8n -g

```



\### Step 2: Start n8n

```bash

n8n start

```



Open: http://localhost:5678



\### Step 3: Import Workflow



1\. In n8n, click \*\*"Workflows" → "Add Workflow"\*\*

2\. Click the \*\*"⋮" menu → "Import from File"\*\*

3\. Select `n8n-workflow.json` from this project

4\. Click \*\*"Save"\*\*



\### Step 4: Activate Workflow



1\. Click the \*\*"Active"\*\* toggle to enable the workflow

2\. Copy the webhook URL from the Webhook node

3\. Update `.env` with the webhook URL

4\. Restart the dashboard server



\### Step 5: Test Connection

```bash

curl http://localhost:3000/api/test-n8n

```



\## 📡 API Endpoints



\### GET Endpoints



| Endpoint | Description |

|----------|-------------|

| `GET /` | Dashboard UI |

| `GET /api/status` | System status |

| `GET /api/threats` | List all threats |

| `GET /api/logs` | Activity logs |

| `GET /api/stats` | Statistics |

| `GET /api/export` | Export report |

| `GET /api/test-n8n` | Test n8n connection |



\### POST Endpoints



| Endpoint | Description | Body |

|----------|-------------|------|

| `POST /api/threats` | Create threat | `{type, severity, ip, blocked}` |

| `POST /api/logs` | Add log entry | `{message, type}` |

| `POST /api/reset` | Reset system | `{}` |



\## 🔄 n8n Workflow Structure



The included workflow (`n8n-workflow.json`) provides:



1\. \*\*Webhook Trigger\*\* - Receives threat alerts

2\. \*\*Severity Filter\*\* - Routes based on threat level

3\. \*\*Email Notifications\*\* - Sends alerts to admins

4\. \*\*Slack Messages\*\* - Posts to security channel

5\. \*\*Database Logging\*\* - Stores in external DB

6\. \*\*SIEM Integration\*\* - Forwards to security tools



\## 📊 Usage Examples



\### Detect a Threat

```bash

curl -X POST http://localhost:3000/api/threats \\

&nbsp; -H "Content-Type: application/json" \\

&nbsp; -d '{

&nbsp;   "type": "SQL Injection",

&nbsp;   "severity": "high",

&nbsp;   "ip": "192.168.1.100",

&nbsp;   "blocked": true

&nbsp; }'

```



\### Get Statistics

```bash

curl http://localhost:3000/api/stats

```



\### Export Report

```bash

curl http://localhost:3000/api/export > security-report.json

```



\## 🌐 Deployment



\### Deploy to Vercel

```bash

npm install -g vercel

vercel

```



\### Deploy to Heroku

```bash

heroku create cybersecurity-dashboard

git push heroku main

heroku config:set N8N\_WEBHOOK\_URL=your\_webhook\_url

```



\### Deploy to Render



1\. Go to \[render.com](https://render.com)

2\. Connect your GitHub repository

3\. Set environment variables

4\. Deploy!



\### Deploy with Docker

```bash

docker build -t cybersecurity-dashboard .

docker run -p 3000:3000 cybersecurity-dashboard

```



\## 🔐 Security Best Practices



\- ✅ Never commit `.env` to Git

\- ✅ Use HTTPS in production

\- ✅ Implement rate limiting

\- ✅ Add authentication middleware

\- ✅ Validate all inputs

\- ✅ Use environment variables

\- ✅ Regular security updates



\## 📁 Project Structure

```

cybersecurity-dashboard/

├── public/

│   └── index.html          # Frontend UI

├── server.js               # Backend API

├── package.json            # Dependencies

├── .env                    # Environment variables

├── .gitignore             # Git ignore rules

├── n8n-workflow.json      # n8n automation

└── README.md              # Documentation

```



\## 🛠️ Tech Stack



\- \*\*Frontend:\*\* React, Tailwind CSS

\- \*\*Backend:\*\* Node.js, Express.js

\- \*\*Automation:\*\* n8n

\- \*\*API:\*\* RESTful

\- \*\*Icons:\*\* Lucide React



\## 🤝 Contributing



1\. Fork the repository

2\. Create your feature branch (`git checkout -b feature/AmazingFeature`)

3\. Commit your changes (`git commit -m 'Add AmazingFeature'`)

4\. Push to the branch (`git push origin feature/AmazingFeature`)

5\. Open a Pull Request



\## 📝 License



This project is licensed under the MIT License - see the \[LICENSE](LICENSE) file for details.



\## 🐛 Troubleshooting



\### n8n webhook not working?

\- Check `.env` has correct `N8N\_WEBHOOK\_URL`

\- Verify n8n workflow is active

\- Test with: `npm run test-n8n`



\### Port already in use?

\- Change `PORT` in `.env`

\- Or kill the process: `npx kill-port 3000`



\### Dependencies error?

```bash

rm -rf node\_modules package-lock.json

npm install

```



\## 📧 Support



\- \*\*Issues:\*\* \[GitHub Issues](https://github.com/yourusername/cybersecurity-dashboard/issues)

\- \*\*Email:\*\* your-email@example.com

\- \*\*Discord:\*\* \[Join our server](https://discord.gg/your-invite)



\## 🌟 Star History



If you find this project helpful, please give it a star! ⭐



---



\*\*Made with ❤️ by \[Your Name]\*\*

