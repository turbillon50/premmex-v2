'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* ── SPLASH (§4 del estándar V2: 2.0s fija, fade-out 0.3s) ── */
function SplashScreen() {
  const [visible, setVisible] = useState(true)
  useEffect(() => { const t = setTimeout(() => setVisible(false), 2000); return () => clearTimeout(t) }, [])
  return (
    <AnimatePresence>
      {visible && (
        <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{ position:'fixed', inset:0, zIndex:9999, display:'flex', flexDirection:'column',
            alignItems:'center', justifyContent:'center', gap:16,
            background:'var(--brand-primary)' }}>
          <motion.div initial={{ opacity:0, scale:0.96 }} animate={{ opacity:1, scale:1 }}
            transition={{ duration:0.8, ease:'easeOut' }}
            style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:12 }}>
            {/* Cruz de previsión */}
            <div style={{ width:72, height:72, position:'relative' }}>
              <svg viewBox="0 0 72 72" fill="none" width="72" height="72">
                <circle cx="36" cy="36" r="34" stroke="#C9A84C" strokeWidth="1.5" opacity="0.4"/>
                <rect x="33" y="16" width="6" height="40" rx="2" fill="#C9A84C"/>
                <rect x="18" y="30" width="36" height="6" rx="2" fill="#C9A84C"/>
                <circle cx="36" cy="36" r="5" fill="#1A0A00"/>
                <circle cx="36" cy="36" r="3" fill="#C9A84C"/>
              </svg>
            </div>
            <div className="t-serif shimmer" style={{ fontSize:28, letterSpacing:'0.2em' }}>PREMMEX</div>
            <div className="t-micro" style={{ color:'rgba(197,132,58,0.5)', letterSpacing:'0.2em' }}>
              PREVISIÓN · MUTUAL · DE · MÉXICO
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ── LANDING (§2: vende antes de pedir nada, exploración libre) ── */
function Landing({ onEnter }: { onEnter: () => void }) {
  const planes = [
    { nombre:'ECOMMEX', traslado:'50 km', ataud:'Tapizado económico / Metálico', precio:'Consultar' },
    { nombre:'PREMMEDIO', traslado:'50 km', ataud:'Pino tapa plana', precio:'Consultar' },
    { nombre:'SUPREMMEX', traslado:'100 km + GDL', ataud:'Pino en bóveda', precio:'Consultar' },
    { nombre:'SUPREMMEX MAX', traslado:'100 km + cremación', ataud:'Pino bóveda + Urna', precio:'Consultar' },
  ]

  return (
    <div style={{ minHeight:'100vh', background:'var(--bg)', overflowX:'hidden' }}>

      {/* NAV */}
      <nav style={{ position:'fixed', top:0, left:0, right:0, zIndex:30,
        padding:'16px 20px', display:'flex', alignItems:'center', justifyContent:'space-between',
        background:'rgba(13,6,0,0.85)', backdropFilter:'blur(20px)',
        borderBottom:'1px solid var(--border-sub)' }}>
        <div className="t-serif shimmer" style={{ fontSize:18, letterSpacing:'0.2em' }}>PREMMEX</div>
        <div style={{ display:'flex', gap:8 }}>
          <a href="tel:+523918610449" className="btn btn-ghost" style={{ padding:'8px 16px', fontSize:12, minHeight:36 }}>
            📞 Llamar
          </a>
          <button onClick={onEnter} className="btn btn-primary" style={{ padding:'8px 16px', fontSize:12, minHeight:36 }}>
            Iniciar sesión
          </button>
        </div>
      </nav>

      {/* HERO */}
      <div style={{ position:'relative', minHeight:'100vh', display:'flex', alignItems:'center',
        justifyContent:'center', paddingTop:80, paddingBottom:60, paddingLeft:20, paddingRight:20 }}>
        <div style={{ position:'absolute', inset:0, overflow:'hidden' }}>
          <img src="/images/hero_premmex.jpg" alt="PREMMEX"
            style={{ width:'100%', height:'100%', objectFit:'cover', filter:'brightness(0.3) saturate(0.6)' }}/>
          <div style={{ position:'absolute', inset:0,
            background:'linear-gradient(to bottom, rgba(13,6,0,0.4) 0%, rgba(13,6,0,0.85) 100%)' }}/>
        </div>

        <motion.div initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }}
          transition={{ delay:2.4, duration:0.7 }}
          style={{ position:'relative', textAlign:'center', maxWidth:480 }}>

          <div style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'6px 16px',
            borderRadius:'var(--r-full)', marginBottom:24,
            background:'rgba(197,132,58,0.1)', border:'1px solid rgba(197,132,58,0.25)' }}>
            <span style={{ width:6, height:6, borderRadius:'50%', background:'var(--brand-accent2)',
              display:'inline-block', animation:'pulse 2s infinite' }}/>
            <span className="t-micro" style={{ color:'var(--brand-accent2)' }}>
              CAPILLA DE GUADALUPE · JALISCO
            </span>
          </div>

          <h1 className="t-display t-serif" style={{ color:'var(--txt)', marginBottom:16 }}>
            Dignidad y<br/>
            <span className="shimmer">tranquilidad</span><br/>
            para tu familia
          </h1>

          <p style={{ color:'var(--txt2)', fontSize:15, lineHeight:1.6, marginBottom:32 }}>
            Planes de previsión funeraria con pagos cómodos.<br/>
            Acompañamos a las familias de Tepatitlán, Capilla de Guadalupe y la región de los Altos de Jalisco.
          </p>

          <div style={{ display:'flex', flexDirection:'column', gap:12, alignItems:'center' }}>
            <a href="tel:+523918610449" className="btn btn-primary" style={{ width:'100%', maxWidth:320, fontSize:15 }}>
              Quiero información — 391 916 0449
            </a>
            <button onClick={onEnter} style={{ background:'transparent', border:'none', cursor:'pointer',
              color:'var(--txt2)', fontSize:13, textDecoration:'underline' }}>
              Soy empleado o cobrador → Acceder
            </button>
          </div>
        </motion.div>
      </div>

      {/* PLANES — sin precios visibles (Sergio: competencia no debe ver) */}
      <section style={{ padding:'60px 20px', maxWidth:600, margin:'0 auto' }}>
        <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
          style={{ textAlign:'center', marginBottom:40 }}>
          <div className="t-micro" style={{ color:'var(--brand-accent2)', marginBottom:8 }}>NUESTROS SERVICIOS</div>
          <h2 className="t-serif" style={{ fontSize:28, color:'var(--txt)', marginBottom:8 }}>
            Planes de previsión
          </h2>
          <p className="t-sub" style={{ fontSize:13 }}>
            Para más información sobre precios, contáctanos directamente.
          </p>
        </motion.div>

        <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
          {planes.map((p, i) => (
            <motion.div key={i} initial={{ opacity:0, x:-20 }} whileInView={{ opacity:1, x:0 }}
              viewport={{ once:true }} transition={{ delay:i*0.08 }}
              className="card-warm" style={{ padding:'16px 20px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
              <div>
                <div className="t-serif accent" style={{ fontSize:16, fontWeight:600 }}>{p.nombre}</div>
                <div className="t-sub" style={{ marginTop:4 }}>
                  Traslado {p.traslado} · {p.ataud}
                </div>
              </div>
              <div style={{ display:'flex', gap:6, flexShrink:0 }}>
                <a href="tel:+523918610449"
                  className="btn btn-ghost"
                  style={{ padding:'8px 14px', fontSize:12, minHeight:36 }}>
                  Info
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }}
          style={{ textAlign:'center', marginTop:40, padding:'24px',
            borderRadius:'var(--r-lg)', background:'var(--surface)', border:'1px solid var(--border)' }}>
          <div style={{ fontSize:24, marginBottom:8 }}>🕊️</div>
          <div className="t-serif" style={{ color:'var(--txt)', fontSize:16, marginBottom:6 }}>
            ¿Tienes dudas?
          </div>
          <div className="t-sub" style={{ marginBottom:16 }}>
            Nuestro equipo te orienta sin compromiso
          </div>
          <a href="tel:+523918610449" className="btn btn-primary" style={{ fontSize:13 }}>
            391 916 0449
          </a>
        </motion.div>
      </section>

      {/* LEAD FORM (lo que pidió Sergio: capturar datos para el vendedor) */}
      <section style={{ padding:'40px 20px 80px', maxWidth:480, margin:'0 auto' }}>
        <div className="card" style={{ padding:24 }}>
          <div className="t-micro" style={{ color:'var(--brand-accent2)', marginBottom:4 }}>QUIERO QUE ME CONTACTEN</div>
          <h3 className="t-serif" style={{ fontSize:20, color:'var(--txt)', marginBottom:20 }}>
            Déjanos tus datos
          </h3>
          {['Nombre completo','Teléfono','Domicilio','Colonia'].map((label, i) => (
            <div key={i} style={{ marginBottom:12 }}>
              <label className="t-sub" style={{ display:'block', marginBottom:4 }}>{label}</label>
              <input className="input" placeholder={`Tu ${label.toLowerCase()}`}/>
            </div>
          ))}
          <div style={{ marginBottom:16 }}>
            <label className="t-sub" style={{ display:'block', marginBottom:4 }}>Mensaje (opcional)</label>
            <textarea className="input" rows={2} placeholder="¿En qué podemos ayudarte?"/>
          </div>
          <button className="btn btn-primary" style={{ width:'100%' }}>
            Enviar — Un asesor me contactará
          </button>
          <div className="t-micro" style={{ textAlign:'center', marginTop:12 }}>
            Tus datos son confidenciales y solo se usan para contactarte
          </div>
        </div>
      </section>

      <footer style={{ padding:'20px', textAlign:'center', borderTop:'1px solid var(--border-sub)' }}>
        <div className="shimmer t-serif" style={{ fontSize:14, letterSpacing:'0.2em', marginBottom:6 }}>PREMMEX</div>
        <div className="t-sub">Vicente Guerrero #134, Capilla de Guadalupe, Jal.</div>
        <div className="t-sub">391 916 0449</div>
      </footer>

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
      `}</style>
    </div>
  )
}

/* ── APP INTERNA (cobrador / admin) ── */
function AppInterna() {
  const [tab, setTab] = useState<'home'|'contratos'|'cobranza'|'perfil'>('home')
  const [role] = useState<'cobrador'|'admin'>('cobrador') // en prod viene de Clerk

  const CONTRATOS_HOY = [
    { id:1, folio:'PMX-001', cliente:'María González', plan:'SUPREMMEX', monto:850, dir:'Av. Morelos 23', tel:'3911000001', estado:'pendiente', atrasado:false },
    { id:2, folio:'PMX-002', cliente:'José Ramírez', plan:'ECOMMEX', monto:420, dir:'Calle Hidalgo 45', tel:'3911000002', estado:'pendiente', atrasado:true },
    { id:3, folio:'PMX-003', cliente:'Ana Flores', plan:'SUPREMMEX MAX', monto:1200, dir:'López Mateos 78', tel:'3911000003', estado:'cobrado', atrasado:false },
    { id:4, folio:'PMX-004', cliente:'Carlos Medina', plan:'PREMMEDIO', monto:600, dir:'Juárez 12', tel:'3911000004', estado:'pendiente', atrasado:false },
  ]

  const [expandido, setExpandido] = useState<number|null>(null)
  const [cobrados, setCobrados] = useState<number[]>([3])
  const [metodo, setMetodo] = useState<string>('efectivo')
  const [showCobro, setShowCobro] = useState<typeof CONTRATOS_HOY[0]|null>(null)

  const totalCobrado = cobrados.reduce((a,id) => a + (CONTRATOS_HOY.find(c=>c.id===id)?.monto??0), 0)
  const pendiente = CONTRATOS_HOY.filter(c => !cobrados.includes(c.id)).reduce((a,c)=>a+c.monto,0)

  const FI = ({ children, d=0 }:{children:React.ReactNode;d?:number}) => (
    <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{duration:0.22,delay:d,ease:'easeOut'}}>
      {children}
    </motion.div>
  )

  const IHome = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/><path d="M9 21V12h6v9"/></svg>
  const IFile = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
  const IMoney = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
  const IUser = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>

  return (
    <>
      {/* MODAL COBRO */}
      <AnimatePresence>
        {showCobro && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
            style={{position:'fixed',inset:0,zIndex:200,background:'rgba(0,0,0,0.75)',backdropFilter:'blur(4px)',display:'flex',alignItems:'flex-end'}}
            onClick={()=>setShowCobro(null)}>
            <motion.div initial={{y:300}} animate={{y:0}} exit={{y:300}}
              transition={{type:'spring',damping:28,stiffness:300}}
              style={{width:'100%',maxWidth:480,margin:'0 auto',background:'var(--card)',
                borderRadius:'24px 24px 0 0',padding:24,border:'1px solid var(--border-sub)'}}
              onClick={e=>e.stopPropagation()}>
              <div style={{width:36,height:4,borderRadius:2,background:'var(--border-sub)',margin:'0 auto 20px'}}/>
              <div className="t-micro" style={{color:'var(--brand-accent2)',marginBottom:4}}>REGISTRAR COBRO</div>
              <div className="t-title" style={{marginBottom:2}}>{showCobro.cliente}</div>
              <div className="t-sub" style={{marginBottom:20}}>{showCobro.folio} · Plan {showCobro.plan}</div>
              <div style={{textAlign:'center',marginBottom:20}}>
                <div className="t-micro" style={{marginBottom:4}}>MONTO A COBRAR</div>
                <div className="t-serif shimmer" style={{fontSize:40}}>$ {showCobro.monto.toLocaleString()}</div>
              </div>
              <div className="t-micro" style={{marginBottom:10}}>FORMA DE PAGO</div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:8,marginBottom:20}}>
                {['efectivo','transferencia','tarjeta'].map(m => (
                  <button key={m} onClick={()=>setMetodo(m)}
                    style={{padding:'10px 4px',borderRadius:'var(--r-md)',fontSize:11,fontWeight:600,cursor:'pointer',
                      border:'1px solid '+(metodo===m?'var(--brand-accent2)':'var(--border-sub)'),
                      background:metodo===m?'rgba(197,132,58,0.15)':'var(--surface)',
                      color:metodo===m?'var(--brand-accent2)':'var(--txt2)'}}>
                    {m==='efectivo'?'💵 Efectivo':m==='transferencia'?'🏦 Transfer.':'💳 Tarjeta'}
                  </button>
                ))}
              </div>
              <button className="btn btn-primary" style={{width:'100%',marginBottom:10}}
                onClick={()=>{setCobrados(p=>[...p,showCobro.id]);setShowCobro(null)}}>
                ✓ Confirmar cobro
              </button>
              <button className="btn btn-ghost" style={{width:'100%'}} onClick={()=>setShowCobro(null)}>
                Cancelar
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="page-mobile" style={{maxWidth:480,margin:'0 auto'}}>

        {/* ── HOME (ruta del día) ── */}
        {tab === 'home' && (
          <div>
            <div style={{position:'relative',height:160,overflow:'hidden'}}>
              <img src="/images/hero_cobrador.jpg" alt="" style={{width:'100%',height:'100%',objectFit:'cover',filter:'brightness(0.35)'}}/>
              <div style={{position:'absolute',inset:0,background:'linear-gradient(to bottom,transparent 30%,var(--bg) 100%)'}}/>
              <div style={{position:'absolute',bottom:16,left:20}}>
                <div className="t-micro" style={{color:'var(--brand-accent2)'}}>COBRADOR · MODO CAMPO</div>
                <div className="t-title" style={{color:'var(--txt)'}}>Juan Pérez Gómez</div>
                <div className="t-sub">Zona Centro · Capilla de Guadalupe</div>
              </div>
            </div>

            <div style={{padding:'0 16px'}}>
              {/* KPIs */}
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:8,margin:'12px 0'}}>
                {[
                  {l:'Cobrado',v:`$${totalCobrado.toLocaleString()}`,c:'var(--green)'},
                  {l:'Pendiente',v:`$${pendiente.toLocaleString()}`,c:'var(--orange)'},
                  {l:'Visitas',v:`${cobrados.length}/${CONTRATOS_HOY.length}`,c:'var(--txt)'},
                ].map((s,i)=>(
                  <FI key={i} d={i*0.07}>
                    <div className="card" style={{padding:'10px 8px',textAlign:'center',borderRadius:'var(--r-md)'}}>
                      <div className="t-micro" style={{marginBottom:4}}>{s.l}</div>
                      <div className="t-serif" style={{fontSize:16,color:s.c}}>{s.v}</div>
                    </div>
                  </FI>
                ))}
              </div>

              <div className="t-micro" style={{margin:'16px 0 8px'}}>RUTA DE HOY</div>
              <div style={{display:'flex',flexDirection:'column',gap:8}}>
                {CONTRATOS_HOY.map((c,i)=>{
                  const esCobrado = cobrados.includes(c.id)
                  const open = expandido === c.id
                  return (
                    <FI key={c.id} d={i*0.06}>
                      <div className="card" style={{overflow:'hidden',
                        borderColor:esCobrado?'rgba(76,175,80,0.4)':c.atrasado?'rgba(255,152,0,0.35)':'var(--border-sub)',
                        opacity:esCobrado?0.7:1}}>
                        <div style={{padding:'12px 16px',display:'flex',alignItems:'center',justifyContent:'space-between',cursor:'pointer'}}
                          onClick={()=>setExpandido(open?null:c.id)}>
                          <div style={{display:'flex',alignItems:'center',gap:12}}>
                            <div style={{width:36,height:36,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',
                              background:esCobrado?'rgba(76,175,80,0.15)':'var(--surface)',
                              color:esCobrado?'var(--green)':'var(--txt3)',fontSize:13,fontFamily:'Georgia,serif',flexShrink:0}}>
                              {esCobrado?'✓':(i+1)}
                            </div>
                            <div>
                              <div className="t-body" style={{fontWeight:500}}>{c.cliente}</div>
                              <div className="t-sub" style={{fontSize:11}}>{c.dir}</div>
                            </div>
                          </div>
                          <div style={{textAlign:'right'}}>
                            <div className="accent" style={{fontWeight:600,fontSize:14}}>$ {c.monto.toLocaleString()}</div>
                            {c.atrasado&&!esCobrado&&<span className="badge badge-orange" style={{fontSize:9}}>Atrasado</span>}
                            {esCobrado&&<span className="badge badge-green" style={{fontSize:9}}>Cobrado</span>}
                          </div>
                        </div>
                        <AnimatePresence>
                          {open && !esCobrado && (
                            <motion.div initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}}
                              style={{overflow:'hidden'}}>
                              <div style={{padding:'8px 16px 14px',borderTop:'1px solid var(--border-sub)'}}>
                                <div className="t-sub" style={{marginBottom:10}}>{c.folio} · {c.plan}</div>
                                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:8}}>
                                  <a href={`tel:${c.tel}`} style={{display:'flex',flexDirection:'column',alignItems:'center',
                                    padding:'10px 4px',borderRadius:'var(--r-md)',fontSize:10,gap:4,textDecoration:'none',
                                    background:'rgba(33,150,243,0.1)',color:'#2196F3'}}>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.22 2.18 2 2 0 012.18 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.06 6.06l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
                                    Llamar
                                  </a>
                                  <a href={`https://wa.me/52${c.tel}`} style={{display:'flex',flexDirection:'column',alignItems:'center',
                                    padding:'10px 4px',borderRadius:'var(--r-md)',fontSize:10,gap:4,textDecoration:'none',
                                    background:'rgba(37,211,102,0.1)',color:'#25D166'}}>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.534 5.859L.073 23.27a.75.75 0 00.906.919l5.555-1.461A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.001-1.371l-.36-.213-3.708.976.992-3.617-.234-.374A9.818 9.818 0 0112 2.182c5.429 0 9.818 4.389 9.818 9.818S17.429 21.818 12 21.818z"/></svg>
                                    WhatsApp
                                  </a>
                                  <button onClick={()=>setShowCobro(c)}
                                    style={{display:'flex',flexDirection:'column',alignItems:'center',
                                      padding:'10px 4px',borderRadius:'var(--r-md)',fontSize:10,gap:4,cursor:'pointer',
                                      background:'rgba(197,132,58,0.15)',color:'var(--brand-accent2)',border:'none'}}>
                                    <IMoney/>
                                    Cobrar
                                  </button>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </FI>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {/* ── CONTRATOS ── */}
        {tab === 'contratos' && (
          <div style={{padding:'60px 16px 0'}}>
            <FI><div className="t-micro" style={{marginBottom:4}}>MIS CONTRATOS</div>
              <div className="t-title" style={{marginBottom:16}}>Zona Centro</div></FI>
            <div style={{display:'flex',flexDirection:'column',gap:8}}>
              {CONTRATOS_HOY.map((c,i)=>(
                <FI key={c.id} d={i*0.06}>
                  <div className="card" style={{padding:'14px 16px'}}>
                    <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
                      <div>
                        <div className="t-body" style={{fontWeight:500}}>{c.cliente}</div>
                        <div className="t-sub">{c.folio} · {c.plan}</div>
                        <div className="t-sub" style={{fontSize:11,marginTop:2}}>{c.dir}</div>
                      </div>
                      <div style={{textAlign:'right'}}>
                        <div className="accent" style={{fontWeight:600}}>$ {c.monto.toLocaleString()}/mes</div>
                        {c.atrasado&&<span className="badge badge-orange" style={{fontSize:9}}>Atrasado</span>}
                      </div>
                    </div>
                  </div>
                </FI>
              ))}
            </div>
          </div>
        )}

        {/* ── COBRANZA DEL DÍA ── */}
        {tab === 'cobranza' && (
          <div style={{padding:'60px 16px 0'}}>
            <FI>
              <div className="t-micro" style={{marginBottom:4}}>COBROS DEL DÍA</div>
              <div className="t-title" style={{marginBottom:4}}>Resumen</div>
              <div className="t-sub" style={{marginBottom:16}}>
                {cobrados.length} cobros · Total: <span className="accent">${totalCobrado.toLocaleString()}</span>
              </div>
            </FI>
            {cobrados.length === 0 ? (
              <div className="card" style={{padding:40,textAlign:'center'}}>
                <div style={{fontSize:28,marginBottom:8}}>💰</div>
                <div className="t-sub">Sin cobros registrados aún</div>
              </div>
            ) : (
              <div style={{display:'flex',flexDirection:'column',gap:8}}>
                {cobrados.map((id,i)=>{
                  const c = CONTRATOS_HOY.find(x=>x.id===id)!
                  return (
                    <FI key={id} d={i*0.07}>
                      <div className="card" style={{padding:'12px 16px',display:'flex',justifyContent:'space-between'}}>
                        <div>
                          <div className="t-body">{c.cliente}</div>
                          <div className="t-sub">{c.folio} · Efectivo</div>
                        </div>
                        <div className="t-body" style={{color:'var(--green)',fontWeight:600}}>+$ {c.monto.toLocaleString()}</div>
                      </div>
                    </FI>
                  )
                })}
                <FI d={0.25}>
                  <div className="card-warm" style={{padding:'14px 16px',display:'flex',justifyContent:'space-between'}}>
                    <span className="t-body">Total cobrado</span>
                    <span className="t-serif accent" style={{fontSize:20}}>$ {totalCobrado.toLocaleString()}</span>
                  </div>
                </FI>
              </div>
            )}
          </div>
        )}

        {/* ── PERFIL ── */}
        {tab === 'perfil' && (
          <div style={{padding:'60px 16px 0',textAlign:'center'}}>
            <FI>
              <div style={{width:72,height:72,borderRadius:'50%',margin:'0 auto 12px',
                background:'rgba(197,132,58,0.15)',border:'2px solid var(--border)',
                display:'flex',alignItems:'center',justifyContent:'center',
                fontFamily:'Georgia,serif',fontSize:28,color:'var(--brand-accent2)'}}>J</div>
              <div className="t-title">Juan Pérez Gómez</div>
              <div className="t-sub" style={{marginBottom:24}}>Cobrador · Zona Centro</div>
            </FI>
            <FI d={0.1}>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8,marginBottom:16}}>
                {[
                  {l:'Contratos',v:'28',c:'var(--brand-accent2)'},
                  {l:'Cobrado mes',v:'$11,200',c:'var(--green)'},
                  {l:'Meta',v:'$14,000',c:'var(--txt)'},
                  {l:'% Meta',v:'80%',c:'var(--green)'},
                ].map((s,i)=>(
                  <div key={i} className="card" style={{padding:'12px',textAlign:'center'}}>
                    <div className="t-micro" style={{marginBottom:4}}>{s.l}</div>
                    <div className="t-serif" style={{fontSize:18,color:s.c}}>{s.v}</div>
                  </div>
                ))}
              </div>
              <div className="t-micro" style={{marginBottom:6,textAlign:'left'}}>META DEL MES</div>
              <div className="progress-track" style={{marginBottom:4}}>
                <motion.div className="progress-fill" initial={{width:0}} animate={{width:'80%'}}
                  transition={{delay:0.3,duration:0.9}}
                  style={{background:'linear-gradient(90deg,var(--brand-accent),var(--brand-accent2))'}}/>
              </div>
            </FI>
          </div>
        )}

      </div>

      {/* BOTTOM NAV */}
      <nav className="bottom-nav">
        {[
          {id:'home',l:'Inicio',I:IHome},
          {id:'contratos',l:'Contratos',I:IFile},
          {id:'cobranza',l:'Cobranza',I:IMoney},
          {id:'perfil',l:'Perfil',I:IUser},
        ].map(({id,l,I})=>(
          <motion.button key={id} onClick={()=>setTab(id as typeof tab)}
            className={`nav-tab${tab===id?' active':''}`} whileTap={{scale:0.9}}>
            <I/><span>{l}</span>
          </motion.button>
        ))}
      </nav>
    </>
  )
}

/* ── ROOT ── */
export default function PremmexApp() {
  const [showApp, setShowApp] = useState(false)

  return (
    <>
      <SplashScreen />
      {showApp ? <AppInterna /> : <Landing onEnter={() => setShowApp(true)} />}
    </>
  )
}
