# CardioGuard - AI-Powered CVD Risk Assessment

<div align="center">
  <h3>🫀 Cardiovascular Disease Risk Prediction Using Machine Learning</h3>
  <p>Built for the <strong>Byte 2 Beat Hackathon</strong> by Devhoda</p>
</div>

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Demo](#demo)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [API Integration](#api-integration)
- [Model Information](#model-information)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

**CardioGuard** is an AI-powered web application that predicts cardiovascular disease (CVD) risk using machine learning. The application provides:

- **Real-time risk assessment** based on patient demographics, vital signs, and lifestyle factors
- **Interactive visualizations** including risk gauges and confidence metrics
- **Model interpretability** through SHAP (SHapley Additive exPlanations) analysis
- **User-friendly interface** with educational tooltips and clear explanations

This project demonstrates the practical application of machine learning in healthcare for early detection and risk stratification of cardiovascular disease.

---

## ✨ Features

### 🔍 Core Functionality
- **Comprehensive Risk Assessment**: Analyzes 11 key health parameters
- **Binary Classification**: Outputs High Risk (1) or Low Risk (0)
- **Confidence Scoring**: Displays model prediction probability
- **Visual Risk Gauge**: Interactive semicircular gauge showing risk level

### 🎨 User Experience
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS
- **Educational Tooltips**: Hover-over information for all input fields
- **Drawer Results**: Smooth sliding drawer for prediction results
- **Real-time Validation**: Form validation using Zod and React Hook Form
- **Error Handling**: Clear error messages and loading states

### 🧠 Model Transparency
- **SHAP Visualizations**: Feature importance and impact analysis
- **Medical Context**: Explanations of what results mean for patients
- **Disclaimers**: Clear educational/research purpose statements

---

## 🚀 Demo

**Live Demo**: [Here](https://cardioguard.vercel.app)

### Sample Inputs
Test the application with these example patients:

**Low Risk Patient:**
- Age: 45, Gender: Female
- Height: 165 cm, Weight: 60 kg
- BP: 110/70 mmHg
- Cholesterol: Normal, Glucose: Normal
- Non-smoker, No alcohol, Physically active

**High Risk Patient:**
- Age: 65, Gender: Male
- Height: 175 cm, Weight: 95 kg
- BP: 160/100 mmHg
- Cholesterol: Well Above Normal, Glucose: Above Normal
- Smoker, Regular alcohol, Not active

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5
- **UI Library**: React 19
- **Styling**: Tailwind CSS 4
- **Components**: Shadcn UI (Radix UI primitives)
- **Form Management**: React Hook Form 7
- **Validation**: Zod 4
- **HTTP Client**: Axios 1.13
- **Icons**: Lucide React

### Backend API
- **Framework**: FastAPI (Python)
- **Hosting**: Render
- **Endpoint**: `https://byte2beat-api.onrender.com/predict`

### Development Tools
- **Linter**: ESLint 9
- **Package Manager**: npm

---

## 🏁 Getting Started

### Prerequisites
- Node.js 20+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/cardioguard.git
   cd cardioguard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

### Build for Production

```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
cardioguard/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles
├── components/
│   ├── ui/                 # Shadcn UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── drawer.tsx
│   │   ├── form.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── select.tsx
│   │   └── switch.tsx
│   ├── AboutSection.tsx    # About & SHAP visualizations
│   ├── CvdForm.tsx         # Main form and results drawer
│   ├── InfoTooltip.tsx     # Tooltip component
│   └── RiskGauge.tsx       # SVG risk gauge visualization
├── lib/
│   ├── schema.ts           # Zod validation schemas
│   └── utils.ts            # Utility functions
├── public/
│   ├── shap-summary.png    # SHAP summary plot
│   └── shap-importance.png # Feature importance chart
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── README.md
```

---

## 🔌 API Integration

### Endpoint
```
POST https://byte2beat-api.onrender.com/predict
```

### Request Body
```json
{
  "age": 50,
  "gender": 1,          // 1 = Male, 2 = Female
  "height": 170,
  "weight": 70,
  "ap_hi": 120,         // Systolic BP
  "ap_lo": 80,          // Diastolic BP
  "cholesterol": 1,     // 1 = Normal, 2 = Above, 3 = Well Above
  "gluc": 1,            // 1 = Normal, 2 = Above, 3 = Well Above
  "smoke": 0,           // 0 = No, 1 = Yes
  "alco": 0,            // 0 = No, 1 = Yes
  "active": 1           // 0 = No, 1 = Yes
}
```

### Response
```json
{
  "risk": "Low Risk",   // "Low Risk" or "High Risk"
  "probability": 0.234, // Confidence score (0-1)
  "status": "Success"
}
```

---

## 🧮 Model Information

### Training Data
- **Dataset**: Cardiovascular disease dataset with patient records
- **Features**: 11 clinical and lifestyle variables
- **Target**: Binary classification (CVD present/absent)

### Model Performance
- **Algorithm**: Machine Learning Classification Model
- **Key Features** (SHAP Analysis):
  1. Systolic Blood Pressure (ap_hi)
  2. Age-Blood Pressure Interaction
  3. Cholesterol Level
  4. Mean Arterial Pressure (MAP)
  5. Age-BMI Interaction

### Interpretability
The model uses SHAP (SHapley Additive exPlanations) to provide:
- Feature importance rankings
- Individual prediction explanations
- Transparent decision-making process

See SHAP visualizations in the "About" section of the app.

---

## 🚢 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel auto-detects Next.js
   - Click "Deploy"

3. **Add SHAP Images**
   - Place `shap-summary.png` and `shap-importance.png` in `/public` folder
   - Commit and push

### Environment Variables
No environment variables required - API endpoint is public.

---

## 📊 Key Components Explained

### 1. CvdForm Component
Main form component handling:
- User input collection
- Form validation with Zod
- API communication
- Results display in drawer

### 2. RiskGauge Component
Custom SVG visualization:
- Semicircular gauge (0-100%)
- Color-coded risk levels
- Animated needle indicator

### 3. InfoTooltip Component
Educational tooltips:
- Hover/click to reveal
- Medical context for each field
- Normal ranges and risk factors

### 4. AboutSection Component
Comprehensive project information:
- How the model works
- SHAP interpretability charts
- Key features showcase

---

## 🔒 Disclaimer

**IMPORTANT**: This tool is designed for **educational and research purposes only** as part of the Byte 2 Beat Hackathon.

- ❌ Not intended for clinical use
- ❌ Not a substitute for professional medical advice
- ❌ Should not be used for diagnosis or treatment decisions

Always consult qualified healthcare providers regarding medical conditions.

---

## 🤝 Contributing

This project was built for the Byte 2 Beat Hackathon. Contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License.

---

## 👥 Authors

Built for the Byte 2 Beat Hackathon by Devhoda

---

## 🙏 Acknowledgments

- **Devhoda** for organizing the Byte 2 Beat Hackathon
- **Dataset providers** for the cardiovascular disease data
- **Open source community** for the amazing tools and libraries

---

<div align="center">
  <p>Built with ❤️ for the Byte 2 Beat Hackathon</p>
  <p><strong>CardioGuard</strong> - Empowering early CVD detection through AI</p>
</div>
