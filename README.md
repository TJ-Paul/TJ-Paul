<!-- ═══════════════════════ HEADER ═══════════════════════ -->
<p align="center">
  <img width="100%" src="https://capsule-render.vercel.app/api?type=waving&color=0:0d1117,40:1a1b27,70:3b2c85,100:7aa2f7&height=230&section=header&text=Turjjo%20Paul&fontSize=72&fontColor=ffffff&animation=fadeIn&fontAlignY=36&desc=CSE%20%40%20BUET&descAlignY=58&descSize=18" alt="header"/>
</p>

<p align="center">
  <a href="https://git.io/typing-svg">
    <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=24&duration=3000&pause=800&color=7AA2F7&center=true&vCenter=true&multiline=false&width=680&height=50&lines=Hi+there+%F0%9F%91%8B+I'm+Turjjo+Paul;CSE+%40+BUET+%C2%B7+Level+2%2C+Term+2;Building+real-world+web+%26+Android+apps;Kotlin+%E2%80%A2+TypeScript+%E2%80%A2+PostgreSQL+%E2%80%A2+Java+%E2%80%A2+C" alt="Typing SVG"/>
  </a>
</p>

<p align="center">
  <a href="https://tj-paul.github.io/TJ-Paul/"><img src="https://img.shields.io/badge/Portfolio-22d3ee?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Portfolio"/></a>
  <a href="https://www.youtube.com/@turjjopaul1190"><img src="https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white" alt="YouTube"/></a>
  <a href="https://linkedin.com/in/turjjo-paul"><img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"/></a>
  <a href="mailto:tjpaul770@gmail.com"><img src="https://img.shields.io/badge/Gmail-EA4335?style=for-the-badge&logo=gmail&logoColor=white" alt="Email"/></a>
  <a href="https://fb.com/turjjo.paul"><img src="https://img.shields.io/badge/Facebook-1877F2?style=for-the-badge&logo=facebook&logoColor=white" alt="Facebook"/></a>
  <a href="https://instagram.com/turjjo_paul"><img src="https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white" alt="Instagram"/></a>
</p>
<p align="center">
  <img src="https://komarev.com/ghpvc/?username=TJ-Paul&style=flat-square&color=7aa2f7&label=profile+views" alt="Profile views"/>
  <img src="https://img.shields.io/github/followers/TJ-Paul?style=flat-square&color=bb9af7&label=followers" alt="followers"/>
  <img src="https://img.shields.io/badge/Dhaka-Bangladesh-9ece6a?style=flat-square&logo=googlemaps&logoColor=white" alt="location"/>
</p>

<!-- ═══════════════════════ ABOUT ═══════════════════════ -->
<h2>
  <img src="https://media.giphy.com/media/hvRJCLFzcasrR4ia7z/giphy.gif" width="28"/> About Me
</h2>

```python
class TurjjoPaul:
    def __init__(self):
        self.university = "Bangladesh University of Engineering and Technology (BUET)"
        self.degree     = "B.Sc. in Computer Science & Engineering"
        self.term       = "Level 2, Term 2"
        self.pronouns   = "he/him"

        self.shipped    = ["Aula Dining", "Split the Bill"]
        self.languages  = ["C", "C++", "Java", "Kotlin", "Python", "TypeScript", "SQL", "MIPS"]
        self.clubs      = ["IEEE CS BUET SBC (executive member)", "BUET Cyber Security Club"]

    def motto(self):
        return "Build it so it holds up in real use."
```

<!-- ═══════════════════════ FEATURED ═══════════════════════ -->
<h2>🚀 Featured · Real-World Projects</h2>

### 🍽️ Aula Dining &nbsp; <a href="https://aula-dining.vercel.app"><img src="https://img.shields.io/badge/Live_App-aula--dining.vercel.app-10b981?style=flat-square&logo=vercel&logoColor=white" alt="Live app"/></a> <a href="https://tj-paul.github.io/Aula-north-dining-management/login/"><img src="https://img.shields.io/badge/Live_Demo-try_it-a78bfa?style=flat-square&logo=githubpages&logoColor=white" alt="Live demo"/></a> <img src="https://img.shields.io/badge/active_users-367-22d3ee?style=flat-square" alt="367 active users"/>

A dining management PWA for the residents of **Ahsanullah Hall North, BUET**. It runs meal scheduling, seat booking in batches, coupon-based attendance and a live workflow for mess staff.

