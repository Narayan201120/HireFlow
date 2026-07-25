import { useEffect, useMemo, useState } from 'react'
import { jobs, starterApplications } from './data'

const icons = {
  search: '⌕', bookmark: '♡', briefcase: '▣', home: '⌂', menu: '☰', arrow: '→', close: '×', check: '✓'
}

function App() {
  const [query, setQuery] = useState('')
  const [location, setLocation] = useState('')
  const [saved, setSaved] = useState(() => JSON.parse(localStorage.getItem('hireflow-saved') || '[]'))
  const [applications, setApplications] = useState(() => JSON.parse(localStorage.getItem('hireflow-applications') || JSON.stringify(starterApplications)))
  const [activeTab, setActiveTab] = useState('discover')
  const [selectedJob, setSelectedJob] = useState(null)
  const [toast, setToast] = useState('')

  useEffect(() => localStorage.setItem('hireflow-saved', JSON.stringify(saved)), [saved])
  useEffect(() => localStorage.setItem('hireflow-applications', JSON.stringify(applications)), [applications])
  useEffect(() => {
    if (!toast) return undefined
    const timer = setTimeout(() => setToast(''), 2600)
    return () => clearTimeout(timer)
  }, [toast])

  const filteredJobs = useMemo(() => jobs.filter(job => {
    const haystack = `${job.title} ${job.company} ${job.location} ${job.tags.join(' ')}`.toLowerCase()
    return haystack.includes(query.toLowerCase()) && (!location || job.location.toLowerCase().includes(location.toLowerCase()))
  }), [query, location])

  const toggleSaved = (id) => {
    setSaved(current => current.includes(id) ? current.filter(jobId => jobId !== id) : [...current, id])
  }

  const apply = (job) => {
    if (!applications.some(item => item.company === job.company && item.role === job.title)) {
      setApplications(current => [{ id: Date.now(), company: job.company, role: job.title, status: 'Applied', date: 'Just now' }, ...current])
    }
    setSelectedJob(null)
    setActiveTab('applications')
    setToast(`Application added for ${job.title}`)
  }

  const changeStatus = (id, status) => setApplications(current => current.map(item => item.id === id ? { ...item, status } : item))
  const jobsToShow = activeTab === 'saved' ? filteredJobs.filter(job => saved.includes(job.id)) : filteredJobs

  return <div className="app-shell">
    <header className="topbar">
      <button className="brand" onClick={() => setActiveTab('discover')} aria-label="HireFlow home"><span className="brand-mark">H</span>HireFlow</button>
      <nav aria-label="Main navigation">
        <button className={activeTab === 'discover' ? 'active' : ''} onClick={() => setActiveTab('discover')}>Discover</button>
        <button className={activeTab === 'saved' ? 'active' : ''} onClick={() => setActiveTab('saved')}>Saved <span className="nav-count">{saved.length}</span></button>
        <button className={activeTab === 'applications' ? 'active' : ''} onClick={() => setActiveTab('applications')}>Applications</button>
      </nav>
      <button className="avatar" aria-label="Your profile">RK</button>
    </header>

    {activeTab !== 'applications' ? <main>
      <section className="hero">
        <p className="eyebrow">YOUR NEXT CHAPTER STARTS HERE</p>
        <h1>Find work you’ll<br /><em>love doing.</em></h1>
        <p className="hero-copy">Thoughtfully selected opportunities from teams building meaningful things.</p>
        <div className="search-panel">
          <label><span>{icons.search}</span><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Role, skill, or company" /></label>
          <label className="location-field"><span>⌖</span><input value={location} onChange={e => setLocation(e.target.value)} placeholder="Location" /></label>
          <button className="search-button" onClick={() => setToast(`${filteredJobs.length} opportunities found`)}>Search jobs <span>{icons.arrow}</span></button>
        </div>
        <div className="popular">Popular: <button onClick={() => setQuery('React')}>React</button><button onClick={() => setQuery('Designer')}>Design</button><button onClick={() => setQuery('Remote')}>Remote</button></div>
      </section>
      <section className="content-section">
        <div className="section-heading"><div><p className="eyebrow">{activeTab === 'saved' ? 'YOUR SHORTLIST' : 'CURATED FOR YOU'}</p><h2>{activeTab === 'saved' ? 'Saved opportunities' : 'Fresh opportunities'}</h2></div><span className="result-count">{jobsToShow.length} roles</span></div>
        {jobsToShow.length ? <div className="job-grid">{jobsToShow.map(job => <JobCard key={job.id} job={job} saved={saved.includes(job.id)} onSave={() => toggleSaved(job.id)} onOpen={() => setSelectedJob(job)} />)}</div> : <div className="empty"><span>♡</span><h3>No saved roles yet</h3><p>Bookmark opportunities to build your shortlist.</p><button onClick={() => setActiveTab('discover')}>Explore jobs</button></div>}
      </section>
    </main> : <Applications applications={applications} onStatusChange={changeStatus} onDiscover={() => setActiveTab('discover')} />}
    {selectedJob && <JobModal job={selectedJob} saved={saved.includes(selectedJob.id)} onSave={() => toggleSaved(selectedJob.id)} onApply={() => apply(selectedJob)} onClose={() => setSelectedJob(null)} />}
    {toast && <div className="toast"><span>{icons.check}</span>{toast}</div>}
  </div>
}

