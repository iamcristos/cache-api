import { BAD_REQUEST } from './httpStatusCode';

class ResponseFormat {
  static success({ data, message = 'successful' }) {
    return {
      success: true,
      message,
      body: data,
    };
  }

  static error(res, error, status = BAD_REQUEST) {
    return res.status(status).json({
      message: error.message,
      status,
    });
  }
}

export default ResponseFormat;
