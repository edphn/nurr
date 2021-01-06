const { createQuestions, validateInitiatingCommand } = require('./nurr');

describe('validateInitiatingCommand', () => {
    test.each([
        "nurr 'command'",
        "nurr 'command {{param}}'",
        "nurr 'command &&    {{param}}'",
    ])('should return true for: %s', command => {
        expect(validateInitiatingCommand(command)).toBe(true);
    });

    test.each([
        "nurr",
        "nurr ''",
        "nurr '' && command",
        "nurr 'command' && other_command",
    ])("should return false for: %s", command => {
        expect(validateInitiatingCommand(command)).toBe(false);
    });
});

describe('createQuestions', () => {
    test('should properly create questions when params are in shorthand version', () => {
        const params = {
            speed: ['fast', 'slow'],
            length: ['long', 'short'],
        };

        expect(createQuestions(params)).toEqual([
            { name: 'speed', type: 'list', choices: ['fast', 'slow'] },
            { name: 'length', type: 'list', choices: ['long', 'short'] },
        ]);
    });

    test('should properly create questions when params are in full version', () => {
        const params = {
            speed: { options: ['fast', 'slow'] },
            length: { options: ['long', 'short'] },
        };

        expect(createQuestions(params)).toEqual([
            { name: 'speed', type: 'list', choices: ['fast', 'slow'] },
            { name: 'length', type: 'list', choices: ['long', 'short'] },
        ]);
    });

    test('should add message to question when it is present in params', () => {
        const params = {
            speed: { options: ['fast', 'slow'], message: 'Choose speed' },
            length: { options: ['long', 'short'] },
        };

        expect(createQuestions(params)).toEqual([
            { name: 'speed', type: 'list', choices: ['fast', 'slow'], message: 'Choose speed' },
            { name: 'length', type: 'list', choices: ['long', 'short'] },
        ]);
    });
});
