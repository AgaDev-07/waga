import { WagaRequest, WagaResponse } from "../types";

export = function bodyParser(req: WagaRequest, res: WagaResponse): Promise<string> {
  return new Promise((resolve, reject) => {
      let body = '';
      req.on('data', chunk => {
          body += chunk;
      });
      req.on('end', () => {
          resolve(body);
      });
  });
}
