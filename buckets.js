import {PutObjectCommand, S3, DeleteObjectCommand, ListObjectsCommand, GetObjectCommand} from '@aws-sdk/client-s3';
import { User } from './User.js';

const client = new S3({region: 'us-east-1'});

const args = process.argv;

async function addObjectToBucket(bucketName, objectName, content) {
    const BucketParams = {
        Bucket: bucketName,
        Key: objectName,
        Body: content
    };
    
    try {
        const response = await client.send(new PutObjectCommand(BucketParams));
        console.log('Object added, ', response);
        return response;
    } 
    catch(err) {
        console.log(err);
    }

}

async function retrieveListOfObjectsInBucket(bucketName) {
    const listBucketsParams = {
        Bucket: bucketName
    };

    try {
        const data = await client.send(new ListObjectsCommand(listBucketsParams));
        console.log(data.Contents.map(el => el.Key));
    } catch(err) {
        console.log(bucketName);
    }
}


async function deleteObject(bucketName, objectKey) {
    const deleteParam = {
        Bucket: bucketName, 
        Key: objectKey
    };

    try {
        const response = await client.send(new DeleteObjectCommand(deleteParam));
        console.log('Object deleted succesfully!');
    } catch(err) {
        console.log(err);
    }
}

async function getObjectName(bucketName, objectName) {
    const getObjectByNameParam = {
        Bucket: bucketName,
        Key: objectName
    };

    const resolveStream = (stream) => new Promise((resolve, reject) => {
        const chunks = [];
        stream.on('data', (chunk) => chunks.push(chunk));
        stream.on('err', err => reject(err));
        stream.once('end', () => resolve(chunks.join('')));
    });

    try {
        const object = await client.send(new GetObjectCommand(getObjectByNameParam));

        const body = await resolveStream(object.Body);
        console.log(body);
    } catch(err) {
        console.log(err);
    }
}

//addObjectToBucket('albi-bucket', 'new_object', 'Some content');
//deleteObject('albi-bucket', 'new_object')
//retrieveListOfObjectsInBucket('albi-bucket');
//getObjectName('albi-bucket', 'new_object');

//addObjectToBucket('albi-bucket', 'object_user', new User('first', 'last'));

switch(process.argv[2]) {
    case 'list':
        retrieveListOfObjectsInBucket('albi-bucket');
        break;
    case 'addObject':
        addObjectToBucket('albi-bucket', process.argv[3], process.argv[4]);
        break;
    case 'deleteObject':
        deleteObject('albi-bucket', process.argv[3]);
        break;
    case 'getObject':
        getObjectName('albi-bucket', process.argv[3]);
        break;
}

