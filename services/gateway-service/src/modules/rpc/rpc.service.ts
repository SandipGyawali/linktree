import { Injectable, GatewayTimeoutException } from '@nestjs/common';
import { TimeoutError } from 'rxjs';
import { firstValueFrom, Observable, throwError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class RpcHelperService {
  async handleRpc<T>(callback: () => Promise<T>): Promise<T> {
    try {
      return await callback();
    } catch (err) {
      console.error(`[RPC Error]`, err);
      throw err;
    }
  }

  async sendWithTimeout<T>(
    client: { send: (pattern: string, data: any) => Observable<T> },
    pattern: string,
    data: any,
    ms = 5000, // default timeout
  ): Promise<T> {
    return firstValueFrom(
      client.send(pattern, data).pipe(
        timeout(ms),
        catchError(err => {
          if (err instanceof TimeoutError) {
            return throwError(
              () => 
                new GatewayTimeoutException('Microservice is unavailable!')
            );
          }
          return throwError(() => new RpcException(err));
        }),
      ),
    );
  }
}
