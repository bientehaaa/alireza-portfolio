import { useEffect, useState, type ReactNode } from "react"

type PageKey = "home" | "about" | "case-studies" | "skills" | "consulting" | "contact"

const navigation: { label: string page: PageKey }[] = [
  { label: "Home", page: "home" },
  { label: "About", page: "about" },
  { label: "Case Studies", page: "case-studies" },
  { label: "Skills", page: "skills" },
  { label: "Consulting", page: "consulting" },
  { label: "Contact", page: "contact" },
]

const connections = {
  calendly: "https://calendly.com/alireza-kazemzadeh/intro-call",
  email: "alireza.kazemzadeh@gmail.com",
  linkedin: "https://www.linkedin.com/in/alireza-kazemzadeh",
  github: "https://bientehaaa.github.io/portfolio/",
}

const validPages = new Set(navigation.map(({ page }) => page))

function currentPage(): PageKey {
  const route = window.location.hash
    .replace(/^#\/?/, "")
    .split("?")[0] as PageKey
  return validPages.has(route) ? route : "home"
}

function currentCaseTarget() {
  const query = window.location.hash.split("?")[1]
  return query ? new URLSearchParams(query).get("case") : null
}

function Arrow({ direction = "right" }: { direction?: "right" | "down" }) {
  return (
    <svg
      aria-hidden="true"
      className={`arrow arrow-${direction}`}
      viewBox="0 0 20 20"
    >
      <path d="M3 10h13M11 5l5 5-5 5" />
    </svg>
  )
}

function BrandMark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      AK
    </span>
  )
}

function Link({
  page,
  children,
  className = "",
  onClick,
  query,
}: {
  page: PageKey
  children: ReactNode
  className?: string
  onClick?: () => void
  query?: string
}) {
  return (
    <a
      className={className}
      href={`#/${page}${query ? `?${query}` : ""}`}
      onClick={onClick}
    >
      {children}
    </a>
  )
}

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  return (
    <div
      className={`reveal ${className}`}
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </div>
  )
}

