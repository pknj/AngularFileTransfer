import {BaseRequestOptions, Http, RequestMethod, Response, ResponseOptions} from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';

export function fakeBackendFactory(
  backend: MockBackend,
  options: BaseRequestOptions) {

  const adminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlBhd2VsIEFkbWluIiwiYWRtaW4iOnRydWV9.0ppq7Y2pwhMWxASxpLTdcdYxIXYZ4SW13Kn9-GZZN9Q';
  const notAdminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlBhd2VsIE5pZUFkbWluIiwiYWRtaW4iOmZhbHNlfQ.TSD7Oa93xbniaAFi-EzMUi7KR2OfuSkA4DAwLcwKhG4';


  backend.connections.subscribe((connection: MockConnection) => {
    // We are using the setTimeout() function to simulate an
    // asynchronous call to the server that takes 1 second.
    setTimeout(() => {
      //
      // Fake implementation of /api/authenticate
      //
      if (connection.request.url.endsWith('/api/authenticate') &&
        connection.request.method === RequestMethod.Post) {
        const body = JSON.parse(connection.request.getBody());

        if (body.email === 'admin@test.pl' && body.password === '1234') {
          connection.mockRespond(new Response(
            new ResponseOptions({
              status: 200,
              body: {token: adminToken}
            })));
        } else if (body.email === 'pawel@test.pl' && body.password === '1234') {
          connection.mockRespond(new Response(
            new ResponseOptions({
              status: 200,
              body: {token: notAdminToken}
            })));
        } else {
          connection.mockRespond(new Response(
            new ResponseOptions({status: 200})
          ));
        }
      }


      //
      // Fake implementation of /api/orders
      //
      if (connection.request.url.endsWith('/api/orders') &&
        connection.request.method === RequestMethod.Get) {
        if (connection.request.headers.get('Authorization') === 'Bearer ' + adminToken) {
          connection.mockRespond(new Response(
            new ResponseOptions({status: 200, body: [1, 2, 3]})
          ));
        } else {
          connection.mockRespond(new Response(
            new ResponseOptions({status: 401})
          ));
        }
      }


    }, 1000);
  });

  return new Http(backend, options);
}

export let fakeBackendProvider = {
  provide: Http,
  useFactory: fakeBackendFactory,
  deps: [MockBackend, BaseRequestOptions]
};