function JobCard({ job, saved, onSave, onOpen }) {
  return <article className="job-card">
    <div className="card-top"><div className="company-logo" style={{ backgroundColor: job.color }}>{job.initials}</div><button className={saved ? 'save saved' : 'save'} onClick={onSave} aria-label="Save job">{saved ? '♥' : icons.bookmark}</button></div>
    <button className="job-main" onClick={onOpen}><p className="company-name">{job.company}</p><h3>{job.title}</h3><p className="job-meta">{job.location} <span>·</span> {job.type}</p><div className="tags">{job.tags.map(tag => <span key={tag}>{tag}</span>)}</div></button>
    <div className="card-footer"><span>{job.salary}</span><button onClick={onOpen}>View role <b>{icons.arrow}</b></button></div>
  </article>
}

function Applications({ applications, onStatusChange, onDiscover }) {
  const labels = ['Saved', 'Applied', 'Interview', 'Offer']
  return <main className="applications"><section className="applications-hero"><p className="eyebrow">STAY ORGANISED</p><h1>Your application<br /><em>momentum.</em></h1><p>Keep every opportunity moving without losing track of the details.</p></section><section className="content-section"><div className="section-heading"><div><p className="eyebrow">APPLICATION TRACKER</p><h2>Where you stand</h2></div><button className="outline-button" onClick={onDiscover}>Browse jobs {icons.arrow}</button></div><div className="kanban">{labels.map(label => <div className="kanban-column" key={label}><div className="column-title"><h3>{label}</h3><span>{applications.filter(item => item.status === label).length}</span></div>{applications.filter(item => item.status === label).map(item => <div className="application-card" key={item.id}><p>{item.company}</p><h4>{item.role}</h4><small>{item.date}</small><select value={item.status} onChange={e => onStatusChange(item.id, e.target.value)} aria-label={`Status for ${item.role}`}>{labels.map(option => <option key={option}>{option}</option>)}</select></div>)}</div>)}</div></section></main>
}

function JobModal({ job, saved, onSave, onApply, onClose }) {
  return <div className="modal-backdrop" role="presentation" onMouseDown={onClose}><section className="modal" role="dialog" aria-modal="true" aria-labelledby="job-title" onMouseDown={e => e.stopPropagation()}><button className="close" onClick={onClose} aria-label="Close">{icons.close}</button><div className="modal-logo" style={{ backgroundColor: job.color }}>{job.initials}</div><p className="company-name">{job.company}</p><h2 id="job-title">{job.title}</h2><p className="job-meta">{job.location} <span>·</span> {job.type} <span>·</span> {job.salary}</p><div className="tags">{job.tags.map(tag => <span key={tag}>{tag}</span>)}</div><hr /><h3>About the role</h3><p className="description">Join a thoughtful, ambitious team and help shape a product people genuinely enjoy using. You’ll own meaningful work, collaborate closely, and have room to grow.</p><div className="modal-actions"><button className={saved ? 'secondary saved' : 'secondary'} onClick={onSave}>{saved ? '♥ Saved' : '♡ Save role'}</button><button className="primary" onClick={() => onApply(job)}>Add application {icons.arrow}</button></div></section></div>
}

export default App
