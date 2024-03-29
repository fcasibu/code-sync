import type { Server } from 'node:http';
import type { AddressInfo } from 'node:net';
import { format } from 'node:url';

// https://github.com/apollographql/apollo-server/blob/main/packages/server/src/utils/urlForHttpServer.ts
export function urlForHTTPServer(expressServer: Server) {
  const { address, port } = expressServer.address() as AddressInfo;

  // Convert IPs which mean "any address" (IPv4 or IPv6) into localhost
  // corresponding loopback ip. Note that the url field we're setting is
  // primarily for consumption by our test suite. If this heuristic is wrong for
  // your use case, explicitly specify a frontend host (in the `host` option
  // when listening).
  const hostname = address === '' || address === '::' ? 'localhost' : address;

  return format({
    protocol: 'http',
    hostname,
    port,
    pathname: '/',
  });
}
