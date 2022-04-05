import express from 'express';
import routes from './Routes.js';

class Express{
    _express;

    constructor() {
        this._express = express();
        this.applyKernel();
        this.mountRoutes();
    }

    applyKernel() {
        this._express = this._express.use(express.json());
    }

    mountRoutes() {
        this._express.use('/',routes);
    }

    init() {
        const port = 3000;

        return new Promise((resolve, reject) => {
            this._express.listen(port, (_, err) => {
                if(err) {
                    console.log('Failed to start the express server');
                    reject(err);
                }
            });
            console.log('Started application on port: 3000');

            resolve();
        });
    }
}

export default new Express();