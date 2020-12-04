// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// https://docs.feathersjs.com/guides/basics/hooks.html#processing-messages

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
    return async context => {
        const { data } = context;

        // Throw an error if we didn't get a text
        if(!data.text) {
            throw new Error('A message must have a text');
        }

        // Make sure that messages are no longer than 400 characters
        const text = data.text.substring(0, 400);

        // Update the original data (so that people can't submit additional stuff)
        context.data = {
            text,
        };
        return context;
    };
};
