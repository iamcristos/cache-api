import { OK, CREATED } from '../util/httpStatusCode';
import ResponseFormat from '../util/responseFormatter';

class Controller {
  static success(data, res, message = 'Success') {
    return res
      .status(OK)
      .json(ResponseFormat.success({ data, message }));
  }

  static created(data, res, message = 'Success') {
    return res
      .status(CREATED)
      .json(ResponseFormat.success({ data, message }));
  }

  static handleError(error, req, res) {
    return ResponseFormat.error(req, res, error);
  }
}

export default Controller;