function Header({ page }: { page: PageKey }) {
  const [open, setOpen] = useState(false)

  useEffect(() => setOpen(false), [page])

  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link page="home" className="brand" onClick={() => setOpen(false)}>
          <BrandMark />
          <span className="brand-name">Alireza Kazemzadeh</span>
        </Link>
        <button
          className="menu-toggle"
          type="button"
          aria-controls="primary-navigation"
          aria-expanded={open}
          aria-label={open ? "Close navigation" : "Open navigation"}
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
        </button>
        <nav
          id="primary-navigation"
          className={`primary-nav ${open ? "is-open" : ""}`}
          aria-label="Primary navigation"
        >
          {navigation.map((item) => (
            <Link
              key={item.page}
              page={item.page}
              className={page === item.page ? "active" : ""}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div className="footer-identity">
          <BrandMark />
          <div>
            <p className="footer-name">Alireza Kazemzadeh</p>
            <p>Business Analyst | Business Systems Analyst</p>
          </div>
        </div>
        <nav className="footer-nav" aria-label="Footer navigation">
          {navigation.map((item) => (
            <Link key={item.page} page={item.page}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="footer-contact" aria-label="Contact channels">
          <div>
            <a href={`mailto:${connections.email}`}>Email</a>
            <i aria-hidden="true" />
          </div>
          <div>
            <a
              href={connections.linkedin}
              target="_blank"
              rel="noreferrer noopener"
            >
              LinkedIn
            </a>
            <i aria-hidden="true" />
          </div>
          <div>
            <a
              href={connections.github}
              target="_blank"
              rel="noreferrer noopener"
            >
              GitHub
            </a>
            <i aria-hidden="true" />
          </div>
        </div>
      </div>
      <div className="shell footer-bottom">
        <span>Business Analysis · Systems · Process · Data</span>
        <span>© {new Date().getFullYear()} Alireza Kazemzadeh</span>
      </div>
    </footer>
  )
}

function HeroVisual() {
  const nodes = [
    { label: "Business", className: "node-business" },
    { label: "Process", className: "node-process" },
    { label: "Data", className: "node-data" },
    { label: "Technology", className: "node-technology" },
  ]

  return (
    <div
      className="hero-visual hero-sequence-7"
      aria-label="Diagram connecting business, process, data, and technology to clarity"
    >
      <div className="diagram-grid" />
      <svg className="diagram-lines" viewBox="0 0 560 560" aria-hidden="true">
        <circle cx="280" cy="280" r="174" />
        <path className="diagram-frame" d="M150 160v240M410 160v240" />
        <path
          className="diagram-connection connection-business"
          d="M150 160L280 280"
        />
        <path
          className="diagram-connection connection-process"
          d="M410 160L280 280"
        />
        <path
          className="diagram-connection connection-data"
          d="M150 400L280 280"
        />
        <path
          className="diagram-connection connection-technology"
          d="M410 400L280 280"
        />
      </svg>
      <div className="center-node">
        <span>Shared value</span>
        <strong>Clarity</strong>
      </div>
      {nodes.map((node, index) => (
        <div
          className={`diagram-node ${node.className}`}
          key={node.label}
          tabIndex={0}
          aria-label={`${node.label}: connected to shared value and clarity`}
        >
          <span>0{index + 1}</span>
          <strong>{node.label}</strong>
        </div>
      ))}
      <span className="diagram-caption">
        Connected analysis / practical solutions
      </span>
    </div>
  )
}

const focusAreas = [
  "Requirements discovery & definition",
  "Process analysis & improvement",
  "Business systems & integration",
  "Data analysis & decision support",
  "Testing, validation & delivery",
]

const workSteps = [
  {
    number: "01",
    title: "Understand",
    copy: "Understand the business context, stakeholders, goals, and problem.",
  },
  {
    number: "02",
    title: "Analyze",
    copy: "Analyze requirements, processes, systems, data, and dependencies.",
  },
  {
    number: "03",
    title: "Design",
    copy: "Translate analysis into structured requirements, process models, solution concepts, and documentation.",
  },
  {
    number: "04",
    title: "Validate",
    copy: "Support validation through testing, UAT, feedback, and refinement.",
  },
]

const cases = [
  {
    number: "01",
    slug: "airport-passenger-flow-optimization",
    title: "Airport Passenger Flow Optimization",
    focus: ["Business Analysis", "Process Optimization", "BPMN"],
  },
  {
    number: "02",
    slug: "jobhelperai",
    title: "JobHelperAI",
    focus: ["Systems Analysis", "Automation", "SQL", "Data"],
  },
  {
    number: "03",
    slug: "travel-hospitality-technology",
    title: "Travel & Hospitality Technology",
    focus: ["Systems", "Integration", "Business Processes"],
  },
]

function SectionHeading({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string
  title: string
  copy?: string
}) {
  return (
    <Reveal className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {copy && <p className="section-intro">{copy}</p>}
    </Reveal>
  )
}

function CaseCard({
  item,
  delay = 0,
}: {
  item: typeof cases[number]
  delay?: number
}) {
  return (
    <Reveal className="case-card" delay={delay}>
      <div className="case-topline">
        <span className="case-number">{item.number}</span>
        <span className="case-status">Case study</span>
      </div>
      <h3>{item.title}</h3>
      <div className="tag-row">
        {item.focus.map((tag) => (
          <span className="tag" key={tag}>
            {tag}
          </span>
        ))}
      </div>
      <Link
        page="case-studies"
        query={`case=${item.slug}`}
        className="text-link"
      >
        Explore case study <Arrow />
      </Link>
    </Reveal>
  )
}

function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="shell hero-grid">
          <div className="hero-copy">
            <p className="eyebrow hero-sequence-1">
              Business Analysis · Systems · Technology
            </p>
            <h1 className="hero-sequence-2">Alireza Kazemzadeh</h1>
            <p className="hero-title hero-sequence-3">
              Business Analyst <span>|</span> Business Systems Analyst
            </p>
            <p className="hero-positioning hero-sequence-4">
              Bridging business needs, processes, data, and technology to create
              practical solutions.
            </p>
            <p className="hero-support hero-sequence-5">
              I analyze business problems, translate requirements into clear and
              actionable solutions, and connect business objectives with
              technology.
            </p>
            <div className="hero-actions hero-sequence-6">
              <Link page="case-studies" className="button button-primary">
                View My Work <Arrow />
              </Link>
              <Link page="consulting" className="button button-secondary">
                Let’s Talk <Arrow />
              </Link>
            </div>
          </div>
          <HeroVisual />
        </div>
        <div className="shell scroll-note">
          <span>Explore the portfolio</span>
          <Arrow direction="down" />
        </div>
      </section>

      <section className="section focus-section">
        <div className="shell">
          <SectionHeading
            eyebrow="Focus areas"
            title="Where business context meets technical clarity."
          />
          <div className="focus-list">
            {focusAreas.map((item, index) => (
              <Reveal className="focus-item" delay={index * 70} key={item}>
                <span>0{index + 1}</span>
                <h3>{item}</h3>
                <span className="focus-line" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section intro-section">
        <div className="shell editorial-grid">
          <Reveal>
            <p className="eyebrow">Professional perspective</p>
            <span className="large-index" aria-hidden="true">
              01
            </span>
          </Reveal>
          <Reveal className="editorial-copy">
            <h2>Business analysis with a technical perspective.</h2>
            <p>
              I work at the intersection of business analysis, systems, and
              technology. My approach combines structured business analysis with
              practical technical and systems knowledge to understand problems,
              clarify requirements, improve processes, and support practical
              solutions.
            </p>
            <p>
              I focus on making complex business and technology problems easier
              to understand, communicate, and act on.
            </p>
            <Link page="about" className="text-link">
              More about my approach <Arrow />
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="section process-section">
        <div className="shell">
          <SectionHeading
            eyebrow="How I work"
            title="A structured path from context to clarity."
            copy="A practical analysis approach that keeps business objectives, systems, and delivery connected."
          />
          <div className="steps-grid">
            {workSteps.map((step, index) => (
              <Reveal
                className="step-card"
                delay={index * 80}
                key={step.number}
              >
                <span>{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section cases-section">
        <div className="shell">
          <div className="heading-row">
            <SectionHeading
              eyebrow="Selected work"
              title="Case studies in analysis, systems, and process."
            />
            <Reveal>
              <Link page="case-studies" className="text-link">
                View all case studies <Arrow />
              </Link>
            </Reveal>
          </div>
          <div className="cases-grid">
            {cases.map((item, index) => (
              <CaseCard item={item} delay={index * 90} key={item.number} />
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="shell cta-inner">
          <Reveal>
            <p className="eyebrow eyebrow-light">Start a conversation</p>
            <h2>Bring clarity to a business or systems challenge.</h2>
          </Reveal>
          <Reveal>
            <Link page="consulting" className="button button-light">
              Free 30-Minute Consultation <Arrow />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}

function PageHero({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string
  title: string
  intro: string
}) {
  return (
    <section className="page-hero">
      <div className="shell page-hero-grid">
        <p className="eyebrow hero-sequence-1">{eyebrow}</p>
        <div>
          <h1 className="hero-sequence-2">{title}</h1>
          <p className="page-lead hero-sequence-3">{intro}</p>
        </div>
      </div>
    </section>
  )
}

function AboutPage() {
  const sections = [
    {
      number: "01",
      title: "Professional Profile",
      copy: "My professional focus is business analysis: understanding business needs, defining clear requirements, analyzing processes, and supporting practical solutions across systems, data, and technology.",
    },
    {
      number: "02",
      title: "Bridging Business & Technology",
      copy: "I connect business context with systems thinking—translating objectives, stakeholder needs, and operational challenges into information that can guide solution decisions.",
    },
    {
      number: "03",
      title: "What I Bring",
      copy: "A structured approach to discovery, requirements, process analysis, documentation, systems considerations, data questions, and solution validation.",
    },
    {
      number: "04",
      title: "My Approach",
      copy: "I begin with context and the business need, examine processes and dependencies, define what a solution must support, and validate understanding through feedback and testing.",
    },
  ]
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Business thinking. Technical perspective."
        intro="I work at the intersection of business analysis, systems, and technology. I focus on understanding business needs, analyzing processes, defining requirements, and translating business objectives into practical solutions."
      />
      <section className="section">
        <div className="shell about-list">
          {sections.map((item, index) => (
            <Reveal className="about-row" delay={index * 60} key={item.number}>
              <span>{item.number}</span>
              <h2>{item.title}</h2>
              <p>{item.copy}</p>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="section muted-section">
        <div className="shell detail-grid">
          <Reveal className="detail-block">
            <p className="eyebrow">Professional Background</p>
            <h2>Experience & background</h2>
            <p className="detail-note">
              Professional background information has not been provided for
              publication.
            </p>
          </Reveal>
          <Reveal className="detail-block" delay={80}>
            <p className="eyebrow">Education & Certifications</p>
            <h2>Learning & credentials</h2>
            <p className="detail-note">
              Education and certification information has not been provided for
              publication.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  )
}

const caseFields = [
  {
    title: "Project Overview",
    note: "A verified project summary is not published in this portfolio.",
  },
  {
    title: "Business Context",
    note: "Verified business context is not published in this portfolio.",
  },
  {
    title: "Business Problem",
    note: "The verified problem statement is not published in this portfolio.",
  },
  {
    title: "Objective",
    note: "Verified project objectives are not published in this portfolio.",
  },
  {
    title: "Stakeholders",
    note: "Stakeholder information is not published in this portfolio.",
  },
  {
    title: "Requirements",
    note: "Verified requirements are not published in this portfolio.",
  },
  {
    title: "Process Analysis",
    note: "Verified process analysis is not published in this portfolio.",
  },
  {
    title: "As-Is",
    note: "The verified current-state analysis is not published in this portfolio.",
  },
  {
    title: "To-Be",
    note: "The verified future-state analysis is not published in this portfolio.",
  },
  {
    title: "Solution",
    note: "Verified solution information is not published in this portfolio.",
  },
  {
    title: "Systems & Technology",
    note: "Verified systems information is not published in this portfolio.",
  },
  {
    title: "Testing / UAT",
    note: "Verified testing information is not published in this portfolio.",
  },
  {
    title: "Outcome / Lessons Learned",
    note: "No outcome or lesson is stated without verified project documentation.",
  },
]

function CaseStudiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Case Studies"
        title="Analysis made tangible."
        intro="Selected work structured around business context, requirements, process analysis, systems, validation, and the information that supports clear decisions."
      />
      <section className="section">
        <div className="shell case-study-list">
          {cases.map((item, caseIndex) => (
            <Reveal className="case-detail" key={item.number}>
              <span className="case-anchor" id={item.slug} aria-hidden="true" />
              <div className="case-detail-head">
                <span className="case-number">{item.number}</span>
                <div>
                  <h2>{item.title}</h2>
                  <div className="tag-row">
                    {item.focus.map((tag) => (
                      <span className="tag" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="case-fields">
                {caseFields.map((field, index) => (
                  <div
                    className="case-field"
                    key={`${caseIndex}-${field.title}`}
                  >
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <h3>{field.title}</h3>
                    <p className="reserved-content">{field.note}</p>
                  </div>
                ))}
              </div>
              <div className="case-development-note">
                <p>Credibility note</p>
                <span>Only verified project information is presented.</span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  )
}

const skillGroups = [
  {
    title: "Business Analysis",
    items: [
      "Requirements Analysis",
      "Stakeholder Analysis",
      "Business Requirements",
      "User Stories",
      "Acceptance Criteria",
    ],
  },
  {
    title: "Process & Requirements",
    items: [
      "Business Process Analysis",
      "BPMN",
      "As-Is / To-Be",
      "Process Mapping",
      "Process Improvement",
      "Use Cases",
    ],
  },
  { title: "Data", items: ["SQL", "Data Analysis", "Business Data Analysis"] },
  {
    title: "Systems & Technology",
    items: [
      "Systems Analysis",
      "APIs / Integration",
      "Solution Design",
      "Technical Documentation",
      "Automation",
    ],
  },
  {
    title: "Testing & QA",
    items: ["UAT", "Test Cases", "Defect Management", "Validation"],
  },
  {
    title: "Tools",
    items: [
      "Jira",
      "Confluence",
      "Microsoft Visio",
      "SQL / PostgreSQL",
      "GitHub",
      "UiPath",
      "Figma",
    ],
  },
]

function SkillsPage() {
  return (
    <>
      <PageHero
        eyebrow="Skills"
        title="Capabilities across the analysis lifecycle."
        intro="A balanced skill set connecting business needs with processes, systems, data, documentation, and validation."
      />
      <section className="section">
        <div className="shell skills-grid">
          {skillGroups.map((group, index) => (
            <Reveal
              className="skill-group"
              delay={index * 50}
              key={group.title}
            >
              <div className="skill-title">
                <span>0{index + 1}</span>
                <h2>{group.title}</h2>
              </div>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  )
}

function ConsultingPage() {
  const topics = [
    "Requirements clarification",
    "Business process analysis",
    "System/process challenges",
    "Solution requirements",
    "UAT and testing considerations",
    "Data or integration questions",
  ]
  const expectations = [
    "Understand the challenge",
    "Clarify the business need",
    "Identify key questions",
    "Discuss possible next steps",
  ]
  return (
    <>
      <PageHero
        eyebrow="Consulting"
        title="A focused conversation about your challenge."
        intro="A focused conversation to explore a business, process, requirements, systems, or technology challenge."
      />
      <section className="section">
        <div className="shell consultation-card">
          <Reveal className="consultation-main">
            <span className="consultation-duration">30 minutes · Free</span>
            <h2>Free 30-Minute Business Analysis Consultation</h2>
            <p>
              A focused conversation to explore a business, process,
              requirements, systems, or technology challenge.
            </p>
            <a
              className="button button-primary"
              href={connections.calendly}
              target="_blank"
              rel="noreferrer noopener"
              aria-describedby="calendly-status"
            >
              Book a Free 30-Minute Consultation <Arrow />
            </a>
            <p className="connection-note" id="calendly-status">
              Opens Calendly in a new browser tab.
            </p>
          </Reveal>
          <Reveal className="consultation-topics" delay={80}>
            <p className="eyebrow">Possible discussion topics</p>
            <ul>
              {topics.map((topic, index) => (
                <li key={topic}>
                  <span>0{index + 1}</span>
                  {topic}
                </li>
              ))}
            </ul>
            <div className="expectation-list">
              <p className="eyebrow">What to expect</p>
              <ol>
                {expectations.map((item, index) => (
                  <li key={item}>
                    <span>0{index + 1}</span>
                    {item}
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}

function ContactPage() {
  const contacts = [
    {
      label: "Email",
      value: connections.email,
      href: `mailto:${connections.email}`,
      external: false,
      note: "For direct enquiries and professional conversations.",
    },
    {
      label: "LinkedIn",
      value: connections.linkedin,
      href: connections.linkedin,
      external: true,
      note: "For professional updates and connections.",
    },
    {
      label: "GitHub",
      value: connections.github,
      href: connections.github,
      external: true,
      note: "For future project and technical work.",
    },
  ]
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let’s connect."
        intro="For professional enquiries, employment opportunities, project conversations, collaboration, or business analysis consulting, use one of the contact channels below."
      />
      <section className="section">
        <div className="shell contact-grid">
          {contacts.map((contact, index) => (
            <Reveal
              className="contact-card"
              delay={index * 70}
              key={contact.label}
            >
              <span className="contact-index">0{index + 1}</span>
              <p className="eyebrow">{contact.label}</p>
              <a
                className="contact-destination"
                href={contact.href}
                target={contact.external ? "_blank" : undefined}
                rel={contact.external ? "noreferrer noopener" : undefined}
              >
                {contact.value}
              </a>
              <p>{contact.note}</p>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="section muted-section">
        <div className="shell contact-cta">
          <Reveal>
            <p className="eyebrow">Consulting</p>
            <h2>Have a specific business analysis challenge?</h2>
          </Reveal>
          <Reveal>
            <Link page="consulting" className="button button-primary">
              View Consultation <Arrow />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}

const pages: Record<PageKey, () => ReactNode> = {
  home: HomePage,
  about: AboutPage,
  "case-studies": CaseStudiesPage,
  skills: SkillsPage,
  consulting: ConsultingPage,
  contact: ContactPage,
}

export default function App() {
  const [page, setPage] = useState<PageKey>(currentPage)

  useEffect(() => {
    const handleHash = () => {
      const nextPage = currentPage()
      setPage(nextPage)
      if (nextPage === "case-studies") {
        requestAnimationFrame(() => {
          const caseTarget = currentCaseTarget()
          if (caseTarget) {
            document
              .getElementById(caseTarget)
              ?.scrollIntoView({ block: "start" })
          }
        })
      }
    }
    window.addEventListener("hashchange", handleHash)
    return () => window.removeEventListener("hashchange", handleHash)
  }, [])

  useEffect(() => {
    const caseTarget = page === "case-studies" ? currentCaseTarget() : null
    if (caseTarget) {
      requestAnimationFrame(() => {
        document.getElementById(caseTarget)?.scrollIntoView({ block: "start" })
      })
    } else {
      window.scrollTo({ top: 0, behavior: "instant" })
    }
    document.title =
      "Alireza Kazemzadeh | Business Analyst | Business Systems Analyst"
  }, [page])

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(".reveal")
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      elements.forEach((element) => element.classList.add("is-visible"))
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible")
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 },
    )
    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [page])

  const Page = pages[page]

  return (
    <div className="app">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Header page={page} />
      <main id="main-content">
        <Page />
      </main>
      <Footer />
    </div>
  )
}
