import 'apk_download_service.dart';

ApkDownloadService createApkDownloadServiceImpl() {
  return _UnsupportedApkDownloadService();
}

class _UnsupportedApkDownloadService implements ApkDownloadService {
  @override
  Future<ApkDownloadOutcome> downloadAndOpenInstaller({
    required String downloadUrl,
    required String versionLabel,
    void Function(double progress)? onProgress,
  }) async {
    return ApkDownloadOutcome.failure(
      'La descarga nativa de APK solo esta disponible en Android.',
    );
  }
}
