import { DeleteCommand, PutCommand, GetCommand } from "@aws-sdk/lib-dynamodb";
import { Database } from './DynamoDB.js';

const client = Database.mount();
const documentClient = Database.mountDocumentClient(client);

export const addItem = async (student) => {
    const params = {
        TableName: "albi-table",
        Item: student
    };

    try {
        const command = new PutCommand(params);
        const data = await documentClient.send(command);
        console.log("Success - item added or updated", data);
    } catch(err) {
        console.log(err);
    }
}

export async function removeItem(id) {
    const params = {
        TableName: "albi-table",
        Key: {
            Id: id
        }
    }

    try {
        const command = new DeleteCommand(params);
        const result = await documentClient.send(command);
        console.log('Success - item with id ',id, ' deleted');
    } catch(err) {
        console.log(err);
    }
}

export async function getItemById(id) {
    // Set the parameters.
    const params = {
        TableName: "albi-table",
        Key: {
            Id: id
        }
    };

    const data = await documentClient.send(new GetCommand(params));
    return data.Item;

}