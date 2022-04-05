import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

export class Database {

    static mount() {
        const client = new DynamoDB({region: 'us-east-1'});
        return client;
    }

    static mountDocumentClient(client) {
        const marshallOptions = {
            convertEmptyValues: false, // false, by default.
            removeUndefinedValues: false, // false, by default.
            convertClassInstanceToMap: true, // false, by default.
        };
          
        const unmarshallOptions = {
            wrapNumbers: false, // false, by default.
        };

        const translateConfig = { marshallOptions, unmarshallOptions };

        // Create the DynamoDB document client.
        const ddbDocClient = DynamoDBDocumentClient.from(client, translateConfig);

        return ddbDocClient;
    }
}