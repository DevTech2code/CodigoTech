class AppException implements Exception {
  AppException(this.message, {this.statusCode});

  final String message;
  final int? statusCode;

  @override
  String toString() {
    if (statusCode == null) {
      return message;
    }
    return '$statusCode: $message';
  }
}

class UnauthorizedAppException extends AppException {
  UnauthorizedAppException([super.message = 'Unauthorized'])
    : super(statusCode: 401);
}
