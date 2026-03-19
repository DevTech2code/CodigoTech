import 'dart:async';
import 'dart:io';

import 'package:http/http.dart' as http;
import 'package:open_filex/open_filex.dart';
import 'package:path_provider/path_provider.dart';

import 'apk_download_service.dart';

class NativeApkDownloadService implements ApkDownloadService {
  NativeApkDownloadService({http.Client? client}) : _client = client ?? http.Client();

  static const String _fallbackDownloadUrl =
      'https://github.com/DevTech2code/CodigoTech/releases/download/apk-latest/CodigoTech-latest.apk';
  static const Duration _requestTimeout = Duration(seconds: 60);

  final http.Client _client;

  @override
  Future<ApkDownloadOutcome> downloadAndOpenInstaller({
    required String downloadUrl,
    required String versionLabel,
    void Function(double progress)? onProgress,
  }) async {
    if (!Platform.isAndroid) {
      return ApkDownloadOutcome.failure(
        'La instalacion de APK solo esta soportada en Android.',
      );
    }

    final uri = _resolveDownloadUri(downloadUrl);
    if (uri == null) {
      return ApkDownloadOutcome.failure('No hay un enlace de descarga valido.');
    }

    final apkFile = await _createDestinationFile(versionLabel);

    try {
      final request = http.Request('GET', uri);
      final response = await _client.send(request).timeout(_requestTimeout);

      if (response.statusCode < 200 || response.statusCode >= 300) {
        return ApkDownloadOutcome.failure(
          'No se pudo descargar el APK. Codigo HTTP: ${response.statusCode}.',
        );
      }

      final sink = apkFile.openWrite();
      try {
        var received = 0;
        final total = response.contentLength;

        await for (final chunk in response.stream) {
          sink.add(chunk);
          received += chunk.length;

          if (total != null && total > 0) {
            final progress = received / total;
            onProgress?.call(progress > 1 ? 1 : progress);
          }
        }
      } finally {
        await sink.flush();
        await sink.close();
      }

      final fileLength = await apkFile.length();
      if (fileLength <= 0) {
        return ApkDownloadOutcome.failure('El archivo descargado esta vacio.');
      }

      onProgress?.call(1);

      final openResult = await OpenFilex.open(
        apkFile.path,
        type: 'application/vnd.android.package-archive',
      );

      if (openResult.type != ResultType.done) {
        final details = openResult.message.trim();
        final suffix = details.isEmpty ? '' : ' ($details)';
        return ApkDownloadOutcome.failure(
          'No se pudo abrir el instalador del APK$suffix.',
        );
      }

      return ApkDownloadOutcome.success(filePath: apkFile.path);
    } on TimeoutException {
      return ApkDownloadOutcome.failure(
        'La descarga tardo demasiado. Intenta nuevamente.',
      );
    } on SocketException {
      return ApkDownloadOutcome.failure(
        'No hay conexion a internet para descargar la actualizacion.',
      );
    } on FileSystemException catch (error) {
      return ApkDownloadOutcome.failure(
        'No se pudo guardar el APK localmente: ${error.message}',
      );
    } catch (_) {
      return ApkDownloadOutcome.failure(
        'Error inesperado al descargar la actualizacion.',
      );
    }
  }

  Future<File> _createDestinationFile(String versionLabel) async {
    final tempDir = await getTemporaryDirectory();
    final updatesDir = Directory(
      '${tempDir.path}${Platform.pathSeparator}codigotech_updates',
    );

    if (!await updatesDir.exists()) {
      await updatesDir.create(recursive: true);
    }

    final safeVersion = _sanitizeVersion(versionLabel);
    final fileName = 'codigotech-$safeVersion.apk';
    final filePath =
        '${updatesDir.path}${Platform.pathSeparator}$fileName';

    final file = File(filePath);
    if (await file.exists()) {
      await file.delete();
    }

    return file;
  }

  String _sanitizeVersion(String value) {
    final trimmed = value.trim();
    if (trimmed.isEmpty) {
      return 'latest';
    }

    final cleaned = trimmed.replaceAll(RegExp(r'[^a-zA-Z0-9._-]'), '_');
    return cleaned.isEmpty ? 'latest' : cleaned;
  }

  Uri? _resolveDownloadUri(String rawPrimaryUrl) {
    final primary = Uri.tryParse(rawPrimaryUrl.trim());
    if (_isHttpOrHttps(primary)) {
      return primary;
    }

    final fallback = Uri.tryParse(_fallbackDownloadUrl);
    if (_isHttpOrHttps(fallback)) {
      return fallback;
    }

    return null;
  }

  bool _isHttpOrHttps(Uri? uri) {
    if (uri == null) {
      return false;
    }

    return uri.scheme == 'http' || uri.scheme == 'https';
  }
}

ApkDownloadService createApkDownloadServiceImpl() {
  return NativeApkDownloadService();
}
