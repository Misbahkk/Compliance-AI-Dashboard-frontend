import { useState } from 'react';
import { C, font } from '../../styles/designTokens';
import { ORG_USERS, SUBSCRIPTION_PLANS } from '../../data/dummyData';
import Chip from '../../components/Chip';
import Btn from '../../components/Btn';
import GlassCard from '../../components/GlassCard';
import * as LucideIcons from 'lucide-react';
import { PartyPopper, Upload, BarChart3, Users, Settings, CheckCircle, Flag, FileText, Building2, UserPlus } from 'lucide-react';

function OrgPortal() {
  const [tab, setTab] = useState("onboard"); // onboard | portal
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ org:"", domain:"", plan:"Enterprise", adminName:"", adminEmail:"", adminRole:"" });
  const [done, setDone] = useState(false);
  const [userView, setUserView] = useState("home"); // home | upload | review

  const plans = [
    { id:"Starter",    price:"£990",  users:"Up to 5 users",  features:["500 docs/month","ABPI analysis","Email support"] },
    { id:"Pro",        price:"£2,490",users:"Up to 20 users", features:["2,000 docs/month","PMCPA matching","Priority support","Vodori integration"] },
    { id:"Enterprise", price:"Custom",users:"Unlimited users", features:["Unlimited docs","Full LLM pipeline","Dedicated CSM","SSO / SAML","Custom ABPI templates"] },
  ];

  /* ── Onboarding wizard ── */
  const renderOnboard = () => {
    if (done) return (
      <div style={{ textAlign:"center", padding:"60px 32px" }}>
        <div style={{ marginBottom:20 }}><PartyPopper size={64} color={C.teal} strokeWidth={1.5} /></div>
        <h2 style={{ fontFamily:font.display, fontSize:32, fontWeight:700, color:C.white, marginBottom:12 }}>
          You're All Set!
        </h2>
        <p style={{ color:C.slateLight, fontSize:15, maxWidth:440, margin:"0 auto 32px", lineHeight:1.65 }}>
          <strong style={{ color:C.white }}>{form.org}</strong> has been provisioned on ReviewReady. Your admin credentials have been sent to <strong style={{ color:C.teal }}>{form.adminEmail}</strong>.
        </p>
        <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
          <Btn onClick={() => setTab("portal")}>Open Organisation Portal →</Btn>
          <Btn variant="ghost" onClick={() => { setDone(false); setStep(1); setForm({ org:"",domain:"",plan:"Enterprise",adminName:"",adminEmail:"",adminRole:"" }); }}>
            Onboard Another
          </Btn>
        </div>
      </div>
    );

    return (
      <div style={{ maxWidth:680, margin:"0 auto", padding:40 }}>
        {/* Steps */}
        <div style={{ display:"flex", alignItems:"center", gap:0, marginBottom:40, justifyContent:"center" }}>
          {["Organisation","Plan","Admin","Confirm"].map((l,i) => {
            const n = i+1; const done_ = step > n; const active_ = step === n;
            return (
              <div key={l} style={{ display:"flex", alignItems:"center" }}>
                <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:6 }}>
                  <div style={{ width:34, height:34, borderRadius:"50%",
                    background: done_ ? C.green : active_ ? C.teal : C.border,
                    color: done_||active_ ? C.navy : C.slate,
                    display:"flex", alignItems:"center", justifyContent:"center",
                    fontWeight:800, fontSize:14, transition:"all 0.3s" }}>
                    {done_ ? <CheckCircle size={16} color={C.navy} strokeWidth={1.5} /> : n}
                  </div>
                  <div style={{ fontSize:11, color: active_ ? C.white : C.slate, fontWeight: active_?700:400 }}>{l}</div>
                </div>
                {i<3 && <div style={{ width:60, height:2, background: step>n?C.teal:C.border, margin:"0 8px 20px", transition:"all 0.3s" }} />}
              </div>
            );
          })}
        </div>

        <GlassCard style={{ padding:36 }}>
          {step===1 && (
            <div>
              <h3 style={{ fontFamily:font.display, fontSize:22, fontWeight:700, color:C.white, marginBottom:6 }}>Organisation Details</h3>
              <p style={{ color:C.slate, fontSize:13, marginBottom:28 }}>Tell us about the organisation being onboarded.</p>
              {[
                { key:"org", label:"Organisation Name", ph:"e.g. Pfizer UK Limited" },
                { key:"domain", label:"Email Domain", ph:"e.g. pfizer.com" },
              ].map(f => (
                <div key={f.key} style={{ marginBottom:20 }}>
                  <label style={{ display:"block", fontSize:12, fontWeight:700, color:C.slateLight, marginBottom:8, letterSpacing:"0.05em" }}>{f.label.toUpperCase()}</label>
                  <input value={form[f.key]} onChange={e => setForm({...form,[f.key]:e.target.value})}
                    placeholder={f.ph}
                    style={{ width:"100%", padding:"12px 16px", background:`${C.navyLight}66`,
                      border:`1px solid ${C.border}`, borderRadius:10, color:C.white,
                      fontSize:14, fontFamily:font.body, outline:"none", boxSizing:"border-box" }} />
                </div>
              ))}
              <Btn onClick={() => form.org && setStep(2)} style={{ marginTop:8 }}>Continue →</Btn>
            </div>
          )}

          {step===2 && (
            <div>
              <h3 style={{ fontFamily:font.display, fontSize:22, fontWeight:700, color:C.white, marginBottom:6 }}>Choose a Plan</h3>
              <p style={{ color:C.slate, fontSize:13, marginBottom:28 }}>Select the subscription tier for {form.org}.</p>
              <div style={{ display:"flex", flexDirection:"column", gap:14, marginBottom:28 }}>
                {plans.map(p => (
                  <div key={p.id} onClick={() => setForm({...form,plan:p.id})}
                    style={{ border:`2px solid ${form.plan===p.id ? C.teal : C.border}`,
                      borderRadius:14, padding:"18px 22px", cursor:"pointer",
                      background: form.plan===p.id ? `${C.teal}12` : `${C.navyLight}44`,
                      transition:"all 0.2s", display:"flex", alignItems:"center", gap:18 }}>
                    <div style={{ flex:1 }}>
                      <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:4 }}>
                        <span style={{ fontWeight:800, color:C.white, fontSize:16 }}>{p.id}</span>
                        <Chip color={C.slate}>{p.users}</Chip>
                        {p.id==="Enterprise" && <Chip color={C.amber}>RECOMMENDED</Chip>}
                      </div>
                      <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginTop:8 }}>
                        {p.features.map(f => (
                          <span key={f} style={{ fontSize:11, color:C.slate, display:"flex", alignItems:"center", gap:4 }}>
                            <CheckCircle size={10} color={C.slate} strokeWidth={1.5} /> {f}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div style={{ fontFamily:font.display, fontSize:22, fontWeight:700,
                      color: form.plan===p.id ? C.teal : C.slateLight }}>{p.price}</div>
                  </div>))}
              </div>
              <div style={{ display:"flex", gap:10 }}>
                <Btn variant="ghost" onClick={() => setStep(1)}>← Back</Btn>
                <Btn onClick={() => setStep(3)}>Continue →</Btn>
              </div>
            </div>
          )}

          {step===3 && (
            <div>
              <h3 style={{ fontFamily:font.display, fontSize:22, fontWeight:700, color:C.white, marginBottom:6 }}>Primary Administrator</h3>
              <p style={{ color:C.slate, fontSize:13, marginBottom:28 }}>This person will manage users and settings for {form.org}.</p>
              {[
                { key:"adminName",  label:"Full Name",        ph:"Dr. Sarah Chen" },
                { key:"adminEmail", label:"Work Email",       ph:"s.chen@pfizer.com" },
                { key:"adminRole",  label:"Role / Job Title", ph:"Head of Medical Affairs" },
              ].map(f => (
                <div key={f.key} style={{ marginBottom:20 }}>
                  <label style={{ display:"block", fontSize:12, fontWeight:700, color:C.slateLight, marginBottom:8, letterSpacing:"0.05em" }}>{f.label.toUpperCase()}</label>
                  <input value={form[f.key]} onChange={e => setForm({...form,[f.key]:e.target.value})}
                    placeholder={f.ph}
                    style={{ width:"100%", padding:"12px 16px", background:`${C.navyLight}66`,
                      border:`1px solid ${C.border}`, borderRadius:10, color:C.white,
                      fontSize:14, fontFamily:font.body, outline:"none", boxSizing:"border-box" }} />
                </div>
              ))}
              <div style={{ display:"flex", gap:10 }}>
                <Btn variant="ghost" onClick={() => setStep(2)}>← Back</Btn>
                <Btn onClick={() => form.adminEmail && setStep(4)}>Continue →</Btn>
              </div>
            </div>
          )}

          {step===4 && (
            <div>
              <h3 style={{ fontFamily:font.display, fontSize:22, fontWeight:700, color:C.white, marginBottom:24 }}>Confirm & Provision</h3>
              {[
                ["Organisation", form.org],
                ["Domain",       form.domain],
                ["Plan",         form.plan],
                ["Admin",        form.adminName],
                ["Admin Email",  form.adminEmail],
                ["Admin Role",   form.adminRole],
              ].map(([k,v]) => (
                <div key={k} style={{ display:"flex", justifyContent:"space-between",
                  padding:"12px 0", borderBottom:`1px solid ${C.border}`, fontSize:14 }}>
                  <span style={{ color:C.slate }}>{k}</span>
                  <span style={{ color:C.white, fontWeight:600 }}>{v || "—"}</span>
                </div>
              ))}
              <div style={{ background:`${C.green}15`, border:`1px solid ${C.green}33`,
                borderRadius:10, padding:"14px 18px", marginTop:20, marginBottom:24 }}>
                <div style={{ fontSize:12, color:C.green }}><CheckCircle size={12} color={C.green} strokeWidth={1.5} /> Organisation will be provisioned immediately. Admin will receive an email with login credentials and setup instructions.</div>
              </div>
              <div style={{ display:"flex", gap:10 }}>
                <Btn variant="ghost" onClick={() => setStep(3)}>← Back</Btn>
                <Btn onClick={() => setDone(true)}>Provision Organisation</Btn>
              </div>
            </div>
          )}
        </GlassCard>
      </div>
    );
  };

  /* ── Org User Portal ── */
  const renderPortal = () => (
    <div style={{ maxWidth:1080, margin:"0 auto", padding:32 }}>
      {/* Portal header */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:28 }}>
        <div>
          <Chip color={C.teal}>ORGANISATION PORTAL</Chip>
          <h2 style={{ fontFamily:font.display, fontSize:24, fontWeight:700, color:C.white, margin:"10px 0 4px" }}>
            AstraZeneca UK
          </h2>
          <div style={{ color:C.slate, fontSize:13 }}>Enterprise Plan · 48 users · 312 documents reviewed</div>
        </div>
        <div style={{ display:"flex", gap:10 }}>
          <Btn variant="ghost" size="sm">⚙️ Settings</Btn>
          <Btn size="sm">+ Invite User</Btn>
        </div>
      </div>

      {/* Summary cards */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16, marginBottom:24 }}>
        {[
          { icon: FileText, val:"312", label:"Docs Reviewed",        col:C.teal },
          { icon: Flag, val:"1,204",label:"Issues Caught",        col:C.amber },
          { icon: CheckCircle, val:"89%",  label:"First-Pass Rate",      col:C.green },
          { icon: Building2, val:"3.2d", label:"Avg Time Saved/Doc",   col:C.purple },
        ].map(s => (
          <GlassCard key={s.label} style={{ padding:"20px 22px" }}>
            <div style={{ fontSize:22, marginBottom:8 }}><s.icon size={22} color={s.col} strokeWidth={1.5} /></div>
            <div style={{ fontFamily:font.display, fontSize:28, fontWeight:700, color:s.col }}>{s.val}</div>
            <div style={{ fontSize:12, color:C.slate, marginTop:4 }}>{s.label}</div>
          </GlassCard>
        ))}
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
        {/* User list */}
        <GlassCard>
          <div style={{ padding:"16px 22px", borderBottom:`1px solid ${C.border}`,
            fontWeight:700, color:C.white, fontSize:14, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            Team Members
            <Btn size="sm">+ Add</Btn>
          </div>
          {ORG_USERS.map((u,i) => (
            <div key={u.id} style={{ padding:"14px 22px",
              borderBottom: i<ORG_USERS.length-1 ? `1px solid ${C.border}` : "none",
              display:"flex", alignItems:"center", gap:14 }}>
              <div style={{ width:38, height:38, borderRadius:12, background:`${C.teal}22`,
                display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, flexShrink:0 }}>
                {(() => { const UserIcon = LucideIcons[u.badge]; return UserIcon ? <UserIcon size={18} color={C.teal} strokeWidth={2} /> : null; })()}
              </div>
              <div style={{ flex:1 }}>
                <div style={{ fontWeight:700, color:C.white, fontSize:13 }}>{u.name}</div>
                <div style={{ fontSize:11, color:C.slate }}>{u.role}</div>
              </div>
              <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:4 }}>
                <Chip color={u.status==="Active"?C.green:C.amber}>{u.status}</Chip>
                <div style={{ fontSize:10, color:C.slate }}>{u.docs} docs</div>
              </div>
            </div>
          ))}
        </GlassCard>

        {/* Activity + Quick Actions */}
        <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
          <GlassCard style={{ padding:22 }}>
            <div style={{ fontWeight:700, color:C.white, fontSize:14, marginBottom:16 }}>Quick Actions</div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
              {[
                { icon: Upload, label:"Upload Document",    col:C.teal },
                { icon: BarChart3, label:"View Reports",       col:C.indigo },
                { icon: Users, label:"Manage Users",       col:C.purple },
                { icon: Settings, label:"Integrations",       col:C.amber },
              ].map(a => {
                const IconComponent = a.icon;
                return (
                <div key={a.label} style={{ background:`${a.col}15`, border:`1px solid ${a.col}33`,
                  borderRadius:12, padding:"14px 16px", cursor:"pointer", transition:"all 0.2s",
                  display:"flex", alignItems:"center", gap:10 }}
                  onMouseEnter={e=>e.currentTarget.style.background=`${a.col}25`}
                  onMouseLeave={e=>e.currentTarget.style.background=`${a.col}15`}>
                  <IconComponent size={20} color={a.col} strokeWidth={2} />
                  <span style={{ fontSize:12, fontWeight:700, color:C.white }}>{a.label}</span>
                </div>
              );
              })}
            </div>
          </GlassCard>

          <GlassCard style={{ padding:22 }}>
              <div style={{ fontWeight:700, color:C.white, fontSize:14, marginBottom:16 }}>Recent Activity</div>
              {[
                { icon: CheckCircle, text:"Promotional_Email_v2.docx passed review", time:"2m ago", col:C.green },
                { icon: Flag,        text:"Congress_Slides_v1.pptx flagged 5 issues", time:"18m ago", col:C.amber },
                { icon: Upload,      text:"SmPC_Summary_final.pdf uploaded", time:"1h ago", col:C.teal },
                { icon: UserPlus,    text:"Priya Nair accepted invitation", time:"3h ago", col:C.indigo },
              ].map((a,i) => (
                <div key={i} style={{ display:"flex", gap:12, alignItems:"flex-start", marginBottom:14 }}>
                  <div style={{
                    width:28, height:28, borderRadius:8, background:`${a.col}22`,
                    display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, flexShrink:0
                  }}>
                    <a.icon size={14} color={a.col} strokeWidth={2} />
                  </div>
                  <div>
                    <div style={{ fontSize:12, color:C.slateLight }}>{a.text}</div>
                    <div style={{ fontSize:10, color:C.slate, marginTop:2 }}>{a.time}</div>
                  </div>
                </div>
              ))}
            </GlassCard>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight:"100vh", background:C.navy, paddingTop:76 }}>
      {/* Sub-tabs */}
      <div style={{ borderBottom:`1px solid ${C.border}`, padding:"0 32px",
        display:"flex", gap:0, maxWidth:1080, margin:"0 auto" }}>
        {[
          { id:"onboard", label:"🏢 Onboard Organisation" },
          { id:"portal",  label:"👥 Organisation Portal" },
        ].map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            style={{ padding:"14px 24px", background:"transparent",
              border:"none", borderBottom: tab===t.id ? `2px solid ${C.teal}` : "2px solid transparent",
              color: tab===t.id ? C.white : C.slate, fontWeight:700, fontSize:13,
              cursor:"pointer", fontFamily:font.body, transition:"all 0.2s" }}>
            {t.label}
          </button>
        ))}
      </div>

      {tab === "onboard" ? renderOnboard() : renderPortal()}
    </div>
  );
}

export default OrgPortal;


