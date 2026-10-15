export const profile = {
  name: ['황', '동', '헌'],
  eyebrow: 'IT · SW Development · 울산대학교 IT융합전공 4학년',
  email: 'ng524855@gmail.com',
  github: { url: 'https://github.com/eastlaw02', label: 'eastlaw02' },
}

export const nav = [
  ['about', '소개'],
  ['projects', '프로젝트'],
  ['awards', '수상'],
  ['skills', '기술'],
  ['contact', '연락'],
]

export const stats = [
  { to: 120, unit: '명', label: '알림IT 사용자', sub: 'Google Play, Android+iOS 합계' },
  { to: 4.36, dec: 2, unit: '/5', label: 'EZmap 만족도', sub: '14명 실제 주행 평가' },
  { to: 95, from: 40, unit: '%', label: '도면 기호 검출률', sub: '약 40%에서 개선, 해커톤' },
  { to: 4.1, dec: 1, unit: '/4.5', label: '학점', sub: '울산대학교' },
]

export const flow = ['문제 발견', '요구사항 정의', '구현', '사용자 검증']

export const principles = [
  ['원인을 먼저 가른다', '성능이 낮을 때 모델부터 고치지 않고, 데이터·알고리즘·사용 환경 중 무엇이 원인인지 구분합니다.'],
  ['AI는 고르고 검증한다', '작업에 맞는 AI 도구를 나눠 쓰고, 생성된 코드는 요구사항과 실제 동작으로 직접 확인합니다.'],
  ['출시하고 고친다', '만드는 데서 끝내지 않고 출시한 뒤, 사용자 피드백을 받아 개선합니다.'],
]

export const ezmapBars = [
  ['안내 이해도', 4.07],
  ['POI 유용성', 4.43],
  ['인지 부담 완화', 4.29],
  ['행동 확신도', 4.0],
  ['만족도', 4.36],
  ['기존 대비 선호', 4.43],
]

export const weldSteps = [
  ['OCR에서 YOLO로 전환', 'PDF가 텍스트가 아닌 벡터 이미지였고 설계자마다 기호 형태가 달라, 문자 대신 기호 형태를 검출했습니다.'],
  ['학습 데이터를 직접 확장', '유사 기호를 생성하고 실제 도면의 노이즈를 반영해 데이터 부족을 해결했습니다.'],
  ['양방향 선 추적 알고리즘', '양쪽 선의 시작점에서 동시에 추적해 기호와 부품 타입의 연결 지점을 찾았습니다.'],
  ['사용 환경을 고치는 제안', '촬영 가이드라인과 양호·의심·불량 3단계 판정을 제안해, 작업자는 의심·불량 사진만 검토하게 했습니다.'],
]

export const others = [
  ['2026.05', 'Physical AI Challenge', 'Universal Robot 공정 최적화 과제에서 공정 자동화 소프트웨어를 설계해 생산 효율 86%를 달성했습니다.', '2위', true],
  ['2025.06', '공공 빅데이터·AI 활용 문제해결 경진대회', '작물 30종 추천 시스템을 개발하고 실제 재배 데이터로 결과를 검증했습니다.', '장려상'],
  ['2025.03–07', '9oormthon Univ 부회장 · 서버 파트', '무박 2일 해커톤에서 Go Euro 백엔드 API를 만들고 ChatGPT API를 연동했습니다.'],
  ['2024–2025', 'UMC 6·7기 Android · 7기 스터디장', '약 20명 스터디를 한 학기 운영했고, 1명을 제외한 전원이 수료해 최종 해커톤까지 참여했습니다.'],
  ['2025.01–02', 'LG Aimers AI Program 수료', '머신러닝 이론과 데이터 기반 문제 해결 방법론을 배우고 팀 프로젝트를 수행했습니다.'],
  ['2024', '학부 학생회 체육차장 · 축구동아리 부회장', '두 역할을 함께 맡아 1년간 학부·동아리 행사를 기획하고 진행했습니다.'],
]

export const awards = [
  ['2026.06', '프로그래밍 경진대회 (울산대 SW사업단)', '4학년 부문 최우수상', true],
  ['2026.05', 'Physical AI Challenge', '2위', true],
  ['2026.02', 'HD현대중공업 AI 업무혁신 해커톤', '우수상'],
  ['2026', '캡스톤디자인 경진대회 (EZmap)', '장려상'],
  ['2025.08', 'K-HACKATHON 13 (약 500팀 규모)', '최종 12팀 진출'],
  ['2025.06', '공공 빅데이터·AI 활용 문제해결 경진대회', '장려상'],
  ['2024.07', 'Design Thinking Competition', '장려상'],
]

export const skills = [
  ['Mobile', 'Android (Kotlin, Android Studio), React Native', '알림IT, UMC Android 스터디'],
  ['AI · Vision', 'Python, PyTorch, YOLO, Gemini API', '해커톤(YOLO), EZmap(Gemini 2.5 Flash)'],
  ['Backend', 'Spring Boot, REST API', '9oormthon 해커톤 백엔드 API'],
  ['LLM · Agent', 'LLM, MCP, Kakao Map·Local API', 'EZmap, 인턴 프로젝트(비공개)'],
  ['Collaboration', 'Git · GitHub, Figma', '알림IT 협업, EZmap 브랜치 규칙'],
]
