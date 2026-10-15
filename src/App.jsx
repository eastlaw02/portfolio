import { useEffect, useRef, useState } from 'react'
import {
  motion,
  animate,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
} from 'framer-motion'
import {
  profile, nav, stats, flow, principles, ezmapBars, weldSteps, others, awards, skills,
} from './data.js'

const ease = [0.2, 0.7, 0.2, 1]
const view = { once: true, margin: '0px 0px -10% 0px' }

/* ---------- primitives ---------- */

function Reveal({ as = 'div', delay = 0, y = 24, children, ...rest }) {
  const M = motion[as]
  return (
    <M
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={view}
      transition={{ duration: 0.7, ease, delay }}
      {...rest}
    >
      {children}
    </M>
  )
}

function Count({ to, from = 0, dec = 0 }) {
  const ref = useRef(null)
  const seen = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })
  const reduce = useReducedMotion()
  const [v, setV] = useState(reduce ? to : from)
  useEffect(() => {
    if (reduce) return setV(to)
    if (!seen) return
    const c = animate(from, to, { duration: 1.4, ease: 'easeOut', onUpdate: setV })
    return () => c.stop()
  }, [seen, reduce, from, to])
  return <span ref={ref}>{v.toFixed(dec)}</span>
}

function Bar({ pct, delay = 0, className = '' }) {
  return (
    <div className={`track ${className}`}>
      <motion.i
        style={{ width: `${pct}%`, transformOrigin: '0 50%' }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={view}
        transition={{ duration: 1.1, ease, delay }}
      />
    </div>
  )
}

function SecHead({ eyebrow, title }) {
  return (
    <div className="sec-head">
      <Reveal as="span" className="eyebrow" y={10}>{eyebrow}</Reveal>
      <Reveal as="h2" delay={0.06}>{title}</Reveal>
      <motion.span
        className="bar"
        style={{ transformOrigin: '0 50%' }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={view}
        transition={{ duration: 0.9, ease, delay: 0.15 }}
      />
    </div>
  )
}

const Icon = {
  sun: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  ),
  moon: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
    </svg>
  ),
  arrow: (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 17L17 7M8 7h9v9" />
    </svg>
  ),
}

/* ---------- header ---------- */

function Header({ theme, toggleTheme, active }) {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.4 })
  return (
    <header className="top">
      <motion.div className="progress" style={{ scaleX }} aria-hidden="true" />
      <div className="wrap bar-row">
        <a className="brand" href="#top">황동헌<span className="dot" aria-hidden="true" /></a>
        <nav aria-label="섹션">
          {nav.map(([id, label]) => (
            <a key={id} href={`#${id}`} className={active === id ? 'on' : ''} aria-current={active === id ? 'true' : undefined}>
              {label}
              {active === id && <motion.span layoutId="nav-ul" className="ul" transition={{ type: 'spring', stiffness: 500, damping: 40 }} />}
            </a>
          ))}
        </nav>
        <button className="icon-btn" type="button" onClick={toggleTheme} aria-label={theme === 'dark' ? '라이트 모드로 전환' : '다크 모드로 전환'}>
          {theme === 'dark' ? Icon.sun : Icon.moon}
        </button>
      </div>
    </header>
  )
}

/* ---------- hero ---------- */

function CopyPill({ value, label = 'MAIL', onCopied }) {
  return (
    <button
      className="pill"
      type="button"
      onClick={async () => {
        try { await navigator.clipboard.writeText(value); onCopied('이메일 주소를 복사했습니다') } catch { onCopied(value) }
      }}
    >
      <span className="k">{label}</span> {value}
    </button>
  )
}

