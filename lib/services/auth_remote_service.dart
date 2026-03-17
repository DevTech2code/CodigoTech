import 'package:codigotech/core/constants/api_constants.dart';
import 'package:codigotech/core/errors/app_exception.dart';
import 'package:codigotech/core/network/api_client.dart';
import 'package:codigotech/models/auth_session.dart';

abstract class AuthRemoteService {
  Future<AuthSession> login({
    required String username,
    required String password,
  });
}

class AuthRemoteServiceImpl implements AuthRemoteService {
  AuthRemoteServiceImpl({required this.apiClient});

  final ApiClient apiClient;

  @override
  Future<AuthSession> login({
    required String username,
    required String password,
  }) async {
    try {
      final response = await apiClient.postJson(
        ApiConstants.authLoginPath,
        body: {'username': username, 'password': password},
      );

      final session = AuthSession.fromLoginResponse(response);
      if (session.token.isEmpty) {
        throw AppException('The server did not return a valid token.');
      }

      return session;
    } on AppException {
      rethrow;
    } catch (_) {
      throw AppException('Unexpected login response format from server.');
    }
  }
}
