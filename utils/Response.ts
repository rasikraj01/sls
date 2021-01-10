export default class Response {
  static success(data, status = 200) {
    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        code: status,
        data: data,
      }),
    };
  }

  static onContent() {
    return {
      statusCode: 204,
      body: '',
    };
  }

  static error(error, status = 401) {
    let message = 'Something went wrong!';
    let errors = null;
    if (error instanceof Object) {
      message = error['message'];
      errors = error['errors'];
    } else {
      message = error;
    }
    return {
      statusCode: 401,
      body: JSON.stringify({
        success: false,
        code: status,
        message: message,
        errors: errors,
      }),
    };
  }
}
