# cursor-demo

사용자 데이터에서 이메일을 추출·검증·중복 제거하는 유틸리티 모듈입니다.

## 설치

```bash
npm install
```

## 사용법

```javascript
const { extractEmails, isValidEmail, getValidEmails, uniqueValidEmails } = require('./src/email');

const users = [
  { email: 'good@example.com' },
  { email: 'bad' },
  { email: 'GOOD@example.com' },
];

getValidEmails(users);
// ['good@example.com']

uniqueValidEmails(['User@Example.COM', 'user@example.com', 'other@test.org']);
// ['User@Example.COM', 'other@test.org']
```

## 테스트

```bash
npm test
```

## 릴리스 노트

### v1.0.0

이메일 추출·검증·중복 제거 유틸리티를 추가하고, Node.js 내장 테스트로 품질을 검증할 수 있게 했습니다.

#### ✨ 기능

- **이메일 추출** (`extractEmails`): 사용자 객체 배열에서 `email` 필드를 추출합니다. 배열이 아닌 입력은 빈 배열을 반환합니다.
- **이메일 형식 검증** (`isValidEmail`): RFC 5322 기준 정규식으로 주소 형식을 검사합니다. 따옴표 로컬 파트, IP 도메인, `+tag` 형식을 지원하고, 잘못된 점(`.`) 배치와 유효하지 않은 IP 옥텟(예: `00`, `256`)은 거부합니다.
- **유효 이메일 필터링** (`getValidEmails`): 사용자 목록에서 형식이 올바른 이메일만 남깁니다. 누락·null·비문자열 값은 자동으로 제외합니다.
- **중복 제거** (`uniqueValidEmails`): 유효한 이메일만 남기고, 대소문자 무시 기준으로 중복을 제거합니다. 첫 등장 순서를 유지합니다.

#### 🐛 버그 수정

- (해당 없음)

#### 기타

- 진입점(`src/index.js`)을 이메일 모듈 re-export로 변경했습니다.
- `npm test`가 `node --test`로 이메일 관련 테스트 13건을 실행하도록 설정했습니다.
- Cursor 훅(감사 로그, `rm -rf` 차단)과 security-auditor 에이전트 설정을 추가했습니다.
