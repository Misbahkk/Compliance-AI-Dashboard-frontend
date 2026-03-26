import { useState, useRef } from 'react';
import { C, font } from '../styles/designTokens';

import Chip from '../components/Chip';
import Btn from '../components/Btn';
import GlassCard from '../components/GlassCard';
import SeverityBadge from '../components/SeverityBadge';
import Gauge from '../components/Gauge';
import * as LucideIcons from 'lucide-react';
import { Brain, Lock, Upload, FileText, Flag, CheckCircle, Circle, BookOpen, ArrowLeft, Download, Send, AlertTriangle, BarChart3, Pencil, Loader2 } from 'lucide-react';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

function ComplianceApp() {
  const [screen, setScreen] = useState("upload");
  const [file, setFile] = useState(null);
  const [analysing, setAnalysing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selected, setSelected] = useState(null);
  const [altPick, setAltPick] = useState({});
  const [view, setView] = useState("document");
  const [hovPara, setHovPara] = useState(null);
  const [panelIssue, setPanelIssue] = useState(null);
  const [error, setError] = useState(null);
  const [downloadingPdf, setDownloadingPdf] = useState(false);
  
  // API response data
  const [analysisData, setAnalysisData] = useState(null);
  const fileInputRef = useRef(null);

  // Derived data from API response
  const ISSUES = analysisData?.issues || [];
  const DOC_SECTIONS = analysisData?.doc_sections || [];
  const ISSUE_MAP = analysisData?.issue_map || {};
  const scoreData = analysisData?.score || {};

  const stepLabels = ["Extracting content","Tokenising","Mapping to ABPI clauses",
    "Scoring issues","Generating alternatives","PMCPA matching","Building report"];
  const [stepIdx, setStepIdx] = useState(0);

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const ext = selectedFile.name.split('.').pop().toLowerCase();
      if (['pdf', 'docx'].includes(ext)) {
        setFile(selectedFile);
        setError(null);
      } else {
        setError('Please select a PDF or DOCX file');
      }
    }
  };

  const runAnalysis = async () => {
    if (!file) return;
    setAnalysing(true); 
    setProgress(0); 
    setStepIdx(0);
    setError(null);

    // Start progress animation
    let p = 0;
    const iv = setInterval(() => {
      p += 1;
      const s = Math.floor((p/100)*(stepLabels.length));
      setProgress(Math.min(p, 95));
      setStepIdx(Math.min(s, stepLabels.length-1));
      if (p >= 95) clearInterval(iv);
    }, 100);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(`${API_BASE_URL}/api/analyze`, {
        method: 'POST',
        body: formData,
      });

      clearInterval(iv);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Analysis failed');
      }

      const data = await response.json();
      setAnalysisData(data);
      setProgress(100);
      setStepIdx(stepLabels.length - 1);
      
      setTimeout(() => {
        setAnalysing(false);
        setScreen("dashboard");
      }, 400);

    } catch (err) {
      clearInterval(iv);
      setAnalysing(false);
      setError(err.message || 'Failed to analyze document. Please try again.');
      console.error('Analysis error:', err);
    }
  };

  const downloadPdfReport = async () => {
    if (!file || downloadingPdf) return;
    setDownloadingPdf(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(`${API_BASE_URL}/api/analyze/pdf`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('PDF generation failed');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `compliance_report_${new Date().toISOString().slice(0,10)}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

    } catch (err) {
      setError('Failed to download PDF report');
      console.error('PDF download error:', err);
    } finally {
      setDownloadingPdf(false);
    }
  };

  const resetUpload = () => {
    setScreen("upload");
    setFile(null);
    setAnalysisData(null);
    setError(null);
    setPanelIssue(null);
    setSelected(null);
    setAltPick({});
  };

  /* ── Upload ── */
  if (analysing) return (
    <div style={{ minHeight:"100vh", background:C.navy, display:"flex", alignItems:"center",
      justifyContent:"center", flexDirection:"column", gap:32, paddingTop:60 }}>
      <div style={{ position:"relative", width:100, height:100 }}>
        <svg width={100} height={100} viewBox="0 0 100 100" style={{ position:"absolute", inset:0 }}>
          <circle cx={50} cy={50} r={44} fill="none" stroke={C.border} strokeWidth={8} />
          <circle cx={50} cy={50} r={44} fill="none" stroke={C.teal} strokeWidth={8} strokeLinecap="round"
            strokeDasharray={276} strokeDashoffset={276-(progress/100)*276}
            style={{ transform:"rotate(-90deg)", transformOrigin:"50% 50%", transition:"stroke-dashoffset 0.1s" }} />
        </svg>
        <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center",
          justifyContent:"center", fontSize:28 }}><Brain size={40} color={C.teal} strokeWidth={2} /></div>
          
      </div>
      <div style={{ textAlign:"center" }}>
        <div style={{ fontWeight:800, fontSize:22, color:C.white, marginBottom:8 }}>Analysing Your Document</div>
        <div style={{ color:C.teal, fontSize:14, fontFamily:font.mono }}>{stepLabels[stepIdx]}...</div>
      </div>
      <div style={{ width:420, background:C.navyCard, borderRadius:16, padding:"20px 24px",
        border:`1px solid ${C.border}` }}>
        {stepLabels.map((l,i) => (
          <div key={l} style={{ display:"flex", alignItems:"center", gap:12, padding:"7px 0",
            borderBottom: i<stepLabels.length-1 ? `1px solid ${C.border}` : "none",
            opacity: i > stepIdx ? 0.3 : 1, transition:"opacity 0.3s" }}>
            <span style={{ color: i<stepIdx ? C.green : i===stepIdx ? C.teal : C.slate }}>
              {i<stepIdx ? <CheckCircle size={13} /> : i===stepIdx ? <Brain size={13} /> : <Circle size={13} />}
            </span>
            <span style={{ fontSize:12, color: i===stepIdx ? C.white : C.slateLight,
              fontFamily:font.mono }}>{l}</span>
          </div>
        ))}
      </div>
    </div>
  );

  if (screen === "upload") return (
    <div style={{ minHeight:"100vh", background:C.navy, paddingTop:80, display:"flex",
      alignItems:"center", justifyContent:"center" }}>
      <div style={{ width:"100%", maxWidth:640, padding:32 }}>
        <GlassCard style={{ padding:40 }}>
          <div style={{ marginBottom:32 }}>
            <Chip color={C.teal}>STEP 1 OF 3</Chip>
            <h2 style={{ fontFamily:font.display, fontSize:28, fontWeight:700, color:C.white,
              margin:"14px 0 8px" }}>Upload for Compliance Review</h2>
            <p style={{ color:C.slate, fontSize:14, lineHeight:1.6 }}>
              Upload your draft promotional or medical material. ReviewReady analyses it against ABPI Code clauses before it reaches formal review.
            </p>
          </div>

          {/* Hidden file input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            accept=".pdf,.docx"
            style={{ display: 'none' }}
          />

          {/* Drop zone */}
          <div 
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
            onDrop={(e) => {
              e.preventDefault();
              e.stopPropagation();
              const droppedFile = e.dataTransfer.files?.[0];
              if (droppedFile) {
                const ext = droppedFile.name.split('.').pop().toLowerCase();
                if (['pdf', 'docx'].includes(ext)) {
                  setFile(droppedFile);
                  setError(null);
                } else {
                  setError('Please select a PDF or DOCX file');
                }
              }
            }}
            style={{ border:`2px dashed ${file ? C.green : C.border}`,
              borderRadius:16, padding:"44px 32px", textAlign:"center", cursor:"pointer",
              background: file ? `${C.green}08` : `${C.navyLight}40`,
              transition:"all 0.2s", marginBottom:24 }}>
            <div style={{ marginBottom:12 }}>
              {file ? <FileText size={40} color={C.green} strokeWidth={1.5} /> : <Upload size={40} color={C.teal} strokeWidth={1.5} />}
            </div>
            {file ? (
              <>
                <div style={{ fontWeight:700, color:C.white, fontSize:15 }}>{file.name}</div>
                <div style={{ color:C.slate, fontSize:13, marginTop:4 }}>
                  {(file.size / 1024).toFixed(1)} KB · {file.name.split('.').pop().toUpperCase()}
                </div>
                <div style={{ color:C.green, fontSize:13, marginTop:10, fontWeight:600 }}>✓ Ready for analysis</div>
              </>
            ) : (
              <>
                <div style={{ fontWeight:700, color:C.white, fontSize:16 }}>Drop your document here</div>
                <div style={{ color:C.slate, fontSize:13, marginTop:6 }}>or click to browse · PDF, DOCX supported</div>
              </>
            )}
          </div>

          {/* Error message */}
          {error && (
            <div style={{ background:`${C.red}15`, border:`1px solid ${C.red}33`,
              borderRadius:12, padding:"12px 16px", marginBottom:24,
              display:"flex", gap:10, alignItems:"center" }}>
              <AlertTriangle size={18} color={C.red} />
              <div style={{ color:C.red, fontSize:13 }}>{error}</div>
            </div>
          )}

          {/* Security notice */}
          <div style={{ background:`${C.indigo}15`, border:`1px solid ${C.indigo}33`,
            borderRadius:12, padding:"14px 18px", marginBottom:24,
            display:"flex", gap:12, alignItems:"flex-start" }}>
            <Lock size={20} color={C.indigo} strokeWidth={2} />
            <div>
              <div style={{ fontWeight:700, color:C.indigo, fontSize:13 }}>Enterprise Secure · Zero Retention</div>
              <div style={{ color:"#A5B4FC", fontSize:12, marginTop:3, lineHeight:1.5 }}>
                Processed within a closed enterprise LLM environment. TLS 1.3 in transit, AES-256 at rest. Data never used to train models.
              </div>
            </div>
          </div>

          <Btn style={{ width:"100%" }} onClick={runAnalysis}>
            {file ? "Run Compliance Analysis →" : "Select a file to begin"}
          </Btn>
        </GlassCard>
      </div>
    </div>
  );

  /* ── Dashboard ── */
  if (screen === "dashboard" && !selected) return (
    <div style={{ minHeight:"100vh", background:C.navy, paddingTop:76 }}>
      <div style={{ maxWidth:1080, margin:"0 auto", padding:32 }}>
        {/* Header row */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:28 }}>
          <div>
            <Chip color={C.green}>ANALYSIS COMPLETE</Chip>
            <h2 style={{ fontFamily:font.display, fontSize:24, fontWeight:700, color:C.white, margin:"10px 0 4px" }}>
              Compliance Dashboard
            </h2>
            <div style={{ color:C.slate, fontSize:13 }}>{analysisData?.document_name || file?.name} · Analysed just now</div>
          </div>
          <div style={{ display:"flex", gap:10 }}>
            {[
              ["document", <><FileText size={14} style={{marginRight:6}} /> Document</>],
              ["issues", <><Flag size={14} style={{marginRight:6}} /> Issues</>],
              ["report", <><BarChart3 size={14} style={{marginRight:6}} /> Report</>]
            ].map(([v,lbl]) => (
              <Btn key={v} variant={view===v?"primary":"dark"} onClick={() => setView(v)}>{lbl}</Btn>
            ))}
            <Btn variant="ghost" onClick={resetUpload}><Upload size={14} style={{marginRight:6}} /> New Upload</Btn>
          </div>
        </div>

        {/* Stats row */}
        <div style={{ display:"grid", gridTemplateColumns:"auto 1fr", gap:20, marginBottom:24 }}>
          <GlassCard style={{ padding:"24px 28px", display:"flex", alignItems:"center" }}>
            <Gauge score={scoreData.overall_score || 0} />
          </GlassCard>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16 }}>
            {[
              { icon: Flag, val:scoreData.total_issues || 0, label:"Total Issues",      col:C.teal, fill:false },
              { icon: Circle, val:scoreData.high_risk || 0,    label:"High Risk",          col:C.red, fill:true  },
              { icon: Circle, val:scoreData.moderate_risk || 0, label:"Moderate Risk",      col:C.amber, fill:true },
              { icon: Circle, val:scoreData.low_risk || 0,     label:"Low Risk",           col:C.green, fill:true },
              { icon: BookOpen, val:scoreData.pmcpa_cases || 0, label:"PMCPA Cases",        col:C.purple, fill:false },
              { icon: FileText, val:scoreData.alternatives_ready || 0, label:"Alternatives Ready", col:C.indigo, fill:false },
            ].map(s => {
              const IconComponent = s.icon;
              return (
                <GlassCard key={s.label} style={{ padding:"18px 20px" }}>
                  <div style={{ marginBottom:6 }}><IconComponent size={20} color={s.col} fill={s.fill ? s.col : "none"} strokeWidth={2} /></div>
                  <div style={{ fontSize:26, fontWeight:800, color:s.col, fontFamily:font.display }}>{s.val}</div>
                  <div style={{ fontSize:12, color:C.slate, marginTop:3 }}>{s.label}</div>
                </GlassCard>
              );
            })}
          </div>
        </div>

        {view === "document" ? (
          /* ── DOCUMENT BREAKDOWN VIEW ── */
          <div style={{ display:"grid", gridTemplateColumns:"1fr 380px", gap:20, alignItems:"start" }}>

            {/* Left: annotated document */}
            <GlassCard>
              <div style={{ padding:"16px 24px", borderBottom:`1px solid ${C.border}`,
                display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <div>
                  <div style={{ fontWeight:700, color:C.white, fontSize:15 }}>Document Breakdown</div>
                  <div style={{ fontSize:12, color:C.slate, marginTop:2 }}>
                    Click any highlighted text to inspect the compliance issue
                  </div>
                </div>
                <div style={{ display:"flex", gap:8, alignItems:"center" }}>
                  <span style={{ fontSize:11, color:C.red }}>● High</span>
                  <span style={{ fontSize:11, color:C.amber }}>● Moderate</span>
                  <span style={{ fontSize:11, color:C.green }}>● Low</span>
                </div>
              </div>

              <div style={{ padding:"24px 28px" }}>
                {DOC_SECTIONS.map((sec, si) => {
                  const sectionHasIssues = sec.content.some(p => p.issues.length > 0);
                  return (
                    <div key={sec.id} style={{ marginBottom:28 }}>
                      {/* Section header */}
                      <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:14,
                        padding:"10px 14px", borderRadius:10,
                        background: sectionHasIssues
                          ? `linear-gradient(90deg, ${C.red}12, ${C.navyLight}44)`
                          : `${C.navyLight}33`,
                        border:`1px solid ${sectionHasIssues ? C.red+"44" : C.border}` }}>
                        {(() => {
                          const SectionIcon = LucideIcons[sec.icon];
                          return SectionIcon ? <SectionIcon size={18} color={C.teal} strokeWidth={2} /> : null;
                        })()}
                        <div style={{ flex:1 }}>
                          <div style={{ fontSize:11, color:C.slate, fontWeight:700, letterSpacing:"0.08em" }}>
                            {sec.label.toUpperCase()}
                          </div>
                          <div style={{ fontSize:14, fontWeight:700, color:C.white }}>{sec.title}</div>
                        </div>
                        {sectionHasIssues ? (
                          <div style={{ display:"flex", gap:6, alignItems:"center" }}>
                            {sec.content.filter(p=>p.issues.length>0).map(p =>
                              p.issues.map(iid => {
                                const iss = ISSUE_MAP[iid];
                                return iss ? <SeverityBadge key={iid} sev={iss.sev} /> : null;
                              })
                            )}
                          </div>
                        ) : (
                          <Chip color={C.green}>✓ Clean</Chip>
                        )}
                      </div>

                      {/* Paragraphs */}
                      {sec.content.map(para => {
                        const hasIssue = para.issues.length > 0;
                        const issObj = hasIssue ? ISSUE_MAP[para.issues[0]] : null;
                        const sevColor = issObj ? (issObj.sev==="HIGH" ? C.red : issObj.sev==="MED" ? C.amber : C.green) : C.teal;
                        const isHov = hovPara === para.id;
                        const isPanel = panelIssue && para.issues.includes(panelIssue.id);

                        /* Render paragraph with highlighted phrase */
                        const renderText = () => {
                          if (!hasIssue || !para.highlight) {
                            return <span style={{ color:C.slateLight }}>{para.text}</span>;
                          }
                          const idx = para.text.indexOf(para.highlight);
                          if (idx === -1) return <span style={{ color:C.slateLight }}>{para.text}</span>;
                          const before = para.text.slice(0, idx);
                          const match  = para.text.slice(idx, idx + para.highlight.length);
                          const after  = para.text.slice(idx + para.highlight.length);
                          return (
                            <span style={{ color:C.slateLight }}>
                              {before}
                              <mark style={{
                                background: isHov||isPanel ? `${sevColor}44` : `${sevColor}28`,
                                color: C.white,
                                borderRadius:4,
                                padding:"1px 4px",
                                border:`1px solid ${sevColor}66`,
                                cursor:"pointer",
                                transition:"all 0.2s",
                                fontWeight:600,
                                boxShadow: isHov||isPanel ? `0 0 12px ${sevColor}55` : "none",
                              }}>{match}</mark>
                              {after}
                            </span>
                          );
                        };

                        return (
                          <div key={para.id}
                            onClick={() => hasIssue && setPanelIssue(ISSUE_MAP[para.issues[0]])}
                            onMouseEnter={() => setHovPara(para.id)}
                            onMouseLeave={() => setHovPara(null)}
                            style={{
                              position:"relative",
                              padding:"12px 14px 12px 18px",
                              borderRadius:10,
                              marginBottom:8,
                              fontSize:14,
                              lineHeight:1.75,
                              cursor: hasIssue ? "pointer" : "default",
                              background: isPanel
                                ? `${sevColor}10`
                                : isHov && hasIssue
                                  ? `${C.navyLight}88`
                                  : "transparent",
                              borderLeft: hasIssue
                                ? `3px solid ${isPanel||isHov ? sevColor : sevColor+"66"}`
                                : `3px solid transparent`,
                              transition:"all 0.2s",
                            }}>
                            {/* Issue flag badge */}
                            {hasIssue && (
                              <div style={{
                                position:"absolute", right:12, top:12,
                                background:`${sevColor}22`, border:`1px solid ${sevColor}55`,
                                borderRadius:8, padding:"3px 8px",
                                fontSize:10, fontWeight:700, color:sevColor,
                                display:"flex", alignItems:"center", gap:4,
                              }}>
                                <Circle size={10} fill={sevColor} color={sevColor} />
                                {issObj?.clause}
                              </div>
                            )}
                            <div style={{ paddingRight: hasIssue ? 90 : 0 }}>
                              {renderText()}
                            </div>
                            {hasIssue && (isHov || isPanel) && (
                              <div style={{ marginTop:8, fontSize:12, color:sevColor, fontWeight:600 }}>
                                ↗ Click to see issue details and alternatives
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </GlassCard>

            {/* Right: Issue panel */}
            <div style={{ position:"sticky", top:80 }}>
              {panelIssue ? (
                <div>
                  {/* Issue detail panel */}
                  <GlassCard glow={panelIssue.sev==="HIGH"?C.red:panelIssue.sev==="MED"?C.amber:C.green}
                    style={{ padding:24, marginBottom:16 }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:14 }}>
                      <SeverityBadge sev={panelIssue.sev} />
                      <button onClick={() => setPanelIssue(null)}
                        style={{ background:"none", border:"none", color:C.slate, cursor:"pointer",
                          fontSize:18, lineHeight:1, padding:0 }}>✕</button>
                    </div>
                    <Chip color={C.indigo} style={{ marginBottom:12 }}>{panelIssue.clause}</Chip>
                    <div style={{ fontSize:13, color:C.white, fontWeight:700, fontStyle:"italic",
                      margin:"10px 0 14px", lineHeight:1.6 }}>
                      "{panelIssue.text}"
                    </div>

                    {/* Why flagged */}
                    <div style={{ background:`${C.amber}12`, border:`1px solid ${C.amber}33`,
                      borderRadius:10, padding:"12px 14px", borderLeft:`3px solid ${C.amber}`,
                      marginBottom:16 }}>
                      <div style={{ fontSize:10, fontWeight:700, color:C.amber, letterSpacing:"0.08em", marginBottom:4 }}>
                        WHY THIS IS FLAGGED
                      </div>
                      <div style={{ fontSize:12, color:C.slateLight, lineHeight:1.65 }}>
                        {panelIssue.reason}
                      </div>
                    </div>

                    {/* ABPI reference */}
                    <div style={{ background:`${C.indigo}12`, border:`1px solid ${C.indigo}33`,
                      borderRadius:10, padding:"12px 14px", marginBottom:16 }}>
                      <div style={{ fontSize:10, fontWeight:700, color:C.indigo, letterSpacing:"0.08em", marginBottom:4 }}>
                        ABPI CODE REFERENCE
                      </div>
                      <div style={{ fontSize:12, color:"#A5B4FC", lineHeight:1.65 }}>
                        {panelIssue.clause === "Clause 6.1"
                          ? "Clause 6.1 — Claims must be capable of substantiation. Comparative claims must be based on relevant data and must not mislead."
                          : panelIssue.clause === "Clause 7.2"
                          ? "Clause 7.2 — Information must be presented accurately. Absolute descriptors such as 'all patients' must be supported by evidence."
                          : "Clause 4.1 — Materials must reflect the licensed indication accurately and not describe uses broader than those in the SmPC."}
                      </div>
                    </div>

                    {panelIssue.pmcpa && (
                      <div style={{ background:`${C.purple}12`, border:`1px solid ${C.purple}33`,
                        borderRadius:10, padding:"12px 14px", marginBottom:16 }}>
                        <div style={{ fontSize:10, fontWeight:700, color:C.purple, letterSpacing:"0.08em", marginBottom:4, display:"flex", alignItems:"center", gap:6 }}>
                          <BookOpen size={12} /> MATCHED PMCPA CASE
                        </div>
                        <div style={{ fontSize:12, color:"#C4B5FD", fontWeight:700 }}>{panelIssue.pmcpa}</div>
                        <div style={{ fontSize:11, color:C.slate, marginTop:4 }}>Tap to view full ruling</div>
                      </div>
                    )}
                  </GlassCard>

                  {/* Alternatives panel */}
                  <GlassCard style={{ padding:24 }}>
                    <div style={{ fontWeight:700, color:C.white, fontSize:14, marginBottom:4, display:"flex", alignItems:"center", gap:6 }}>
                      <Pencil size={14} /> Compliant Alternatives
                    </div>
                    <div style={{ fontSize:11, color:C.slate, marginBottom:16 }}>
                      Select one to replace the flagged text
                    </div>
                    {panelIssue.alts.map((alt, i) => (
                      <div key={i}
                        onClick={() => setAltPick({...altPick, [panelIssue.id]:i})}
                        style={{ border:`2px solid ${altPick[panelIssue.id]===i ? C.teal : C.border}`,
                          borderRadius:12, padding:"14px 16px", marginBottom:10, cursor:"pointer",
                          background: altPick[panelIssue.id]===i ? `${C.teal}12` : `${C.navyLight}44`,
                          transition:"all 0.2s", display:"flex", gap:12 }}>
                        <div style={{ width:24, height:24, borderRadius:"50%", flexShrink:0,
                          background: altPick[panelIssue.id]===i ? C.teal : C.border,
                          color: altPick[panelIssue.id]===i ? C.navy : C.slate,
                          display:"flex", alignItems:"center", justifyContent:"center",
                          fontSize:11, fontWeight:800 }}>{i+1}</div>
                        <div style={{ fontSize:12, color:C.slateLight, lineHeight:1.65 }}>{alt}</div>
                      </div>
                    ))}
                    {altPick[panelIssue.id] !== undefined && (
                      <Btn style={{ width:"100%", marginTop:4 }}>
                        <CheckCircle size={14} style={{marginRight:6}} /> Apply Alternative {altPick[panelIssue.id]+1}
                      </Btn>
                    )}
                  </GlassCard>
                </div>
              ) : (
                /* Default side panel — issue summary */
                <div>
                  <GlassCard style={{ padding:24, marginBottom:16 }}>
                    <div style={{ fontWeight:700, color:C.white, fontSize:14, marginBottom:16 }}>
                      Issue Map
                    </div>
                    <div style={{ fontSize:12, color:C.slate, marginBottom:16 }}>
                      Click any highlighted text in the document to inspect the issue in detail.
                    </div>

                    {/* Visual section map */}
                    {DOC_SECTIONS.map((sec, si) => {
                      const secIssues = sec.content.flatMap(p => p.issues.map(id => ISSUE_MAP[id])).filter(Boolean);
                      return (
                        <div key={sec.id} style={{ marginBottom:12,
                          padding:"12px 14px", borderRadius:10,
                          background: secIssues.length ? `${C.navyLight}66` : `${C.navyLight}33`,
                          border:`1px solid ${secIssues.length ? C.border : C.border+"66"}`,
                          display:"flex", alignItems:"center", gap:10 }}>
                          <span style={{ fontSize:16 }}>{sec.icon}</span>
                          <div style={{ flex:1, minWidth:0 }}>
                            <div style={{ fontSize:12, fontWeight:700, color:secIssues.length ? C.white : C.slate }}>
                              {sec.title}
                            </div>
                            {secIssues.length > 0 && (
                              <div style={{ display:"flex", gap:4, marginTop:4, flexWrap:"wrap" }}>
                                {secIssues.map(iss => (
                                  <span key={iss.id} style={{ fontSize:10,
                                    color: iss.sev==="HIGH" ? C.red : iss.sev==="MED" ? C.amber : C.green }}>
                                    ● {iss.clause}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                          {secIssues.length ? (
                            <div style={{ fontSize:14, fontWeight:800,
                              color: secIssues.some(i=>i.sev==="HIGH") ? C.red : C.amber }}>
                              {secIssues.length}
                            </div>
                          ) : (
                            <span style={{ color:C.green, fontSize:14 }}>✓</span>
                          )}
                        </div>
                      )})
                    }
                  </GlassCard>

                  <GlassCard style={{ padding:24 }}>
                    <div style={{ fontWeight:700, color:C.white, fontSize:14, marginBottom:14 }}>
                      All Flags At A Glance
                    </div>
                    {ISSUES.map(iss => (
                      <div key={iss.id}
                        onClick={() => setPanelIssue(iss)}
                        style={{ padding:"12px 14px", borderRadius:10, marginBottom:8, cursor:"pointer",
                          border:`1px solid ${iss.sev==="HIGH"?C.red:iss.sev==="MED"?C.amber:C.green}44`,
                          background:`${iss.sev==="HIGH"?C.red:iss.sev==="MED"?C.amber:C.green}0D`,
                          transition:"all 0.15s" }}
                        onMouseEnter={e=>e.currentTarget.style.opacity="0.85"}
                        onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
                        <div style={{ display:"flex", gap:8, alignItems:"center", marginBottom:6 }}>
                          <SeverityBadge sev={iss.sev} />
                          <Chip color={C.indigo}>{iss.clause}</Chip>
                        </div>
                        <div style={{ fontSize:12, color:C.slateLight, fontStyle:"italic",
                          lineHeight:1.5 }}>"{iss.text.slice(0,55)}..."</div>
                        <div style={{ fontSize:11, color:C.teal, marginTop:6, fontWeight:600 }}>
                          Click to inspect →
                        </div>
                      </div>
                    ))}
                  </GlassCard>
                </div>
              )}
            </div>
          </div>

        ) : view === "issues" ? (
          /* Issues list */
          <GlassCard>
            <div style={{ padding:"16px 24px", borderBottom:`1px solid ${C.border}`,
              display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <div style={{ fontWeight:700, color:C.white, fontSize:15 }}>Flagged Issues</div>
              <div style={{ fontSize:12, color:C.slate }}>Click an issue to review alternatives</div>
            </div>
            {ISSUES.map((iss,i) => (
              <div key={iss.id} onClick={() => setSelected(iss)}
                style={{ padding:"20px 24px", borderBottom: i<ISSUES.length-1 ? `1px solid ${C.border}` : "none",
                  cursor:"pointer", display:"flex", gap:16, alignItems:"flex-start",
                  transition:"background 0.15s" }}
                onMouseEnter={e => e.currentTarget.style.background = `${C.teal}08`}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                <div style={{ width:40, height:40, borderRadius:10, flexShrink:0,
                  background: iss.sev==="HIGH" ? `${C.red}22` : iss.sev==="MED" ? `${C.amber}22` : `${C.green}22`,
                  display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <AlertTriangle size={20} color={iss.sev==="HIGH" ? C.red : iss.sev==="MED" ? C.amber : C.green} strokeWidth={2} />
                </div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ display:"flex", gap:8, alignItems:"center", marginBottom:8, flexWrap:"wrap" }}>
                    <SeverityBadge sev={iss.sev} />
                    <Chip color={C.slate}>{iss.clause}</Chip>
                    {iss.pmcpa && <Chip color={C.purple}><BookOpen size={10} style={{marginRight:4}} /> PMCPA: {iss.pmcpa}</Chip>}
                  </div>
                  <div style={{ fontSize:14, color:C.white, fontWeight:600, marginBottom:6,
                    fontStyle:"italic" }}>"{iss.text}"</div>
                  <div style={{ fontSize:13, color:C.slate, lineHeight:1.5 }}>{iss.reason}</div>
                </div>
                <div style={{ color:C.teal, fontSize:20, flexShrink:0 }}>›</div>
              </div>
            ))}
          </GlassCard>
        ) : (
          /* ── REPORT VIEW ── */
          <GlassCard>
            <div style={{ padding:"24px 28px", borderBottom:`1px solid ${C.border}`,
              background:`linear-gradient(90deg, ${C.navyLight}, ${C.navyCard})`, borderRadius:"20px 20px 0 0" }}>
              <Chip color={C.teal}>COMPLIANCE SUMMARY REPORT</Chip>
              <h3 style={{ color:C.white, fontFamily:font.display, fontSize:20, margin:"10px 0 4px", fontWeight:700 }}>
                {analysisData?.document_name || file?.name}
              </h3>
              <div style={{ color:C.slate, fontSize:12 }}>
                {new Date().toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"})} · Prepared for Vodori Submission
              </div>
            </div>
            <div style={{ padding:"24px 28px" }}>
              {/* Summary Stats */}
              <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16, marginBottom:24 }}>
                <div style={{ background:`${C.navyLight}66`, borderRadius:12, padding:"16px 20px", textAlign:"center" }}>
                  <div style={{ fontSize:28, fontWeight:800, color:C.teal }}>{scoreData.overall_score || 0}%</div>
                  <div style={{ fontSize:11, color:C.slate, marginTop:4 }}>Compliance Score</div>
                </div>
                <div style={{ background:`${C.red}15`, borderRadius:12, padding:"16px 20px", textAlign:"center" }}>
                  <div style={{ fontSize:28, fontWeight:800, color:C.red }}>{scoreData.high_risk || 0}</div>
                  <div style={{ fontSize:11, color:C.slate, marginTop:4 }}>High Risk</div>
                </div>
                <div style={{ background:`${C.amber}15`, borderRadius:12, padding:"16px 20px", textAlign:"center" }}>
                  <div style={{ fontSize:28, fontWeight:800, color:C.amber }}>{scoreData.moderate_risk || 0}</div>
                  <div style={{ fontSize:11, color:C.slate, marginTop:4 }}>Moderate Risk</div>
                </div>
                <div style={{ background:`${C.green}15`, borderRadius:12, padding:"16px 20px", textAlign:"center" }}>
                  <div style={{ fontSize:28, fontWeight:800, color:C.green }}>{scoreData.low_risk || 0}</div>
                  <div style={{ fontSize:11, color:C.slate, marginTop:4 }}>Low Risk</div>
                </div>
              </div>

              <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
                <thead>
                  <tr>
                    {["#","Clause","Risk Level","Excerpt","Alternatives","PMCPA"].map(h => (
                      <th key={h} style={{ padding:"10px 14px", textAlign:"left", color:C.slate,
                        fontSize:11, fontWeight:700, letterSpacing:"0.06em",
                        borderBottom:`1px solid ${C.border}` }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ISSUES.map((iss,i) => (
                    <tr key={iss.id || i} style={{ borderBottom:`1px solid ${C.border}` }}>
                      <td style={{ padding:"14px", color:C.slate }}>{i+1}</td>
                      <td style={{ padding:"14px", color:C.indigo, fontWeight:700 }}>{iss.clause}</td>
                      <td style={{ padding:"14px" }}><SeverityBadge sev={iss.sev} /></td>
                      <td style={{ padding:"14px", color:C.slateLight, fontStyle:"italic", maxWidth:220 }}>
                        "{iss.text?.slice(0,40)}..."
                      </td>
                      <td style={{ padding:"14px" }}>
                        <Chip color={C.green}>{iss.alts?.length || 0} provided</Chip>
                      </td>
                      <td style={{ padding:"14px" }}>
                        {iss.pmcpa ? <Chip color={C.purple}>{iss.pmcpa}</Chip> : <span style={{ color:C.border }}>—</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div style={{ display:"flex", gap:12, marginTop:24 }}>
                <Btn onClick={downloadPdfReport} disabled={downloadingPdf}>
                  {downloadingPdf ? (
                    <><Loader2 size={14} style={{marginRight:6, animation:"spin 1s linear infinite"}} /> Generating...</>
                  ) : (
                    <><Download size={14} style={{marginRight:6}} /> Download PDF Report</>
                  )}
                </Btn>
                <Btn variant="dark"><Send size={14} style={{marginRight:6}} /> Submit to Vodori</Btn>
              </div>
            </div>
          </GlassCard>
        )}
      </div>
    </div>
  );

  /* ── Issue Detail ── */
  if (screen === "dashboard" && selected) return (
    <div style={{ minHeight:"100vh", background:C.navy, paddingTop:76 }}>
      <div style={{ maxWidth:860, margin:"0 auto", padding:32 }}>
        <button onClick={() => setSelected(null)} style={{ background:"none", border:"none",
          color:C.teal, fontSize:13, fontWeight:700, cursor:"pointer", marginBottom:20, padding:0,
          fontFamily:font.body, display:"flex", alignItems:"center", gap:4 }}>
          <ArrowLeft size={14} /> Back to Dashboard
        </button>

        {/* Issue card */}
        <GlassCard style={{ padding:28, marginBottom:20 }}>
          <div style={{ display:"flex", gap:10, alignItems:"center", marginBottom:14, flexWrap:"wrap" }}>
            <SeverityBadge sev={selected.sev} />
            <Chip color={C.indigo}>{selected.clause}</Chip>
          </div>
          <div style={{ fontSize:17, color:C.white, fontWeight:700, fontStyle:"italic",
            marginBottom:14, lineHeight:1.5 }}>"{selected.text}"</div>
          <div style={{ background:`${C.amber}15`, border:`1px solid ${C.amber}33`,
            borderRadius:10, padding:"14px 18px", borderLeft:`3px solid ${C.amber}` }}>
            <div style={{ fontSize:12, fontWeight:700, color:C.amber, marginBottom:4 }}>WHY THIS WAS FLAGGED</div>
            <div style={{ fontSize:13, color:C.slateLight, lineHeight:1.6 }}>{selected.reason}</div>
          </div>
        </GlassCard>

        {/* Alternatives */}
        <GlassCard style={{ padding:28, marginBottom:20 }}>
          <div style={{ fontWeight:700, color:C.white, fontSize:16, marginBottom:4 }}>3 Compliant Alternatives</div>
          <div style={{ fontSize:12, color:C.slate, marginBottom:20 }}>Select one to apply to your revised document</div>
          {selected.alts.map((alt,i) => (
            <div key={i} onClick={() => setAltPick({...altPick, [selected.id]:i})}
              style={{ border:`2px solid ${altPick[selected.id]===i ? C.teal : C.border}`,
                borderRadius:14, padding:"18px 20px", marginBottom:12, cursor:"pointer",
                background: altPick[selected.id]===i ? `${C.teal}12` : `${C.navyLight}44`,
                transition:"all 0.2s", display:"flex", gap:14 }}>
              <div style={{ width:28, height:28, borderRadius:"50%", flexShrink:0,
                background: altPick[selected.id]===i ? C.teal : C.border,
                color: altPick[selected.id]===i ? C.navy : C.slate,
                display:"flex", alignItems:"center", justifyContent:"center",
                fontSize:13, fontWeight:800 }}>{i+1}</div>
              <div style={{ fontSize:14, color:C.slateLight, lineHeight:1.65 }}>{alt}</div>
            </div>
          ))}
          {altPick[selected.id] !== undefined && (
            <Btn style={{ marginTop:6 }}>✓ Apply Alternative {altPick[selected.id]+1}</Btn>
          )}
        </GlassCard>

        {/* PMCPA */}
        {selected.pmcpa && (
          <GlassCard glow={C.purple} style={{ padding:28 }}>
            <div style={{ fontWeight:700, color:C.white, fontSize:16, marginBottom:4,
              display:"flex", alignItems:"center", gap:8 }}>
              <BookOpen size={16} color={C.purple} strokeWidth={2} /> Relevant PMCPA Case
            </div>
            <div style={{ fontSize:12, color:C.purple, marginBottom:18 }}>Historical ruling matched to this type of claim</div>
            <div style={{ background:`${C.navyLight}88`, borderRadius:12, padding:"18px 20px" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
                <span style={{ fontWeight:700, color:C.purple, fontSize:15 }}>{selected.pmcpa}</span>
              </div>
              <div style={{ fontSize:13, color:C.slateLight, lineHeight:1.65, marginBottom:12 }}>
                Company found in breach of {selected.clause} for unsubstantiated claim. No supporting head-to-head data was provided at time of complaint.
              </div>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a href="" style={{ color:C.teal, fontSize:13, fontWeight:700, textDecoration:"none" }}>View Full Case Report →</a>
            </div>
          </GlassCard>
        )}
      </div>
    </div>
  );
}

export default ComplianceApp;





