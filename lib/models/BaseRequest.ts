import HubError, { ErrorCode, DeveloperMessage } from './HubError';

/**
 * A generic hub request. All requests contain these fields
 */
export default class BaseRequest {
  /** \@context of the request schema */
  protected readonly context = 'https://schema.identity.foundation/0.1';
  /** \@type of the request, always 'BaseRequest' */
  protected type: string;
  /** did of the issuer of the request */
  readonly iss: string;
  /** did of the intended recipient of the request */
  readonly aud: string;
  /** did of the indended audiance of the request */
  readonly sub: string;

  /**
   * Constructs a request from the request JSON
   * @param json A json string or object
   */
  constructor(json: string | any) {
    let request = json;
    if (typeof json === 'string') {
      request = JSON.parse(json);
    }
    if (this.context !== request['@context']) {
      throw new HubError({
        errorCode: ErrorCode.BadRequest,
        property: '@context',
        developerMessage: DeveloperMessage.IncorrectParameter,
      });
    }
    ['@type', 'iss', 'aud', 'sub'].forEach((property) => {
      if (!(property in request)) {
        throw new HubError({
          property,
          errorCode: ErrorCode.BadRequest,
          developerMessage: DeveloperMessage.MissingParameter,
        });
      }
    });
    if (typeof request['@type'] !== 'string') {
      throw new HubError({
        errorCode: ErrorCode.BadRequest,
        property: '@type',
        developerMessage: DeveloperMessage.IncorrectParameter,
      });
    }
    this.type = request['@type'];
    this.iss = request.iss;
    this.aud = request.aud;
    this.sub = request.sub;
  }

  /**
   * Gets the type of this request
   */
  getType(): string {
    return this.type;
  }
}