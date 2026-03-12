export const FLOW = [
  { id:1, icon:"Upload", label:"Upload",       sub:"PDF/DOCX",      color:"#00C5D4"   },
  { id:2, icon:"Settings", label:"Parse",         sub:"Extract & Chunk",color:"#6366F1" },
  { id:3, icon:"Brain", label:"LLM Analyse",  sub:"ABPI Mapping",  color:"#8B5CF6" },
  { id:4, icon:"Flag", label:"Flag Issues",   sub:"RAG Scoring",   color:"#FF4560"    },
  { id:5, icon:"Edit3", label:"Alternatives", sub:"3 per issue",   color:"#FFB800"  },
  { id:6, icon:"BookOpen", label:"PMCPA Match",  sub:"Case Library",  color:"#8B5CF6" },
  { id:7, icon:"FileText", label:"Report",        sub:"Submit Ready",  color:"#00E0A0"  },
];

export const ISSUES = [
  { id:1, sev:"HIGH",  clause:"Clause 6.1", text:"The most effective treatment available for patients", reason:"Unsubstantiated superlative comparative claim. No head-to-head data cited.", pmcpa:"AUTH/3456/1/21",
    alts:["A highly effective treatment option, with Phase III data demonstrating significant response rates (REF)","An effective treatment with a proven efficacy profile across key clinical endpoints (REF)","A treatment with demonstrated efficacy — please see clinical data summary on file"] },
  { id:2, sev:"MED",   clause:"Clause 7.2", text:"Rapid onset in all patients within 2 hours", reason:"'All patients' is an absolute not supported by trial data. Mean results must be cited.",  pmcpa:"AUTH/3201/8/20",
    alts:["Rapid onset within 2 hours in 68% of patients in the pivotal Phase III study (REF)","68% response rate at 2 hours — a clinically meaningful onset of action (REF)","Onset of action data: 68% of patients responded within 2 hours (REF)"] },
  { id:3, sev:"LOW",   clause:"Clause 4.1", text:"Suitable for all adult patients with this condition", reason:"Overly broad descriptor. Must reflect licensed indication and SmPC contraindications.", pmcpa:null,
    alts:["For eligible adult patients as defined by the licensed indication — see SmPC for full eligibility criteria","Indicated for adults with [condition] meeting the inclusion criteria defined in the SmPC","For adults with [specific indication]; full prescribing information available in the SmPC"] },
];

export const DOC_SECTIONS = [
  {
    id: "s1",
    label: "Section 1",
    title: "Product Overview",
    icon: "ClipboardList",
    content: [
      { id:"p1", text:"BRANDEX® (brandexinib) 50mg film-coated tablets is indicated for the treatment of adult patients with moderate-to-severe plaque psoriasis who are candidates for systemic therapy.", issues:[] },
      { id:"p2", text:"BRANDEX is the most effective treatment available for patients with moderate-to-severe disease, offering rapid and sustained responses across all patient types.", issues:[1], highlight:"the most effective treatment available for patients with moderate-to-severe disease" },
      { id:"p3", text:"Each tablet contains 50mg of brandexinib as the active substance. For the full list of excipients, see section 6.1 of the SmPC.", issues:[] },
    ]
  },
  {
    id: "s2",
    label: "Section 2",
    title: "Clinical Evidence",
    icon: "Microscope",
    content: [
      { id:"p4", text:"In the Phase III APEX trial, BRANDEX demonstrated statistically significant improvements across all primary and secondary endpoints.", issues:[] },
      { id:"p5", text:"BRANDEX achieves rapid onset of action within 2 hours in all patients, as measured by the primary endpoint of PASI 75 at week 16.", issues:[2], highlight:"rapid onset of action within 2 hours in all patients" },
      { id:"p6", text:"Response was maintained through week 52 with a favourable tolerability profile consistent with the established safety database.", issues:[] },
    ]
  },
  {
    id: "s3",
    label: "Section 3",
    title: "Patient Population",
    icon: "Users",
    content: [
      { id:"p7", text:"BRANDEX is suitable for all adult patients who have had an inadequate response, are intolerant of, or have contraindications to other systemic therapies.", issues:[3], highlight:"suitable for all adult patients" },
      { id:"p8", text:"Treatment with BRANDEX should be initiated and supervised by a physician experienced in the diagnosis and treatment of psoriasis.", issues:[] },
    ]
  },
  {
    id: "s4",
    label: "Section 4",
    title: "Dosing & Administration",
    icon: "Pill",
    content: [
      { id:"p9", text:"The recommended dose is one 50mg tablet taken orally once daily, with or without food.", issues:[] },
      { id:"p10", text:"Treatment should be continued for as long as clinical benefit is demonstrated. Discontinuation should be considered if no response is observed after 16 weeks.", issues:[] },
    ]
  },
  {
    id: "s5",
    label: "Section 5",
    title: "Safety Information",
    icon: "AlertTriangle",
    content: [
      { id:"p11", text:"The most commonly reported adverse events (≥10%) in clinical trials were upper respiratory tract infections, headache, and nasopharyngitis.", issues:[] },
      { id:"p12", text:"Before initiating treatment, patients should be evaluated for active or latent tuberculosis infection in accordance with local guidelines.", issues:[] },
    ]
  },
];

export const ISSUE_MAP = { 1: ISSUES[0], 2: ISSUES[1], 3: ISSUES[2] };

export const ORG_USERS = [
  { id:1, name:"Dr. Sarah Chen",    role:"Medical Reviewer",  status:"Active",   docs:14, badge:"Microscope" },
  { id:2, name:"James Whitfield",   role:"Brand Manager",     status:"Active",   docs:31, badge:"BarChart3" },
  { id:3, name:"Priya Nair",        role:"Content Author",    status:"Pending",  docs:0,  badge:"Pencil" },
  { id:4, name:"Michael Torres",    role:"Final Signatory",   status:"Active",   docs:8,  badge:"CheckCircle" },
  { id:5, name:"Emma Sutcliffe",    role:"Compliance Officer",status:"Active",   docs:22, badge:"Shield" },
];

export const ORG_LIST = [
  { id:1, name:"AstraZeneca UK",   plan:"Enterprise", users:48, docs:312, status:"Active",   logo:"Building2" },
  { id:2, name:"Pfizer Limited",   plan:"Enterprise", users:31, docs:204, status:"Active",   logo:"Pill" },
  { id:3, name:"Novartis UK Ltd",  plan:"Pro",        users:12, docs:87,  status:"Active",   logo:"FlaskConical" },
  { id:4, name:"GSK Pharma",       plan:"Enterprise", users:64, docs:451, status:"Active",   logo:"Building" },
  { id:5, name:"Roche Diagnostics",plan:"Pro",        users:9,  docs:43,  status:"Pending",  logo:"Microscope" },
];

export const SUBSCRIPTION_PLANS = [
  { id:"Starter",    price:"£990",  users:"Up to 5 users",  features:["500 docs/month","ABPI analysis","Email support"] },
  { id:"Pro",        price:"£2,490",users:"Up to 20 users", features:["2,000 docs/month","PMCPA matching","Priority support","Vodori integration"] },
  { id:"Enterprise", price:"Custom",users:"Unlimited users", features:["Unlimited docs","Full LLM pipeline","Dedicated CSM","SSO / SAML","Custom ABPI templates"] },
];

// Current logged in user - controls what pages are visible
export const CURRENT_USER = {
  id: 1,
  name: "Dr. Sarah Chen",
  email: "s.chen@astrazeneca.com",
  role: "organization_admin", // Options: "super_admin", "organization_admin", "user"
  organization: "AstraZeneca UK",
  organizationId: 1
};
