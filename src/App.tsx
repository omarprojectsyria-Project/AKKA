import { useEffect, useRef, useState } from 'react'
import heroImage from './assets/akka-hero-reference.webp'
import aboutBuilding from './assets/akka-about-building.webp'
import electricalImage from './assets/services/electrical.webp'
import hvacImage from './assets/services/hvac.webp'
import plumbingImage from './assets/services/plumbing.webp'
import fireImage from './assets/services/fire-fighting.webp'

const photos = {
  hero: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1800&q=88',
  building:
    'https://images.unsplash.com/photo-1526495124232-a04e1849168c?auto=format&fit=crop&w=1200&q=85',
}

const Icon = ({ name }: { name: string }) => {
  const paths: Record<string, React.ReactNode> = {
    fan: (
      <>
        <circle cx="12" cy="12" r="2" />
        <path d="M12 10C5 9 7 2 12 3c4 1 3 5 0 7Zm2 2c1-7 8-5 7 0-1 4-5 3-7 0Zm-2 2c7 1 5 8 0 7-4-1-3-5 0-7Zm-2-2c-1 7-8 5-7 0 1-4 5-3 7 0Z" fill="currentColor" stroke="none" />
      </>
    ),
    faucet: <path d="M3 10h12a5 5 0 0 1 5 5v2h-5v-2H8v3H3V10Zm5 0V6m-3 0h6M8 3v3m10 14v1" />,
    helmet: (
      <>
        <circle cx="12" cy="12" r="11" />
        <path d="M5 16h14M6.5 14v-2a5.5 5.5 0 0 1 3-4.9M17.5 14v-2a5.5 5.5 0 0 0-3-4.9M10 6v6m4-6v6M10 6h4M5 16l1 2h12l1-2" />
      </>
    ),
    play: <path d="m8 4 12 8-12 8Z" fill="currentColor" stroke="none" />,
    bolt: <path d="m13 2-9 12h7l-1 8 9-12h-7l1-8Z" />,
    gear: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.83 2.83-.06-.06a1.7 1.7 0 0 0-1.88-.34 1.7 1.7 0 0 0-1.03 1.56V21h-4v-.08A1.7 1.7 0 0 0 8.95 19.4a1.7 1.7 0 0 0-1.88.34l-.06.06-2.83-2.83.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-1.55-1.02H3v-4h.08A1.7 1.7 0 0 0 4.6 8.95a1.7 1.7 0 0 0-.34-1.88l-.06-.06 2.83-2.83.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1.02-1.55V3h4v.08A1.7 1.7 0 0 0 15.05 4.6a1.7 1.7 0 0 0 1.88-.34l.06-.06 2.83 2.83-.06.06A1.7 1.7 0 0 0 19.4 9c.15.6.7 1.02 1.55 1.02H21v4h-.08A1.7 1.7 0 0 0 19.4 15Z" />
      </>
    ),
    pipe: <path d="M4 3v5a3 3 0 0 0 3 3h10a3 3 0 0 1 3 3v7M4 3h4M2 7h4m14 14h-4m6-4h-4" />,
    fire: <path d="M12 22c4.4 0 8-3.2 8-7.6 0-3-1.8-5.6-5-8.4.2 2.5-.8 4.1-2.3 5.1.1-3.6-2-6.7-5.2-9.1.3 4.5-3.5 7.5-3.5 12.4C4 18.8 7.6 22 12 22Zm0-2c-1.8 0-3.2-1.3-3.2-3.1 0-1.4.8-2.4 2-3.7.2 1.2.8 2 1.7 2.6.6-.9.9-1.9.8-3.1 1.2 1.2 1.9 2.5 1.9 4.2 0 1.8-1.4 3.1-3.2 3.1Z" />,
    tools: <path d="m14.7 6.3 3-3a4 4 0 0 1-5 5l-7.4 7.4a2.1 2.1 0 1 0 3 3l7.4-7.4a4 4 0 0 1 5-5l-3 3-3-3ZM5 3l4 4" />,
    arrow: <path d="M5 12h14m-5-5 5 5-5 5" />,
    search: <><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 5 5" /></>,
    close: <path d="m6 6 12 12M6 18 18 6" />,
    star: <path d="m12 2 3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1 3-6Z" />,
    handshake: <><path d="m2 8 4-4 5 2 3-2 8 5-4 9-4 3-8-5-4-8Zm9-2-4 5 3 2 4-4 6 5M6 16l2-3m2 6 2-3m2 5 2-4" /></>,
    chat: <><path d="M21 11a8 8 0 0 1-8 8H8l-5 3 1.5-6A8 8 0 1 1 21 11Z" /><path d="M8 9h8M8 13h5" /></>,
    document: <><path d="M6 2h8l5 5v15H6Z" /><path d="M14 2v6h5M9 12h7M9 16h7" /></>,
    check: <><circle cx="12" cy="12" r="9" /><path d="m8 12 3 3 5-6" /></>,
    diamond: <><path d="m3 8 4-5h10l4 5-9 13L3 8Zm0 0h18M7 3l5 18 5-18" /></>,
    leaf: <><path d="M20 3S8 1 5 9c-2 6 4 11 9 7 5-4 6-13 6-13Z" /><path d="M4 21 15 9" /></>,
    shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Zm-3-10 2 2 4-4" />,
    users: (
      <>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </>
    ),
    building: <path d="M3 21h18M6 21V5l6-3v19m6 0V9l-6-2M8.5 7h1m-1 4h1m-1 4h1m5-4h1m-1 4h1" />,
    pin: <><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
    phone: <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7A2 2 0 0 1 22 16.9Z" />,
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {paths[name]}
    </svg>
  )
}

const Button = ({ children, dark = false, href = '/contact#quote' }: { children: React.ReactNode; dark?: boolean; href?: string }) => (
  <a className={`button ${dark ? 'button-dark' : ''}`} href={href}>
    {children}
    <Icon name="arrow" />
  </a>
)

