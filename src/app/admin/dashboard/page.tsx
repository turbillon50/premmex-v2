'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'

const STATS = [
  { l:'Contratos activos', v:'164', c:'#C9A84C', i:'📋' },
  { l:'Cobrado este mes',  v:'$67,600', c:'#4CAF50', i:'💰' },
  { l:'Por cobrar',        v:'$18,900', c:'#FF9800', i:'⏳' },
  { l:'Cobradores',        v:'5', c:'#C4843A', i:'👥' },
]

const COBRADORES = [
  { n:'Juan Pérez',      z:'Centro',  c:52, cobrado:22100, meta:25000 },
  { n:'Rosa Hernández',  z:'Norte',   c:38, cobrado:18500, meta:20000 },
  { n:'Miguel Torres',   z:'Sur',     c:35, cobrado:15200, meta:18000 },
  { n:'Carmen López',    z:'Oriente', c:24, cobrado:8400,  meta:12000 },
  { n:'Arturo Gómez',    z:'Poniente',c:15, cobrado:3400,  meta:8000 },
]

const PAGOS = [
  { cliente:'María González',   monto:850,  cobrador:'Juan Pérez',    hora:'12 min', folio:'PMX-2001' },
  { cliente:'José Ramírez',     monto:420,  cobrador:'Rosa Hernández', hora:'45 min', folio:'PMX-2002' },
  { cliente:'Ana Flores',       monto:1200, cobrador:'Miguel Torres',  hora:'1h',     folio:'PMX-2003' },
  { cliente:'Carlos Medina',    monto:600,  cobrador:'Juan Pérez',    hora:'2h',     folio:'PMX-2004' },
]

const CONTRATOS = [
  { folio:'PMX-001', cliente:'María González',  plan:'SUPREMMEX',     mensual:850,  saldo:6800,  estado:'al_corriente' },
  { folio:'PMX-002', cliente:'José Ramírez',    plan:'ECOMMEX',       mensual:420,  saldo:3360,  estado:'atrasado' },
  { folio:'PMX-003', cliente:'Ana Flores',      plan:'SUPREMMEX MAX', mensual:1200, saldo:9600,  estado:'al_corriente' },
  { folio:'PMX-004', cliente:'Carlos Medina',   plan:'PREMMEDIO',     mensual:600,  saldo:2400,  estado:'al_corriente' },
  { folio:'PMX-005', cliente:'Lucía Vázquez',   plan:'ECOMMEX',       mensual:420,  saldo:0,     estado:'liquidado' },
]

const IGrid  = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
const IUsers = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>
const IFile  = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
const IMoney = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
const IChart = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></svg>
const ICog   = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/></svg>

const NAV = [
  { id:'dashboard',  l:'Dashboard',  I:IGrid },
  { id:'contratos',  l:'Contratos',  I:IFile },
  { id:'cobradores', l:'Cobradores', I:IUsers },
  { id:'cobranza',   l:'Cobranza',   I:IMoney },
  { id:'reportes',   l:'Reportes',   I:IChart },
  { id:'config',     l:'Config',     I:ICog },
]

const FI = ({children,d=0}:{children:React.ReactNode;d?:number}) => (
  <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{duration:0.22,delay:d,ease:'easeOut'}}>
    {children}
  </motion.div>
)

