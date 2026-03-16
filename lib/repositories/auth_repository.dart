import 'dart:convert';

import 'package:codigotech/core/errors/app_exception.dart';
import 'package:codigotech/models/auth_session.dart';
import 'package:codigotech/services/auth_remote_service.dart';
import 'package:shared_preferences/shared_preferences.dart';

abstract class AuthRepository {
  Future<AuthSession?> restoreSession();

  Future<AuthSession> login({
    required String username,
    required String password,
  });

  Future<void> clearSession();
}

class AuthRepositoryImpl implements AuthRepository {
  AuthRepositoryImpl({required this.remoteService, required this.prefs});

  static const String _sessionKey = 'codigotech_auth_session';

  final AuthRemoteService remoteService;
  final SharedPreferences prefs;

  @override
  Future<AuthSession> login({
    required String username,
    required String password,
  }) async {
    final session = await remoteService.login(
      username: username,
      password: password,
    );
    await _saveSession(session);
    return session;
  }

  @override
  Future<AuthSession?> restoreSession() async {
    final raw = prefs.getString(_sessionKey);
    if (raw == null || raw.trim().isEmpty) {
      return null;
    }

    try {
      final decoded = jsonDecode(raw);
      if (decoded is! Map<String, dynamic>) {
        await clearSession();
        return null;
      }

      final session = AuthSession.fromStorage(decoded);
      if (session.token.isEmpty) {
        await clearSession();
        return null;
      }

      return session;
    } catch (_) {
      await clearSession();
      throw AppException('Failed to restore saved session.');
    }
  }

  @override
  Future<void> clearSession() async {
    await prefs.remove(_sessionKey);
  }

  Future<void> _saveSession(AuthSession session) async {
    final payload = jsonEncode(session.toJson());
    await prefs.setString(_sessionKey, payload);
  }
}
