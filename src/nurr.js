const extractTargetCommand = command => command.replace('nurr', '').replace(/'/g, '');

const interpolateValues = (command, [placeholder, value]) => command.replace(`{{${placeholder}}}`, value);

const extractOptions = param => Array.isArray(param) ? param : param.options;

const toQuestion = (([name, value]) => ({
    name,
    ...(value.message && { message: value.message }),
    type: 'list',
    choices: extractOptions(value),
}));

const createQuestions = params => Object.entries(params).map(toQuestion);

const composeCommand = initiatingCommand => answers => Object.entries(answers)
    .reduce(interpolateValues, extractTargetCommand(initiatingCommand));

const validateInitiatingCommand = command => /^nurr '(.)+'$/.test(command.trim());

module.exports = {
    createQuestions,
    composeCommand,
    validateInitiatingCommand,
};
