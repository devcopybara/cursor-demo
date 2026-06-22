const { test } = require('node:test');
const assert = require('node:assert/strict');
const { extractEmails, isValidEmail, getValidEmails, uniqueValidEmails } = require('./email');

test('extractEmails returns emails from user objects', () => {
    const users = [{ email: 'a@b.com' }, { email: 'c@d.org' }];
    assert.deepEqual(extractEmails(users), ['a@b.com', 'c@d.org']);
});

test('extractEmails returns empty array for non-array input', () => {
    assert.deepEqual(extractEmails(null), []);
    assert.deepEqual(extractEmails(undefined), []);
});

test('isValidEmail validates email format', () => {
    assert.equal(isValidEmail('user@example.com'), true);
    assert.equal(isValidEmail('User@Example.COM'), true);
    assert.equal(isValidEmail('invalid'), false);
    assert.equal(isValidEmail(''), false);
    assert.equal(isValidEmail(null), false);
});

test('isValidEmail accepts RFC 5322 quoted local parts and IP domains', () => {
    assert.equal(isValidEmail('"hello"@example.com'), true);
    assert.equal(isValidEmail('user@[192.168.0.1]'), true);
    assert.equal(isValidEmail('user+tag@example.com'), true);
});

test('isValidEmail rejects invalid dot placement per RFC 5322', () => {
    assert.equal(isValidEmail('.user@example.com'), false);
    assert.equal(isValidEmail('user.@example.com'), false);
    assert.equal(isValidEmail('hello@example.com.'), false);
});

test('getValidEmails returns only valid emails', () => {
    const users = [
        { email: 'good@example.com' },
        { email: 'bad' },
        { email: 'also-good@test.org' },
        { email: '' },
    ];
    assert.deepEqual(getValidEmails(users), ['good@example.com', 'also-good@test.org']);
});

test('getValidEmails filters out missing, null, and non-string emails', () => {
    const users = [
        { email: 'valid@mail.com' },
        { name: 'no email field' },
        { email: null },
        { email: undefined },
        { email: 12345 },
        { email: '@no-local.com' },
        { email: 'missing-domain@' },
    ];
    assert.deepEqual(getValidEmails(users), ['valid@mail.com']);
});

test('getValidEmails returns empty array for non-array input', () => {
    assert.deepEqual(getValidEmails(null), []);
    assert.deepEqual(getValidEmails(undefined), []);
});

test('uniqueValidEmails returns valid emails without duplicates', () => {
    const emails = [
        'good@example.com',
        'bad',
        'good@example.com',
        'also-good@test.org',
        '',
        'also-good@test.org',
    ];
    assert.deepEqual(uniqueValidEmails(emails), ['good@example.com', 'also-good@test.org']);
});

test('uniqueValidEmails treats emails as duplicate when case differs', () => {
    const emails = ['User@Example.COM', 'user@example.com', 'USER@EXAMPLE.COM'];
    assert.deepEqual(uniqueValidEmails(emails), ['User@Example.COM']);
});

test('uniqueValidEmails filters out missing, null, and non-string emails', () => {
    const emails = [
        'valid@mail.com',
        null,
        undefined,
        12345,
        'valid@mail.com',
        '@no-local.com',
    ];
    assert.deepEqual(uniqueValidEmails(emails), ['valid@mail.com']);
});

test('uniqueValidEmails returns empty array for non-array input', () => {
    assert.deepEqual(uniqueValidEmails(null), []);
    assert.deepEqual(uniqueValidEmails(undefined), []);
});
