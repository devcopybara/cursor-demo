// RFC 5322 compliant pattern (UI Bakery Email Regex Library)
// https://uibakery.io/regex-library/email
const RFC5322_EMAIL_RE = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i;

function extractEmails(users) {
    if (!Array.isArray(users)) {
        return [];
    }
    return users.map(user => user.email);
}

function isValidEmail(email) {
    if (typeof email !== 'string') return false;
    return RFC5322_EMAIL_RE.test(email);
}

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