function Hero({ say, toast }) {
  const mx = useMotionValue(-999)
  const my = useMotionValue(-999)
  const mask = useMotionTemplate`radial-gradient(280px circle at ${mx}px ${my}px, #000, transparent 70%)`
  const glow = useMotionTemplate`radial-gradient(420px circle at ${mx}px ${my}px, var(--spot), transparent 70%)`
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    mx.set(e.clientX - r.left)
    my.set(e.clientY - r.top)
  }
  return (
    <section className="hero" id="top" onPointerMove={onMove} onPointerLeave={() => { mx.set(-999); my.set(-999) }}>
      <div className="grid" aria-hidden="true" />
      <motion.div className="grid hi" aria-hidden="true" style={{ WebkitMaskImage: mask, maskImage: mask }} />
      <motion.div className="glow" aria-hidden="true" style={{ background: glow }} />
      <div className="wrap hero-inner">
        <motion.div className="eyebrow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
          {profile.eyebrow}
        </motion.div>
        <h1 className="name" aria-label={profile.name.join('')}>
          {profile.name.map((ch, i) => (
            <span className="mask" key={ch} aria-hidden="true">
              <motion.span
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.95, ease, delay: 0.1 + i * 0.09 }}
              >
                {ch}
              </motion.span>
            </span>
          ))}
        </h1>
        <motion.div
          className="rule"
          aria-hidden="true"
          style={{ transformOrigin: '0 50%' }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, ease, delay: 0.45 }}
        />
        <motion.p className="lead" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease, delay: 0.5 }}>
          사용자의 문제에서 출발해, AI와 소프트웨어로 끝까지 <em>구현</em>하고 <em>검증</em>하는 SW 개발자입니다.
        </motion.p>
        <motion.div className="contacts" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease, delay: 0.65 }}>
          <CopyPill value={profile.email} onCopied={say} />
          <a className="pill" href={profile.github.url} target="_blank" rel="noopener noreferrer">
            <span className="k">GITHUB</span> {profile.github.label} {Icon.arrow}
          </a>
          <span className="toast" role="status" aria-live="polite">{toast}</span>
        </motion.div>
        <div className="stats">
          {stats.map((s, i) => (
            <Reveal className="stat" key={s.label} delay={0.75 + i * 0.08} y={16}>
              <div className="v"><Count to={s.to} from={s.from} dec={s.dec} /><small>{s.unit}</small></div>
              <div className="l">{s.label}</div>
              <div className="s">{s.sub}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- about ---------- */

function About() {
  const [on, setOn] = useState(0)
  const [paused, setPaused] = useState(false)
  const reduce = useReducedMotion()
  useEffect(() => {
    if (reduce || paused) return
    const t = setInterval(() => setOn((k) => (k + 1) % flow.length), 1500)
    return () => clearInterval(t)
  }, [reduce, paused])
  return (
    <section className="block" id="about">
      <div className="wrap">
        <SecHead eyebrow="About" title="이렇게 일합니다" />
        <Reveal as="p" className="about">
          문제를 발견하면 요구사항으로 정리하고, 알맞은 기술을 골라 구현한 뒤, 사용자 반응과 수치로 검증합니다. 학교 공지 앱을 Google Play에 출시해 2024.10부터 2026.06까지 운영했고, AI 음성 내비게이션은 사용자 평가를 거쳐 국제학술대회 포스터로 발표했습니다.
        </Reveal>
        <Reveal
          className="flow"
          aria-label="일하는 순서"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {flow.map((label, i) => (
            <button
              type="button"
              key={label}
              className={`node ${on === i ? 'on' : ''}`}
              onClick={() => setOn(i)}
              onFocus={() => setOn(i)}
            >
              <b>{String(i + 1).padStart(2, '0')}</b>
              <span>{label}</span>
              {on === i && <motion.i layoutId="flow-hl" className="hl" transition={{ type: 'spring', stiffness: 380, damping: 36 }} />}
            </button>
          ))}
        </Reveal>
        <div className="principles">
          {principles.map(([h, p], i) => (
            <Reveal className="principle" key={h} delay={i * 0.1}>
              <span className="mono pn">{String(i + 1).padStart(2, '0')}</span>
              <h3>{h}</h3>
              <p>{p}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- projects ---------- */

function Proj({ index, kind, date, title, sub, tags, children }) {
  return (
    <Reveal as="article" className="proj" y={36}>
      <div className="proj-head">
        <span className="ghost-n" aria-hidden="true">{index}</span>
        <div className="row1"><span className="eyebrow">{kind}</span><span className="eyebrow">{date}</span></div>
        <h3>{title}</h3>
        <p className="sub">{sub}</p>
        <div className="tags">{tags.map((t) => <span key={t}>{t}</span>)}</div>
      </div>
      <div className="proj-body">{children}</div>
    </Reveal>
  )
}

function Metric({ to, from, dec, unit, label, sub, pct, ghost }) {
  return (
    <div className="metric">
      <div className="v"><Count to={to} from={from} dec={dec} /><small>{unit}</small></div>
      {pct != null && (
        <div className="track">
          {ghost != null && <span className="ghost" style={{ width: `${ghost}%` }} />}
          <motion.i
            style={{ width: `${pct}%`, transformOrigin: '0 50%' }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={view}
            transition={{ duration: 1.1, ease }}
          />
        </div>
      )}
      <div className="l">{label}</div>
      <div className="s">{sub}</div>
    </div>
  )
}

function Projects() {
  return (
    <section className="block" id="projects">
      <div className="wrap">
        <SecHead eyebrow="Projects" title="대표 프로젝트" />

        <Proj
          index="01" kind="Project 01 · 캡스톤디자인 · 연구" date="2026.01 – 2026.07"
          title="EZmap" sub="AI 에이전트 기반 음성 내비게이션 · 3인 팀, 팀장 · SW 개발"
          tags={['Gemini 2.5 Flash', 'Kakao Map · Local API', 'AI Agent', 'GitHub 협업', '사용자 평가']}
        >
          <div>
            <dl className="kv">
              <dt>PROBLEM</dt>
              <dd>"300m 앞 우회전" 같은 거리 중심 안내는 경로를 직관적으로 이해하기 어렵고, 화면을 보느라 전방 주시가 흐트러질 수 있습니다.</dd>
              <dt>APPROACH</dt>
              <dd>
                Gemini와 카카오맵 API로 길 안내·메시지 전송·일정 관리를 말 한마디로 처리하는 AI 에이전트를 만들고, 주변 건물·상점(POI)으로 안내하는 기능을 직접 제안하고 구현했습니다.
                <div className="pipe">
                  {['안내 지점 반경 300m POI 실시간 수집', '규칙 기반 기본 안내 문구 생성', 'Gemini가 20자 이내 문장으로 보강'].map((t, i) => (
                    <motion.div
                      key={t}
                      className={i === 2 ? 'hl' : ''}
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={view}
                      transition={{ duration: 0.6, ease, delay: i * 0.15 }}
                    >
                      <em>STEP {i + 1}</em>{t}
                    </motion.div>
                  ))}
                </div>
                <p className="note">두 단계로 나눈 이유: AI 응답 지연을 줄이면서 자연스러운 안내를 내기 위해서입니다.</p>
              </dd>
              <dt>MY ROLE</dt>
              <dd>기능 범위로 의견이 갈렸을 때 회의를 열어, 목적에 맞는 기능 1~2개만 추가하는 절충안으로 일정을 다시 짜 기한 안에 개발을 마쳤습니다. 기능별 브랜치와 PR 리뷰 후 병합 규칙으로 코드 관리 방식을 통일했습니다.</dd>
            </dl>
          </div>
          <div>
            <div className="lab">14명 실제 주행 평가 · 5점 척도 · 6개 지표 모두 p &lt; .001</div>
            <div className="bars">
              {ezmapBars.map(([l, v], i) => (
                <div className="hbar" key={l}>
                  <span>{l}</span>
                  <Bar pct={(v / 5) * 100} delay={i * 0.08} />
                  <span className="v"><Count to={v} dec={2} /></span>
                </div>
              ))}
            </div>
            <p className="note">평소 운전을 자주 하는 14명(평균 37.9세)이 실제 경로를 주행한 뒤 평가했고, 중립값 3.0 기준 단일표본 t-검정으로 분석했습니다.</p>
            <div className="quote">
              <b>ICFICE 2026 포스터 발표</b> (단독 저자) · Enhancing Driver Route Recognition Using POI-Based Generative AI Navigation Voice Guidance<br />
              <b>캡스톤디자인 경진대회 장려상</b>
            </div>
          </div>
        </Proj>

        <Proj
          index="02" kind="Project 02 · HD현대중공업 AI 업무혁신 해커톤 · 우수상" date="2026.02"
          title="YOLO 기반 용접 검사 자동화" sub="도면 부품 타입 추출·매칭 담당"
          tags={['YOLO', 'OCR', '데이터 증강', '알고리즘 설계', '모바일 프로토타입']}
        >
          <div>
            <dl className="kv" style={{ marginBottom: 22 }}>
              <dt>PROBLEM</dt>
              <dd>작업자가 각자 촬영한 하루 약 3,000장의 용접 사진을 담당자가 경험과 육안으로 양불 판정하고 있었습니다.</dd>
            </dl>
            <div className="lab">막힐 때마다 원인을 다시 정의했습니다</div>
            <div className="steps">
              <motion.span
                className="spine"
                aria-hidden="true"
                style={{ transformOrigin: '50% 0' }}
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={view}
                transition={{ duration: 1.4, ease }}
              />
              {weldSteps.map(([h, p], i) => (
                <motion.div
                  className="step"
                  key={h}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={view}
                  transition={{ duration: 0.6, ease, delay: i * 0.12 }}
                >
                  <span className="n">{String(i + 1).padStart(2, '0')}</span>
                  <div><h4>{h}</h4><p>{p}</p></div>
                </motion.div>
              ))}
            </div>
          </div>
          <div>
            <div className="lab">Result</div>
            <div className="metrics">
              <Metric to={95} from={40} unit="%" pct={95} ghost={40} label="도면 기호 검출률" sub="약 40% → 약 95% · 본인 담당" />
              <Metric to={85} unit="%" pct={85} label="부품 타입 매칭률" sub="약 85% · 본인 담당" />
              <Metric to={70} unit="%↓" pct={70} label="작업자 확인 이미지" sub="약 70% 감소 · 팀 성과" />
            </div>
            <p className="note">팀 시스템이 의심·불량 이미지를 약 30%로 선별해, 작업자가 직접 확인할 양이 약 70% 줄었습니다(프로토타입 테스트 기준).</p>
            <div className="quote">이 경험으로 성능이 낮을 때 모델부터 고치지 않고, 데이터·알고리즘·사용 환경 중 원인을 먼저 가르는 습관이 생겼습니다.</div>
          </div>
        </Proj>

        <Proj
          index="03" kind="Project 03 · Android · 팀 프로젝트" date="2024.10 – 2026.06"
          title="알림IT" sub="학교 공지 알림 Android 앱 · 개발, Google Play 출시, 유지보수"
          tags={['Kotlin', 'Android Studio', 'Google Play', 'GitHub 협업', '사용자 피드백']}
        >
          <div>
            <dl className="kv">
              <dt>PROBLEM</dt>
              <dd>학생들은 학부 홈페이지에 직접 들어가야 공지를 볼 수 있었고, 새 공지가 올라와도 알 수 없어 놓치는 경우가 많았습니다.</dd>
              <dt>MY ROLE</dt>
              <dd>Kotlin으로 공지 조회·검색·북마크·알림 기능을 개발하고 Google Play 출시를 맡았습니다. 서버 이전과 피드백 반영을 포함해 출시 후 2회 업데이트했습니다.</dd>
              <dt>AI TOOLS</dt>
              <dd>개발은 Claude, 기술 조사와 해결책 비교는 ChatGPT, 이미지 관련 작업은 Gemini로 나눠 썼고, AI가 낸 코드는 요구사항과 실제 동작으로 직접 확인하며 고쳤습니다.</dd>
            </dl>
            <div className="lab" style={{ marginTop: 24 }}>Feedback → Change</div>
            <div className="ba">
              <div><b>처음 판단</b>공지는 중요도순 정렬이 최선</div>
              <div className="arr" aria-hidden="true">→</div>
              <motion.div
                className="after"
                initial={{ backgroundColor: 'transparent' }}
                whileInView={{ backgroundColor: 'var(--accent-soft)' }}
                viewport={view}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <b>피드백 반영 후</b>중요도·시간·북마크 우선 정렬을 사용자가 선택
              </motion.div>
            </div>
          </div>
          <div>
            <div className="lab">Result</div>
            <div className="metrics">
              <Metric to={120} unit="명" label="사용자" sub="약 120명 · Android 약 47명 + iOS" />
              <Metric to={4.2} dec={1} unit="" label="사용자 만족도" sub="약 4.2점" />
              <Metric to={2} unit="회" label="출시 후 업데이트" sub="서버 이전 포함" />
            </div>
            <div className="quote">"새 공지가 올라오면 알림이 와서 놓치지 않는다", "앱 실행 한 번으로 원하는 학부 공지를 확인할 수 있어 유용하다"는 사용자 의견을 받았습니다.</div>
            <p className="note"><a className="link" href="https://github.com/Alarm-IT/Android" target="_blank" rel="noopener noreferrer">github.com/Alarm-IT/Android {Icon.arrow}</a></p>
          </div>
        </Proj>

        <div className="lab" style={{ marginTop: 52 }}>그 밖의 프로젝트와 활동</div>
        <div className="list">
          {others.map(([d, t, p, r, top], i) => (
            <Reveal className="li" key={t} delay={i * 0.04} y={14}>
              <span className="d">{d}</span>
              <div className="t">{t}<p>{p}</p></div>
              <span className={`r ${top ? 'top' : ''}`}>{r}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- awards / skills ---------- */

function Awards() {
  return (
    <section className="block" id="awards">
      <div className="wrap">
        <SecHead eyebrow="Awards" title="수상과 성과" />
        <div className="list">
          {awards.map(([d, t, r, top], i) => (
            <Reveal className="li award" key={t} delay={i * 0.05} y={14}>
              <span className="d">{d}</span>
              <div className="t">{t}</div>
              <span className={`r ${top ? 'top' : ''}`}>{r}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Skills() {
  return (
    <section className="block" id="skills">
      <div className="wrap">
        <SecHead eyebrow="Skills · Education" title="기술과 학력" />
        <div className="tbl" role="table" aria-label="기술 스택">
          <div className="tr th" role="row">
            <span role="columnheader">영역</span><span role="columnheader">기술</span><span role="columnheader">사용한 곳</span>
          </div>
          {skills.map(([a, b, c], i) => (
            <Reveal className="tr" role="row" key={a} delay={i * 0.05} y={12}>
              <b role="cell">{a}</b><span role="cell">{b}</span><span role="cell" className="mute">{c}</span>
            </Reveal>
          ))}
        </div>
        <p className="note">그 외 언어: Java, C</p>
        <div className="two">
          <Reveal className="card">
            <span className="eyebrow">Education · Language</span>
            <b className="ct">울산대학교 IT융합전공 4학년 (졸업예정)</b>
            <span>학점 <b className="num">4.1</b> / 4.5</span>
            <span>OPIc IH · TOEIC Speaking 140점</span>
          </Reveal>
          <Reveal className="card mark" delay={0.1}>
            <span className="eyebrow">Internship · 2026.08 –</span>
            <b className="ct">IT 기업 연구본부 인턴</b>
            <span>사내 AI 업무지원 시스템의 설계와 개발에 참여하고 있습니다. 프로젝트 상세는 보안상 공개하지 않으며, 공개 가능한 범위에서 면접 시 설명드리겠습니다.</span>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Footer({ say, toast }) {
  return (
    <footer className="end wrap" id="contact">
      <Reveal as="span" className="eyebrow" y={8}>Contact</Reveal>
      <Reveal as="p" className="big" delay={0.05}>
        문제를 발견하고, <em>구현</em>하고, <em>검증</em>하는 개발자 황동헌입니다.
      </Reveal>
      <Reveal className="contacts" delay={0.15}>
        <CopyPill value={profile.email} onCopied={say} />
        <a className="pill" href={profile.github.url} target="_blank" rel="noopener noreferrer">
          <span className="k">GITHUB</span> github.com/eastlaw02 {Icon.arrow}
        </a>
        <span className="toast" role="status" aria-live="polite">{toast}</span>
      </Reveal>
      <span className="eyebrow">© 2026 황동헌</span>
    </footer>
  )
}

/* ---------- app ---------- */

export default function App() {
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem('theme') } catch { return null }
  })
  const resolved = theme || (typeof matchMedia !== 'undefined' && matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
  const [active, setActive] = useState('')
  const [toast, setToast] = useState('')
  const tid = useRef()

  useEffect(() => {
    if (!theme) return
    document.documentElement.setAttribute('data-theme', theme)
    try { localStorage.setItem('theme', theme) } catch {}
  }, [theme])

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => en.isIntersecting && setActive(en.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    )
    nav.forEach(([id]) => { const el = document.getElementById(id); if (el) io.observe(el) })
    return () => io.disconnect()
  }, [])

  const say = (msg) => {
    setToast(msg)
    clearTimeout(tid.current)
    tid.current = setTimeout(() => setToast(''), 2200)
  }

  return (
    <>
      <Header theme={resolved} toggleTheme={() => setTheme(resolved === 'dark' ? 'light' : 'dark')} active={active} />
      <main>
        <Hero say={say} toast={toast} />
        <About />
        <Projects />
        <Awards />
        <Skills />
        <Footer say={say} toast={toast} />
      </main>
    </>
  )
}