const services = [
  { icon: 'bolt', title: 'Electrical', copy: 'Power distribution, lighting and low-current building systems.', image: electricalImage, dark: false },
  { icon: 'fan', title: 'Mechanical & HVAC', copy: 'Air conditioning, chilled water and ventilation systems.', image: hvacImage, dark: true },
  { icon: 'faucet', title: 'Plumbing', copy: 'Water supply, drainage and associated building networks.', image: plumbingImage, dark: false },
  { icon: 'fire', title: 'Fire Fighting', copy: 'Fire suppression, sprinkler and riser system installation.', image: fireImage, dark: true },
  { icon: 'tools', title: 'Operation & Maintenance', copy: 'Preventive and corrective maintenance within agreed project scopes.', image: hvacImage, dark: false },
]

// Physical PDF pages. Status describes the source record, not a live project update.
// Images are existing prototype illustrations, never represented as project photography.
const portfolioProjects = [
  { title: 'Saadiyat Reserve Mosque and Community Nodes', type: 'Community', image: fireImage, location: 'Abu Dhabi, UAE', copy: 'MEP works for the mosque and community nodes.', summary: 'The prequalification lists MEP works for Saadiyat Reserve Mosque and Community Nodes in Abu Dhabi.', client: 'ALDAR Properties PJSC', scope: 'MEP', source: 'p. 30; project imagery pp. 70–75' },
  { title: 'Construction of Emirati School – Al Mezairah', type: 'Educational', image: electricalImage, location: 'Sharjah, UAE', copy: 'MEP works for the Al Mezairah school project.', summary: 'The documented Al Mezairah school project is located in Sharjah, with MEP listed as AKKA’s scope.', client: 'Presidential Court', scope: 'MEP', source: 'p. 30; project imagery pp. 76–78' },
  { title: 'ECSSR Training Centre Building', type: 'Institutional', image: hvacImage, location: 'Abu Dhabi, UAE', copy: 'MEP works for the ECSSR training centre.', summary: 'The training centre in Abu Dhabi is listed for the Emirates Center for Strategic Studies and Research, with MEP as AKKA’s scope.', client: 'The Emirates Center for Strategic Studies and Research', scope: 'MEP', source: 'p. 30; project imagery p. 68' },
  { title: 'Mayan Towers', type: 'Towers', image: plumbingImage, location: 'Abu Dhabi, UAE', copy: 'Plumbing and electrical works.', summary: 'Listed as Mayan Towers in the completed-project table. The image section identifies Yas Island Mayan, Abu Dhabi.', client: 'AL DAR', scope: 'Plumbing & Electrical', source: 'p. 31; location caption p. 53' },
  { title: 'Leaf Tower', type: 'Towers', image: electricalImage, location: 'Abu Dhabi, UAE', copy: 'Plumbing and electrical works.', summary: 'Leaf Tower is documented in the completed-project table, with Abu Dhabi identified in its project image caption.', client: '3AM Property Investment Co', scope: 'Plumbing & Electrical Works', source: 'p. 31; location caption p. 48' },
  { title: 'Design & Build Mazyraa Border Crossing Extension', type: 'Infrastructure', image: fireImage, location: 'Masfout Area, Ajman, UAE', copy: 'MEP works for the border crossing extension.', summary: 'The completed-project table identifies this extension in the Masfout Area of Ajman. The project name follows that table’s wording.', client: 'United Arab Emirates Presidential Court', scope: 'MEP', source: 'p. 30' },
]

const projects = portfolioProjects.slice(0, 3)
const projectCategories = ['All Projects', 'Community', 'Educational', 'Institutional', 'Towers', 'Infrastructure']
type PortfolioProject = (typeof portfolioProjects)[number]

const careerAreas = [
  { icon: 'bolt', title: 'Electrical Engineering', category: 'Engineering', copy: 'Help bring safe, reliable power and electrical systems to modern buildings.' },
  { icon: 'fan', title: 'Mechanical & HVAC', category: 'Engineering', copy: 'Create comfortable, efficient environments through well-engineered mechanical systems.' },
  { icon: 'pipe', title: 'Plumbing & Fire Fighting', category: 'Engineering', copy: 'Contribute to essential water systems and life-safety solutions.' },
  { icon: 'helmet', title: 'Site & Project Management', category: 'Project Delivery', copy: 'Bring people, planning and technical expertise together on site.' },
  { icon: 'document', title: 'Estimation & Quantity Surveying', category: 'Commercial', copy: 'Turn project requirements into clear estimates and coordinated delivery plans.' },
  { icon: 'users', title: 'Corporate & Support', category: 'Business Support', copy: 'Support the teams, operations and relationships behind every project.' },
]

