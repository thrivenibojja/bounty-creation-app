# 🏆 Bounty Creation Application Platform

A 3-step wizard to create bounties with validation, state management, preview, and final JSON output.

---

## 🚀 Live Demo

🔗 **[https://bounty-creation-app-task.vercel.app/](https://bounty-creation-app-task.vercel.app/)**

---

## 📂 GitHub Repository

🔗 **[https://github.com/thrivenibojja/bounty-creation-app](https://github.com/thrivenibojja/bounty-creation-app)**

---

## 📘 Project Overview

This project is a multi-step bounty creation wizard, built as part of an assignment to demonstrate skills in:

- Frontend architecture  
- Component reusability  
- Form handling & validation  
- Global state management  
- Clean UI built from Figma reference  
- Deployment workflow (GitHub → Vercel)  

### The wizard contains three main steps:

### **Step 1 – Basic Details**
- Bounty title  
- Description  
- Category  
- Dominant impact core  
- Mode (Digital / Physical)  
- Location field (only if Physical mode is selected)  

### **Step 2 – Rewards & Timeline**
- Reward currency & amount  
- Number of winners  
- Each winner reward  
- Failure threshold (%)  
- Expiration date  
- Estimated completion (Days / Hours / Minutes)  
- Impact Certificate toggle + brief  
- SDGs selection (multi-select dropdown)  

### **Step 3 – Backer Information**
- Backer toggle  
- Backer name  
- Logo uploader (preview, replace, delete)  
- Optional backer message  
- Terms & conditions checkbox  
- Final **Create Bounty** submit  

### Final Screens
- **Confirmation Screen** (loading simulation using `setTimeout`)  
- **Result Screen** displaying complete JSON payload  

---

## 🧰 Technology Stack

### **Frontend**
- React.js (Vite)  
- Context API (Global state management)  
- Tailwind CSS  
- Reusable UI components  

### **Build & Deployment**
- GitHub  
- Vercel (Auto deploy on push)  

---

## 🗂️ Folder Structure

```
src/
 ├── components/
 │     ├── layout/
 │     │     └── Sidebar.jsx
 │     └── ui/
 │         ├── Button.jsx
 │         ├── TextInput.jsx
 │         ├── TextArea.jsx
 │         ├── Toggle.jsx
 │         └── Select.jsx
 │
 ├── context/
 │     └── BountyFormContext.jsx
 │
 ├── pages/
 │     ├── StepBasics.jsx
 │     ├── StepRewards.jsx
 │     ├── StepBacker.jsx
 │     ├── ConfirmationScreen.jsx
 │     └── ResultScreen.jsx
 │
 ├── App.jsx
 └── main.jsx
```

---

## 🛠️ Setup & Run Instructions

### **1️⃣ Clone Repository**
```bash
git clone https://github.com/thrivenibojja/bounty-creation-app.git
cd bounty-creation-app
```

### **2️⃣ Install Dependencies**
```bash
npm install
```

### **3️⃣ Start Development Server**
```bash
npm run dev
```

### **4️⃣ Build for Production**
```bash
npm run build
```

### **5️⃣ Preview Production Build**
```bash
npm run preview
```

---

## 🌐 Deployment (Vercel)

The project is deployed via Vercel, directly connected to GitHub.  
Every push to the `main` branch automatically deploys a new build.

Live URL:  
👉 **[https://bounty-creation-app-task.vercel.app/](https://bounty-creation-app-task.vercel.app/)**

---

