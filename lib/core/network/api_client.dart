import 'dart:async';
import 'dart:convert';
import 'dart:io';

import 'package:codigotech/core/constants/api_constants.dart';
import 'package:codigotech/core/errors/app_exception.dart';
import 'package:http/http.dart' as http;

class ApiClient {
  ApiClient({required this.baseUrl, http.Client? client})
    : _client = client ?? http.Client();

  final String baseUrl;
  final http.Client _client;

  Future<Map<String, dynamic>> postJson(
    String path, {
    required Map<String, dynamic> body,
    String? token,
  }) async {
    final response = await _send(
      _client.post(
        _buildUri(path),
        headers: _buildHeaders(token),
        body: jsonEncode(body),
      ),
    );

    if (response.statusCode < 200 || response.statusCode >= 300) {
      _throwHttpError(response);
    }

    final payload = _decodeBody(response.body);
    if (payload is Map<String, dynamic>) {
      return payload;
    }

    throw AppException('Unexpected response format from server.');
  }

  Future<dynamic> getJson(
    String path, {
    String? token,
    Map<String, String>? queryParams,
  }) async {
    final response = await _send(
      _client.get(
        _buildUri(path, queryParams: queryParams),
        headers: _buildHeaders(token),
      ),
    );

    if (response.statusCode < 200 || response.statusCode >= 300) {
      _throwHttpError(response);
    }

    return _decodeBody(response.body);
  }

  Uri _buildUri(String path, {Map<String, String>? queryParams}) {
    return Uri.parse('$baseUrl$path').replace(queryParameters: queryParams);
  }

  Map<String, String> _buildHeaders(String? token) {
    final headers = <String, String>{
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    if (token != null && token.isNotEmpty) {
      headers['Authorization'] = 'Bearer $token';
    }

    return headers;
  }

  Future<http.Response> _send(Future<http.Response> request) async {
    try {
      return await request.timeout(ApiConstants.requestTimeout);
    } on TimeoutException {
      throw AppException('Connection timeout. Please try again.');
    } on SocketException {
      throw AppException('No internet connection available.');
    }
  }

  dynamic _decodeBody(String body) {
    if (body.trim().isEmpty) {
      return <String, dynamic>{};
    }

    try {
      return jsonDecode(body);
    } catch (_) {
      throw AppException('Invalid server response format.');
    }
  }

  Never _throwHttpError(http.Response response) {
    final message = _extractMessage(response.body);
    if (response.statusCode == 401 || response.statusCode == 403) {
      throw UnauthorizedAppException(message);
    }

    throw AppException(message, statusCode: response.statusCode);
  }

  String _extractMessage(String rawBody) {
    if (rawBody.trim().isEmpty) {
      return 'Request failed.';
    }

    try {
      final decoded = jsonDecode(rawBody);
      if (decoded is Map<String, dynamic>) {
        final message = decoded['message'];
        if (message is String && message.trim().isNotEmpty) {
          return message;
        }
        if (message is List && message.isNotEmpty) {
          return message.join(', ');
        }
      }
    } catch (_) {
      return 'Request failed.';
    }

    return 'Request failed.';
  }

  void dispose() {
    _client.close();
  }
}
