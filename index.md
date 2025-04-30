<!-- [Natural language processing 10-Ks to identify risks](/pdf/report.md) -->
<!-- 引入自定义样式和脚本 -->
<link rel="stylesheet" href="./assets/css/style.css">
<script src="./assets/js/script.js"></script>

<!-- 侧边栏和主内容区用HTML实现，内容用你的个人信息填充 -->

<div class="wrapper">
  <div class="sidebar">
    <div class="profile">
      <div class="ava-box">
        <img src="./images/ava.jpg" alt="Chris Luo" class="avatar" />
      </div>
      <h1>Chris Luo</h1>
      <p>Student in Finance and Risk Management</p>
    </div>
    <nav>
      <ul>
        <li><a href="#about">About Me</a></li>
        <li><a href="#portfolio">Portfolio</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
    <div class="social-links">
      <a href="https://www.linkedin.com/in/haonan-luo-562883231/" class="social-link">LinkedIn</a>
      <a href="https://github.com/Chris514" class="social-link">Github</a>
      <a href="mailto:your.email@example.com" class="social-link">Email</a>
    </div>
  </div>

  <div class="main-content">
    <section id="about" class="section">
      <h2>Personal Statement</h2>
      <div class="statement-container">
        <div class="statement-paragraph fade-in">
          <p>Hello! My name is Haonan Luo. I am from China and currently finishing my undergraduate degree in Finance at Lehigh University, with a minor in Business Information Systems. In Fall 2025, I will begin my graduate studies in Enterprise Risk Management at Columbia University.</p>
        </div>
        <div class="statement-paragraph fade-in">
          <p>I have strong interests in finance, risk management, and data analysis. My internship experiences in China gave me hands-on skills working with large datasets, financial risks, and budget planning using tools like SQL, Excel, Tableau, and SAP. I have also worked with teams to develop risk strategies and support business decisions.</p>
        </div>
        <div class="statement-paragraph fade-in">
          <p>Outside of academics, I am active in the World Affairs Club and Formula SAE, which helped me improve my communication and teamwork abilities.</p>
        </div>
        <div class="statement-paragraph fade-in">
          <p>I am excited to continue my studies at Columbia, learn from top professors and classmates, and prepare for a career in risk management and finance.</p>
        </div>
      </div>
    </section>
  <section id="portfolio" class="section">
    <h2>Portfolio</h2>
    </section>
    <div class="portfolio-item">
      <!-- <h3>entiment in 10-K filings and stock returns</h3> -->
      <p>
        <!-- <a href="./pdf/report.md" style="font-weight:bold; font-style:italic; font-size:1.1em;">
          entiment in 10-K filings and stock returns
        </a> -->
               <!-- <a href="https://nbviewer.org/github/Chris514/Chris514.github.io/blob/master/pdf/report.md" style="font-weight:bold; font-style:italic; font-size:1.1em;">
          entiment in 10-K filings and stock returns
        </a> -->
        <a href="/pdf/report.html" style="font-weight:bold; font-style:italic; font-size:1.1em;">
          entiment in 10-K filings and stock returns
        </a>
      </p>
            <p>This project explores how the sentiment in companies’ 10-K filings affects their stock returns. By analyzing the text of 501 firms’ 10-K reports and measuring sentiment using established dictionaries and machine learning, we investigate how positive or negative language relates to stock performance before and after the filing date. The results show that negative sentiment in these filings is linked to lower short-term stock returns, while positive sentiment’s effect is less consistent. Overall, the study highlights the predictive value of financial sentiment for market reactions.</p>
      <img src="MidtermPro/output_5_1.png" alt="Event Study: Sentiment vs. Returns" />

  </div>
    <div class="portfolio-item">
      <h3>Scatter Plot: Sentiment vs. Returns</h3>
            <p>This project visualizes the scatter relationship between machine learning sentiment scores and stock returns on the announcement date, exploring the immediate impact of sentiment scores on market reactions.</p>
      <img src="MidtermPro/output_8_0.png" alt="Scatter Plot: Sentiment vs. Returns" />
    </div>
    <div class="portfolio-item">
      <h3>Sentiment Profiles Over Event Time</h3>
            <p>This project plots the sentiment score trends of high and low sentiment groups within the event window, reflecting the sentiment dynamics of firms before and after major disclosures.</p>
      <img src="MidtermPro/output_11_0.png" alt="Sentiment Profiles Over Event Time" />
    </div>
       <!-- <a href="https://nbviewer.org/github/Chris514/Chris514.github.io/blob/master/pdf/sample_presentation.pdf" class="btn" target="_blank">View on nbviewer</a> -->
  </section>

  <section id="contact" class="section">
    <h2>Contact</h2>
    <p>Email: haonanluo@outlook.com</p>
  </section>
  </div>
</div>

<footer>
  <p>© 2024 Chris Luo. Design: HTML5 UP.</p>
</footer>

<!-- 如需自定义样式，请在assets/css/wide_style.scss中添加 -->
