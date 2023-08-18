import { createServer, Model } from 'miragejs';
import { Schedule } from './data/schedule';

export function makeServer() {
    let server = createServer({
        models: {
            schedule: Model
        },
        fixtures: {
            schedule: Schedule()
        },
        seeds(server) {
            server.loadFixtures()
        },
        routes() {
            this.namespace = 'https:/localhost/api/v9';
            this.get('https://localhost/v9/schedules', (schema, req) => {
                return schema.db.schedule[0];
            });
            this.passthrough((request) => {
                // Custom comparator function
                // Return true if Mirage should allow the request
                // to pass through, or false if it should be
                // intercepted
                return request.url.includes("nearby");
              });
            this.passthrough('https://slim-data-harverster.onrender.com/**');
            this.passthrough('https://airlabs.co/**');
            
        }
    });
    return server;
}