function CareersPage() {
  const [area, setArea] = useState('')
  const [emailPrepared, setEmailPrepared] = useState(false)

  useEffect(() => {
    document.title = 'Careers | AKKA Electromechanical'
  }, [])

  function chooseArea(title: string) {
    setArea(title)
    setEmailPrepared(false)
    document.getElementById('career-application')?.scrollIntoView()
  }

  function prepareApplication(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const subject = `Career interest — ${area || 'General interest'}`
    const body = [
      `Name: ${data.get('fullName')}`,
      `Email: ${data.get('email')}`,
      `Phone: ${data.get('phone')}`,
      `Area of interest: ${area}`,
      `Experience: ${data.get('experience')}`,
      '',
      String(data.get('introduction')),
      '',
      'Please advise whether recruitment inquiries are currently accepted and which contact to use.',
    ].join('\n')
    window.location.href = `mailto:info@akka-mep.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setEmailPrepared(true)
  }

  return (
    <>
      <section className="hero services-hero careers-hero">
        <img className="hero-image" src={heroImage} alt="Illustrative engineers looking towards the Dubai skyline" fetchPriority="high" />
        <div className="hero-content">
          <p className="eyebrow">CAREERS AT AKKA</p>
          <h1>BUILD YOUR<br /><span>FUTURE</span><br />WITH AKKA</h1>
          <p className="hero-copy">Bring your expertise, ambition and ideas. Be part of a team engineering smarter spaces and a better tomorrow.</p>
          <div className="careers-hero-actions"><Button href="#career-paths">Explore Career Paths</Button><a className="button button-dark" href="#career-application">Introduce Yourself</a></div>
        </div>
      </section>

      <section className="careers-culture section" aria-labelledby="culture-heading">
        <div>
          <p className="eyebrow">GREAT WORK STARTS WITH GREAT PEOPLE</p>
          <h2 id="culture-heading">Build More Than Projects.<br /><span>Build Your Career.</span></h2>
          <p>AKKA’s prequalification describes specialist project teams, training and communication across engineering, site and support functions.</p>
          <div className="career-values">
            <div><span><Icon name="users" /></span><div><h3>One Team</h3><p>Share ideas, solve challenges and learn from each other.</p></div></div>
            <div><span><Icon name="gear" /></span><div><h3>Meaningful Work</h3><p>Put your skills to work on integrated MEP projects.</p></div></div>
            <div><span><Icon name="shield" /></span><div><h3>Safety & Quality</h3><p>Take pride in the details and look out for the people around you.</p></div></div>
          </div>
        </div>
        <div className="careers-team-photo">
          <img src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=85" alt="Construction team working together on a building site" loading="lazy" />
          <div><span className="mission-rule" /><h3>Better Together</h3><p>Different skills.<br />One shared ambition.</p><Icon name="users" /></div>
        </div>
      </section>

      <section className="career-paths section" id="career-paths" aria-labelledby="career-paths-heading">
        <div className="career-section-heading"><div><p className="eyebrow">FIND YOUR PLACE</p><h2 id="career-paths-heading">Where Could You<br /><span>Make an Impact?</span></h2></div><p>Explore career-interest categories related to AKKA’s documented disciplines and functions. Availability requires company confirmation.</p></div>
        <div className="career-area-grid">
          {careerAreas.map((item) => <article className="career-area-card" key={item.title}><span className="career-area-icon"><Icon name={item.icon} /></span><span className="career-area-category">{item.category}</span><h3>{item.title}</h3><p>{item.copy}</p><button type="button" onClick={() => chooseArea(item.title)}>Express Interest <Icon name="arrow" /></button></article>)}
        </div>
        <p className="career-paths-note">Career-interest categories only. No current vacancies or recruitment process have been verified for this management review prototype.</p>
      </section>

      <section className="career-journey section" aria-labelledby="career-journey-heading">
        <div className="career-section-heading"><div><p className="eyebrow">LET’S GET TO KNOW YOU</p><h2 id="career-journey-heading">Your Next Chapter<br /><span>Starts with a Conversation.</span></h2></div><p>You don’t need to find the perfect role to make the first move. Tell us what you do best and where you’d like to go next.</p></div>
        <ol className="career-journey-steps">
          <li><span>01</span><Icon name="document" /><h3>Introduce Yourself</h3><p>Prepare a brief description of your experience and interests.</p></li>
          <li><span>02</span><Icon name="chat" /><h3>Start a Conversation</h3><p>Confirm whether opportunities and a recruitment contact are available.</p></li>
          <li><span>03</span><Icon name="handshake" /><h3>Explore the Right Fit</h3><p>Share a CV only after confirming the appropriate recipient.</p></li>
        </ol>
      </section>

      <section className="career-application section" id="career-application" aria-labelledby="career-application-heading">
        <div className="career-application-copy"><p className="eyebrow">TAKE THE FIRST STEP</p><h2 id="career-application-heading">Your Experience.<br /><span>Our Next Possibility.</span></h2><p>Tell us a little about yourself and the kind of work you’re interested in. The form prepares an email draft only; recruitment availability and the appropriate recipient require company confirmation.</p><a className="contact-detail" href="mailto:info@akka-mep.com?subject=Careers%20at%20AKKA"><span className="contact-detail-icon"><Icon name="mail" /></span><span><b>General Corporate Email</b><strong>info@akka-mep.com</strong><small>A dedicated recruitment contact has not been confirmed.</small></span></a><div className="career-application-hint"><Icon name="document" /><p>Keep your CV up to date and include your relevant experience, qualifications and contact details. Please don’t include sensitive identity or financial documents.</p></div></div>
        <div className="contact-form-card">
          <h2>Introduce <span>Yourself</span></h2><p>Draft a career-interest inquiry to the general corporate inbox. No application is submitted here.</p>
          <form className="contact-form career-application-form" onSubmit={prepareApplication}>
            <label><span className="contact-label">Full Name *</span><input name="fullName" placeholder="Full Name *" autoComplete="name" required maxLength={160} /></label>
            <label><span className="contact-label">Email Address *</span><input name="email" placeholder="Email Address *" type="email" autoComplete="email" required maxLength={200} /></label>
            <label><span className="contact-label">Phone Number *</span><input name="phone" placeholder="Phone Number *" type="tel" autoComplete="tel" required maxLength={40} /></label>
            <label><span className="contact-label">Experience Level *</span><select name="experience" defaultValue="" required><option value="" disabled>Experience Level *</option><option>Student / Recent Graduate</option><option>1–3 Years</option><option>4–7 Years</option><option>8+ Years</option></select></label>
            <label className="career-interest-field"><span className="contact-label">Area of Interest *</span><select name="area" value={area} required onChange={(event) => { setArea(event.target.value); setEmailPrepared(false) }}><option value="" disabled>Area of Interest *</option>{careerAreas.map((item) => <option key={item.title}>{item.title}</option>)}<option>General Interest</option></select></label>
            <label className="contact-message-field"><span>A Little About You *</span><textarea name="introduction" placeholder="Tell us about your experience, skills and the kind of opportunity you’re looking for..." required minLength={20} maxLength={3000} rows={5} /></label>
            <button className="button contact-submit" type="submit">Prepare Career Inquiry Email <Icon name="arrow" /></button>
            <p className="contact-form-note">This prototype opens your email app with a draft only. No application or files are sent, stored or processed by the website. Confirm the recruitment contact before sharing a CV.</p>
            {emailPrepared && <p className="contact-form-status" role="status">Your email app should open with a draft; nothing has been submitted here. Confirm the recruitment contact through <a href="mailto:info@akka-mep.com?subject=Careers%20at%20AKKA">info@akka-mep.com</a> directly.</p>}
          </form>
        </div>
      </section>
    </>
  )
}

function ProjectsPage() {
  const [category, setCategory] = useState('All Projects')
  const [search, setSearch] = useState('')
  const [offset, setOffset] = useState(0)
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const query = search.trim().toLowerCase()
  const filteredProjects = portfolioProjects.filter((project) =>
    (category === 'All Projects' || project.type === category)
    && `${project.title} ${project.type} ${project.location} ${project.copy}`.toLowerCase().includes(query),
  )
  const visibleProjects = [...filteredProjects.slice(offset), ...filteredProjects.slice(0, offset)]
  const featured = portfolioProjects[0]

  useEffect(() => {
    document.title = 'Our Projects | AKKA Electromechanical'
  }, [])

  function openProject(project: PortfolioProject) {
    setSelectedProject(project)
    dialogRef.current?.showModal()
  }

  function resetFilters() {
    setCategory('All Projects')
    setSearch('')
    setOffset(0)
  }

  return (
    <>
      <section className="hero services-hero projects-hero">
        <img className="hero-image" src={heroImage} alt="Illustrative engineers overlooking the Dubai skyline and building services" fetchPriority="high" />
        <div className="hero-content">
          <p className="eyebrow">OUR PROJECTS</p>
          <h1>BUILDING<br /><span>REAL IMPACT</span></h1>
          <p className="hero-copy">A portfolio of integrated electromechanical solutions delivering smarter, safer and more sustainable built environments.</p>
          <div className="projects-hero-actions"><Button>Get a Quote</Button><a className="button button-dark" href="/contact">Talk to Our Team</a></div>
        </div>
        <div className="hero-features">
          <div><Icon name="gear" /><span><b>Integrated</b>MEP Solutions</span></div>
          <div><Icon name="building" /><span><b>From Concept</b>to Completion</span></div>
          <div><Icon name="shield" /><span><b>Committed to</b>Quality & Safety</span></div>
        </div>
      </section>

      <section className="portfolio-gallery section" id="projects" aria-labelledby="portfolio-heading">
        <div className="portfolio-toolbar">
          <div className="portfolio-categories" role="group" aria-label="Filter projects by sector">
            {projectCategories.map((item) => <button key={item} type="button" aria-pressed={category === item} onClick={() => { setCategory(item); setOffset(0) }}>{item}</button>)}
          </div>
          <label className="portfolio-search"><Icon name="search" /><span className="contact-label">Search projects</span><input type="search" placeholder="Search projects..." value={search} onChange={(event) => { setSearch(event.target.value); setOffset(0) }} /></label>
        </div>
        <div className="portfolio-heading">
          <div><p className="eyebrow">OUR WORK</p><h2 id="portfolio-heading">Featured <span>Projects</span></h2></div>
          <p>Selected projects documented in AKKA’s prequalification. Images are illustrative; completion status follows the source record.</p>
          <div className="service-controls">
            <button type="button" disabled={offset === 0} onClick={() => setOffset((value) => Math.max(0, value - 1))} aria-label="Previous project order"><Icon name="arrow" /></button>
            <button type="button" disabled={filteredProjects.length < 2 || offset >= filteredProjects.length - 1} onClick={() => setOffset((value) => value + 1)} aria-label="Next project order"><Icon name="arrow" /></button>
          </div>
        </div>
        <p className="contact-label" role="status">{filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'} found{category !== 'All Projects' ? ` in ${category}` : ''}{query ? ` for ${search}` : ''}.</p>
        <div className="portfolio-grid">
          {visibleProjects.map((project) => (
            <article className="portfolio-card" key={project.title}>
              <div className="portfolio-card-image"><img src={project.image} alt={`Illustrative building services image for ${project.title}; not project photography`} loading="lazy" /><small className="image-disclosure">Illustrative image</small><span>{project.type}</span></div>
              <div className="portfolio-card-copy"><h3>{project.title}</h3><p className="portfolio-location"><Icon name="pin" />{project.location}</p><p>{project.copy}</p><button type="button" onClick={() => openProject(project)} aria-label={`View ${project.title} project details`}><Icon name="arrow" /></button></div>
            </article>
          ))}
        </div>
        {filteredProjects.length === 0 && <div className="portfolio-empty"><Icon name="search" /><h3>No projects found</h3><p>Try another search or explore a different sector.</p><button className="button" type="button" onClick={resetFilters}>Show All Projects <Icon name="arrow" /></button></div>}
      </section>

      <section className="portfolio-spotlight section" aria-labelledby="spotlight-heading">
        <img className="spotlight-image" src={featured.image} alt="Illustrative architecture; not a photograph of Saadiyat Reserve" loading="lazy" />
        <div className="spotlight-copy">
          <p className="eyebrow">FEATURED PROJECT · ILLUSTRATIVE IMAGE</p><h2 id="spotlight-heading">Saadiyat Reserve<br /><span>Mosque & Community Nodes</span></h2>
          <p className="spotlight-meta">{featured.type} <span aria-hidden="true">|</span> {featured.location}</p>
          <p>{featured.summary}</p>
          <div className="spotlight-features">
            <div><Icon name="building" /><span>Mosque &<br />Community Nodes</span></div>
            <div><Icon name="gear" /><span>Documented<br />MEP Scope</span></div>
            <div><Icon name="pin" /><span>Abu Dhabi<br />UAE</span></div>
            <div><Icon name="document" /><span>Prequalification<br />Page 30</span></div>
          </div>
          <button className="button" type="button" onClick={() => openProject(featured)}>View Project Details <Icon name="arrow" /></button>
        </div>
      </section>

      <section className="portfolio-stats section" aria-label="AKKA at a glance">
        {[{ icon: 'building', value: 'MEP', label: 'Coordinated Disciplines' }, { icon: 'users', value: 'Team', label: 'Specialist Project Teams' }, { icon: 'check', value: 'Quality', label: 'Documented Quality Policy' }, { icon: 'shield', value: 'Safety', label: 'Risk Assessment & Training' }].map((stat) => (
          <div key={stat.label}><span><Icon name={stat.icon} /></span><div><strong>{stat.value}</strong><p>{stat.label}</p></div></div>
        ))}
      </section>

      <section className="services-talk projects-talk section">
        <div><p className="eyebrow">LET’S BUILD TOGETHER</p><h2>Start Your <span>Next Project</span></h2><p>Get in touch with our team to discuss your project requirements.<br />We’re here to turn your vision into reality.</p></div>
        <div className="services-talk-details">
          <a href="tel:+97167418994"><span><Icon name="phone" /></span><div><b>Call Us</b><small>+971 6 741 8994</small></div></a>
          <a href="mailto:info@akka-mep.com"><span><Icon name="mail" /></span><div><b>Email Us</b><small>info@akka-mep.com</small></div></a>
          <a href="/contact#location"><span><Icon name="pin" /></span><div><b>Documented Office</b><small>Ajman, UAE</small></div></a>
        </div>
        <Button>Get a Quote</Button>
      </section>

      <dialog ref={dialogRef} className="project-dialog" onClose={() => setSelectedProject(null)} onClick={(event) => { if (event.target === event.currentTarget) dialogRef.current?.close() }} aria-labelledby="project-dialog-title">
        {selectedProject && <div className="project-dialog-content">
          <button className="project-dialog-close" type="button" autoFocus aria-label="Close project details" onClick={() => dialogRef.current?.close()}><Icon name="close" /></button>
          <img src={selectedProject.image} alt={`Illustrative image for ${selectedProject.title}; not project photography`} />
          <div className="project-dialog-copy"><p className="eyebrow">{selectedProject.type.toUpperCase()} · ILLUSTRATIVE IMAGE</p><h2 id="project-dialog-title">{selectedProject.title}</h2><p className="portfolio-location"><Icon name="pin" />{selectedProject.location}</p><p>{selectedProject.summary}</p><h3>Documented project details</h3><dl className="project-facts"><div><dt>Client</dt><dd>{selectedProject.client}</dd></div><div><dt>AKKA scope</dt><dd>{selectedProject.scope}</dd></div><div><dt>Source status</dt><dd>Completed, as listed in the prequalification. Current status requires confirmation.</dd></div><div><dt>Reference</dt><dd>AKKA Prequalification, {selectedProject.source}</dd></div></dl><p>Illustrative image — not project photography.</p><Button>Discuss a Similar Project</Button></div>
        </div>}
      </dialog>
    </>
  )
}

function ServicesSection({ dedicated = false }: { dedicated?: boolean }) {
  const [serviceOffset, setServiceOffset] = useState(0)
  const visibleServices = [...services.slice(serviceOffset), ...services.slice(0, serviceOffset)]

  return (
    <section className={`services section${dedicated ? ' services-overview' : ''}`} id="services" aria-labelledby="services-heading">
      <div className="section-head">
        <div>
          <p className="eyebrow red">OUR SERVICES</p>
          <h2 id="services-heading">Complete MEP Solutions<br /><span>Under One Roof</span></h2>
        </div>
        <div className="services-intro">
          <p>{dedicated ? 'We deliver integrated electromechanical solutions across all core disciplines, combining technical expertise, high-quality execution and a commitment to a more sustainable built environment.' : 'From concept to completion, we deliver integrated electromechanical solutions with a focus on quality, innovation and long-term value.'}</p>
          {!dedicated && <span className="services-progress" aria-hidden="true"><span style={{ transform: `translateX(${serviceOffset * 25}%)` }} /></span>}
        </div>
        <div className="service-controls" aria-label="Browse services">
          <button type="button" disabled={serviceOffset === 0} onClick={() => setServiceOffset((offset) => Math.max(0, offset - 1))} aria-label="Previous services"><Icon name="arrow" /></button>
          <button type="button" onClick={() => setServiceOffset((offset) => (offset + 1) % services.length)} aria-label="Next services"><Icon name="arrow" /></button>
        </div>
      </div>
      <div className="service-grid" aria-live="polite">
        {visibleServices.map((service) => (
          <article className="service-card" key={service.title}>
            <img src={service.image} alt={`${service.title} systems`} loading="lazy" />
            <div className="service-body">
              <span className={`service-icon ${service.dark ? 'service-icon-dark' : ''}`}><Icon name={service.icon} /></span>
              <h3>{service.title}</h3>
              <p>{service.copy}</p>
              <a href={`/contact?service=${encodeURIComponent(service.title)}#quote`} aria-label={`Inquire about ${service.title}`}><Icon name="arrow" /></a>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

const processSteps = [
  { icon: 'chat', title: 'Consult & Plan', copy: 'Understand your needs, objectives and project requirements.' },
  { icon: 'document', title: 'Design & Engineer', copy: 'Coordinate drawings, materials and consultant approvals.' },
  { icon: 'gear', title: 'Execute & Deliver', copy: 'Coordinate site execution, quality checks and safety controls.' },
  { icon: 'check', title: 'Test & Commission', copy: 'Inspect, test and commission against project requirements.' },
  { icon: 'users', title: 'Support & Maintain', copy: 'Provide O&M manuals and support within the agreed contractual scope.' },
]

function ServicesPage() {
  useEffect(() => {
    document.title = 'Our Services | AKKA Electromechanical'
    if (window.location.hash === '#services') {
      const frame = requestAnimationFrame(() => document.getElementById('services')?.scrollIntoView())
      return () => cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <>
      <section className="hero services-hero">
        <img className="hero-image" src={heroImage} alt="Illustrative engineers overlooking Dubai beside mechanical and electrical pipework" fetchPriority="high" />
        <div className="hero-content">
          <p className="eyebrow">OUR SERVICES</p>
          <h1>INTEGRATED<br /><span>MEP SOLUTIONS</span></h1>
          <p className="hero-copy">From concept to completion, AKKA delivers end-to-end electromechanical solutions that build smarter, safer and more sustainable environments.</p>
          <Button>Get a Quote</Button>
        </div>
      </section>

      <ServicesSection dedicated />

      <section className="services-process section" style={{ '--process-image': `url(${aboutBuilding})` } as React.CSSProperties} aria-labelledby="process-heading">
        <div className="process-heading">
          <div>
            <p className="eyebrow">OUR PROCESS</p>
            <h2 id="process-heading">A Seamless Journey<br /><span>From Vision to Reality</span></h2>
          </div>
          <p>Our documented methodology coordinates drawings, material approvals, site work, testing and handover, supported by training and progress records.</p>
        </div>
        <ol className="process-steps">
          {processSteps.map((step, index) => (
            <li key={step.title}>
              <div className="process-step-symbol"><span><Icon name={step.icon} /></span>{index < processSteps.length - 1 && <Icon name="arrow" />}</div>
              <span className="process-number">0{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.copy}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="services-partner section" aria-labelledby="partner-heading">
        <div className="partner-copy">
          <p className="eyebrow">WHY CHOOSE AKKA</p>
          <h2 id="partner-heading">A Partner You Can<br /><span>Build On</span></h2>
          <p>AKKA’s prequalification sets out a focus on technical coordination, reliable workmanship and long-term client relationships.</p>
          <div className="partner-benefits">
            <div><span><Icon name="diamond" /></span><div><h3>Proven Expertise</h3><p>Supply, installation, testing and commissioning capabilities.</p></div></div>
            <div><span><Icon name="gear" /></span><div><h3>Integrated Solutions</h3><p>All MEP disciplines under one roof.</p></div></div>
            <div><span><Icon name="shield" /></span><div><h3>Quality & Safety</h3><p>Quality reviews, risk assessment and safety training.</p></div></div>
            <div><span><Icon name="leaf" /></span><div><h3>Sustainable Focus</h3><p>Energy-saving approaches and responsible site practices.</p></div></div>
          </div>
        </div>
        <div className="about-visual partner-visual">
          <img src={aboutBuilding} alt="Modern glass-fronted building and Dubai skyline" loading="lazy" />
          <div className="mission-card">
            <span className="mission-rule" aria-hidden="true" />
            <h3>Building<br />Better Together</h3>
            <p>We collaborate with clients, consultants and partners to create spaces that enhance lives and communities.</p>
            <a className="mini-icon" href="/contact" aria-label="Contact AKKA to discuss your project"><Icon name="arrow" /></a>
          </div>
        </div>
      </section>

      <section className="services-talk section" aria-labelledby="talk-heading">
        <div>
          <p className="eyebrow">LET’S TALK</p>
          <h2 id="talk-heading">Discuss Your Project<br /><span>With Our Team</span></h2>
          <p>Get in touch with our experts to explore how AKKA can support your next project.</p>
        </div>
        <div className="services-talk-details">
          <a href="tel:+97167418994"><span><Icon name="phone" /></span><div><b>Call Us</b><small>+971 6 741 8994</small></div></a>
          <a href="mailto:info@akka-mep.com"><span><Icon name="mail" /></span><div><b>Email Us</b><small>info@akka-mep.com</small></div></a>
          <a href="/contact#location"><span><Icon name="pin" /></span><div><b>Documented Office</b><small>Ajman, UAE</small></div></a>
        </div>
        <Button>Get a Quote</Button>
      </section>
    </>
  )
}

function ContactPage() {
  const [emailPrepared, setEmailPrepared] = useState(false)
  const requestedService = new URLSearchParams(window.location.search).get('service')
  const initialInquiry = services.find((service) => service.title === requestedService)?.title
    ?? (window.location.hash === '#quote' ? 'Request a Quote' : '')

  useEffect(() => {
    document.title = 'Contact & Get a Quote | AKKA Electromechanical'
    if (window.location.hash === '#quote') {
      const frame = requestAnimationFrame(() => document.getElementById('quote')?.scrollIntoView())
      return () => cancelAnimationFrame(frame)
    }
  }, [])

  function prepareMessage(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const subject = `AKKA — ${data.get('inquiry')}`
    const body = [
      `Name: ${data.get('firstName')} ${data.get('lastName')}`,
      `Company: ${data.get('company')}`,
      `Email: ${data.get('email')}`,
      `Phone: ${data.get('phone')}`,
      '',
      String(data.get('message')),
    ].join('\n')
    window.location.href = `mailto:info@akka-mep.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setEmailPrepared(true)
  }

  return (
    <>
      <section className="hero contact-hero">
        <img className="hero-image" src={heroImage} alt="Illustrative engineers overlooking Dubai and integrated building systems" fetchPriority="high" />
        <div className="hero-content">
          <p className="eyebrow">GET IN TOUCH</p>
          <h1>LET’S BUILD<br /><span>TOMORROW</span><br />TOGETHER</h1>
          <p className="hero-copy">We’re here to discuss your project requirements, answer your questions, and explore how AKKA can deliver integrated electromechanical solutions for a better tomorrow.</p>
          <Button href="#quote">Get a Quote</Button>
        </div>
      </section>

      <section className="contact-message section" aria-labelledby="message-heading">
        <div className="contact-information">
          <p className="eyebrow">CONTACT AKKA</p>
          <h2 id="message-heading">Send Us a <span>Message</span></h2>
          <p className="contact-description">Discuss project requirements using the documented corporate contact details. This management review prototype prepares email drafts only.</p>
          <div className="contact-details">
            <a className="contact-detail" href="tel:+97167418994">
              <span className="contact-detail-icon"><Icon name="phone" /></span>
              <span><b>Call Us</b><strong>+971 6 741 8994</strong><small>Office telephone listed in the prequalification.</small></span>
            </a>
            <a className="contact-detail" href="mailto:info@akka-mep.com">
              <span className="contact-detail-icon"><Icon name="mail" /></span>
              <span><b>Email Us</b><strong>info@akka-mep.com</strong><small>Corporate email listed in the prequalification.</small></span>
            </a>
            <a className="contact-detail" href="#location">
              <span className="contact-detail-icon"><Icon name="pin" /></span>
              <span><b>Documented Office</b><strong>Ajman, UAE</strong><small>SKY Tower, 5th Floor, Office 503, Ajman.</small></span>
            </a>
            <a className="contact-detail" href="mailto:info@akka-mep.com">
              <span className="contact-detail-icon"><Icon name="users" /></span>
              <span><b>Business Inquiries</b><small>For new projects and partnerships.</small><strong>info@akka-mep.com</strong></span>
            </a>
          </div>
        </div>

        <div className="contact-form-card" id="quote">
          <h2>Contact <span>Form</span></h2>
          <p>Prepare an email draft to the documented corporate inbox. Nothing is submitted through this prototype.</p>
          <form className="contact-form" onSubmit={prepareMessage}>
            <label><span className="contact-label">First Name *</span><input name="firstName" autoComplete="given-name" placeholder="First Name *" required maxLength={80} /></label>
            <label><span className="contact-label">Last Name *</span><input name="lastName" autoComplete="family-name" placeholder="Last Name *" required maxLength={80} /></label>
            <label><span className="contact-label">Company Name *</span><input name="company" autoComplete="organization" placeholder="Company Name *" required maxLength={150} /></label>
            <label><span className="contact-label">Email Address *</span><input name="email" type="email" autoComplete="email" placeholder="Email Address *" required maxLength={200} /></label>
            <label><span className="contact-label">Phone Number *</span><input name="phone" type="tel" autoComplete="tel" placeholder="Phone Number *" required maxLength={40} /></label>
            <label><span className="contact-label">Inquiry Type *</span><select name="inquiry" defaultValue={initialInquiry} required>
              <option value="" disabled>Inquiry Type *</option>
              <option>Request a Quote</option><option>General Inquiry</option><option>Electrical</option><option>Mechanical & HVAC</option><option>Plumbing</option><option>Fire Fighting</option><option>Operation & Maintenance</option><option>Partnership</option>
            </select></label>
            <label className="contact-message-field"><span>Your Message *</span><textarea name="message" placeholder="Tell us about your project, requirements or any questions..." required minLength={10} maxLength={3000} rows={5} /></label>
            <button className="button contact-submit" type="submit">Prepare Inquiry Email <Icon name="arrow" /></button>
            <p className="contact-form-note">This prototype opens your email app. Review the draft and send it there if you choose. The website does not send, store or process inquiries.</p>
            {emailPrepared && <p className="contact-form-status" role="status">Your email app should open with a draft. Nothing has been sent by this website. If it did not open, use <a href="mailto:info@akka-mep.com">info@akka-mep.com</a>.</p>}
          </form>
        </div>
      </section>

      <section className="contact-location section" id="location" aria-labelledby="location-heading">
        <div>
          <p className="eyebrow">OUR LOCATION</p>
          <h2 id="location-heading">Our Documented<br /><span>Ajman Office</span></h2>
          <p className="contact-description">The prequalification lists this office address and branches in Ajman, Dubai and Abu Dhabi. Please confirm visiting arrangements with the company.</p>
          <div className="contact-detail location-address">
            <span className="contact-detail-icon"><Icon name="pin" /></span>
            <span><b>AKKA Electromechanical Contracting L.L.C.</b><small>SKY Tower, 5th Floor, Office No. 503<br />Sheikh Khalifa Bin Zayed Street<br />Al Nuaimiya 2, Ajman, UAE<br />P.O. Box 2288</small></span>
          </div>
        </div>
        <div className="contact-map">
          <div className="documented-address-panel"><Icon name="building" /><p className="eyebrow">DOCUMENTED OFFICE</p><h3>SKY Tower<br /><span>Ajman, UAE</span></h3><p>5th Floor · Office No. 503<br />Al Nuaimiya 2 · P.O. Box 2288</p></div>
          <div className="map-label"><span className="contact-detail-icon"><Icon name="pin" /></span><span><b>Ajman · Dubai · Abu Dhabi</b><small>Branches listed in the prequalification</small></span></div>
        </div>
      </section>

      <section className="contact-cta section">
        <div>
          <p className="eyebrow">LET’S WORK TOGETHER</p>
          <h2>Ready to Start<br />Your <span>Next Project?</span></h2>
          <p>Get in touch with our team to discuss your requirements.<br />We’re here to turn your vision into reality.</p>
        </div>
        <Button href="#quote">Get a Quote</Button>
        <img src={photos.hero} alt="Dubai city skyline" loading="lazy" />
      </section>
    </>
  )
}

export default function App() {
  const isContact = /^\/(contact|get-a-quote)\/?$/.test(window.location.pathname)
  const isServices = /^\/services\/?$/.test(window.location.pathname)
  const isProjects = /^\/projects\/?$/.test(window.location.pathname)
  const isCareers = /^\/careers\/?$/.test(window.location.pathname)
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <main>
      <header className="site-header">
        <div className="header-silhouette" aria-hidden="true" />
        <a href="/" className="logo-wrap" aria-label="AKKA home">
          <img src="/akka-logo.jpg" alt="AKKA Electromechanical Contracting" />
        </a>
        <nav className={menuOpen ? 'open' : ''} aria-label="Main navigation">
          <a className={!isContact && !isServices && !isProjects && !isCareers ? 'active' : ''} aria-current={!isContact && !isServices && !isProjects && !isCareers ? 'page' : undefined} href="/">Home</a>
          <a href="/#about">About</a>
          <a className={isServices ? 'active' : ''} aria-current={isServices ? 'page' : undefined} href="/services">Services</a>
          <a className={isProjects ? 'active' : ''} aria-current={isProjects ? 'page' : undefined} href="/projects">Projects</a>
          <a className={isCareers ? 'active' : ''} aria-current={isCareers ? 'page' : undefined} href="/careers">Careers</a>
          <a className={isContact ? 'active' : ''} aria-current={isContact ? 'page' : undefined} href="/contact">Contact</a>
        </nav>
        <Button>Get a Quote</Button>
        <button className="menu" aria-label="Toggle menu" onClick={() => setMenuOpen(!menuOpen)}>
          <span /><span /><span />
        </button>
      </header>

      {isContact ? <ContactPage /> : isServices ? <ServicesPage /> : isProjects ? <ProjectsPage /> : isCareers ? <CareersPage /> : <>
      <section className="hero">
        <img className="hero-image" src={heroImage} alt="Illustrative engineers overlooking Dubai beside electromechanical pipework" fetchPriority="high" />
        <div className="hero-content">
          <p className="eyebrow">BUILDING</p>
          <h1>BETTER<br /><span>TOMORROW</span></h1>
          <p className="hero-copy">
            <span>Integrated electromechanical solutions</span>
            <span>for a stronger, smarter and more</span>
            <span>sustainable built environment.</span>
          </p>
          <div className="hero-actions">
            <a className="button" href="/services">Our Services <Icon name="arrow" /></a>
            <a className="project-button" href="/projects"><Icon name="play" /> View Projects</a>
          </div>
        </div>
        <div className="hero-features">
          <div><Icon name="helmet" /><span><b>Expert Team</b>Proven Experience</span></div>
          <div><Icon name="gear" /><span><b>Integrated Solutions</b>Across MEP Disciplines</span></div>
          <div><Icon name="building" /><span><b>Delivering Value</b>For a Better Tomorrow</span></div>
        </div>
      </section>

      <section className="about section" id="about">
        <div className="about-copy">
          <p className="eyebrow red">ABOUT AKKA</p>
          <h2>Engineering<br />Solutions for<br /><span>a Better Tomorrow</span></h2>
          <p>AKKA Electromechanical Contracting L.L.C. provides electrical, mechanical & HVAC, plumbing and fire fighting works, with operation and maintenance support. Its documented vision is growth through quality, reliability and trust, supported by collaboration and responsible workmanship.</p>
          <a className="button" href="#services">Learn More <Icon name="arrow" /></a>
          <div className="stats">
            <div><strong>MEP</strong><span>Core Disciplines</span></div>
            <div><strong>UAE</strong><span>Documented Branches</span></div>
            <div><strong>Team</strong><span>Technical Collaboration</span></div>
          </div>
        </div>
        <div className="about-visual">
          <img src={aboutBuilding} alt="Glass-fronted commercial building with the Dubai skyline in the background" />
          <div className="mission-card">
            <span className="mission-rule" aria-hidden="true" />
            <h3>Our Mission</h3>
            <p>To build long-term client and partner relationships through reliable delivery, efficiency, professionalism and honesty.</p>
            <a className="mini-icon" href="#services" aria-label="Explore our electromechanical solutions"><Icon name="arrow" /></a>
          </div>
        </div>
      </section>

      <ServicesSection />

      <section className="projects" id="projects">
        <div className="section-head light">
          <div>
            <p className="eyebrow">FEATURED PROJECTS</p>
            <h2>Projects That Make<br /><span>a Difference</span></h2>
          </div>
          <Button dark href="/projects">View All Projects</Button>
        </div>
        <div className="project-grid">
          {projects.map((project) => (
            <article className="project-card" key={project.title}>
              <img src={project.image} alt={`Illustrative image for ${project.title}; not project photography`} /><small className="image-disclosure">Illustrative image</small>
              <div className="project-info">
                <span>{project.type}</span>
                <h3>{project.title}</h3>
                <p>{project.location}</p>
                <a href="/projects" aria-label={`Explore ${project.title} and our projects`}><Icon name="arrow" /></a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="why section">
        <div className="why-photo">
          <img src={photos.building} alt="Contemporary building at sunset" />
          <div className="why-card">
            <h3>Building<br />Better Together</h3>
            <p>We collaborate with clients, consultants and partners to create spaces that enhance lives.</p>
            <span className="mini-icon"><Icon name="arrow" /></span>
          </div>
        </div>
        <div className="why-copy">
          <p className="eyebrow red">WHY CHOOSE AKKA</p>
          <h2>A Partner You Can<br /><span>Build On</span></h2>
          <p>Our documented approach brings together technical coordination, reliable workmanship and long-term client relationships.</p>
          <div className="benefits">
            <div><Icon name="gear" /><span><b>Integrated Solutions</b>All MEP disciplines under one roof.</span></div>
            <div><Icon name="shield" /><span><b>Quality & Safety</b>Inspections, risk assessment and training.</span></div>
            <div><Icon name="users" /><span><b>Proven Expertise</b>Experienced, skilled professionals.</span></div>
            <div><Icon name="bolt" /><span><b>Responsible Practice</b>Energy-saving and site care.</span></div>
          </div>
        </div>
      </section>

      <section className="cta" id="contact">
        <div>
          <p className="eyebrow">LET'S BUILD TOGETHER</p>
          <h2>Ready to Start<br />Your <span>Next Project?</span></h2>
        </div>
        <div className="contact-lines">
          <a href="tel:+97167418994"><Icon name="phone" /><span><small>Call Us</small>+971 6 741 8994</span></a>
          <a href="mailto:info@akka-mep.com"><Icon name="mail" /><span><small>Email Us</small>info@akka-mep.com</span></a>
        </div>
        <Button>Get a Quote</Button>
      </section>
      </>}

      <footer>
        <p className="prototype-note"><strong>Management review prototype.</strong> Company information follows the supplied prequalification and remains subject to AKKA approval. All imagery is illustrative and does not represent verified project photography or AKKA personnel. Forms prepare email drafts only.</p>
        <div className="footer-main">
          <div className="footer-brand">
            <img src="/akka-logo.jpg" alt="AKKA Electromechanical Contracting" />
            <p>Integrated MEP solutions engineered for a better tomorrow.</p>
          </div>
          <div>
            <h4>Quick Links</h4>
            <a href="/">Home</a><a href="/#about">About</a><a href="/services">Services</a><a href="/projects">Projects</a><a href="/careers">Careers</a><a href="/contact">Contact</a>
          </div>
          <div>
            <h4>Our Services</h4>
            <a href="/services#services">Electrical</a><a href="/services#services">Mechanical & HVAC</a><a href="/services#services">Plumbing</a><a href="/services#services">Fire Fighting</a><a href="/services#services">Operation & Maintenance</a>
          </div>
          <div>
            <h4>Connect With Us</h4>
            <a href="mailto:info@akka-mep.com">info@akka-mep.com</a>
            <p>SKY Tower, 5th Floor, Office 503<br />Sheikh Khalifa Bin Zayed Street<br />Al Nuaimiya 2, Ajman, UAE<br />P.O. Box 2288</p><p>Documented branches: Ajman, Dubai, Abu Dhabi</p><p>Official website: www.akka-mep.com</p>
          </div>
        </div>
        <div className="footer-bottom">
          <span>AKKA Electromechanical Contracting L.L.C. · Management review prototype</span>
          <span>Company approval required before public release</span>
        </div>
      </footer>
    </main>
  )
}