- **Rules in the database:** Postgres constraints, triggers and SQL functions across 59 versioned migrations. Clients never write tables directly.
- **Safe under load:** ordered row locks and idempotency keys. Booking never oversells, and retries or double taps are harmless.
- **Role-based access** for students, mess managers and super admins.
- **Tested:** 18 database integration test files on PGlite (Postgres in WASM), plus a load test on the live deployment: [▶ watch the load test](https://youtu.be/mUQwqQ7NuBc) · [bloopers](https://youtu.be/GrcmT7QEw7k)

`Next.js` `TypeScript` `Supabase` `PostgreSQL` `pg_cron` `Web Push` `Vitest`

### 🧾 Split the Bill &nbsp; <img src="https://img.shields.io/badge/personal_product-Android-a78bfa?style=flat-square&logo=android&logoColor=white" alt="Personal product"/>

An Android app for group outings, where restaurant items carry a percentage VAT or service charge but rickshaws, bikes and tickets are flat costs. It tracks each person's itemised orders, spreads the VAT and service charge across food items in proportion, keeps flat costs separate, and handles outings with several stops.

`Kotlin` `Jetpack Compose`

<!-- ═══════════════════════ ACADEMIC ═══════════════════════ -->
<h2>🎓 Academic & Engineering Projects</h2>

| Project | Course | What it is | Tech |
|:--|:--|:--|:--|
| 🎧 **Audio Craft** · [web](https://github.com/TJ-Paul/CSE220-Signal-Project) · [android](https://github.com/TJ-Paul/Signal_Lab) | CSE 220 | Audio signal processing and visualisation toolkit: FFT, spectrograms, filtering, Demucs and Whisper | `Python` `Kotlin` `ONNX` |
| 🎬 **IMDb Clone** | CSE 216 | Full-stack movie database with a normalised schema and complex queries | `PostgreSQL` `Express` `React` `Node` |
| 📈 **LoadLab** | CSE 214 | Load-testing and performance benchmarking workflow | `Apache JMeter` |
| ✅ **[OrganizeMe](https://github.com/TJ-Paul/OrganizeMe-JavaFX-v2-L1T2)** | CSE 108 | Multi-threaded client-server task app with real-time messaging and Pomodoro | `Java` `JavaFX` `Sockets` |
| 🐍 **[Snake Game](https://github.com/TJ-Paul/SnakeGame-iGraphics-L1T1)** | CSE 102 | Classic arcade game written from scratch | `C` `iGraphics` |
| 🔺 **[Tessellate](https://github.com/TJ-Paul/Tessellate-JavaFX)** | side project | The dot-and-triangle school game, built with CSE 108 skills | `Java` `JavaFX` |
| 📦 **SpaceManager** | side project | 2D shape-packing desktop utility, shipped as an executable JAR | `Java` `JavaFX` |

<sub>Side experiments, just for fun: [Möbius visualizer](https://tj-paul.github.io/Mobius-Transformation-visualization/) · [wedding invitation](https://tj-paul.github.io/wedding-invitation-parallax/) · [parallax](https://github.com/TJ-Paul/Parallax-Effect) · [flip clock](https://github.com/TJ-Paul/flip-clock) · [calculator](https://tj-paul.github.io/calculator/) · [python notes](https://github.com/TJ-Paul/python-notes)</sub>

<!-- ═══════════════════════ TECH STACK ═══════════════════════ -->
<h2>🛠️ Tech Stack</h2>

<p align="center"><b>Languages</b></p>
<p align="center">
  <img src="https://skillicons.dev/icons?i=c,cpp,java,kotlin,py,js,ts&theme=dark" alt="languages"/><br/>
  <img src="https://img.shields.io/badge/SQL-336791?style=flat-square&logo=postgresql&logoColor=white" alt="SQL"/>
  <img src="https://img.shields.io/badge/MIPS_Assembly-555555?style=flat-square" alt="MIPS"/>
</p>

<p align="center"><b>Frontend · Mobile · Backend · Databases</b></p>
<p align="center">
  <img src="https://skillicons.dev/icons?i=nextjs,react,html,css,androidstudio,nodejs,express,postgres,mysql&theme=dark" alt="frameworks"/><br/>
  <img src="https://img.shields.io/badge/Jetpack_Compose-4285F4?style=flat-square&logo=jetpackcompose&logoColor=white" alt="Compose"/>
  <img src="https://img.shields.io/badge/JavaFX-007396?style=flat-square&logo=openjdk&logoColor=white" alt="JavaFX"/>
  <img src="https://img.shields.io/badge/Neon_DB-00E599?style=flat-square" alt="Neon"/>
  <img src="https://img.shields.io/badge/Oracle_SQL-F80000?style=flat-square&logo=oracle&logoColor=white" alt="Oracle"/>
</p>

<p align="center"><b>Data</b></p>
<p align="center">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg" alt="NumPy" width="40" height="40" title="NumPy"/>&nbsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg" alt="Pandas" width="40" height="40" title="Pandas"/>&nbsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/matplotlib/matplotlib-original.svg" alt="Matplotlib" width="40" height="40" title="Matplotlib"/>&nbsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg" alt="Jupyter" width="40" height="40" title="Jupyter"/>
</p>

<p align="center"><b>Tools · Testing · Design</b></p>
<p align="center">
  <img src="https://skillicons.dev/icons?i=git,github,vercel,latex,idea,vscode,notion,obsidian&theme=dark" alt="tools"/><br/>
  <img src="https://img.shields.io/badge/Apache_JMeter-D22128?style=flat-square&logo=apachejmeter&logoColor=white" alt="JMeter"/>
  <img src="https://img.shields.io/badge/Logisim_Evolution-555555?style=flat-square" alt="Logisim"/>
  <img src="https://img.shields.io/badge/DaVinci_Resolve-233A51?style=flat-square&logo=davinciresolve&logoColor=white" alt="DaVinci Resolve"/>
  <img src="https://img.shields.io/badge/Lightroom-31A8FF?style=flat-square&logo=adobelightroom&logoColor=white" alt="Lightroom"/>
</p>

<!-- ═══════════════════════ COURSEWORK ═══════════════════════ -->
<h2>📚 Coursework · BUET CSE</h2>

<details open>
<summary><b>Level 2, Term 2</b> · current, term final</summary>

CSE 209 Computer Architecture · CSE 210 Computer Architecture Sessional · CSE 211 Theory of Computation · CSE 213 Software Engineering *([notes](https://tj-paul.github.io/CSE213-SWE-TF/))* · CSE 214 Software Engineering Sessional *(LoadLab)* · CSE 219 Signals and Systems · CSE 220 Signals and Systems Sessional *(Audio Craft)* · MATH 243 Probability and Statistics *([notes](https://tj-paul.github.io/MATH243-TF/))*
</details>

<details>
<summary><b>Level 2, Term 1</b></summary>

CSE 205 Digital Logic Design · CSE 206 DLD Sessional · CSE 207 Data Structures and Algorithms II · CSE 208 DSA II Sessional · CSE 215 Database · CSE 216 Database Sessional *(PERN IMDb Clone)*
</details>

<details>
<summary><b>Level 1, Term 2</b></summary>

CSE 105 Data Structures and Algorithms I · CSE 106 DSA I Sessional · CSE 107 Object Oriented Programming Language · CSE 108 OOP Sessional *(OrganizeMe)* · MATH 143 Linear Algebra
</details>

<details>
<summary><b>Level 1, Term 1</b></summary>

CSE 101 Structured Programming Language (C) · CSE 102 SPL Sessional *(Snake Game)* · CSE 103 Discrete Mathematics · MATH 141 Calculus I
</details>

**📒 Course notes & materials I publish**

| Course | Website | Repo |
|:--|:--|:--|
| CSE 213 · Software Engineering | [tj-paul.github.io/CSE213-SWE-TF](https://tj-paul.github.io/CSE213-SWE-TF/) | [TJ-Paul/CSE213-SWE-TF](https://github.com/TJ-Paul/CSE213-SWE-TF) |
| MATH 243 · Probability & Statistics | [tj-paul.github.io/MATH243-TF](https://tj-paul.github.io/MATH243-TF/) | [TJ-Paul/MATH243-TF](https://github.com/TJ-Paul/MATH243-TF) |

<!-- ═══════════════════════ BEYOND ═══════════════════════ -->
<h2>🧩 Beyond Code</h2>

- 💠 **IEEE CS BUET SBC** (IEEE Computer Society BUET Student Branch Chapter): executive member.
- 🛡️ **BUET Cyber Security Club:** active member solving CTF problems and exploring security.

<!-- ═══════════════════════ STATS ═══════════════════════ -->
<h2>📊 GitHub Analytics</h2>

<p align="center">
  <img height="175" src="https://github-readme-stats.vercel.app/api?username=TJ-Paul&show_icons=true&theme=tokyonight&hide_border=true&border_radius=12&rank_icon=github" alt="stats"/>
  <img height="175" src="https://github-readme-stats.vercel.app/api/top-langs/?username=TJ-Paul&layout=compact&theme=tokyonight&hide_border=true&border_radius=12&langs_count=8&hide=tex" alt="top languages"/>
</p>
<p align="center">
  <img src="https://streak-stats.demolab.com?user=TJ-Paul&theme=tokyonight&hide_border=true&border_radius=12" alt="streak"/>
</p>
<p align="center">
  <img width="98%" src="https://github-readme-activity-graph.vercel.app/graph?username=TJ-Paul&theme=tokyo-night&hide_border=true&area=true&radius=12" alt="activity graph"/>
</p>

<!-- ═══════════════════════ FOOTER ═══════════════════════ -->
<p align="center">
  <img width="100%" src="https://capsule-render.vercel.app/api?type=waving&color=0:7aa2f7,30:3b2c85,60:1a1b27,100:0d1117&height=120&section=footer" alt="footer"/>
</p>
