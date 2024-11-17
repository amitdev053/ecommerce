import React, { useRef, useState, useEffect } from "react";

const ScrollTag = () => {
  // Ref for the scrollable container
  const ScrollDivTags = useRef(null);
  const [isAtStart, setIsAtStart] = useState(true);
  function nextTag() {
    const container = ScrollDivTags.current;
    if (container) {
      container.scrollLeft += 700; // Adjust the scroll amount as needed
      hideLeftArrow();
    }
  }
  const hideLeftArrow = () => {
    const container = ScrollDivTags.current;
    if (container) {
      setIsAtStart(container.scrollLeft === 0);
    }
  };
  function prevTag() {
    const container = ScrollDivTags.current;
    if (container) {
      container.scrollLeft -= 700; // Adjust the scroll amount as needed
      hideLeftArrow();
    }
  }
  useEffect(() => {
    const container = ScrollDivTags.current;
    if (container) {
      container.addEventListener("scroll", hideLeftArrow);
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", hideLeftArrow);
      }
    };
  }, []);
  return (
    <>
      <div
        className="container d-flex align-items-center st_blog_tag_suggestion position-relative p-0"
        style={{ height: "60px" }}
      >
        {!isAtStart && (
          <i
            class="fa-solid fa-angle-left position-absolute app_blog_tag_left"
            onClick={prevTag}
          ></i>
        )}

        <div
          className="d-flex align-items-center blog_tag_suggestion"
          ref={ScrollDivTags}
          style={{ scrollBehavior: "smooth" }}
        >
          <span class="app_blog_tag_text">JavaScript</span>
          <span class="app_blog_tag_text">React</span>
          <span class="app_blog_tag_text">React Native</span>
          <span class="app_blog_tag_text">Programming Languages</span>
          <span class="app_blog_tag_text">Python</span>
          <span class="app_blog_tag_text">Java</span>
          <span class="app_blog_tag_text">Ruby</span>
          <span class="app_blog_tag_text">C#</span>
          <span class="app_blog_tag_text">Go</span>
          <span class="app_blog_tag_text">Rust</span>
          <span class="app_blog_tag_text">TypeScript</span>

          <span class="app_blog_tag_text">Web Development</span>
          <span class="app_blog_tag_text">Frontend</span>
          <span class="app_blog_tag_text">Backend</span>
          <span class="app_blog_tag_text">Fullstack</span>
          <span class="app_blog_tag_text">HTML</span>
          <span class="app_blog_tag_text">CSS</span>
          <span class="app_blog_tag_text">Angular</span>
          <span class="app_blog_tag_text">Vue.js</span>
          <span class="app_blog_tag_text">Node.js</span>

          <span class="app_blog_tag_text">Mobile Development</span>
          <span class="app_blog_tag_text">iOS</span>
          <span class="app_blog_tag_text">Android</span>
          <span class="app_blog_tag_text">Flutter</span>
          <span class="app_blog_tag_text">Swift</span>
          <span class="app_blog_tag_text">Kotlin</span>

          <span class="app_blog_tag_text">Cloud & DevOps</span>
          <span class="app_blog_tag_text">AWS</span>
          <span class="app_blog_tag_text">Azure</span>
          <span class="app_blog_tag_text">Google Cloud</span>
          <span class="app_blog_tag_text">Docker</span>
          <span class="app_blog_tag_text">Kubernetes</span>
          <span class="app_blog_tag_text">CI/CD</span>
          <span class="app_blog_tag_text">Serverless</span>
          <span class="app_blog_tag_text">Terraform</span>

          <span class="app_blog_tag_text">Data Science & AI</span>
          <span class="app_blog_tag_text">Machine Learning</span>
          <span class="app_blog_tag_text">Data Analysis</span>
          <span class="app_blog_tag_text">Artificial Intelligence</span>
          <span class="app_blog_tag_text">Deep Learning</span>
          <span class="app_blog_tag_text">TensorFlow</span>
          <span class="app_blog_tag_text">Pandas</span>
          <span class="app_blog_tag_text">R</span>

          <span class="app_blog_tag_text">Databases</span>
          <span class="app_blog_tag_text">SQL</span>
          <span class="app_blog_tag_text">NoSQL</span>
          <span class="app_blog_tag_text">MongoDB</span>
          <span class="app_blog_tag_text">PostgreSQL</span>
          <span class="app_blog_tag_text">MySQL</span>
          <span class="app_blog_tag_text">Redis</span>
          <span class="app_blog_tag_text">Elasticsearch</span>
          <span class="app_blog_tag_text">Firebase</span>

          <span class="app_blog_tag_text">Career Development</span>
          <span class="app_blog_tag_text">Job Hunting</span>
          <span class="app_blog_tag_text">Interviewing</span>
          <span class="app_blog_tag_text">Resume Writing</span>
          <span class="app_blog_tag_text">Freelancing</span>
          <span class="app_blog_tag_text">Remote Work</span>
          <span class="app_blog_tag_text">Tech Industry</span>

          <span class="app_blog_tag_text">Open Source</span>
          <span class="app_blog_tag_text">Contributing</span>
          <span class="app_blog_tag_text">Projects</span>
          <span class="app_blog_tag_text">GitHub</span>
          <span class="app_blog_tag_text">Licensing</span>
          <span class="app_blog_tag_text">Hacktoberfest</span>
          <span class="app_blog_tag_text">Community</span>

          <span class="app_blog_tag_text">Security</span>
          <span class="app_blog_tag_text">Cybersecurity</span>
          <span class="app_blog_tag_text">Encryption</span>
          <span class="app_blog_tag_text">Penetration Testing</span>
          <span class="app_blog_tag_text">OWASP</span>
          <span class="app_blog_tag_text">Authentication</span>
          <span class="app_blog_tag_text">SSL/TLS</span>
          <span class="app_blog_tag_text">Vulnerability Management</span>

          <span class="app_blog_tag_text">Tools & Software</span>
          <span class="app_blog_tag_text">VS Code</span>
          <span class="app_blog_tag_text">Git</span>
          <span class="app_blog_tag_text">Command Line</span>
        </div>
        <i
          class="fa-solid fa-angle-right position-absolute app_blog_tag_right"
          onClick={nextTag}
        ></i>
      </div>
    </>
  );
};

export default ScrollTag;
