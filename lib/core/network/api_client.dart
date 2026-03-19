import 'dart:async';
import 'dart:convert';
import 'dart:io';

import 'package:codigotech/core/constants/api_constants.dart';
import 'package:codigotech/core/errors/app_exception.dart';
import 'package:http/http.dart' as http;

class ApiClient {
  ApiClient({required String baseUrl, http.Client? client})
    : baseUrl = baseUrl.trim(),
      _baseUri = _parseBaseUri(baseUrl),
      _client = client ?? http.Client();

  static const int _maxRequestAttempts = 3;

  final String baseUrl;
  final Uri _baseUri;
  final http.Client _client;

  Future<Map<String, dynamic>> postJson(
    String path, {
    required Map<String, dynamic> body,
    String? token,
  }) async {
    final response = await _send(
      () => _client.post(
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
      () => _client.get(
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
    final trimmedPath = path.trim();
    final normalizedPath = trimmedPath.startsWith('/')
        ? trimmedPath.substring(1)
        : trimmedPath;

    final uri = _baseUri.resolve(normalizedPath);
    if (queryParams == null || queryParams.isEmpty) {
      return uri;
    }

    return uri.replace(queryParameters: queryParams);
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

  Future<void> warmUp() async {
    try {
      await _send(() => _client.get(_buildUri('/'), headers: _buildHeaders(null)));
    } catch (_) {
      // Warm-up is best effort only.
    }
  }

  Future<http.Response> _send(Future<http.Response> Function() request) async {
    for (var attempt = 1; attempt <= _maxRequestAttempts; attempt++) {
      try {
        final response = await request().timeout(ApiConstants.requestTimeout);

        if (_shouldRetryStatusCode(response.statusCode) &&
            attempt < _maxRequestAttempts) {
          await Future.delayed(_retryDelay(attempt));
          continue;
        }

        return response;
      } on TimeoutException {
        if (attempt < _maxRequestAttempts) {
          await Future.delayed(_retryDelay(attempt));
          continue;
        }

        throw AppException(
          'Server is taking too long to respond. Please try again in a few seconds.',
        );
      } on SocketException {
        if (attempt < _maxRequestAttempts) {
          await Future.delayed(_retryDelay(attempt));
          continue;
        }

        throw AppException(
          'No internet connection or server is waking up. Please try again.',
        );
      } on HandshakeException {
        throw AppException(
          'Secure connection failed. Check your internet and device date/time.',
        );
      } on http.ClientException catch (error) {
        if (attempt < _maxRequestAttempts) {
          await Future.delayed(_retryDelay(attempt));
          continue;
        }

        throw AppException('Network error: ${error.message}');
      } on HttpException {
        if (attempt < _maxRequestAttempts) {
          await Future.delayed(_retryDelay(attempt));
          continue;
        }

        throw AppException('Could not reach the server.');
      } catch (_) {
        throw AppException('Unexpected network error while contacting server.');
      }
    }

    throw AppException('Network request failed after multiple attempts.');
  }

  bool _shouldRetryStatusCode(int statusCode) {
    return statusCode == 408 ||
        statusCode == 425 ||
        statusCode == 429 ||
        statusCode == 500 ||
        statusCode == 502 ||
        statusCode == 503 ||
        statusCode == 504;
  }

  Duration _retryDelay(int attempt) {
    return Duration(milliseconds: 700 * attempt);
  }

  static Uri _parseBaseUri(String rawBaseUrl) {
    final normalized = rawBaseUrl.trim();
    final parsed = Uri.tryParse(normalized);
    if (parsed == null || !parsed.hasScheme || !parsed.hasAuthority) {
      throw AppException(
        'Invalid API base URL. Set API_BASE_URL using a full URL (for example, https://asset-app-back.onrender.com).',
      );
    }
    return parsed;
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
