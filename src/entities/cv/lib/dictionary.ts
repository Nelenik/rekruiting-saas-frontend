import { ECvStatus } from "@/shared/api/types";

import HunterIcon from "@/assets/sources/hunter.svg?rc";

export const workStatusDict = {
  [ECvStatus.LOOKING]: "в поиске",
  [ECvStatus.CONSIDERING]: "рассматривает предложения",
  [ECvStatus.SILENT]: "не в поиске",
  [ECvStatus.OFFER]: "есть оффер",
};

export const cvSource = {
  hh: {
    url: "https://hunter.io/resume/",
    HunterIcon,
    name: "hunter.io",
  },
};

export const skills: string[] = [
  // Frontend Development
  "HTML, CSS, JavaScript",
  "TypeScript, React, Redux",
  "Vue.js, Vuex, Nuxt.js",
  "Angular, TypeScript, RxJS",
  "Sass/SCSS, Bootstrap, Responsive Design",
  "Webpack, Babel, npm/yarn",
  "Next.js, React, Tailwind CSS",
  "jQuery, Bootstrap, PHP",

  // Backend Development
  "Node.js, Express, MongoDB",
  "Python, Django, PostgreSQL",
  "Python, Flask, SQLAlchemy",
  "Java, Spring Boot, MySQL",
  "C#, .NET Core, SQL Server",
  "PHP, Laravel, MySQL",
  "Ruby, Ruby on Rails, PostgreSQL",
  "Go, Gin, Redis",
  "Rust, Actix, PostgreSQL",

  // Full Stack
  "MEAN",
  "MERN",
  "LAMP",
  "MongoDB, Express, Angular, Node.js",
  "MongoDB, Express, React, Node.js",
  "Linux, Apache, MySQL, PHP",
  "Django, React, PostgreSQL",
  "Rails, Vue.js, PostgreSQL",

  // Mobile Development
  "React Native, Redux, TypeScript",
  "Flutter, Dart, Firebase",
  "Swift, UIKit, Core Data",
  "Kotlin, Android SDK, Room",
  "Xamarin, C#, MVVM",
  "Ionic, Angular, Cordova",

  // DevOps & Cloud
  "Docker, Kubernetes, AWS",
  "Terraform, AWS, CI/CD",
  "Jenkins, Docker, Git",
  "Azure, PowerShell, ARM Templates",
  "Google Cloud, Docker, Helm",
  "Ansible, Linux, Bash",
  "GitLab CI, Docker, Kubernetes",
  "Prometheus, Grafana, Kubernetes",

  // Data Science & Analytics
  "Python, Pandas, NumPy",
  "R, ggplot2, dplyr",
  "SQL, Python, Tableau",
  "Apache Spark, Scala, Hadoop",
  "TensorFlow, Keras, Python",
  "PyTorch, scikit-learn, Jupyter",
  "Power BI, DAX, SQL",
  "Elasticsearch, Kibana, Logstash",

  // Machine Learning & AI
  "Python, TensorFlow, Keras",
  "PyTorch, OpenCV, scikit-learn",
  "MLflow, Kubeflow, Docker",
  "Apache Airflow, Python, SQL",
  "Hugging Face, Transformers, BERT",
  "OpenAI API, LangChain, Vector DB",

  // Database & Big Data
  "PostgreSQL, MongoDB, Redis",
  "MySQL, PHP, phpMyAdmin",
  "Oracle, PL/SQL, SQL Developer",
  "Cassandra, Kafka, Spark",
  "Snowflake, dbt, SQL",
  "ClickHouse, Grafana, Python",

  // QA & Testing
  "Selenium, TestNG, Java",
  "Cypress, JavaScript, Mocha",
  "Postman, REST API, JSON",
  "JMeter, LoadRunner, Performance Testing",
  "Pytest, Python, Allure",
  "Appium, Mobile Testing, BDD",

  // Security & Cybersecurity
  "Penetration Testing, Kali Linux, Metasploit",
  "SIEM, Splunk, Security Analytics",
  "AWS Security, IAM, CloudTrail",
  "Wireshark, Network Security, TCP/IP",
  "OWASP, Burp Suite, Web Security",

  // Game Development
  "Unity, C#, 3D Graphics",
  "Unreal Engine, C++, Blueprints",
  "Godot, GDScript, 2D/3D",
  "WebGL, Three.js, JavaScript",

  // Blockchain
  "Solidity, Ethereum, Web3.js",
  "Smart Contracts, Truffle, Ganache",
  "Hyperledger, Fabric, Go",

  // UI/UX Design (Tech Skills)
  "Figma, Sketch, Adobe XD",
  "Photoshop, Illustrator, InDesign",
  "Principle, Framer, ProtoPie",
  "HTML/CSS, JavaScript, Design Systems",

  // System Administration
  "Linux, Bash, SystemD",
  "Windows Server, PowerShell, Active Directory",
  "VMware, vSphere, Networking",
  "Nagios, Zabbix, Monitoring",

  // Embedded Systems
  "C/C++, Arduino, Raspberry Pi",
  "FreeRTOS, STM32, Embedded C",
  "Python, MicroPython, IoT",

  // ERP & Business Systems
  "SAP ABAP, SAP HANA, Fiori",
  "Oracle EBS, PL/SQL, Forms",
  "Dynamics 365, Power Platform, C#",
  "Salesforce, Apex, Lightning",

  // Low-Code/No-Code
  "Power Apps, Power Automate, SharePoint",
  "Mendix, OutSystems, JavaScript",
  "Bubble, Webflow, Zapier",
];
