import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { create as createUser } from './db/repository';
import { UserDomain } from './domain/user';

export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    // Initializing database
    //dbInit();
    
    let response: APIGatewayProxyResult;
    try {
        const userDomain: UserDomain = JSON.parse(event.body || '');
        const userCreated = await createUser(userDomain);
        response = {
            statusCode: 200,
            body: JSON.stringify({
                userCreated,
            }),
        };
    } catch (err) {
        console.log(err);
        response = {
            statusCode: 500,
            body: JSON.stringify({
                message: 'internal error',
            }),
        };
    }

    return response;
};
