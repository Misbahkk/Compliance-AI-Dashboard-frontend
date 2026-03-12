import { C, font } from '../styles/designTokens';
import { FLOW, ISSUES } from '../data/dummyData';
import Chip from '../components/Chip';
import Btn from '../components/Btn';
import GlassCard from '../components/GlassCard';
import SeverityBadge from '../components/SeverityBadge';
import Counter from '../components/Counter';
import Gauge from '../components/Gauge';
import FlowNode from '../components/FlowNode';
import { Brain, BookOpen, Edit3, Thermometer, Lock, BarChart3, RotateCcw, Clock, AlertCircle, TrendingUp, FileText, Circle } from 'lucide-react';

function LandingPage({ setPage }) {
  const features = [
    { icon: Brain, title:"LLM-Powered Analysis", desc:"Enterprise-grade language model maps every claim against ABPI Code clauses, surfacing risks human eyes miss.", color:C.teal },
    { icon: BookOpen, title:"PMCPA Case Intelligence", desc:"Every flag is contextualised by relevant historical rulings from the full PMCPA case library.", color:C.purple },
    { icon: Edit3, title:"3 Compliant Alternatives", desc:"Each issue comes with three LLM-generated rewrites that preserve intent while achieving full compliance.", color:C.amber },
    { icon: Thermometer, title:"RAG Compliance Score", desc:"An overall compliance temperature check gives reviewers an instant measure of submission readiness.", color:C.green },
    { icon: Lock, title:"Zero Data Retention", desc:"Documents never leave your secure enterprise boundary. TLS 1.3 in transit, AES-256 at rest.", color:C.indigo },
    { icon: BarChart3, title:"Audit Trail", desc:"Every query and output logged with identity and timestamp — GDPR-ready governance by default.", color:C.red },
  ];
  const stats = [
    { val:80, suf:"%", label:"Faster review cycles",       pre:"Up to " },
    { val:40, suf:"%", label:"Reduction in PMCPA risk",    pre:"Up to " },
    { val:312, suf:"+", label:"PMCPA cases indexed",       pre:"" },
    { val:3,  suf:"x",  label:"First-pass success rate",   pre:"" },
  ];
  return (
    <div style={{ background:C.navy, color:C.white, fontFamily:font.body, overflowX:"hidden" }}>

      {/* HERO */}
      <section style={{ minHeight:"100vh", display:"flex", flexDirection:"column",
        alignItems:"center", justifyContent:"center", textAlign:"center",
        padding:"120px 24px 80px", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:"20%", left:"50%", transform:"translateX(-50%)",
          width:600, height:600, background:`radial-gradient(circle, ${C.teal}18 0%, transparent 70%)`,
          pointerEvents:"none" }} />
        <div style={{ position:"absolute", bottom:"10%", left:"10%",
          width:300, height:300, background:`radial-gradient(circle, ${C.purple}12 0%, transparent 70%)`,
          pointerEvents:"none" }} />

        <Chip color={C.teal} bg={`${C.teal}15`}>ABPI COMPLIANCE · PRE-REVIEW INTELLIGENCE</Chip>

        <h1 style={{ fontFamily:font.display, fontSize:"clamp(36px,6vw,72px)", fontWeight:700,
          lineHeight:1.1, margin:"24px 0 20px", maxWidth:800,
          background:`linear-gradient(135deg, ${C.white} 40%, ${C.teal})`,
          WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
          Compliance Starts Before the Review Room
        </h1>
        <p style={{ fontSize:18, color:C.slateLight, maxWidth:580, lineHeight:1.7, margin:"0 0 40px" }}>
          ReviewReady catches ABPI Code issues before they reach your Medical team — reducing review cycles, protecting your brand, and accelerating time to market.
        </p>
        <div style={{ display:"flex", gap:14, flexWrap:"wrap", justifyContent:"center" }}>
          <Btn size="lg" onClick={() => setPage("app")}>Try the App →</Btn>
          <Btn size="lg" variant="ghost" onClick={() => setPage("onboard")}>Explore Portals</Btn>
        </div>

        {/* Mini browser preview */}
        <div style={{ marginTop:64, width:"100%", maxWidth:860,
          background:`${C.navyCard}cc`, border:`1px solid ${C.border}`,
          borderRadius:20, overflow:"hidden", boxShadow:`0 32px 80px #00000060, 0 0 0 1px ${C.teal}22` }}>
          <div style={{ background:C.navyMid, padding:"12px 20px", display:"flex", alignItems:"center", gap:10 }}>
            <div style={{ display:"flex", gap:6 }}>
              {[C.red, C.amber, C.green].map(c=><div key={c} style={{ width:10, height:10, borderRadius:"50%", background:c }}/>)}
            </div>
            <div style={{ flex:1, background:C.border, borderRadius:6, padding:"4px 12px", fontSize:11, color:C.slate, fontFamily:font.mono }}>
              https://reviewready.app/compliance
            </div>
          </div>
          <div style={{ padding:"28px 32px", display:"flex", gap:20 }}>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:13, color:C.slate, marginBottom:8, display:"flex", alignItems:"center", gap:6 }}>
                <FileText size={14} color={C.slate} /> Draft_Promotional_v3.docx
              </div>
              {ISSUES.slice(0,2).map(iss => (
                <div key={iss.id} style={{ background:C.navyLight, borderRadius:12, padding:"14px 16px", marginBottom:10,
                  border:`1px solid ${iss.sev==="HIGH"?C.red:C.amber}44`, display:"flex", gap:12, alignItems:"flex-start" }}>
                  <Circle size={16} fill={iss.sev==="HIGH"?C.red:C.amber} color={iss.sev==="HIGH"?C.red:C.amber} />
                  <div>
                    <div style={{ display:"flex", gap:8, marginBottom:4 }}>
                      <SeverityBadge sev={iss.sev} />
                      <Chip color={C.slate}>{iss.clause}</Chip>
                    </div>
                    <div style={{ fontSize:12, color:C.slateLight, fontStyle:"italic" }}>"{iss.text}"</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ width:160, display:"flex", flexDirection:"column", alignItems:"center" }}>
              <Gauge score={54} />
              <div style={{ marginTop:16, width:"100%", fontSize:12 }}>
                {[["Issues",3],["PMCPA",2],["Alts",9]].map(([k,v])=>(
                  <div key={k} style={{ display:"flex", justifyContent:"space-between",
                    borderBottom:`1px solid ${C.border}`, padding:"6px 0", color:C.slate }}>
                    <span>{k}</span><span style={{ color:C.white, fontWeight:700 }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ padding:"80px 24px", borderTop:`1px solid ${C.border}`, background:C.navyMid }}>
        <div style={{ maxWidth:1000, margin:"0 auto", display:"grid",
          gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:32 }}>
          {stats.map(s => (
            <div key={s.label} style={{ textAlign:"center" }}>
              <div style={{ fontFamily:font.display, fontSize:52, fontWeight:700,
                background:`linear-gradient(135deg, ${C.teal}, ${C.green})`,
                WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
                <Counter to={s.val} suffix={s.suf} prefix={s.pre} />
              </div>
              <div style={{ color:C.slate, fontSize:14, marginTop:8 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PROBLEM */}
      <section style={{ padding:"100px 24px" }}>
        <div style={{ maxWidth:1000, margin:"0 auto" }}>
          <Chip color={C.red}>THE PROBLEM</Chip>
          <h2 style={{ fontFamily:font.display, fontSize:"clamp(28px,4vw,48px)", fontWeight:700,
            margin:"20px 0 16px", maxWidth:640 }}>
            Compliance is Being Treated as a Downstream Problem
          </h2>
          <p style={{ color:C.slateLight, fontSize:16, maxWidth:600, lineHeight:1.7, marginBottom:48 }}>
            Content enters formal review without ABPI principles applied at creation. Medical teams spend time correcting preventable errors instead of exercising strategic judgement.
          </p>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, maxWidth:760 }}>
            {[
              { icon: RotateCcw, title:"Repeated review cycles", desc:"The same avoidable errors appear submission after submission" },
              { icon: Clock, title:"Delayed time to market", desc:"Every extra review cycle costs days — sometimes weeks" },
              { icon: TrendingUp, title:"Overburdened Medical teams", desc:"Expert capacity wasted on fixable basic compliance corrections" },
              { icon: AlertCircle, title:"Growing PMCPA exposure", desc:"Digital content now drives the majority of PMCPA complaints" },
            ].map(p => {
              const IconComponent = p.icon;
              return (
                <GlassCard key={p.title} style={{ padding:"20px 22px", display:"flex", gap:14 }}>
                  <IconComponent size={24} color={C.teal} strokeWidth={2} />
                  <div>
                    <div style={{ fontWeight:700, color:C.white, fontSize:14, marginBottom:4 }}>{p.title}</div>
                    <div style={{ color:C.slate, fontSize:13 }}>{p.desc}</div>
                  </div>
                </GlassCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ padding:"100px 24px", background:C.navyMid, borderTop:`1px solid ${C.border}` }}>
        <div style={{ maxWidth:1100, margin:"0 auto", textAlign:"center" }}>
          <Chip color={C.teal}>CAPABILITIES</Chip>
          <h2 style={{ fontFamily:font.display, fontSize:"clamp(28px,4vw,48px)", fontWeight:700, margin:"20px 0 16px" }}>
            Everything You Need Before Formal Review
          </h2>
          <p style={{ color:C.slateLight, fontSize:16, maxWidth:540, margin:"0 auto 56px" }}>
            ReviewReady acts as a first-line compliance copilot — not a replacement for Medical expertise.
          </p>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:20, textAlign:"left" }}>
            {features.map(f => {
              const IconComponent = f.icon;
              return (
                <GlassCard key={f.title} glow={f.color} style={{ padding:"28px 26px" }}>
                  <div style={{ width:46, height:46, borderRadius:14, background:`${f.color}22`,
                    border:`2px solid ${f.color}44`, display:"flex", alignItems:"center",
                    justifyContent:"center", marginBottom:18 }}>
                    <IconComponent size={24} color={f.color} strokeWidth={2} />
                  </div>
                  <div style={{ fontWeight:700, fontSize:16, color:C.white, marginBottom:8 }}>{f.title}</div>
                  <div style={{ color:C.slateLight, fontSize:13, lineHeight:1.65 }}>{f.desc}</div>
                </GlassCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ padding:"100px 24px" }}>
        <div style={{ maxWidth:1100, margin:"0 auto", textAlign:"center" }}>
          <Chip color={C.purple}>HOW IT WORKS</Chip>
          <h2 style={{ fontFamily:font.display, fontSize:"clamp(28px,4vw,48px)", fontWeight:700, margin:"20px 0 56px" }}>
            Seven Steps to Submission-Ready Content
          </h2>
          <div style={{ display:"flex", gap:8, alignItems:"flex-start", justifyContent:"center", flexWrap:"wrap" }}>
            {FLOW.map((s,i) => (
              <div key={s.id} style={{ display:"flex", alignItems:"center", gap:8 }}>
                <FlowNode {...s} />
                {i < FLOW.length-1 && (
                  <div style={{ color:C.border, fontSize:22, marginBottom:28 }}>→</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding:"100px 24px", background:`linear-gradient(135deg, ${C.navyCard}, ${C.navyMid})`,
        borderTop:`1px solid ${C.border}`, textAlign:"center" }}>
        <h2 style={{ fontFamily:font.display, fontSize:"clamp(28px,4vw,52px)", fontWeight:700,
          margin:"0 0 20px", background:`linear-gradient(135deg, ${C.white} 50%, ${C.teal})`,
          WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
          Ready to Transform Your Review Process?
        </h2>
        <p style={{ color:C.slateLight, fontSize:17, maxWidth:500, margin:"0 auto 40px" }}>
          Join leading pharma organisations using ReviewReady to deploy compliant content faster.
        </p>
        <div style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap" }}>
          <Btn size="lg" onClick={() => setPage("onboard")}>Start Onboarding →</Btn>
          <Btn size="lg" variant="ghost" onClick={() => setPage("app")}>See the App</Btn>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
