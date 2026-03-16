import 'package:codigotech/core/errors/app_exception.dart';
import 'package:codigotech/models/auth_session.dart';
import 'package:codigotech/repositories/auth_repository.dart';
import 'package:flutter/material.dart';

class AuthController extends ChangeNotifier {
  AuthController({required AuthRepository repository})
    : _repository = repository;

  final AuthRepository _repository;

  AuthSession? _session;
  bool _isLoading = false;
  bool _isBootstrapping = false;
  String? _errorMessage;

  AuthSession? get session => _session;
  bool get isLoading => _isLoading;
  bool get isBootstrapping => _isBootstrapping;
  String? get errorMessage => _errorMessage;
  bool get isAuthenticated => _session?.token.isNotEmpty == true;

  Future<void> initialize() async {
    _isBootstrapping = true;
    _errorMessage = null;
    notifyListeners();

    try {
      _session = await _repository.restoreSession();
    } on AppException catch (error) {
      _errorMessage = error.message;
      _session = null;
    } finally {
      _isBootstrapping = false;
      notifyListeners();
    }
  }

  Future<bool> login({
    required String username,
    required String password,
  }) async {
    _isLoading = true;
    _errorMessage = null;
    notifyListeners();

    try {
      _session = await _repository.login(
        username: username,
        password: password,
      );
      return true;
    } on AppException catch (error) {
      _errorMessage = error.message;
      return false;
    } catch (_) {
      _errorMessage = 'Unexpected error while trying to sign in.';
      return false;
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  Future<void> logout() async {
    _isLoading = true;
    notifyListeners();

    try {
      await _repository.clearSession();
      _session = null;
      _errorMessage = null;
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }
}
