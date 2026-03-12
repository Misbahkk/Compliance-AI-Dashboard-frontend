import { useState } from 'react';
import { C, font } from '../../styles/designTokens';
import { ORG_LIST } from '../../data/dummyData';
import Chip from '../../components/Chip';
import Btn from '../../components/Btn';
import GlassCard from '../../components/GlassCard';
import { ShieldCheck, Eye, ClipboardList, LineChart, Ban, BarChart3, Building2, Users, TrendingUp, Lock, FileText, Flag, LogOut } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

function SuperAdmin({ adminUser, onLogout }) {
  const [tab, setTab] = useState("overview"); // overview | orgs | users | analytics | security
  const [selectedOrg, setSelectedOrg] = useState(null);

  const sideItems = [
    { id:"overview",  icon: BarChart3, label:"Overview" },
    { id:"orgs",      icon: Building2, label:"Organisations" },
    { id:"users",     icon: Users, label:"All Users" },
    { id:"analytics", icon: TrendingUp, label:"Analytics" },
    { id:"security",  icon: Lock, label:"Security" },
  ];

  return (
    <div style={{ minHeight:"100vh", background:C.navy, paddingTop:60, display:"flex" }}>
      {/* Sidebar */}
      <div style={{ width:220, background:C.navyCard, borderRight:`1px solid ${C.border}`,
        padding:"24px 0", flexShrink:0, height:"calc(100vh - 60px)", position:"sticky", top:60 }}>
        <div style={{ padding:"0 16px 20px", borderBottom:`1px solid ${C.border}`, marginBottom:12 }}>
          <div style={{ fontSize:10, letterSpacing:"0.1em", color:C.slate, fontWeight:700, marginBottom:6 }}>SUPER ADMIN</div>
          <div style={{ fontWeight:800, color:C.white, fontSize:14 }}>Platform Control Centre</div>
        </div>
        {sideItems.map(it => {
          const SideIcon = it.icon;
          return (
          <button key={it.id} onClick={() => setTab(it.id)}
            style={{ display:"flex", alignItems:"center", gap:12, width:"100%", padding:"12px 20px",
              background: tab===it.id ? `${C.teal}18` : "transparent",
              borderLeft: tab===it.id ? `3px solid ${C.teal}` : "3px solid transparent",
              border:"none", color: tab===it.id ? C.white : C.slate,
              fontWeight: tab===it.id ? 700 : 400, fontSize:14, cursor:"pointer",
              fontFamily:font.body, transition:"all 0.2s", textAlign:"left" }}>
            <SideIcon size={18} color={tab===it.id ? C.teal : C.slate} strokeWidth={2} />
            {it.label}
          </button>
        );
        })}
        {/* Admin Info & Logout */}
        <div style={{ position:"absolute", bottom:20, left:0, right:0, padding:"0 16px" }}>
          {/* System status */}
          <div style={{ background:`${C.green}15`, border:`1px solid ${C.green}33`,
            borderRadius:10, padding:"12px 14px", marginBottom:12 }}>
            <div style={{ display:"flex", alignItems:"center", gap:8 }}>
              <div style={{ width:8, height:8, borderRadius:"50%", background:C.green }} />
              <span style={{ fontSize:11, fontWeight:700, color:C.green }}>All Systems Operational</span>
            </div>
            <div style={{ fontSize:10, color:C.slate, marginTop:4 }}>LLM · ABPI DB · PMCPA</div>
          </div>
          
          {/* Logout Button */}
          {onLogout && (
            <button
              onClick={onLogout}
              style={{
                display:"flex", alignItems:"center", gap:10, width:"100%", padding:"12px 14px",
                background:`${C.red}12`, border:`1px solid ${C.red}33`, borderRadius:10,
                color:C.red, fontSize:13, fontWeight:600, cursor:"pointer",
                fontFamily:font.body, transition:"all 0.2s"
              }}
              onMouseEnter={e => e.currentTarget.style.background = `${C.red}22`}
              onMouseLeave={e => e.currentTarget.style.background = `${C.red}12`}
            >
              <LogOut size={16} strokeWidth={2} />
              Sign Out
            </button>
          )}
        </div>
      </div>

      {/* Main content */}
      <div style={{ flex:1, overflow:"auto", padding:32 }}>
        {tab === "overview" && (
          <div>
            <div style={{ marginBottom:28 }}>
              <Chip color={C.teal}>PLATFORM OVERVIEW</Chip>
              <h2 style={{ fontFamily:font.display, fontSize:24, fontWeight:700, color:C.white, margin:"10px 0" }}>
                ReviewReady Admin Dashboard
              </h2>
              <div style={{ color:C.slate, fontSize:13 }}>
                {new Date().toLocaleDateString("en-GB",{weekday:"long",day:"numeric",month:"long",year:"numeric"})}
              </div>
            </div>

            <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16, marginBottom:24 }}>
              {[
                { icon:Building2, val:"5",    label:"Active Organisations", col:C.teal,   change:"+1 this month" },
                { icon:Users, val:"164",  label:"Total Users",          col:C.indigo, change:"+12 this week" },
                { icon:FileText, val:"1,097",label:"Docs Reviewed",        col:C.green,  change:"+84 today" },
                { icon:Flag, val:"4,218",label:"Issues Caught",        col:C.amber,  change:"Lifetime" },
              ].map(s => (
                <GlassCard key={s.label} style={{ padding:"22px 24px" }}>
                  <div style={{ marginBottom:8 }}>
                  <s.icon size={22} color={s.col} strokeWidth={2} />
                </div>
                  <div style={{ fontFamily:font.display, fontSize:30, fontWeight:700, color:s.col }}>{s.val}</div>
                  <div style={{ fontSize:12, color:C.slate, marginTop:4 }}>{s.label}</div>
                  <div style={{ fontSize:11, color:C.green, marginTop:6 }}>{s.change}</div>
                </GlassCard>
              ))}
            </div>

            {/* Orgs overview */}
            <GlassCard style={{ marginBottom:20 }}>
              <div style={{ padding:"16px 24px", borderBottom:`1px solid ${C.border}`,
                display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <div style={{ fontWeight:700, color:C.white, fontSize:14 }}>Organisations</div>
                <Btn size="sm" onClick={() => setTab("orgs")}>View All →</Btn>
              </div>
              {ORG_LIST.slice(0,3).map((o,i) => {
                const LogoIcon = LucideIcons[o.logo];
                return (
                <div key={o.id} style={{ padding:"14px 24px",
                  borderBottom: i<2 ? `1px solid ${C.border}` : "none",
                  display:"flex", alignItems:"center", gap:16 }}>
                  <div style={{ width:40, height:40, borderRadius:12, background:`${C.teal}22`,
                    display:"flex", alignItems:"center", justifyContent:"center", fontSize:20 }}>
                    {LogoIcon && <LogoIcon size={20} color={C.teal} strokeWidth={1.5} />}
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontWeight:700, color:C.white, fontSize:14 }}>{o.name}</div>
                    <div style={{ fontSize:11, color:C.slate }}>{o.users} users · {o.docs} docs</div>
                  </div>
                  <Chip color={C.indigo}>{o.plan}</Chip>
                  <Chip color={o.status==="Active"?C.green:C.amber}>{o.status}</Chip>
                </div>
              );
              })}
            </GlassCard>

            {/* LLM Health */}
            <GlassCard style={{ padding:24 }}>
              <div style={{ fontWeight:700, color:C.white, fontSize:14, marginBottom:16 }}>System Health</div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:14 }}>
                {[
                  { label:"LLM Response Time", val:"1.2s", sub:"avg last 24h", col:C.green },
                  { label:"ABPI DB Sync", val:"Live", sub:"Last synced 2h ago", col:C.teal },
                  { label:"PMCPA Index", val:"312 cases", sub:"Updated daily", col:C.purple },
                  { label:"API Uptime", val:"99.98%", sub:"Last 30 days", col:C.green },
                  { label:"Active Sessions", val:"23", sub:"Right now", col:C.indigo },
                  { label:"Failed Reviews", val:"0", sub:"Today", col:C.green },
                ].map(s => (
                  <div key={s.label} style={{ background:`${C.navyLight}44`, borderRadius:12, padding:"16px 18px" }}>
                    <div style={{ fontSize:20, fontWeight:800, color:s.col, marginBottom:4 }}>{s.val}</div>
                    <div style={{ fontSize:12, color:C.white, fontWeight:600 }}>{s.label}</div>
                    <div style={{ fontSize:11, color:C.slate, marginTop:2 }}>{s.sub}</div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        )}

        {tab === "orgs" && (
          <div>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:24 }}>
              <div>
                <Chip color={C.teal}>ORGANISATIONS</Chip>
                <h2 style={{ fontFamily:font.display, fontSize:22, fontWeight:700, color:C.white, margin:"10px 0 0" }}>
                  All Organisations ({ORG_LIST.length})
                </h2>
              </div>
              <Btn>+ Onboard New Org</Btn>
            </div>
            <GlassCard>
              <div style={{ padding:"12px 24px", borderBottom:`1px solid ${C.border}`,
                display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr 1fr auto",
                fontSize:11, color:C.slate, fontWeight:700, letterSpacing:"0.06em" }}>
                {["ORGANISATION","PLAN","USERS","DOCS","STATUS",""].map(h => <div key={h}>{h}</div>)}
              </div>
              {ORG_LIST.map((o,i) => {
                const OrgIcon = LucideIcons[o.logo];
                return (
                <div key={o.id} style={{ padding:"16px 24px",
                  borderBottom: i<ORG_LIST.length-1 ? `1px solid ${C.border}` : "none",
                  display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr 1fr auto",
                  alignItems:"center", transition:"background 0.15s", cursor:"pointer" }}
                  onMouseEnter={e=>e.currentTarget.style.background=`${C.teal}08`}
                  onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                  <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                    <div style={{ width:36, height:36, borderRadius:10, background:`${C.teal}22`,
                      display:"flex", alignItems:"center", justifyContent:"center" }}>
                      {OrgIcon && <OrgIcon size={18} color={C.teal} strokeWidth={1.5} />}
                    </div>
                    <span style={{ fontWeight:700, color:C.white, fontSize:14 }}>{o.name}</span>
                  </div>
                  <Chip color={C.indigo}>{o.plan}</Chip>
                  <span style={{ color:C.slateLight }}>{o.users}</span>
                  <span style={{ color:C.slateLight }}>{o.docs}</span>
                  <Chip color={o.status==="Active"?C.green:C.amber}>{o.status}</Chip>
                  <div style={{ display:"flex", gap:6 }}>
                    <Btn size="sm" variant="dark">Manage</Btn>
                    <Btn size="sm" variant="ghost"><LucideIcons.Settings size={14} /></Btn>
                  </div>
                </div>
              );
              })}
            </GlassCard>
          </div>
        )}

        {tab === "security" && (
          <div>
            <Chip color={C.indigo}>SECURITY CENTRE</Chip>
            <h2 style={{ fontFamily:font.display, fontSize:22, fontWeight:700, color:C.white, margin:"10px 0 24px" }}>
              Platform Security & Compliance
            </h2>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
              {[
                { icon:ShieldCheck, title:"Encryption", col:C.teal, items:["TLS 1.3 in transit","AES-256 at rest","Key rotation every 30 days","HSM-backed key management"] },
                { icon:Eye, title:"Access Control", col:C.indigo, items:["Role-based access control (RBAC)","SSO / SAML 2.0 support","MFA enforced for all admins","Session timeout: 30 minutes"] },
                { icon:ClipboardList, title:"Audit & Compliance", col:C.purple, items:["Full tamper-proof audit log","GDPR Article 30 records","User identity on every action","Exportable compliance reports"] },
                { icon:Ban, title:"Data Isolation", col:C.amber, items:["Zero post-session retention","No LLM training on org data","Org-level data segregation","DSAR request processing"] },
              ].map(s => (
                <GlassCard key={s.title} glow={s.col} style={{ padding:26 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:18 }}>
                    <div style={{ width:40, height:40, borderRadius:12, background:`${s.col}22`,
                      display:"flex", alignItems:"center", justifyContent:"center" }}><s.icon size={20} color={s.col} strokeWidth={2} /></div>
                    <div style={{ fontWeight:700, color:C.white, fontSize:15 }}>{s.title}</div>
                  </div>
                  {s.items.map(item => (
                    <div key={item} style={{ display:"flex", gap:10, alignItems:"center",
                      padding:"8px 0", borderBottom:`1px solid ${C.border}`, fontSize:13 }}>
                      <LucideIcons.Check size={14} color={s.col} strokeWidth={2} />
                      <span style={{ color:C.slateLight }}>{item}</span>
                    </div>
                  ))}
                </GlassCard>
              ))}
            </div>
          </div>
        )}

        {["users","analytics"].includes(tab) && (
          <div style={{ textAlign:"center", padding:"80px 32px" }}>
           <div style={{ marginBottom:16 }}>
              {tab==="users" 
                ? <Users size={48} color={C.indigo} strokeWidth={2}/>
                : <LineChart size={48} color={C.teal} strokeWidth={2}/>
              }
            </div>
            <h3 style={{ fontFamily:font.display, fontSize:24, color:C.white, marginBottom:8 }}>
              {tab==="users" ? "User Management" : "Analytics"}
            </h3>
            <p style={{ color:C.slate }}>Full {tab} panel — coming in next sprint.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SuperAdmin;

