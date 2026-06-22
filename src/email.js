// RFC 5322 addr-spec 정규식 (emailregex.com 권장안 + IP 옥텟 버그 수정)
// - 기본 패턴: https://emailregex.com/ (RFC 5322 Official Standard)
// - IP 수정: https://stackoverflow.com/questions/201323/ (00 옥텟 거부)
const RFC5322_EMAIL_RE = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i;

/**
 * 사용자 객체 배열에서 email 필드를 추출한다.
 * @param {unknown} users - 사용자 객체 배열
 * @returns {unknown[]} 추출된 email 값 목록
 */
function extractEmails(users) {
    if (!Array.isArray(users)) {
        return [];
    }
    return users.map(user => user.email);
}

/**
 * RFC 5322 기준 정규식으로 이메일 주소 형식을 검증한다.
 * @param {unknown} email - 검증할 이메일 문자열
 * @returns {boolean} 유효한 형식이면 true
 */
function isValidEmail(email) {
    if (typeof email !== 'string') return false;
    return RFC5322_EMAIL_RE.test(email);
}

/**
 * 사용자 목록에서 유효한 이메일만 추출한다.
 * @param {unknown} users - 사용자 객체 배열
 * @returns {string[]} 유효한 이메일 목록
 */
function getValidEmails(users) {
    return extractEmails(users).filter(isValidEmail);
}

/**
 * 유효한 이메일만 남기고, 대소문자 무시 기준으로 중복을 제거한다.
 * @param {unknown[]} emails - 이메일 문자열 배열
 * @returns {string[]} 유효하고 중복 없는 이메일 목록 (첫 등장 순서 유지)
 */
function uniqueValidEmails(emails) {
    if (!Array.isArray(emails)) {
        return [];
    }

    const seen = new Set();
    const result = [];

    for (const email of emails) {
        if (!isValidEmail(email)) {
            continue;
        }

        const key = email.toLowerCase();
        if (seen.has(key)) {
            continue;
        }

        seen.add(key);
        result.push(email);
    }

    return result;
}

module.exports = {
    extractEmails,
    isValidEmail,
    getValidEmails,
    uniqueValidEmails,
};
