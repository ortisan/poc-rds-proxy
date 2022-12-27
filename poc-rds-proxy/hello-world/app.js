const { Client } = require('pg')

let response;

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */
exports.lambdaHandler = async (event, context) => {
    const client = new Client({
        host: '',
        port: 5432,
        database: '',
        user: '',
        password: '',
    });
    await client.connect();
    const now = await client.query('SELECT NOW()');
    await client.end()
    
    try {
        // const ret = await axios(url);
        response = {
            'statusCode': 200,
            'body': JSON.stringify({
                body: JSON.stringify({
                    message: now,
                }),
            })
        }
    } catch (err) {
        console.log(err);
        return err;
    }

    return response
};