export default function AdminDashboard() {
  const [sec, setSec] = useState('dashboard')
  const [mobileTab, setMobileTab] = useState('dashboard')

  const activeSection = sec

  return (
    <div style={{display:'flex',minHeight:'100vh',background:'#130800'}}>

      {/* SIDEBAR DESKTOP 240px */}
      <aside style={{width:240,flexShrink:0,background:'#1E0E05',
        borderRight:'1px solid rgba(255,255,255,0.07)',
        position:'fixed',top:0,bottom:0,left:0,
        display:'flex',flexDirection:'column',zIndex:20}}
        className="desktop-only">
        <div style={{padding:'28px 24px 20px',borderBottom:'1px solid rgba(255,255,255,0.07)'}}>
          <div style={{fontFamily:'Georgia,serif',fontSize:18,letterSpacing:'0.2em',
            background:'linear-gradient(90deg,#C9A84C,#E8C97A,#C9A84C)',
            backgroundSize:'200% auto',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',
            backgroundClip:'text',animation:'shimmer 3s linear infinite'}}>
            PREMMEX
          </div>
          <div style={{fontSize:10,color:'#5A3E30',textTransform:'uppercase',letterSpacing:'0.12em',marginTop:4}}>
            Panel Administrativo
          </div>
          <div style={{fontSize:10,color:'#5A3E30',marginTop:2}}>Capilla de Guadalupe, Jal.</div>
        </div>
        <nav style={{flex:1,padding:'12px 0',overflowY:'auto'}}>
          {NAV.map(({id,l,I}) => (
            <button key={id} onClick={() => setSec(id)}
              style={{width:'100%',display:'flex',alignItems:'center',gap:12,
                padding:'11px 24px',border:'none',cursor:'pointer',
                background:activeSection===id?'rgba(197,132,58,0.08)':'transparent',
                color:activeSection===id?'#C4843A':'#5A3E30',
                borderLeft:`2px solid ${activeSection===id?'#C4843A':'transparent'}`,
                fontSize:13,fontFamily:'inherit',transition:'all 150ms',textAlign:'left'}}>
              <div style={{width:18,height:18,flexShrink:0}}><I/></div>
              {l}
            </button>
          ))}
        </nav>
        <div style={{padding:'16px 24px',borderTop:'1px solid rgba(255,255,255,0.07)'}}>
          <div style={{color:'#F5EEE6',fontSize:13,fontWeight:600}}>José Prudencio García</div>
          <div style={{color:'#5A3E30',fontSize:11}}>Administrador General</div>
        </div>
      </aside>

      {/* MAIN */}
      <main style={{flex:1,marginLeft:240,overflowY:'auto',paddingBottom:80}}
        className="admin-main">

        {/* TOPBAR */}
        <div style={{padding:'16px 24px',display:'flex',alignItems:'center',justifyContent:'space-between',
          borderBottom:'1px solid rgba(255,255,255,0.07)',
          background:'rgba(19,8,0,0.9)',backdropFilter:'blur(12px)',
          position:'sticky',top:0,zIndex:10}}>
          <div>
            <div style={{color:'#F5EEE6',fontWeight:600,fontSize:16}}>
              {NAV.find(n=>n.id===activeSection)?.l}
            </div>
            <div style={{color:'#5A3E30',fontSize:11}}>Lunes 16 Jun 2026 · Sistema activo</div>
          </div>
          <button style={{padding:'8px 16px',borderRadius:999,border:'none',cursor:'pointer',
            background:'#C4843A',color:'#0D0600',fontSize:12,fontWeight:700}}>
            + Nuevo contrato
          </button>
        </div>

        <div style={{padding:24}}>

          {/* DASHBOARD */}
          {activeSection === 'dashboard' && (
            <>
              <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(180px,1fr))',gap:12,marginBottom:24}}>
                {STATS.map((s,i) => (
                  <FI key={i} d={i*0.07}>
                    <div style={{background:'#1E0E05',border:'1px solid rgba(255,255,255,0.07)',
                      borderRadius:16,padding:20}}>
                      <div style={{display:'flex',justifyContent:'space-between',marginBottom:12}}>
                        <span style={{fontSize:10,color:'#5A3E30',textTransform:'uppercase',letterSpacing:'0.08em'}}>{s.l}</span>
                        <span style={{fontSize:18}}>{s.i}</span>
                      </div>
                      <div style={{fontFamily:'Georgia,serif',fontSize:26,color:s.c,marginBottom:4}}>{s.v}</div>
                    </div>
                  </FI>
                ))}
              </div>

              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:20}}>
                <FI d={0.2}>
                  <div style={{background:'#1E0E05',border:'1px solid rgba(255,255,255,0.07)',borderRadius:16,padding:20}}>
                    <div style={{fontSize:10,color:'#5A3E30',textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:16}}>
                      RENDIMIENTO COBRADORES
                    </div>
                    {COBRADORES.map((c,i) => {
                      const pct = Math.round(c.cobrado/c.meta*100)
                      return (
                        <div key={i} style={{marginBottom:16}}>
                          <div style={{display:'flex',justifyContent:'space-between',marginBottom:6}}>
                            <div>
                              <div style={{color:'#F5EEE6',fontSize:13,fontWeight:500}}>{c.n}</div>
                              <div style={{color:'#5A3E30',fontSize:11}}>Zona {c.z} · {c.c} contratos</div>
                            </div>
                            <div style={{textAlign:'right'}}>
                              <div style={{color:'#C4843A',fontWeight:600,fontSize:13}}>${c.cobrado.toLocaleString()}</div>
                              <div style={{color:'#5A3E30',fontSize:11}}>{pct}%</div>
                            </div>
                          </div>
                          <div style={{height:6,borderRadius:999,background:'#251206',overflow:'hidden'}}>
                            <motion.div initial={{width:0}} animate={{width:`${pct}%`}}
                              transition={{delay:0.4+i*0.1,duration:0.8}}
                              style={{height:'100%',borderRadius:999,
                                background:pct>=90?'#4CAF50':pct>=70?'#C4843A':'#F44336'}}/>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </FI>

                <FI d={0.25}>
                  <div style={{background:'#1E0E05',border:'1px solid rgba(255,255,255,0.07)',borderRadius:16,padding:20}}>
                    <div style={{fontSize:10,color:'#5A3E30',textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:16}}>
                      COBROS RECIENTES
                    </div>
                    {PAGOS.map((p,i) => (
                      <div key={i} style={{display:'flex',justifyContent:'space-between',alignItems:'center',
                        paddingBottom:12,marginBottom:12,
                        borderBottom:i<PAGOS.length-1?'1px solid rgba(255,255,255,0.04)':'none'}}>
                        <div>
                          <div style={{color:'#F5EEE6',fontSize:13}}>{p.cliente}</div>
                          <div style={{color:'#5A3E30',fontSize:11}}>{p.cobrador} · hace {p.hora}</div>
                        </div>
                        <div style={{textAlign:'right'}}>
                          <div style={{color:'#4CAF50',fontWeight:600}}>+${p.monto.toLocaleString()}</div>
                          <div style={{color:'#5A3E30',fontSize:10}}>{p.folio}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </FI>
              </div>
            </>
          )}

          {/* CONTRATOS */}
          {activeSection === 'contratos' && (
            <FI>
              <div style={{background:'#1E0E05',border:'1px solid rgba(255,255,255,0.07)',borderRadius:16,overflow:'hidden'}}>
                <table style={{width:'100%',borderCollapse:'collapse'}}>
                  <thead>
                    <tr style={{borderBottom:'1px solid rgba(255,255,255,0.07)'}}>
                      {['Folio','Cliente','Plan','Mensual','Saldo','Estado'].map(h=>(
                        <th key={h} style={{padding:'12px 16px',textAlign:'left',fontSize:10,
                          color:'#5A3E30',textTransform:'uppercase',letterSpacing:'0.08em'}}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {CONTRATOS.map((c,i)=>(
                      <motion.tr key={i} initial={{opacity:0}} animate={{opacity:1}} transition={{delay:i*0.06}}
                        style={{borderBottom:i<CONTRATOS.length-1?'1px solid rgba(255,255,255,0.04)':'none',cursor:'pointer'}}
                        whileHover={{background:'rgba(255,255,255,0.02)'}}>
                        <td style={{padding:'12px 16px',color:'#C4843A',fontSize:13}}>{c.folio}</td>
                        <td style={{padding:'12px 16px',color:'#F5EEE6',fontSize:13}}>{c.cliente}</td>
                        <td style={{padding:'12px 16px',color:'#A89080',fontSize:13}}>{c.plan}</td>
                        <td style={{padding:'12px 16px',color:'#C4843A',fontWeight:600,fontSize:13}}>${c.mensual.toLocaleString()}</td>
                        <td style={{padding:'12px 16px',color:'#F5EEE6',fontSize:13}}>${c.saldo.toLocaleString()}</td>
                        <td style={{padding:'12px 16px'}}>
                          <span style={{padding:'2px 10px',borderRadius:999,fontSize:11,fontWeight:500,
                            background:c.estado==='liquidado'?'rgba(76,175,80,0.15)':c.estado==='atrasado'?'rgba(255,152,0,0.15)':'rgba(255,255,255,0.07)',
                            color:c.estado==='liquidado'?'#4CAF50':c.estado==='atrasado'?'#FF9800':'#A89080'}}>
                            {c.estado.replace('_',' ')}
                          </span>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </FI>
          )}

          {/* COBRADORES */}
          {activeSection === 'cobradores' && (
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))',gap:16}}>
              {COBRADORES.map((c,i)=>{
                const pct = Math.round(c.cobrado/c.meta*100)
                return (
                  <FI key={i} d={i*0.09}>
                    <div style={{background:'#1E0E05',border:'1px solid rgba(255,255,255,0.07)',borderRadius:16,padding:20}}>
                      <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:16}}>
                        <div style={{width:44,height:44,borderRadius:'50%',
                          background:'rgba(197,132,58,0.12)',border:'1px solid rgba(197,132,58,0.2)',
                          display:'flex',alignItems:'center',justifyContent:'center',
                          fontFamily:'Georgia,serif',fontSize:16,color:'#C4843A'}}>
                          {c.n[0]}
                        </div>
                        <div>
                          <div style={{color:'#F5EEE6',fontWeight:600,fontSize:14}}>{c.n}</div>
                          <div style={{color:'#5A3E30',fontSize:11}}>Zona {c.z}</div>
                        </div>
                      </div>
                      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8,marginBottom:14}}>
                        <div style={{background:'#251206',borderRadius:10,padding:'10px 12px'}}>
                          <div style={{fontSize:10,color:'#5A3E30',marginBottom:2}}>Contratos</div>
                          <div style={{fontFamily:'Georgia,serif',color:'#C4843A',fontSize:18}}>{c.c}</div>
                        </div>
                        <div style={{background:'#251206',borderRadius:10,padding:'10px 12px'}}>
                          <div style={{fontSize:10,color:'#5A3E30',marginBottom:2}}>Cobrado</div>
                          <div style={{color:'#4CAF50',fontSize:13,fontWeight:600}}>${c.cobrado.toLocaleString()}</div>
                        </div>
                      </div>
                      <div style={{fontSize:10,color:'#5A3E30',marginBottom:6}}>META {pct}%</div>
                      <div style={{height:6,borderRadius:999,background:'#251206',overflow:'hidden'}}>
                        <motion.div initial={{width:0}} animate={{width:`${pct}%`}}
                          transition={{delay:0.4+i*0.1,duration:0.8}}
                          style={{height:'100%',borderRadius:999,
                            background:pct>=90?'#4CAF50':pct>=70?'#C4843A':'#F44336'}}/>
                      </div>
                    </div>
                  </FI>
                )
              })}
            </div>
          )}

          {/* COBRANZA / REPORTES / CONFIG placeholder */}
          {['cobranza','reportes','config'].includes(activeSection) && (
            <FI>
              <div style={{background:'#1E0E05',border:'1px solid rgba(255,255,255,0.07)',
                borderRadius:16,padding:60,textAlign:'center'}}>
                <div style={{fontSize:40,marginBottom:12}}>
                  {activeSection==='cobranza'?'💰':activeSection==='reportes'?'📊':'⚙️'}
                </div>
                <div style={{fontFamily:'Georgia,serif',color:'#F5EEE6',fontSize:20,marginBottom:8}}>
                  {activeSection==='cobranza'?'Cobranza':activeSection==='reportes'?'Reportes':'Configuración'}
                </div>
                <div style={{color:'#5A3E30',fontSize:13}}>Módulo en desarrollo — Fase 2</div>
              </div>
            </FI>
          )}
        </div>
      </main>

      {/* BOTTOM NAV MOBILE */}
      <nav style={{position:'fixed',bottom:0,left:0,right:0,height:64,
        background:'rgba(13,6,0,0.95)',backdropFilter:'blur(20px)',
        borderTop:'1px solid rgba(255,255,255,0.07)',
        display:'none',alignItems:'center',zIndex:100}}
        className="mobile-only">
        {NAV.slice(0,5).map(({id,l,I}) => (
          <motion.button key={id} onClick={() => { setSec(id); setMobileTab(id) }}
            whileTap={{scale:0.9}}
            style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',gap:3,
              padding:'8px 0',border:'none',cursor:'pointer',background:'transparent',
              color:mobileTab===id?'#C4843A':'#5A3E30',fontSize:10,
              textTransform:'uppercase',letterSpacing:'0.04em',minHeight:44}}>
            <I/><span style={{fontSize:9}}>{l}</span>
          </motion.button>
        ))}
      </nav>

      <style>{`
        @keyframes shimmer{0%{background-position:-200% center}100%{background-position:200% center}}
        @media(max-width:768px){
          .desktop-only{display:none!important}
          .mobile-only{display:flex!important}
          .admin-main{margin-left:0!important}
        }
        @media(min-width:769px){.mobile-only{display:none!important}}
      `}</style>
    </div>
  )
}
