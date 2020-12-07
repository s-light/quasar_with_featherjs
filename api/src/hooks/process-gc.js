// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// https://docs.feathersjs.com/guides/basics/hooks.html#processing-messages

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
    return async context => {
        const { method, id, params, data } = context;
        console.group('process-gc');
        console.log('method', method);
        console.log('id', id);
        // console.log('params', params);
        console.log('params.query', params.query);
        console.log('data', data);
        // Throw an error if we didn't get a text

        // Update the original data (so that people can't submit additional stuff)
        // context.data = {
        //     text,
        // };
        console.groupEnd();
        return context;
    };
};
