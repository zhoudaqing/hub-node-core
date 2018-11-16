import BaseResponse from './BaseResponse';

/**
 * A hub response of type WriteResponse
 */
export default class WriteResponse extends BaseResponse {
  constructor(public readonly revisions: string[], developerMessage?: string) {
    super(developerMessage);
    this.type = 'WriteResponse';
  }

  protected toJson(): any {
    const json = super.toJson();
    json.revision = this.revisions;
    return json;
  }
}